/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: localhost
 * License: localhost/license
 * FileId: 9V9LoiZyUG5leqPJQsfe2+X7W9qBrPNs
 */
package com.bootx.service.impl;


import com.bootx.plugin.MusicPlugin;
import com.bootx.service.PluginService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * Service - 插件
 * 
 * @author 好源++ Team
 * @version 6.1
 */
@Service
public class PluginServiceImpl implements PluginService {

	@Resource
	private List<MusicPlugin> musicPlugins = new ArrayList<>();
	@Resource
	private Map<String, MusicPlugin> musicPluginMap = new HashMap<>();


	@Override
	public List<MusicPlugin> getMusicPlugins() {
		Collections.sort(musicPlugins);
		return musicPlugins;
	}

	@Override
	public List<MusicPlugin> getMusicPlugins(boolean isEnabled) {
		List<MusicPlugin> result = new ArrayList<>();
		CollectionUtils.select(musicPlugins, new Predicate() {
			public boolean evaluate(Object object) {
				MusicPlugin musicPlugin = (MusicPlugin) object;
				return musicPlugin.getIsEnabled() == isEnabled;
			}
		}, result);
		Collections.sort(result);
		return result;
	}

	@Override
	public MusicPlugin getMusicPlugin(String id) {
		return musicPluginMap.get(id);
	}
}