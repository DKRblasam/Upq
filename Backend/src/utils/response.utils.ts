import { Response } from "express";

export const sendResponse = (
  res: Response,
  success: boolean,
  data: any = null,
  error: string | null = null,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success,
    data,
    error,
  });
};
