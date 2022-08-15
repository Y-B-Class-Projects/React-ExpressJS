const mongo = require("mongoose");
const Block = require("./block");

module.exports = db => {
    let schema = new mongo.Schema({
        block: {type: Object, required: true, unique: true, index: true},
    }, {autoIndex: false});


    schema.statics.CREATE = async function (block) {
        return this.create({
            block: block
        });
    };

    schema.statics.REQUEST_LAST_HASH = async function (block) {
        const all_block = await this.find({}).exec();

        if (all_block.length === 0)
            return null;

        return all_block[all_block.length - 1].block.hash;
    };

    schema.statics.REQUEST = async function () {
        return await this.find({}).exec()
    };

    schema.statics.REQUEST_LAST = async function () {
        const all_block = await this.find({}).exec()

        return all_block[all_block.length - 1]
    };


    db.model('blocks', schema);
};
