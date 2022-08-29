namespace ha.sl {

    class Login {

        constructor() {
            console.log('login constructor');
            this.form.onsubmit = () => {
                try {
                    console.log('login');

                    let dataObj = {
                        user_name: this.userName.value,
                        password: this.passWord.value
                    }
                    let data: string = JSON.stringify(dataObj);

                    ha.comp.Util.Ajax('post', config.nodeServer + RouterKOns.gp_auth_login, data)
                        .then((x: XMLHttpRequest) => {
                            if (401 == x.status) {
                                ha.comp.dialog.tampil('Username / password salah');
                            }
                            else if (200 == x.status) {
                                window.top.location.href = config.server + '/index.html';
                                // var app: ha.sl.Depan = new ha.sl.Depan();
                                // app.init();
                            }
                            else {
                                throw Error(x.responseText);
                            }
                        })
                        .catch((e) => {
                            ha.comp.Util.error(e);
                        })
                }
                catch (e) {
                    ha.comp.Util.error(e);
                }
                return false;
            }
        }

        init(): void {
            console.log('login init');
        }

        get form(): HTMLFormElement {
            return document.forms[0] as HTMLFormElement;
        }

        get userName(): HTMLInputElement {
            return ha.comp.Util.getEl("form #user_name") as HTMLInputElement;
        }

        get passWord(): HTMLInputElement {
            return ha.comp.Util.getEl("form #password") as HTMLInputElement;
        }
    }

    export var login: Login = new Login();
}

// var api: Silsilah;
window.onload = () => {
    console.log('hal login on load');
    ha.sl.login.init();
}