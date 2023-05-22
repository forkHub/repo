import { Cont } from "./cont/cont";
import { Dao } from "./dao/Dao";
import { Render } from "./render/Render";
import { Router } from "./Router";

export class Admin {
    readonly cont: Cont = new Cont();
    readonly render: Render = new Render();
    readonly router: Router = new Router();
    readonly dao: Dao = new Dao();
}

export var admin: Admin = new Admin();