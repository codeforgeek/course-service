const express = require("express");
const router = express.Router();
const multer = require("multer");
const nconf = require("nconf");
const models = require("../models");

// upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, nconf.get("filePath"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("photo");

router.post("/login", (req, res) => {
  let data = req.body;
  if (
    data.userName === nconf.get("userName") &&
    data.password === nconf.get("password")
  ) {
    res.json({
      error: false,
      message: "Login successfull",
      token: nconf.get("token"),
    });
  } else {
    return res.json({ error: true, message: "invalid user." });
  }
});

router.post("/photo", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ error: true, message: "Error uploading file." });
    }
    res.json({
      error: false,
      path: "http://localhost:4000/" + req.file.originalname,
    });
  });
});

router.post("/publish", (req, res) => {
  let data = req.body;
  models.publishCourse(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error publishing course." });
    }
    res.json({ error: false, data: results });
  });
});

router.get("/courses", (req, res) => {
  models.getAllCourses((err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error uploading file." });
    }
    res.json({ error: false, data: results });
  });
});

router.get("/bits", (req, res) => {
  models.getAllBits((err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error fetching bits." });
    }
    res.json({ error: false, data: results });
  });
});

router.post("/bits", (req, res) => {
  let data = req.body;
  models.createBits(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error creating bits." });
    }
    res.json({ error: false, data: results });
  });
});

router.get("/bits/:bitsId", (req, res) => {
  models.getSpecificBits({ id: req.params.bitsId }, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error fetching bits." });
    }
    res.json({ error: false, data: results });
  });
});

router.put("/bits/:bitsId", (req, res) => {
  let data = req.body;
  data.id = req.params.bitsId;
  models.updateBits(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error updating bits." });
    }
    res.json({ error: false, data: results });
  });
});

router.delete("/bits/:bitsId", (req, res) => {
  let data = req.body;
  data.id = req.params.bitsId;
  models.deleteBits(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error deleting bits." });
    }
    res.json({ error: false, data: results });
  });
});

router.get("/courses/:courseId", (req, res) => {
  models.getSpecificCourse(
    {
      id: req.params.courseId,
    },
    (err, results) => {
      if (err) {
        return res.json({ error: true, message: "Error uploading file." });
      }
      res.json({ error: false, data: results });
    }
  );
});

router.post("/courses", (req, res) => {
  let data = req.body;
  models.createCourse(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error creating course." });
    }
    res.json({ error: false, data: results });
  });
});

router.put("/courses/:courseId", (req, res) => {
  let data = req.body;
  data.id = req.params.courseId;
  models.updateCourse(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error updating course." });
    }
    res.json({ error: false, data: results });
  });
});

router.delete("/courses/:courseId", (req, res) => {
  let data = req.body;
  data.id = req.params.courseId;
  models.deleteCourse(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error deleting course." });
    }
    res.json({ error: false, data: results });
  });
});

router.get("/courses/:courseId/lessons", (req, res) => {
  models.getAllLessons(
    {
      courseId: req.params.courseId,
    },
    (err, results) => {
      if (err) {
        return res.json({ error: true, message: "Error getting course." });
      }
      res.json({ error: false, data: results });
    }
  );
});

router.get("/courses/:courseId/sections", (req, res) => {
  models.getAllSections(
    {
      courseId: req.params.courseId,
    },
    (err, results) => {
      if (err) {
        return res.json({ error: true, message: "Error getting course." });
      }
      res.json({ error: false, data: results });
    }
  );
});

router.post("/courses/:courseId/sections", (req, res) => {
  let data = req.body;
  data.courseId = req.params.courseId;
  models.createSection(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error getting section." });
    }
    res.json({ error: false, data: results });
  });
});

router.put("/courses/:courseId/sections/:sectionId", (req, res) => {
  let data = req.body;
  data.courseId = req.params.courseId;
  data.id = req.params.sectionId;
  models.updateSection(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error getting section." });
    }
    res.json({ error: false, data: results });
  });
});

router.delete("/courses/:courseId/sections/:sectionId", (req, res) => {
  let data = {};
  data.courseId = req.params.courseId;
  data.id = req.params.sectionId;
  models.deleteSection(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error getting section." });
    }
    res.json({ error: false, data: results });
  });
});

router.get("/courses/:courseId/lessons/:lessonId", (req, res) => {
  let data = {
    courseId: req.params.courseId,
    lessonId: req.params.lessonId,
  };
  models.getSpecifcLesson(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error getting course." });
    }
    res.json({ error: false, data: results });
  });
});

router.post("/courses/:courseId/lessons", (req, res) => {
  let data = req.body;
  data.courseId = req.params.courseId;
  models.createLesson(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error getting course." });
    }
    res.json({ error: false, data: results });
  });
});

router.put("/courses/:courseId/lessons/:lessonId", (req, res) => {
  let data = req.body;
  data.id = req.params.lessonId;
  data.courseId = req.params.courseId;
  models.updateLesson(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error getting course." });
    }
    res.json({ error: false, data: results });
  });
});

router.delete("/courses/:courseId/lessons/:lessonId", (req, res) => {
  let data = req.body;
  data.id = req.params.lessonId;
  data.courseId = req.params.courseId;
  models.deleteLesson(data, (err, results) => {
    if (err) {
      return res.json({ error: true, message: "Error getting course." });
    }
    res.json({ error: false, data: results });
  });
});

module.exports = router;
