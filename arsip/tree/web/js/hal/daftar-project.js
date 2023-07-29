import { ent } from "../ent/ent.js";
import { dialog, dialogShow } from "../index.js";
class Project {
    renderItem(item) {
        let h = document.createElement('div');
        h.classList.add('item');
        h.classList.add('project-item');
        h.innerHTML = `<span>${item.nama}</span>`;
        return h;
    }
    render(cont, listEl) {
        ent.project.muat();
        ent.project.list.forEach((item) => {
            let el = this.renderItem(item);
            cont.appendChild(el);
            el.onclick = (e) => {
                e.stopPropagation();
                cont.querySelector('.dipilih').classList.remove('dipilih');
                ent.project.data.dipilih = item;
                el.classList.add('dipilih');
            };
        });
        cont.querySelector('button.baru').onclick = (e) => {
            e.stopPropagation();
            console.log('project baru');
            let nama = window.prompt('project baru');
            ent.project.buat(nama);
            setTimeout(() => {
                this.render(cont, listEl);
            }, 0);
        };
        cont.querySelector('button.buka').onclick = (e) => {
            e.stopPropagation();
            if (!ent.project.data.dipilih) {
                dialogShow('tidak ada project dipilih');
            }
        };
    }
}
const contEl = document.querySelector('.container');
const lietEl = contEl.querySelector('.list');
export const project = new Project();
window.onload = () => {
    document.body.appendChild(dialog);
    project.render(contEl, lietEl);
};
