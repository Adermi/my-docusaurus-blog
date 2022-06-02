import React from "react";

// 自动居中的图片组件，用于MDX组件
export default function BlockImg({src}) {
  console.log(src)
  return (
    <img
      src={require(`.${src}`).default}
      alt="Example banner"
      style={{ margin: "auto" }}
    />
  );
}
