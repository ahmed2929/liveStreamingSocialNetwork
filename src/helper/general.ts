import crypto from "crypto"
export const genrateCode=(NumOfBytes=2)=>{return crypto.randomBytes(NumOfBytes).toString('hex')}




