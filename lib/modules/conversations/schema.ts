import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the User model
  content: { type: String, required: true },
  conversation_deactivated: { type: Boolean, default: false }
});

export default mongoose.model("conversations", schema);