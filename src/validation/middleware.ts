import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const middleware = (schema: any, property: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const { error } = Joi.validate(req[property], schema);
    const validate = error == null;
    if (validate) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i: any) => i.message).join(", ");
      res.status(422).json({ error: message });
    }
  };
};

export default middleware;
