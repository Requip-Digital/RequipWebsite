import mongoose, { Schema, Document, models } from "mongoose";

export interface IApplication extends Document {
  name: string;
  email: string;
  phone: string;
  experience?: string;
  skills?: string;
  jobId: string;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema<IApplication>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: String,
  skills: String,
  jobId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
