export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-4">
      <p className="mb-1">
        © {new Date().getFullYear()} Project Manager. Todos los derechos reservados.
      </p>
      <small className="text-white fw-semibold">
        Desarrollado por Laura Cabot
      </small>
    </footer>
  );
}
