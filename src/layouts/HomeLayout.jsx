import { Outlet, useNavigate } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer/Footer";

export default function HomeLayout() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (user) {
      return navigate("/app");
    }
    console.log(user);
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  );
}
