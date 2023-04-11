import { ILayout, layoutList, store } from "./store";
import React, { useEffect, useState } from 'react';
import { LayoutObj } from "./LayoutObj";


export function Layout({ layoutId }: { layoutId: number }) {
    const [layout, setLayout]: [LayoutObj, any] = useState(null);

    useEffect(() => {
        setLayout(layoutList.getById(layoutId));
    }, [store]);

    const handleMenuKlik = () => {
        console.log('handle menu klik');
    }

    if (layout) {
        return <>
            <div className="layout disp-flex flex-dir-row height-12">
                <div className="disp-flex">
                    <div className="flex-grow-1">{layout.nama}</div><div onClick={() => { handleMenuKlik() }}>|||</div>
                </div>
                <div className="flex-grow-1">

                </div>
            </div>
        </>
    }
    else {
        return <></>
    }

}
