Grafis(480, 480);

declare var Data: any;

const mainChar = new fg.MainChar();
const map: fg.Map = new fg.Map();
const tembokGbr: ISprite = Muat('gbr/box.png');

map.setMap([
    'XXXXXXXXXXXXXXX',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'X             X',
    'XXXXXXXXXXXXXXX',
])

mainChar.pos.x = 2 * 32;
mainChar.pos.y = 2 * 32;
mainChar.updateView();
mainChar.map = map;

function Loop(): void {
    Bersih();

    if (InputHit()) {
        mainChar.jalanKePos(Math.floor(InputX() / 32), Math.floor(InputY() / 32));
    }

    mainChar.update();

    gambarTembok();
    Gambar(mainChar.view);
}

function gambarTembok() {
    for (let j: number = 0; j < map.height; j++) {
        for (let i: number = 0; i < map.width; i++) {
            if (map.getCellValue(i, j) == 1) {
                Posisi(tembokGbr, i * 32, j * 32);
                Gambar(tembokGbr);
            }
        }
    }
}
