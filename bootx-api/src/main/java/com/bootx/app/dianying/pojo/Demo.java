package com.bootx.app.dianying.pojo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;


public class Demo {

    @JsonProperty("Code")
    private Integer Code;
    @JsonProperty("Data")
    private DataDTO data;
    @JsonProperty("msg")
    private String msg;

    public Integer getCode() {
        return Code;
    }

    public void setCode(Integer code) {
        Code = code;
    }

    public DataDTO getData() {
        return data;
    }

    public void setData(DataDTO data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public static class DataDTO {
        @JsonProperty("app")
        private String app;
        @JsonProperty("info")
        private String info;
        @JsonProperty("admin")
        private String admin;
        @JsonProperty("site")
        private SiteDTO site;
        @JsonProperty("index")
        private IndexDTO index;
        @JsonProperty("detail")
        private DetailDTO detail;
        @JsonProperty("feilei")
        private FeileiDTO feilei;
        @JsonProperty("topic")
        private TopicDTO topic;
        @JsonProperty("play")
        private PlayDTO play;
        @JsonProperty("wode")
        private WodeDTO wode;
        @JsonProperty("other")
        private OtherDTO other;
        @JsonProperty("wxverify")
        private Boolean wxverify;
        @JsonProperty("check")
        private String check;

        public String getApp() {
            return app;
        }

        public void setApp(String app) {
            this.app = app;
        }

        public String getInfo() {
            return info;
        }

        public void setInfo(String info) {
            this.info = info;
        }

        public String getAdmin() {
            return admin;
        }

        public void setAdmin(String admin) {
            this.admin = admin;
        }

        public SiteDTO getSite() {
            return site;
        }

        public void setSite(SiteDTO site) {
            this.site = site;
        }

        public IndexDTO getIndex() {
            return index;
        }

        public void setIndex(IndexDTO index) {
            this.index = index;
        }

        public DetailDTO getDetail() {
            return detail;
        }

        public void setDetail(DetailDTO detail) {
            this.detail = detail;
        }

        public FeileiDTO getFeilei() {
            return feilei;
        }

        public void setFeilei(FeileiDTO feilei) {
            this.feilei = feilei;
        }

        public TopicDTO getTopic() {
            return topic;
        }

        public void setTopic(TopicDTO topic) {
            this.topic = topic;
        }

        public PlayDTO getPlay() {
            return play;
        }

        public void setPlay(PlayDTO play) {
            this.play = play;
        }

        public WodeDTO getWode() {
            return wode;
        }

        public void setWode(WodeDTO wode) {
            this.wode = wode;
        }

        public OtherDTO getOther() {
            return other;
        }

        public void setOther(OtherDTO other) {
            this.other = other;
        }

        public Boolean getWxverify() {
            return wxverify;
        }

        public void setWxverify(Boolean wxverify) {
            this.wxverify = wxverify;
        }

        public String getCheck() {
            return check;
        }

        public void setCheck(String check) {
            this.check = check;
        }

        public static class SiteDTO {
            @JsonProperty("message")
            private MessageDTO message;
            @JsonProperty("sharepic")
            private String sharepic;
            @JsonProperty("kefu")
            private KefuDTO kefu;
            @JsonProperty("share")
            private ShareDTO share;
            @JsonProperty("platform")
            private String platform;
            @JsonProperty("ip")
            private IpDTO ip;
            @JsonProperty("login")
            private LoginDTO login;

            public MessageDTO getMessage() {
                return message;
            }

            public void setMessage(MessageDTO message) {
                this.message = message;
            }

            public String getSharepic() {
                return sharepic;
            }

            public void setSharepic(String sharepic) {
                this.sharepic = sharepic;
            }

            public KefuDTO getKefu() {
                return kefu;
            }

            public void setKefu(KefuDTO kefu) {
                this.kefu = kefu;
            }

            public ShareDTO getShare() {
                return share;
            }

            public void setShare(ShareDTO share) {
                this.share = share;
            }

            public String getPlatform() {
                return platform;
            }

            public void setPlatform(String platform) {
                this.platform = platform;
            }

            public IpDTO getIp() {
                return ip;
            }

            public void setIp(IpDTO ip) {
                this.ip = ip;
            }

            public LoginDTO getLogin() {
                return login;
            }

            public void setLogin(LoginDTO login) {
                this.login = login;
            }

            public static class MessageDTO {
                @JsonProperty("radio")
                private String radio;
                @JsonProperty("tmpIds")
                private String tmpIds;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }

                public String getTmpIds() {
                    return tmpIds;
                }

                public void setTmpIds(String tmpIds) {
                    this.tmpIds = tmpIds;
                }
            }

            public static class KefuDTO {
                @JsonProperty("type")
                private String type;
                @JsonProperty("url")
                private String url;

                public String getType() {
                    return type;
                }

                public void setType(String type) {
                    this.type = type;
                }

                public String getUrl() {
                    return url;
                }

                public void setUrl(String url) {
                    this.url = url;
                }
            }

            public static class ShareDTO {
                @JsonProperty("type")
                private String type;
                @JsonProperty("wxText")
                private String wxText;

                public String getType() {
                    return type;
                }

                public void setType(String type) {
                    this.type = type;
                }

                public String getWxText() {
                    return wxText;
                }

                public void setWxText(String wxText) {
                    this.wxText = wxText;
                }
            }

            public static class IpDTO {
                @JsonProperty("radio")
                private String radio;
                @JsonProperty("text")
                private String text;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }

                public String getText() {
                    return text;
                }

                public void setText(String text) {
                    this.text = text;
                }
            }

            public static class LoginDTO {
                @JsonProperty("radio")
                private String radio;
                @JsonProperty("num")
                private String num;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }

                public String getNum() {
                    return num;
                }

                public void setNum(String num) {
                    this.num = num;
                }
            }
        }

        public static class IndexDTO {
            @JsonProperty("wxAdId")
            private WxAdIdDTO wxAdId;
            @JsonProperty("tanchuang")
            private TanchuangDTO tanchuang;
            @JsonProperty("share")
            private ShareDTO share;
            @JsonProperty("notice")
            private String notice;
            @JsonProperty("more")
            private String more;

            public WxAdIdDTO getWxAdId() {
                return wxAdId;
            }

            public void setWxAdId(WxAdIdDTO wxAdId) {
                this.wxAdId = wxAdId;
            }

            public TanchuangDTO getTanchuang() {
                return tanchuang;
            }

            public void setTanchuang(TanchuangDTO tanchuang) {
                this.tanchuang = tanchuang;
            }

            public ShareDTO getShare() {
                return share;
            }

            public void setShare(ShareDTO share) {
                this.share = share;
            }

            public String getNotice() {
                return notice;
            }

            public void setNotice(String notice) {
                this.notice = notice;
            }

            public String getMore() {
                return more;
            }

            public void setMore(String more) {
                this.more = more;
            }

            public static class WxAdIdDTO {
                @JsonProperty("cpId")
                private String cpId;
                @JsonProperty("ysId")
                private String ysId;

                public String getCpId() {
                    return cpId;
                }

                public void setCpId(String cpId) {
                    this.cpId = cpId;
                }

                public String getYsId() {
                    return ysId;
                }

                public void setYsId(String ysId) {
                    this.ysId = ysId;
                }
            }

            public static class TanchuangDTO {
                @JsonProperty("radio")
                private String radio;
                @JsonProperty("type")
                private String type;
                @JsonProperty("image")
                private String image;
                @JsonProperty("url")
                private String url;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }

                public String getType() {
                    return type;
                }

                public void setType(String type) {
                    this.type = type;
                }

                public String getImage() {
                    return image;
                }

                public void setImage(String image) {
                    this.image = image;
                }

                public String getUrl() {
                    return url;
                }

                public void setUrl(String url) {
                    this.url = url;
                }
            }

            public static class ShareDTO {
                @JsonProperty("title")
                private String title;
                @JsonProperty("image")
                private String image;

                public String getTitle() {
                    return title;
                }

                public void setTitle(String title) {
                    this.title = title;
                }

                public String getImage() {
                    return image;
                }

                public void setImage(String image) {
                    this.image = image;
                }
            }
        }

        public static class DetailDTO {
            @JsonProperty("play")
            private PlayDTO play;
            @JsonProperty("douban")
            private String douban;
            @JsonProperty("dbUpdate")
            private String dbUpdate;
            @JsonProperty("dbStills")
            private String dbStills;
            @JsonProperty("gg")
            private GgDTO gg;
            @JsonProperty("wxAdId")
            private WxAdIdDTO wxAdId;
            @JsonProperty("adMsg")
            private AdMsgDTO adMsg;

            public PlayDTO getPlay() {
                return play;
            }

            public void setPlay(PlayDTO play) {
                this.play = play;
            }

            public String getDouban() {
                return douban;
            }

            public void setDouban(String douban) {
                this.douban = douban;
            }

            public String getDbUpdate() {
                return dbUpdate;
            }

            public void setDbUpdate(String dbUpdate) {
                this.dbUpdate = dbUpdate;
            }

            public String getDbStills() {
                return dbStills;
            }

            public void setDbStills(String dbStills) {
                this.dbStills = dbStills;
            }

            public GgDTO getGg() {
                return gg;
            }

            public void setGg(GgDTO gg) {
                this.gg = gg;
            }

            public WxAdIdDTO getWxAdId() {
                return wxAdId;
            }

            public void setWxAdId(WxAdIdDTO wxAdId) {
                this.wxAdId = wxAdId;
            }

            public AdMsgDTO getAdMsg() {
                return adMsg;
            }

            public void setAdMsg(AdMsgDTO adMsg) {
                this.adMsg = adMsg;
            }

            public static class PlayDTO {
                @JsonProperty("radio")
                private String radio;
                @JsonProperty("APPID")
                private String appid;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }

                public String getAppid() {
                    return appid;
                }

                public void setAppid(String appid) {
                    this.appid = appid;
                }
            }

            public static class GgDTO {
                @JsonProperty("radio")
                private String radio;
                @JsonProperty("type")
                private String type;
                @JsonProperty("image")
                private String image;
                @JsonProperty("url")
                private String url;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }

                public String getType() {
                    return type;
                }

                public void setType(String type) {
                    this.type = type;
                }

                public String getImage() {
                    return image;
                }

                public void setImage(String image) {
                    this.image = image;
                }

                public String getUrl() {
                    return url;
                }

                public void setUrl(String url) {
                    this.url = url;
                }
            }

            public static class WxAdIdDTO {
                @JsonProperty("cpId")
                private String cpId;
                @JsonProperty("ysId")
                private String ysId;
                @JsonProperty("jlspId")
                private String jlspId;

                public String getCpId() {
                    return cpId;
                }

                public void setCpId(String cpId) {
                    this.cpId = cpId;
                }

                public String getYsId() {
                    return ysId;
                }

                public void setYsId(String ysId) {
                    this.ysId = ysId;
                }

                public String getJlspId() {
                    return jlspId;
                }

                public void setJlspId(String jlspId) {
                    this.jlspId = jlspId;
                }
            }

            public static class AdMsgDTO {
                @JsonProperty("start")
                private String start;
                @JsonProperty("close")
                private String close;

                public String getStart() {
                    return start;
                }

                public void setStart(String start) {
                    this.start = start;
                }

                public String getClose() {
                    return close;
                }

                public void setClose(String close) {
                    this.close = close;
                }
            }
        }

        public static class FeileiDTO {

            @JsonProperty("wxAdId")
            private WxAdIdDTO wxAdId;
            @JsonProperty("type_class")
            private String typeClass;

            public WxAdIdDTO getWxAdId() {
                return wxAdId;
            }

            public void setWxAdId(WxAdIdDTO wxAdId) {
                this.wxAdId = wxAdId;
            }

            public String getTypeClass() {
                return typeClass;
            }

            public void setTypeClass(String typeClass) {
                this.typeClass = typeClass;
            }

            public static class WxAdIdDTO {
                @JsonProperty("ysId")
                private String ysId;
                @JsonProperty("cpId")
                private String cpId;

                public String getYsId() {
                    return ysId;
                }

                public void setYsId(String ysId) {
                    this.ysId = ysId;
                }

                public String getCpId() {
                    return cpId;
                }

                public void setCpId(String cpId) {
                    this.cpId = cpId;
                }
            }
        }

        public static class TopicDTO {
            /**
             * wxAdId : {"ysId":"adunit-e9211ec2715058f8","cpId":"adunit-480cbd6aaa7ff814"}
             * tags :
             */

            @JsonProperty("wxAdId")
            private WxAdIdDTO wxAdId;
            @JsonProperty("tags")
            private String tags;

            public WxAdIdDTO getWxAdId() {
                return wxAdId;
            }

            public void setWxAdId(WxAdIdDTO wxAdId) {
                this.wxAdId = wxAdId;
            }

            public String getTags() {
                return tags;
            }

            public void setTags(String tags) {
                this.tags = tags;
            }

            public static class WxAdIdDTO {
                @JsonProperty("ysId")
                private String ysId;
                @JsonProperty("cpId")
                private String cpId;

                public String getYsId() {
                    return ysId;
                }

                public void setYsId(String ysId) {
                    this.ysId = ysId;
                }

                public String getCpId() {
                    return cpId;
                }

                public void setCpId(String cpId) {
                    this.cpId = cpId;
                }
            }
        }

        public static class PlayDTO {

            @JsonProperty("isPoints")
            private String isPoints;
            @JsonProperty("enforce")
            private String enforce;
            @JsonProperty("second")
            private String second;
            @JsonProperty("num")
            private String num;
            @JsonProperty("interval")
            private Integer interval;
            @JsonProperty("adMsg")
            private AdMsgDTO adMsg;
            @JsonProperty("gg")
            private GgDTO gg;
            @JsonProperty("wxAdId")
            private WxAdIdDTO wxAdId;
            @JsonProperty("vodPlayer")
            private VodPlayerDTO vodPlayer;

            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty("danmuList")
            private List<DanMu> danmuList = new ArrayList();

            public String getIsPoints() {
                return isPoints;
            }

            public void setIsPoints(String isPoints) {
                this.isPoints = isPoints;
            }

            public String getEnforce() {
                return enforce;
            }

            public void setEnforce(String enforce) {
                this.enforce = enforce;
            }

            public String getSecond() {
                return second;
            }

            public void setSecond(String second) {
                this.second = second;
            }

            public String getNum() {
                return num;
            }

            public void setNum(String num) {
                this.num = num;
            }

            public Integer getInterval() {
                return interval;
            }

            public void setInterval(Integer interval) {
                this.interval = interval;
            }

            public AdMsgDTO getAdMsg() {
                return adMsg;
            }

            public void setAdMsg(AdMsgDTO adMsg) {
                this.adMsg = adMsg;
            }

            public GgDTO getGg() {
                return gg;
            }

            public void setGg(GgDTO gg) {
                this.gg = gg;
            }

            public WxAdIdDTO getWxAdId() {
                return wxAdId;
            }

            public void setWxAdId(WxAdIdDTO wxAdId) {
                this.wxAdId = wxAdId;
            }

            public VodPlayerDTO getVodPlayer() {
                return vodPlayer;
            }

            public void setVodPlayer(VodPlayerDTO vodPlayer) {
                this.vodPlayer = vodPlayer;
            }

            public List<DanMu> getDanmuList() {
                return danmuList;
            }

            public void setDanmuList(List<DanMu> danmuList) {
                this.danmuList = danmuList;
            }

            public static class AdMsgDTO {
                /**
                 * start :
                 * close :
                 */

                @JsonProperty("start")
                private String start;
                @JsonProperty("close")
                private String close;

                public String getStart() {
                    return start;
                }

                public void setStart(String start) {
                    this.start = start;
                }

                public String getClose() {
                    return close;
                }

                public void setClose(String close) {
                    this.close = close;
                }
            }

            public static class GgDTO {
                @JsonProperty("radio")
                private String radio;
                @JsonProperty("type")
                private String type;
                @JsonProperty("image")
                private String image;
                @JsonProperty("url")
                private String url;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }

                public String getType() {
                    return type;
                }

                public void setType(String type) {
                    this.type = type;
                }

                public String getImage() {
                    return image;
                }

                public void setImage(String image) {
                    this.image = image;
                }

                public String getUrl() {
                    return url;
                }

                public void setUrl(String url) {
                    this.url = url;
                }
            }

            public static class WxAdIdDTO {
                @JsonProperty("jlspId")
                private String jlspId;
                @JsonProperty("cpId")
                private String cpId;
                @JsonProperty("spqtId")
                private String spqtId;
                @JsonProperty("ysId")
                private String ysId;

                public String getJlspId() {
                    return jlspId;
                }

                public void setJlspId(String jlspId) {
                    this.jlspId = jlspId;
                }

                public String getCpId() {
                    return cpId;
                }

                public void setCpId(String cpId) {
                    this.cpId = cpId;
                }

                public String getSpqtId() {
                    return spqtId;
                }

                public void setSpqtId(String spqtId) {
                    this.spqtId = spqtId;
                }

                public String getYsId() {
                    return ysId;
                }

                public void setYsId(String ysId) {
                    this.ysId = ysId;
                }
            }

            public static class VodPlayerDTO {
                @JsonProperty("id")
                private List<String> id;
                @JsonProperty("title")
                private List<String> title;

                public List<String> getId() {
                    return id;
                }

                public void setId(List<String> id) {
                    this.id = id;
                }

                public List<String> getTitle() {
                    return title;
                }

                public void setTitle(List<String> title) {
                    this.title = title;
                }
            }

            public static class DanMu {
                private String text;
                private String color;
                private Integer time;

                public String getText() {
                    return text;
                }

                public void setText(String text) {
                    this.text = text;
                }

                public String getColor() {
                    return color;
                }

                public void setColor(String color) {
                    this.color = color;
                }

                public Integer getTime() {
                    return time;
                }

                public void setTime(Integer time) {
                    this.time = time;
                }
            }
        }

        public static class WodeDTO {
            @JsonProperty("gg")
            private GgDTO gg;
            @JsonProperty("statement")
            private String statement;
            @JsonProperty("wxAdId")
            private WxAdIdDTO wxAdId;
            @JsonProperty("more")
            private MoreDTO more;

            public GgDTO getGg() {
                return gg;
            }

            public void setGg(GgDTO gg) {
                this.gg = gg;
            }

            public String getStatement() {
                return statement;
            }

            public void setStatement(String statement) {
                this.statement = statement;
            }

            public WxAdIdDTO getWxAdId() {
                return wxAdId;
            }

            public void setWxAdId(WxAdIdDTO wxAdId) {
                this.wxAdId = wxAdId;
            }

            public MoreDTO getMore() {
                return more;
            }

            public void setMore(MoreDTO more) {
                this.more = more;
            }

            public static class GgDTO {
                @JsonProperty("radio")
                private String radio;
                @JsonProperty("type")
                private String type;
                @JsonProperty("image")
                private String image;
                @JsonProperty("url")
                private String url;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }

                public String getType() {
                    return type;
                }

                public void setType(String type) {
                    this.type = type;
                }

                public String getImage() {
                    return image;
                }

                public void setImage(String image) {
                    this.image = image;
                }

                public String getUrl() {
                    return url;
                }

                public void setUrl(String url) {
                    this.url = url;
                }
            }

            public static class WxAdIdDTO {
                @JsonProperty("ysId")
                private String ysId;

                public String getYsId() {
                    return ysId;
                }

                public void setYsId(String ysId) {
                    this.ysId = ysId;
                }
            }

            public static class MoreDTO {
                @JsonProperty("radio")
                private String radio;

                public String getRadio() {
                    return radio;
                }

                public void setRadio(String radio) {
                    this.radio = radio;
                }
            }
        }

        public static class OtherDTO {

            @JsonProperty("wxAdId")
            private WxAdIdDTO wxAdId;

            public WxAdIdDTO getWxAdId() {
                return wxAdId;
            }

            public void setWxAdId(WxAdIdDTO wxAdId) {
                this.wxAdId = wxAdId;
            }

            public static class WxAdIdDTO {

                @JsonProperty("cpId")
                private String cpId;
                @JsonProperty("ysId")
                private String ysId;

                public String getCpId() {
                    return cpId;
                }

                public void setCpId(String cpId) {
                    this.cpId = cpId;
                }

                public String getYsId() {
                    return ysId;
                }

                public void setYsId(String ysId) {
                    this.ysId = ysId;
                }
            }
        }
    }
}
