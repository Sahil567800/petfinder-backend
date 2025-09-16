import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname))
    },
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
        cb(null, true)
    }
    else {
        cb(new Error("only images are allowed(jpeg,jpg,png,gif"))
    }
}

export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter
})