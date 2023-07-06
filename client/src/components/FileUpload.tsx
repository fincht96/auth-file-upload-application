import React, { useState, HTMLAttributes, FormEvent, ChangeEvent } from "react";

interface FormElements extends HTMLFormControlsCollection {
  file: HTMLInputElement;
}

interface FileUploadFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type CustomComponentProps = HTMLAttributes<HTMLDivElement>;

interface FileUploadComponentProps extends CustomComponentProps {
  handleFileUpload: (data: FormData) => void;
}

const FileUpload: React.FC<FileUploadComponentProps> = ({
  handleFileUpload,
  ...rest
}) => {
  const [file, setFile] = useState<Blob | undefined>();

  const handleSubmit = (event: FormEvent<FileUploadFormElement>) => {
    event.preventDefault();

    if (!(file instanceof Blob)) {
      throw new Error("Invalid file provided");
    }

    const formData = new FormData();
    formData.append("new-file", file);

    handleFileUpload(formData);

    setFile(undefined);
    event.currentTarget.reset();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <section {...rest}>
      <h3>Upload a File</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">File</label>
        <input
          onChange={handleFileSelect}
          id="file"
          type="file"
          style={{ display: "block", marginBottom: "1rem" }}
          name="new-file"
        ></input>
        <button disabled={!file}>Upload</button>
      </form>
    </section>
  );
};

export default FileUpload;
