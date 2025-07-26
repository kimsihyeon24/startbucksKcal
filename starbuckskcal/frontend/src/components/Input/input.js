const Input = ({ type, placeholder, value, onChange, className }) => {
  const baseStyle = "w-full p-2.5 border border-gray-300 rounded-md box-border text-base";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseStyle} ${className || ""}`}
    />
  );
};

export default Input;