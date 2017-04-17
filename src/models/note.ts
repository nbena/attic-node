export default class Note{
  userId: string;
  title: string;
  text: string;
  isDone: boolean;
  creationDate: Date;
  lastModificationDate: Date;
  links: string[];
  mainTags: string[];
  otherTags: string[];

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
  public getValues():string[]{
    return [this.userId, this.title];
  }


}
