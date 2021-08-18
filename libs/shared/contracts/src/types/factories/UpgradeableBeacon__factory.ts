/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UpgradeableBeacon,
  UpgradeableBeaconInterface,
} from "../UpgradeableBeacon";

const _abi = [
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "childImplementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "implementation",
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
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610423806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063715018a611610050578063715018a6146100aa5780638da5cb5b146100b2578063f2fde38b146100c357600080fd5b80633659cfe61461006c5780635c60da1b14610081575b600080fd5b61007f61007a3660046103bf565b6100d6565b005b6065546001600160a01b03165b6040516001600160a01b03909116815260200160405180910390f35b61007f610175565b6033546001600160a01b031661008e565b61007f6100d13660046103bf565b6101db565b6033546001600160a01b031633146101355760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b61013e816102bd565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6033546001600160a01b031633146101cf5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161012c565b6101d96000610360565b565b6033546001600160a01b031633146102355760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161012c565b6001600160a01b0381166102b15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161012c565b6102ba81610360565b50565b803b6103315760405162461bcd60e51b815260206004820152603360248201527f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f60448201527f6e206973206e6f74206120636f6e747261637400000000000000000000000000606482015260840161012c565b6065805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b603380546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156103d0578081fd5b81356001600160a01b03811681146103e6578182fd5b939250505056fea26469706673582212206920b2a5c60d6cea8a000f0de90fa4d209adf37d4430a9cb9b0a73d4693742e364736f6c63430008040033";

export class UpgradeableBeacon__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UpgradeableBeacon> {
    return super.deploy(overrides || {}) as Promise<UpgradeableBeacon>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): UpgradeableBeacon {
    return super.attach(address) as UpgradeableBeacon;
  }
  connect(signer: Signer): UpgradeableBeacon__factory {
    return super.connect(signer) as UpgradeableBeacon__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UpgradeableBeaconInterface {
    return new utils.Interface(_abi) as UpgradeableBeaconInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UpgradeableBeacon {
    return new Contract(address, _abi, signerOrProvider) as UpgradeableBeacon;
  }
}
