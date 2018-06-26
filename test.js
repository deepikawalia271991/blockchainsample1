const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index = index;
        this.data=data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.generateHash();

    }
    generateHash(){
        return(SHA256(this.index+this.timestamp+JSON.stringify(this.data)+this.previousHash).toString());
    }
}
class Blockchain{

    constructor(){
        this.chain = [new Block(0,"1-1-2017","block1","0")];
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.generateHash();
        this.chain.push(newBlock);
    }
    validateBlockChain(){
        for(let i=1;i<this.chain.length;i++){
            let currentBlock = this.chain[i];
            let prevBlock = this.chain[i-1];
            if(prevBlock.hash != currentBlock.previousHash){
                return false;
            }
            if(currentBlock.hash!=currentBlock.generateHash()){
                return false;
            }
        }
        return true;
        
    }
}
let y = new Blockchain();
y.addBlock(new Block(1,"1-1-2018","block2"));
//console.log(JSON.stringify(y.chain,null,4));
y.chain[1].data="block12";
console.log(y.validateBlockChain());
console.log(JSON.stringify(y.chain,null,4));