import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { ERC20 } from "../../typechain"

task("balanceOf", "Gets the balance of a specified account")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
        const token: ERC20 = <ERC20>(
          await hre.ethers.getContractAt("ERC20", "0xb2371A6b319098B7B150f57040209c91e4943537")
        )
        
        const balance = await token.balanceOf(taskArgs.account);
        
        console.log(`Balance of ${taskArgs.account}: ${balance}`);
    });