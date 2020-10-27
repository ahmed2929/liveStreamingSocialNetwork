
import mongoose, { Schema ,Document} from 'mongoose';
import async from '../events/HandleSocketConnection/handleEvents';

const UserSchema: Schema = new Schema({
  email: { 
      type: String, 
      required: true,
       unique: true 
    },
  firstName: {
    type: String,
     required: true 
    },
  lastName: {
       type: String,
        required: true 
    },
    password:{
        type: String,
        required: true 
    },
    photo:{
        type: String,
        default: `https://img.icons8.com/bubbles/50/000000/user-male.png` 
    },
    followers:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    following:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
  

});


//const User = mongoose.model<IUser & Document>("users", UserSchema);

type IUser = {
    email: string
    password: string
    fname: string
    lname: string
    photo: string
    followers:any
    following:any

}
export default mongoose.model<IUser & Document>('User', UserSchema);
