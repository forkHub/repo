import { Util } from "../comp/Util.js";
import { ModulObj } from "../modulEnt.js";

let param:string = Util.getParam('id');
ModulObj.loadData();
ModulObj.get