import Courses from "./components/courses/courses.js";
import Course from "./components/courses/course.js";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration.jsx";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Registration/>}/>
        <Route path="/course/:courseId" element={<Course/>}/>
        <Route path="/courses" element={<Courses/>}/>
      </Routes>
    </Router>
  );
}

export default App;
