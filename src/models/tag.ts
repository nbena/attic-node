import Note from './note';
export class Tag{
  userid: string;
  title: string;
  noteslength: number;

  // public getValues():any{
  //   let values: any;
  //   values = {
  //     userId: this.userId,
  //     title: this.title
  //   }
  // }

  public getValues():string[]{
    return [this.userid, this.title];
  }


}

export class TagMin extends Tag{
  notes: string[];
  /*notes are always kept as string*/
}

export class TagFull extends Tag{
  notes: Note[];
}

export class Tag2 extends Tag{
  notes: any[];
}
