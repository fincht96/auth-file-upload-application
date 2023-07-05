import { GetFileController } from "./GetFileController";
import { fileService } from "../../services";

import { GetFile } from "./GetFile";

const getFile = new GetFile(fileService);
const getFileController = new GetFileController(getFile);

export { getFileController };
