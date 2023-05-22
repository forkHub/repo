import express from "express";

class SessionData implements ISessionData {
	private _defId: number;
	private _statusLogin: boolean = false;
	private _level: string = '';
	private _lapak: string = '';
	private _id: number = 0;

	public get defId(): number {
		return this._defId;
	}
	public set defId(value: number) {
		this._defId = value;
	}
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}

	public get lapak(): string {
		return this._lapak;
	}
	public set lapak(value: string) {
		this._lapak = value;
	}

	public get level(): string {
		return this._level;
	}
	public set level(value: string) {
		this._level = value;
	}
	public get statusLogin(): boolean {
		return this._statusLogin;
	}
	public set statusLogin(value: boolean) {
		this._statusLogin = value;
	}
}

export function session(req: express.Request): ISessionData {
	if (!req.session) {
		console.debug('session tidak ada, buat yang baru')
		req.session = new SessionData();
	}

	return req.session as ISessionData;
}