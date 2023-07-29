import express from "express";

class SessionData implements ISessionData {
	private _statusLogin: boolean = false;
	private _level: string = '';
	private _lapak: string = '';
	private _id: number = 0;
	private _userName: string = '';
	// private _wa: string = '';
	private _aktif: number = 0;

	public get aktif(): number {
		return this._aktif;
	}
	public set aktif(value: number) {
		this._aktif = value;
	}

	public get userName(): string {
		return this._userName;
	}
	public set userName(value: string) {
		this._userName = value;
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
		req.session = new SessionData();
	}

	return req.session as ISessionData;
}

export interface ISessionData {
	id: number;
	statusLogin: boolean;
	level: string;
	lapak: string;
	userName: string;
	// wa: string;
	aktif: number;
}