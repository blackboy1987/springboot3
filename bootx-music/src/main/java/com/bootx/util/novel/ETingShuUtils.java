package com.bootx.util.novel;

import com.bootx.entity.Novel;
import com.bootx.entity.NovelItem;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.HashSet;
import java.util.Set;

/**
 * https://www.etingshu.com
 */
public class ETingShuUtils {

    private static final String preUrl="https://www.etingshu.com/";

    public static Novel detail(Long id){
        System.out.println("开始====================="+id);
        String url = preUrl+"show/"+id+".html";
        String s = WebUtils.get(url, null);
        Document parse = Jsoup.parse(s);
        Element contentright = parse.getElementsByClass("contentright").first();
        if(contentright==null){
            System.out.println("结束====================="+id);
            return null;
        }
        Novel novel = new Novel();
        novel.setUrl(url);
        novel.setType("etingshu");
        Element combox = contentright.getElementsByClass("combox").first();
        Element border = combox.getElementsByClass("border").first();

        Element playbox = border.getElementsByClass("playbox").first();
        Element img = playbox.getElementsByTag("img").first();
        String src = img.attr("src");
        novel.setImg("https://www.etingshu.com"+src);

        String title = playbox.getElementsByTag("h2").first().text();
        novel.setTitle(title);
        Elements div = playbox.getElementsByTag("div");
        for (int i = 1; i < div.size(); i++) {
            Element element = div.get(i);
            //0:播 音：内详
            if(i==1){
                String announcer = element.text().replace("播 音：","").trim();
                novel.setAnnouncer(announcer);
            }
            //1:作 者：最美书女
            if(i==2){
                String author = element.text().replace("作 者：","").trim();
                novel.setAuthor(author);
            }
            //2:推荐等级：
            //3:小说类型：恐怖
            if(i==4){
                String categoryName = element.text().replace("小说类型：","").trim();
                novel.setCategoryName(categoryName);
            }
            //4:更新时间：2019-09-26 13:07
            if(i==5){
                String updateTime = element.text().replace("更新时间：","").trim();
                novel.setUpdateTime(updateTime);
            }
            //5:更新状态：完结
            if(i==6){
                String memo = element.text().replace("更新状态：","").trim();
                novel.setMemo(memo);
            }
            //6:播放人气：596
        }


        try {
            Element content = border.getElementsByClass("introbox").first();
            novel.setContent(content.text());
        }catch (Exception e){

        }
        novel.setNovelItems(items(contentright));
        novel.setItemCount(novel.getNovelItems().size());
        System.out.println("结束====================="+id);
        return novel;
    }

    private static Set<NovelItem> items(Element contentright) {
        Set<NovelItem> novelItems = new HashSet<>();
        Element compress = contentright.getElementsByClass("compress").first();
        Elements a = compress.getElementsByTag("a");
        Integer order = 0;
        for (int i = 0; i < a.size(); i++) {
            if(StringUtils.isNotBlank(a.attr("href"))){
                NovelItem novelItem = new NovelItem();
                novelItem.setUrl("https://www.etingshu.com"+a.get(i).attr("href"));
                novelItem.setType("etingshu");
                novelItem.setOrder(++order);
                novelItem.setTitle(a.get(i).text());
                novelItem.setResourceUrl(mp3(novelItem.getUrl()));
                novelItems.add(novelItem);
            }
        }
        return novelItems;
    }

    private static String mp3(String url) {
        String s = WebUtils.get(url, null);

        int unescape = s.indexOf("unescape");
        String[] split = s.substring(unescape).split(";");
        s = split[0];
        s = s.substring("unescape".length()+2);
        s = s.substring(0,s.length()-2);
        s = s.replace("%3A%2F%2F","://").replaceAll("%2F","/");
        return s;
    }


    public static void main(String[] args) {
        detail(2L);
    }
}
