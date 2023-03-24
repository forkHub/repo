import { MainChar } from "./MainChar.js";
import { PfMap } from "./Map.js";
Grafis(480, 480);
const mainChar = new MainChar();
const map = new PfMap();
const tembokGbr = Muat('gbr/box.png');
mainChar.init();
map.setMap([
    'XXXXXXXXXXXXXXX',
    'X             X',
    'X      X      X',
    'X      X      X',
    'X      X      X',
    'X      X      X',
    'X             X',
    'X   X      X  X',
    'X   X      X  X',
    'X   X      X  X',
    'X   XXXXXXXX  X',
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
        if (InputType() == EInput.TOUCH || InputType() == EInput.MOUSE) {
            let posX = Math.floor(InputX() / 32);
            let posY = Math.floor(InputY() / 32);
            mainChar.jalanKePos(posX, posY);
        }
    }
    mainChar.update();
    gambarTembok();
    Gambar(mainChar.view);
}
window["Loop"] = Loop;
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
