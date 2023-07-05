import multer from "multer";

const upload = multer();

class MiddleWare {
  public uploadSingle(fieldname: string) {
    return upload.single(fieldname);
  }
}

export { MiddleWare };
