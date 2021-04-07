package com.bootx.util;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import org.apache.commons.logging.LogFactory;

import java.nio.charset.Charset;
import java.util.logging.Level;

public class CrawUtils {


    public static String testUserHttpUnit(String url,Integer timeout){

        try{
            //构造一个webClient 模拟Chrome 浏览器
            WebClient webClient = new WebClient(BrowserVersion.CHROME);
//屏蔽日志信息
            LogFactory.getFactory().setAttribute("org.apache.commons.logging.Log",
                    "org.apache.commons.logging.impl.NoOpLog");
            java.util.logging.Logger.getLogger("com.gargoylesoftware").setLevel(Level.OFF);
//支持JavaScript
            webClient.getOptions().setJavaScriptEnabled(true);
            webClient.getOptions().setCssEnabled(false);
            webClient.getOptions().setActiveXNative(false);
            webClient.getOptions().setCssEnabled(false);
            webClient.getOptions().setThrowExceptionOnScriptError(false);
            webClient.getOptions().setThrowExceptionOnFailingStatusCode(false);
            webClient.getOptions().setTimeout(timeout);
            HtmlPage rootPage = webClient.getPage(url);
//设置一个运行JavaScript的时间
            webClient.waitForBackgroundJavaScript(5000);
            String html = rootPage.asXml();
            html = new String(html.getBytes(), Charset.forName("gbk"));
            return html;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }


    public static void main(String[] args) {
        String url="https://www.tingchina.com/yousheng/30854/play_30854_0.htm";
        String s = testUserHttpUnit(url, 5000);
        System.out.println(s);
    }


}
