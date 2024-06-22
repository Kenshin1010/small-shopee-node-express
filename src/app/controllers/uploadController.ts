// external imports
import { NextFunction, Request, Response } from "express";
import cloudinary from "../../config/cloudinary";
import Message from "../models/Message";
import User from "../models/People";

// add user function
async function addUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  let newUser;
  console.log(777777);

  try {
    // checking avatar/files
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // use cloudinary.uploader.upload() to upload image in cloudinary
      const result = await cloudinary.uploader.upload(req.files[0].path, {
        width: 200, // setting width to 200px
        height: 200, // setting height to 200px
        crop: "thumb", // create thumbnail image
        gravity: "face", // focusing on face
      });

      // creating new user object with image
      newUser = new User({
        ...req.body,
        name: "iam new user",
        avatar: result.secure_url, // image url
        cloudinary_id: result.public_id, // unique id
      });
    } else {
      // creating new user object without image
      newUser = new User({
        ...req.body,
        name: "iam new user",
      });
    }

    // save user
    await newUser.save();
    // send json response
    res.status(200).json({
      success: "User added successfully!",
      newUser,
    });
  } catch (err) {
    console.log("Error: ", err);

    // send json error
    res.status(500).json({
      errors: {
        common: {
          msg: "Couldn't add user!",
        },
      },
    });
  }
}

// remove user
async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // find user by id
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.avatar && user.cloudinary_id) {
        // use cloudinary.uploader.destroy() to delete image from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id);
      }
      // delete user from db
      await user.deleteOne();

      // send json response
      res.status(200).json({
        success: "User removed Successfully!",
        user,
      });
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: "User not found!",
          },
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      // send json error
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}

// send message function
async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // checking for message or any file
  if (
    req.body.message ||
    (req.files && Array.isArray(req.files) && req.files.length > 0)
  ) {
    try {
      // save message text/attachment in database
      let attachments = null;
      // creating an async function to upload image in cloudinary
      const multipleUpload = async (path: string) => {
        // use cloudinary.uploader.upload() to upload image in cloudinary
        return await cloudinary.uploader.upload(path);
      };
      // check for file upload
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        attachments = [];
        // loop through every file from files request
        for (const file of req.files) {
          // destructuring path of every file
          const { path } = file;
          // saving result
          const result = await multipleUpload(path);
          // pushing object to attachment array
          attachments.push({
            attachment_file: result.secure_url, // image url
            cloudinary_id: result.public_id, // unique id
          });
        }
      }

      // create new message object
      const newMessage = new Message({
        text: req.body.message,
        attachment: attachments, // all image stored as string
      });

      // send data to database
      const result = await newMessage.save();
      // success json response
      res.status(200).json({
        success: "Message sent successfully!",
        result,
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Couldn't send message!",
          },
        },
      });
    }
  } else {
    // send json error
    res.status(500).json({
      errors: {
        common: {
          msg: "Couldn't send message!",
        },
      },
    });
  }
}

// remove message and attachments
async function removeMsgAndAttachments(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // filtering message by id form database
    const message = await Message.findById(req.params.id);
    // creating an async function for deleting image from cloudinary
    const multipleDelete = async (public_id: string) => {
      // use cloudinary.uploader.destroy() to delete image from cloudinary
      return await cloudinary.uploader.destroy(public_id);
    };
    // check attachment file
    if (message) {
      if (message.attachment) {
        const attachments = message.attachment;
        // looping every attachment file from attachments
        for (const attachment of attachments) {
          // sending cloudinary_id or public_id to multipleDelete function
          await multipleDelete(attachment.cloudinary_id);
        }
      }
      // removing message from database
      await message.deleteOne();
      // sending success json response
      res.status(200).json({
        success: "Message and attachments removed Successfully!",
        message,
      });
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: "Message not found!",
          },
        },
      });
    }
  } catch (err) {
    // sending error json response
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete message and attachments!",
        },
      },
    });
  }
}

// export function
export { addUser, deleteUser, removeMsgAndAttachments, sendMessage };
