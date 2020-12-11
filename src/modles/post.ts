import mongoose, { Schema, Document } from 'mongoose';
const PostSchema: Schema = new Schema({
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  likes:[ {
    type: Schema.Types.ObjectId, ref: "User"
  }],
  numberoflikes:[ {
    type: Number,
    default: 0
  }],
  comments: [{
    type: Schema.Types.ObjectId, ref: "Comment"

  }]


});



type IPost = {
  description: string
  photo: string
  creator: any



}
export default mongoose.model<IPost & Document>('Post', PostSchema);