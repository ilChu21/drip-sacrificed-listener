import { ethers } from 'ethers';

const POKT_RPC_URL = `https://bsc-mainnet.gateway.pokt.network/v1/lb/${process.env.POKT_Portal_ID}`;

export const provider = new ethers.providers.JsonRpcProvider(POKT_RPC_URL);
