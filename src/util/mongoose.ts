import { Document } from "mongoose";

function mutipleMongooseToObject<T extends Document>(mongooses: T[]): T[] {
  return mongooses.map((mongoose) => mongoose.toObject());
}

function mongooseToObject<T extends Document>(mongoose: T | null): T | null {
  return mongoose ? mongoose.toObject() : null;
}

export { mutipleMongooseToObject, mongooseToObject };
