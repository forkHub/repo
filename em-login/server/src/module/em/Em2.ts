import express, { Router } from "express";
import http, { RequestOptions, IncomingMessage } from "http";


class EM {
	readonly router: Router = express.Router();

	init(): void {
		this.router.post("/login", (_req: express.Request, resp: express.Response) => {
			let options: RequestOptions = {
				hostname: 'localhost',
				port: '8280',
				path: '/oidc-token-service/default/token?grant_type=password&password=apiclient&username=apiclient&client_id=default&scope=tags openid tags',
				method: 'post',
				protocol: 'http'
			}

			http.request(options, (res: IncomingMessage) => {
				console.log(res);
				resp.status(200).send(JSON.stringify(res));
			});

		});

		this.router.post("/test", (_req: express.Request, resp: express.Response) => {
			resp.status(200).send('sukses');
		});

		this.router.get("/test", (_req: express.Request, resp: express.Response) => {
			resp.status(200).send('sukses get');
		});

	}

}

export var em2: EM = new EM();