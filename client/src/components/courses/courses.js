// Packages and dependencies

import Nav from "../template/nav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./course.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [process, setProcess] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    getUser(cookies.userId);
    courses.map((course) => {
      getProcess(cookies.userId, course._id);
    });
    //console.log(process)
  }, [courses]);

  useEffect(() => {
    courses.map((course) => {
      getProcess(cookies.userId, course._id);
    });
  }, [process]);

  const getCourses = async () => {
    try {
      const courses = await fetch("courses");
      if (courses) {
        const data = await courses.json();
        if (data) {
          setCourses(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async (id) => {
    try {
      const user = await fetch(`userId?id=${id}`);
      const data = await user.json();
      setUser(data);
      //console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProcess = async (userId, courseId) => {
    console.log("gerProcess");
    let found;
    process?.map((p) => {
      if (p.courseId === courseId) {
        found = true;
      }
    });
    if (found == true) return;
    try {
      const findUser = await fetch(
        `enroll?userId=${userId}&courseId=${courseId}`
      );
      console.log(findUser.status);
      if (findUser.status === 200) {
        let data = await findUser.json();
        //console.log(data)
        if (data) {
          setProcess([...process, { courseId, data, enroll: true }]);
          return;
        }
        data = {};
        setProcess([{ ...process }, { courseId, data, enroll: false }]);
        return;
      }
      let data = {};
      setProcess([...process, { courseId, data, enroll: false }]);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnroll = async (process, userId, courseId) => {
    const enrollUser = await fetch(
      `enroll?userId=${userId}&courseId=${courseId}`,
      { method: "POST" }
    );
    if (enrollUser) {
      navigate(`/course/${courseId}`);
    }
  };

  const handleContinue = () => {};

  const enrollSection = (userId, courseId, process) => {
    console.log("course ", courseId);
    console.log("process ", process);

    let found;
    let score, percentage, completed;
    process.map((p) => {
      if (p.courseId === courseId && p.enroll === true) {
        score = p.data.score;
        percentage = p.data.percentage;
        completed = p.data.completed;
        return (found = true);
      }
    });
    if (found) {
      return (
        <div>
          <div>
            {percentage}%
          </div>
          <button
            className="btn"
            onClick={() => handleContinue(process, userId, courseId)}
          >
            Continue
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="btn"
            onClick={() => handleEnroll(process, userId, courseId)}
          >
            Enroll
          </button>
        </div>
      );
    }
  };
  if (!courses) {
    return;
  }
  return (
    <div className="courses">
      <Nav />
      <div className="col-lg-10 col-md-10 col-sm-12 container courses-1">
        <div>{user._id}</div>
        {courses?.map((course) => {
          return (
            <div
              key={course._id}
              className="col-lg-4 col-md-4 col-sm-12 courses-2"
            >
              <h1>{course.name}</h1>
              <img src={course.image} />
              <p>{course.description}</p>

              {enrollSection(user._id, course._id, process)}
              {course._id}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
