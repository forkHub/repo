Grafis(480, 480);
const mainChar = new fg.MainChar();
const map = new fg.Map();
const tembokGbr = Muat('gbr/box.png');
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
]);
mainChar.pos.x = 2 * 32;
mainChar.pos.y = 2 * 32;
mainChar.updateView();
mainChar.map = map;
function Loop() {
    Bersih();
    if (InputHit()) {
        mainChar.jalanKePos(Math.floor(InputX() / 32), Math.floor(InputY() / 32));
    }
    mainChar.update();
    gambarTembok();
    Gambar(mainChar.view);
}
function gambarTembok() {
    for (let j = 0; j < map.height; j++) {
        for (let i = 0; i < map.width; i++) {
            if (map.getCellValue(i, j) == 1) {
                Posisi(tembokGbr, i * 32, j * 32);
                Gambar(tembokGbr);
            }
        }
    }
}
