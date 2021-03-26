
export type AdjustType = 'right'|'error'|'sign'

export type AnswerStatus = ''|'card'|'close'|'empty'|'error'|'right'|'cashout'|'cashout_yes'|'get';

export type SystemInfo = {
    SDKVersion: string;
    batteryLevel: number;
    benchmarkLevel: number;
    brand: string;
    deviceOrientation: string;
    devicePixelRatio: number;
    enableDebug: boolean;
    errMsg: string;
    fontSizeSetting: number;
    language: string;
    model: string;
    pixelRatio: number;
    platform: string;
    safeArea:{
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
    };
    screenHeight: number;
    screenWidth: number;
    statusBarHeight: number;
    system: string;
    version: string;
    windowHeight: number;
    windowWidth: number;
}

export type MenuButtonBoundingClientRect={
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
}

export type UserInfo = {
    id: number;
    token: string;
    balance:number;
    amount:number;
    point:number;
    avatarUrl:string;
    rankName:string;
    nickName:string;
    isAuth:string;
    user_id:string;
    level:number;
    reviewRewardedVideoAdCount: number;
    isSign: boolean;
    totalRight:number;
}

export type AdIds = {
    bannerId: string;
    gridAdId: string;
    interstitialAdId: string;
    nativeAdId: string;
    rewardedVideoAdId: string;
    videoAdId: string;
    videoFrontAdId: string;
}

export type SiteConfig = {
    name?:string;
    status: number;
    ads?:{
        duihuan:AdIds;
        game:AdIds;
        help:AdIds;
        index:AdIds;
        jinbi:AdIds;
        more:AdIds;
        rank:AdIds;
    },
    config:{
        levelPoint:number;
        signPoint: number;
        perVideoGold: number;
        inviteButtonText:string;
        inviteText: string;
        // 每天激励视频的个数
        dayRewardedVideoAdCount:number;
        // 两个激励视频之间的间隔
        rewardedVideoAdInterval:number;
        redPackage: string;
    }
}

export type Answer = {
    answer:string;
    isRight:boolean;
}

export type Question = {
    image?: string;
    answers:Answer[];
    title:string;
}