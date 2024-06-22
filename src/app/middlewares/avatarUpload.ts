// external imports
import { Request, Response, NextFunction } from "express";
import imageUploader from "../../utilities/imageUploader";

// middleware of avatar upload
function avatarUpload(req: Request, res: Response, next: NextFunction): void {
  const upload = imageUploader({
    // sending file mime types
    allowedFileTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    // maximum file size
    maxFileSize: 1000000,
    // maximum file number
    maxNumberOfUploadFile: 1,
    // error message
    errorMsg: "Only .jpeg, .jpg, .png or .webp format allowed!",
  });

  console.log("hello upload", upload);

  // call the middleware function

  // upload.single() or upload.array() or upload.fields needs name of input file field

  // upload.any() doesn't need any input file field name
  upload.any()(req, res, (err: unknown) => {
    console.log("req here", req.files);
    if (err instanceof Error) {
      // sending json error response
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      // go to the next function
      next();
    }
  });
}

// export function
export default avatarUpload;
