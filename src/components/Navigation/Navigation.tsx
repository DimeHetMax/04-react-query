import { Link, NavLink } from "react-router-dom";
import Container from "../Container/Container";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Link className={css.logo} to="/" aria-label="MovieFlix home">
          <span className={css.logoMark} aria-hidden="true">M</span>
          <span className={css.logoText}>Movie<span>Flix</span></span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className={css.list}>
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
              <NavLink
                className={({ isActive }) =>
                  `${css.link} ${isActive ? css.active : ""}`
                }
                to="/another"
              >
                Another
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Navigation;
