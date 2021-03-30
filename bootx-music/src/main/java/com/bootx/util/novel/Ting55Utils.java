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
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * https://ting55.com
 */
public class Ting55Utils {

    private static final String prefixUrl = "https://www.ting55.com";

    public static Novel detail(Long id) throws IOException {
        String url = prefixUrl + "/book/"+ id;
        Map<String,String> headers = new HashMap<>();
        headers.put("Host", " www.ting55.com");
        headers.put("User-Agent"," Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36");
        String s = WebUtils.get(url, headers, null);

        Document parse = Jsoup.parse(s);
        Element left = parse.getElementsByClass("left").first();
        if(left==null){
           // System.out.println("无==========================================="+id);
            return null;
        }

        Novel novel = new Novel();
        novel.setType("ting55");
        novel.setUrl(url);
        Element bread = left.getElementsByClass("bread").first();
        String[] split = bread.text().split(">");
        String categoryName = split[1].trim();
        novel.setCategoryName(categoryName.trim());
        String title = split[2].replace("有声小说","").trim();
        novel.setTitle(title.trim());
        Element bookinfo = left.getElementsByClass("bookinfo").first();
        Element img = bookinfo.getElementsByTag("img").first();
        String image = img.attr("src");
        novel.setImg("https:"+image.trim());

        Element binfo = bookinfo.getElementsByClass("binfo").first();
        Elements children = binfo.children();

        // 标题
        children.get(0).text();
        // 类别
        children.get(1).text();

        String author = children.get(2).text();
        novel.setAuthor(author.replace("作者：","").trim());

        String announcer = children.get(3).text();
        novel.setAnnouncer(announcer.replace("播音：","").trim());

        String memo = children.get(4).text();
        novel.setMemo(memo.replace("状态：","").trim());

        String updateTime = children.get(5).text();
        novel.setUpdateTime(updateTime.replace("时间：","").trim());

        String content = left.getElementsByClass("intro").first().text();
        novel.setContent(content.trim())
        ;
        novel.setNovelItems(items(left));
        novel.setItemCount(novel.getNovelItems().size());
        System.out.println("ok======================================================================================================================="+id);
        return novel;

    }

    private static Set<NovelItem> items(Element left) {
        Set<NovelItem> novelItems = new HashSet<>();
        Element plist = left.getElementsByClass("plist").first();
        Elements li = plist.getElementsByTag("li");
        int order = 0;
        for (Element element : li) {
            Element a = element.getElementsByTag("a").first();
            if (a != null) {
                NovelItem novelItem = new NovelItem();
                novelItem.setType("ting55");
                novelItem.setOrder(++order);
                novelItem.setUrl(prefixUrl+a.attr("href"));
                novelItem.setTitle(a.text());
                novelItems.add(novelItem);
            }

        }
        return novelItems;
    }


    public static String mp3(String url){
        Map<String,Object> params = getParams(url);
        if(params.get("bookId")==null||params.get("page")==null){
            return null;
        }
        Map<String,String> headers = new HashMap<>();
        headers.put("Referer", url);
        headers.put("X-Requested-With", "XMLHttpRequest");
        headers.put("xt", "dc27074ddbb623eec9fb1ccada4a3f85");
        headers.put("User-Agent"," Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36");
        String result = WebUtils.post("https://ting55.com/glink",params,headers);
        System.out.println(result);
        return result;
    }

    private static Map<String, Object> getParams(String url) {
        Map<String,Object> params = new HashMap<>();
        int i = url.lastIndexOf("/");
        String s = url.substring(i+1);
        String[] split = s.split("-");
        params.put("bookId",split[0]);
        params.put("page",split[1]);

        return params;

    }

    public static void main(String[] args) throws IOException {
       // mp3("https://www.ting55.com/book/13829-458");
        detail(14931L);
    }


}
