// external imports
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// creating new storage
const accountStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // folder: "users_image",
    // format: ["jpeg", "jpg", "png", "webp"],
  },
});

// export module
export default accountStorage;
