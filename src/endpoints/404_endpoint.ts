import * as express from 'express';
import Utils from '../middles/useful/utils';

export default class Endpoint404{

  public static error404(req:express.Request, res:express.Response, next){
    res.status(404);
    res.json(Utils.json404());
  }
}
