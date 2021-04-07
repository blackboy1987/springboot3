package com.bootx.util.novel;


import com.bootx.util.WebUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.UnsupportedEncodingException;

/**
 * http://www.ychy.com/
 */
public final class YCHYUtils {

    public static void detail(String url) {
        String s = WebUtils.get(url, null);
        Document parse = Jsoup.parse(s);
        Element bxting_content_680 = parse.getElementsByClass("bxting_content_680").first();
        String title = bxting_content_680.getElementsByClass("content_title").text();
        Element content_center = bxting_content_680.getElementsByClass("content_center").first();
        Element font = content_center.getElementsByTag("font").first();
        String text = font.text();
        System.out.println(font.text());
        Element content_center1 = bxting_content_680.getElementsByClass("content_center").get(1);


    }


    public static void main(String[] args) throws UnsupportedEncodingException {
        String url="http://www.ychy.com/book/4161.html";

        detail(url);
    }

}
