const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-'+ file.originalname);
    }
});

module.exports = multer({ storage: fileStorage });