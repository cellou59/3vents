// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";
//import {console} from "hardhat/console.sol";


error EventAlreadyOccurred();
error NotEnoughTicketsAvailable();
error IncorrectEtherAmount();
error InvalidClassIndex();
error TicketNotFound();
error NotTicketOwner();
error ListedPriceTooHigh();
error NoEtherLeftToWithdraw();
error TransferFailed();
/**
 * @title 3vents Ticket and Gamification Contract
 * Ce contrat implémente les billets sous forme de NFT (ERC721) et les tokens de gamification (ERC20).
 */
contract Ticketing is ERC721Enumerable,Ownable{
    IERC20 public gamificationToken;
    uint constant MAX_PER_MINT = 5;
    uint date;
    uint public priceTicket;
    uint totalTickets;
    uint ticketSold = 0 ;

    string public baseTokenURI;
    enum Class {
        EarlyBird,
        Regular,
        Prenium,
        VIP
    }
    struct Ticket {
        uint256 id;
        Class class;
    }

    mapping(address => Ticket[]) public tickets;
    mapping(uint256 => Class) private ticketClass;

  
    mapping(uint256 => uint256) private ticketToEvent;

    mapping(uint256 => uint256) public ticketsForSale;


    event TicketPurchased(uint256 indexed eventId, address indexed buyer, uint256 amount);
    event TicketListed(uint256 indexed eventId, address indexed seller, uint256 ticketId, uint256 price);
    event TicketSold(uint256 indexed eventId, address indexed buyer, uint256 ticketId, uint256 price);

    constructor() ERC721('', '') 
    Ownable(msg.sender) 
    {}
    
    function init(string calldata name_, string calldata symbol_, uint _date, uint _priceTicket, uint _totalTickets  ) public {
        _name = name_;
        _symbol = symbol_;
        _owner = msg.sender;
        priceTicket = _priceTicket;
        date = _date;
        totalTickets = _totalTickets;
        gamificationToken = IERC20(msg.sender);
    }


    function buyTickets(uint _eventId, uint256 _numberOfTickets, uint[] memory _classOfTicket ) external payable {
        if (date <= block.timestamp) revert EventAlreadyOccurred();
        if (ticketSold + _numberOfTickets > totalTickets) revert NotEnoughTicketsAvailable();
        uint256 totalCost = 0;
        for (uint256 i = 0; i < _numberOfTickets; i++) {
            Class _ticketClass = getClassOfTicket(_classOfTicket[i]);
            totalCost += getPriceForClass(_ticketClass);
        }
        if (msg.value != totalCost){
            revert IncorrectEtherAmount();
        }
     
        uint256 _ticketsSold = 0;
        for (uint256 i = 0; i < _numberOfTickets; i++) {
            uint256 ticketId = uint256(keccak256(abi.encodePacked(_eventId, ticketSold + i)));
            mintSingleTicket(msg.sender, ticketId);
            _ticketsSold++;
            Class _ticketClass = getClassOfTicket(_classOfTicket[i]);
            ticketClass[ticketId] = _ticketClass;
            tickets[msg.sender].push(Ticket(ticketId,_ticketClass ));

            emit TicketPurchased(_eventId, msg.sender, msg.value);
        }

        // uint256 tokensToAward = calculateTokens(_classOfTicket);
        // gamificationToken.transfer(msg.sender, tokensToAward);
        ticketSold += _ticketsSold;
    }

    function getClassOfTicket(uint _classIndex) internal pure returns (Class) {
        if (_classIndex > uint(Class.VIP)) {
            revert InvalidClassIndex();
        }

        if (_classIndex == 0) {
            return Class.EarlyBird;
        } else if (_classIndex == 1) {
            return Class.Regular;
        } else if (_classIndex == 2) {
            return Class.Prenium;
        } else if (_classIndex == 3) {
            return Class.VIP;
        }

        // Default case, although the require statement above should make this unreachable
        revert InvalidClassIndex();
    }

    function getPriceForClass(Class _ticketClass) private view returns (uint) {
        if (_ticketClass == Class.EarlyBird) {
            return priceTicket * 90 / 100; // 10% discount
        } else if (_ticketClass == Class.Regular) {
            return priceTicket; // No change in price
        } else if (_ticketClass == Class.Prenium) {
            return priceTicket * 110 / 100; // 10% surcharge
        } else if (_ticketClass == Class.VIP) {
            return priceTicket * 120 / 100; // 20% surcharge
        } else {
            revert InvalidClassIndex();
        }
    }

    function calculateTokens(uint256[] memory _classOfTicket) private pure returns (uint256) {
        uint256 totalTokens = 0;
        for (uint256 i = 0; i < _classOfTicket.length; i++) {
            Class _ticketClass = getClassOfTicket(_classOfTicket[i]);

            if (_ticketClass == Class.EarlyBird) {
                totalTokens += 5;
            } else if (_ticketClass == Class.Regular) {
                totalTokens += 10; 
            } else if (_ticketClass == Class.Prenium) {
                totalTokens += 15; 
            } else if (_ticketClass == Class.VIP) {
                totalTokens += 20; 
            }
        }

        return totalTokens;
    }

    function mintSingleTicket(address _wAddress,uint256 _ticketId) private {
        //string memory _tokenURI
        // Sanity check for absolute worst case scenario
        //require(totalSupply() == _tokenIds.current(), "Indexing has broken down!");
        //uint newTokenID = _tokenIds.current();
        _safeMint(_wAddress, _ticketId);
       // _setTokenURI(ticketId, _tokenURI);
    }

    function listTicketForSale(uint256 ticketId, uint256 price) public {
        if(ownerOf(ticketId) != msg.sender){
            revert NotTicketOwner();
        } 

        Class _ticketClass = ticketClass[ticketId]; // Fetch the class directly

        // Ensure the price does not exceed 130% of original price
        uint256 maxResalePrice = getPriceForClass(_ticketClass) * 130 / 100;
        if (price >= maxResalePrice) {
            revert ListedPriceTooHigh();
        }
        ticketsForSale[ticketId] = price;
        uint eventId = ticketToEvent[ticketId];
        emit TicketListed(eventId, msg.sender, ticketId, price);
    }

    function buyListedTicket(uint256 ticketId) public payable {
        uint256 price = ticketsForSale[ticketId];
        require(price > 0, "Ticket is not for sale");
        if (msg.value != price){
            revert IncorrectEtherAmount();
        }
        address seller = ownerOf(ticketId);
        _transfer(seller, msg.sender, ticketId);
        payable(seller).transfer(msg.value);

        // Remove the ticket from the seller's array
        removeTicketFromOwner(seller, ticketId);

        ticketsForSale[ticketId] = 0;
        uint eventId = ticketToEvent[ticketId];
        emit TicketSold(eventId, msg.sender, ticketId, price);
    }

    function removeTicketFromOwner(address owner, uint256 ticketId) private {
        uint indexToRemove;
        bool found = false;
        for (uint i = 0; i < tickets[owner].length; i++) {
            if (tickets[owner][i].id == ticketId) {
                indexToRemove = i;
                found = true;
                break;
            }
        }
        if (!found) revert TicketNotFound();

        tickets[owner][indexToRemove] = tickets[owner][tickets[owner].length - 1];
        tickets[owner].pop();
    }

    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        if (balance == 0) revert NoEtherLeftToWithdraw();
        (bool success, ) = (msg.sender).call{value: balance}("");
        if (!success) revert TransferFailed();
    }
}
