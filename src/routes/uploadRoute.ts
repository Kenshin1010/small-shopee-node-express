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

const router = express.Router();

// POST: image and user
router.post("/", avatarUpload, addUser);

// DELETE: image and user
router.delete("/:id", deleteUser);

// POST: multiple attachment image
router.post("/multiple", attachmentUpload, sendMessage);

// DELETE: multiple image and message
router.delete("/multiple/:id", removeMsgAndAttachments);

// export the router
export default router;
