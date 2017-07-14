/*import * as bcrypt from 'bcrypt';*/
import { sha3_512 } from 'js-sha3';
export default class User{
  userid: string;
  hashedpassword: string;

  public hashPassword(){
    // return bcrypt.genSalt(10)
    //   .then(salt=>{
    //     return bcrypt.hash(this.hashedpassword, salt);
    //   })
    //   .then(hash=>{
    //     this.hashedpassword = hash;
    //   })
    //   .catch(error=>{
    //     throw new Error(error);
    //   })
    this.hashedpassword = sha3_512(this.hashedpassword);
  }

  /*
  maybe it's correct.
  */

  public checkPassword(passwordToCheck: string):Promise<boolean>{
    // return bcrypt.compare(passwordToCheck, this.hashedpassword);
    return new Promise<boolean>((resolve, reject)=>{
      let tempPassword: string = sha3_512(passwordToCheck);
      if(tempPassword == this.hashedpassword){
        resolve(true);
      }else{
        resolve(false);
      }
    })
  }



  public getValues(){
    let values: any = {
      userid: this.userid,
      hashedpassword: this.hashedpassword
    }
    return values;
  }

  constructor(userid: string){
    this.userid=userid;
  }


}
