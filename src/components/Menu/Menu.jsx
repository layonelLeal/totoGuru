import { useEffect, useState } from "react";
import { AddUser, LogOut, User } from "../../icons/Icons";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import { useAuth } from "../../context/AuthContext";
import "./Menu.css";

export default function Menu() {
  const [loginActive, setLoginActive] = useState(false);
  const [currentState, setCurrentState] = useState("LogIn");
  const [error, setError] = useState(null);
  const { user, login, logout, register } = useAuth();

  useEffect(() => {
    if (user) {
      setCurrentState("LogOut");
    }
  }, [user]);

  function handleButtonLogin() {
    setCurrentState("LogIn");
    if (!user) {
      setError(false);
      setLoginActive(true);
    } else {
      logout();
      console.log(user);
    }
  }

  async function handleLogin(data) {
    const response = await login(data);
    if (response) {
      setError(response);
    } else {
      setError(null);
      setLoginActive(false);
    }
  }

  function handleLogOut() {
    logout();
    setLoginActive(false);
  }

  async function handleRegister(data) {
    const response = await register(data);
    if (response) {
      setError(response);
    } else {
      setError(null);
      setLoginActive(false);
    }
  }

  function handleButtonCreateAcount() {
    setLoginActive(true);
    setError(null);
    setCurrentState("Register");
  }

  const formText =
    currentState === "LogIn"
      ? "Iniciar Sesión"
      : currentState === "Register"
      ? "Registrarse"
      : "Cerrar Sesión";

  return (
    <>
      <header className="menu">
        <h1>TodoGuru</h1>
        <nav className="menu-navigation">
          <ul className="menu-navigation-ul">
            <li>Información</li>
            <Button
              onClick={handleButtonLogin}
              color="secundario"
              initialIcon={!user ? <User /> : <LogOut />}
            >
              {!user ? "Iniciar Sesión" : "Cerrar Sesión"}
            </Button>
            {currentState === "LogIn" || currentState == "Register" ? (
              <Button
                onClick={handleButtonCreateAcount}
                color="secundario"
                initialIcon={<AddUser />}
              >
                Registrarse
              </Button>
            ) : (
              <span />
            )}
          </ul>
        </nav>
      </header>
      <Modal state={loginActive} setState={setLoginActive} title={formText}>
        <Login
          actionName={formText}
          action={
            currentState === "LogIn"
              ? handleLogin
              : currentState === "Register"
              ? handleRegister
              : handleLogOut
          }
          error={error}
        />
      </Modal>
    </>
  );
}
