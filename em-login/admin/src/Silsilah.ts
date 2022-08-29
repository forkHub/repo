
class Silsilah {
	// readonly HAL_PROFILE: string = '#hal_depan';
	readonly data: ha.sl.Data = new ha.sl.Data();

	init(): void {
		window.onhashchange = () => {
			console.log('has change');
			this.data.url = window.location.href;
		}

		this.halProfile.src = this.halProfile.getAttribute('data-src') + "?r=" + Math.floor(Math.random() * 1000);
		this.halDepan.src = this.halDepan.getAttribute('data-src') + "?r=" + Math.floor(Math.random() * 1000);

		if (window.location.href.indexOf("#") > -1) {
			window.location.href = ha.sl.config.server;
			// throw new Error('');
			// console.error('url beda');
		}

		// api.data.reg(() => {

		// }, () => {
		// 	return api.data.anggotaAktifId;
		// })
	}

	// loadP

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
