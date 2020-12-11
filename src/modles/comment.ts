import mongoose, { Schema, Document } from 'mongoose';
const CommentSchema: Schema = new Schema({
   
  text: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  post:{
    type: Schema.Types.ObjectId, ref: "Post"

  }

});



type IComment = {
  text: string
  creator: any
  post:any



}
export default mongoose.model<IComment & Document>('Comment', CommentSchema);