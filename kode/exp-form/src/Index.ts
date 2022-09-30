let form: HTMLFormElement = document.body.querySelector('form') as HTMLFormElement;
let url: string = 'http://localhost:8410/secure-messaging-service/default/conversations';
let token: string = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4MThlZDMxMmVkOGRhNTVkZWZkM2EzZmI0OGY1NjQzMWFjMWMwMmEzZjZkMmFkMjVjNDA5ZmEwOTA1NDU3ZTkiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiZGVmYXVsdCJdLCJhenAiOiJkZWZhdWx0IiwiY29tLnZlcmludC5pc0V4dGVybmFsbHlBdXRoZW50aWNhdGVkIjpmYWxzZSwiY29tLnZlcmludC5sb2dpblJlc3VsdCI6MSwiY29udGVudF9lbnRpdGxlbWVudHMiOlsiUmVnaXN0ZXJlZFVzZXJDb250ZW50Il0sImVtX2FwaV9hY2Nlc3MiOlsiQ2FzZUF0dGFjaG1lbnRVcGxvYWQiLCJDYXNlQXR0YWNobWVudFZpZXciLCJhY2Nlc3NfY2FzZV9jcmVhdGUiLCJhY2Nlc3NfYXR0YWNobWVudF91cGxvYWQiLCJhY2Nlc3NfYXR0YWNobWVudF9kb3dubG9hZCIsImFjY2Vzc191ZGdfcmVhZCIsImFjY2Vzc19hZ2VudF91cGRhdGUiLCJjdXN0b21lcl9yZWFkIiwiZW1haWxtYWlsYm94X2NvbmZpZ3VyZSIsImFjY2Vzc19jdXN0b21lcl9jcmVhdGUiLCJkeW5hbWljZW50aXR5X2NyZWF0ZSIsImR5bmFtaWNlbnRpdHlfdXBkYXRlIiwiZW1haWxfcG9sbCIsInNlY3VyZW1zZ19jb252ZXJzYXRpb25fY3JlYXRlIiwic2VjdXJlbXNnX21lc3NhZ2VfY3JlYXRlIiwic2VjdXJlbXNnX2NvbnZlcnNhdGlvbl9yZWFkIiwic2VjdXJlbXNnX2NvbnZlcnNhdGlvbl91cGRhdGUiLCJhY2Nlc3NfYWdlbnRfY3JlYXRlIiwiYWNjZXNzX2FnZW50X3JlYWQiLCJhY2Nlc3NfdGVuYW50X3Byb3BlcnRpZXNfdXBkYXQiLCJhY2Nlc3NfYXR0YWNobWVudF9kZWxldGUiLCJhY2Nlc3NfdGVuYW50X3Byb3BlcnRpZXNfYmF0Y2giLCJwcmVmZXJlbmNlc19jb250ZW50bG9jYWxlIiwicHJlZmVyZW5jZXNfZGVza3RvcGxvY2FsZSIsImFjY2Vzc19jdXN0b21lcl9kZWxldGUiLCJjYXNlX3VwZGF0ZSJdLCJleHAiOjE2NjQyODUzMzYsImlhdCI6MTY2NDI0OTMzNiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MjgwL29pZGMtdG9rZW4tc2VydmljZS9kZWZhdWx0IiwicmVhbG0iOiIvZGVmYXVsdCIsInN1YiI6ImFwaWNsaWVudCJ9.JnUuBaCoVh5UVduej0gaMTDt5JIW1lXzKGejfKtmfnBbV7a1RL9DCZKXuPNOrF5s94W9pBNDZlS_J0__ywaSq5-oNM8172Fke-HFDjJKqbuD8xglAFGGyaskM7y2GO-x-2xVZAfRcmXe7w9iZwBdAF_zFS2qCuMpsXx3hfrpw5lUttKMCJqsjBBuKiN4_IVM1Pw_U0ekXajQwxhd1coALiRDmjQ8APlJvV2yCpgMArjc5A_HPSsmlvYyQ3ys87L8n6RGZw0IZImxc1wXD0INRXoobPmhjg5xWxKdiUiPSyLwE7dF-Orgv4qV1v0LGyQPImhwcgWPhKEMj4Tv4AHOhw';
let body: string;
let respEl: HTMLElement = document.body.querySelector('div.response');

form.onsubmit = (e: Event) => {
	e.preventDefault();

	try {
		console.group('send');
		let xhr: XMLHttpRequest = new XMLHttpRequest();

		xhr.onload = () => {
			console.log(xhr);
			let jsonStr: string;

			try {
				jsonStr = JSON.stringify(JSON.parse(xhr.responseText), null, 4);
			}
			catch (e) {
				jsonStr = xhr.responseText;
			}

			respEl.innerHTML = xhr.status + '<br/><pre>' + jsonStr + '</pre>';
			respEl.classList.remove('disp-none');
		};

		xhr.onerror = (e: any) => {
			console.log('xhr error');
			console.log(xhr);
			console.error(e);
			console.log(xhr.getAllResponseHeaders());

			respEl.innerHTML = e.type;
			respEl.classList.remove('disp-none');

		}

		xhr.onabort = (e: any) => {
			console.log('on abbort');
			console.error(e);
			console.log(xhr);
		}

		// let token = (form as any).elements.token.value + '';
		console.log('token; ' + token);

		xhr.open("post", url + "", true);
		xhr.setRequestHeader("Authorization", 'OIDC_id_token ' + token);
		xhr.setRequestHeader("Content-Type", 'application/json');

		body = JSON.stringify({
			customerReference: (form as any).elements.customerReference.value + ''
		});
		xhr.send(body);

		console.groupEnd();
	}
	catch (e) {
		console.error(e);
		respEl.innerHTML = e;
		respEl.classList.remove('disp-none');
	}
}