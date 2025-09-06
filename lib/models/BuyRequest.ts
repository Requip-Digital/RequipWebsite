import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const BuyRequestSchema = new Schema(
  {
    brand: String,
    model: String,
    technology: String,
    width: String,
    shieldingSystem: String,
    additionalInfo: String,

    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    // optional legacy fields if you send them
    budget: String,
    message: String,
  },
  { timestamps: true }
);

// Infer the TS type directly from the schema
export type BuyRequestType = InferSchemaType<typeof BuyRequestSchema>;

// Reuse model if it already exists (Next.js hot reload)
const BuyRequest =
  (models.BuyRequest as Model<BuyRequestType>) ||
  model<BuyRequestType>("BuyRequest", BuyRequestSchema);

export default BuyRequest;
