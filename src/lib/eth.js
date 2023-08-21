import { ALCHEMY_API_KEY } from '$env/static/private';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { ethers } from "ethers";

import { timeDifference } from './time';

const round = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

export class SDK {
    constructor() {
        // Refer to the README doc for more information about using API
        // keys in client-side code. You should never do this in production
        // level code.
        const settings = {
            apiKey: ALCHEMY_API_KEY,
            network: Network.ETH_MAINNET
        };

        // You can read more about the packages here:
        // https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
        this.sdk = new Alchemy(settings);
    }

    async getLatestBlockNumber() {
        return await this.sdk.core.getBlockNumber()
    }

    async getLatestXBlockNumbers(count) {
        let blockNumber = await this.getLatestBlockNumber();
        return Array.from(new Array(count), (_x, i) => blockNumber - i)
    }

    async getBlock(blockNum) {
        let block = await this.sdk.core.getBlockWithTransactions(blockNum);

        block.gasLimit = BigInt(block.gasLimit);
        block.gasUsed = BigInt(block.gasUsed);
        block.gasUsedPercent = Number(block.gasUsed * 10000n / block.gasLimit) / 100;

        block.baseFeePerGas = BigInt(block.baseFeePerGas);
        block.baseFeePerGasEth = ethers.formatEther(block.baseFeePerGas) + ' ETH';
        block.baseFeePerGasGwei = ethers.formatUnits(block.baseFeePerGas, "gwei") + ' Gwei';

        block.burntFees = block.gasUsed * block.baseFeePerGas;
        block.burntFeesEth = ethers.formatEther(block.burntFees) + ' ETH';

        block._difficulty = BigInt(block._difficulty);

        block.transactionsCount = block.transactions.length;

        let sumMinerTips = 0n;

        for (const tx of block.transactions) {
            const txReceipt = await this.getTransactionReceipt(tx.hash);
            const gasUsed = BigInt(txReceipt.gasUsed);
            const gasPrice = BigInt(tx.gasPrice);
            const totalFee = gasUsed * gasPrice;

            sumMinerTips = sumMinerTips + totalFee;
        }

        block.totalMinerTipsEth = ethers.formatEther(sumMinerTips) + ' ETH';
        block.blockReward = sumMinerTips - block.burntFees;
        block.blockRewardEth = ethers.formatEther(block.blockReward) + ' ETH';

        block.transactions = [];

        return block;
    }

    async getLatestXBlocks(count) {
        let blockNumbers = await this.getLatestXBlockNumbers(count);
        let promises = blockNumbers.map((value) => {
            return this.getBlock(value);
        });

        let results = await Promise.all(promises);

        return results.map((block) => {
            return {
                block: {
                    number: block.number,
                    timestamp: timeDifference(block.timestamp),
                    transactionsCount: block.transactionsCount,
                    feeRecipient: block.miner,
                    blockRewardEth: block.blockRewardEth
                }
            }
        });
    }

    async getTransactionReceipt(txHash) {
        return await this.sdk.core.getTransactionReceipt(txHash);
    }
}


// == Block ==
// Parameter	Type	    Description
// hash	        string	    32 Bytes - hash of the block. null when its pending block.
// parentHash	string	    32 Bytes - hash of the parent block.
// number	    number	    The block number. null when its pending block.
// timestamp	number	    The unix timestamp for when the block was collated.
// nonce	    string	    A nonce is a value that represents the number of transactions sent by the sender's address, ensuring the transactions are processed in order and preventing replay attacks.
// difficulty	number	    Integer of the difficulty for this block.
// gasLimit	    BigNumber	The maximum gas allowed in this block.
// gasUsed	    BigNumber	The total used gas by all transactions in this block.
// miner	    string	    20 Bytes - the address of the beneficiary to whom the mining rewards were given.
// transactions	array	    An arrray containing transactions.

// == Transaction ==
// {
//     hash: '0x00b8b6168227367605fe6c0a82fe3d45b53',
//     type: 2,
//     accessList: [],
//     blockHash: '0x6d65b6f76199abc882d65b51a23e4b1',
//     blockNumber: 17953896,
//     transactionIndex: 99,
//     confirmations: 626,
//     from: '0xA9c095508d91693cCCb456283b12c55fA953B171',
//     gasPrice: [BigNumber],
//     maxPriorityFeePerGas: [BigNumber],
//     maxFeePerGas: [BigNumber],
//     gasLimit: [BigNumber],
//     to: '0x2C6Df0fDbCE9D2Ded2B52A117126F2Dc991f770f',
//     value: [BigNumber],
//     nonce: 36,
//     data: '0xac9650d8',
//     r: '0x97af7a5a213421b6146d6b5e80661',
//     s: '0x69324eb7beb04ce4b4986298cf541',
//     v: 0,
//     creates: null,
//     chainId: 1
//   },