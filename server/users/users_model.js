const mongo = require("mongoose");


module.exports = db => {
    let schema = new mongo.Schema({
        email: {type: String, required: true, unique: true, index: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        access_level: {type: String, required: true, enum: ['admin', 'user'], default: 'user'},
        is_approved: {type: Boolean, required: true, default: false},
        amount: {type: Number, required: true, default: 0}
    }, {autoIndex: false});


    schema.statics.CREATE = async function (user) {
        return this.create({
            email: user[0],
            username: user[1],
            password: user[2],
            access_level: user[3],
            isApprove: user[4]
        });
    };


    schema.statics.REQUEST = async function (user_token) {
        user_req = await this.find({username: user_token}).exec()
        access_level = user_req[0].access_level

        all_users = await this.find({}).exec()

        if (access_level === 'admin')
            return all_users
        else {
            console.log(all_users.filter((u) => u.access_level === 'client'))
            return all_users.filter((u) => u.access_level === 'client');
        }
    };

    schema.statics.REQUEST_NOT_APPROVED = async function (user_token) {
        return await this.GET_ACCESS_LEVEL(user_token)
            .then(async access_level => {
                if (access_level === 'admin') {
                    return await this.find({}).then(users => users.filter(u => u.is_approved === false))
                }
                else
                    return false
            })
    };

    schema.statics.REQUEST_APPROVED = async function (user_token) {
        return await this.GET_ACCESS_LEVEL(user_token)
            .then(async access_level => {
                if (access_level === 'admin') {
                    return await this.find({}).then(users => users.filter(u => u.is_approved === true))
                }
                else
                    return false
            })
    };

    schema.statics.GET_ACCESS_LEVEL = function (email) {
        return (this.findOne({email: email}).then(user => user.access_level));
    };

    schema.statics.GET_IS_APPROVE = async function (email) {
        return await this.findOne({email: email}).then(user => user.is_approved);
    };

    schema.statics.IS_USER_EXIST = async function (_email) {
        user = await this.find({email: _email}).exec();
        return user.length === 1;
    };

    schema.statics.DELETE = async function (username) {
        await this.deleteOne({username: username}).exec();
    };

    schema.statics.MODIFY_ACCESS_LEVEL = async function (username, new_al) {
        await this.updateOne({username: username}, {$set: {access_level: new_al}}).exec();
    };

    schema.statics.APPROVE = async function (email, amount) {
        console.log("aproving", email, amount)
        await this.updateOne({email: email}, {$set: {amount: amount, is_approved: true}}).exec();
    };

    schema.statics.IS_CORRECT_PASSWORD = async function (_email, pass) {
        user = (await this.find({email: _email}).exec())[0];
        return user.password === pass
    };

    schema.statics.GET_USER_NAME_BY_EMAIL = async function (_email) {
        user = (await this.find({email: _email}).exec())[0];
        return user.username;
    };

    schema.statics.GET_COINS_AMOUNT = async function (_email) {
        user = (await this.find({email: _email}).exec())[0];
        return user.amount;
    };

    schema.statics.TRANSACTION = async function (fromEmail, toEmail, amount) {
        let fromUserAmount = parseFloat((await this.find({email: fromEmail}).exec())[0].amount);
        await this.updateOne({email: fromEmail}, {$set: {amount: fromUserAmount - amount}}).exec();

        let toUserAmount = parseFloat((await this.find({email: toEmail}).exec())[0].amount);
        await this.updateOne({email: toEmail}, {$set: {amount: toUserAmount + amount}}).exec();
    };

    db.model('users', schema);
};
