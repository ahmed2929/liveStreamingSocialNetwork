
import mongoose, { Schema } from 'mongoose';

const RequestSchem: Schema = new Schema({
  
    from:
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ,
    to:
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ,
    status:{
        type:Number,
        default:0
    }
  

});

export default mongoose.model('Request', RequestSchem);