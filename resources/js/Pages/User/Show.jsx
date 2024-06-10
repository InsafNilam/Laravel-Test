import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

export default function Show({ auth, user }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          User
        </h2>
      }
    >
      <Head title="User" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <img src={user.image} alt="user" />
          <div className="mt-4 flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                (window.location.href = route("user.edit", user.id))
              }
            >
              Edit
            </button>
            <button
              onClick={() => router.delete(route("user.destroy", user.id))}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
