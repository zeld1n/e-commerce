'use client';
import { useState } from "react";

type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  addressStreet: string;
  addressZipCode: string;
  addressCity: string;
  addressCountry: string;
  imageUrl?: string;
};

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    addressStreet: "",
    addressZipCode: "",
    addressCity: "",
    addressCountry: "",
    imageUrl: "",
  });

  // Переключение между режимами регистрации и входа
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Очистка формы при смене режима
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      addressStreet: "",
      addressZipCode: "",
      addressCity: "",
      addressCountry: "",
      imageUrl: "",
    });
  };

  // Обработчик изменения значения в форме
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const endpoint = isSignUp
      ? "http://localhost:8080/users/add"
      : "http://localhost:8080/users/login";
  
    const payload = isSignUp
      ? formData
      : { username: formData.username, password: formData.password };
      console.log("Login payload:", payload);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Убираем 'credentials: "include"', чтобы запросы не отправляли cookies
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-2xl shadow-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="addressStreet"
              placeholder="Street"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="addressZipCode"
              placeholder="ZIP Code"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="addressCity"
              placeholder="City"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="addressCountry"
              placeholder="Country"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="imageUrl"
              placeholder="Image URL (optional)"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </>
        )}
        <input
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isSignUp ? "Register" : "Log In"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={toggleMode} className="text-blue-500 underline">
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
