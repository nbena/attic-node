import Base from './base';
export class NoteExtraMin extends Base{
  // userid: string;
  // title: string;

  constructor(title?:string, userid?:string){
    super(title, userid);
  }
}

export class NoteExtraMinWithDate extends NoteExtraMin{
  lastmodificationdate:Date;
  constructor(title?:string, userid?:string){
    super(title, userid);
  }
}

export class Note extends NoteExtraMinWithDate{
  // userid: string;
  // title: string;
  text: string;
  isdone: boolean;
  creationdate: Date;
  // lastmodificationdate: Date;
  links: string[];
  maintags: string[];
  othertags: string[];

  /*
  no need to have mainTags and otherTags as string because they'll
  always displayed as strings, now I avoid stupid recursion in data.
  */

  // public getValues = ():any=>{s
  //   let values:any={
  //     userId: this.userId,
  //     title: this.title
  //   }
  //   return values;
  // }

  constructor(title?:string, userid?:string){
    super(title, userid);
  }

  /**
  Return [this.userid, this.title]
  */
  // public getValues():string[]{
  //   return [this.userid, this.title];
  // }


}
