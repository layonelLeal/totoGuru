import { useState } from "react";
import Button from "../Button/Button";
import "./Login.css";

export default function Login({ action, actionName, error }) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleSubmit(ev) {
    ev.preventDefault();
    action(data);
  }

  function handleOnChange(ev) {
    setData({ ...data, [ev.target.name]: ev.target.value });
  }
  return (
    <form onSubmit={handleSubmit} className="formulario">
      {actionName === "Registrarse" && (
        <>
          <fieldset>
            <legend>Información General</legend>
            <div className="contInput">
              <label htmlFor="firstName">Nombre: </label>
              <input
                onChange={handleOnChange}
                type="text"
                id="firstName"
                name="firstName"
                required
              />
            </div>
            <div className="contInput">
              <label htmlFor="lastName">Apellido: </label>
              <input
                onChange={handleOnChange}
                type="text"
                id="lastName"
                name="lastName"
                required
              />
            </div>
          </fieldset>
        </>
      )}
      <fieldset>
        <legend>Información de Inicio</legend>
        <div className="contInput">
          <label htmlFor="email">Correo: </label>
          <input
            onChange={handleOnChange}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="contInput">
          <label htmlFor="password">Contraseña: </label>
          <input
            onChange={handleOnChange}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
      </fieldset>
      {error && <p className="error">{error}</p>}
      <Button type="sumbit">{actionName}</Button>
    </form>
  );
}
