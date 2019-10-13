import React, { Component } from "react";
import "./homePage.scss";

import ThreeRenderer from "views/components/threeRenderer/threeRendererComponent";

class homePage extends Component {
  state = {
    focused: false
  }
  render() {
    return (
      <div className="homePage">
        Home Page
        <ThreeRenderer />
      </div>
    );
  }
}

export default homePage;
