// external imports
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// internal imports
import accountStorage from "../config/cloudinaryAccountStorage";

// Type definitions for the imageUploader function
interface ImageUploaderOptions {
  allowedFileTypes: string[];
  maxFileSize: number;
  maxNumberOfUploadFile: number;
  errorMsg: string;
}

// creating a universal image uploader
const imageUploader = ({
  allowedFileTypes,
  maxFileSize,
  maxNumberOfUploadFile,
  errorMsg,
}: ImageUploaderOptions) => {
  // prepare final multer upload object
  const upload = multer({
    // setting multer engine storage using cloudinary
    storage: accountStorage,
    // limiting file size for upload
    limits: {
      fileSize: maxFileSize,
    },
    // filtering file to avoid malicious file upload
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      console.log("imageUploader", req.files);
      console.log("imageUploader file", file);

      // checking total uploading image number
      if ((req.files as Express.Multer.File[]).length > maxNumberOfUploadFile) {
        cb(
          new Error(
            `Maximum ${maxNumberOfUploadFile} files are allowed to upload!`
          )
        );
      } else {
        // checking file types for every file
        if (allowedFileTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(errorMsg));
        }
      }
    },
  });

  return upload;
};

// export function
export default imageUploader;
