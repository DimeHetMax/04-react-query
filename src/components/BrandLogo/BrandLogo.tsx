import { Link } from "react-router-dom";
import css from "./BrandLogo.module.css";

interface BrandLogoProps {
  compact?: boolean;
}

const BrandLogo = ({ compact = false }: BrandLogoProps) => (
  <Link
    className={`${css.logo} ${compact ? css.compact : ""}`}
    to="/"
    aria-label="MovieFlix home"
  >
    <span className={css.mark} aria-hidden="true">M</span>
    <span className={css.text}>Movie<span>Flix</span></span>
  </Link>
);

export default BrandLogo;
