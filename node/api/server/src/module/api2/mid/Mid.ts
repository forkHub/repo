import { AuthMid } from "./AuthMid";

class Mid {
    private _authMid: AuthMid = new AuthMid();
    public get authMid(): AuthMid {
        return this._authMid;
    }

}

export var mid: Mid = new Mid();