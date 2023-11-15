import hre from "hardhat";

async function main() {
  const Donation = await hre.ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();

  await donation.deployed();

  console.log("Donation deployed to:", donation.address);

  const Funds = await hre.ethers.getContractFactory("Funds");
  const funds = await Funds.deploy();
  await funds.deployed();
  console.log("Funds deployed to:", funds.address);
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });