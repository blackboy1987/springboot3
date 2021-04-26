import {createRewardedVideoAd,createInterstitialAd} from 'remax/wechat';

export const myCreateRewardedVideoAd=(adUnitId:string,callback?:{
    onLoad:()=>void;
    onError:(err:any)=>void;
    onClose:(res: any)=>void;
})=>{
    const rewardedVideoAd = createRewardedVideoAd({
        adUnitId:adUnitId
    });
    if(rewardedVideoAd){
        rewardedVideoAd.onLoad(() => {
            console.log('onLoad event emit');
            if(callback&&callback.onLoad){
                callback.onLoad();
            }
        })
        rewardedVideoAd.onError((err: any) => {
            console.log('onError event emit', err);
            if(callback&&callback.onError){
                callback.onError(err);
            }
        })
        rewardedVideoAd.onClose((res:any) => {
            console.log('onClose event emit', res);
            if(callback&&callback.onClose){
                callback.onClose(res);
            }
        })
    }
    return rewardedVideoAd;
}

export const myCreateInterstitialAd=(adUnitId:string,callback?:{
    onLoad:()=>void;
    onError:(err:any)=>void;
    onClose:(res: any)=>void;
})=>{
    const interstitialAd = createInterstitialAd({
        adUnitId:adUnitId
    });
    if(interstitialAd){
        interstitialAd.onLoad(() => {
            console.log('onLoad event emit');
            if(callback&&callback.onLoad){
                callback.onLoad();
            }
        })
        interstitialAd.onError((err: any) => {
            console.log('onError event emit', err);
            if(callback&&callback.onError){
                callback.onError(err);
            }
        })
        interstitialAd.onClose((res:any) => {
            console.log('onClose event emit', res);
            if(callback&&callback.onClose){
                callback.onClose(res);
            }
        })
    }
    return interstitialAd;
}
