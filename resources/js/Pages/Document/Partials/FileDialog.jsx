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
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";

export default function FileDialog({ setPath = null }) {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // Track selected document
  const [files, setFiles] = useState([]);
  const [submitTriggered, setSubmitTriggered] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    files: [],
  });
  const [open, setOpen] = useState(false);
  const formData = new FormData();

  const [tab, setTab] = useState("storage");

  const onTabChange = (value) => {
    setTab(value);
  };

  const handleDocumentClick = (filePath) => {
    setSelectedFile(filePath);
    handleClick(filePath);
  };

  const handleCancel = () => {
    setOpen(false);
    setFiles([]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setData(
    //   "files",
    //   files.map((file) => file.document)
    // );
    setSubmitTriggered(true);
  };

  const handleClick = (path) => {
    alert(path);
    setPath(path);
  };

  useEffect(() => {
    if (submitTriggered) {
      Array.from(files).forEach((file) => {
        formData.append("files[]", file.document);
      });

      axios
        .post(route("document.store"), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.success) {
            // setDocuments((prevFiles) => [
            //   ...prevFiles,
            //   response.data.documents,
            // ]);
            handleCancel();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // Not Working
      // post(route("document.store"), {
      //   onSuccess: (data) => console.log("DATA: ", data),
      //   onError: (error) => console.log("ERROR: ", error),
      // });
      setSubmitTriggered(false);
    }
  }, [submitTriggered, data]);

  const fetchData = async (url) => {
    const response = await axios.get(url);
    setDocuments(response.data);
  };

  useEffect(() => {
    fetchData(`/api/documents?page=${0}&perPage=${10}`);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Tabs
          defaultValue="storage"
          value={tab}
          onValueChange={onTabChange}
          className="w-full min-h-[500px]"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-b-none">
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent
            value="storage"
            className="bg-[#F1F5F9] mt-0 h-[95%] rounded-b-md p-3 pr-0"
          >
            <ScrollArea className="h-[440px] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pr-3">
                {Object.keys(documents).length !== 0 &&
                  documents.data.map((document) => (
                    <div
                      key={document.id}
                      className="relative p-2 h-40 bg-primary hover:bg-primary/80 rounded-lg focus:bg-primary/60 focus:outline-none transition duration-200 cursor-pointer"
                      onClick={() => handleDocumentClick(document.file_path)}
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleDocumentClick(document.file_path)
                      }
                    >
                      <img
                        src={document.file_path}
                        alt={`Document ${document.id}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png";
                          e.target.alt = `Fallback Avatar ${document.id}`;
                        }}
                        className="w-full h-full object-contain object-center"
                      />
                      {selectedFile === document.file_path && (
                        <div className="absolute bottom-1 right-1 shadow-sm bg-white w-5 h-5 rounded-full flex items-center justify-center">
                          <span className=" text-green-500">&#10003;</span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent
            value="upload"
            className="bg-[#F1F5F9] mt-0 h-[95%] rounded-b-md p-2"
          >
            {/* <form onSubmit={onSubmit}> */}
            <FileUpload files={files} setFiles={setFiles} />
            {/* <DialogFooter className="justify-end gap-2">
                <DialogClose asChild>
                  <Button
                    disabled={processing}
                    onClick={handleCancel}
                    type="button"
                  >
                    Upload
                  </Button>
                </DialogClose>
                <Button
                  disabled={processing}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                >
                  Save
                </Button>
              </DialogFooter>
            </form> */}
          </TabsContent>
        </Tabs>
        <DialogFooter className={`${tab === "storage" && "sm:justify-end"}`}>
          {tab === "storage" && (
            <div className="flex flex-1 items-start">
              <nav className="text-center space-x-1">
                {Object.keys(documents).length !== 0 &&
                  documents.links.map((link) => (
                    <button
                      onClick={() => fetchData(link.url)}
                      key={link.label}
                      className={
                        "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " +
                        (link.active ? "bg-gray-950 " : " ") +
                        (!link.url
                          ? "!text-gray-500 cursor-not-allowed "
                          : "hover:bg-gray-950")
                      }
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    ></button>
                  ))}
              </nav>
            </div>
          )}
          <div className="flex flex-row gap-1">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-emerald-500 text-white hover:bg-emerald-400"
                onClick={handleCancel}
              >
                NO
              </Button>
            </DialogClose>
            {tab === "storage" ? (
              <Button
                disabled={false}
                type="submit"
                variant="secondary"
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={() => {}}
              >
                YES
              </Button>
            ) : (
              <form onSubmit={onSubmit}>
                <Button
                  disabled={processing}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                >
                  Upload
                </Button>
              </form>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
