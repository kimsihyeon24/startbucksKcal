const Button = ({ text, onClick, className, type }) => {
  const baseStyle = "w-[200px] h-[50px] rounded-[20px] border-none text-xl font-normal cursor-pointer";

  const typeStyles = {
    brown: "bg-[#533E34] text-white",
    white: "bg-white text-[#533E34]",
    green: "bg-[#006442] text-white",
  };

  const buttonStyle = `${baseStyle} ${typeStyles[type] || ""} ${className || ""}`;

  return (
    <button onClick={onClick} className={buttonStyle}>
      {text}
    </button>
  );
};

export default Button;
