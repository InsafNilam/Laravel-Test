import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import FileUpload from "./Partials/FileUpload";

export default function Index({ auth, documents }) {
  const [files, setFiles] = useState([]);
  const { data, setData, post, processing, errors, reset } = useForm({
    files: [],
  });

  const handleCancel = () => {
    setFiles([]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route("document.store"));
    // console.log("submit");
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Document
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-4 py-2 cursor-pointer text-sm rounded-full font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] sm:max-w-screen-sm">
              <DialogHeader>
                <DialogTitle>Upload Documents</DialogTitle>
                <DialogDescription>
                  Securely store your documents in your workspace for easy and
                  safe access.
                </DialogDescription>
              </DialogHeader>
              <FileUpload files={files} setFiles={setFiles} setData={setData} />
              <DialogFooter className="justify-end gap-2">
                <DialogClose asChild>
                  <Button
                    onClick={handleCancel}
                    type="button"
                    variant="secondary"
                    className="bg-red-600 text-white hover:bg-red-500"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <form onSubmit={onSubmit}>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="bg-emerald-500 text-white hover:bg-emerald-400"
                  >
                    Upload
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <Head title="Documents" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">You're logged in!</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
