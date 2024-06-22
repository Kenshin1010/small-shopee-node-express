// external imports
import { Schema, model, Document } from "mongoose";

// Interface for Message document
interface IAttachment {
  attachment_file: string;
  cloudinary_id: string;
}

interface IMessage extends Document {
  text: string;
  attachment: IAttachment[];
}

// message structure
const messageSchema = new Schema<IMessage>(
  {
    text: {
      type: String,
      required: true,
    },
    attachment: [
      {
        attachment_file: {
          type: String,
        },
        cloudinary_id: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// create model
const Message = model<IMessage>("Message", messageSchema);

// export module
export default Message;
