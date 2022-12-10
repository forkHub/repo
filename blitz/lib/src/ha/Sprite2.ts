namespace ha {

	class Sprite2 {
		inputDown(pos: any): void {
			ha.Sprite.daftar.forEach((item: ISprite) => {
				item.down = false;
			});

			//sprite down
			for (let i: number = ha.Sprite.daftar.length - 1; i >= 0; i--) {
				let item: ISprite;

				item = ha.Sprite.daftar[i];

				if (ha.Image.dotDidalamGambar(item.buffer, item.x, item.y, pos.x, pos.y)) {
					item.down = true;
					item.dragStartX = pos.x - item.x;
					item.dragStartY = pos.y - item.y;
					item.sudutTekanAwal = ha.Transform.deg(pos.x - item.x, pos.y - item.y);
					item.sudutAwal = item.buffer.rotasi;

					console.debug('item down');
					console.debug('sudut tekan awal: ' + item.sudutTekanAwal);
					console.debug('sudut awal: ' + item.sudutAwal);
					return;
				}
			}
		}

		inputMove(pos: any): void {
			ha.Sprite.daftar.forEach((item: ISprite) => {

				if (item.down && item.dragable) {
					item.dragged = true;

					if (item.tipeDrag == 0) {
						item.x = pos.x - item.dragStartX
						item.y = pos.y - item.dragStartY
					}
					else if (item.tipeDrag == 1) {
						//TODO: peruban sudut
						let sudut2: number = ha.Transform.deg(pos.x - item.x, pos.y - item.y);
						let perbedaan: number = sudut2 - item.sudutTekanAwal;
						item.buffer.rotasi = item.sudutAwal + perbedaan;

						console.debug('item drag move');
						console.debug('sudut2: ' + sudut2);
						console.debug('perbedaan: ' + perbedaan);
						console.debug('item rotasi: ' + item.buffer.rotasi);
					}

				}
			});
		}

		inputUp(): void {
			ha.Sprite.daftar.forEach((item: ISprite) => {
				if (item.down) {
					item.hit++;
				}

				item.down = false;
				item.dragged = false;
			});
		}
	}

	export const sprite2: Sprite2 = new Sprite2();
}