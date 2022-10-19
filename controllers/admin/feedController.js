const Feed = require("../../models/Feed");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");

class FeedController {
  static add = async (req, res) => {
    try {
      const feed = await Feed.find();
      const admin = await Adminauth.find();
      return res.render("admin/add-feed", { feed, admin });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static list = async (req, res) => {
    try {
      const feed = await Feed.find();
      const admin = await Adminauth.find();
      return res.render("admin/list-feed", { feed, admin });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add_feed = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an icon");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        const feed = Feed({
          title: req.body.title,
          description: req.body.description,
          image: req.file.filename,
        });
        await feed.save();
        return res.send({
          error: false,
          message: " Feed added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static edit = async (req, res) => {
    try {
      const feed = await Feed.findOne({
        _id: req.body.editid,
      });

      await Feed.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          title: req.body.edit_title,
          description: req.body.edit_description,
        }
      );
      return res.send({
        error: false,
        message: "Feed updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static delete = async (req, res) => {
    try {
      const feed = await Feed.findOne({
        _id: req.body.id,
      });
      //  return console.log(feed)
      await Feed.deleteOne({
        _id: feed.id,
      });
      fs.unlink(path.join(root, "/public/uploads/feed", feed.image), (err) => {
        if (err) {
          console.log(err);
        }
      });
      return res.send({
        error: false,
        message: "Feed Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/feed"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 1000000
  // },
  fileFilter: imageFilter,
}).single("image");

module.exports = FeedController;
