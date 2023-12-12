namespace ha.be {
	enum TypeDrag {
		drag = 1,
		rotasi = 2
	}

	/**
	 * Handle interaksi sprite
	 */
	class SpriteInteraksi {
		//TODO: validasi sprite ada di stage
		inputDown(pos: any, id: number): void {
			//sprite down
			let lastIdx: number = -1;
			let lastSprite: ISpr = null;

			for (let i: number = Spr.daftar.length - 1; i >= 0; i--) {
				let item: ISpr;

				item = Spr.daftar[i];

				if (Img.dotDidalamGambar(item.buff, item.x, item.y, pos.x, pos.y)) {
					if (item.buff.ctrIdx > lastIdx) {
						lastIdx = item.buff.ctrIdx;
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
				lastSprite.sudutAwal = lastSprite.buff.rotasi;

				return;
			}

		}

		inputMove(pos: any, pointerId: number): void {
			Spr.daftar.forEach((item: ISpr) => {

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
						item.buff.rotasi = item.sudutAwal + perbedaan;

						// console.debug('item drag move');
						// console.debug('sudut ptr: ' + sudut2);
						// console.debug('perbedaan: ' + perbedaan);
						// console.debug('item rotasi: ' + item.buffer.rotasi);
					}

				}
			});
		}

		inputUp(): void {
			Spr.daftar.forEach((item: ISpr) => {
				if (item.down) {
					item.hit++;
				}

				if (item.dragged) {
					console.log('input up: item rotasi ' + item.buff.rotasi)
				}

				item.down = false;
				item.dragged = false;
			});
		}
	}

	export const sprInteraksi: SpriteInteraksi = new SpriteInteraksi();
}