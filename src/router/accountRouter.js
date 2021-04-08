const router = require('express').Router();
const DB = require('../model');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    let user = req.body;
    if (user && user.email && user.password) {
        let foundUser = await DB.User.findOne({email: user.email});
        if (!foundUser) {
            let hashedPass = bcrypt.hashSync(user.password, 10);
            foundUser = DB.User({email: user.email, password: hashedPass});
            await foundUser.save();
            res.json({
                code: 0,
                message:'Thành công'
            })
        } else {
            res.json({
                code: 2,
                message: 'Email đã tồn tại'
            })
        }
    } else {
        res.json({
            code: 1,
            message: 'Email hoặc password không hợp lệ'
        });
    }
})


router.post('/login', async (req, res) => {
    let user = req.body;
    if (user && user.email && user.password) {
        let foundUser = await DB.User.findOne({email: user.email});
        if (foundUser) {
            let validPass = bcrypt.compareSync(user.password, foundUser.password);
            if (validPass) {
                res.json({
                    code: 0,
                    message:'Thành công',
                    access_token: auth.getToken(foundUser._id, foundUser.email)
                });
            } else {
                res.json({
                    code: 3,
                    message: 'Sai password'
                });
            }
        } else {
            res.json({
                code: 3,
                message: 'Sai email'
            })
        }
    } else {
        res.json({
            code: 1,
            message: 'Email hoặc password không hợp lệ'
        });
    }
})

module.exports = router;