package com.bootx.app.zhaocha.pojo;

import java.math.BigDecimal;

public class Reward {

    /**
     * 是否开启通过奖励
     */
    private Integer openReward;

    /**
     * 5:0.5,10:0.3,15:0.2
     * 配置参考: 5:0.5,10:0.3,15:0.2 通过英文的冒号:和逗号,进行配置
     * 解释: 第5关得0.5元 第10关得0.3元 15关得0.2元
     */
    private String reward;

    private String unit;

    private BigDecimal maxUnit;

    private String rewardImg;
}
