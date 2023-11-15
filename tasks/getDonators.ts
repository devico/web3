import { task } from "hardhat/config";

task("getDonators", "Prints the list of donators")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs, hre) => {
    const contractAddr = taskArgs.contract;
    const Donation = await hre.ethers.getContractFactory("Donation");
    const donation = Donation.attach(contractAddr);

    const donators = await donation.getDonators();
    console.log("Donators:", donators);
  });
