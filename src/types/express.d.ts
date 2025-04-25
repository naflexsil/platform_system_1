import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        user?: { userId: Types.ObjectId };
        role?: IUser["role"];
      };
    }
  }
}

export {};
