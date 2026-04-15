import React, { useState } from "react";
import Welcome from "./Welcome";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    const res = await fetch("http://<ALB-DNS>/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (res.status === 200) {
      setLoggedIn(true);       // ✅ switch to Welcome screen
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  if (loggedIn) {
    return <Welcome username={username} />;   // 👈 show welcome message
  }

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Login Page 🔐</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
