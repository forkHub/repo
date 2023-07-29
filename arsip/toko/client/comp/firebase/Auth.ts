import { IFBUserCredential, IFBAuth, IFireBase } from "./IFirebase.js";

declare var firebase: IFireBase;

export class Auth {
	private _auth: IFBAuth;

	async init(): Promise<void> {
		this._auth = firebase.auth();
	}

	async login(username: string, password: string, persistence: string): Promise<IFBUserCredential> {
		await this._auth.setPersistence(persistence);
		return await this._auth.signInWithEmailAndPassword(username, password)
	}

	test() {
		//
	}
}