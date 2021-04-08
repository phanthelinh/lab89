const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mySecretKey';

exports.getToken = (id, email) => jwt.sign({
    data: {id, email},
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, SECRET_KEY);

exports.verifyToken = (req, res, next) => {
    let bearerToken = req.headers.authorization;
    if (bearerToken) {
        let access_token = bearerToken.split(' ')[1];
        jwt.verify(access_token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized');
            } else {
                next();
            }
        })
    } else {
        res.status(401).send('Unauthorized');
    } 
}