package com.bootx.util;


import com.bootx.controller.wechat.WeChatUser;
import com.bootx.util.wechat.AccessToken;
import com.bootx.util.wechat.AccessToken1;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

public class EhCacheUtils {

    private static final CacheManager cacheManager = CacheManager.create();
    private static final Cache accessTokenCache = cacheManager.getCache("accessToken");
    private static final Cache accessToken1Cache = cacheManager.getCache("accessToken1");
    private static final Cache wechatUserCache = cacheManager.getCache("wechatUser");


    public static AccessToken getAccessToken(String key){
        if(accessTokenCache!=null){
            Element element = accessTokenCache.get("accessToken");
            if(element==null){
                return null;
            }else{
                Object result = element.getObjectValue();
                if(result==null){
                    return null;
                }
                return (AccessToken)result;
            }
        }else{
            return null;
        }
    }

    public static void setAccessToken(String key, AccessToken accessToken){
        if(accessTokenCache!=null&&accessToken!=null){
            accessTokenCache.put(new Element(key,accessToken,accessToken.getExpiresIn()-100,accessToken.getExpiresIn()-100));
        }
    }

    public static void removeAccessToken(String key){
        if(accessToken1Cache!=null){
            accessToken1Cache.remove(key);
        }
    }







    public static AccessToken1 getCacheAccessToken1(){
        if(accessToken1Cache!=null){
            Element element = accessToken1Cache.get("accessToken");
            if(element==null){
                return null;
            }else{
                Object result = element.getObjectValue();
                if(result==null){
                    return null;
                }
                return (AccessToken1)result;
            }
        }else{
            return null;
        }
    }

    public static void setCacheAccessToken1(AccessToken1 accessToken){
        if(accessToken1Cache!=null&&accessToken!=null){
            accessToken1Cache.put(new Element("accessToken",accessToken,Integer.parseInt(accessToken.getExpires()+"")-100,Integer.parseInt(accessToken.getExpires()+"")-100));
        }
    }

    public static void removeCacheAccessToken1(){
        if(accessToken1Cache!=null){
            accessToken1Cache.remove("accessToken");
        }
    }



    public static WeChatUser getCacheWechatUser(String ticket){
        if(wechatUserCache!=null){
            Element element = wechatUserCache.get(ticket);
            if(element==null){
                return null;
            }else{
                Object result = element.getObjectValue();
                if(result==null){
                    return null;
                }
                return (WeChatUser)result;
            }
        }else{
            return null;
        }
    }

    public static void setCacheWechatUserCache(WeChatUser weChatUser){
        if(wechatUserCache!=null&&weChatUser!=null){
            wechatUserCache.put(new Element(weChatUser.getTicket(),weChatUser));
        }
    }

    public static void removeCacheWechatUserCache(){
        if(wechatUserCache!=null){
            wechatUserCache.remove("accessToken");
        }
    }

}
