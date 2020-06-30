import React from "react";
import "./styles.css";

import { EditorNavbar, EditorTabs } from "./components";

const App = () => {
  return (
    <>
      <section className="hero is-black is-fullheight">
        <div className="hero-head">
          <EditorNavbar />
        </div>

        <div className="hero-body is-paddingless" id="canvas-wrapper">
          <canvas />
        </div>

        <div className="hero-foot">
          <EditorTabs />
        </div>
      </section>
    </>
  );
};

export default App;
