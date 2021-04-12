package com.bootx.util;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;

public final class EhCacheUtils {

    public static final Ehcache novelCategoryCache = CacheManager.create().getEhcache("novelCategory");

    public static final Ehcache novelListCache = CacheManager.create().getEhcache("novelList");

    public static final Ehcache novelDetailCache = CacheManager.create().getEhcache("novelDetail");

    public static final Ehcache novelItemsCache = CacheManager.create().getEhcache("novelItems");


    public static void setNovelCategory(String key,Object value){
        novelCategoryCache.put(new Element(key,value));
    }


    public static void setNovelList(String key,Object value){
        novelListCache.put(new Element(key,value));
    }
    public static void setNovelDetail(String key,Object value){
        novelDetailCache.put(new Element(key,value));
    }
    public static void setNovelItems(String key,Object value){
        novelItemsCache.put(new Element(key,value));
    }

    public static <T> T getNovelCategory(String key,Class<T> valueType){
        Element element = novelCategoryCache.get(key);
        if(element==null){
            return null;
        }
        Object objectValue = element.getObjectValue();
        try {
            return JsonUtils.toObject(JsonUtils.toJson(objectValue),valueType);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public static <T> T getNovelList(String key,Class<T> valueType){
        Element element = novelListCache.get(key);
        if(element==null){
            return null;
        }
        Object objectValue = element.getObjectValue();
        try {
            return JsonUtils.toObject(JsonUtils.toJson(objectValue),valueType);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    public static <T> T getNovelDetail(String key,Class<T> valueType){
        Element element = novelDetailCache.get(key);
        if(element==null){
            return null;
        }
        Object objectValue = element.getObjectValue();
        try {
            return JsonUtils.toObject(JsonUtils.toJson(objectValue),valueType);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    public static <T> T getNovelItems(String key,Class<T> valueType){
        Element element = novelItemsCache.get(key);
        if(element==null){
            return null;
        }
        Object objectValue = element.getObjectValue();
        try {
            return JsonUtils.toObject(JsonUtils.toJson(objectValue),valueType);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public static void removeNovelCategory(String key){
        novelCategoryCache.remove(key);
    }

    public static void removeNovelList(String key){
        novelListCache.remove(key);
    }
    public static void removeNovelDetail(String key){
        novelDetailCache.remove(key);
    }
    public static void removeNovelItems(String key){
        novelItemsCache.remove(key);
    }
}
