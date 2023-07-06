import "./App.css";
import { useDownloadFile } from "./hooks/useDownloadFile";
import { useGetFiles } from "./hooks/useGetFiles";
import { useUploadFile } from "./hooks/useUploadFile";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FIleList";

function App() {
  const { setFilename } = useDownloadFile();
  const { list, refetch } = useGetFiles();
  const { mutation } = useUploadFile({
    onSuccessCb: () => refetch(),
  });

  const handleFileUpload = (data: FormData) => {
    mutation.mutate(data);
  };

  const handleFileClick = (key: string) => {
    setFilename(key);
  };

  return (
    <div className="container">
      <h2>Auth File Upload Application</h2>

      <div className="container-group">
        <FileUpload handleFileUpload={handleFileUpload} />
        <FileList
          className={"file-list"}
          list={list}
          onFileClick={handleFileClick}
        />
      </div>
    </div>
  );
}

export default App;
