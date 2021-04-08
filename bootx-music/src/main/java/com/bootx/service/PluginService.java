
package com.bootx.service;

import com.bootx.plugin.MusicPlugin;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Service - 插件
 * 
 * @author 好源++ Team
 * @version 6.1
 */
public interface PluginService {

	/**
	 * 获取支付插件
	 * 
	 * @return 支付插件
	 */
	List<MusicPlugin> getMusicPlugins();

	/**
	 * 获取支付插件
	 *
	 * @param isEnabled
	 *            是否启用
	 * @return 支付插件
	 */
	List<MusicPlugin> getMusicPlugins(boolean isEnabled);

	/**
	 * 获取支付插件
	 * 
	 * @param id
	 *            ID
	 * @return 支付插件
	 */
	MusicPlugin getMusicPlugin(String id);


}