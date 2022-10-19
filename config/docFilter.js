const docFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(pdf|xlsx|doc|DOC|CSV|csv|txt|docx)$/)) {
    req.fileValidationError = "Only pdf files are allowed!";
    return cb(new Error("Only pdf files are allowed!"), false);
  }
  cb(null, true);
};
module.exports = docFilter;
