export default class Note{
  userid: string;
  title: string;
  text: string;
  isdone: boolean;
  creationdate: Date;
  lastmodificationdate: Date;
  links: string[];
  maintags: string[];
  othertags: string[];

  /*
  no need to have mainTags and otherTags as string because they'll
  always displayed as strings, now I avoid stupid recursion in data.
  */

  // public getValues = ():any=>{
  //   let values:any={
  //     userId: this.userId,
  //     title: this.title
  //   }
  //   return values;
  // }

  /**
  Return [this.userid, this.title]
  */
  public getValues():string[]{
    return [this.userid, this.title];
  }


}
