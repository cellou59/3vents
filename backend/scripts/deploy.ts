const hre = require("hardhat");

async function main() {
  const events = [
    {
      name: 'Tuesday',
      date: 'December 12',
      dateTime: '2023-12-12',
      artists: [
        {
          description: 'John Mayer',
          type: 'Concert',
          time: '19:00',
          image: 'https://i.pinimg.com/474x/d3/5b/e4/d35be4bec547e5c27a43fba00a942215.jpg',
          location: 'Los Angeles',
          price: 30,
          status: 'Available',
        },
        {
          description: 'David Guetta',
          type: 'Workshop',
          time: '14:30',
          image: 'https://i.pinimg.com/474x/62/13/38/621338e2bc98b286c9cb74ef2e39b4bf.jpg',
          location: 'Los Angeles',
          price: 30,
          status: 'Available',
        },
        {
          description: 'Taylor Swift',
          type: 'Concert',
          time: '20:15',
          image: 'https://i.pinimg.com/474x/d4/e1/b2/d4e1b2fd5da8f70bc716ddb98ffa9397.jpg',
          location: 'Chicago',
          price: 45,
          status: 'Available',
        },
        {
          description: 'Ed Sheeran',
          type: 'Concert',
          time: '21:30',
          image: 'https://i.pinimg.com/474x/f8/59/09/f859095b71a8cf5df2f9eca65faf31c4.jpg',
          location: 'San Francisco',
          price: 25,
          status: 'Sold Out',
        },
        {
          description: 'Tim Cook',
          type: 'Conference',
          time: '13:00',
          image: 'https://i.pinimg.com/474x/b8/94/89/b894894eb688a3f793201d71b4f6fd64.jpg',
          location: 'Miami',
          price: 55,
          status: 'Available',
        },
      ],
    },
    {
      name: 'Wednesday',
      date: 'December 13',
      dateTime: '2023-12-13',
      artists: [
        {
          description: 'Elon Musk',
          type: 'Conference',
          time: '16:00',
          image: 'https://i.pinimg.com/474x/62/1f/65/621f6520daaa29ad338da19b45ae3b7c.jpg',
          location: 'Los Angeles',
          price: 50,
          status: 'Available',
        },
        {
          description: 'Sheryl Sandberg',
          type: 'Conference',
          time: '11:30',
          image: 'https://i.pinimg.com/474x/87/7b/00/877b00d934a3a2e84ddbc808d21a1b94.jpg',
          location: 'New York City',
          price: 60,
          status: 'Sold Out',
        },
        {
          description: 'Armin van Buuren',
          type: 'Workshop',
          time: '15:00',
          image: 'https://i.pinimg.com/474x/f7/62/d4/f762d45bc79352dd2417a6dfd03f19fc.jpg',
          location: 'Chicago',
          price: 45,
          status: 'Available',
        },
        {
          description: 'Satya Nadella',
          type: 'Conference',
          time: '14:30',
          image: 'https://i.pinimg.com/474x/04/4a/d1/044ad1c2782c79cafff70ec9ade95d20.jpg',
          location: 'Chicago',
          price: 45,
          status: 'Available',
        },
        {
          description: 'Martin Garrix',
          type: 'Workshop',
          time: '13:30',
          image: 'https://i.pinimg.com/474x/e7/9b/da/e79bdafc7294180697e7d4b58d156104.jpg',
          location: 'Miami',
          price: 35,
          status: 'Available',
        },
      ],
    },
    {
      name: 'Thursday',
      date: 'December 14',
      dateTime: '2023-12-14',
      artists: [
        {
          description: 'Bruno Mars',
          type: 'Concert',
          time: '21:45',
          image: 'https://i.pinimg.com/474x/c6/a1/68/c6a1686b7707aead89c5aa6ffbd41454.jpg',
          location: 'Miami',
          price: 35,
          status: 'Available',
        },
        {
          description: 'Calvin Harris',
          type: 'Workshop',
          time: '11:00',
          image: 'https://i.pinimg.com/474x/70/4c/f9/704cf9dbcd37f8aa799452947b9e8879.jpg',
          location: 'New York City',
          price: 40,
          status: 'Sold Out',
        },
        {
          description: 'Barack Obama',
          type: 'Conference',
          time: '16:00',
          image: 'https://i.pinimg.com/474x/cf/f3/48/cff3482226e8409a8a54f0be9b365c2a.jpg',
          location: 'San Francisco',
          price: 55,
          status: 'Sold Out',
        },
        {
          description: 'Andy Warhol',
          type: 'Exhibition',
          time: '16:30',
          image: 'https://i.pinimg.com/474x/95/37/a5/9537a53de426f19954fc076fa934a2d0.jpg',
          location: 'San Francisco',
          price: 40,
          status: 'Sold Out',
        },
        {
          description: 'Hardwell',
          type: 'Workshop',
          time: '16:30',
          image: 'https://i.pinimg.com/474x/97/35/9a/97359ab44d83e0b4ff37e540d87621f3.jpg',
          location: 'San Francisco',
          price: 25,
          status: 'Sold Out',
        },
      ],
  
    },
    {
      name: 'Friday',
      date: 'December 15',
      dateTime: '2023-12-15',
      artists: [
        {
          description: 'Pablo Picasso',
          type: 'Exhibition',
          time: '10:30',
          image: 'https://i.pinimg.com/474x/98/1a/52/981a52f016e6526d00e04a428ec1469c.jpg',
          location: 'Paris',
          price: 20,
          status: 'Available',
        },
        {
          description: 'Leonardo da Vinci',
          type: 'Exhibition',
          time: '12:00',
          image: 'https://i.pinimg.com/474x/8f/f3/4c/8ff34c7cc25f1425ec6b8d3c1ce673ed.jpg',
          location: 'London',
          price: 25,
          status: 'Sold Out',
        },
        {
          description: 'Rihanna',
          type: 'Performance',
          time: '21:00',
          image: 'https://i.pinimg.com/474x/ef/76/c3/ef76c346e6376cf058f6e3317069cb46.jpg',
          location: 'Miami',
          price: 65,
          status: 'Available',
        },
        {
          description: 'Frida Kahlo',
          type: 'Exhibition',
          time: '15:00',
          image: 'https://i.pinimg.com/474x/18/45/ad/1845add0f273c2f57233a0b3fb55b73f.jpg',
          location: 'Los Angeles',
          price: 35,
          status: 'Available',
        },
        // {
        //   description: 'Tim Cook',
        //   type: 'Conference',
        //   time: '13:00',
        //   image: 'https://i.pinimg.com/474x/b8/94/89/b894894eb688a3f793201d71b4f6fd64.jpg',
        //   location: 'Miami',
        //   price: 55,
        //   status: 'Available',
        // },
      ],
    },
    {
      name: 'Saturday',
      date: 'December 16',
      dateTime: '2023-12-16',
      artists: [
        {
          description: 'Beyoncé',
          type: 'Performance',
          time: '18:00',
          image: 'https://i.pinimg.com/474x/2a/b5/4f/2ab54f27287c1073edbc1fc16db78693.jpg',
          location: 'Los Angeles',
          price: 55,
          status: 'Available',
        },
        {
          description: 'Lady Gaga',
          type: 'Performance',
          time: '19:30',
          image: 'https://i.pinimg.com/474x/10/77/b6/1077b6b8d8b90b4350e46209dbaf4c7a.jpg',
          location: 'New York City',
          price: 60,
          status: 'Sold Out',
        },
        {
          description: 'Vincent van Gogh',
          type: 'Exhibition',
          time: '13:30',
          image: 'https://i.pinimg.com/474x/65/a1/9d/65a19d851442d5816097cadbae1c34fa.jpg',
          location: 'New York City',
          price: 30,
          status: 'Available',
        },
    
        {
          description: 'Justin Timberlake',
          type: 'Performance',
          time: '22:30',
          image: 'https://i.pinimg.com/474x/cb/f7/0d/cbf70de1e78293143a45329429d7ad84.jpg',
          location: 'Chicago',
          price: 70,
          status: 'Available',
        },
        {
          description: 'Alicia Keys',
          type: 'Concert',
          time: '20:30',
          image: 'https://i.pinimg.com/474x/b3/7c/47/b37c47186efef28e3d6ffa0d323c7a8a.jpg',
          location: 'New York City',
          price: 40,
          status: 'Sold Out',
        },
        {
          description: 'Adele',
          type: 'Performance',
          time: '21:00',
          image: 'https://i.pinimg.com/474x/bd/0f/73/bd0f737d959bf6e98f4879a31ad7d5ea.jpg',
          location: 'San Francisco',
          price: 75,
          status: 'Sold Out',
        },
      ],
    },
  ];

    const factory = await ethers.deployContract("Factory");
    await factory.waitForDeployment();

    
    console.log("Factory deployed to:", factory.target);
  //   console.log("--------------------------------------");
  //   let totalEventsDeployed = 0;

  //   for (let day of events) {
  //       for (let artistEvent of day.artists) {
      
  //           const eventDateTime = new Date(day.dateTime + "T" + artistEvent.time).getTime();

           
  //           const eventType = mapEventType(artistEvent.type);
  //           const ticketPrice = ethers.parseUnits((artistEvent.price).toString(), "wei");
     
  //           const createTx = await factory.createNFTevent(
  //               artistEvent.description, 
  //               artistEvent.description.substring(0.3).toUpperCase(), 
  //               eventType, 
  //               artistEvent.location, 
  //               eventDateTime, 
  //               ticketPrice, 
  //               100 
  //           );

  //           const txResult = await createTx.wait();
  //           const ticketingAddress = txResult.logs[0].address; 
  //           console.log(`Event ${artistEvent.description} created at Ticketing contract: ${ticketingAddress}, price : ${ticketPrice}`);
  //           totalEventsDeployed++;

  //       }
  //   }
  // console.log(`---------------------------------------------------------------------`);
  // console.log(`Total number of events deployed: ${totalEventsDeployed}`);
  // await displayEventCounts(factory);
  // console.log("--------------------------------------");
  console.log("Factory deployed to:", factory.target);
  console.log("--------------------------------------");
}

function mapEventType(type:string) {
    switch (type) {
        case "Concert": return 0;
        case "Workshop": return 1;
        case "Conference": return 2;
        case "Exhibition": return 3;
        case "Performance": return 4;
        default: return 0; 
    }
}

async function displayEventCounts(factory) {
  const eventCounts = {
    Concert: 0,
    Workshop: 0,
    Conference: 0,
    Exhibition: 0,
    Performance: 0
  };

  const filter = factory.filters.EventCreated();
  const eventLogs = await factory.queryFilter(filter);

  for (const log of eventLogs) {
    const eventType = Number(log.args[2]);
    switch (eventType) {
      case 0: eventCounts["Concert"]++; break;
      case 1: eventCounts["Workshop"]++; break;
      case 2: eventCounts["Conference"]++; break;
      case 3: eventCounts["Exhibition"]++; break;
      case 4: eventCounts["Performance"]++; break;
    }
  }
  console.log("Event counts by type:");
  for (const [type, count] of Object.entries(eventCounts)) {
    console.log(`${type}: ${count}`);
  }
}


main().catch((error) => {
    console.error('Error',error);
    process.exitCode = 1;
});

