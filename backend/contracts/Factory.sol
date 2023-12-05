// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// importing the ERC-721 contract to deploy for an event
import "./Ticketing.sol";
/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for an Artist. S/O @Snow
  * @dev    If the contract is already deployed for an _eventName, it will revert.
  */
contract NFTeventFactory{

     struct Event {
        uint id;
        string name;
        string location;
        uint256 date;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 ticketsSold;
    }
    mapping(address => Event) public events;
    event TicketingContractCreated(address indexed eventAddress);

    event EventCreated(uint256 indexed eventId, string name,string location, uint256 date, uint256 ticketPrice, uint256 totalTickets);
    /**
      * @notice Deploy the ERC-721 event contract of the artist caller to be able to create NFTs later
      *
      * @return eventAddress the address of the created event contract
      */
    function createNFTevent(string memory _eventName, string memory _symbol, string memory _location,uint256 _date, uint256 _ticketPrice, uint256 _totalTickets) external returns (address eventAddress) {
        bytes memory eventBytecode = type(Ticketing).creationCode;		
        bytes32 salt = keccak256(abi.encodePacked(_eventName));

        assembly {
            eventAddress := create2(0, add(eventBytecode, 0x20), mload(eventBytecode),salt)
            if iszero(extcodesize(eventAddress)) {
                revert(0,0)
            }
        }
        Ticketing(eventAddress).init(_eventName, _symbol, msg.sender);

        uint256 eventId = uint256(keccak256(abi.encodePacked(_eventName, _date)));
        Event memory newEvent = Event(eventId, _eventName, _location, _date, _ticketPrice, _totalTickets, 0);
        events[msg.sender] = newEvent;
        emit EventCreated(eventId, _eventName, _location, _date, _ticketPrice, _totalTickets);
        emit TicketingContractCreated(eventAddress);
    }
}