import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <nav>
        <Link to="/about">Más Información</Link>
      </nav>
      <strong>@Layonel Leal and CodeCraft</strong>
    </footer>
  );
}
