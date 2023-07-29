import { ent } from "../ent/ent.js";
import { ProjectObj } from "../ent/project.js";
import { dialog, dialogShow } from "../index.js";

class Project {

    renderItem(item: ProjectObj): HTMLDivElement {
        let h = document.createElement('div') as HTMLDivElement;
        h.classList.add('item');
        h.classList.add('project-item');
        7524190053
        h.innerHTML = `<span>${item.nama}</span>`;

        return h;
    }

    render(cont: HTMLDivElement, listEl: HTMLDivElement) {
        ent.project.muat();

        ent.project.list.forEach((item) => {
            let el = this.renderItem(item);
            cont.appendChild(el);

            el.onclick = (e) => {
                e.stopPropagation();
                cont.querySelector('.dipilih').classList.remove('dipilih');
                ent.project.data.dipilih = item;
                el.classList.add('dipilih');
            }


        });

        (cont.querySelector('button.baru') as HTMLButtonElement).onclick = (e) => {
            e.stopPropagation();
            console.log('project baru');
            let nama = window.prompt('project baru');
            ent.project.buat(nama);
            setTimeout(() => {
                this.render(cont, listEl);
            }, 0);
        }

        (cont.querySelector('button.buka') as HTMLButtonElement).onclick = (e) => {
            e.stopPropagation();
            if (!ent.project.data.dipilih) {
                dialogShow('tidak ada project dipilih');
            }
        }
    }

}

const contEl = document.querySelector('.container') as HTMLDivElement;
const lietEl = contEl.querySelector('.list') as HTMLDivElement;
export const project = new Project();

window.onload = () => {
    document.body.appendChild(dialog);
    project.render(contEl, lietEl);
}

