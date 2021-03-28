package com.bootx.service;

public interface RedisService {

    void set(String key,String value);

    String get(String key);

    Boolean remove(String key);

    boolean hasKey(String key);

    <T> T get(String key,Class<T> t);

}
