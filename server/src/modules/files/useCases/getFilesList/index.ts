import { GetFilesListController } from "./GetFilesListController";
import { fileService } from "../../services";

import { GetFilesList } from "./GetFilesList";

const getFilesList = new GetFilesList(fileService);
const getFilesListController = new GetFilesListController(getFilesList);

export { getFilesListController };
