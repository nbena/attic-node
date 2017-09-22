//import Note from './note';
import Base from './base';
export class TagExtraMin extends Base{
  constructor(title?:string, userid?:string){
    super(title, userid);
  }
}
export class TagAlmostMin extends TagExtraMin{
  // userid: string;
  // title: string;
  noteslength: number;

  // public getValues():any{
  //   let values: any;
  //   values = {
  //     userId: this.userId,
  //     title: this.title
  //   }
  // }

  // public getValues():string[]{
  //   return [this.userid, this.title];
  // }
  //
  // constructor(title?:string, userid?:string){
  //   if(title!=null){
  //     this.title=title;
  //   }
  //   if(userid!=null){
  //     this.userid=userid;
  //   }
  //   this.noteslength=0;
  // }
  constructor(title?:string, userid?:string){
    super(title, userid);
    this.noteslength=0;
  }


}

export class Tag extends TagAlmostMin{
  notes: string[];
  /*notes are always kept as string*/
  constructor(title?:string, userid?:string){
    super(title, userid);
    this.notes=[];
  }
}

// export class TagFull extends Tag{
//   notes: Note[];
// }
//
// export class Tag2 extends Tag{
//   notes: any[];
// }
