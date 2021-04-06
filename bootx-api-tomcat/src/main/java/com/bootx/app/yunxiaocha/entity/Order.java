package com.bootx.app.yunxiaocha.entity;

import com.bootx.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "yunxiaocha_order")
public class Order extends BaseEntity<Long> {
}
