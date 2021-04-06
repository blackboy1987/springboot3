
package com.bootx.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Utils - Bean
 * 
 * @author bootx Team
 * @version 6.1
 */
public final class CmsUtils {


	public static String detail(Long id){
		String url="https://www.hnymwl.com/"+id+".html";
		String s = WebUtils.get(url, null);
		Document parse = Jsoup.parse(s);
		Element bannerMid = parse.getElementsByClass("bannerMid").first();
		if(bannerMid==null){
			return null;
		}
		Elements midTitle = bannerMid.getElementsByClass("midTitle");
		String title = midTitle.text();

		Element first = bannerMid.getElementsByClass("ceo-text-small ceo-text-muted ceo-flex ceo-text-truncate ceo-overflow-auto ceoshop-mall-sc").first();
		Elements span = first.getElementsByTag("span");
		for (int i=0;i<span.size();i++) {
			if(i==0){
				String author = span.get(i).text();
			}else if(i==1){
				String time = span.get(i).text();
			}if(i==2){
				String category = span.get(i).text();
			}
		}

		Element contentstart = bannerMid.getElementById("contentstart");
		try{
			contentstart.getElementsByClass("ceo-ad ceo-ads").remove();
		}catch (Exception e){

		}
		try{


			
			contentstart.getElementsByClass("ceo-video-s").remove();
		}catch (Exception e){

		}
		try{
			contentstart.getElementsByClass("erphpdown").remove();
		}catch (Exception e){

		}


		return title;

	}


	public static void main(String[] args) {
		detail(58662L);
	}

}