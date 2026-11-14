import { useReveal } from "../../hooks/hooks";

export function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
