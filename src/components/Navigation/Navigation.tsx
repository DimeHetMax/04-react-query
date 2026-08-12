import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import BrandLogo from "../BrandLogo/BrandLogo";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={css.header}>
      <Container className={css.container}>
        <BrandLogo />

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
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Navigation;
