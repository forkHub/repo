import { IFireBaseConfig, IFireBase } from "./IFirebase.js";

declare var firebase: IFireBase;

export class FireBaseConnector {
	async init(): Promise<any> {
		let firebaseConfig: IFireBaseConfig = {
			apiKey: "AIzaSyD8BI905B0DldnX6pgYJGK7X5J5jqy2NdU",
			authDomain: "blog-1513057469147.firebaseapp.com",
			databaseURL: "https://blog-1513057469147.firebaseio.com",
			projectId: "blog-1513057469147",
			storageBucket: "blog-1513057469147.appspot.com",
			messagingSenderId: "592396008462",
			appId: "1:592396008462:web:b9432343573f25d3cb505f",
			measurementId: "G-FDL2EWZ65Q"
		};

		await firebase.initializeApp(firebaseConfig);
		console.log('firebase complete');
	}

}