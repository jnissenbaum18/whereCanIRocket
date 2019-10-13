import React from 'react';
import './homePage.scss';

import ThreeRenderer from "views/components/threeRenderer/threeRendererComponent";

function homePage() {
  return (
    <div className="homePage">
        Home Page
        <ThreeRenderer/>
    </div>
  );
}

export default homePage;