import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { ERC20 } from "../../typechain"

task("burn", "Burns a specified amount of tokens")
    .addParam("amount", "The amount of tokens to burn")
    .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
        const [burner] = await hre.ethers.getSigners();

        const token: ERC20 = <ERC20>(
          await hre.ethers.getContractAt("ERC20", "0xb2371A6b319098B7B150f57040209c91e4943537")
        )
        
        await token.connect(burner).burn(taskArgs.amount);
        
        console.log(`Burned ${taskArgs.amount} tokens`);
    });