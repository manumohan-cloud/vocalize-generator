
import React, { useState } from "react";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder = "Enter your text here...",
  maxLength = 1000,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`w-full relative ${className}`}>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full h-40 p-4 rounded-lg border transition-all duration-200 ease-in-out
          bg-white/90 backdrop-blur-sm resize-none
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60
          placeholder:text-muted-foreground/60
          ${isFocused ? 'shadow-md' : 'shadow-sm'}
        `}
      />
      <div className="absolute bottom-2 right-3 text-xs text-muted-foreground/60">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default TextArea;
