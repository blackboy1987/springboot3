import * as React from 'react';
import { Ad } from 'remax/wechat';
import './index.css';

type MyAdProps = {
    ads:{
        bannerId?: string;
        gridAdId?: string;
        interstitialAdId?: string;
        nativeAdId?: string;
        rewardedVideoAdId?: string;
        videoAdId?: string;
        videoFrontAdId?: string;
    },
    type?: 'grid' | 'banner'| 'video',
}
const time = new Date().getTime();

const MyAd:React.FC<MyAdProps> = ({ads,type}) => {

    return (
      <>
          {
              type ? (
                  <>
                      {
                          ads.bannerId&&type==='banner' ? (<Ad unitId={ads.bannerId} />) : null
                      }
                      {
                          ads.gridAdId&&type==='grid' ? (<Ad unitId={ads.gridAdId} adType='grid' />) : null
                      }
                      {
                          ads.videoAdId&&type==='video' ? (<Ad unitId={ads.videoAdId} adType='video' />) : null
                      }
                  </>
              ) : (
                  <>
                      {
                          ads.bannerId&&time%3===0 ? (<Ad unitId={ads.bannerId} />) : null
                      }
                      {
                          ads.gridAdId&&time%3===1 ? (<Ad unitId={ads.gridAdId} adType='grid' />) : null
                      }
                      {
                          ads.videoAdId&&time%3===2 ? (<Ad unitId={ads.videoAdId} adType='video' />) : null
                      }
                  </>
              )
          }

      </>
  );
};
export default MyAd;
