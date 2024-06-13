import { Badge } from "@/Components/ui/badge";
import React from "react";

export default function FileTemplate({ file, url, handleFileDelete }) {
  const { type, name } = file;

  return (
    <article
      tabIndex="0"
      className="w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm"
    >
      <img
        alt="upload preview"
        src={
          type.match("image.*")
            ? url
            : "https://aiaedu.one/wp-content/themes/eikra/assets/img/noimage-420x273.jpg"
        }
        className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
      />
      <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 pt-2">
        <h1 className="flex-1 text-blue-600 px-2">{name}</h1>
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
          {type ? (
            <Badge>{type}</Badge>
          ) : (
            <Badge variant={"destructive"}>Undefined</Badge>
          )}
          <button
            onClick={handleFileDelete}
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
    </article>
  );
}
