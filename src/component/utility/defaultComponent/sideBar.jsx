import React from "react";
import { Button, Flex } from "antd";
import "./componentCSS/sidebar.css";
function SideBar() {
  return (
    <div className="sideBar">
      <p>Menu</p>
      <hr></hr>

      <Button>Option</Button>
      <Button>Option</Button>
      <Button>Option</Button>
      <Button>Option</Button>
      <Button>Option</Button>
      <Button>Option</Button>
      <Button>Option</Button>
    </div>
  );
}

export default SideBar;
