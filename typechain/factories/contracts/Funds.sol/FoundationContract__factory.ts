/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  FoundationContract,
  FoundationContractInterface,
} from "../../../contracts/Funds.sol/FoundationContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "donationReceiver",
        type: "address",
      },
      {
        internalType: "string",
        name: "desc",
        type: "string",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "EtherSendError",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroEther",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "donations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "donators",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "receiver",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sendFundsToReceiver",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x6080604052604051620016aa380380620016aa8339818101604052810190620000299190620004ce565b620000496200003d6200020760201b60201c565b6200020f60201b60201c565b6200006567102ad6da46b150f960c01b620002d360201b60201c565b6200008167f8828c69b48738e760c01b620002d360201b60201c565b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000de671680762ff7c8af3260c01b620002d360201b60201c565b8060029081620000ef91906200077f565b506200010c67261fd3743fb9776660c01b620002d360201b60201c565b62000128674f32ce5755edf72660c01b620002d360201b60201c565b6003329080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001a767cc47498bdfe4cd8860c01b620002d360201b60201c565b34600460003273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620001f8919062000895565b925050819055505050620008d0565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200031782620002ea565b9050919050565b62000329816200030a565b81146200033557600080fd5b50565b60008151905062000349816200031e565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003a48262000359565b810181811067ffffffffffffffff82111715620003c657620003c56200036a565b5b80604052505050565b6000620003db620002d6565b9050620003e9828262000399565b919050565b600067ffffffffffffffff8211156200040c576200040b6200036a565b5b620004178262000359565b9050602081019050919050565b60005b838110156200044457808201518184015260208101905062000427565b60008484015250505050565b6000620004676200046184620003ee565b620003cf565b90508281526020810184848401111562000486576200048562000354565b5b6200049384828562000424565b509392505050565b600082601f830112620004b357620004b26200034f565b5b8151620004c584826020860162000450565b91505092915050565b60008060408385031215620004e857620004e7620002e0565b5b6000620004f88582860162000338565b925050602083015167ffffffffffffffff8111156200051c576200051b620002e5565b5b6200052a858286016200049b565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200058757607f821691505b6020821081036200059d576200059c6200053f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620006077fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620005c8565b620006138683620005c8565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620006606200065a62000654846200062b565b62000635565b6200062b565b9050919050565b6000819050919050565b6200067c836200063f565b620006946200068b8262000667565b848454620005d5565b825550505050565b600090565b620006ab6200069c565b620006b881848462000671565b505050565b5b81811015620006e057620006d4600082620006a1565b600181019050620006be565b5050565b601f8211156200072f57620006f981620005a3565b6200070484620005b8565b8101602085101562000714578190505b6200072c6200072385620005b8565b830182620006bd565b50505b505050565b600082821c905092915050565b6000620007546000198460080262000734565b1980831691505092915050565b60006200076f838362000741565b9150826002028217905092915050565b6200078a8262000534565b67ffffffffffffffff811115620007a657620007a56200036a565b5b620007b282546200056e565b620007bf828285620006e4565b600060209050601f831160018114620007f75760008415620007e2578287015190505b620007ee858262000761565b8655506200085e565b601f1984166200080786620005a3565b60005b8281101562000831578489015182556001820191506020850194506020810190506200080a565b868310156200085157848901516200084d601f89168262000741565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620008a2826200062b565b9150620008af836200062b565b9250828201905080821115620008ca57620008c962000866565b5b92915050565b610dca80620008e06000396000f3fe60806040526004361061008a5760003560e01c8063ac62f56611610059578063ac62f566146101c5578063cc6cb19a14610202578063ed88c68e1461023f578063f2fde38b14610249578063f7260d3e1461027257610137565b80630bcd177e1461013c578063715018a6146101585780637284e4161461016f5780638da5cb5b1461019a57610137565b36610137576100a36715ecbaf5d6804a3a60c01b61029d565b60003403610105576100bf67c9212e540a728dd760c01b61029d565b6100d367b1445d1651140e9860c01b61029d565b6040517f25b656fc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610119671d698b506245179160c01b61029d565b61012d67e8eb24d7ef26207160c01b61029d565b6101356102a0565b005b600080fd5b610156600480360381019061015191906109cf565b610448565b005b34801561016457600080fd5b5061016d61067f565b005b34801561017b57600080fd5b50610184610693565b6040516101919190610a8c565b60405180910390f35b3480156101a657600080fd5b506101af610721565b6040516101bc9190610aef565b60405180910390f35b3480156101d157600080fd5b506101ec60048036038101906101e791906109cf565b61074a565b6040516101f99190610aef565b60405180910390f35b34801561020e57600080fd5b5061022960048036038101906102249190610b36565b610789565b6040516102369190610b72565b60405180910390f35b6102476102a0565b005b34801561025557600080fd5b50610270600480360381019061026b9190610b36565b6107a1565b005b34801561027e57600080fd5b50610287610824565b6040516102949190610aef565b60405180910390f35b50565b6102b467be9d7b69ee79b0a160c01b61029d565b6102c867741d020a3ccc17a360c01b61029d565b6102dc6711d55726c114030a60c01b61029d565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036103c7576103376760643c7b13b08d8060c01b61029d565b61034b6716ba2398f25d2b7a60c01b61029d565b61035f675273f9ac4b24b17260c01b61029d565b6003339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506103dc565b6103db679a2d5831ad6959a460c01b61029d565b5b6103f0670cf37df3f6599c5460c01b61029d565b34600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461043f9190610bbc565b92505081905550565b61045c67817a888a896e06da60c01b61029d565b61046461084a565b610478675e9e17b7652f6c1760c01b61029d565b61048c674a0e451c984f7cc260c01b61029d565b6104a067ffd5dd7edeb5834960c01b61029d565b6104b467a5322504b5ca57b160c01b61029d565b60008103610516576104d06781bcf94df3a8ac2060c01b61029d565b6104e467107ff302220c64c260c01b61029d565b6040517f25b656fc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61052a675fdaae04eb020a8760c01b61029d565b61053e67e1f0fdd6b489ee6a60c01b61029d565b6105526729e8e1bb47905f3e60c01b61029d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168260405161059a90610c21565b60006040518083038185875af1925050503d80600081146105d7576040519150601f19603f3d011682016040523d82523d6000602084013e6105dc565b606091505b505090506105f4672ee7f8b2f098dcba60c01b61029d565b61060867d3b422d6c7aefa0560c01b61029d565b806106675761062167ce3a4c5df51bdd8c60c01b61029d565b61063567ab6b89fd73f354c460c01b61029d565b6040517f3b6ce6ce00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61067b67627fc77c1e05375860c01b61029d565b5050565b61068761084a565b61069160006108c8565b565b600280546106a090610c65565b80601f01602080910402602001604051908101604052809291908181526020018280546106cc90610c65565b80156107195780601f106106ee57610100808354040283529160200191610719565b820191906000526020600020905b8154815290600101906020018083116106fc57829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6003818154811061075a57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60046020528060005260406000206000915090505481565b6107a961084a565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610818576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080f90610d08565b60405180910390fd5b610821816108c8565b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61085261098c565b73ffffffffffffffffffffffffffffffffffffffff16610870610721565b73ffffffffffffffffffffffffffffffffffffffff16146108c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108bd90610d74565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600080fd5b6000819050919050565b6109ac81610999565b81146109b757600080fd5b50565b6000813590506109c9816109a3565b92915050565b6000602082840312156109e5576109e4610994565b5b60006109f3848285016109ba565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a36578082015181840152602081019050610a1b565b60008484015250505050565b6000601f19601f8301169050919050565b6000610a5e826109fc565b610a688185610a07565b9350610a78818560208601610a18565b610a8181610a42565b840191505092915050565b60006020820190508181036000830152610aa68184610a53565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ad982610aae565b9050919050565b610ae981610ace565b82525050565b6000602082019050610b046000830184610ae0565b92915050565b610b1381610ace565b8114610b1e57600080fd5b50565b600081359050610b3081610b0a565b92915050565b600060208284031215610b4c57610b4b610994565b5b6000610b5a84828501610b21565b91505092915050565b610b6c81610999565b82525050565b6000602082019050610b876000830184610b63565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610bc782610999565b9150610bd283610999565b9250828201905080821115610bea57610be9610b8d565b5b92915050565b600081905092915050565b50565b6000610c0b600083610bf0565b9150610c1682610bfb565b600082019050919050565b6000610c2c82610bfe565b9150819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610c7d57607f821691505b602082108103610c9057610c8f610c36565b5b50919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610cf2602683610a07565b9150610cfd82610c96565b604082019050919050565b60006020820190508181036000830152610d2181610ce5565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610d5e602083610a07565b9150610d6982610d28565b602082019050919050565b60006020820190508181036000830152610d8d81610d51565b905091905056fea26469706673582212206d944db139ebe39a797a5a975109ee1275d00e36f5fadaccb187faed8a3f814b64736f6c63430008120033";

type FoundationContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FoundationContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FoundationContract__factory extends ContractFactory {
  constructor(...args: FoundationContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    donationReceiver: PromiseOrValue<string>,
    desc: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<FoundationContract> {
    return super.deploy(
      donationReceiver,
      desc,
      overrides || {}
    ) as Promise<FoundationContract>;
  }
  override getDeployTransaction(
    donationReceiver: PromiseOrValue<string>,
    desc: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(donationReceiver, desc, overrides || {});
  }
  override attach(address: string): FoundationContract {
    return super.attach(address) as FoundationContract;
  }
  override connect(signer: Signer): FoundationContract__factory {
    return super.connect(signer) as FoundationContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FoundationContractInterface {
    return new utils.Interface(_abi) as FoundationContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FoundationContract {
    return new Contract(address, _abi, signerOrProvider) as FoundationContract;
  }
}
