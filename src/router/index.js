const router = require('express').Router();
const accountRouter = require('./accountRouter');
const productRouter = require('./productRouter');

router.use('/account', accountRouter);
router.use('/product', productRouter);

module.exports = router;