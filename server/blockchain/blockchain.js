const Block = require("./block");

module.exports = class BlockChain {
    constructor(db) {
        this.db = db
        this.blockchain = [this.startGenesisBlock()] // Initialize a new array of blocks, starting with a genesis block
    }

    startGenesisBlock() {
        return new Block({}) // Create an empty block to start
    }


    // Add a new block to the chain
    async addNewBlock(newBlock) {
        newBlock.prevHash = await this.db.REQUEST_LAST_HASH() // Set its previous hash to the correct value
        newBlock.hash = newBlock.computeHash() // Recalculate its hash with this new prevHash value
        this.db.CREATE(newBlock) // Add it to the database
    }


    async checkChainValidity() {
        const blockchain_data = await this.db.REQUEST()
        for(let i = 1; i < blockchain_data.length; i++) {
            const currBlock = blockchain_data[i]
            const prevBlock = blockchain_data[i -1]

            if(currBlock.block.prevHash !== prevBlock.block.hash) {
                return false
            }

        }
        return true // If all the blocks are valid, return true
    }
}

