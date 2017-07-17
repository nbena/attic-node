export default class UserSummary{
  userid: string;
  data: {
    notescount: number;
    tagscount: number;
    isfree: boolean;
    availabletags?: number;
    availablenotes?: number;
  }
}
