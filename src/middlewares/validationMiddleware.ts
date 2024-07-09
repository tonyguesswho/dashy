import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

// eslint-disable-next-line max-len, consistent-return
export const validateSchema = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }

  next();
};
