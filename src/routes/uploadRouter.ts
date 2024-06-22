// external imports
import express from "express";

// internal imports
import {
  addUser,
  deleteUser,
  removeMsgAndAttachments,
  sendMessage,
} from "../app/controllers/uploadController";
import attachmentUpload from "../app/middlewares/attachmentUpload";
import avatarUpload from "../app/middlewares/avatarUpload";
import uploadMiddleware from "../app/middlewares/uploadMiddleware";

// create a new router instance
// const path = require("path");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     ); // Filename in uploads folder
//   },
// });
// const upload = multer({ storage: storage });
const router = express.Router();

// POST: image and user
// router.post("/", uploadMiddleware.single("file"), addUser);
router.post("/", avatarUpload, addUser);

// DELETE: image and user
router.delete("/:id", deleteUser);

// POST: multiple attachment image
router.post("/multiple", attachmentUpload, sendMessage);

// DELETE: multiple image and message
router.delete("/multiple/:id", removeMsgAndAttachments);

// router.post("/upload1", upload.single("gogame"), addUser);

// export the router
export default router;

// gui anh -> anh -> upload firebase ->link
// upload -> tao
