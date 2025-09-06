import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const SellRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    brand: String,
    model: String,
    condition: String,
    askingPrice: String,
    message: String,
  },
  { timestamps: true }
);

export type SellRequestType = InferSchemaType<typeof SellRequestSchema>;

const SellRequest =
  (models.SellRequest as Model<SellRequestType>) ||
  model<SellRequestType>("SellRequest", SellRequestSchema);

export default SellRequest;
