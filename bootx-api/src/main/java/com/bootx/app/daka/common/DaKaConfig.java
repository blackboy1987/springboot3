package com.bootx.app.daka.common;

import com.bootx.entity.BaseEntity;
import com.bootx.util.DateUtils;
import com.fasterxml.jackson.annotation.JsonView;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DaKaConfig {

    /**
     * 每日允许打卡总数
     */
    @JsonView({BaseEntity.ListView.class})
    private Integer clockNum;

    /**
     * 打卡时间规则
     * 9-12-5;6-24-5
     *      说明：1点到5点累计打卡3次，6点到8点累计打开5次
     */
    private String clickRule;

    /**
     * 每次打卡的积分数
     */
    private Long signPoint;

    /**
     * 首页背景图片
     */
    @JsonView({BaseEntity.ListView.class})
    private String homeBgImage;

    /**
     * 默认头像
     */
    @JsonView({BaseEntity.ListView.class})
    private String defaultAvatar;

    /**
     * 微信默认昵称
     */
    @JsonView({BaseEntity.ListView.class})
    private String defaultNickName;

    /**
     * 兑换页背景图（375*240）
     */
    @JsonView({BaseEntity.ListView.class})
    private String bg;

    /**
     * 首页背景图片
     */
    @JsonView({BaseEntity.ListView.class})
    private String resize;

    /**
     * 背景顶部图片
     */
    @JsonView({BaseEntity.ListView.class})
    private String waveTop;

    /**
     * 背景中间动画图片
     */
    @JsonView({BaseEntity.ListView.class})
    private String waveMid;

    /**
     * 背景底部动画图片
     */
    @JsonView({BaseEntity.ListView.class})
    private String waveBot;

    /**
     * 更多图片
     */
    @JsonView({BaseEntity.ListView.class})
    private String more;

    /**
     * 登录图片
     */
    @JsonView({BaseEntity.ListView.class})
    private String loginImage;

    @JsonView({BaseEntity.ListView.class})
    private String currencyName;

    @JsonView({BaseEntity.ListView.class})
    private String currencyIcon;

    @JsonView({BaseEntity.ListView.class})
    private String clickBgColor;

    @JsonView({BaseEntity.ListView.class})
    private String clockText;

    @JsonView({BaseEntity.ListView.class})
    private Integer clockInterval;

    @JsonView({BaseEntity.ListView.class})
    private String rollContentBg;

    @JsonView({BaseEntity.ListView.class})
    private String bdImg;

    @JsonView({BaseEntity.ListView.class})
    private String moreImg;

    @JsonView({BaseEntity.ListView.class})
    private String myBg;

    @JsonView({BaseEntity.ListView.class})
    private String officialAccountImg;

    @JsonView({BaseEntity.ListView.class})
    private List<Rule> rules = new ArrayList<>();

    @JsonView({BaseEntity.ListView.class})
    private String shareText;


    @JsonView({BaseEntity.ListView.class})
    private String shareImage;

    @JsonView({BaseEntity.ListView.class})
    private String posterBg;

    @JsonView({BaseEntity.ListView.class})
    private String qrCode;



    public Integer getClockNum() {
        return clockNum;
    }

    public void setClockNum(Integer clockNum) {
        this.clockNum = clockNum;
    }

    public String getClickRule() {
        return clickRule;
    }

    public void setClickRule(String clickRule) {
        this.clickRule = clickRule;
    }

    public Long getSignPoint() {
        return signPoint;
    }

    public void setSignPoint(Long signPoint) {
        this.signPoint = signPoint;
    }

    public String getHomeBgImage() {
        return homeBgImage;
    }

    public void setHomeBgImage(String homeBgImage) {
        this.homeBgImage = homeBgImage;
    }

    public String getDefaultAvatar() {
        return defaultAvatar;
    }

    public void setDefaultAvatar(String defaultAvatar) {
        this.defaultAvatar = defaultAvatar;
    }

    public String getDefaultNickName() {
        return defaultNickName;
    }

    public void setDefaultNickName(String defaultNickName) {
        this.defaultNickName = defaultNickName;
    }

    public String getBg() {
        return bg;
    }

    public void setBg(String bg) {
        this.bg = bg;
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

    public String getCurrencyIcon() {
        return currencyIcon;
    }

    public void setCurrencyIcon(String currencyIcon) {
        this.currencyIcon = currencyIcon;
    }

    public String getClickBgColor() {
        return clickBgColor;
    }

    public void setClickBgColor(String clickBgColor) {
        this.clickBgColor = clickBgColor;
    }

    public String getClockText() {
        return clockText;
    }

    public void setClockText(String clockText) {
        this.clockText = clockText;
    }

    public Integer getClockInterval() {
        return clockInterval;
    }

    public void setClockInterval(Integer clockInterval) {
        this.clockInterval = clockInterval;
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

    public String getBdImg() {
        return bdImg;
    }

    public void setBdImg(String bdImg) {
        this.bdImg = bdImg;
    }

    public String getMoreImg() {
        return moreImg;
    }

    public void setMoreImg(String moreImg) {
        this.moreImg = moreImg;
    }

    public String getMyBg() {
        return myBg;
    }

    public void setMyBg(String myBg) {
        this.myBg = myBg;
    }

    public String getOfficialAccountImg() {
        return officialAccountImg;
    }

    public void setOfficialAccountImg(String officialAccountImg) {
        this.officialAccountImg = officialAccountImg;
    }

    public String getShareText() {
        return shareText;
    }

    public void setShareText(String shareText) {
        this.shareText = shareText;
    }

    public String getShareImage() {
        return shareImage;
    }

    public void setShareImage(String shareImage) {
        this.shareImage = shareImage;
    }

    public String getPosterBg() {
        return posterBg;
    }

    public void setPosterBg(String posterBg) {
        this.posterBg = posterBg;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public static class Rule {

        @JsonView({BaseEntity.ListView.class})
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
        this.homeBgImage = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/homeBgImage.png";
        this.resize = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/1.jpg?x-oss-process=style/80";
        this.waveTop = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/loginImage.jpg";
        this.waveMid = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/loginImage.jpg";
        this.waveBot = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/loginImage.jpg";
        this.more = "https://cdn-hnymwl.qunyizhan.com/wp-content/uploads/2020/03/1583542505-98c07f052554036.jpg";
        this.loginImage = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/loginImage.jpg";
        this.bdImg = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/1.jpg?x-oss-process=style/60";
        this.moreImg="https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/more.png";
        this.myBg="https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/my_bg.png";
        this.defaultAvatar="https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/defaultAvatar.png";
        this.defaultNickName="大鼻孔";
        this.officialAccountImg = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/2020-08-12%20122424.jpg";
        this.bg = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/2020-08-20%20065514.jpg?x-oss-process=style/375_240";
        this.currencyName = "金豆";
        this.currencyIcon = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/xin.png";
        this.clickBgColor = "green";
        this.clockText = "立即打卡";
        this.clockInterval = 60;
        this.signPoint=10L;
        this.clickRule = "9-12-5;20-24-5";
        List<Rule> rules = new ArrayList<>();
        rules.add(new Rule("每日打开签到 上午9点打5次，下午6点打卡5次，记录自律的自己"));
        rules.add(new Rule("页面的视频广告点击进去转到下载页面再出来，有机会获取双倍奖励。如果打卡提示激励视频加载失败，就退出来过一会再进来打开"));
        this.rules = rules;
        this.rollContentBg = "#FFFFFF";
        this.shareImage="https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/homeBgImage.png";
        this.shareText="今天早起打卡，又能分到奖励了呢!";
        this.posterBg = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/posterBg.png";
        this.qrCode = "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/qrCode.jpg";
    }

    public static List<ClickRule> getClickRules(String clickRule){
        Date now = DateUtils.getBeginDay(new Date());
        List<ClickRule> list = new ArrayList<>();
        if(StringUtils.isBlank(clickRule)){
            clickRule = new DaKaConfig().getClickRule();
        }
        // "9-12-5;12-24-5"
        String[] strs = clickRule.split(";");
        for (String str:strs) {
            String[] split = str.split("-");
            if(split.length==3){
                ClickRule clickRule1 = new ClickRule();
                clickRule1.setBeginDate(DateUtils.getNextHours(now,Integer.parseInt(split[0])));
                clickRule1.setEndDate(DateUtils.getNextHours(now,Integer.parseInt(split[1])));
                clickRule1.setCount(Integer.parseInt(split[2]));
                clickRule1.setCount(Integer.parseInt(split[2]));
                list.add(clickRule1);
            }
        }
        return list;
    }

    public static ClickRule getCurrentClickRule(List<ClickRule> clickRules,Date date) {
        if(clickRules==null|| clickRules.isEmpty()||date==null){
            return null;
        }
        for (ClickRule clickRule:clickRules) {
            if(clickRule.exist(date)){
                return clickRule;
            }
        }
        return null;
    }

    public static ClickRule getCurrentClickRule(List<ClickRule> clickRules) {
        return getCurrentClickRule(clickRules,new Date());
    }

    public static ClickRule getCurrentClickRule(String clickRule) {
        List<ClickRule> clickRules = getClickRules(clickRule);
        return getCurrentClickRule(clickRules,new Date());
    }



    public static class ClickRule implements Serializable {

        private Date beginDate;

        private Date endDate;

        private Integer count;

        public Date getBeginDate() {
            return beginDate;
        }

        public void setBeginDate(Date beginDate) {
            this.beginDate = beginDate;
        }

        public Date getEndDate() {
            return endDate;
        }

        public void setEndDate(Date endDate) {
            this.endDate = endDate;
        }

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }

        public boolean exist(Date now){
            return now.compareTo(beginDate)>=0&&now.compareTo(endDate)<=0;
        }
    }


}
