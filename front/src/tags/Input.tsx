/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const sizeStyles = {
  sm: {
    fontSize: "1rem",
  },
  md: {
    fontSize: "1.167rem",
  },
  lg: {
    fontSize: "1.333rem",
  },
};

const backColors = {
  white: '#fff',
  default: 'black',
  warning: '#f45858',
  success: '#58a9f4'
}

function Input({ size = "md", variant = "default", onChange }) {
  return (
    <input onChange={onChange}
      css={{
        outline: 'none',
        ...sizeStyles[size],
        border: 'none',
        color: backColors[variant]
      }}
    />
  );
}

export default Input;
