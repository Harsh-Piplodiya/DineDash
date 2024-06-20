import multer from "multer";

// image storage engine which is actually a middleware
const storage = multer.diskStorage({
    // destination: "./uploads",
    destination: function (req, file, cb) {
      cb(null, "src/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}${file.originalname}`);
    }
  })
  
  export const upload = multer({ storage, });