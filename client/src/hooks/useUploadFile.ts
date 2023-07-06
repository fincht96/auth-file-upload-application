import { useMutation } from "@tanstack/react-query";

const allFilesUrl = "http://localhost:3000/api/files";

const postFile = async (file: FormData) => {
  const res = await fetch(allFilesUrl, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    body: file,
  });

  if (!res.ok) {
    throw new Error("Error uploading file");
  }
};

const useUploadFile = ({
  onSuccessCb,
  onErrorCb,
}: {
  onSuccessCb: () => void;
  onErrorCb?: (error: unknown) => void;
}) => {
  const mutation = useMutation({
    mutationFn: postFile,
    onError: onErrorCb,
    onSuccess: onSuccessCb,
  });

  return {
    mutation,
  };
};

export { useUploadFile };
