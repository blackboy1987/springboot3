import * as React from 'react';
import {useAppEvent} from 'remax/macro';
import './app.css';
import {setStorage, siteInfo} from "@/util/wxUtils";

const App: React.FC = props => {

    useAppEvent('onLaunch',()=>{
        siteInfo(data=>setStorage('siteInfo',data))
    })

    return props.children as React.ReactElement;
};

export default App;
