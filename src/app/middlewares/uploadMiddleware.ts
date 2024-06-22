import accountStorage from "../../config/cloudinaryAccountStorage";
import multer from "multer";
import path from "path";

// Initialize upload
const uploadMiddleware = multer({
  storage: accountStorage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    // File type filter (optional)
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
});

export default uploadMiddleware;
