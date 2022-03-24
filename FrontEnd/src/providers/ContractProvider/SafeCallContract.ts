import { Contract, ContractFunction, ContractInterface } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import { defineReadOnly } from '@ethersproject/properties';
import { FunctionFragment } from '@ethersproject/abi';

function buildSafeCall(contract: Contract, signature: string, fragment: FunctionFragment) {
  if (fragment.constant) {
    // keep view function as is
    return (...args: any) => contract[signature](...args);
  }
  return async (...args: any[]) => {
    if (args.length === fragment.inputs.length + 1) {
      const override = args.pop();
      return contract[signature](...args, override);
    }

    return contract[signature](...args, {});
  };
}

export class SafeCallContract extends Contract {
  safeCall: Record<string, ContractFunction> = {};

  constructor(
    addressOrName: string,
    contractInterface: ContractInterface,
    signerOrProvider?: Signer | Provider,
  ) {
    super(addressOrName, contractInterface, signerOrProvider);
    Object.keys(this.interface.functions).forEach((signature) => {
      const fragment = this.interface.functions[signature];
      if (!Object.prototype.hasOwnProperty.call(this.safeCall, fragment.name)) {
        defineReadOnly(this.safeCall, fragment.name, buildSafeCall(this, signature, fragment));
      }
      defineReadOnly(this.safeCall, signature, buildSafeCall(this, signature, fragment));
    });
  }
}
