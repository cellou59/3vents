// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// importing the ERC-721 contract to deploy for an artist
import "./Ticketing.sol";

error UnauthorizedNotTheOwner();
/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for an Artist. S/O @Snow
  * @dev    If the contract is already deployed for an _eventName, it will revert.
  */
contract Factory {
    enum EventType {
        Concert,
        Performance,
        Workshop,
        Conference,
        Exhibition
    }

    struct Event {
      uint id;
      string name;
      EventType eventType;
      string location;
      uint256 date;
      uint256 ticketPrice;
      uint256 totalTickets;
      uint256 ticketsSold;
    }
    address owner;
    mapping(address => Event) public events;

    event EventCreated(uint256 indexed eventId, string name,EventType _evenType,string location, uint256 date, uint256 ticketPrice, uint256 totalTickets,address indexed eventAddress);
    event TicketingContractCreated(address indexed eventAddress);

    constructor(){
      owner = msg.sender;
    }
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert UnauthorizedNotTheOwner();
        }

        _;
    }
    /**
      * @notice Check if an address is the owner of the contract
      * @param _address The address to check
      * @return bool True if the address is the owner, false otherwise
      */
    function isOwner(address _address) public view returns (bool) {
        return _address == owner;
    }
    /**
      * @notice Deploy the ERC-721 event contract of the artist caller to be able to create NFTs later
      *
      * @return eventAddress the address of the created event contract
      */
    function createNFTevent(string memory _eventName, string memory _symbol, EventType _evenType, string memory _location,uint256 _date, uint256 _ticketPrice, uint256 _totalTickets) external 
    onlyOwner returns (address eventAddress) {
        bytes memory eventBytecode = type(Ticketing).creationCode;		
        bytes32 salt = keccak256(abi.encodePacked(_eventName));

        assembly {
            eventAddress := create2(0, add(eventBytecode, 0x20), mload(eventBytecode),salt)
             if iszero(extcodesize(eventAddress)) {
                revert(0,0)
            }
        }
        Ticketing(eventAddress).init(_eventName, _symbol, _date, _ticketPrice, _totalTickets);

        uint256 eventId = uint256(keccak256(abi.encodePacked(_eventName, _date)));
        Event memory newEvent = Event(eventId, _eventName,_evenType, _location, _date, _ticketPrice, _totalTickets, 0);
        events[eventAddress] = newEvent;
        emit EventCreated(eventId, _eventName,_evenType, _location, _date, _ticketPrice, _totalTickets, eventAddress);
        emit TicketingContractCreated(eventAddress);
    }
    /**
      * @notice Withdraw funds from a Ticketing contract
      * @param _eventAddress The address of the Ticketing contract
      */
    function withdrawFromTicketing(address _eventAddress) external  onlyOwner {
        // Call the withdraw function of the Ticketing contract
        Ticketing(_eventAddress).withdraw();
    }
    receive() external payable { }
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        if (balance == 0) revert NoEtherLeftToWithdraw();

        (bool success, ) = owner.call{value: balance}("");
        if (!success) revert TransferFailed();
    }
}
