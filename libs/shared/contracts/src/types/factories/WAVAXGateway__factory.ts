/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WAVAXGateway, WAVAXGatewayInterface } from "../WAVAXGateway";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "wavax",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "authorizeVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "vaultID",
        type: "uint256",
      },
    ],
    name: "depositAVAX",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "vaultID",
        type: "uint256",
      },
    ],
    name: "destroyVault",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "getPaid",
    outputs: [],
    stateMutability: "payable",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "vaultID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawAVAX",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b506040516110d83803806110d883398101604081905261002f916100c1565b61003833610071565b6001600160a01b03811661005c57634e487b7160e01b600052600160045260246000fd5b60601b6001600160601b0319166080526100ef565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100d2578081fd5b81516001600160a01b03811681146100e8578182fd5b9392505050565b60805160601c610fa1610137600039600081816103810152818161041d0152818161053f015281816105db015281816107710152818161098b0152610ca30152610fa16000f3fe60806040526004361061007f5760003560e01c806397268a181161004e57806397268a18146100f45780639cd3382414610114578063e4aabe9114610127578063f2fde38b1461013a57600080fd5b80633c4728d11461008b57806363b8817c146100a0578063715018a6146100b35780638da5cb5b146100c857600080fd5b3661008657005b600080fd5b61009e610099366004610ebf565b61015a565b005b61009e6100ae366004610e80565b6104b6565b3480156100bf57600080fd5b5061009e610671565b3480156100d457600080fd5b50600054604080516001600160a01b039092168252519081900360200190f35b34801561010057600080fd5b5061009e61010f366004610e80565b6106d7565b61009e610122366004610ebf565b6107f1565b61009e610135366004610eea565b610a7d565b34801561014657600080fd5b5061009e610155366004610e80565b610d36565b604051631b9ad02560e31b815260048101829052819083906001600160a01b0382169063dcd681289060240160206040518083038186803b15801561019e57600080fd5b505afa1580156101b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d69190610f1e565b6102275760405162461bcd60e51b815260206004820152601460248201527f5661756c7420646f6573206e6f7420657869737400000000000000000000000060448201526064015b60405180910390fd5b6040516331a9108f60e11b81526004810183905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561026957600080fd5b505afa15801561027d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a19190610ea3565b6001600160a01b0316146102f75760405162461bcd60e51b815260206004820152601960248201527f5661756c74206973206e6f74206f776e656420627920796f7500000000000000604482015260640161021e565b6040517f85e290a3000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b038516906385e290a390602401600060405180830381600087803b15801561035257600080fd5b505af1158015610366573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a082319060240160206040518083038186803b1580156103cc57600080fd5b505afa1580156103e0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104049190610f3e565b604051632e1a7d4d60e01b8152600481018290529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b15801561046957600080fd5b505af115801561047d573d6000803e3d6000fd5b505060405133925083156108fc02915083906000818181858888f193505050501580156104ae573d6000803e3d6000fd5b505050505050565b6040517f63b8817c0000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b038216906363b8817c90602401600060405180830381600087803b15801561051057600080fd5b505af1158015610524573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a082319060240160206040518083038186803b15801561058a57600080fd5b505afa15801561059e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c29190610f3e565b604051632e1a7d4d60e01b8152600481018290529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b15801561062757600080fd5b505af115801561063b573d6000803e3d6000fd5b505060405133925083156108fc02915083906000818181858888f1935050505015801561066c573d6000803e3d6000fd5b505050565b6000546001600160a01b031633146106cb5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161021e565b6106d56000610e18565b565b6000546001600160a01b031633146107315760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161021e565b6040517f095ea7b30000000000000000000000000000000000000000000000000000000081526001600160a01b03828116600483015260001960248301527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b390604401602060405180830381600087803b1580156107b557600080fd5b505af11580156107c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ed9190610f1e565b5050565b604051631b9ad02560e31b815260048101829052819083906001600160a01b0382169063dcd681289060240160206040518083038186803b15801561083557600080fd5b505afa158015610849573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086d9190610f1e565b6108b95760405162461bcd60e51b815260206004820152601460248201527f5661756c7420646f6573206e6f74206578697374000000000000000000000000604482015260640161021e565b6040516331a9108f60e11b81526004810183905233906001600160a01b03831690636352211e9060240160206040518083038186803b1580156108fb57600080fd5b505afa15801561090f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109339190610ea3565b6001600160a01b0316146109895760405162461bcd60e51b815260206004820152601960248201527f5661756c74206973206e6f74206f776e656420627920796f7500000000000000604482015260640161021e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b1580156109e457600080fd5b505af11580156109f8573d6000803e3d6000fd5b50506040517fece13732000000000000000000000000000000000000000000000000000000008152600481018790523460248201526001600160a01b038816935063ece1373292506044019050600060405180830381600087803b158015610a5f57600080fd5b505af1158015610a73573d6000803e3d6000fd5b5050505050505050565b604051631b9ad02560e31b815260048101839052829084906001600160a01b0382169063dcd681289060240160206040518083038186803b158015610ac157600080fd5b505afa158015610ad5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af99190610f1e565b610b455760405162461bcd60e51b815260206004820152601460248201527f5661756c7420646f6573206e6f74206578697374000000000000000000000000604482015260640161021e565b6040516331a9108f60e11b81526004810183905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610b8757600080fd5b505afa158015610b9b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbf9190610ea3565b6001600160a01b031614610c155760405162461bcd60e51b815260206004820152601960248201527f5661756c74206973206e6f74206f776e656420627920796f7500000000000000604482015260640161021e565b6040517f767a7b0500000000000000000000000000000000000000000000000000000000815260048101859052602481018490526001600160a01b0386169063767a7b0590604401600060405180830381600087803b158015610c7757600080fd5b505af1158015610c8b573d6000803e3d6000fd5b5050604051632e1a7d4d60e01b8152600481018690527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169250632e1a7d4d9150602401600060405180830381600087803b158015610cf157600080fd5b505af1158015610d05573d6000803e3d6000fd5b505060405133925085156108fc02915085906000818181858888f193505050501580156104ae573d6000803e3d6000fd5b6000546001600160a01b03163314610d905760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161021e565b6001600160a01b038116610e0c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161021e565b610e1581610e18565b50565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208284031215610e91578081fd5b8135610e9c81610f56565b9392505050565b600060208284031215610eb4578081fd5b8151610e9c81610f56565b60008060408385031215610ed1578081fd5b8235610edc81610f56565b946020939093013593505050565b600080600060608486031215610efe578081fd5b8335610f0981610f56565b95602085013595506040909401359392505050565b600060208284031215610f2f578081fd5b81518015158114610e9c578182fd5b600060208284031215610f4f578081fd5b5051919050565b6001600160a01b0381168114610e1557600080fdfea26469706673582212207b08ebca243316bbcefb60bd5a0333f79ffe78e7a0eab87cf6c529510a2e57e564736f6c63430008040033";

export class WAVAXGateway__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    wavax: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WAVAXGateway> {
    return super.deploy(wavax, overrides || {}) as Promise<WAVAXGateway>;
  }
  getDeployTransaction(
    wavax: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(wavax, overrides || {});
  }
  attach(address: string): WAVAXGateway {
    return super.attach(address) as WAVAXGateway;
  }
  connect(signer: Signer): WAVAXGateway__factory {
    return super.connect(signer) as WAVAXGateway__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WAVAXGatewayInterface {
    return new utils.Interface(_abi) as WAVAXGatewayInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WAVAXGateway {
    return new Contract(address, _abi, signerOrProvider) as WAVAXGateway;
  }
}
