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
import React, { useEffect, useState } from "react";
import FileUpload from "./Partials/FileUpload";
import { ScrollArea } from "@/Components/ui/scroll-area";

export default function Index({ auth, documents }) {
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState(null);

  const [open, setOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    files: [],
  });
  const [submitTriggered, setSubmitTriggered] = useState(false);

  const handleCancel = () => {
    setFiles([]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setData(
      "files",
      files.map((file) => file.document)
    );
    setSubmitTriggered(true);
  };

  useEffect(() => {
    if (submitTriggered) {
      post(route("document.store"));
      setSubmitTriggered(false); // Reset the submission trigger
    }
  }, [submitTriggered, data]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Document
          </h2>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-4 py-2 cursor-pointer text-sm rounded-full font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                  Select
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px] sm:max-w-screen-sm">
                <DialogHeader>
                  <DialogTitle>Choose Documents</DialogTitle>
                  <DialogDescription>
                    Select documents from your workspace to share with your team
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <h1 className="font-semibold sm:text-lg text-gray-900">
                    To Upload
                  </h1>
                  <ScrollArea className="h-80 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {documents.data.map((document) => (
                        <div
                          className="p-2 h-40 hover:bg-slate-500"
                          onClick={() => {
                            alert(document.file_path);
                          }}
                        >
                          <img
                            src={document.file_path}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={open} onOpenChange={setOpen}>
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
                <form onSubmit={onSubmit}>
                  <FileUpload
                    files={files}
                    setFiles={setFiles}
                    setData={setData}
                  />
                  <DialogFooter className="justify-end gap-2">
                    <DialogClose asChild>
                      <Button
                        disabled={processing}
                        onClick={handleCancel}
                        type="button"
                        variant="secondary"
                        className="bg-red-600 text-white hover:bg-red-500"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      disabled={processing || files.length === 0}
                      type="submit"
                      variant="secondary"
                      className="bg-emerald-500 text-white hover:bg-emerald-400"
                    >
                      Upload
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          {/* Upload Dialog */}
        </div>
      }
    >
      <Head title="Documents" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <pre>{JSON.stringify(documents.data, undefined, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
