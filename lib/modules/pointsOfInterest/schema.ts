import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews", required:false }],
  coords: {
    type:{
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }},
    required: true,
  },
  creation_date: {type:Date,required:true,default:new Date()},
  modified_date: {type:Date,required:true,default: new Date()}

});

export default mongoose.model("pointsOfInterest", schema);
