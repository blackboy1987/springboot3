
package com.bootx.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
	@JsonView({PageView.class,EditView.class})
	private String orderSn;

	private Long appId;

	private Long adminId;

	@JsonView({PageView.class})
	@NotNull
	@Min(0)
	@Column(nullable = false)
	private Integer days;

	@JsonView({PageView.class})
	@NotNull
	@Column(nullable = false)
	private Boolean isUsed;

	@Transient
	@JsonView({PageView.class})
	private String username;

	@Transient
	@JsonView({PageView.class})
	private String appName;

	@JsonView({PageView.class})
	private String orderName;

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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getOrderName() {
		return orderName;
	}

	public void setOrderName(String orderName) {
		this.orderName = orderName;
	}
}