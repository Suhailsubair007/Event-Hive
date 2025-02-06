import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../shared/utils/CustomError";

export const errorHandler = (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => { 
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
      return; 
    }
  
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  };