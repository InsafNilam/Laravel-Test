import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Create({ auth }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setData("image", file);
    } else {
      setImagePreview(undefined);
    }
  };

  const { data, setData, post, processing, errors, reset } = useForm({
    image: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("user.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            User
          </h2>
          <Link
            href={route("user.index")}
            className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
          >
            Go Back
          </Link>
        </div>
      }
    >
      <Head title="User" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Create new user</CardTitle>
              <CardDescription>
                Enter user information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="p-2 sm:p-4">
                <div className="mt-4 max-w-md mx-auto overflow-hidden items-center">
                  <div className="px-4 py-6">
                    <div className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e)}
                      />
                      <label htmlFor="image" className="cursor-pointer">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            className="max-h-48 rounded-lg mx-auto"
                            alt="Image preview"
                          />
                        ) : imagePreview === undefined ? (
                          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">
                            No image preview
                          </div>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-8 h-8 text-gray-700 mx-auto mb-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                              />
                            </svg>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                              Upload Image
                            </h5>
                            <p className="font-normal text-sm text-gray-400 md:px-6">
                              Choose photo size should be less than{" "}
                              <b className="text-gray-600">2mb</b>
                            </p>
                            <p className="font-normal text-sm text-gray-400 md:px-6">
                              and should be in{" "}
                              <b className="text-gray-600">JPG, PNG, or GIF</b>{" "}
                              format.
                            </p>
                            <span
                              id="filename"
                              className="text-gray-500 bg-gray-200 z-50"
                            ></span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="name" value="User Name" />
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full border-gray-300"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />

                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="email" value="User Email" />
                  <TextInput
                    id="email"
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                  />

                  <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="password" value="User Password" />
                  <TextInput
                    id="password"
                    type="text"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("password", e.target.value)}
                  />

                  <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm User Password"
                  />
                  <TextInput
                    id="password_confirmation"
                    type="text"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                  />

                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => (window.location.href = route("user.index"))}
                    className="bg-red-500 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-red-600 mr-2"
                  >
                    Cancel
                  </button>
                  <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                    Submit
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
