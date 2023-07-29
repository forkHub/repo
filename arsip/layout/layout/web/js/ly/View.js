var ly;
(function (ly) {
    class View {
        _view;
        header;
        static list = [];
        _data;
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
        }
        get view() {
            return this._view;
        }
        set view(value) {
            this._view = value;
        }
        init() {
            this.header = this._view.querySelector('div.header');
            this.header.onclick = (e) => {
                e.stopPropagation();
                //show menu
            };
        }
        static create(data) {
            let view = new View();
            view.view = document.querySelector("template").content.querySelector("div.layout-item").cloneNode(true);
            view.data = data;
            this.list.push(view);
            return view;
        }
    }
    ly.View = View;
})(ly || (ly = {}));
