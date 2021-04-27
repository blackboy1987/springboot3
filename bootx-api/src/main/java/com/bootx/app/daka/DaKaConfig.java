package com.bootx.app.daka;

import java.util.ArrayList;
import java.util.List;

public class DaKaConfig {

    /**
     * 每日允许打卡总数
     */
    private Integer clockNum;

    /**
     * 首页背景图片
     */
    private String homeBgImage;

    /**
     * 首页背景图片
     */
    private String resize;

    /**
     * 背景顶部图片
     */
    private String waveTop;

    /**
     * 背景中间动画图片
     */
    private String waveMid;

    /**
     * 背景底部动画图片
     */
    private String waveBot;

    /**
     * 更多图片
     */
    private String more;

    /**
     * 登录图片
     */
    private String loginImage;

    private String currencyName;

    private String clickBgColor;

    private String rollContentBg;


    private List<Rule> rules = new ArrayList<>();


    public Integer getClockNum() {
        return clockNum;
    }

    public void setClockNum(Integer clockNum) {
        this.clockNum = clockNum;
    }

    public String getHomeBgImage() {
        return homeBgImage;
    }

    public void setHomeBgImage(String homeBgImage) {
        this.homeBgImage = homeBgImage;
    }

    public String getResize() {
        return resize;
    }

    public void setResize(String resize) {
        this.resize = resize;
    }

    public String getWaveTop() {
        return waveTop;
    }

    public void setWaveTop(String waveTop) {
        this.waveTop = waveTop;
    }

    public String getWaveMid() {
        return waveMid;
    }

    public void setWaveMid(String waveMid) {
        this.waveMid = waveMid;
    }

    public String getWaveBot() {
        return waveBot;
    }

    public void setWaveBot(String waveBot) {
        this.waveBot = waveBot;
    }

    public String getMore() {
        return more;
    }

    public void setMore(String more) {
        this.more = more;
    }

    public String getLoginImage() {
        return loginImage;
    }

    public void setLoginImage(String loginImage) {
        this.loginImage = loginImage;
    }

    public String getCurrencyName() {
        return currencyName;
    }

    public void setCurrencyName(String currencyName) {
        this.currencyName = currencyName;
    }

    public String getClickBgColor() {
        return clickBgColor;
    }

    public void setClickBgColor(String clickBgColor) {
        this.clickBgColor = clickBgColor;
    }

    public List<Rule> getRules() {
        return rules;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }

    public String getRollContentBg() {
        return rollContentBg;
    }

    public void setRollContentBg(String rollContentBg) {
        this.rollContentBg = rollContentBg;
    }

    public static class Rule {

        private String content;


        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public Rule(String content) {
            this.content = content;
        }

        public Rule() {
        }
    }

    public DaKaConfig() {
        this.clockNum = 15;
        this.homeBgImage = "https://cdn-hnymwl.qunyizhan.com/wp-content/uploads/2020/03/1583542505-98c07f052554036.jpg";
        this.resize = "https://cdn-hnymwl.qunyizhan.com/wp-content/uploads/2020/03/1583542505-98c07f052554036.jpg";
        this.waveTop = "https://cdn-hnymwl.qunyizhan.com/wp-content/uploads/2020/03/1583542505-98c07f052554036.jpg";
        this.waveMid = "https://cdn-hnymwl.qunyizhan.com/wp-content/uploads/2020/03/1583542505-98c07f052554036.jpg";
        this.waveBot = "https://cdn-hnymwl.qunyizhan.com/wp-content/uploads/2020/03/1583542505-98c07f052554036.jpg";
        this.more = "https://cdn-hnymwl.qunyizhan.com/wp-content/uploads/2020/03/1583542505-98c07f052554036.jpg";
        this.loginImage = "https://cdn-hnymwl.qunyizhan.com/wp-content/uploads/2020/03/1583542505-98c07f052554036.jpg";
        this.currencyName = "金豆";
        this.clickBgColor = "green";
        List<Rule> rules = new ArrayList<>();
        rules.add(new Rule("每日打开签到 上午9点打5次，下午6点打卡5次，记录自律的自己"));
        rules.add(new Rule("页面的视频广告点击进去转到下载页面再出来，有机会获取双倍奖励。如果打卡提示激励视频加载失败，就退出来过一会再进来打开"));
        this.rules = rules;
        this.rollContentBg = "#FFFFFF";
    }
}
