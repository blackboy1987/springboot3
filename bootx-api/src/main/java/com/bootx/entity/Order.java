
package com.bootx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

/**
 * Entity - 管理员
 * 
 * @author 好源++ Team
 * @version 6.1
 */
@Entity
@Table(name = "orders")
public class Order extends BaseEntity<Long> {

	@NotEmpty
	@Column(nullable = false,updatable = false,unique = true)
	private String orderSn;

	private Long appId;

	private Long adminId;

	private Integer days;

	private Boolean isUsed;

	public String getOrderSn() {
		return orderSn;
	}

	public void setOrderSn(String orderSn) {
		this.orderSn = orderSn;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public Long getAdminId() {
		return adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

	public Integer getDays() {
		return days;
	}

	public void setDays(Integer days) {
		this.days = days;
	}

	public Boolean getIsUsed() {
		return isUsed;
	}

	public void setIsUsed(Boolean isUsed) {
		this.isUsed = isUsed;
	}
}