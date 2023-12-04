import Banner from "../components/Banner/Banner";

export default function Home() {
  return (
    <>
      <main className="ContHome">
        <Banner
          title="TodoGuru"
          description="Transformamos la gestión de tareas en algo fácil y rápido. Descubre la
        simplicidad con nuestra interfaz intuitiva en TogoGuru."
          image="bannerDesing.svg"
        />
      </main>
    </>
  );
}
