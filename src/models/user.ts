import * as bcrypt from 'bcrypt';
export default class User{
  userid: string;
  hashedpassword: string;

  public hashPassword(){
    return bcrypt.genSalt(10)
      .then(salt=>{
        return bcrypt.hash(this.hashedpassword, salt);
      })
      .then(hash=>{
        this.hashedpassword = hash;
      })
      .catch(error=>{
        throw new Error(error);
      })
  }

  /*
  maybe it's correct.
  */

  public checkPassword(passwordToCheck: string):Promise<boolean>{
    return bcrypt.compare(passwordToCheck, this.hashedpassword);
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
