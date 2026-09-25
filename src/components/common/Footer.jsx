import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Mohammad Shafiqur Rahman — Frontend Software Engineer</p>
      <ul className="footer__socials">
        <li><a href="#">LinkedIn</a></li>
        <li><a href="#">GitHub</a></li>
        <li><a href="#">Email</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
