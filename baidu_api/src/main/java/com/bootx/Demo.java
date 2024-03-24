package com.bootx;

import com.bootx.util.WebUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.net.URL;

public class Demo {
    public static void main(String[] args) {
        String url = "https://www.duanju5.com.cn/vodsearch/-------------.html?wd=天王殿";
        try {
            Document parse = Jsoup.parse(new URL(url).openStream(), "gbk", url);
            Elements select = parse.select("div.module-search-item");
            System.out.println(select.first().html());
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
