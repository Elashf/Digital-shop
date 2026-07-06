import mongoose, { Schema, model, models } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


schema.index(
  { user: 1, product: 1 },
  { unique: true }
);

const wishlistModel =
  models.Wishlist || model("Wishlist", schema);

export default wishlistModel;