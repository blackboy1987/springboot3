package com.bootx.util;

import emoji4j.Emoji;
import emoji4j.EmojiUtils;

public final class EmojiConverterUtils {

    public static String a(String text){
        String str = "  An 😃😀awesome 😃😃string with a few 😃😉emojis!";
        System.out.println(str);
        String alias = EmojiUtils.htmlify(str,true);
        System.out.println(alias);
        System.out.println(EmojiUtils.emojify(alias));
        System.out.println(EmojiUtils.removeAllEmojis(str));
        return alias;
    }

    public static void main(String[] args) {
        a("");
    }

}
