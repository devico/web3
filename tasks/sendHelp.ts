import { task } from "hardhat/config";

task("sendHelp", "Sends help to a specified address")
  .addParam("contract", "The contract's address")
  .addParam("to", "The recipient's address")
  .addParam("amount", "The amount to send")
  .setAction(async (taskArgs, hre) => {
    const { contract, to, amount } = taskArgs;
    const Donation = await hre.ethers.getContractFactory("Donation");
    const donation = Donation.attach(contract);

    const tx = await donation.sendHelp(to, hre.ethers.utils.parseEther(amount));
    await tx.wait();
    console.log(`Help sent: ${amount} ETH to ${to}`);
  });