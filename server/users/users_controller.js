var express = require('express');
const path = require('path');
const sessions = require("express-session");
const LevCoin = require("../levcoin/levcoin");
var router = express.Router();
const user_db = require('./../server')("users");
const levCoin_db = require('./../server')("coin_cost");

const levcoin = new LevCoin(levCoin_db);


router.post('/data', async (req, res) => {
    let username = req.body.username;

    if (await user_db.IS_USER_EXIST(username)) {
        res.send(await user_db.REQUEST(username))
    } else {
        res.send("ERROR!");
    }
})


router.post('/add_user', async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let pass = req.body.password;

    if (await user_db.IS_USER_EXIST(email)) {
        res.send(false)
    } else {
        await user_db.CREATE([email, username, pass])
        res.send(true)
    }
})


router.post('/deleteUser', async (req, res) => {
    let email = req.body.email;

    if(req.session.userid) {
        await user_db.GET_ACCESS_LEVEL(req.session.userid)
            .then(access_level => {
                if (access_level === 'admin') {
                    user_db.DELETE(email);
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
    }
    else
        res.send(false)
})


router.post('/modify_user', async (req, res) => {
    let username = req.body.username;
    let modify_username = req.body.modify_username;
    let new_al = req.body.new_al;

    if (await user_db.IS_USER_EXIST(username)) {
        access_level = await user_db.GET_ACCESS_LEVEL(username)
        if (access_level === 'admin') {
            user_db.MODIFY_ACCESS_LEVEL(modify_username, new_al)
            setTimeout(res_fun, 1000, res, "OK");
        } else {
            setTimeout(res_fun, 1000, res, "Error, only admin can modify users!");
        }
    } else {
        setTimeout(res_fun, 1000, res, "ERROR!");
    }
})


router.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log(email, password)

    if (await user_db.IS_USER_EXIST(email) && await user_db.IS_CORRECT_PASSWORD(email, password)
        && await user_db.GET_IS_APPROVE(email)) {
        req.session.userid = email;

        res.send(true);
    } else {
        res.send(false);
    }
})

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.send('Logout successful')
            }
        });
    } else {
        res.end()
    }
})

router.get('/username', async (req, res) => {
    let email = req.session.userid;

    if (await user_db.IS_USER_EXIST(email)) {
        username = await user_db.GET_USER_NAME_BY_EMAIL(email)
        res.send({msg: username});
    } else {
        res.send({msg: "ERROR, no username, please reload"});
    }
})

router.get('/isLoggedIn', async (req, res) => {
    res.send({msg: !!req.session.userid})
})

router.get('/isAdminLogged',  (req, res) => {
    if(req.session.userid) {
        user_db.GET_ACCESS_LEVEL(req.session.userid)
            .then(access_level => {
                if (access_level === 'admin') {
                    res.send({msg: true})
                } else {
                    res.send({msg: false})
                }
            })
    }
    else
        res.send(false)
})

router.post('/userApprove', async (req, res) => {
    let email = req.body.email;
    let amount = req.body.amount;

    if (await user_db.IS_USER_EXIST(email)) {
        const levCoins_amount = await levcoin.createCoins(amount);
        user_db.APPROVE(email, levCoins_amount)
        res.send(true);
    } else {
        res.send(false);
    }
})

router.get('/notApprovedUsers', async (req, res) => {
    res.send(await user_db.REQUEST_NOT_APPROVED(req.session.userid))
})

router.get('/approvedUsers', async (req, res) => {
    res.send(await user_db.REQUEST_APPROVED(req.session.userid))
})

router.get('/getCoinsAmount', async (req, res) => {
    res.send({msg: await user_db.GET_COINS_AMOUNT(req.session.userid)})
})

router.get('/getCoinsAmountInDollars', async (req, res) => {
    const coin_cost_in_dollars = await levcoin.getPrice()/100;

    res.send({msg: await user_db.GET_COINS_AMOUNT(req.session.userid)*coin_cost_in_dollars})
})

router.post('/makeTransaction', async (req, res) => {
    let toEmail = req.body.to;
    let amount = parseFloat(req.body.amount);

    console.log(toEmail, amount)

    if (await user_db.IS_USER_EXIST(toEmail)) {
        user_db.TRANSACTION(req.session.userid, toEmail, amount)
        res.send({msg: "Success!"});
    } else {
        res.send({msg: "ERROR, The destination user does not exist"});
    }
})

function res_fun(res, msg) {
    res.send({"msg": msg});
}

module.exports = router;