package com.bootx.util.novel;

import com.bootx.entity.Novel;
import com.bootx.entity.NovelItem;
import com.bootx.util.WebUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

/**
 * http://www.tingdongfang.com/
 */
public final class TingDongFangUtils {

    public static Novel detail(Long id){
        Novel novel = new Novel();
        String url="http://www.tingdongfang.com/book"+id+".html";
        novel.setUrl(url);
        novel.setType("tingdongfang");
        String result = WebUtils.get(url, null);
        Document root = Jsoup.parse(result);

        Element leftinner = root.getElementsByClass("leftinner").first();
        if(leftinner==null){
            System.out.println(id+"====无");
            return null;
        }

        Element hit = leftinner.getElementsByClass("htit").first();
        // 分类名称
        String categoryName = hit.getElementsByTag("a").text();
        novel.setCategoryName(categoryName);
        Element leftinner_l0 = leftinner.getElementsByClass("l0").first();
        // 封面图
        String img = leftinner_l0.getElementsByTag("img").first().attr("src");
        novel.setImg(img);

        Element leftinner_l1 = leftinner.getElementsByClass("l1").first();
        // 标题
        String title = leftinner_l1.getElementsByTag("span").first().text();
        novel.setTitle(title);


        Element leftinner_l3 = leftinner.getElementsByClass("l3").first();
        // 作者
        String author = leftinner_l3.getElementsByTag("span").first().text();
        novel.setAuthor(author);

        Element leftinner_l2 = leftinner.getElementsByClass("l2").first();
        // 状态
        String memo = leftinner_l2.getElementsByTag("span").first().text();
        novel.setMemo(memo);

        Element leftinner_l4 = leftinner.getElementsByClass("l4").first();
        // 播音
        String boYin = leftinner_l4.getElementsByTag("span").first().text();
        novel.setAnnouncer(boYin);

        Element leftinner_l5 = leftinner.getElementsByClass("l5").first();
        // 最新章节：03
        String memo1 = leftinner_l5.text();
        // map.put("memo1",memo1);


        Element leftinner_l7 = leftinner.getElementsByClass("l7").first();
        // 标签
        Elements tagAs = leftinner_l7.getElementsByTag("a");
        List<String> tags = tagAs.stream().map(item->item.text()).filter(item-> StringUtils.isNotBlank(item)).collect(Collectors.toList());
        novel.setTags(tags);


        Element leftinner_l6 = leftinner.getElementsByClass("l6").first();
        // 简介
        String content = leftinner_l6.text();
        novel.setContent(content);
        novel.setNovelItems(items(root,id));
        novel.setItemCount(novel.getNovelItems().size());
        return novel;

    }

    // 这个是第一页
    private static Set<NovelItem> items(Document root,Long id) {
        Set<NovelItem> list = new HashSet<>();
        Element chapter = root.getElementsByClass("chapter").first();
        Elements alists = chapter.getElementsByClass("alist");

        if(alists.size()>0){
            for (int i = 0; i < alists.size(); i++) {
                NovelItem novelItem = new NovelItem();
                Element atit = alists.get(i);
                String order = atit.getElementsByClass("ls2").first().text();
                try{
                    novelItem.setOrder(Integer.parseInt(order));
                }catch (Exception e){

                }
                String title = atit.getElementsByClass("ls3").first().text();
                novelItem.setTitle(title);
                novelItem.setType("tingdongfang");
                String url = atit.getElementsByClass("ls3").first().getElementsByTag("a").attr("href");
                novelItem.setUrl(url);
                // novelItem.setResourceUrl(mp3(url));
                list.add(novelItem);
            }

            // 页码
            Elements pgs = root.getElementsByClass("pg");
            if(pgs!=null&&pgs.size()>0){
                // 有多页
            }

        }
        return list;
    }


    public static String mp3(String url) {
        String result = WebUtils.get(url, null);
        Document root = Jsoup.parse(result);
        Element iframe = root.getElementsByTag("iframe").first();
        if(iframe!=null){
            String src = iframe.attr("src");
            System.out.println(src);
            result = WebUtils.get("http://www.tingdongfang.com"+src, null);
            result = result.split("file:")[1].split("\"")[1];
            return result;
        }

        return "";
    }

    public static void main(String[] args) {
        mp3("http://www.tingdongfang.com/book29325a79l1p2.html");
    }
}
