import { Folder } from "./folder.js";
import { File } from "./file.js";
import { Project } from "./project.js";

class Ent {
    readonly folder: Folder = new Folder();
    readonly file: File = new File();
    readonly project: Project = new Project();
}
export const ent = new Ent();