import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import FileDialog from "./Partials/FileDialog";
import FileInput from "./Partials/FileInput";

export default function Index({ auth, documents }) {
  const [files, setFiles] = useState([]);

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
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files[]", file);
    });

    console.log(formData);

    // setData(
    //   "files",
    //   files.map((file) => file.document)
    // );
    // setSubmitTriggered(true);
  };

  const handleClick = (path) => {
    alert(path);
  };

  const [path, setPath] = useState(null);

  useEffect(() => {
    if (submitTriggered) {
      // Array.from(event.target.files).forEach((file) => {
      //   formData.append('files[]', file);
      // });

      // try {
      //   const response = await axios.post('/your-backend-endpoint', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });

      //   if (response.data.success) {
      //     setDocuments(response.data.documents);
      //   } else {
      //     console.error('File upload failed');
      //   }
      // } catch (error) {
      //   console.error('Error uploading files', error);
      // }
      post(route("document.store"));
      setSubmitTriggered(false);
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
            <FileDialog />
            {/* <Dialog open={open} onOpenChange={setOpen}>
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
            </Dialog> */}
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
              {/* START */}
              <FileInput />
              {/* END */}

              <pre>{JSON.stringify(documents.data, undefined, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
