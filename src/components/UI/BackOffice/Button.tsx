import { Link } from "react-router";

interface IButtonProps {
  onClick?: () => void;
  to?: string;
  children: React.ReactNode;
  color?: "red" | "blue" | "green" | "gray";
  additionalClasses?: string;
  type?: "button" | "reset" | "submit" | "router-link";
}

export default function Button({
  onClick,
  to,
  children,
  color = "blue",
  additionalClasses = "",
  type = "button",
}: IButtonProps) {
  const baseStyle =
    "cursor-pointer px-3 py-1 border text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const colorStyles = {
    red: "text-red-700 bg-red-100 border-red-700 hover:bg-red-200  focus:ring-red-500",
    blue: "text-white bg-blue-500 border-blue-900 hover:bg-cyan-400 focus:ring-blue-500",
    green: "",
    gray: "text-white bg-gray-700 border-gray-900 hover:bg-gray-500 focus:ring-gray-700",
  };

  if (type == "router-link") {
    if (typeof to === "string") {
      return (
        <Link
          to={to}
          className={
            baseStyle + " " + colorStyles[color] + " " + additionalClasses
          }
        >
          {children}
        </Link>
      );
    } else {
      return 'Error: missing "to" for React-router Link';
    }
  } else {
    return (
      <button
        type={type}
        className={
          baseStyle + " " + colorStyles[color] + " " + additionalClasses
        }
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
