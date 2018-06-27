const SHA256 = require('crypto-js/sha256');

class Block{
constructor(index,timestamp,data,previousHash=''){
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp= timestamp;
    this.hash = this.calculateHash();
    this.nounce =0;
}
calculateHash(){
    return(SHA256(this.index+this.nounce+this.previousHash+this.timestamp+JSON.stringify(this.data),null,4).toString());
}
mineBlock(difficulty){
    while(this.hash.substring(0,difficulty)!=Array(difficulty+1).join("0")){
        this.nounce++;
        this.hash = this.calculateHash();
    }
    console.log('mined:'+this.hash);
}

}
class Blockchain{

    
    constructor(){
        this.chain = [new Block(0,"1-1-2017","block1","0")];
        this.difficulty=2;
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    validateBlockChain(){
        for(let i=1;i<this.chain.length;i++){
            let currentBlock = this.chain[i];
            let prevBlock = this.chain[i-1];
            if(prevBlock.hash != currentBlock.previousHash){
                return false;
            }
            if(currentBlock.hash!=currentBlock.calculateHash()){
                return false;
            }
        }
        return true;
        
    }
    
}
let y = new Blockchain();
console.log('mining block1');
y.addBlock(new Block(1,"1-1-2018","block2"));
console.log('mining block2');
y.addBlock(new Block(2,"1-1-2019","block3"));
