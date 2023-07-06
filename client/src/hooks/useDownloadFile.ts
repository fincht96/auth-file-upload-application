import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getFile = (filename: string) => {
  return fetch(`http://localhost:3000/api/files/${filename}`);
};

const createFile = (filename: string, blob: Blob) => {
  // Create a temporary URL for the file
  const url = window.URL.createObjectURL(blob);

  // Create a hidden anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // Replace 'file.ext' with the desired file name
  a.style.display = "none";

  // Append the anchor element to the document body
  document.body.appendChild(a);

  // Trigger a click event on the anchor element
  a.click();

  // Clean up the temporary URL and remove the anchor element
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const useDownloadFile = () => {
  const [filename, setFilename] = useState<string>("");

  const { isLoading, error, refetch } = useQuery({
    refetchOnWindowFocus: false,
    networkMode: "always",
    queryKey: ["download-files", filename],
    queryFn: ({ queryKey }) => {
      const [_, filename] = queryKey;
      if (filename.length) {
        return getFile(filename)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Error downloading file");
            }
            return res.blob();
          })
          .then((blob) => {
            createFile(filename, blob);
            return null;
          });
      }

      return null;
    },
  });

  return {
    isLoading,
    error,
    refetch,
    setFilename,
    filename,
  };
};

export { useDownloadFile };
