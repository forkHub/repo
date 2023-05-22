import express from "express";
import { util } from "../Util";
import multer from 'multer';
import { kons } from "../Kons";

export class Router {
	readonly router = express.Router();
	readonly mUpload = multer({
		dest: kons.folder_upload
	}).single('avatar')

	impl(): void {
		this.router.post("/upload2", async (_req: express.Request, resp: express.Response): Promise<void> => {
			try {
				// console.log('req');
				// console.log(_req);



				this.mUpload(_req, resp, (err) => {
					console.log('body:');
					console.log(_req.body);

					console.log('file:');
					console.log(_req.file);

					console.log('error');
					console.log(err);
					resp.status(200).send(err);
				})


				// this.mUpload(_req, resp, function (err: any) {
				// 	if (err instanceof multer.MulterError) {
				// 		util.respError(resp, err);
				// 		// A Multer error occurred when uploading.
				// 	} else if (err) {
				// 		// An unknown error occurred when uploading.
				// 		util.respError(resp, err);
				// 	}

				// 	// Everything went fine.
				// 	console.log('finish:');
				// 	resp.status(200).send(_req.file);
				// })

			}
			catch (e) {
				console.log('error');
				util.respError(resp, e);
			}

		});
	}
}