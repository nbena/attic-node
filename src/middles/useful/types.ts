import Note from '../../models/note';
import * as TagClass from '../../models/tag';
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

  export class NoteResult extends Result{
    result: Note;

    constructor(ok:boolean, note:Note){
      super(ok);
      this.result=note;
    }
  }

  //can't be done.
  export class TagResult extends Result{
    result: TagClass.Tag;
    constructor(ok:boolean, tag:TagClass.Tag){
      super(ok);
      this.result=tag;
    }
  }


  export class TagMinResult extends Result{
    result: TagClass.TagMin;
    constructor(ok:boolean, tag:TagClass.TagMin){
      super(ok);
      this.result=tag;
    }
  }

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
