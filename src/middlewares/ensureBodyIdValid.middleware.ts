import {Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const ensureBodyIdValidMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
     const validatedBody = schema.parse(req.body)

     req.body = validatedBody

     return next()
}

export default ensureBodyIdValidMiddleware