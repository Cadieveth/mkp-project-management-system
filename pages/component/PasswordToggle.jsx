import React, { useState } from "react";
import TextFieldGlobal from "../../components/TextFieldGlobal";

function PasswordToggle({ password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-black">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          className="form-input w-full pr-10"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <TextFieldGlobal
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <label
          className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
          htmlFor="togglePassword"></label>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "8px",
        }}>
        <label className="block text-sm font-medium mb-1 text-black">
          <input
            id="togglePassword"
            type="checkbox"
            className="form-checkbox h-5 w-5"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <span className="ml-2 text-sm text-black">Show Password</span>
        </label>
      </div>
    </div>
  );
}

export default PasswordToggle;
