const mongo = require("mongoose");

module.exports = db => {
    let schema = new mongo.Schema({
        current_cost: {type: Number, required: true, default: 100},
        coins_amount: {type: Number, required: true, default: 0}
    }, {autoIndex: false});


    schema.statics.CREATE = async function (coin) {
        return this.create({
            current_cost: coin[0],
            coins_amount: coin[1]
        });
    };

    schema.statics.INIT = async function () {
        const coins = await this.find({}).exec()
        if (coins.length === 0)
            return this.CREATE(100, 0); // 100 cent cost for the first coin, 0 coins.
    };


    schema.statics.REQUEST_COST = async function () {
        const coins = await this.find({}).exec()
        return coins[0].current_cost;
    };

    schema.statics.REQUEST_AMOUNT = async function () {
        const coins = await this.find({}).exec()
        return coins[0].coins_amount;
    };

    schema.statics.UPDATE_PRICE = async function (delta) {
        const current_price = await this.REQUEST_COST();

        await this.updateOne({}, {$set: {current_cost: (current_price + delta).toPrecision(12)}}).exec();
    };

    schema.statics.ADD_COINS_AMOUNT = async function (coins) {
        const coins_amount = await this.REQUEST_AMOUNT();

        this.updateOne({}, {$set: {coins_amount: (coins_amount + coins).toPrecision(12)}}).exec();
    };

    schema.statics.GET_COINS_AMOUNT = async function () {
        let coins_amount = await this.REQUEST_AMOUNT();
        return coins_amount;
    };

    db.model('coin_cost', schema);
};
