package com.bootx.util;

import com.bootx.entity.Area;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class AreaUtils {

    private static String url="http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/";

    private static String url1 = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/";


    public static List<Area> aa() {
        List<Area> areas = new ArrayList<>();
        String s = WebUtils.get(url+"index.html", null);
        Document parse = null;
        try {
            parse = Jsoup.parse(new URL(url).openStream(), "GBK", url);
        }catch (Exception ignored){
        }
        Elements provincetr = parse.getElementsByClass("provincetr");
        for (Element element:provincetr) {
            Elements a = element.getElementsByTag("a");
            for (Element element1:a) {
                System.out.println(element1.attr("href")+":"+element1.text());
                Area area = new Area();
                area.setName(element1.text());
                area.setCode(element1.attr("href").replace(".html",""));
                areas.add(area);
            }
        }

        return areas;
    }

    public static List<Area> aaa(Area parent) {
        List<Area> areas = new ArrayList<>();
        String s = WebUtils.get(url+parent.getCode()+".html", null);
        Document parse = null;
        try {
            parse = Jsoup.parse(new URL(url).openStream(), "GBK", url);
        }catch (Exception ignored){
        }
        Elements provincetr = parse.getElementsByClass("citytr");
        for (Element element:provincetr) {
            Elements a = element.getElementsByTag("a");
            Element element1 = a.get(0);
            Element element2 = a.get(1);
            Area area = new Area();
            area.setName(element2.text());
            area.setCode(element1.text());
            area.setParent(parent);
        }

        return areas;
    }

}
