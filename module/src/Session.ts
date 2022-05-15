namespace ha.modul {
    class Session {
        simpan(): void {

        }

        load(): ISession {
            let dataStr: string = window.sessionStorage.getItem('ha.mobile.editor');
            let ses: ISession;

            ses = JSON.parse(dataStr);

            return ses;
        }
    }

    export var session: Session = new Session();
}