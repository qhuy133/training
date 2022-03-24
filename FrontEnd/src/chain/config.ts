import { Deployments } from "./abi"

export type Configuration = {
    chainId: number;
    etherscanUrl: string;
    defaultProvider: string | string[];
    deployments: Deployments;
    tokens: { [contractName: string]: [string, number] };
    config?: EthereumConfig;
    pollingInterval: number;
    refreshInterval: number;
    gasLimitMultiplier: number;
    excludedAddress: string[];
    multicall: string;
};

export type EthereumConfig = {
    testing: boolean;
    autoGasMultiplier: number;
    defaultConfirmations: number;
    defaultGas: string;
    defaultGasPrice: string;
    ethereumNodeTimeout: number;
};