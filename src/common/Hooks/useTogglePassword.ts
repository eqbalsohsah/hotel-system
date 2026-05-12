import { useState } from "react";

export default function useTogglePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    togglePassword,
  };
}