import { BaseComponent } from "./BaseComponent.js";

class Loading extends BaseComponent {
	constructor() {
		super();
		this._template = `
				<div class='loading'>
					<div class='box'>
						<img src=''/>
						<p>Memuat ...</p> 
					</div> 
				</div>
			`;
		this.build();
	}

	tampil(): void {
		console.log('loading tampil');
		this.attach(document.body);
	}

}

export var loading: Loading = new Loading();
console.log('exporting loading: ' + loading);
