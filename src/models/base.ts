export default abstract class Base{
  title:string;
  userid:string;

  public getValues():string[]{
    return [this.userid, this.title];
  }

  constructor(title?:string, userid?:string){
    if(title!=null){
      this.title=title;
    }
    if(userid!=null){
      this.userid=userid;
    }
  }

}
