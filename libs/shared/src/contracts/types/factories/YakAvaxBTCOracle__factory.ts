/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  YakAvaxBTCOracle,
  YakAvaxBTCOracleInterface,
} from "../YakAvaxBTCOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "priceSource_",
        type: "address",
      },
      {
        internalType: "address",
        name: "underlyingToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "shareToken_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
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
    inputs: [
      {
        internalType: "uint80",
        name: "_roundId",
        type: "uint80",
      },
    ],
    name: "getRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceSource",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "shareToken",
    outputs: [
      {
        internalType: "contract IYakStrategy",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "underlyingToken",
    outputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
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
];

const _bytecode =
  "0x60e060405234801561001057600080fd5b50604051610c9f380380610c9f83398101604081905261002f916100e5565b8282826001600160a01b03831661005657634e487b7160e01b600052600160045260246000fd5b6001600160a01b03811661007a57634e487b7160e01b600052600160045260246000fd5b6001600160a01b03821661009e57634e487b7160e01b600052600160045260246000fd5b6001600160601b0319606093841b811660805291831b821660a05290911b1660c05250610127915050565b80516001600160a01b03811681146100e057600080fd5b919050565b6000806000606084860312156100f9578283fd5b610102846100c9565b9250610110602085016100c9565b915061011e604085016100c9565b90509250925092565b60805160601c60a05160601c60c05160601c610b0a6101956000396000818161012d015261063101526000818160d60152818161059401526106600152600081816092015281816101ba01528181610252015281816102e5015281816103c501526104620152610b0a6000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80636c9fa59e1161005b5780636c9fa59e146101285780637284e4161461014f5780639a6fc8f514610164578063feaf968c146101ae57600080fd5b806320531bc91461008d5780632495a599146100d1578063313ce567146100f857806354fd4d5014610112575b600080fd5b6100b47f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6100b47f000000000000000000000000000000000000000000000000000000000000000081565b6101006101b6565b60405160ff90911681526020016100c8565b61011a61024e565b6040519081526020016100c8565b6100b47f000000000000000000000000000000000000000000000000000000000000000081565b6101576102e1565b6040516100c891906108fb565b610177610172366004610860565b610378565b6040805169ffffffffffffffffffff968716815260208101959095528401929092526060830152909116608082015260a0016100c8565b610177610451565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561021157600080fd5b505afa158015610225573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024991906108da565b905090565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166354fd4d506040518163ffffffff1660e01b815260040160206040518083038186803b1580156102a957600080fd5b505afa1580156102bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102499190610848565b60607f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637284e4166040518163ffffffff1660e01b815260040160006040518083038186803b15801561033c57600080fd5b505afa158015610350573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610249919081019061079f565b6040517f9a6fc8f500000000000000000000000000000000000000000000000000000000815269ffffffffffffffffffff8216600482015260009081908190819081906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690639a6fc8f59060240160a06040518083038186803b15801561040757600080fd5b505afa15801561041b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043f9190610883565b939a9299509097509550909350915050565b6000806000806000806000806000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b1580156104b957600080fd5b505afa1580156104cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f19190610883565b945094509450945094506000841215610590576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f436861696e6c696e6b207072696365666565642072657475726e65642062616460448201527f2076616c75652e00000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156105eb57600080fd5b505afa1580156105ff573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062391906108da565b61062e90600a610991565b857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663eab89a5a7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156106b757600080fd5b505afa1580156106cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ef91906108da565b6106fa90600a610991565b610709906402540be400610a3e565b6040518263ffffffff1660e01b815260040161072791815260200190565b60206040518083038186803b15801561073f57600080fd5b505afa158015610753573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107779190610848565b6107819190610a3e565b61078b919061092e565b959b959a5092985090965094509192505050565b6000602082840312156107b0578081fd5b815167ffffffffffffffff808211156107c7578283fd5b818401915084601f8301126107da578283fd5b8151818111156107ec576107ec610aa3565b604051601f8201601f19908116603f0116810190838211818310171561081457610814610aa3565b8160405282815287602084870101111561082c578586fd5b61083d836020830160208801610a5d565b979650505050505050565b600060208284031215610859578081fd5b5051919050565b600060208284031215610871578081fd5b813561087c81610ab9565b9392505050565b600080600080600060a0868803121561089a578081fd5b85516108a581610ab9565b8095505060208601519350604086015192506060860151915060808601516108cc81610ab9565b809150509295509295909350565b6000602082840312156108eb578081fd5b815160ff8116811461087c578182fd5b602081526000825180602084015261091a816040850160208701610a5d565b601f01601f19169190910160400192915050565b60008261094957634e487b7160e01b81526012600452602481fd5b500490565b600181815b8085111561098957816000190482111561096f5761096f610a8d565b8085161561097c57918102915b93841c9390800290610953565b509250929050565b600061087c60ff8416836000826109aa57506001610a38565b816109b757506000610a38565b81600181146109cd57600281146109d7576109f3565b6001915050610a38565b60ff8411156109e8576109e8610a8d565b50506001821b610a38565b5060208310610133831016604e8410600b8410161715610a16575081810a610a38565b610a20838361094e565b8060001904821115610a3457610a34610a8d565b0290505b92915050565b6000816000190483118215151615610a5857610a58610a8d565b500290565b60005b83811015610a78578181015183820152602001610a60565b83811115610a87576000848401525b50505050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b69ffffffffffffffffffff81168114610ad157600080fd5b5056fea2646970667358221220b56da2d03213cbe4b4c6d39282ebc84925445cef040d324a372661fe42c10d0a64736f6c63430008040033";

export class YakAvaxBTCOracle__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    priceSource_: string,
    underlyingToken_: string,
    shareToken_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<YakAvaxBTCOracle> {
    return super.deploy(
      priceSource_,
      underlyingToken_,
      shareToken_,
      overrides || {}
    ) as Promise<YakAvaxBTCOracle>;
  }
  getDeployTransaction(
    priceSource_: string,
    underlyingToken_: string,
    shareToken_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      priceSource_,
      underlyingToken_,
      shareToken_,
      overrides || {}
    );
  }
  attach(address: string): YakAvaxBTCOracle {
    return super.attach(address) as YakAvaxBTCOracle;
  }
  connect(signer: Signer): YakAvaxBTCOracle__factory {
    return super.connect(signer) as YakAvaxBTCOracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YakAvaxBTCOracleInterface {
    return new utils.Interface(_abi) as YakAvaxBTCOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YakAvaxBTCOracle {
    return new Contract(address, _abi, signerOrProvider) as YakAvaxBTCOracle;
  }
}
