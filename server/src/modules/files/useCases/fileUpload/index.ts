import { FileUploadController } from "./FileUploadController";
import { fileService } from "../../services";
import { FileUpload } from "./FileUpload";

const fileUpload = new FileUpload(fileService);
const fileUploadController = new FileUploadController(fileUpload);

export { fileUploadController };
