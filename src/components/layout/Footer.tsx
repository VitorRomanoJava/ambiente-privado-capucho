// src/components/layout/Footer.tsx

const Footer = () => {
  return (
    <footer className="py-6 text-center">
      <div className="container mx-auto">
        <p className="text-sm text-brand-text-soft">
          Desenvolvido com 💚 pela{" "}
          <a
            href="https://devnocorner.com.br/institucional"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-text hover:underline"
          >
            DevnoCorner
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;