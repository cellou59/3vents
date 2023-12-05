// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";

/// @title 3vents Ticket and Gamification Contract
/// @notice Implements ticketing as NFTs (ERC721) and gamification tokens (ERC20).
contract EventsTicketing is ERC721Enumerable, Ownable {
    IERC20 public gamificationToken;

    struct Event {
        uint id;
        string name;
        string location;
        uint256 date;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 ticketsSold;
    }

    uint public constant MAX_PER_MINT = 5;
    string public baseTokenURI;

    mapping(uint256 => Event) public events;
    mapping(uint256 => uint256[]) private eventTickets;
    mapping(uint256 => uint256) private ticketToEvent;
    mapping(uint256 => address) public ticketOwners;
    mapping(uint256 => uint256) public ticketsForSale;

    event EventCreated(uint256 indexed eventId, string name, string location, uint256 date, uint256 ticketPrice, uint256 totalTickets);
    event TicketPurchased(uint256 indexed eventId, address indexed buyer, uint256 amount);
    event TicketListed(uint256 indexed eventId, address indexed seller, uint256 ticketId, uint256 price);
    event TicketSold(uint256 indexed eventId, address indexed buyer, uint256 ticketId, uint256 price);

    /// @notice Constructor to create 3vents Ticketing contract
    constructor() ERC721('', '') 
    Ownable(msg.sender) 
    {}

    /// @notice initialize 3vents Ticketing contract
    /// @param _name Name of the NFT collection
    /// @param _symbol Symbol of the NFT collection
    /// @param _gamificationTokenAddress Address of the ERC20 token used for gamification
    /// @param initialOwner Address of the initial owner of the contract
    function init(string calldata name, string calldata symbol, address initialOwner) public {
        _name = name;
        _symbol = symbol;
        _owner = initialOwner;
        gamificationToken = IERC20(initialOwner);
    }

    /// @notice Creates a new event
    /// @param name Name of the event
    /// @param location Location of the event
    /// @param date Date of the event (Unix timestamp)
    /// @param ticketPrice Price of one ticket (in Wei)
    /// @param totalTickets Total number of tickets available for the event
    function createEvent(string memory name, string memory location, uint256 date, uint256 ticketPrice, uint256 totalTickets) public onlyOwner {
        uint256 eventId = uint256(keccak256(abi.encodePacked(name, location, date)));
        Event memory newEvent = Event(eventId, name, location, date, ticketPrice, totalTickets, 0);
        events[eventId] = newEvent;

        emit EventCreated(eventId, name, location, date, ticketPrice, totalTickets);
    }

    /// @notice Allows a user to purchase tickets for an event
    /// @param eventId The ID of the event for which to purchase tickets
    /// @param numberOfTickets The number of tickets to purchase
    function buyTickets(uint256 eventId, uint256 numberOfTickets) external payable {
        require(numberOfTickets <= MAX_PER_MINT, "Exceeds max tickets per transaction");
        Event storage eventInfo = events[eventId];
        require(eventInfo.date > block.timestamp, "Event has already occurred");
        require(eventInfo.ticketsSold + numberOfTickets <= eventInfo.totalTickets, "Not enough tickets available");
        require(msg.value == numberOfTickets * eventInfo.ticketPrice, "Incorrect amount of Ether sent");

        for (uint256 i = 0; i < numberOfTickets; i++) {
            uint256 ticketId = uint256(keccak256(abi.encodePacked(eventId, eventInfo.ticketsSold + i)));
            _mintSingleTicket(msg.sender, ticketId);
            eventInfo.ticketsSold++;

            eventTickets[eventId].push(ticketId);
            ticketToEvent[ticketId] = eventId;
        }

        emit TicketPurchased(eventId, msg.sender, numberOfTickets);
    }

    /// @notice Lists a ticket for sale on the secondary market
    /// @param ticketId The ID of the ticket to list for sale
    /// @param price The sale price of the ticket (in Wei)
    function listTicketForSale(uint256 ticketId, uint256 price) public {
        require(ownerOf(ticketId) == msg.sender, "Caller is not the ticket owner");
        ticketsForSale[ticketId] = price;
        uint eventId = ticketToEvent[ticketId];
        emit TicketListed(eventId, msg.sender, ticketId, price);
    }

    /// @notice Allows a user to buy a listed ticket
    /// @param ticketId The ID of the ticket to buy
    function buyListedTicket(uint256 ticketId) public payable {
        uint256 price = ticketsForSale[ticketId];
        require(price > 0, "Ticket is not for sale");
        require(msg.value == price, "Incorrect amount of Ether sent");

        address seller = ownerOf(ticketId);
        _transfer(seller, msg.sender, ticketId);
        payable(seller).transfer(msg.value);
        ticketsForSale[ticketId] = 0;
        uint eventId = ticketToEvent[ticketId];
        emit TicketSold(eventId, msg.sender, ticketId, price);
    }

   
    /// @notice Generates NFT metadata including a SVG image
    /// @param tokenId The token ID for which to generate metadata
    /// @param eventName The name of the event associated with the ticket
    /// @param eventLocation The location of the event
    /// @return metadata A string representing the NFT metadata in Base64 format 
    function generateMetadata(uint tokenId,string memory eventName, string memory eventLocation) public pure returns (string memory) {
        string memory svg = string(abi.encodePacked(
            "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinyMin meet' viewBox='0 0 350 350'>",
            "<style>.base { fill: white; font-family: serif; font-size: 25px; }</style>",
            "<rect width='100%' height='100%' fill='red' />",
            "<text x='50%' y='40%' class='base' dominant-baseline='middle' text-anchor='middle'>",
            "<tspan y='50%' x='50%'>",
            eventName,
            " ",
            eventLocation,
            " - Ticket #",
            Strings.toString(tokenId),
            "</tspan></text></svg>"
        ));

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Ticket #',
                        Strings.toString(tokenId),
                        '", "description": "A ticket that gives you access to a cool event!", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '", "attributes": [{"trait_type": "Type", "value": "Base Ticket"}]}'
                    )
                )
            )
        );

        string memory metadata = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        return metadata;
    }


    /// @notice Withdraws Ether from the contract to the owner's address
    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

    /// @notice Reserves a number of tickets for the contract owner
    /// @param _eventId The ID of the event for which to reserve tickets
    /// @param _numberOfTickets The number of tickets to reserve
    function reserveTickets(uint256 _eventId, uint256 _numberOfTickets) public onlyOwner {
        Event memory eventInfo = events[_eventId];
        require(eventInfo.ticketsSold + _numberOfTickets < eventInfo.totalTickets, "Not enough tickets left to reserve");

        for (uint256 i = 0; i < _numberOfTickets; i++) {
            uint256 ticketId = uint256(keccak256(abi.encodePacked(_eventId, eventInfo.ticketsSold + i)));
            _mintSingleTicket(msg.sender, ticketId);
            ticketOwners[ticketId] = msg.sender;
            eventInfo.ticketsSold++;

            eventTickets[_eventId].push(ticketId);
            ticketToEvent[ticketId] = _eventId;
        }
    }

    /// @notice Airdrops tickets to a list of addresses
    /// @param _eventId The event ID for which tickets are being airdropped
    /// @param _wAddresses An array of wallet addresses to receive the tickets
    function airDropTickets(uint256 _eventId, address[] calldata _wAddresses) public onlyOwner {
        Event memory eventInfo = events[_eventId];
        uint count = _wAddresses.length;
        require(eventInfo.ticketsSold + count < eventInfo.totalTickets, "Not enough tickets left to reserve");

        for (uint i = 0; i < count; i++) {
            uint256 ticketId = uint256(keccak256(abi.encodePacked(_eventId, eventInfo.ticketsSold + i)));
            string memory metadata = generateMetadata(ticketId,eventInfo.name,eventInfo.location);
            _mintSingleTicket(_wAddresses[i], ticketId);
            ticketOwners[ticketId] = _wAddresses[i];
            eventInfo.ticketsSold++;

            eventTickets[_eventId].push(ticketId);
            ticketToEvent[ticketId] = _eventId;
        }


        emit TicketPurchased(_eventId, msg.sender, count);
    }

    /// @dev Mints a single ticket to a given address
    /// @param _wAddress The address to mint the ticket to
    /// @param ticketId The ticket ID to mint
    function _mintSingleTicket(address _wAddress,uint256 ticketId) private {
        //string memory _tokenURI
        // Sanity check for absolute worst case scenario
        //require(totalSupply() == _tokenIds.current(), "Indexing has broken down!");
        //uint newTokenID = _tokenIds.current();
        _safeMint(_wAddress, ticketId);
       // _setTokenURI(ticketId, _tokenURI);
    }

    // Override des fonctions requises par ERC721 et ERC721Enumerable
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
