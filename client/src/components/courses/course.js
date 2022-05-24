import "./course.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./models/users.model";
import Process from "./models/process.model";
import Model from "./models/model";
import Modules from "./modules";
import Section from "./section";
import Nav from "../template/nav";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Course() {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("isLogedn")
      .then(result => {
        if (result.status != 200) {
            navigate('../login');
        }else{
            console.log(result)
            //navigate('../signup');
        }
        
      })
      .catch((err) => console.log(err));
  }, []);

  const [course, setCourses] = useState({});
  const { courseId } = useParams();
  useEffect(() => {
    getCourses(courseId);
  }, []);

  const getCourses = (id) => {
    fetch(`course?id=${id}`)
      .then((result) =>
        result.json().then((data) => {
          setCourses(data);
          console.log(data);
        })
      )
      .catch((err) => console.log(err));
  };

  const courseName = course.name;
  const moduleName = course.modules?.map((mdl) => mdl.name);
  const moduleSection = Model.modules?.map((mdl) =>
    mdl.sections?.map((section) => section)
  );
  const user = Users;
  const process = Process;

  const section = (s, md) => {};
  const changeModule = (e) => {};
  return (
    <div className="courses">
      <Nav user={user}></Nav>
      <Modules
        section={(s, md) => section(s, md)}
        course={course}
        changeModule={(e) => changeModule(e)}
      ></Modules>
      <Section
        courseName={courseName}
        moduleName={moduleName}
        moduleSection={moduleSection}
      ></Section>
    </div>
  );
}

export default Course;
