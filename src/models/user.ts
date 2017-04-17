import * as bcrypt from 'bcrypt';
export default class User{
  userId: string;
  hashedPassword: string;

  public hashPassword(){
    return bcrypt.genSalt(10)
      .then(salt=>{
        return bcrypt.hash(this.hashedPassword, salt);
      })
      .then(hash=>{
        this.hashedPassword = hash;
      })
      .catch(error=>{
        throw new Error(error);
      })
  }

  /*
  maybe it's correct.
  */

  public checkPassword(passwordToCheck: string):Promise<boolean>{
    return bcrypt.compare(passwordToCheck, this.hashedPassword);
  }



  public getValues(){
    let values: any = {
      userId: this.userId,
      hashedPassword: this.hashedPassword
    }
    return values;
  }

  constructor(userId: string){
    this.userId=userId;
  }


}
