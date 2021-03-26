import * as React from 'react';
import {useAppEvent} from "remax/macro";
import './app.css';
import {siteInfo, userLogin,} from "@/util/wxUtils";

const App: React.FC = props => {
    useAppEvent('onLaunch',()=>{
        siteInfo();
    })

    return props.children as React.ReactElement;
}

export default App;
