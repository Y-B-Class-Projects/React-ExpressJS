const express = require("express");
const BlockChain = require("./blockchain");
const router = express.Router();

const blockChain_db = require('./../server')("blocks");
let blockchain = new BlockChain(blockChain_db);

function timeConverter(UNIX_timestamp){
    const date = new Date(UNIX_timestamp);

    return date.getDate()+ "/"+(date.getMonth()+1)+ "/"+date.getFullYear()+ " "+date.getHours()+ ":"+date.getMinutes()+ ":"+date.getSeconds();
}

router.get("/data", async (req, res) => {
    const data = await blockChain_db.REQUEST();

    for (let i = 0; i < data.length; i++) {
        data[i] = {
            date: timeConverter(data[i].block.timestamp),
            hash: data[i].block.hash,
            amount: data[i].block.data.amount
        };
    }

    res.send(data);
});

router.get("/status", async (req, res) => {
    const data = await blockchain.checkChainValidity();

    console.log(data);

    res.send({msg: data});
});

module.exports = router;