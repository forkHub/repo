export class PfMap {
    map = [];
    getCellValue(i, j) {
        if (this.map[j].charAt(i) == "X") {
            return 1;
        }
        return 0;
    }
    setMap(maps) {
        while (this.map.length > 0) {
            this.map.pop();
        }
        maps.forEach((item) => {
            this.map.push(item);
        });
    }
    isPassable(x, y) {
        if (x < 0) {
            return false;
        }
        if (y < 0) {
            return false;
        }
        if (x >= this.map[y].length) {
            return false;
        }
        if (y >= this.map.length) {
            return false;
        }
        if (this.map[y].charAt(x) == " ") {
            return true;
        }
        else {
            return false;
        }
    }
    get width() {
        return this.map[0].length;
    }
    get height() {
        return this.map.length;
    }
}
