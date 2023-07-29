import { BaseComponent } from "./BaseComponent.js";

class Loading extends BaseComponent {
	constructor() {
		super();
		this._template = `
			<div class='loading'>
				<div class='box'>
					<img src='/gbr/loading.gif'/>
					<p>Memuat</p> 
				</div>
			</div>
		`;
		this.build();
	}

	tampil(): void {
		console.log('loading tampil');
		this.attach(document.body);
	}

	detach(): boolean {
		return super.detach();
	}

}

export var loading: Loading = new Loading();