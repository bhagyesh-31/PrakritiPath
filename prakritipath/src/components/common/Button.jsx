const Button = ({ children, variant = "primary", ...props }) => {
  const base =
    "px-4 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    secondary:
      "border border-green-600 text-green-600 hover:bg-green-50",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
