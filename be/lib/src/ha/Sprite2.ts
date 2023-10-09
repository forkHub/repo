namespace ha.be {
	enum TypeDrag {
		drag = 1,
		rotasi = 2
	}

	class SpriteInteraksi {
		inputDown(pos: any, id: number): void {
			//sprite down
			let lastIdx: number = -1;
			let lastSprite: ISprite = null;

			for (let i: number = Sprite.daftar.length - 1; i >= 0; i--) {
				let item: ISprite;

				item = Sprite.daftar[i];

				if (Image.dotDidalamGambar(item.buffer, item.x, item.y, pos.x, pos.y)) {
					if (item.buffer.ctrIdx > lastIdx) {
						lastIdx = item.buffer.ctrIdx;
						lastSprite = item;
					}
				}
			}

			if (lastSprite) {
				lastSprite.down = true;
				lastSprite.dragStartX = pos.x - lastSprite.x;
				lastSprite.dragStartY = pos.y - lastSprite.y;
				lastSprite.inputId = id;

				lastSprite.sudutTekanAwal = Transform.sudut(pos.x - lastSprite.x, pos.y - lastSprite.y);
				lastSprite.sudutAwal = lastSprite.buffer.rotasi;

				return;
			}

		}

		inputMove(pos: any, pointerId: number): void {
			Sprite.daftar.forEach((item: ISprite) => {

				if (item.down && item.dragable && (item.inputId == pointerId)) {
					item.dragged = true;

					if (item.tipeDrag == TypeDrag.drag) {
						item.x = pos.x - item.dragStartX
						item.y = pos.y - item.dragStartY
					}
					else if (item.tipeDrag == TypeDrag.rotasi) {
						//TODO: peruban sudut
						let sudut2: number = Transform.sudut(pos.x - item.x, pos.y - item.y);
						let perbedaan: number = sudut2 - item.sudutTekanAwal;
						item.buffer.rotasi = item.sudutAwal + perbedaan;

						// console.debug('item drag move');
						// console.debug('sudut ptr: ' + sudut2);
						// console.debug('perbedaan: ' + perbedaan);
						// console.debug('item rotasi: ' + item.buffer.rotasi);
					}

				}
			});
		}

		inputUp(): void {
			Sprite.daftar.forEach((item: ISprite) => {
				if (item.down) {
					item.hit++;
				}

				if (item.dragged) {
					console.log('input up: item rotasi ' + item.buffer.rotasi)
				}

				item.down = false;
				item.dragged = false;
			});
		}
	}

	export const sprInteraksi: SpriteInteraksi = new SpriteInteraksi();
}