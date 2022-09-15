namespace ly {

    export class View {
        private _view: HTMLElement;
        private header: HTMLElement;
        private static list: View[] = [];
        private _data: ILayout;

        public get data(): ILayout {
            return this._data;
        }
        public set data(value: ILayout) {
            this._data = value;
        }

        public get view(): HTMLElement {
            return this._view;
        }
        public set view(value: HTMLElement) {
            this._view = value;
        }

        init(): void {
            this.header = this._view.querySelector('div.header');
            this.header.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                //show menu
            }
        }

        static create(data: ILayout): View {
            let view: View = new View();

            view.view = document.querySelector("template").content.querySelector("div.layout-item").cloneNode(true) as HTMLElement;
            view.data = data;

            this.list.push(view);

            return view;
        }


    }


}