package com.bootx.util;

import com.bootx.app.zhishifufei.pojo.GetList;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.internal.StringUtil;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class HtmlParseUtils {

    public static void main(String[] args) {
        Map<String,Object> params = new HashMap<>();
        params.put("tid",13250);
        String result = WebUtils.post("https://www.yunxiaoxu.shop/App/zm/getlist",params);
        GetList all = JsonUtils.toObject(result, GetList.class);
        String content = all.getMsg().getContent();
        Document parse = Jsoup.parse(content);
        parse.getElementsByTag("img").removeAttr("style").removeAttr("alt").removeAttr("class").attr("style","max-width:100%;height:auto");
        parse.getElementsByTag("figure").removeAttr("class");
        Elements elements = parse.select("figure");
        for (Element element : elements) {
            element.tagName("p");
        }
        System.out.println(parse.body().html());
    }


    public static String parse(String html) {
        if(StringUtils.isBlank(html)){
            return html;
        }
        Document parse = Jsoup.parse(html);
        parse.getElementsByTag("img").removeAttr("style").removeAttr("alt").removeAttr("class").attr("style","max-width:100%;height:auto");
        parse.getElementsByTag("figure").removeAttr("class");
        Elements elements = parse.select("figure");
        for (Element element : elements) {
            element.tagName("p");
        }
        Elements ps = parse.getElementsByTag("p");
        for (Element p:ps) {
            if(StringUtils.isBlank(p.html())){
                p.remove();
            }
        }
        return parse.body().html();
    }


}
