import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext";
import SelectAvatar from "./SelectAvatar";

const Profile = () => {
  const { userDetails } = useProfile();
  // console.log(userDetails);

  const [formData, setFormData] = useState({});
  const [selectedLink, setSelectedLink] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/user/profile/update", {
        ...formData,
        avatarLink: selectedLink,
      });

      // Handle successful response (you may want to update state or show a success message)
      // console.log(response.data);
    } catch (error) {
      // Handle error (you may want to show an error message)
      console.error(error);
    }
  };
  useEffect(() => {
    setFormData(userDetails);
  },[userDetails]);

  return (
    <div className="flex h-full min-h-screen bg-background">
      <Nav />
      <div className="bg-background w-[91%] flex items-center">
        <div className="max-w-xl mx-auto ">
          <h2 className="mb-4 text-2xl font-bold text-white">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className=" border b  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  value={formData?.firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className=" border b  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  value={formData?.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  disabled
                  className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400  ring-primary-500 "
                  value={userDetails?.email}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <SelectAvatar
              setSelectedLink={setSelectedLink}
              selectedLink={selectedLink}
            />
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
