import React, { HTMLAttributes } from "react";

type CustomComponentProps = HTMLAttributes<HTMLDivElement>;

export interface File {
  ETag: string;
  Key: string;
}

interface FileListComponentProps extends CustomComponentProps {
  list: Array<File>;
  onFileClick: (key: string) => void;
}

const FileList: React.FC<FileListComponentProps> = ({
  list,
  onFileClick,
  ...rest
}) => {
  return (
    <section {...rest}>
      <h3>Uploaded list ({list?.length} files)</h3>
      {list?.map((item, indx) => {
        return (
          <a
            key={item["ETag"] + indx}
            style={{
              paddingBottom: "1rem",
              display: "block",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              onFileClick(item["Key"]);
            }}
          >
            {item["Key"]}
          </a>
        );
      })}
    </section>
  );
};

export default FileList;
