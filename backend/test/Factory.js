const { expect } = require("chai");
const { ethers } = require("hardhat");
const events = [
    {
      name: "Concert 1",
      symbol: "CON1",
      eventType: 0, // Supposons que 0 représente 'Concert'
      location: "Location 1",
      date: 12345678,
      ticketPrice: ethers.parseEther("0.1"),
      totalTickets: 100
    },
    {
      name: "Concert 2",
      symbol: "CON2",
      eventType: 0,
      location: "Location 2",
      date: 23456789,
      ticketPrice: ethers.parseEther("0.2"),
      totalTickets: 150
    }
    // Ajoutez plus d'événements selon vos besoins
  ];
  

async function setup() {
  const [owner, otherAccount] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();

  return { factory, owner, otherAccount };
}
async function createEvents(factory) {
    for (const event of events) {
        await factory.createNFTevent(event.name, event.symbol, event.eventType, event.location, event.date, event.ticketPrice, event.totalTickets);
    }
}
 
describe("Factory Contract - deployment", function () {
    let factory, owner;
  
    beforeEach(async function () {
      ({ factory, owner, otherAccount } = await setup());
    });

    it("Should set the correct owner on deployment", async function () {
      expect(await factory.isOwner(owner.address)).to.equal(true);
    });
    //   it("Should call withdraw on the Ticketing contract", async function () {
    //     // Vous devez d'abord déployer un contrat Ticketing et simuler un scénario où il a de l'Ether à retirer
    //     // Ce test dépend de la logique interne du contrat Ticketing, donc il peut nécessiter un mock ou un stub
    //   });
  
    //   it("Should revert if called by non-owner", async function () {
    //     // Similaire au test ci-dessus, mais en vérifiant la gestion des erreurs
    //   });
  
    //   // Ajouter d'autres scénarios de test pour withdrawFromTicketing si nécessaire
    // });
  
    // describe("withdraw Function", function () {
    //   it("Should withdraw Ether to the owner", async function () {
    //     // Envoyer de l'Ether au contrat Factory, puis appeler withdraw et vérifier que l'Ether est transféré au owner
    //   });
  
    //   it("Should revert if there is no Ether to withdraw", async function () {
    //     // Appeler withdraw sans Ether dans le contrat et vérifier qu'il échoue comme prévu
    //   });
  
    //   it("Should revert if called by non-owner", async function () {
    //     // Appeler withdraw en tant que non-owner et vérifier que cela échoue
    //   });
    // });
  
    // Ajouter d'autres tests pour couvrir tous les scénarios possibles, y compris les fonctions receive, les conditions d'erreur, etc.
});
  
describe("Factory Contract - createNFTevent Function", function() {
    let factory, owner;
  
    beforeEach(async function () {
      ({ factory, owner} = await setup());
    });
    
    let eventName, eventSymbol, eventType, eventLocation, eventDate, ticketPrice, totalTickets;
    let createEventTx, receipt, eventCreatedEvent, ticketingContractCreatedEvent, eventId, eventCreatedEventName, contractTicketingAddress;

    beforeEach(async function() {
        [owner] = await ethers.getSigners();
        const Factory = await ethers.getContractFactory("Factory");
        factory = await Factory.deploy();

        eventName = "Test Event";
        eventSymbol = "TE";
        eventType = 0; // Concert
        eventLocation = "Test Location";
        eventDate = 12345678;
        ticketPrice = ethers.parseEther("0.1");
        totalTickets = 100;

        // Utiliser AbiCoder et keccak256 de ethers
        const abiCoder = ethers.AbiCoder.defaultAbiCoder();
        const eventIdBytes = abiCoder.encode(["string", "uint256"], [eventName, eventDate]);
        eventId = BigInt(ethers.keccak256(eventIdBytes));
        
  

        createEventTx = await factory.createNFTevent(eventName, eventSymbol, eventType, eventLocation, eventDate, ticketPrice, totalTickets);
        receipt = await createEventTx.wait();

        
        eventCreatedEvent = receipt.logs[1];
        eventCreatedEventId = eventCreatedEvent.args[0];
       
       // console.log('🚀 ~ file: Factory.js:115 ~ beforeEach ~ receipt.logs[1]:', receipt.logs[1])
        eventCreatedEventName = eventCreatedEvent.args[1];



        contractTicketingAddress = receipt.logs[0].address;

        ticketingContractCreatedEvent = receipt.logs[2];
        ticketingContractCreatedEventAddress = ticketingContractCreatedEvent.args[0];
    });

    it("Should emit EventCreated event", async function() {
        expect(eventCreatedEvent).to.exist;
    });

    // it("Should emit EventCreated event with correct eventId", async function() {
    //     console.log('🚀 ~ file: Factory.js:134 ~ it ~ eventId:', eventId)
    //     console.log('🚀 ~ file: Factory.js:136 ~ it ~ eventCreatedEventId:', eventCreatedEventId)
    //     expect(eventCreatedEventId).to.equal(eventId);
    // });

    it("Should emit EventCreated event with correct eventName", async function() {
        expect(eventCreatedEventName).to.equal(eventName);
    });

    it("Should emit TicketingContractCreated event", async function() {
        expect(ticketingContractCreatedEvent).to.exist;
    });

    it("Should have correct contract address in TicketingContractCreated event", async function() {
        expect(contractTicketingAddress).to.equal(ticketingContractCreatedEventAddress);
    });
});

describe("Factory Contract - withdrawFromTicketing ", function() {
    let factory,factoryAddress, ticketing, owner, buyer;
    let ticketPrice = ethers.parseEther("0.1");


    beforeEach(async function() {
        [owner, buyer]= await ethers.getSigners();
        const Factory = await ethers.getContractFactory("Factory");
        factory = await Factory.deploy();

        const tx = await factory.createNFTevent("TestEvent", "TE", 0, "TestLocation", 1701840292000, ticketPrice, 100);
        const receipt = await tx.wait();
        factoryAddress = factory.target;
        ticketingAddress = receipt.logs[0].address;

        ticketing = await ethers.getContractAt("Ticketing", ticketingAddress);
        eventCreatedEvent = receipt.logs[1];
        eventCreatedEventId = eventCreatedEvent.args[0];

        await ticketing.buyTickets(eventCreatedEventId, 1, [1], { value: ticketPrice });
    });

    it("Factory balance should be correct before withdrawal", async function() {
        const initialFactoryBalance = await ethers.provider.getBalance(factoryAddress);
        expect(initialFactoryBalance).to.equal(0); // ou une autre valeur attendue
    });

    it("Ticketing balance should be greater than zero before withdrawal", async function() {
        const initialTicketingBalance = await ethers.provider.getBalance(ticketingAddress);
        expect(initialTicketingBalance).to.be.above(0);
    });

    it("Should have a non-zero balance in Ticketing contract after ticket purchase", async function () {
        const contractBalance = await ethers.provider.getBalance(ticketingAddress);
        expect(contractBalance).to.equal(ticketPrice);
    });

    // it("Should successfully call withdrawFromTicketing", async function () {
    //     await expect(factory.withdrawFromTicketing(ticketingAddress))
    //         .to.emit(ticketing, "Withdraw") 
    //         .withArgs(owner.address, ticketPrice);
    // });

    it("Should transfer funds from Ticketing contract to Factory contract", async function () {
        const initialFactoryBalance = await ethers.provider.getBalance(factoryAddress);
        await factory.withdrawFromTicketing(ticketingAddress);
        const finalFactoryBalance = await ethers.provider.getBalance(factoryAddress);
        expect(finalFactoryBalance).to.be.above(initialFactoryBalance);
    });

    it("Should reduce the balance of Ticketing contract to zero after withdrawal", async function () {
        await factory.withdrawFromTicketing(ticketingAddress);
        const finalContractBalance = await ethers.provider.getBalance(ticketingAddress);
        expect(finalContractBalance).to.equal(0);
    });

});

describe("Factory Contract Withdrawal Functionality", function () {
    let factory, owner, nonOwner;
    let ticketPrice = ethers.parseEther("0.1");
    beforeEach(async function () {
        [owner, nonOwner] = await ethers.getSigners();
        const Factory = await ethers.getContractFactory("Factory");
        factory = await Factory.deploy();
        // Assurez-vous que factory ait un solde si nécessaire
    });

    it("Should fail to withdraw if no Ether is available", async function () {
        await expect(factory.withdraw()).to.be.revertedWithCustomError(factory, "NoEtherLeftToWithdraw");   
    });

    it("Should withdraw Ether to the owner when balance is available", async function () {
        const tx = await factory.createNFTevent("TestEvent", "TE", 0, "TestLocation", 1701840292000, ticketPrice, 100);
        const receipt = await tx.wait();
        factoryAddress = factory.target;
        ticketingAddress = receipt.logs[0].address;

        ticketing = await ethers.getContractAt("Ticketing", ticketingAddress);
        eventCreatedEvent = receipt.logs[1];
        eventCreatedEventId = eventCreatedEvent.args[0];

        await ticketing.buyTickets(eventCreatedEventId, 1, [1], { value: ticketPrice });
        await factory.withdrawFromTicketing(ticketingAddress);

        const contractBalance = await ethers.provider.getBalance(factory.target);
        
        await expect(factory.withdraw()).to.changeEtherBalances([factory, owner], [-contractBalance, contractBalance]);

    });

    it("Should fail to withdraw if no Ether is available", async function () {
        // Assurez-vous que le contrat n'a pas de solde
        await expect(factory.withdraw()).to.be.revertedWithCustomError(factory, "NoEtherLeftToWithdraw"); 
    });

    it("Should only allow the owner to withdraw", async function () {
        // Assurez-vous que le contrat a un solde si nécessaire
        await expect(factory.connect(nonOwner).withdraw()).to.be.revertedWithCustomError(factory, "UnauthorizedNotTheOwner")
    });
});

