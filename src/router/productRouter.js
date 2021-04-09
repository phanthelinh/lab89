const router = require('express').Router();
const Product = require('../model/product');
const {body} = require('express-validator');
const auth = require('../middleware/auth');
const moment = require('moment');
const multer = require('multer');
const helpers = require('../helpers');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos/')
    },
    filename: (req, file, cb) => {
        // cb(null, 'IMG_' + moment().format('YYYYMMDDHHmmss') + '.' + file.originalname.split('.')[1]);
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

router.get('/', async (req, res) => {
    let products = await Product.find({});
    res.json({
        code: 0,
        message: '',
        data: products
    })
});

router.post('/', 
    auth.verifyToken,
    body('name').notEmpty(),
    body('price').isInt({min: 1}),
    body('desc').notEmpty()
, async (req, res) => {
    let product = req.body;
    if (product) {
        helpers.fileUpload(req, res).then(path => {
            product.photos = helpers.encodeImage(path);
            console.log(product);
            // let productCreated = Product(product);
            // productCreated.save();
            // res.end(JSON.stringify({
            //     code: 0,
            //     message:'Thành công'
            // }))
        })
        .catch(e => {
            console.log(e);
            res.end(JSON.stringify({
                code: 0,
                message: e
            }));
        });        
    } else {
        res.end(JSON.stringify({
            code: 4,
            message:'Không thể thêm product'
        }))
    }
});

router.get('/:id', async (req, res) => {
    let foundItem = await Product.findOne({_id: req.params.id});
    if (foundItem) {
        res.json({
            code: 0,
            message:'Successfully',
            data: foundItem
        });
    } else {
        res.json({
            code: 1,
            message: 'Không tìm thấy product'
        });
    }
});

router.put('/:id', auth.verifyToken, 
    body('name').notEmpty(),
    body('price').isInt({min: 1}),
    body('desc').notEmpty(),
    async (req, res) => {
        let product = req.body;
        let file = req.file;
})

router.post('/test', (req, res) => {
    helpers.fileUpload(req, res)
    .then(result => console.log(result))
    .catch(e => console.log('err', e));
    res.end();
})

module.exports = router;