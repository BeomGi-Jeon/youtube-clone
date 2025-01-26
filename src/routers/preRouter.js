import express from "express";

const preRouter = express.Router();

const pre= (req, res) => {
    return res.render("pre", { pageTitle: "pre" });
  };

preRouter.get("/", pre);

export default preRouter;