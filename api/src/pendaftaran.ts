import { Util } from "./Util";

window.onload = () => {
    let form: HTMLFormElement = document.body.querySelector('form') as HTMLFormElement;

    form.onsubmit = (e) => {
        console.log('form on submit');

        e.stopPropagation();
        e.preventDefault();

        try {

            let xhr: XMLHttpRequest = new XMLHttpRequest();

            xhr.onload = () => {
                console.log('on load');
                console.log(xhr.status);
                console.log(xhr.responseText);
                if (xhr.status == 401) {
                    Util.dialog(xhr.responseText);
                }
                else if (xhr.status == 200) {
                    Util.dialog('pendaftaran berhasil');
                }
            };

            xhr.onerror = (e: any) => {
                console.log('xhr on error');
                console.log(e);
                Util.dialog(e.message || e.type || "error");
            }

            let formData = new FormData(form);
            xhr.open("post", "http://localhost:3000/auth/daftar", true);
            xhr.send(formData);
        }
        catch (e) {
            console.warn(e);
        }

        return false;
    }
}