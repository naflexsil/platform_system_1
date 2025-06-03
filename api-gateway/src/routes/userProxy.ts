import express from "express";
import proxy from "express-http-proxy";

const router = express.Router();

router.use(
  "/",
  proxy("http://user-service:4001", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        authorization: srcReq.headers["authorization"] || "",
      };
      return proxyReqOpts;
    },
  }),
);

export default router;
