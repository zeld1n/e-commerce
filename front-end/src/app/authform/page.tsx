'use client';
import { useState } from "react";
import { useAuth } from "@/app/context/auth-context"; // путь зависит от структуры
import { useRouter } from 'next/navigation';

type UserData = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    addressStreet: string;
    addressZipCode: string;
    addressCity: string;
    addressCountry: string;
    imageUrl?: string;
    lastSeen: string;
    role: string;
  };
  

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
  const { setIsLoggedIn,setUserData } = useAuth();
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




  const toggleMode = () => {
    setIsSignUp(!isSignUp);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const router = useRouter();

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
          body: JSON.stringify(payload),
          credentials: "include",
        });
    
        const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        router.push('/homepage');
        if (data.username) {
          const userData: UserData = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            addressStreet: data.addressStreet,
            addressZipCode: data.addressZipCode,
            addressCity: data.addressCity,
            addressCountry: data.addressCountry,
            imageUrl: data.imageUrl,
            lastSeen: data.lastSeen,
            role: data.role,
          };
          setUserData(userData); 
        }
      } else {
        alert("Error: " + (data.message || "Something went wrong"));
        
      }
    } catch (err) {
      alert("Network error: " + err);
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
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="addressStreet"
            placeholder="Street"
            required
            value={formData.addressStreet}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="addressZipCode"
            placeholder="ZIP Code"
            required
            value={formData.addressZipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="addressCity"
            placeholder="City"
            required
            value={formData.addressCity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="addressCountry"
            placeholder="Country"
            required
            value={formData.addressCountry}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="imageUrl"
            placeholder="Image URL (optional)"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </>
      )}

      <input
        name="username"
        placeholder="Username"
        required
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        style={{ cursor: 'pointer' }}
      >
        {isSignUp ? "Register" : "Log In"}
      </button>
    </form>


      <p className="mt-4 text-center text-sm">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={toggleMode} className="text-blue-500 underline" style={{ cursor: 'pointer' }}  >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
  }
