import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public preivousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    preivousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + preivousHash + timestamp + data).toString();

  constructor(
    index: number,
    hash: string,
    preivousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.preivousHash = preivousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "2020202020", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const nextHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimeStamp,
    data
  );
};

export {};
