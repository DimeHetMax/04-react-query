import { Link, NavLink } from "react-router-dom";
import Container from "../Container/Container";
import css from "./Footer.module.css"

const Footer = () => {
  const creationYear = 2026;

  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.topRow}>
          <Link className={css.logo} to="/" aria-label="MovieFlix home">
            <span className={css.logoMark} aria-hidden="true">
              M
            </span>
            <span className={css.logoText}>
              Movie<span>Flix</span>
            </span>
          </Link>

          <nav aria-label="Footer navigation">
            <ul className={css.navigation}>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${css.link} ${isActive ? css.active : ""}`
                  }
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${css.link} ${isActive ? css.active : ""}`
                  }
                  to="/search"
                >
                  Search
                </NavLink>
              </li>
              <li>
                <a
                  className={css.link}
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TMDB
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={css.bottomRow}>
          <p>© {creationYear} MovieFlix. All rights reserved.</p>
          <p className={css.credit}>
            Movie data provided by <span>TMDB</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
