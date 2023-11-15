import { task } from "hardhat/config";

task("getSumOfDonations", "Prints the total sum of donations")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs, hre) => {
    const contractAddr = taskArgs.contract;
    const Donation = await hre.ethers.getContractFactory("Donation");
    const donation = Donation.attach(contractAddr);

    const total = await donation.getSumOfDonations();
    console.log("Total Donations:", total.toString());
  });
