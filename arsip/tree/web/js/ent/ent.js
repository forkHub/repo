import { Folder } from "./folder.js";
import { File } from "./file.js";
import { Project } from "./project.js";
class Ent {
    folder = new Folder();
    file = new File();
    project = new Project();
}
export const ent = new Ent();
