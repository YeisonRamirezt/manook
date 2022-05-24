import { BsFillArrowRightCircleFill, BsRecord } from "react-icons/bs";
import { useState, useEffect } from "react";

function Modules(props) {
  const [tglModule, setTglModule] = useState("false");
  const toogleModule = () => {
    setTglModule(!tglModule);
  };
  return (
    <div className="modules">
      {props.course.modules?.map((mdl) => (
        <div key={mdl._id} className="module">
          <BsFillArrowRightCircleFill className="arrow" />
          <h5 onClick={toogleModule} className="card-title mb-2">
            {mdl.name}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{mdl.description}</h6>

          {mdl.sections.map((section) => {
            return (
              <div
                key={section._id}
                onClick={(s, md) => props.section(section, mdl.name)}
                className={tglModule ? "displayBlock" : "displayNone"}
              >
                <BsRecord className="arrow" />
                {section.title}
                {section.quizzes.map(quizz =>{
                    return(
                        <div key={quizz._id} className="quizz">
                            Quizz
                        </div>
                    )
                })}
              </div>
            );
          })}

          {/* <button className="btn btn-primary" onClick={()=>changeStatus(mdl.id)}>Set Completed</button> */}
        </div>
      ))}
    </div>
  );
}

export default Modules;
