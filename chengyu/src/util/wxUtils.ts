import {MenuButtonBoundingClientRect, SystemInfo} from "@/data";
import {
    request,
    showLoading,
    showToast,
    hideLoading,
    login,
    createInterstitialAd,
    createRewardedVideoAd
} from 'remax/wechat';
import {constants} from "@/util/constants";

/**
 * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
 */
export const getMenuButtonBoundingClientRect = (): MenuButtonBoundingClientRect =>{
    return wx.getMenuButtonBoundingClientRect();
}

export const getSystemInfo = (): SystemInfo =>{
    return wx.getSystemInfoSync();
}

export const getStorage = (key: string) =>{
    if(!key){
        return null;
    }
    return wx.getStorageSync(key);
}

export const setStorage = (key: string, value: any) =>{
   wx.setStorageSync(key,value);
}

export const themeMode=() =>{
    const themeMode = getStorage("themeMode");
    if(themeMode){
        return themeMode;
    }
    return "white";
}

export const post = (url:string,data:{[key:string]:any},callback:(response:any)=>void) =>{
    request({
        url:url.indexOf('http')===0?url:constants.baseUrl+url,
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token":getStorage("token"),
            "appCode":constants.appCode,
            "appToken":constants.appToken,
        },
        data,
        method: 'POST',
    }).then((response)=>{
        if(response.statusCode>=200&&response.statusCode<300){
            const {data} = response;
            if(data.code===0){
                callback&&callback(data.data);
            }else{
                showToast({
                    title: data.msg,
                    icon: 'none',
                    duration: 5000,
                    mask: true
                }).then();
            }
        }else {
            showToast({
                title: data.msg,
                icon: 'none',
                duration: 5000,
                mask: true
            }).then();
        }

    }).catch((err)=>{
    })
}

export const userLogin=(callback?:(res:any)=>void )=>{
    login().then(res=>{
        if(res.code){
            post("login",{code:res.code},data=>{
                if(callback){
                    callback(data);
                }
                if(data.userInfo){
                    setStorage('reviewRewardedVideoAdCount',data.userInfo.reviewRewardedVideoAdCount||0)
                    setStorage("userInfo",data.userInfo);
                }
                if(data.token){
                    setStorage('token',data.token);
                }
            })
        }
    })
}

export const getUserInfo=(callback?:(res:any)=>void)=>{
    post("userInfo",{},data=>{
        if(callback){
            callback(data);
        }
        if(data){
            setStorage('reviewRewardedVideoAdCount',data.reviewRewardedVideoAdCount||0)
            setStorage("userInfo",data);
        }
    })
}

export const siteInfo=(callback?:(res:any)=>void )=>{
    post("site",{},data=>{
        setStorage("siteInfo",data);
        if(callback){
            callback(data);
        }
    })
}

let rewardedVideoAd: WechatMiniprogram.RewardedVideoAd;
let interstitialAd: WechatMiniprogram.InterstitialAd;


export const interstitialAdCreate1 = (adUnitId:string,callback:{
    onLoad?:()=>void;
    onClose?:(e)=>void;
    onError?:(e)=>void;
}):WechatMiniprogram.InterstitialAd =>{
    interstitialAd = createInterstitialAd({
        adUnitId,
    });
    interstitialAd.onLoad((e)=>{
        callback.onLoad&&callback.onLoad();
    });
    interstitialAd.onClose((e)=>{
        callback.onClose&&callback.onClose(e);
    });
    interstitialAd.onError((e)=>{
        callback.onError&&callback.onError(e);
    });
    return interstitialAd;
}



/**
 * 创建激励视频广告
 * @param adUnitId
 */
export const rewardedVideoAdCreate1 = (adUnitId:string,callback:{
    onLoad?:()=>void;
    onClose?:({isEnded}:{isEnded:boolean})=>void;
    onError?:(e)=>void;
}):WechatMiniprogram.RewardedVideoAd =>{
    rewardedVideoAd = createRewardedVideoAd({
        adUnitId,
    });
    rewardedVideoAd.onLoad((e)=>{
        callback.onLoad&&callback.onLoad(e);
    });
    rewardedVideoAd.onClose((e)=>{
        callback.onClose&&callback.onClose(e);
    });
    rewardedVideoAd.onError((e)=>{
        callback.onError&&callback.onError(e);
    });

    return rewardedVideoAd;
}

/**
 * 激励视频广告的显示
 * @param rewardedVideoAd
 */
export const rewardedVideoAdShow1=(rewardedVideoAd:WechatMiniprogram.RewardedVideoAd)=>{
    if(rewardedVideoAd){
        rewardedVideoAd.show().catch(() => {
            rewardedVideoAd.load()
                .then(() => rewardedVideoAd.show())
                .catch(err => {
                    console.log('激励视频 广告显示失败',err)
                })
        })
    }
}