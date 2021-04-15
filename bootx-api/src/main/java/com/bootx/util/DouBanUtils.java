package com.bootx.util;

import com.bootx.app.dianying.entity.Movie;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DouBanUtils {

    public static List<String> photo(Long id){
        List<String> list = new ArrayList<>();
        String url="https://movie.douban.com/subject/"+id+"/photos";
        Map<String,String> headers = new HashMap<>();
        headers.put("Host","movie.douban.com");
        headers.put("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36");
        String s = WebUtils.get(url, headers, null);
        Document parse = Jsoup.parse(s);
        Element first = parse.getElementsByClass("poster-col3").first();
        Elements img = first.getElementsByTag("img");
        img.stream().forEach(item->list.add(item.attr("src")));
        return list;
    }


    public static Movie movie(Long id){
        Movie movie = new Movie();
        movie.setDouBanBanId(id);
        String url="https://movie.douban.com/subject/"+id+"/";
        Map<String,String> headers = new HashMap<>();
        headers.put("Host","movie.douban.com");
        headers.put("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36");
        String s = WebUtils.get(url, headers, null);
        Document parse = Jsoup.parse(s);
        Element content = parse.getElementById("content");

        // 标题
        Element elementsByTag = content.getElementsByAttributeValue("property","v:itemreviewed").first();
        movie.setTitle(elementsByTag.text());

        // 图片
        String image = content.getElementById("mainpic").getElementsByTag("img").first().attr("src");
        movie.setImage(image);


        Element info = content.getElementById("info");
        List<Node> nodes = info.childNodes();
        Elements children = info.children();

        // 导演(会多个)
        info.getElementsByAttributeValue("rel","v:directedBy");


        // 时长
        Elements runtime = info.getElementsByAttributeValue("property", "v:runtime");
        String html = runtime.html();
        System.out.println(runtime.html());
        String html1 = info.html();
        movie.setTimeLength(runtime.text());

        // 类型
        Elements genre = info.getElementsByAttributeValue("property", "v:genre");
        movie.setTimeLength(runtime.text());
        List<String> categories = new ArrayList<>();
        genre.stream().forEach(item->categories.add(item.text()));
        movie.setCategories(categories);

        Element interest_sectl = content.getElementById("interest_sectl");
        Elements average = interest_sectl.getElementsByAttributeValue("property", "v:average");
        movie.setScore(average.text());






        return movie;
    }


    public static void main(String[] args) {
        movie(26613692L);
    }

}