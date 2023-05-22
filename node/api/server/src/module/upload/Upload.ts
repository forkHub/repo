import { AuthCont } from "./AuthCont";
import { AuthSql } from "./AuthSql";
import { HalLogin } from "./HalLogin";
import { Router } from "./Router";
import { RouterKOns } from "./RouterKons";

class Upload {
    readonly routerKons: RouterKOns = new RouterKOns();
    readonly router: Router = new Router();
    readonly cont: AuthCont = new AuthCont();
    readonly halLogin: HalLogin = new HalLogin();
    readonly dao: AuthSql = new AuthSql();
}

export var upload: Upload = new Upload();