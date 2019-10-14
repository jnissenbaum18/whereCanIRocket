import React, { Component } from "react";
import "./homePage.scss";

import ThreeRenderer from "views/components/threeRenderer/threeRendererComponent";

class homePage extends Component {
  state = {
    focused: false
  };
  render() {
    return (
      <div className="homePage">
        Home Page
        <div className="home-page__canvas-container">
          <ThreeRenderer />
        </div>
      </div>
    );
  }
}

export default homePage;
