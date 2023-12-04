import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { TodoProvider } from "../context/TodoContext";

export default function ProtectedRouts() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    user && (
      <>
        <TodoProvider>
          <Outlet />
        </TodoProvider>
      </>
    )
  );
}
