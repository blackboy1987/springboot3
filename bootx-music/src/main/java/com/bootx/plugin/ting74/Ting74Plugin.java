package com.bootx.plugin.ting74;

import com.bootx.plugin.*;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Component("ting74Plugin")
public class Ting74Plugin extends MusicPlugin {

    public static final String baseUrl="http://www.ting74.com/";


    @Override
    public String getName() {
        return "74听书网";
    }

    @Override
    public List<Category> getCategory() {
        List<Category> list = new ArrayList<>();
        String s = WebUtils.get(baseUrl, null);
        Document parse = Jsoup.parse(s);
        Elements elementsByClass = parse.getElementsByClass("nav-ol").first().getElementsByClass("nav-li");
        elementsByClass.forEach(item->{
            Category category = new Category();
            category.setName(item.text());
            category.setUrl(item.getElementsByTag("a").first().attr("href"));
            list.add(category);
        });
        return list;
    }

    @Override
    public Map<String, Object> getCategoryList(String url) {
        if(url.startsWith("/")){
            url = url.substring(1);
        }
        if(!url.startsWith("http")){
            url=baseUrl+url;
        }
        if(StringUtils.equalsAnyIgnoreCase(baseUrl,url)){
            return index(url);
        }
        if(StringUtils.equalsAnyIgnoreCase(baseUrl+"top/allvisit.html",url)||StringUtils.equalsAnyIgnoreCase(baseUrl+"over/",url)){
            return other(url);
        }
        return list(url);
    }

    private Map<String, Object> other(String url) {
        String s = WebUtils.get(url, null);
        Document parse = Jsoup.parse(s);
        return news(parse,0);
    }

    private Map<String, Object> list(String url) {

        Map<String, Object> data = new HashMap<>();

        String s = WebUtils.get(url, null);
        Document parse = Jsoup.parse(s);
        data.put("url",url.replace(baseUrl,""));
        data.put("list",contentList(parse));
        data.put("hot",contentHot(parse));
        return data;
    }

    private Map<String,Object> contentHot(Document parse) {
        Map<String,Object> data = new HashMap<>();
        Element sidebar = parse.getElementsByClass("sidebar").first();
        String title = sidebar.getElementsByClass("title").first().getElementsByClass("title-h").first().text();
        data.put("title",title);
        Elements li = sidebar.getElementsByClass("top-ul").first().getElementsByTag("li");
        List<Book> books = new ArrayList<>();
        li.forEach(item->{
            Book book = new Book();
            Element h4 = item.getElementsByTag("h4").first();
            Elements a = h4.getElementsByTag("a");
            String href = a.attr("href");
            String text = a.text();
            book.setUrl(href);
            book.setTitle(text);

            Element first = item.getElementsByClass("b-information").first();
            Elements span = first.getElementsByTag("span");
            Element element = span.get(0);
            String announcer = element.text().trim().replace("演播：", "");
            Element element1 = span.get(1);
            String status = element1.text().trim().replace("更新情况：", "").replace("：", "");
            book.setAnnouncer(new Announcer(announcer,null));
            book.setStatus(status);


            books.add(book);
        });
        data.put("books",books);
        return data;
    }

    private Map<String,Object> contentList(Document parse) {
        Map<String,Object> data = new HashMap<>();
        Element content = parse.getElementsByClass("content").first();
        Element title = content.getElementsByClass("title").first();
        String title1 = title.getElementsByClass("title-h").first().text();
        data.put("title",title1);

        // module-tab
        Element moduleTab = title.getElementsByClass("module-tab").first();
        if(moduleTab!=null){
            Elements tabs = moduleTab.getElementsByTag("h3");

            List<Tag> tags = tabs.stream().map(item -> {
                Elements a = item.getElementsByTag("a");
                Tag tag = new Tag();
                tag.setUrl(a.attr("href"));
                tag.setName(a.text());
                return tag;
            }).collect(Collectors.toList());
            data.put("tags",tags);
        }


        Elements li = content.getElementsByClass("list-works").first().getElementsByTag("li");
        List<Book> books = new ArrayList<>();
        li.forEach(item->{
            Book book = new Book();
            Element first = item.getElementsByClass("list-imgbox").first();
            Element img = first.getElementsByTag("img").first();
            String attr = img.attr("data-original");
            if(StringUtils.isBlank(attr)){
                attr = img.attr("src");
            }
            book.setImg(attr);
            Element first1 = item.getElementsByClass("list-works-dl").first();
            Element first2 = first1.getElementsByClass("list-book-dt").first();
            String status = first2.getElementsByClass("ztlz").text();
            book.setStatus(status);
            Element a = first2.getElementsByTag("a").first();
            book.setUrl(a.attr("href"));
            book.setTitle(a.text());
            String content1 = first1.getElementsByClass("list-book-des").first().text().trim();
            book.setContent(content1);
            Element first3 = first1.getElementsByClass("list-book-cs").first();
            Elements bookAuthor = first3.getElementsByClass("book-author");
            String author = bookAuthor.get(0).text();
            String announcer = bookAuthor.get(1).text();
            String memo = bookAuthor.get(2).text();
            String updateTime = first3.getElementsByClass("book-zt").text();
            book.setAuthor(new Author(author,null));
            book.setAnnouncer(new Announcer(announcer));
            book.setMemo(memo);
            book.setUpdateTime(updateTime);
            books.add(book);
        });
        // 下一页
        Elements elementsByTag = content.getElementsByClass("fanye").first().getElementsByTag("a");
        Element first = elementsByTag.last();
        if(first!=null){
            data.put("next",first.attr("href"));
        }

        data.put("books",books);
        return data;
    }

    private Map<String, Object> index(String url) {
        Map<String, Object> data = new HashMap<>();

        String s = WebUtils.get(url, null);

        Document parse = Jsoup.parse(s);

        data.put("banner",banner(parse));

        Map<String,Object> map = new HashMap<>();
        // 今日热搜
        map.put("bookTop", bookTop(parse));
        // 猜你喜欢
        map.put("like", like(parse));

        // 热门连载
        map.put("hot",hot(parse,"myTab_Content0","热门连载"));
        // 经典完结
        map.put("finish",hot(parse,"myTab_Content1","经典完结"));
        // 恐怖灵异有声小说 玄幻仙侠有声小说
        map.put("list",fenLei(parse));

        // 最近更新  最新上架
        map.putAll(news(parse,1));


        data.put("item",map);
        String s1 = JsonUtils.toJson(data);
        System.out.println(s1);

        return data;

    }

    private Map<String,Object> news(Document parse,Integer index) {
        if(index==null){
            index = 0;
        }
        Map<String,Object> data = new HashMap<>();

        Element w_mb = parse.getElementsByClass("w mb").get(index);
        if(w_mb!=null){
            // 最近更新
            Map<String,Object> newUpdate = new HashMap<>();
            Element aContent = w_mb.getElementsByClass("content").first();
            Element title1 = aContent.getElementsByClass("title").first();
            newUpdate.put("title",title1.getElementsByClass("title-h").first().text());
            newUpdate.put("url",title1.getElementsByTag("a").first().attr("href"));

            Element gengxin = aContent.getElementsByClass("gengxin").first();
            Elements li = gengxin.getElementsByTag("li");
            List<Book> books = new ArrayList<>();
            li.forEach(item->{
                Book book = new Book();
                String categoryName = item.getElementsByClass("z1").first().text();
                String title = item.getElementsByClass("z2").first().text();
                String url = item.getElementsByClass("z2").first().getElementsByTag("a").attr("href");
                String memo = item.getElementsByClass("z3").first().text();
                String announcer = item.getElementsByClass("z4").first().text();
                String status = item.getElementsByClass("z4").get(1).text();
                String updateTime = item.getElementsByClass("z5").first().text();
                book.setCategory(new Category(categoryName,null));
                book.setTitle(title);
                book.setUrl(url);
                book.setMemo(memo);
                book.setAnnouncer(new Announcer(announcer,null));
                book.setStatus(status);
                book.setUpdateTime(updateTime);
                books.add(book);
            });
            newUpdate.put("books",books);
            data.put("newUpdate",newUpdate);







            // 最新上架
            Map<String,Object> news = new HashMap<>();
            Element aNew = w_mb.getElementsByClass("new").first();
            Element title2 = aNew.getElementsByClass("title").first();
            news.put("title",title2.getElementsByClass("title-h").first().text());
            news.put("url",title2.getElementsByTag("a").first().attr("href"));

            Elements li1 = aNew.getElementsByTag("li");
            List<Book> book1s = new ArrayList<>();
            li1.forEach(item->{
                Book book = new Book();
                Element first = item.getElementsByClass("pic").first().getElementsByTag("a").first();
                String href = first.attr("href");
                Element img = first.getElementsByTag("img").first();
                String attr = img.attr("data-original");
                if(StringUtils.isBlank(attr)){
                    attr = img.attr("src");
                }
                String title = item.getElementsByClass("rm-bt").first().text();
                String announcer = item.getElementsByClass("rm-by").first().text().trim().replace("演播：", "");
                String content = item.getElementsByClass("rm-js").first().text().trim().replace("简介：", "");
                book.setTitle(title);
                book.setAnnouncer(new Announcer(announcer));
                book.setContent(content);
                book.setImg(attr);
                book.setUrl(href);
                book1s.add(book);
            });
            news.put("books",book1s);



            data.put("news",news);


        }

        return data;
    }

    private List<Map<String, Object>> fenLei(Document parse) {
        List<Map<String, Object>> list = new ArrayList<>();

        Element fenlei = parse.getElementsByClass("fenlei").first();
        Elements column = fenlei.getElementsByClass("column");
        column.forEach(item->{
            Map<String, Object> map = new HashMap<>();
            Element first = item.getElementsByClass("title").first().getElementsByClass("title-h").first().getElementsByTag("a").first();
            String title = first.text();
            String url = first.attr("url");
            map.put("title",title);
            map.put("url",url);
            List<Book> books = new ArrayList<>();
            Elements li0s = item.getElementsByClass("list-works").first().getElementsByTag("li");
            li0s.forEach(child->{
                Book book = new Book();
                Element imgbox = child.getElementsByClass("list-imgbox").first();
                Element a = imgbox.getElementsByTag("a").first();
                String href = a.attr("href");
                Element img = a.getElementsByTag("img").first();
                String src = img.attr("data-original");
                if(StringUtils.isBlank(src)){
                    src = img.attr("src");
                }
                book.setUrl(href);
                book.setImg(src);

                Element first1 = child.getElementsByClass("list-works-dl").first();
                String text = first1.getElementsByClass("list-book-dt").first().text();
                Element category = first1.getElementsByClass("list-book-des").first();

                Elements elementsByClass = first1.getElementsByClass("list-book-cs").first().getElementsByClass("book-author");
                Element element = elementsByClass.get(0);
                String author = element.text().replace("作者：", "");
                Element element1 = elementsByClass.get(1);
                String announcer = element1.text().replace("演播：", "");
                book.setAnnouncer(new Announcer(announcer));
                book.setAuthor(new Author(author));
                book.setTitle(text);
                book.setCategory(new Category(category.text().trim()));

                books.add(book);
            });

            Elements li1s = item.getElementsByClass("column-ul").first().getElementsByTag("li");
            li1s.forEach(child->{
                Book book = new Book();
                Element a = child.getElementsByTag("a").first();
                book.setTitle(a.text());;
                book.setUrl(a.attr("href"));
                Element span = child.getElementsByTag("span").first();
                book.setMemo(span.text());

                books.add(book);
            });

            map.put("list",books);
            list.add(map);
        });



        return list;
    }


    private Map<String, Object> hot(Document parse,String domId,String title) {
        Map<String,Object> map = new HashMap<>();
        map.put("title",title);
        List<Book> books = new ArrayList<>();
        Element dom = parse.getElementById(domId);
        Elements tabLis = dom.getElementsByClass("tab-li");
        tabLis.forEach(item->{
            Book book = new Book();
            Element img = item.getElementsByTag("img").first();
            String attr = img.attr("data-original");
            if(StringUtils.isBlank(attr)){
                attr = img.attr("src");
            }

            Element first = item.getElementsByClass("tab-book-title").first().getElementsByTag("a").first();
            String url = first.attr("href");
            String text = first.text();
            String memo = item.getElementsByClass("tab-book-author").first().text();

            book.setMemo(memo);
            book.setImg(attr);
            book.setUrl(url);
            book.setTitle(text);
            books.add(book);
        });
        map.put("books",books);

        return map;
    }


    private Map<String, Object> like(Document parse) {
        Map<String,Object> map = new HashMap<>();
        map.put("title","猜你喜欢");
        List<Book> books = new ArrayList<>();
        Element works = parse.getElementsByClass("index-one").first().getElementsByClass("works").first();
        Elements worksLis = works.getElementsByClass("works-li");
        worksLis.forEach(item->{
            books.add(worksLi(item));
        });
        map.put("books",books);

        return map;
    }

    /**
     * 今日热搜
     * @param parse
     * @return
     */
    private Map<String,Object> bookTop(Document parse) {
        Map<String,Object> map = new HashMap<>();
        Element first = parse.getElementsByClass("fr book-top").first();
        Element title = first.getElementsByClass("title").first();
        map.put("title",title.text());

        List<Book> books = new ArrayList<>();
        Element first1 = first.getElementsByClass("top-ul").first();
        Elements li = first1.getElementsByTag("li");
        li.forEach(item->{
            Element h4 = item.getElementsByTag("h4").first();
            Element a = h4.getElementsByTag("a").first();
            String href = a.attr("href");
            String text = a.text();
            Element first2 = item.getElementsByClass("b-information").first();
            Elements span = first2.getElementsByTag("span");
            Element element = span.get(0);
            Element a1 = element.getElementsByTag("a").first();
            String author = a1.text();
            Element element1 = span.get(1);
            Element a2 = element1.getElementsByTag("a").first();
            String announcer = a2.text();

            Book book = new Book();
            book.setAnnouncer(new Announcer(announcer));
            book.setTitle(text);
            book.setAuthor(new Author(author));
            book.setUrl(href);
            books.add(book);
        });
        map.put("books",books);
        return map;
    }






    private List<Banner> banner(Document parse) {
        // 首页轮播
        List<Banner> banners = new ArrayList<>();
        Element banner = parse.getElementsByClass("banner").first();
        Elements sliderItems = banner.getElementsByClass("slider-item");
        sliderItems.forEach(item->{
            Element a = item.getElementsByTag("a").first();
            String href = a.attr("href");
            String title = a.attr("title");
            String img = a.getElementsByTag("img").first().attr("src");
            Banner banner1 = new Banner();
            banner1.setImg(img);
            banner1.setTitle(title);
            banner1.setUrl(href);
            banners.add(banner1);
        });

        return banners;
    }

    @Override
    public void search(String keywords) {

    }

    @Override
    public Map<String,Object> detail(String url) {
        Map<String,Object> data = new HashMap<>();
        String s = WebUtils.get(url, null);
        Document parse = Jsoup.parse(s);
        Element contentDom = parse.getElementsByClass("content").first();
        Elements books = contentDom.getElementsByClass("book");
        Book book = new Book();
        Element book0Dom = books.get(0);
        Element bookImg = book0Dom.getElementsByClass("book-img").first();
        Elements imgDom = bookImg.getElementsByTag("img");
        String img = imgDom.attr("src");
        book.setImg(img);

        Element bookInfo = book0Dom.getElementsByClass("book-info").first();
        Element dt = bookInfo.getElementsByTag("dt").first();
        String status = dt.getElementsByTag("i").text();
        book.setStatus(status);
        String title = dt.getElementsByClass("book-title").text().trim();
        book.setTitle(title);

        Elements dd = bookInfo.getElementsByTag("dd");
        Element dd0 = dd.get(0);
        Element i = dd0.getElementsByTag("i").first();
        if(i.hasClass("no-5")){
            book.setLevel(5);
        }else if(i.hasClass("no-4")){
            book.setLevel(4);
        }else if(i.hasClass("no-3")){
            book.setLevel(3);
        }else if(i.hasClass("no-2")){
            book.setLevel(2);
        }else if(i.hasClass("no-1")){
            book.setLevel(1);
        }else{
            book.setLevel(0);
        }
        Element dd1 = dd.get(1);
        Elements a1 = dd1.getElementsByTag("a");
        book.setCategory(new Category(a1.text().trim(),a1.attr("href")));
        Element dd2 = dd.get(2);
        Elements a2 = dd2.getElementsByTag("a");
        book.setAuthor(new Author(a2.text().trim(),a2.attr("href")));
        Element dd3 = dd.get(3);
        Elements a3 = dd3.getElementsByTag("a");
        book.setAnnouncer(new Announcer(a3.text().trim(),a3.attr("href")));
        Element dd4 = dd.get(4);
        String memo = dd4.text().replace("状态：", "").trim();
        book.setMemo(memo);
        Element dd5 = dd.get(5);
        String updateTime = dd5.text().replace("时间：", "").trim();
        book.setUpdateTime(updateTime);


        Element book1Dom = books.get(1);
        String content = book1Dom.getElementsByClass("book-des").first().text().trim();
        book.setContent(content);
        Element book2Dom = books.get(2);
        List<BookItem> bookItems = new ArrayList<>();
        Elements lis = book2Dom.getElementById("playlist").getElementsByTag("li");
        AtomicReference<Integer> order = new AtomicReference<>(1);
        lis.forEach(item->{
            BookItem bookItem = new BookItem();
            Element a = item.getElementsByTag("a").first();
            bookItem.setTitle(a.text().trim());
            bookItem.setUrl(a.attr("href"));
            bookItem.setOrder(order.getAndSet(order.get() + 1));
            bookItems.add(bookItem);
        });
        book.setItems(bookItems);
        data.put("book",book);


        Map<String,Object> more = new HashMap<>();
        List<Book> moreBooks = new ArrayList<>();
        Element book3Dom = books.get(3);
        more.put("title",book3Dom.getElementsByClass("title").text());
        Elements works = book3Dom.getElementsByClass("works").first().getElementsByClass("works-li");
        works.forEach(item->{
            moreBooks.add(worksLi(item));
        });
        more.put("books",moreBooks);
        data.put("more",more);

        //主播其他作品 推荐
        Element sidebar = parse.getElementsByClass("sidebar").first();
        Elements rZz = sidebar.getElementsByClass("r-zz");
        Element rZz0Dom = rZz.get(0);
        Map<String,Object> map = new HashMap<>();
        map.put("title",rZz0Dom.getElementsByClass("title").text().trim());
        Element zUl = rZz0Dom.getElementsByClass("r-ul").first();
        if(zUl!=null){
            Elements li = zUl.getElementsByTag("li");
            List<Book> books1 = new ArrayList<>();
            li.forEach(item->{
                Book book1 = new Book();
                Element img1 = item.getElementsByTag("img").first();
                book1.setImg(img1.attr("src"));
                Element first = item.getElementsByClass("rm-bt").first();
                Elements a = first.getElementsByTag("a");
                book1.setUrl(a.attr("href"));
                book1.setTitle(a.text());
                Element first1 = item.getElementsByClass("rm-by").first();
                Elements a4 = first1.getElementsByTag("a");
                book1.setStatus(a4.text());
                Element first2 = item.getElementsByClass("rm-js").first();
                book1.setContent(first2.text().replace(" 简介：","").trim());
                books1.add(book1);
            });
            map.put("books",books1);
        }
        data.put("announcerBooks",map);


       Element rZz1Dom = rZz.get(1);
        Map<String,Object> map1 = new HashMap<>();
        map1.put("title",rZz1Dom.getElementsByClass("title").text().trim());
        Element bookTopUl = rZz0Dom.getElementsByClass("book-top-ul").first();
        if(bookTopUl!=null){
            Elements li = bookTopUl.getElementsByTag("li");
            List<Book> books1 = new ArrayList<>();
            li.forEach(item->{
                Book book1 = new Book();
                Elements a = item.getElementsByTag("a");
                book1.setUrl(a.attr("href"));
                book1.setTitle(a.text());
                Element first1 = item.getElementsByClass("book-top-more").first();
                book1.setStatus(first1.text());
                books1.add(book1);
            });
            map1.put("books",books1);
        }
        data.put("tuijian",map1);
        return data;
    }

    @Override
    public void items(Long id) {

    }

    @Override
    public String mp3(String url) {
        Map<String,Object> params = parseParams(url);
        String url1="http://www.ting74.com/novelsearch/chapter/play.html";
        Map<String,String> headers = new HashMap<>();
        headers.put("Host","www.ting74.com");
        headers.put("Referer","url");
        String s = WebUtils.get(url1, headers, params);

        Document parse = Jsoup.parse(s);
        Elements script = parse.getElementsByTag("script");

        String scriptHtml = "";
        Integer position = -1;
        for (int i=0;i<script.size();i++){
            scriptHtml = script.get(i).data();
            scriptHtml = scriptHtml.replaceAll("\\n","").replaceAll("; ",";");
            position = script.get(i).data().indexOf("key=");
            if(position>0){
                break;
            }
        }
        String[] strs = scriptHtml.split(";");
        Map<String,String> map = new HashMap<>();


        String format = strs[6].replace(" ","");
        String resource = strs[7].replace(" ","");
        map.put(format.split("=")[0],format.split("=")[1]);
        map.put(resource.split("=")[0],resource.split("=")[1]);

        String mp3Url = scriptHtml.substring(scriptHtml.indexOf("mp3:"));
        mp3Url = mp3Url.substring(4,mp3Url.indexOf("}"));
        for (String key:map.keySet()) {
            mp3Url = mp3Url.replaceAll(key,map.get(key));
        }
        mp3Url = mp3Url.replaceAll("'","");
        mp3Url = mp3Url.replaceAll("\\+","");
        mp3Url = mp3Url.replaceAll("\t","");
        System.out.println(mp3Url);
        return mp3Url;
    }

    private Map<String, Object> parseParams(String url) {
        Map<String,Object> params = new HashMap<>();
        String[] split = url.split("/");
        params.put("nid",split[split.length-2]);
        params.put("cid",split[split.length-1].replace(".html","").replace("paly_",""));
        return params;
    }

    private Book worksLi(Element element){
        Book book = new Book();
        Element imgbox = element.getElementsByClass("imgbox").first();
        Element a = imgbox.getElementsByTag("a").first();
        String url = a.attr("href");
        Element imgElement = a.getElementsByTag("img").first();
        String img = imgElement.text();

        Element worksdl = element.getElementsByClass("works-dl").first();
        String title = worksdl.getElementsByClass("book-dt").first().text();
        String content = worksdl.getElementsByClass("book-dd-des").first().text().trim();
        Elements bookAuthor = worksdl.getElementsByClass("book-author");
        Element author = bookAuthor.get(0);
        Element announcer = bookAuthor.get(1);


        book.setUrl(url);
        book.setAuthor(new Author(author.text().trim().replace("作者：","")));
        book.setAnnouncer(new Announcer(announcer.text().trim().replace("演播：","")));
        book.setTitle(title);
        book.setImg(img);
        book.setContent(content);

        return book;
    }


    public static void main(String[] args) throws InterruptedException {
        Ting74Plugin ting74Plugin = new Ting74Plugin();
        //List<Category> category = ting74Plugin.getCategory();
        //System.out.println(category);
        //Map<String, Object> data = ting74Plugin.getCategoryList("http://www.ting74.com/top/allvisit.html");
        List<String> urls = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            String mp3 = ting74Plugin.mp3("http://www.ting74.com/tingshu/7692/paly_12353.html");
            urls.add(mp3);
            Thread.sleep(1000);
        }
        System.out.println(urls);
    }
}
