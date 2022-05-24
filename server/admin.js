const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

AdminJS.registerAdapter(AdminJSMongoose);

const Courses = require("./src/models/courses.model");
// const Trainee = require("./src/models/trainee.model");
// const Managers = require("./src/models/managers.model");
// const Process = require("./src/models/process.model");
// const Admin = require("./src/models/admin.model");

const run = async () => {
  const mongooseDb = await mongoose.connect(
    "mongodb://localhost:27017/manook",
    { useNewUrlParser: true }
  );

  // Passing resources by giving entire database
  const adminJs = new AdminJS({
    resources: [
      {
        resource: Courses,
        options: {
          properties: {
            description: { type: "richtext" },
            "modules.sections.content": { type: "richtext" },
          },
        },
      },
    ],
    databases: [mongooseDb],
    rootPath: "/admin",
    branding: {
      companyName: "Manook",
      softwareBrothers: false,
      logo: "https://w7.pngwing.com/pngs/797/100/png-transparent-course-training-class-professional-certification-education-courses-miscellaneous-angle-business-thumbnail.png",
    },
  });
  const router = AdminJSExpress.buildRouter(adminJs);

  app.use(adminJs.options.rootPath, router);
};

run();

app.listen(8000, () => console.log("AdminJS is under localhost:8000/admin"));
