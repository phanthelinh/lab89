const router = require('express').Router();
const Product = require('../model/product');
const {body} = require('express-validator');
const auth = require('../middleware/auth');
const moment = require('moment');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos/')
    },
    filename: (req, file, cb) => {
        cb(null, 'IMG_' + moment().format('YYYYMMDDHHmmss') + '.' + file.originalname.split('.')[1]);
    }
})

const upload = multer({storage: storage});

router.get('/', async (req, res) => {
    let products = await Product.find({});
    console.log(products);
    res.end();
});

router.post('/', 
    auth.verifyToken,
    body('name').notEmpty(),
    body('price').isInt({min: 1}),
    body('desc').notEmpty(),
    upload.single('photos')
, async (req, res) => {
    let product = req.body;
    if (product) {
        product.photos = [req.file.path];
        let productCreated = Product(product);
        await productCreated.save();
        res.json({
            code: 0,
            message:'Thành công'
        })
    } else {
        res.json({
            code: 4,
            message:'Không thể thêm product'
        })
    }
});


module.exports = router;