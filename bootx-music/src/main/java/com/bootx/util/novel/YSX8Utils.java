package com.bootx.util.novel;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.net.URL;

public class YSX8Utils {


    public static void main(String[] args) throws IOException {
        String url="https://www.ysts8.net/play_31330_55_1_1.html";
        Document parse = Jsoup.parse(new URL(url).openStream(), "GBK", url);
        String html = parse.html();
        System.out.println(parse.html());
    }
}
