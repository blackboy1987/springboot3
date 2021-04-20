import {Ad} from "remax/wechat";
import * as React from "react";

type AdConfig = {
    bannerId?: string;
    gridAdId?: string;
    interstitialAdId?: string;
    nativeAdId?: string;
    rewardedVideoAdId?: string;
    videoAdId?: string;
    videoFrontAdId?: string;
}

type MyAdProps = {
    adConfig:AdConfig;
}

const random = new Date().getTime()%3;

const MyAd:React.FC<MyAdProps> = ({adConfig}) =>{
    return (
        <>
            {
                random === 0 ? (
                    <>
                        {
                            adConfig.bannerId ? (
                                <Ad unitId={adConfig.bannerId} adTheme='black' />
                            ) : null
                        }
                    </>
                ) : null
            }
            {
                random === 1 ? (
                    <>
                        {
                            adConfig.gridAdId ? (
                                <Ad unitId={adConfig.gridAdId} adType='grid' adTheme='black' />
                            ) : null
                        }
                    </>
                ) : null
            }
        </>
    )
}

export default MyAd;
