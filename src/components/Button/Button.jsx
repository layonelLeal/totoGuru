import "./Button.css";

export default function Button(props) {
  const { children, color = "primary", initialIcon, onliIcon } = props;
  const text = children || "";
  return (
    <button
      className="button"
      style={
        !onliIcon
          ? {
              "--currentColor": `var(--${color})`,
              "--colorVarActive": `var(--${color}Active)`,
            }
          : {
              "--currentColor": `transparent`,
              "--colorVarActive": `transparent`,
              padding: "0",
              margin: "0",
            }
      }
      {...props}
    >
      {initialIcon && <figure className="contIcon"> {initialIcon} </figure>}
      {text}
    </button>
  );
}
