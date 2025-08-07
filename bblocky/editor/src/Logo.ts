namespace ha.blockly {

	/**
	 * LOGO UI
	 */
	export class Logo {
		static dlg: HTMLDialogElement;

		static init() {
			this.dlg = document.createElement('dialog');
			let dlg: any = this.dlg;

			if (!(this.dlg).parentElement) {
				document.body.appendChild(dlg);
			}

			dlg.innerHTML = `
            <div>
                <h1>BASIK BLOK</h1>
                <div class='block-cont'>
                    
                </div>
            </div>
        	`;

			tombol(dlg.querySelector('div.block-cont'))

			function tombol(cont: HTMLDivElement): void {
				let tbl: HTMLButtonElement;


				tbl = document.createElement('button');
				tbl.innerText = 'Start coding';
				tbl.style.margin = '4px';
				tbl.onclick = () => {
					dlg.close();
				}
				cont.appendChild(tbl);

				tbl = document.createElement('button');
				tbl.innerText = 'Tutorial (Indonesia)';
				tbl.classList.add('button');
				tbl.style.margin = '4px';
				tbl.onclick = () => {
					dlg.close();
					window.open("https://drive.google.com/drive/folders/101YzoTecPx7M3slR4zpxT_WiIJYqTZXz?usp=sharing", "_blank");
				}
				cont.appendChild(tbl);

				tbl = document.createElement('button');
				tbl.innerText = 'Download';
				tbl.classList.add('button');
				tbl.style.margin = '4px';
				tbl.onclick = () => {
					dlg.close();
					window.open("https://drive.google.com/file/d/1iev3amQ2m7pp6u8l-gmGZ4mGL97dGzgO/view?usp=sharing", "_blank");
				}
				cont.appendChild(tbl);
			}
		}
	}
}
