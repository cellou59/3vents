const hre = require("hardhat");

async function main() {
  const Ticketing = await ethers.deployContract("Ticketing");
  await Ticketing.waitForDeployment();

  console.log(`Ticketing deployed to ${Ticketing.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
