import ReactPlayer from "react-player";

function Section(props) {
  function richText(text) {
    return { __html: text };
  }
  return (
    <div className="section">
      <h4>
        {props.courseName} | {props.moduleName}
      </h4>
      <div key={props.moduleSection?._id}>
        <ReactPlayer
          className="react-player"
          url="https://www.youtube.com/watch?v=ZjtmQSALuQo"
        />
        <br />
        <div
          dangerouslySetInnerHTML={richText(props.moduleSection?.content)}
        ></div>
      </div>
    </div>
  );
}

export default Section;
