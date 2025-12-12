import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req: Request, res: Response, next: NextFunction){
  console.log(`Se ejecutó el método ${req.method} en la ruta ${req.url} el dia ${new Date().toLocaleString()}`);
    next(); 
}
