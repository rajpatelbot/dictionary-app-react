import React from "react";
import "./result.css";

const Result = ({ word, category, meaning }) => {
  return (
    <div className="results">
      {meaning[0] && word && category === "en" && (
        <audio className="audio"
          src={meaning[0].phonetics[0] && meaning[0].phonetics[0].audio}
          controls
        ></audio>
      )}

      {word === "" ? (
        <span
          style={{ textAlign: "center", fontSize: "1.5rem", boxShadow: "none" }}
          className="subTitle"
        >
          Type your word in searchBox
        </span>
      ) : (
        meaning.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div className="subTitle">
                <b style={{ color: "#fff", fontWeight: "800" }}> Meaning : </b>
                {def.definition}
                <br />
                {def.example && (
                  <span>
                    <b style={{ color: "#fff", fontWeight: "800" }}>
                      Example :{" "}
                    </b>
                    {def.example}
                  </span>
                )}
                <br />
                {/* <hr /> */}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Result;
