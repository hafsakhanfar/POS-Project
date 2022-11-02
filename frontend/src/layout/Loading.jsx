import React from "react";
import loading from "../assetsStayles/loading.module.css";

function Loading({ children }) {
  return (
    <div className={loading.container}>
      <div className={loading.ldsEllipsis}>
      <div></div><div></div><div></div><div></div>
      </div>
      {children}
    </div>
  );
}

export default Loading;
