import React, { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { useAuth } from "../../context/AuthContext";
import "./App.css";
import Modal from "../../components/Modal/Modal";

export default function App() {
  const { todos, addTodo, removeTodo, editTodo } = useTodo();
  const [modalState, setModalState] = useState(false);
  const [modeData, setModeData] = useState({ title: "" });
  const { user } = useAuth();
  const [newTodoData, setNewTodoData] = useState({
    name: "",
    description: "",
    finishDate: "",
  });
  const [error, setError] = useState(null);

  function handleButtonAddTodo() {
    setError(null);
    setModeData({ title: "Crear Nueva Tarea" });
    setModalState(true);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewTodoData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleCreateTodo() {
    const error = await addTodo({ ...newTodoData, userId: user._id });
    if (!error) {
      setModalState(false);
      setError(null);
      setNewTodoData({
        name: "",
        description: "",
        finishDate: "",
      });
    } else {
      setError(error);
    }
  }

  return (
    <main className="appTodo">
      <div className="appTodo-options">
        <h1>Bienvenido {user.firstName} </h1>
        <button onClick={handleButtonAddTodo}>Añadir Nueva tarea</button>
      </div>
      <article>
        {todos.length >= 1 ? <span></span> : <h2>{"No hay pendientes :)"}</h2>}
      </article>
      <Modal state={modalState} setState={setModalState} title={modeData.title}>
        <form>
          <div className="contInut">
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={newTodoData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="contInut">
            <label htmlFor="description">Descripción: </label>
            <textarea
              name="description"
              id="description"
              rows="10"
              value={newTodoData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="contInput">
            <label htmlFor="finishDate">Fecha final: </label>
            <input
              type="date"
              name="finishDate"
              id="finishDate"
              value={newTodoData.finishDate}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handleCreateTodo}>
            Crear Tarea
          </button>
          {error && <p className="error"> {error} </p>}
        </form>
      </Modal>
    </main>
  );
}
