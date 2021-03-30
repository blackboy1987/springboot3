package com.bootx.util.novel;

import com.bootx.entity.Novel;
import com.bootx.entity.NovelItem;
import com.bootx.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * https://www.tingchina.com/yousheng/
 */
public final class TingChina {

    public static final Map<String,String> map = new HashMap<>();

    static {
        map.put("有声小说","https://www.tingchina.com/yousheng/");
       /* map.put("相声","https://www.tingchina.com/xiangsheng/");
        map.put("评书","https://www.tingchina.com/pingshu/");
        map.put("戏曲","https://www.tingchina.com/xiqu/");
        map.put("儿歌","https://www.tingchina.com/erge/");
        map.put("人文","https://www.tingchina.com/jiaoyu/");
        map.put("笑话","https://www.tingchina.com/xiaohua/");*/
    }



    private static final String prefixUrl="https://www.tingchina.com/";

    private static final String mp3PrefixUrl="https://t3344.tingchina.com";

    public static Novel detail(Long id) throws IOException {
        String prefixUrl1=prefixUrl;
        Element main03 = null;
        String url = null;
        for (String key:map.keySet()) {
            url=map.get(key)+"disp_" + id + ".htm";
            try {
                Document parse = Jsoup.parse(new URL(url).openStream(), "GBK", url);
                main03 = parse.getElementsByClass("main03").first();
                prefixUrl1 = map.get(key);
                break;
            }catch (Exception ignored){
            }
        }

        if(main03==null){
            System.out.println("无=================="+id);
            return null;
        }
        Novel novel = new Novel();
        novel.setType("tingchina");
        novel.setUrl(url);
        if(url.indexOf("yousheng")>0){
            yousheng(main03,novel);
        }else if(url.indexOf("pingshu")>0){
            pingshu(main03,novel);
        }else if(url.indexOf("xiangsheng")>0){
            xiangsheng(main03,novel);
        }else if(url.indexOf("xiqu")>0){
            xiqu(main03,novel);
        }else if(url.indexOf("erge")>0){
            erge(main03,novel);
        }else if(url.indexOf("jiaoyu")>0){
            jiaoyu(main03,novel);
        }else if(url.indexOf("xiaohua")>0){
            xiaohua(main03,novel);
        }else{
            yousheng(main03,novel);
        }

        novel.setNovelItems(items(main03,prefixUrl1));
        novel.setItemCount(novel.getNovelItems().size());

        if(StringUtils.isNotBlank(novel.getMemo())){
            novel.setMemo(novel.getMemo().replace("状态：","").trim());
        }
        if(StringUtils.isNotBlank(novel.getContent())){
            novel.setContent(novel.getContent().trim());
        }
        if(StringUtils.isNotBlank(novel.getCategoryName())){
            novel.setCategoryName(novel.getCategoryName().replace("分类：","").trim());
        }
        if(StringUtils.isNotBlank(novel.getUpdateTime())){
            novel.setUpdateTime(novel.getUpdateTime().replace("上传：","").replace("更新：","").trim());
        }
        if(StringUtils.isNotBlank(novel.getTitle())){
            novel.setTitle(novel.getTitle().replace("名称：","").replace("曲名：","").trim());
        }
        if(StringUtils.isNotBlank(novel.getAuthor())){
            novel.setAuthor(novel.getAuthor().replace("作者：","").trim());
        }
        if(StringUtils.isNotBlank(novel.getAnnouncer())){
            novel.setAnnouncer(novel.getAnnouncer().replace("播音：","").trim());
        }
        System.out.println("ok=================================="+novel.getUrl());
        return novel;
    }

    private static Novel xiaohua(Element main03, Novel novel) {

        Element book03 = main03.getElementsByClass("book03").first();
        Elements lis = book03.getElementsByTag("li");
        /**
         * 0:名称：窗边的小豆豆_笑渺
         * 1:人气：18030
         * 2:票数：286
         * 3:上传：2009/6/4
         */
        String title = lis.get(0).text();
        novel.setTitle(title);
        String updateTime = lis.get(3).text().trim();
        novel.setUpdateTime(updateTime);

        return novel;
    }

    private static Novel jiaoyu(Element main03, Novel novel) {

        Element book03 = main03.getElementsByClass("book03").first();
        Elements lis = book03.getElementsByTag("li");
        /**
         * 0:名称：窗边的小豆豆_笑渺
         * 1:人气：18030
         * 2:票数：286
         * 3:上传：2009/6/4
         */
        String title = lis.get(0).text();
        novel.setTitle(title);
        String updateTime = lis.get(3).text().trim();
        novel.setUpdateTime(updateTime);

        return novel;
    }

    private static Novel erge(Element main03, Novel novel) {
        Element book03 = main03.getElementsByClass("book03").first();
        Elements lis = book03.getElementsByTag("li");
        /**
         * 0:名称：窗边的小豆豆_笑渺
         * 1:人气：18030
         * 2:票数：286
         * 3:上传：2009/6/4
         */
        String title = lis.get(0).text();
        novel.setTitle(title);
        String updateTime = lis.get(3).text().trim();
        novel.setUpdateTime(updateTime);

        return novel;
    }

    private static Novel xiqu(Element main03, Novel novel) {
        Element book03 = main03.getElementsByClass("book03").first();
        Elements lis = book03.getElementsByTag("li");
        /**
         * 0:曲名：自那日与徐杨决裂后[二进宫]_张君秋
         * 1:人气：18030
         * 2:票数：286
         * 3:上传：2009/6/4
         */
        String title = lis.get(0).text();
        novel.setTitle(title);
        String updateTime = lis.get(3).text().trim();
        novel.setUpdateTime(updateTime);

        return novel;
    }

    private static Novel xiangsheng(Element main03, Novel novel) {

        Element book03 = main03.getElementsByClass("book03").first();
        Elements lis = book03.getElementsByTag("li");
        /**
         * 0:名称：白字先生_常贵田_常宝华
         * 1:人气：18030
         * 2:票数：286
         * 3:上传：2009/6/4
         */
        String title = lis.get(0).text();
        novel.setTitle(title);
        String updateTime = lis.get(3).text().trim();
        novel.setUpdateTime(updateTime);
        return novel;
    }

    private static Novel pingshu(Element main03, Novel novel) {
        Element book01 = main03.getElementsByClass("book01").first();
        Element book01Img = book01.getElementsByTag("img").first();
        novel.setImg(book01Img.attr("src"));
        Elements lis = book01.getElementsByTag("li");
        /**
         * 0:名称：沥泉神枪
         * 1:分类：其他评书
         * 2:状态：连载中...
         * 3:推荐：
         * 4:播音：CV独孤策
         * 5:作者：沉默的糕点
         * 6:状态：
         * 7:更新：
         */
        String title = lis.get(0).text();
        novel.setTitle(title);
        String categoryName = lis.get(1).text().trim();
        novel.setCategoryName(categoryName);
        String memo = lis.get(2).text().trim();
        novel.setMemo(memo);
        Element book02 = main03.getElementsByClass("book02").first();
        if(book02!=null){
            String content = book02.text();
            novel.setContent(content);
        }
        return novel;
    }

    private static Novel yousheng(Element main03,Novel novel) {

        Element book01 = main03.getElementsByClass("book01").first();
        Element book01Img = book01.getElementsByTag("img").first();
        novel.setImg(book01Img.attr("src"));
        Elements lis = book01.getElementsByTag("li");
        /**
         * 0:名称：史上最强赘婿
         * 1:分类：玄幻奇幻
         * 2:人气：
         * 3:推荐：
         * 4:播音：CV独孤策
         * 5:作者：沉默的糕点
         * 6:状态：
         * 7:更新：
         */
        String title = lis.get(0).text();
        novel.setTitle(title);
        String categoryName = lis.get(1).text().trim();
        novel.setCategoryName(categoryName);
        String renQi = lis.get(2).text().trim();
        String tuiJian = lis.get(3).text().trim();
        String boYin = lis.get(4).text().trim();
        novel.setAnnouncer(boYin);
        String author = lis.get(5).text().trim();
        novel.setAuthor(author);
        String memo = lis.get(6).text().trim();
        novel.setMemo(memo);
        String updateTime = lis.get(7).text().trim();
        novel.setUpdateTime(updateTime);
        Element book02 = main03.getElementsByClass("book02").first();
        if(book02!=null){
            String content = book02.text();
            novel.setContent(content);
        }
        return novel;


    }

    private static Set<NovelItem> items(Element main03,String  prefixUrl1) {
        Set<NovelItem> items = new HashSet<>();
        Elements lis = main03.getElementsByClass("list").first().getElementsByTag("li");
        Integer count = 0;
        for (Element item : lis) {
            Element a = item.getElementsByTag("a").first();
            if(a!=null){
                NovelItem novelItem = new NovelItem();
                novelItem.setUrl(prefixUrl1+a.attr("href"));
                novelItem.setTitle(a.text());
                novelItem.setOrder(count++);
                novelItem.setType("tingchina");
                items.add(novelItem);
            }
        }
        return items;
    }


    public static String mp3(String url){
        Map<String,String> headers = new HashMap<>();
        headers.put("Host","img.tingchina.com");
        headers.put("referer",url);
        //String s = WebUtils.get(url, null);

       // Document parse = Jsoup.parse(s);

        Document parse = null;
        try {
            parse = Jsoup.parse(new URL(url).openStream(), "GBK", url);
        }catch (Exception ignored){

        }
        if(parse==null){
            return null;
        }
        Element script = parse.getElementsByTag("script").last();
        String[] split = script.data().split("fileUrl=");
        String s1 = split[1].trim().split("mp3")[0];

        /**
         * 获取到key:
         */
        String key= getKey(headers);

        return mp3PrefixUrl+s1.substring(1)+"mp3?"+key;
    }

    private static String getKey(Map<String,String> headers){
        String url="https://img.tingchina.com/play/h5_jsonp.asp?0.3519966313870577";
        String s = WebUtils.get(url, headers, null);
        int i = s.indexOf("key=");
        s = s.substring(i).split("\";")[0];
        return s.replace("+","").replace("\"","").trim();
    }
    public static void main(String[] args) {
        String s = mp3("https://www.tingchina.com/19333/play_19333_1.htm");
        System.out.println(s);
    }

}
