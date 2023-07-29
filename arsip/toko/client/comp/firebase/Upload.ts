import { IFireBase, IUploadTask, IFBStorage, IFBReference } from "./IFirebase.js";
import { FireBaseConnector } from "./FireBaseConnector.js";

declare var firebase: IFireBase;

export class Upload {

	async init(): Promise<any> {
		let fb: FireBaseConnector = new FireBaseConnector();

		await fb.init();
		return Promise.resolve();
	}

	buatNama(): string {
		let hasil: string = 'foto';

		for (let i: number = 0; i < 10; i++) {
			hasil += Math.floor(Math.random() * 10);
		}
		let date: Date = new Date();
		hasil += '_' + Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

		return hasil;
	}

	private getUploadTask(nama: string, path: string, dataUrl: string): IUploadTask {
		let storage: IFBStorage = firebase.storage();
		let storageRef: IFBReference = storage.ref();
		let fileRef: IFBReference;

		console.debug('data url: ' + dataUrl.slice(0, 100));

		try {
			fileRef = storageRef.child(path + nama);
			console.log('file ref' + fileRef);
			return fileRef.putString(dataUrl, 'data_url');
		}
		catch (error) {
			console.log(error);
		}

		return null;
	}

	private async getUrl(ref: IFBReference): Promise<string> {
		return new Promise((resolve, reject) => {
			console.debug('get url:');
			console.debug(ref);

			ref.getDownloadURL().then((url: string) => {
				console.debug('url');
				console.debug(url);

				resolve(url);
			}).catch((e) => {
				reject(e);
			})
		});
	}

	private async loading(uploadTask: IUploadTask): Promise<IFBReference> {
		return new Promise((resolve, reject) => {
			uploadTask.on('state_changed',
				(snapshot: any) => {
					snapshot;
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					// switch (snapshot.state) {
					// 	case firebase.storage.TaskState.PAUSED: // or 'paused'
					// 		console.log('Upload is paused');
					// 		break;
					// 	case firebase.storage.TaskState.RUNNING: // or 'running'
					// 		console.log('Upload is running');
					// 		break;
					// }
				},
				(_error: any) => {
					console.log(_error);
					reject(_error);
				},
				() => {
					resolve(uploadTask.snapshot.ref);
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					// uploadTask.snapshot.ref.getDownloadURL().then((url) => {
					// 	console.log('File available at', url);
					// 	downloadUrl = url;
					// });
				}
			);
		});
	}

	async upload(nama: string, path: string, data: string): Promise<string> {
		let upload: Upload = new Upload();
		let downloadUrl: string = '';

		let uploadTask: IUploadTask = upload.getUploadTask(nama, path, data);
		console.debug('upload task');

		downloadUrl = await this.getUrl((await this.loading(uploadTask)));

		return downloadUrl;
	}

}