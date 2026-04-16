import React from "react";

function Welcome({ username }) {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>👋 Hello {username}, your deployment is successful! 🚀</h2>
    </div>
  );
}

export default Welcome;
