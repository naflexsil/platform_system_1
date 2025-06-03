import express from "express";
import proxy from "express-http-proxy";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(
  "/",
  authMiddleware,
  proxy("http://courses-service:4002", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "x-user-id": srcReq.headers["x-user-id"]!,
        "x-user-role": srcReq.headers["x-user-role"]!,
      };
      return proxyReqOpts;
    },
  }),
);

export default router;
