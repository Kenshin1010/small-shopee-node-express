// external imports
import { Schema, model, Document } from "mongoose";

// Interface for People document
interface IPeople extends Document {
  name: string;
  avatar: string;
  cloudinary_id: string;
}

// model schema
const peopleSchema = new Schema<IPeople>(
  {
    name: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    cloudinary_id: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// model create
const People = model<IPeople>("People", peopleSchema);

// export function
export default People;
