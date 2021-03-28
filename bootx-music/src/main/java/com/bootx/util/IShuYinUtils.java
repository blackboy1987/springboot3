package com.bootx.util;

import com.bootx.entity.Novel;
import com.bootx.entity.NovelItem;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.*;
import java.util.stream.Collectors;

/**
 * https://www.ishuyin.com/
 */
public class IShuYinUtils {

    private static final String urlPrefix="https://www.ishuyin.com/";

    public static List<Novel> list(String key,Integer page){
        List<Novel> novels = new ArrayList<>();
        /**
         * 28：有声小说
         * 29：广播剧
         * 30: 评书
         * 59：杂类
         */
        String url="https://www.ishuyin.com/list-"+key+"-"+page+"-add_time-DESC-text.html";
        String s = WebUtils.get(url, null);

        Document root = Jsoup.parse(s);
        Elements listPg = root.getElementsByClass("ListPg");
        if(listPg!=null&&listPg.size()>0){
            Element first = listPg.first();
            Elements lis= first.getElementsByTag("li");
            for (Element li:lis) {
                Element a = li.getElementsByTag("a").first();
                String href = a.attr("href");
                Novel novel = detail(href,null);
                novel.setType("ishuyin");
                novels.add(novel);
            }
        }
        return novels;
    }

    public static List<String> detail1(Novel novel) {
        String s = WebUtils.get(novel.getUrl(), null);
        Document root = Jsoup.parse(s);
        Element kting_argetst = root.getElementsByClass("kting_argetst").first();
        Elements a = kting_argetst.getElementsByTag("a");
        List<String> tag = a.stream().map(item -> item.text().trim()).collect(Collectors.toList());
        return tag;
    }



    public static Novel detail(String href,Novel novel) {
        if(novel==null){
            novel = new Novel();
        }
        novel.setType("ishuyin");
        novel.setUrl(urlPrefix + href);
        String s = WebUtils.get(novel.getUrl(), null);
        Document root = Jsoup.parse(s);
        Element kting_argetst = root.getElementsByClass("kting_argetst").first();
        Elements a = kting_argetst.getElementsByTag("a");
        List<String> tag = a.stream().map(item -> item.text()).collect(Collectors.toList());
        Element player_left1 = root.getElementsByClass("player_left1").first();
        String img = player_left1.getElementsByClass("first_img").first().getElementsByTag("img").attr("src");
        novel.setImg(img);
        if(StringUtils.equalsAnyIgnoreCase(novel.getImg(),"./data/images/nopic.gif")){
            novel.setImg(urlPrefix+"data/images/nopic.gif");
        }
        String title = player_left1.getElementsByTag("h1").text();
        novel.setTitle(title);

        Elements ps = player_left1.getElementsByClass("dt-page02").first().getElementsByTag("p");
        String text0 = ps.get(0).text();
        novel.setAuthor(text0.replace("作者：","").trim());
        String text1 = ps.get(1).text();
        novel.setAnnouncer(text1.replace("演播：","").trim());
        String text2 = ps.get(2).text();
        novel.setMemo(text2.replace("更新状态：","").trim());
        String text3 = ps.get(3).text();
        novel.setUpdateTime(text3.replace("更新时间：","").trim());

        // 集数
        Set<NovelItem> novelItemSet = new HashSet<>();
        Elements elementsByTags = root.getElementById("articleDiv").getElementsByClass("box").first().getElementsByTag("a");
        novel.setItemCount(elementsByTags.size());
        for (Element item:elementsByTags) {
            NovelItem novelItem = new NovelItem();
            novelItem.setTitle(item.text());
            // novelItem.setUrl(getResourceUrl(item.attr("href")));
            novelItem.setUrl(item.attr("href"));
            novelItem.setNovel(novel);
            novelItem.setType("ishuyin");
            try{
                String orderStr = novelItem.getTitle().split("集")[0];
                novelItem.setOrder(Integer.valueOf(orderStr.replaceAll("第","")));
            }catch ( Exception e){
                novelItem.setOrder(0);
            }
            novelItemSet.add(novelItem);
        }
        novel.setNovelItems(novelItemSet);

        // 内容简介
        String content = root.getElementById("chapterContentIntro").text();
        novel.setContent(content);
        return novel;
    }

    private static String getResourceUrl(String href) {
        String s = WebUtils.get(urlPrefix + href, null);
        s = s.trim();
        int i = s.indexOf("u=\"*");
        s = s.substring(i+3);
        int i1 = s.indexOf(";");
        s = s.substring(0,i1-1);
        String[] uArr=s.split("\\*");
        int n = uArr.length;
        StringBuilder x = new StringBuilder();
        for(int j=1;j<n;j++){
            x.append((char) (Integer.parseInt(uArr[j])));
        }
        return x.toString();
    }


    public static void main(String[] args) {
        //String resourceUrl = getResourceUrl("https://www.ishuyin.com/player.php?mov_id=366&look_id=66&player=MP3");
        //System.out.println(resourceUrl);
        String s = WebUtils.get("https://www.tingchina.com/yousheng/30802/play_30802_685.htm", null);
        System.out.println(s);
    }

    public static Map<String,String> getParams(String url){
        Map<String,String> data = new HashMap<>();
        String[] params = url.split("\\?");
        if(params.length==2){
            String[] split = params[1].split("&");
            for (String ss:split) {
                String[] split1 = ss.split("=");
                if(split1.length==2){
                    data.put(split1[0],split1[1]);
                }else {
                    data.put(split1[0],"");
                }
            }
        }

        return data;
    }


    public static Map<String,String> params(String url) {
        Map<String,String> params = new HashMap<>();
        String [] s = url.split("\\?");
        if(s.length==2){
            String s1 = s[1];
            String[] split = s1.split("&");
            for (String ss:split) {
                String[] split1 = ss.split("=");
                if(split1.length==1){
                    params.put(split1[0],"");
                }else if(split1.length==2){
                    params.put(split1[0],split1[1]);
                }
            }
        }
        return params;
    }

}
