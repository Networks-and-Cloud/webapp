import {Buffer} from 'buffer'
import bcrypt from "bcrypt"
import { findUserbyUsername } from './UserServices.js';

export async function assessToken(req, res ,next){
    const arr = getCredentials(req)
    const username = arr[0];
    const password = arr[1];
    const user = await findUserbyUsername(username);
    if(!user){
        return res.status(401).json("Unauthorized");
    }
    const passwordCheck = await bcrypt.compare(password, user.password)
    if(!passwordCheck){
        return res.status(401).json("Unauthorized");
    }

    return next()


}

// export const getCredentials = (req)=>{
//     console.log(req.header('Authorization'));

//     const token = req.header('Authorization')
//     let arr='';
//     if(token == undefined)
//     {
//         return arr;
//     }
//     else{
//     const originalCred = Buffer.from(token.substring(6),'base64').toString('utf-8');
//     const arr= originalCred.split(':');
//     }
//     return arr;

// }


export const getCredentials = (req) => {
    console.log(req.header("Authorization"));
  
    const token = req.header("Authorization");
    if(!token){
      return "unauthorised";
      // return res.status(401).json("Unauthorized");
    }
    let arr = '';
    if (token == undefined) {
      return arr;
    } else {
      //decode the base64 to string
      const originalCred = Buffer.from(token.substring(6), "base64").toString(
        "utf-8"
      );
      arr = originalCred.split(":");
    }
  
    return arr;
  };