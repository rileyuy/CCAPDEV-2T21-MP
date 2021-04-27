const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination:(req, file, callback) => {
        cb(null, '../public/uploads');
    },
    filename: (req, file, callback) => {
        cb(null, Date.now() + '--'+ file.originalname);
    }
});

module.exports = multer({ storage: fileStorage });