import { ses } from "./Session.js";

class LoginService {
    async login(usr: string, pass: string): Promise<boolean> {
        if (usr == "admin") {
            if (pass == "admin") {
                ses.login(true);
                return true;
            }
        }
        ses.login(false);
        return false;
    }
}

export const loginService = new LoginService();