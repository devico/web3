import { task } from "hardhat/config";

task("createFoundation", "Creates a new foundation")
  .addParam("contract", "The contract's address")
  .addParam("receiver", "The donation receiver's address")
  .addParam("description", "Description of the foundation")
  .addParam("value", "Amount of ether to send", "0")
  .setAction(async (taskArgs, hre) => {
    const { contract, receiver, description, value } = taskArgs;
    const Funds = await hre.ethers.getContractFactory("Funds");
    const funds = Funds.attach(contract);

    const tx = await funds.createFoundation(receiver, description, { value: hre.ethers.utils.parseEther(value) });
    await tx.wait();
    console.log("Foundation created");
  });