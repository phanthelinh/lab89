const multer = require('multer');
const fs = require('fs-extra');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos/temp')
    },
    filename: (req, file, cb) => {
        // cb(null, 'IMG_' + moment().format('YYYYMMDDHHmmss') + '.' + file.originalname.split('.')[1]);
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

exports.fileUpload = (req, res) => new Promise((resolve, reject) => {
    let handler = upload.single('photos');
    handler(req, res, err => {
        if (err) {
            reject(err.message);
        }

        if (!req.file) {
            reject('Không có file');
        }
        let {path, originalname} = req.file;
        let newPath = 'photos/' + originalname;
        if (fs.existsSync(newPath)) {
            fs.removeSync('photos/temp/' + originalname);
            reject('File đã tồn tại');
        }
        // fs.move(path, newPath, err => {
        //     if (err) {
        //         console.log('o day');
        //         reject(err)
        //     }
        // })

        resolve(newPath)
    })
});

exports.encodeImage = (path) => {
    var img = fs.readFileSync(path);
    return img.toString('base64');
}