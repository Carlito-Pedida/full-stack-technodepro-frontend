import React from "react";
import { Figure } from "react-bootstrap";
import "../styles/Landing.css";

function Landing(user) {
  return (
    <div className="landing-wrap">
      <div className="landing">
        <div>
          <h1 className="network">a haven for tech writers and readers</h1>
          <p className="hassle">
            The hassle-free media platform for aspiring full-stack developers
          </p>
          <br />

          <p className="ask">
            <strong>
              ask questions, share your thoughts, and help someone today!
            </strong>
          </p>
          <br />
          <h3>
            <strong className="sign-up">
              {" "}
              <a href="/signup">Sign Up Here!</a>
            </strong>{" "}
            to get started.
            <br />
            it's free!
          </h3>
        </div>
        <div className="landing-img">
          <Figure.Image
            className="img"
            width={700}
            alt="171x180"
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
