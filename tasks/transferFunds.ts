import { task } from "hardhat/config";

task("transferFunds", "Transfers funds to a foundation receiver")
  .addParam("contract", "The contract's address")
  .addParam("foundation", "The foundation's address")
  .addParam("amount", "The amount to send")
  .setAction(async (taskArgs, hre) => {
    const { contract, foundation, amount } = taskArgs;
    const Funds = await hre.ethers.getContractFactory("Funds");
    const funds = Funds.attach(contract);

    const tx = await funds.transferFundsToReceiver(foundation, hre.ethers.utils.parseEther(amount));
    await tx.wait();
    console.log(`Transferred ${amount} ether to the foundation`);
  });