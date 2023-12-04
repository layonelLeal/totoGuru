import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const SET_TODOS = "SET_TODOS";

const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case DELETE_TODO:
      return state.filter((todo) => todo._id !== action.payload);
    case UPDATE_TODO:
      return state.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    case SET_TODOS:
      return action.payload;
    default:
      return state;
  }
};

const TodoContext = createContext();

const createTodo = async (todoData) => {
  try {
    console.log(todoData);
    const response = await fetch(
      "https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      }
    );

    if (!response.ok) {
      console.error("Error al crear la tarea");
      return null;
    }

    const newTodo = await response.json();
    return newTodo;
  } catch (error) {
    console.error("Error al crear la tarea", error);
    return null;
  }
};

const deleteTodo = async (todoId) => {
  try {
    const response = await fetch(
      `https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/${todoId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.error("Error al eliminar la tarea");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar la tarea", error);
    return false;
  }
};

const updateTodo = async (todoData) => {
  try {
    const response = await fetch(
      "https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      }
    );

    if (!response.ok) {
      console.error("Error al actualizar la tarea");
      return null;
    }

    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (error) {
    console.error("Error al actualizar la tarea", error);
    return null;
  }
};

const fetchTodos = async (userId, searchTerm, startDate, endDate) => {
  try {
    const url = new URL("https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/");
    const params = { userId, searchTerm, startDate, endDate };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Error al obtener las tareas");
      return null;
    }

    const todos = await response.json();
    return todos;
  } catch (error) {
    console.error("Error al obtener las tareas", error);
    return null;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, []);
  const { user } = useAuth();

  useEffect(() => {
    const loadTodos = async () => {
      const userId = user._id; // Reemplaza con el userId adecuado
      console.log(user._id);
      const todos = await fetchTodos(userId);
      if (todos) {
        dispatch({ type: SET_TODOS, payload: todos });
      }
    };

    loadTodos();
  }, []);

  const addTodo = async (todoData) => {
    try {
      const newTodo = await createTodo({ ...todoData, isCompleted: false });
      if (newTodo) {
        dispatch({ type: ADD_TODO, payload: newTodo });
      } else {
        console.log("Error al crear la tarea.");
        return "Error al crear la tarea.";
      }
    } catch (error) {
      console.log("Error al crear la tarea:", error.message);
      return "Error al crear la tarea.";
    }
  };

  const removeTodo = async (todoId) => {
    try {
      const success = await deleteTodo(todoId);
      if (success) {
        dispatch({ type: DELETE_TODO, payload: todoId });
      } else {
        console.log("Error al eliminar la tarea.");
        return "Error al eliminar la tarea.";
      }
    } catch (error) {
      console.log("Error al eliminar la tarea:", error.message);
      return "Error al eliminar la tarea.";
    }
  };

  const editTodo = async (todoData) => {
    try {
      const updatedTodo = await updateTodo(todoData);
      if (updatedTodo) {
        dispatch({ type: UPDATE_TODO, payload: updatedTodo });
      } else {
        console.log("Error al actualizar la tarea.");
        return "Error al actualizar la tarea.";
      }
    } catch (error) {
      console.log("Error al actualizar la tarea:", error.message);
      return "Error al actualizar la tarea.";
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos: state, addTodo, removeTodo, editTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    console.error("useTodo debe ser utilizado dentro de un TodoProvider");
  }
  return context;
};
