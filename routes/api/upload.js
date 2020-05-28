const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
}).array('fileUpload');

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.files); //Here you get file.
    /*Now do where ever you want to do*/

    if (!err) {
      var paths = req.files.map(file => file.path)
      console.log('paths ', paths);
      return res.send(paths).end();    }
  });
});

module.exports = router;