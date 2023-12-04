import { createContext, useContext, useReducer } from "react";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    case REGISTER:
      return action.payload;
    default:
      return state;
  }
};

const AuthContext = createContext();

const registerUser = async (userData) => {
  try {
    const response = await fetch(
      "https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      console.log(response.error);
      console.error("Error al registrar el usuario");
      return null;
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("Error al registrar el usuario", error);
    return null;
  }
};

const loginUser = async (loginData) => {
  try {
    console.log(loginData);
    const response = await fetch(
      "https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user/auth/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      }
    );

    if (!response.ok) {
      console.error("Credenciales incorrectas");
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = async (loginData) => {
    try {
      const user = await loginUser(loginData);
      if (user) {
        dispatch({ type: LOGIN, payload: user });
      } else {
        console.log("Error al iniciar sesión. Credenciales incorrectas.");
        return "Error al iniciar sesión, comprueba tus credenciales";
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
      return "Error al iniciar sesión, comprueba tus credenciales";
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      if (newUser) {
        dispatch({ type: REGISTER, payload: newUser });
      } else {
        console.log("Error al registrar el usuario.");
        return "Error al registrar el usuario.";
      }
    } catch (error) {
      console.log("Error al registrar el usuario:", error.message);
      return "Error al registrar el usuario.";
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};
