import Button from "../Button/Button";
import "./Banner.css";

export default function Banner({ title, description, image }) {
  return (
    <article className="banner">
      <figure className="banner-contImage">
        <img src={`./${image}`} alt="diseño del banner" />
      </figure>
      <section className="banner-data">
        <h2> {title} </h2>
        <p>{description}</p>
        <Button color="secundario">Más Información</Button>
      </section>
    </article>
  );
}
