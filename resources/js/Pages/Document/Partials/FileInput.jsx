import React, { useState } from "react";
import FileDialog from "./FileDialog";
import { Badge } from "@/Components/ui/badge";

export default function FileInput({}) {
  const [path, setPath] = useState(null);

  return (
    <div className="w-full flex flex-col p-2 border-2 border-dashed rounded-md gap-1">
      <div>File Preview</div>
      <div className="h-40 space-y-2 mb-1">
        <div className="snap-mandatory snap-x flex flex-row h-3/4 gap-2 overflow-x-scroll hide-scroll-bar flex-nowrap">
          <div className="snap-center">
            <div className="w-64 h-full max-w-xs overflow-hidden rounded-md bg-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"></div>
          </div>
          <div className="inline-block snap-center">
            <div className="w-64 h-full max-w-xs overflow-hidden rounded-md bg-gray-200 relative">
              {/* {path && ( */}
              <img
                src={
                  "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                }
                className="h-full w-full object-contain object-center rounded-md"
              />
              {/* )} */}
              <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 pt-2">
                <h1 className="flex-1 text-blue-600 px-2">{"Hello"}</h1>
                <div className="flex bg-[#71B48D] text-primary-foreground px-2 py-1 rounded-b-md items-center">
                  <span className="p-1">
                    <i>
                      <svg
                        className="fill-current w-4 h-4 ml-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                      </svg>
                    </i>
                  </span>
                  <Badge variant={"destructive"}>Undefined</Badge>
                  <button
                    onClick={() => {}}
                    className="delete ml-auto focus:outline-none hover:bg-primary p-1 rounded-md"
                  >
                    <svg
                      className="pointer-events-none fill-current w-4 h-4 ml-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="pointer-events-none"
                        d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                      />
                    </svg>
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div className="inline-block snap-center">
            <div className="w-64 h-full max-w-xs overflow-hidden rounded-md bg-gray-200"></div>
          </div>
          <div className="inline-block snap-center">
            <div className="w-64 h-full max-w-xs overflow-hidden rounded-md bg-gray-200"></div>
          </div>
          <div className="inline-block snap-center">
            <div className="w-64 h-full max-w-xs overflow-hidden rounded-md bg-gray-200"></div>
          </div>
          <div className="inline-block snap-center">
            <div className="w-64 h-full max-w-xs overflow-hidden rounded-md bg-gray-200"></div>
          </div>
          <div className="inline-block snap-center">
            <div className="w-64 h-full max-w-xs overflow-hidden rounded-md bg-gray-200"></div>
          </div>
          <div className="inline-block snap-center">
            <div className="w-64 h-full max-w-xs overflow-hidden rounded-md bg-gray-200"></div>
          </div>

          {/* <div className="w-1/2 h-full bg-gray-200 rounded-md">
                      {path && (
                        <img
                          src={path}
                          className="h-full w-full object-contain rounded-md"
                        />
                      )}
                    </div>
                    <div className="w-1/2 h-full bg-gray-200 rounded-md">
                      Hello
                    </div> */}
        </div>
        <div className="grid place-content-end">
          <FileDialog setPath={setPath} />
        </div>
      </div>
    </div>
  );
}
