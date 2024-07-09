import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Show({ auth, batch, pdf }) {

  return (
      <AuthenticatedLayout
          user={auth.user}
          header={
              <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                  Course
              </h2>
          }
      >
          <Head title="Course" />



          <pre>{JSON.stringify(pdf, undefined, 2) }</pre>
      </AuthenticatedLayout>
  );
}
