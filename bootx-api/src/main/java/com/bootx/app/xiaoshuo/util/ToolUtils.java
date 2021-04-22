package com.bootx.app.xiaoshuo.util;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.bootx.app.xiaoshuo.pojo.Book;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class ToolUtils {

    private static final String url="https://m.idejian.com/";


    private static final String accessKeyId ="LTAI4GCjrkxGi8rcyoiy6i8Y";
    private static final String accessSecret="AEG4gBrjvNQvSJRSStrZfHfC4EJZOW";

    private static Map<String,String> headers = new HashMap<>();

    static {
        headers.put("user-agent"," Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/90.0.4430.72");
    }


    public static Map<String,Object> index(String type,String topType){
        Map<String,Object> data = new HashMap<>();
        if(type==null){
            type="";
        }
        if(StringUtils.equalsAnyIgnoreCase("top",type)){
            if(topType==null){
                topType = "nansheng";
            }
           return top(topType);
        }

        String s = WebUtils.get(url+type, headers,null);
        Document parse = Jsoup.parse(s);

        // 轮播图片
        data.put("slider",slider(parse));
        data.put("todayBookList",todayBookList(parse));
        data.put("hList",hList(parse));
        data.put("vList",vList(parse));
        return data;
    }

    private static Map<String, Object> top(String topType) {
        Map<String,Object> data = new HashMap<>();
        String s = WebUtils.get(url+"top/"+topType, headers,null);
        Document parse = Jsoup.parse(s);
        List<Map<String,Object>> list = new ArrayList<>();
        Elements h_list_wraps = parse.getElementsByClass("v_list_wrap");
        for (int i=0;i<h_list_wraps.size();i++) {
            list.add(vListItem(h_list_wraps.get(i)));
        }


        data.put("list",list);
        return data;
    }

    private static List<Map<String,Object>> vList(Document parse) {
        List<Map<String,Object>> data1 = new ArrayList<>();

        Elements h_list_wraps = parse.getElementsByClass("v_list_wrap");
        for (int i=1;i<h_list_wraps.size();i++) {
            data1.add(vListItem(h_list_wraps.get(i)));
        }
        return data1;

    }

    public static Map<String,Object> vListItem(Element vList){
        Map<String,Object> data = new HashMap<>();
        Element title_wrap = vList.getElementsByClass("title_wrap").first();
        String title = title_wrap.getElementsByTag("span").first().text();
        data.put("title",title);
        Element more = title_wrap.getElementsByTag("a").first();
        if(more!=null){
            String href = more.attr("href");
            data.put("more",href);
        }
        List<Book> books = new ArrayList<>();
        Elements lis = vList.getElementsByClass("v_list").first().getElementsByTag("li");
        for (Element li:lis) {
            Book book = new Book();
            Element a = li.getElementsByTag("a").first();
            String href = a.attr("href");
            book.setUrl(href);
            Element book_img = a.getElementsByClass("book_img").first();
            if (book_img != null) {
                String img = book_img.getElementsByTag("img").attr("src");
                book.setImg(downloadUrl(img));
            }
            Element item_info = a.getElementsByClass("item_info").first();
            if (item_info != null) {
                String name = item_info.getElementsByClass("book_name").first().text();
                book.setName(name);
                String info = item_info.getElementsByClass("book_info").first().text();
                book.setInfo(info);
                Element info_wrap = item_info.getElementsByClass("info_wrap").first();
                if (info_wrap != null) {
                    Elements bookAuthors = info_wrap.getElementsByClass("book_author");
                    if (bookAuthors.size() == 3) {
                        String author = bookAuthors.get(0).text();
                        book.setAuthor(author);
                        String category = bookAuthors.get(1).text();
                        book.setCategory(category);
                        String wordCount = bookAuthors.get(2).text();
                        book.setWordCount(wordCount);
                    } else {
                        String category = bookAuthors.get(0).text();
                        book.setCategory(category);
                    }
                }
            }
            books.add(book);
        }
        data.put("books",books);

        return data;
    }



    private static List<Map<String,Object>> hList(Document parse) {
        List<Map<String,Object>> data1 = new ArrayList<>();

        Elements h_list_wraps = parse.getElementsByClass("h_list_wrap");
        for (Element hList:h_list_wraps) {
            data1.add(hListItem(hList));
        }
        return data1;

    }

    public static Map<String,Object> hListItem(Element hList){
        Map<String,Object> data = new HashMap<>();
        Element title_wrap = hList.getElementsByClass("title_wrap").first();
        String title = title_wrap.getElementsByTag("span").first().text();
        data.put("title",title);
        Element more = title_wrap.getElementsByTag("a").first();
        if(more!=null){
            String href = more.attr("href");
            data.put("more",href);
        }
        List<Book> books = new ArrayList<>();
        Elements lis = hList.getElementsByClass("h_list").first().getElementsByTag("li");
        for (Element li:lis) {
            Book book = new Book();
            Element book_img = li.getElementsByClass("book_img").first();
            if (book_img != null) {
                String img = book_img.getElementsByTag("img").attr("src");
                book.setImg(img);
            }
            Element book_name = li.getElementsByClass("book_name").first();
            book.setName(book_name.text());
            books.add(book);
        }
        data.put("books",books);

        return data;
    }



    /**
     * 今日热读
     * @param parse
     * @return
     */
    private static Map<String,Object> todayBookList(Document parse) {
        Map<String,Object> data = new HashMap<>();
        data.put("type",1);
        Element today_booklist = parse.getElementsByClass("today_booklist").first();
        Element title_wrap = today_booklist.getElementsByClass("title_wrap").first();
        String title = title_wrap.getElementsByTag("span").first().text();
        data.put("title",title);
        Element more = title_wrap.getElementsByTag("a").first();;
        if(more!=null){
            String href = more.attr("href");
            data.put("more",href);
        }
        List<Book> books = new ArrayList<>();
        Elements lis = today_booklist.getElementsByClass("v_list").first().getElementsByTag("li");
        for (Element li:lis) {
            Book book = new Book();
            Element a = li.getElementsByTag("a").first();
            String href = a.attr("href");
            book.setUrl(href);
            Element book_img = a.getElementsByClass("book_img").first();
            if(book_img!=null){
                String img = book_img.getElementsByTag("img").attr("src");
                book.setImg(downloadUrl(img));
            }
            Element item_info = a.getElementsByClass("item_info").first();
            if(item_info!=null){
                String name = item_info.getElementsByClass("book_name").first().text();
                book.setName(name);
                String info = item_info.getElementsByClass("book_info").first().text();
                book.setInfo(info);
                Element info_wrap = item_info.getElementsByClass("info_wrap").first();
                if(info_wrap!=null){
                    Elements bookAuthors = info_wrap.getElementsByClass("book_author");
                    if(bookAuthors.size()==3){
                        String author = bookAuthors.get(0).text();
                        book.setAuthor(author);
                        String category = bookAuthors.get(1).text();
                        book.setCategory(category);
                        String wordCount = bookAuthors.get(2).text();
                        book.setWordCount(wordCount);
                    }else {
                        String category = bookAuthors.get(0).text();
                        book.setCategory(category);
                    }
                }
            }
            books.add(book);
        }
        data.put("books",books);
        return data;
    }

    /**
     * 轮播
     * @param parse
     * @return
     */
    private static List<Book> slider(Document parse) {
        List<Book> books = new ArrayList<>();
        Element slider = parse.getElementsByClass("slider").first();
        Elements lis = slider.getElementsByTag("li");
        for (Element li:lis) {
            Element a = li.getElementsByTag("a").first();
            String href = a.attr("href");
            String attr = a.getElementsByTag("img").first().attr("src");
            Book book = new Book();
            book.setUrl(href);
            book.setImg(downloadUrl(attr));
            books.add(book);
        }
        return books;
    }

    private static String downloadUrl(String href) {
        try {
            String url="xiaoshuo/"+ FilenameUtils.getName(href).split("\\?")[0];
            String endpoint = "https://oss-cn-hangzhou.aliyuncs.com";
            OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessSecret);
            boolean found = ossClient.doesObjectExist("bootx-xiaochengxu", url);
            if(found){
                ossClient.shutdown();
                return "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/"+url;

            }


            System.out.println(url);
            InputStream inputStream = new URL(href).openStream();
            ossClient.putObject("bootx-xiaochengxu", url, inputStream);
            ossClient.shutdown();
            return "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/"+url;
        }catch (Exception e){
            e.printStackTrace();
            return href;
        }

    }


    public static void main(String[] args) {
        Map<String, Object> index = index("top","nansheng");
        String s = JsonUtils.toJson(index);
        System.out.println(s);
    }


    public static Map<String, Object> detail(String href) {
        Map<String,Object> data = new HashMap<>();
        String s = WebUtils.get(url+href, headers,null);
        Document parse = Jsoup.parse(s);
        Element bookview = parse.getElementsByClass("bookview").first();
        String img = bookview.getElementsByClass("side").first().getElementsByTag("img").first().attr("src");
        String status = bookview.getElementsByClass("side").first().getElementsByClass("icon_tag").first().text();
        Element main = bookview.getElementsByClass("main").first();
        String title = main.getElementsByClass("z_ellipsis2").first().text();
        Element bk_author = main.getElementsByClass("bk_author").first();
        Elements authors = bk_author.getElementsByClass("author");
        String author = authors.get(0).text();
        String category = authors.get(1).text();
        String score = main.getElementsByClass("stars").first().getElementsByClass("gray").text();

        Element other = main.getElementsByClass("other").first();
        String readCount = other.getElementsByClass("right").first().getElementsByTag("em").text();
        String wordCount = other.getElementsByClass("font_num").text();



        return data;
    }
}
