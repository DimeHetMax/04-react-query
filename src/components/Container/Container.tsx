import type { PropsWithChildren } from "react";
import css from "./Container.module.css";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  const containerClassName = className
    ? `${css.container} ${className}`
    : css.container;

  return <div className={containerClassName}>{children}</div>;
};

export default Container;
