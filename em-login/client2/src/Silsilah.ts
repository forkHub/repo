
class Silsilah {
	readonly data: ha.sl.Data = new ha.sl.Data();

	init(): void {
		window.onhashchange = () => {
			console.log('has change');
			this.data.url = window.location.href;
		}

		if (window.location.href.indexOf("#") > -1) {
			window.location.href = ha.sl.config.server;
		}
		else {
			this.gantiHal(this.data.HAL_DEPAN);
		}

		this.data.reg(() => {
			this.gantiHal(api.data.halTarget);
		}, () => {
			return api.data.halTarget;
		})

	}

	gantiHal(url: string): void {
		console.log('ganti hal, url: ' + url);
		console.log('url aktif' + window.top.location.href);
		window.top.location.href = ha.sl.config.server + "/" + url;

		let iframe: HTMLIFrameElement = this.getHal(url);
		if (iframe.src == "") {
			iframe.onload = () => {
				this.setApi(iframe).then(() => {
					console.log('api set');
					// console.log()
				}).catch((e) => {
					console.warn(e);
				});
			}
			iframe.src = iframe.getAttribute('data-src') + "?r=" + Math.floor(Math.random() * 1000);
		}
	}

	async setApi(iframe: HTMLIFrameElement): Promise<void> {
		for (let i: number = 0; i < 3; i++) {
			try {
				(iframe.contentWindow as any).api = this;
				break;
			}
			catch (e) {
				console.warn(e);
				ha.comp.Util.delay(1000);
			}
		}
	}


	getHal(url: string): HTMLIFrameElement {
		return ha.comp.Util.getEl(url) as HTMLIFrameElement;
	}

	get halProfile(): HTMLIFrameElement {
		return ha.comp.Util.getEl(this.data.HAL_PROFILE) as HTMLIFrameElement;
	}

	get halDepan(): HTMLIFrameElement {
		return ha.comp.Util.getEl(this.data.HAL_DEPAN) as HTMLIFrameElement;
	}
}

let silsilah = new Silsilah();
silsilah.init();
(window as any).api = silsilah;
console.log('silsilah init');
