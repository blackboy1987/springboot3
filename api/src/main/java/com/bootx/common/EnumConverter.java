
package com.bootx.common;

import org.apache.commons.beanutils.converters.AbstractConverter;
import org.springframework.util.Assert;

/**
 * 枚举类型转换
 * 
 * @author IGOMALL  Team
 * @version 1.0
 */
public class EnumConverter extends AbstractConverter {

	/**
	 * 默认类型
	 */
	private Class<?> defaultType;

	/**
	 * 构造方法
	 * 
	 * @param defaultType
	 *            默认类型
	 */
	public EnumConverter(Class<?> defaultType) {
		Assert.notNull(defaultType,"");

		this.defaultType = defaultType;
	}

	/**
	 * 类型转换
	 * 
	 * @param type
	 *            类型
	 * @param value
	 *            值
	 * @return 对象
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected <T> T convertToType(Class<T> type, Object value) throws Throwable {
		return (T) Enum.valueOf((Class<Enum>) type, value.toString());
	}

	/**
	 * 获取默认类型
	 * 
	 * @return 默认类型
	 */
	@Override
	protected Class<?> getDefaultType() {
		return defaultType;
	}

}