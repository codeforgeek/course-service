const mongo = require("mongodb");
const nconf = require("nconf");
const chalk = require("chalk");
const { uuid } = require("uuidv4");
const redisClient = require("redis").createClient;
const redis = redisClient(6379, "localhost", { db: 0 });

// connect to MongoDB
var dbo = null;
mongo.connect(
  nconf.get("mongodbURL"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) {
      console.log(chalk.red(err));
      process.exit(0);
    }
    dbo = db.db("codeforgeek");
    console.log(
      `${chalk.green("✓")} Connected to ${chalk.green("MongoDB")} database`
    );
  }
);

// check Redis connection
redis.on("connect", () => {
  console.log(
    `${chalk.green("✓")} Connected to ${chalk.green("Redis")} database`
  );
});

/**
 * @getAllCourses
 */

function getAllCourses(callback) {
  try {
    dbo
      .collection("courses")
      .find({})
      .sort({
        date: -1,
      })
      .toArray((err, results) => {
        if (err) {
          return callback(true, "error retrieving course.");
        }
        let response = {
          courses: results,
        };
        callback(false, response);
      });
  } catch (e) {
    callback(true, "Error occurred getting courses");
  }
}

function getSpecificCourse(query, callback) {
  try {
    dbo
      .collection("courses")
      .find({ id: query.id })
      .sort({
        date: -1,
      })
      .toArray((err, results) => {
        if (err) {
          return callback(true, "error retrieving course.");
        }
        let response = {
          course: results.length > 0 ? results[0] : [],
        };
        callback(false, response);
      });
  } catch (e) {
    callback(true, "Error occurred getting courses");
  }
}

function getAllBits(callback) {
  try {
    dbo
      .collection("bits")
      .find({})
      .sort({
        date: -1,
      })
      .toArray((err, results) => {
        if (err) {
          return callback(true, "error retrieving bits.");
        }
        let response = {
          bits: results,
        };
        callback(false, response);
      });
  } catch (e) {
    callback(true, "Error occurred getting bits");
  }
}

function getSpecificBits(query, callback) {
  try {
    dbo
      .collection("bits")
      .find({ id: query.id })
      .sort({
        date: -1,
      })
      .toArray((err, results) => {
        if (err) {
          return callback(true, "error retrieving bits.");
        }
        let response = {
          bits: results.length > 0 ? results[0] : [],
        };
        callback(false, response);
      });
  } catch (e) {
    callback(true, "Error occurred getting bits");
  }
}

function createBits(bitsData, callback) {
  checkIfBitsExists(bitsData.slug, (err) => {
    if (err) {
      return callback(true, "bits already exists with this slug");
    }
    // create bits now
    let payload = {
      id: uuid(),
      name: bitsData.name,
      slug: bitsData.slug,
      content: bitsData.content,
      tags: bitsData.tags,
      author: parseInt(nconf.get("authorId")),
      url: nconf.get("bitsUrl") + bitsData.slug,
      date: new Date(),
    };

    dbo.collection("bits").insertOne(payload, (err, results) => {
      if (err) {
        return callback(true, "error creating bits.");
      }
      clearCache();
      callback(false, {
        error: false,
        message: "Successfully created the bits",
        data: results.ops[0],
      });
    });
  });
}

function updateBits(bitsData, callback) {
  let payload = {
    id: bitsData.id,
    name: bitsData.name,
    slug: bitsData.slug,
    content: bitsData.content,
    tags: bitsData.tags,
    author: parseInt(nconf.get("authorId")),
    url: nconf.get("bitsUrl") + bitsData.slug,
    date: new Date(),
  };

  dbo
    .collection("bits")
    .updateOne({ id: bitsData.id }, { $set: payload }, (err, results) => {
      if (err) {
        return callback(true, "error updating bits.");
      }
      clearCache();
      callback(false, {
        error: false,
        message: "Successfully updated the bits",
        data: [],
      });
    });
}

function deleteBits(bitsData, callback) {
  dbo.collection("bits").deleteOne({ id: bitsData.id }, (err, results) => {
    if (err) {
      return callback(true, "error deleting bits.");
    }
    clearCache();
    callback(false, {
      error: false,
      message: "Successfully deleted the bits",
      data: [],
    });
  });
}

function getAllLessons(query, callback) {
  let courseId = query.courseId;
  dbo
    .collection("lessons")
    .find({
      courseId: courseId,
    })
    .sort({ lessonOrder: 1 })
    .toArray((err, lessonData) => {
      if (err) {
        return callback(true, "error retrieving lesson.");
      }
      if (lessonData.length === 0) {
        return callback(false, []);
      }
      callback(false, lessonData);
    });
}

function getSpecifcLesson(query, callback) {
  dbo
    .collection("lessons")
    .find({
      courseId: query.courseId,
      id: query.lessonId,
    })
    .toArray((err, lessonData) => {
      if (err) {
        return callback(true, "error retrieving lesson.");
      }
      if (lessonData.length === 0) {
        return callback(false, []);
      }
      callback(false, lessonData);
    });
}

function createCourse(courseData, callback) {
  checkIfCourseExists(courseData.slug, (err) => {
    if (err) {
      return callback(true, "course already exists with this slug");
    }
    // create course now
    let payload = {
      id: uuid(),
      name: courseData.name,
      slug: courseData.slug,
      featuredImage: courseData.featuredImage,
      price: courseData.price || 0,
      author: parseInt(nconf.get("authorId")),
      level: courseData.level || "beginner",
      type: courseData.type || "Rich Text",
      overview: courseData.overview,
      url: nconf.get("url") + courseData.slug,
      isPublished: false,
      date: new Date(),
    };

    dbo.collection("courses").insertOne(payload, (err, results) => {
      if (err) {
        return callback(true, "error creating courses.");
      }
      clearCache();
      callback(false, {
        error: false,
        message: "Successfully created the course",
        data: results.ops[0],
      });
    });
  });
}

function updateCourse(courseData, callback) {
  let payload = {
    id: courseData.id,
    name: courseData.name,
    slug: courseData.slug,
    featuredImage: courseData.featuredImage,
    price: courseData.price,
    author: parseInt(nconf.get("authorId")),
    date: new Date(),
    overview: courseData.overview,
    url: nconf.get("url") + courseData.slug,
    isPublished: courseData.isPublished,
  };

  dbo
    .collection("courses")
    .updateOne({ id: courseData.id }, { $set: payload }, (err, results) => {
      if (err) {
        return callback(true, "error updating courses.");
      }
      clearCache();
      callback(false, {
        error: false,
        message: "Successfully updated the course",
        data: [],
      });
    });
}

function publishCourse(publishData, callback) {
  let payload = {
    isPublished: publishData.publish,
  };
  dbo
    .collection("courses")
    .updateOne({ id: publishData.id }, { $set: payload }, (err, results) => {
      if (err) {
        return callback(true, "error updating courses.");
      }
      clearCache();
      callback(false, {
        error: false,
        message: "Successfully published the course",
        data: [],
      });
    });
}

function deleteCourse(courseData, callback) {
  dbo.collection("courses").deleteOne({ id: courseData.id }, (err, results) => {
    if (err) {
      return callback(true, "error deleting course.");
    }
    dbo
      .collection("lessons")
      .deleteMany({ courseId: courseData.id }, (err, results) => {
        if (err) {
          return callback(true, "error deleting lessons.");
        }
        clearCache();
        callback(false, {
          error: false,
          message: "Successfully deleted the course",
          data: [],
        });
      });
  });
}

function createLesson(lessonData, callback) {
  checkIfLessonExists(lessonData.slug, (err) => {
    if (err) {
      return callback(true, "Lesson already exists with this slug.");
    }
    let payload = {
      id: uuid(),
      title: lessonData.title,
      slug: lessonData.slug,
      excerpt: lessonData.excerpt,
      content: lessonData.content,
      courseId: lessonData.courseId,
      sectionId: lessonData.sectionId || null,
      lessonOrder: lessonData.lessonOrder,
      url: nconf.get("url") + lessonData.slug,
      isPublished: false,
      isPreviewEnabled: lessonData.isPreviewEnabled || false,
    };

    dbo.collection("lessons").insertOne(payload, (err, results) => {
      if (err) {
        return callback(true, "error creating lessons.");
      }
      clearCache();
      callback(false, {
        error: false,
        message: "Successfully created the lesson.",
        data: results.ops[0],
      });
    });
  });
}

function updateLesson(lessonData, callback) {
  let payload = {
    id: lessonData.id,
    title: lessonData.title,
    slug: lessonData.slug,
    excerpt: lessonData.excerpt,
    content: lessonData.content,
    courseId: lessonData.courseId,
    sectionId: lessonData.sectionId || null,
    lessonOrder: lessonData.lessonOrder,
    url: nconf.get("url") + "/lessons/#/" + lessonData.slug,
    isPublished: lessonData.isPublished,
    isPreviewEnabled: lessonData.isPreviewEnabled || false,
  };

  dbo
    .collection("lessons")
    .updateOne(
      { id: lessonData.id, courseId: lessonData.courseId },
      { $set: payload },
      (err, results) => {
        if (err) {
          return callback(true, "error updating lessons.");
        }
        clearCache();
        callback(false, {
          error: false,
          message: "Successfully updated the lessons.",
          data: [],
        });
      }
    );
}

function deleteLesson(lessonData, callback) {
  dbo
    .collection("lessons")
    .deleteOne(
      { id: lessonData.id, courseId: lessonData.courseId },
      (err, results) => {
        if (err) {
          return callback(true, "error deleting lessons.");
        }
        clearCache();
        callback(false, {
          error: false,
          message: "Successfully deleted the lessons.",
          data: [],
        });
      }
    );
}

function checkIfBitsExists(slug, callback) {
  try {
    dbo
      .collection("bits")
      .find({ slug: slug })
      .toArray((err, results) => {
        if (err) {
          return callback(true, "error retrieving bits.");
        }
        if (results.length > 0) {
          // course already exists
          return callback(true, []);
        }
        callback(false, []);
      });
  } catch (e) {
    callback(true, "Error occurred getting bits");
  }
}

function checkIfCourseExists(slug, callback) {
  try {
    dbo
      .collection("courses")
      .find({ slug: slug })
      .toArray((err, results) => {
        if (err) {
          return callback(true, "error retrieving course.");
        }
        if (results.length > 0) {
          // course already exists
          return callback(true, []);
        }
        callback(false, []);
      });
  } catch (e) {
    callback(true, "Error occurred getting courses");
  }
}

function checkIfLessonExists(slug, callback) {
  try {
    dbo
      .collection("lessons")
      .find({ slug: slug })
      .toArray((err, results) => {
        if (err) {
          return callback(true, "error retrieving lesson.");
        }
        if (results.length > 0) {
          // lesson already exists
          return callback(true, []);
        }
        callback(false, []);
      });
  } catch (e) {
    callback(true, "Error occurred getting lessons");
  }
}

function getAllSections(query, callback) {
  let courseId = query.courseId;
  dbo
    .collection("lessons_sections")
    .find({
      courseId: courseId,
    })
    .toArray((err, lessonData) => {
      if (err) {
        return callback(true, "error retrieving sections.");
      }
      if (lessonData.length === 0) {
        return callback(false, []);
      }
      callback(false, lessonData);
    });
}

function createSection(sectionData, callback) {
  let payload = {
    id: uuid(),
    name: sectionData.name,
    courseId: sectionData.courseId,
  };

  dbo.collection("lessons_sections").insertOne(payload, (err, results) => {
    if (err) {
      return callback(true, "error creating section.");
    }
    callback(false, {
      error: false,
      message: "Successfully created the section.",
      data: results.ops[0],
    });
  });
}

function updateSection(sectionData, callback) {
  let payload = {
    name: sectionData.name,
  };

  dbo
    .collection("lessons_sections")
    .updateOne(
      { id: sectionData.id, courseId: sectionData.courseId },
      { $set: payload },
      (err, results) => {
        if (err) {
          return callback(true, "error updating section.");
        }
        callback(false, {
          error: false,
          message: "Successfully updated the section.",
          data: [],
        });
      }
    );
}

function deleteSection(sectionData, callback) {
  dbo
    .collection("lessons_sections")
    .deleteOne(
      { id: sectionData.id, courseId: sectionData.courseId },
      (err, results) => {
        if (err) {
          return callback(true, "error deleting section.");
        }
        // update the lessons with sectionId null
        dbo
          .collection("lessons")
          .updateMany(
            { sectionId: sectionData.id },
            { $set: { sectionId: null } },
            (err, results) => {
              if (err) {
                return callback(true, "error deleting section.");
              }
              callback(false, {
                error: false,
                message: "Successfully deleted the section.",
                data: [],
              });
            }
          );
      }
    );
}

function clearCache() {
  redis.flushdb((err, succeeded) => {
    console.log(`${chalk.red("✓")} Redis Cache Cleared.`);
  });
}

module.exports = {
  getAllCourses: getAllCourses,
  getAllLessons: getAllLessons,
  createCourse: createCourse,
  createLesson: createLesson,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse,
  updateLesson: updateLesson,
  deleteLesson: deleteLesson,
  getSpecifcLesson: getSpecifcLesson,
  publishCourse: publishCourse,
  getSpecificCourse: getSpecificCourse,
  createSection: createSection,
  updateSection: updateSection,
  getAllSections: getAllSections,
  deleteSection: deleteSection,
  getAllBits: getAllBits,
  getSpecificBits: getSpecificBits,
  createBits: createBits,
  updateBits: updateBits,
  deleteBits: deleteBits,
};
