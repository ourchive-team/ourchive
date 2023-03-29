import { AptosOnChainImpl } from './aptos';
import { OnChainCommunicator } from './type';

// TODO: conditionally initialize class by process.env.chain
const onchain: OnChainCommunicator = new AptosOnChainImpl();

export { onchain };
