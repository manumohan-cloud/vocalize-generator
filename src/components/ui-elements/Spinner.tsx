
import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-t-transparent border-primary animate-spin-slow ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
