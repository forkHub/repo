const hook = {
    hal: false,
    setHal: (_b: boolean) => { }
}

function setter(ar: any[]): void {
    hook.hal = ar[0];
    hook.setHal = ar[1];
}

function Beranda() {
    console.log('beranda');
    setter(React.useState(true));

    let ok: JSX.Element = <div>status lagi true</div>
    if (!hook.hal) {
        ok = <></>
    }

    return (<>
        <button
            onClick={() => {
                hook.setHal(!hook.hal);
                console.log('click ' + hook.hal);
            }}
        >
            status hal {hook.hal + ''}
        </button>
        {ok}
    </>);
}