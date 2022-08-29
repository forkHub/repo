namespace ha.comp {
	class Bind {
		private bindList: IBindObj[] = [];

		reg(setter: Function, getter: Function): void {
			let bindObj = {
				data: '',
				setter: setter,
				getter: getter
			}
			this.bindList.push(bindObj);

			let data: any = bindObj.getter();
			bindObj.data = data;
		}

		update(): void {
			// console.log('update');
			this.bindList.forEach((item: IBindObj) => {
				let data: any = item.getter();
				if (item.data != data) {
					// console.debug('update ');
					item.setter();
					item.data = data;
				}
				else {
					// console.debug('data tidak terupdate');
					//debug
				}
			})
		}
	}

	export var bind: Bind = new Bind();
}