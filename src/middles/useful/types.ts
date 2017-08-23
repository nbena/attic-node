import {NoteExtraMin, NoteExtraMinWithDate, Note} from '../../models/note';
import {TagExtraMin,TagAlmostMin, Tag} from '../../models/tag';
export class AuthResult{
  ok: boolean;
  result: string;
}

export class Result{
  ok: boolean;
  constructor(ok:boolean){
    this.ok=ok;
  }

  public static fromAnyToResult(result: Result){
    let newResult:Result = new Result(result.ok);
    return newResult;
  }

}


export class BasicResult extends Result{
  msg: string;

  constructor(ok:boolean, msg:string){
    super(ok);
    this.msg = msg;
  }
}


export class NoteExtraMinResult extends Result{
  result: NoteExtraMin;

  constructor(ok:boolean, note:NoteExtraMin){
    super(ok);
    this.result=note;
  }
}


export class NoteExtraMinWithDateResult extends Result{
  result: NoteExtraMinWithDate;

  constructor(ok:boolean, note:NoteExtraMinWithDate){
    super(ok);
    this.result=note;
  }

  public static getAppropriateNoteResult(ok:boolean, note:NoteExtraMin, withDate:boolean){
    let res:NoteExtraMinResult;
    if(withDate){
      res = new NoteExtraMinWithDateResult(ok, note as NoteExtraMinWithDate);
    }else{
      res = new NoteExtraMinResult(ok, note);
    }
    return res;
  }

}


  export class NoteResult extends Result{
    result: Note;

    constructor(ok:boolean, note:Note){
      super(ok);
      this.result=note;
    }
  }


  export class TagExtraMinResult extends Result{
    result: TagExtraMin;
    constructor(ok:boolean, tag:TagExtraMin){
      super(ok);
      this.result=tag;
    }
  }

  export class TagAlmostMinResult extends Result{
    result: TagAlmostMin;
    constructor(ok:boolean, tag:TagAlmostMin){
      super(ok);
      this.result=tag;
    }
  }

  export class TagResult extends Result{
    result: Tag;
    constructor(ok:boolean, tag:Tag){
      super(ok);
      this.result=tag;
    }
  }


  // export class TagMinResult extends Result{
  //   result: TagClass.TagMin;
  //   constructor(ok:boolean, tag:TagClass.TagMin){
  //     super(ok);
  //     this.result=tag;
  //   }
  // }

  export class AnyResult extends Result{
    result: any;
    constructor(ok: boolean, result:any){
      super(ok);
      this.result=result;
    }
  }


  export class JsonError extends Error{
    name:string = 'JsonError';
    constructor(msg:string){
      super(msg);
    }
  }

  export class DbError extends Error{
    name: string = 'DbError';
    constructor(msg:string){
      super(msg);
    }
  }
