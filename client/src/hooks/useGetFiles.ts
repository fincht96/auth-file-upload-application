import { useQuery } from "@tanstack/react-query";

const useGetFiles = () => {
  const allFilesUrl = "http://localhost:3000/api/files";
  const {
    isLoading,
    error,
    data: list,
    refetch,
  } = useQuery({
    queryKey: ["all-files"],
    queryFn: () => {
      return fetch(allFilesUrl).then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching files");
        }
        return res.json();
      });
    },
  });

  return {
    isLoading,
    error,
    list,
    refetch,
  };
};

export { useGetFiles };
