package com.bootx.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AdConfig implements Serializable {

    /**
     * Banner 广告
     */
    private String bannerId;

    /**
     * 激励视频广告
     */
    private String rewardedVideoAdId;

    /**
     * 插屏广告
     */
    private String interstitialAdId;

    /**
     * 视频广告
     */
    private String videoAdId;

    /**
     * 视频前贴广告(视频贴片广告)
     */
    private String videoFrontAdId;

    /**
     * 格子广告
     */
    private String gridAdId;

    /**
     * 原生模板广告
     */
    private String nativeAdId;

    public String getBannerId() {
        return bannerId;
    }

    public void setBannerId(String bannerId) {
        this.bannerId = bannerId;
    }

    public String getRewardedVideoAdId() {
        return rewardedVideoAdId;
    }

    public void setRewardedVideoAdId(String rewardedVideoAdId) {
        this.rewardedVideoAdId = rewardedVideoAdId;
    }

    /**
     * bannerId: "adunit-090ca0df5b0c4b32"
     * gridAdId: "adunit-f26ade6249502c6a"
     * interstitialAdId: "adunit-bd3d4cbec78fdf97"
     * nativeAdId: "adunit-e93eada4f72d2341"
     * rewardedVideoAdId: "adunit-371bd79d00078a90"
     * videoAdId: "adunit-33c30621be64ff71"
     * videoFrontAdId: "adunit-ef4637cc787de087"
     * @return
     */

    public String getInterstitialAdId() {
        return interstitialAdId;
    }

    public void setInterstitialAdId(String interstitialAdId) {
        this.interstitialAdId = interstitialAdId;
    }

    public String getVideoAdId() {
        return videoAdId;
    }

    public void setVideoAdId(String videoAdId) {
        this.videoAdId = videoAdId;
    }

    public String getVideoFrontAdId() {
        return videoFrontAdId;
    }

    public void setVideoFrontAdId(String videoFrontAdId) {
        this.videoFrontAdId = videoFrontAdId;
    }

    public String getGridAdId() {
        return gridAdId;
    }

    public void setGridAdId(String gridAdId) {
        this.gridAdId = gridAdId;
    }

    public String getNativeAdId() {
        return nativeAdId;
    }

    public void setNativeAdId(String nativeAdId) {
        this.nativeAdId = nativeAdId;
    }
}