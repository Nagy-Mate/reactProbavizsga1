import { useState } from "react";
import type { User } from "../types/User";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ username: "", password: "" });

  const onLogin = () => {
    apiClient
      .post("/login", user)
      .then(() => {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("sikeres bejelentkezés");
        navigate("/");
      })
      .catch(() => {toast.error("Sikertelen bejelentkezés"); setUser({...user, password: ""})});
  };
  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <h1>Bejelentkezés</h1>
        <p>
          Felhasználónév:{" "}
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </p>
        <p>
          Jelszó:{" "}
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </p>
        <Button variant="success" onClick={onLogin}>
          Login
        </Button>
      </Container>
    </>
  );
}
export default LoginPage;
