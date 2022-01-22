import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="w-full text-center text-xs md:text-sm pb-2">
      <div className="social justify-content-center text-3xl text-sb-med pb-2">
        <a
          className="mx-5"
          href="https://twitter.com/LifeofDave"
          target="_blank">
          <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
        </a>
        <a
          className="mx-5"
          href="https://www.linkedin.com/in/david-beidle/"
          target="_blank">
          <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
        </a>
        <a className="mx-5" href="https://github.com/dbeidle" target="_blank">
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
        </a>
      </div>
      <div>Copyright &copy; dbeidle {date}</div>
    </footer>
  );
}
