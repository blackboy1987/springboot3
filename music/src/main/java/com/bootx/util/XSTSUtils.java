package com.bootx.util;

import cn.hutool.core.thread.ExecutorBuilder;
import cn.hutool.core.thread.ThreadFactoryBuilder;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * https://www.xsts.net/
 */
public class XSTSUtils {

    public static Map<String,Object> detail(String url){
        Map<String,Object> data = new HashMap<>();
        data.put("url",url);
        String s = WebUtils.get(url, null);
        Document parse = Jsoup.parse(s);
        Elements first1s = parse.getElementsByTag("meta");
        for (Element first:first1s) {
            if(StringUtils.equalsAnyIgnoreCase("og:novel:category",first.attr("property"))){
                data.put("categoryName",first.attr("content"));
            }
        }

        Element first = parse.getElementsByClass("album-info").first();
        if(first==null){
            return null;
        }
        Element img__t4_ = first.getElementsByClass("img _t4_").first();
        // https://i-deimg.kanmantang.com/imgget.php?url=http://www.ting56.com/pic/images/2019-1/20191314415642420.jpg
        String img = img__t4_.attr("src");
        data.put("img",img);
        Element info__t4_ = first.getElementsByClass("info _t4_").first();
        // 老刀,老刀有声小说
        String title = info__t4_.getElementsByClass("title _t4_").first().text();
        data.put("title",title);
        // 播讲：万历大帝 作者：佚名状态：连载中播放：7
        String memo = info__t4_.getElementsByClass("category _t4_").first().text();
        System.out.println("====================="+memo);
        data.put("memo",memo);
        // 更新时间：2021-03-25 13:32:53
        // 播讲：熊猫 作者：莫尘讲故事 状态：连载中播放：303
        // 播讲：佚名 作者：站在宇宙看地球状态：连载中播放：1432
        String[] memos = memo.split(" ");
        // 播讲
        String announcer = memos[0].replace("播讲：","").trim();
        data.put("announcer",announcer);
        if(memos.length==2){
            // 作者 站在宇宙看地球状态 连载中播放 1432
            String[] authors = memos[1].split("：");
            String author = authors[1].replace("状态","").trim();
            memo = authors[2].replace("播放","").trim();
            data.put("author",author);
            data.put("memo",memo);
        }else if(memos.length==3){
            String author = memos[1].replace("作者：","").trim();
            memo = memos[2].split("播放")[0].replace("状态：","");
            data.put("author",author);
            data.put("memo",memo);
        }

        String updateTime = info__t4_.getElementsByClass("category _t4_").get(2).text();
        data.put("updateTime",updateTime.trim().replace("更新时间：",""));

        String content = parse.getElementsByClass("album-intro  _t4_").first().text();
        data.put("content",content.trim());


        data.put("novelItems",items(parse));

        return data;
    }

    private static List<Map<String,Object>> items(Document parse) {
        List<Map<String,Object>> list = new ArrayList<>();
        Element playlist_1 = parse.getElementById("playlist_1");
        Elements as = playlist_1.getElementsByTag("a");
        for (int i=0;i<as.size();i++) {
            Map<String,Object> map = new HashMap<>();
            map.put("order",i+1);
            map.put("url","https://www.xsts.net"+ as.get(i).attr("href"));
            map.put("title",as.get(i).text());
            //map.put("resourceUrl",mp3("https://www.xsts.net"+ as.get(i).attr("href")));
            map.put("resourceUrl",as.get(i).text());
            list.add(map);
        }
        return list;
    }

    private static String mp3(String href) {
        String s = WebUtils.get(href, null);
        Document parse = Jsoup.parse(s);
        Elements script = parse.getElementsByTag("script");
        for (int i=0;i<script.size();i++){
            int player_data = script.get(i).data().indexOf("player_data");
            if(player_data>0){
                String replace = script.get(i).data().replace("var player_data=", "");
                Map<String, String> map = JsonUtils.toObject(replace, new TypeReference<Map<String, String>>() {
                });
                return map.get("url");
            }
        }

        return "";


    }

    public static void main(String[] args){
        /*ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
        for (int i = 1; i < 1486; i++) {
            int finalI = i;
            fixedThreadPool.execute(()->{
               Map<String, Object> detail = detail("https://www.xsts.net/"+ finalI +".html");
               if(detail!=null){
                   try {
                       FileUtils.writeStringToFile(new File("C:\\Users\\black\\Desktop\\novel\\xsts", finalI +".txt"),JsonUtils.toJson(detail), Charset.defaultCharset());
                   } catch (IOException e) {
                       e.printStackTrace();
                   }
               }
           });
        }*/
        Map<String, Object> detail = detail("https://www.xsts.net/"+ 1 +".html");

    }
}
