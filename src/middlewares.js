import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const s3Client = new S3Client({
  region:"ap-northeast-2",
  credentials:{
    accessKeyId:process.env.AWS_KEY,
    secretAccessKey:process.env.AWS_SECRET,
  },
});

const s3Storage =multerS3({
  s3:s3Client,
  bucket:"potgbox1-fly-2024-update",
  acl:"public-read",
})

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Log in first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const videoUpload = multer({
  storage:s3Storage,
  limits: {
    fileSize: 100000000,
  },
});
