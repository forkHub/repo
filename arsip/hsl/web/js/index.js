class RandomHsl {

    paleteJml = 32;
    setJml = 360;
    angka = [];

    random() {
        console.log('random');
        if (this.angka.length <= 0) {
            console.log('reset');
            for (let i = 0; i < this.paleteJml; i++) {
                this.angka.push(i);
            }
            console.log(this.angka);
        }
        let idx = Math.floor(Math.random() * this.angka.length);
        let h = this.angka[idx];
        this.angka.splice(idx, 1);
        console.log('idx', idx, 'h', h, 'angka:', this.angka);
        return Math.floor((h / this.paleteJml) * this.setJml);
    }
}
const rnd = new RandomHsl();
for (let i = 0; i < 64; i++) {
    buatDiv(rnd.random());
}
// buatDiv(281);
// buatDiv(61);
function buatDiv(warna = 0) {
    let div = document.createElement('div');
    // let warna = rnd.random();
    // console.log('warna ' + warna);
    div.innerText = warna + '';
    div.style.backgroundColor = "hsl(" + warna + " 60% 70%)";
    div.style.padding = '16px';
    div.style.width = '64px';
    div.style.display = 'inline-block';
    console.log(div.style.backgroundColor);
    document.body.appendChild(div);
}
