import React, { useState } from "react";

import { toast } from "react-toastify";

// import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import "./Registration.css";

const Registration = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",

    username: "",

    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://34.224.7.42:3000/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registration successful");

        console.log("Registration successful");

        // setTimeout(() =>{

        //   navigate('/');

        // },2000)
      } else {
        console.error("Registration failed");

        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);

      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
        />

        <input
          type="email"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="email"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
        />

        <button type="submit">Register</button>
        <div>
          <p>
            Already have an Account?{" "}
            <a href="./Login" className="btn btn-secondary">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-in-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
