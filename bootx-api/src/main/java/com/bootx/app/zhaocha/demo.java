package com.bootx.app.zhaocha;

import com.bootx.app.zhaocha.entity.Rank;
import com.bootx.util.JsonUtils;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.List;

public class demo {

    public static String str = "[{\"rank\":17,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg17.png\",\"name\":\"超强王者\",\"title\":\"完成关卡2295\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank17.png\"},{\"rank\":16,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg16.png\",\"name\":\"超凡宗师\",\"title\":\"完成关卡1695\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank16.png\"},{\"rank\":15,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg15.png\",\"name\":\"超凡宗师\",\"title\":\"完成关卡1245\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank15.png\"},{\"rank\":14,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg14.png\",\"name\":\"卓越大师\",\"title\":\"完成关卡945\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank14.png\"},{\"rank\":13,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg13.png\",\"name\":\"如炬钻石\",\"title\":\"完成关卡795\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank13.png\"},{\"rank\":12,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg12.png\",\"name\":\"睿智翡翠\",\"title\":\"完成关卡645\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank12.png\"},{\"rank\":11,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg11.png\",\"name\":\"精英振金\",\"title\":\"完成关卡495\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank11.png\"},{\"rank\":10,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg10.png\",\"name\":\"璀璨铂金\",\"title\":\"完成关卡369\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank10.png\"},{\"rank\":9,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg9.png\",\"name\":\"卓越黄金\",\"title\":\"完成关卡269\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank9.png\"},{\"rank\":8,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg8.png\",\"name\":\"杰出白银\",\"title\":\"完成关卡189\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank8.png\"},{\"rank\":7,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg7.png\",\"name\":\"优秀黄铜\",\"title\":\"完成关卡129\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank7.png\"},{\"rank\":6,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg6.png\",\"name\":\"机敏青铜\",\"title\":\"完成关卡69\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank6.png\"},{\"rank\":5,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg5.png\",\"name\":\"坚毅玄铁\",\"title\":\"完成关卡39\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank5.png\"},{\"rank\":4,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg4.png\",\"name\":\"倔犟寒铁\",\"title\":\"完成关卡15\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank4.png\"},{\"rank\":3,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg3.png\",\"name\":\"不屈黑铁\",\"title\":\"完成关卡6\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank3.png\"},{\"rank\":2,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg2.png\",\"name\":\"菜鸟铸铁\",\"title\":\"完成关卡2\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank2.png\"},{\"rank\":1,\"img\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/dg1.png\",\"name\":\"入门新手\",\"title\":\"完成关卡0\",\"rankImg\":\"https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/rank/rank1.png\"}]";


    public static void main(String[] args) {
        List<Rank> ranks = JsonUtils.toObject(str, new TypeReference<List<Rank>>() {
        });


        System.out.println(ranks);
    }

}
