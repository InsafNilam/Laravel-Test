import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import FileDialog from "./Partials/FileDialog";
import FileInput from "./Partials/FileInput";
import { Button } from "@/Components/ui/button";

export default function Index({ auth, documents }) {
  const [files, setFiles] = useState([]);
  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Document
          </h2>
          <div className="space-x-2">{/* <FileDialog /> */}</div>
          {/* Upload Dialog */}
        </div>
      }
    >
      <Head title="Documents" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <FileInput
                initialFiles={files}
                onFileChange={handleFileChange}
                apiUrl={route("document.store")}
                documents={documents}
              />
              <div className="flex mr-2 sm:justify-end">
                <Button className="mt-4" onClick={() => console.log(files)}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
