import { AptosOnChainImpl } from './aptos';
import { EvmOnChainImpl } from './evm';
import { OnChainCommunicator } from './type';

// TODO: conditionally initialize class by process.env.chain
// const onchain: OnChainCommunicator = new AptosOnChainImpl();
const onchain: OnChainCommunicator = new EvmOnChainImpl();

export { onchain };
