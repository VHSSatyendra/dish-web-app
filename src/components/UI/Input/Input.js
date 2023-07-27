import "./Input.css";

const Input = (props) => {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      className={`${"inputField"} ${props.className}`}
      accept={props.accept}
    />
  );
};

export default Input;
