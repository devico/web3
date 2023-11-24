import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { ERC20 } from "../../typechain"

task("mint", "Mints new tokens")
  .addParam("account", "The account's address")
  .addParam("amount", "The amount of tokens to mint")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const [minter] = await hre.ethers.getSigners();

    const token: ERC20 = <ERC20>(
      await hre.ethers.getContractAt("ERC20", "0xb2371A6b319098B7B150f57040209c91e4943537")
    )

    await token.connect(minter).mint(taskArgs.amount, taskArgs.amount);

    console.log(`Minted ${taskArgs.amount} tokens`);
  });