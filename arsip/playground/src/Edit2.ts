declare var CodeMirror: any;

class Edit2 {
	private myCodeMirror: any;
	private editArea: HTMLTextAreaElement = document.querySelector('textarea.edit-area');
	private webCont: HTMLDivElement = document.querySelector('div.kontainer-2 div.web');
	private editCont: HTMLDivElement = document.querySelector('div.kontainer-2 div.edit-text');
	private tblRun: HTMLButtonElement = document.querySelector('button.jalan');
	private tblEdit: HTMLButtonElement = document.querySelector('button.edit');

	init(): void {

		console.log(CodeMirror);

		this.tblRun.onclick = () => {
			console.debug('run');
			this.tblEdit.classList.remove('active');
			this.editCont.classList.remove('active');

			this.tblRun.classList.add('active');
			this.webCont.classList.add('active');

			this.compile();
		}

		this.tblEdit.onclick = () => {
			this.tblEdit.classList.add('active');
			this.editCont.classList.add('active');
			this.editArea.classList.add('active');

			this.tblRun.classList.remove('active');
			this.webCont.classList.remove('active');
			this.webCont.innerHTML = '';

			console.log('edit click');
		}

		this.myCodeMirror = CodeMirror.fromTextArea(this.editArea, {
			lineNumbers: false,
			styleActiveLine: true,
			matchBrackets: true
			// theme: 'ambiance'
		});

		console.log(CodeMirror);
		console.log(this.myCodeMirror);

		this.myCodeMirror.on("change", () => {
			console.log('change');
		});

		this.loadFromQuery();
	}

	loadFromQuery(): void {
		try {
			//loading
			let s: string = window.top.location.search.slice(1);
			console.log('url: ' + s);
			let ar: string[] = s.split('&');
			console.log(ar);
			ar = ar[0].split('=');
			console.log(ar);

			console.log('loading: ' + ha.comp.loading);
			ha.comp.Util.Ajax2('get', "./data/" + ar[1] + ".js", '').then((value: string) => {
				this.myCodeMirror.setValue(value);
				// this.compile();
			}).catch((e) => {
				console.error(e);
				ha.comp.dialog.tampil('Colud not load data');
			});

			//load query
			console.log(ar);
		}
		catch (e) {
			console.error(e);
		}
	}

	klikRun(): void {
		this.compile();
	}

	compile(): void {
		let hal2: string = hal;
		hal2 = hal2.replace('{{script}}', this.myCodeMirror.getValue());
		let iframe: HTMLIFrameElement = document.createElement('iframe') as HTMLIFrameElement;
		let iframeCont: HTMLDivElement = document.body.querySelector('div.kontainer-2 div.web') as HTMLDivElement;

		iframeCont.innerHTML = '';
		iframeCont.appendChild(iframe);

		setTimeout(() => {
			iframe.contentWindow.document.open();
			iframe.contentWindow.document.write(hal2);
			iframe.contentWindow.document.close();
		}, 10);

		// console.log
		// console.log(this.myCodeMirror.getValue());
		console.log(hal2);
	}


}

window.onload = () => {
	let edit: Edit2 = new Edit2();
	edit.init();
}

let hal: string = `
	<!DOCTYPE html>
	<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,
			target-densityDpi=device-dpi">

		<title>Blitz</title>

		<style>
			html,
			body,
			div,
			canvas {
				box-sizing: border-box;
				overflow: hidden;
				margin: 0px;
				padding: 0px;
			}

			html,
			body {
				position: relative;
				width: 100%;
				height: 100%;
				background-color: #000;
			}

			canvas.buffer.back-buffer,
			canvas.buffer.front-buffer {
				position: absolute;
				background-color: transparent;
				touch-action: none;
				image-rendering: pixelated;
			}

			canvas.buffer.back-buffer {
				display: none;
			}

			div.debug {
				touch-action: none;
				height: 100vh;
				pointer-events: none;
				width: 100%;
				height: 100%;
				color: white;
			}
		</style>
	</head>

	<body>
		<canvas class='buffer front-buffer'></canvas>
		<div class='debug' style="z-index:1; position:relative"></div>

		<script src="./js/blitz.js?r=${Math.floor(Math.random() * 1000)}"></script>
		<script>{{script}}</script>
	</body>

	</html>
`;