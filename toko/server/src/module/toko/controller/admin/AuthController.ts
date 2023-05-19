import express from "express";
import { session } from "../../SessionData";
import { IAnggotaObj, IPassword } from "../../Type";

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { v } from "../../Validator";
import { configDB } from "../../ConfigDB";
import { config } from "../../Config";
import { toko } from "../../AppToko";
import { util } from "../../Util";
import md5 from "blueimp-md5";

export class AuthController {

	async renderDaftar(req: express.Request, resp: express.Response): Promise<void> {
		try {
			resp.status(200).send(toko.render.auth.daftar.render())
		}
		catch (e) {
			req.session = null;
			util.respError(resp, e);
		}
		//throw new Error("Method not implemented.");
	}

	async renderLogin(req: express.Request, resp: express.Response): Promise<void> {
		try {
			resp.status(200).send(toko.render.auth.login.render());
		}
		catch (e) {
			req.session = null;
			util.respError(resp, e);
		}
	}

	async renderLupa(req: express.Request, resp: express.Response): Promise<void> {
		try {
			resp.status(200).send(toko.render.auth.lupa.render());
		}
		catch (e) {
			req.session = null;
			util.respError(resp, e);
		}
	}

	async logout(req: express.Request, resp: express.Response): Promise<void> {
		try {
			req.session = null;
			resp.redirect(toko.router.toko_web_beranda);
		}
		catch (e) {
			util.respError(resp, e);
		}
	};

	async renderHalEditPassword(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = session(req).id;
			let penjual: IAnggotaObj = (await toko.dao.anggota.profile(id))[0];
			let hasil: string = toko.render.auth.ganti.render(penjual);
			resp.status(200).send(hasil);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	//==================
	// POST
	//=================

	async loginPost(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let userName: number = req.body.user_name;
			let password: string = req.body.password;


			let hasil: IAnggotaObj[] = await toko.dao.auth.login(userName, password);


			if (hasil.length == 0) {
				throw Error('username atau password salah');
			}

			if (hasil[0].setuju == 0) {
				throw Error('User masih belum aktif');
			}

			session(req).id = hasil[0].id;
			session(req).statusLogin = true;
			session(req).lapak = hasil[0].lapak;
			session(req).userName = hasil[0].user_name;
			session(req).aktif = parseInt(hasil[0].aktif + '');

			resp.status(200).send('');
		}
		catch (e) {
			req.session = null;
			util.respError(resp, e);
		}
	}

	async daftar(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let data: IAnggotaObj = {};

			data.user_name = req.body.user_name;
			data.lapak = v.escape(req.body.lapak).trimEnd().trimStart();
			data.alamat = v.escape(req.body.alamat).trimStart().trimEnd();
			data.deskripsi = v.escape(req.body.deskripsi).trimStart().trimEnd();
			data.email = v.escape(req.body.email).trimStart().trimEnd();

			data.wa = v.escape(req.body.wa).trimStart().trimEnd();
			data.password = req.body.password_lama;

			if (config.daftarPersetujuanAdmin) {
				data.aktif = 0;
				data.setuju = 0;
			}
			else {
				data.aktif = 1;
				data.setuju = 1;
			}

			let password_baru: string = req.body.password_baru;

			if (data.password != password_baru) {
				throw Error('password tidak sama')
			}

			v.checkPassError(data.password, 'Password mengandung karakter yang tidak diperbolehkan');
			v.checkWaErr(data.wa, 'no WA tidak valid');
			v.checkUserNameErr(data.user_name, "user Id mengandung karakter yang tidak diperbolehkan");

			await toko.dao.auth.daftar(data);

			resp.status(200).send('');
		}
		catch (e) {
			req.session = null;
			let err: any = e;

			if (err.errnoe = 1062) {
				resp.status(500).send('username, no wa atau email sudah ada yang pakai!');
			}
			else {
				util.respError(resp, e);
			}
		}
	}

	async lupaPost(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let email: string = req.body.email;
			let userAr: IAnggotaObj[];
			let user: IAnggotaObj;
			let pass: string = toko.cont.admin.auth.buatPass();

			//check email ada
			userAr = await toko.dao.auth.getByEmail(email);
			if (userAr.length == 0) {
				throw new Error('Email tidak ketemu');
			}

			//update password
			user = userAr[0];
			await toko.dao.auth.updatePassword(user.id, md5(pass));

			//send email
			var transporter: Mail = nodemailer.createTransport({
				service: configDB.email.service,
				auth: {
					user: configDB.email.user,
					pass: configDB.email.pass,
				}
			});

			var mailOptions = {
				from: 'jangan_dibalas@gmail.com',
				to: email,
				subject: 'lupa password',
				text: 'Password baru anda: ' + pass
			};

			await toko.cont.admin.auth.sendMail(transporter, mailOptions);
			resp.status(200).send('');
		}
		catch (e) {
			req.session = null;
			util.respError(resp, e);
		}

	}

	private async sendMail(transporter: Mail, mailOptions: any): Promise<void> {
		return new Promise((resolve, reject) => {
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					reject(new Error((error as any).response));
				} else {
					console.log('Email sent: ' + info.response);
					resolve();
				}
			});
		})

	}

	async editPassword(req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = session(req).id;
			let passSekarang: string = (await toko.dao.auth.pass(id))[0].password;

			let pass: IPassword = {
				password_baru: req.body.password_baru,
				password_konfirmasi: req.body.password_konfirmasi,
				password_lama: req.body.password_lama
			}

			if (pass.password_baru != pass.password_konfirmasi) {
				throw Error('Password konfirmasi tidak sama dengan password baru');
			}

			if (pass.password_lama != passSekarang) {
				throw Error('Password lama salah');
			}

			v.checkPassError(pass.password_konfirmasi, "Password harus terdiri dari Huruf Besar, Huruf Kecil dan Angka");

			await toko.dao.auth.updatePassword(id, pass.password_baru);

			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	private buatPass(pjg: number = 4): string {
		let hasil: string = '';

		while (hasil.length < pjg) {
			hasil += Math.floor(Math.random() * 10);
		}

		return (hasil);
	}

	checkAuthGet(req: express.Request, _resp: express.Response, next: express.NextFunction) {

		if (req.method.toLowerCase() != "get") {
			throw Error('');
		}
		// console.log(session(req));

		if (!session(req).statusLogin) {
			// next();
			_resp.status(401).redirect(toko.router.toko_auth_login);
		}
		else {
			next();
		}
	}

	checkAuthSession(req: express.Request, resp: express.Response, next: express.NextFunction) {
		if (!session(req).statusLogin) {
			resp.status(401).send('belum login');
		}
		else {
			next();
		}
	}
}

/**
 * check pemilik gudang dari param anggota_id
 * @param req 
 * @param resp 
 * @param next 
 */
export function checkPemilikGudangGet(req: express.Request, resp: express.Response, next: express.NextFunction) {
	if (parseInt(req.params.anggota_id) == session(req).id) {
		next();
	}
	else {
		resp.status(401).redirect('/toko/auth/login');
	}
}

export function checkPemilikGet(req: express.Request, resp: express.Response, next: express.NextFunction) {
	if (!((session(req).id + '') == req.params.id)) {
		resp.status(401).redirect('/auth/login');
	}
	else {
		next();
	}
}

export function checkPemilikPost(req: express.Request, resp: express.Response, next: express.NextFunction) {
	console.error(req.headers);
	if (!((session(req).id + '') == req.headers.from)) {
		resp.status(401).send('belum login');
	}
	else {
		next();
	}
}

export function checkAdminUser(req: express.Request, resp: express.Response, next: express.NextFunction) {
	let level: string = session(req).level;

	if (level != 'admin' && level != 'user') {
		resp.status(403).send('Perintah tidak diperkenankan');
		return;
	}

	next();
}

export function isAdmin(req: express.Request): boolean {
	if (session(req).level != 'admin') {
		return false;
	}
	return true;
}

//check auth middle ware
export function checkAdmin(req: express.Request, resp: express.Response, next: express.NextFunction) {
	if (req.params.auth == configDB.admin.pass) {
		next();
	}
	else {
		resp.status(403).send('akses tidak diperkenankan');
	}
}

export function checkDevMode(_req: express.Request, _resp: express.Response, next: express.NextFunction) {
	if (config.dev) {
		next();
	}
	else {
		_resp.status(500).send('');
	}
}

export function setCache(_req: express.Request, resp: express.Response, next: express.NextFunction) {
	resp.header("Cache-Control", "max-age=7201");
	next();
}

