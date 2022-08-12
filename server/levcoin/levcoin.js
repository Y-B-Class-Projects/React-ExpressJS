const MAX_COINS = 100;

module.exports = class LevCoin{
    constructor(db) {
        this.coin_db = db;
        this.coin_db.INIT();
    }
    async getPrice() {
        return await this.coin_db.REQUEST_COST();
    }

    nextPrise() {
        this.coin_db.UPDATE_PRICE(-1);
    }

    addCoinsAmount(coins) {
        this.coin_db.ADD_COINS_AMOUNT(coins);
    }

    getCoinsAmount() {
        return this.coin_db.GET_COINS_AMOUNT();
    }

    async createCoins(dollars) {
        let cents = dollars * 100;
        let coins = 0;

        while (cents > 0) {
            let currentCoinsAmount = await this.getCoinsAmount();
            let coinsToNextPrice = parseInt(currentCoinsAmount) + 1 - currentCoinsAmount

            console.log(`coinsToNextPrice: ${coinsToNextPrice}`)

            let price = await this.getPrice();
            let coins_to_add = Math.min((cents / price).toPrecision(12), coinsToNextPrice);

            cents -= (coins_to_add * price).toPrecision(12);
            coins += coins_to_add;

            await this.addCoinsAmount(coins_to_add);

            if (coins_to_add === coinsToNextPrice)
                await this.nextPrise();
        }
        return coins;
    }
}