var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Loading extends comp.BaseComponent {
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
            tampil() {
                console.log('loading tampil');
                this.attach(document.body);
            }
        }
        comp.loading = new Loading();
        console.log('exporting loading: ' + comp.loading);
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
