package com.bootx.plugin;

import com.bootx.entity.PluginConfig;
import com.bootx.service.PluginConfigService;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.File;
import java.util.List;
import java.util.Map;

public abstract class MusicPlugin implements Comparable<MusicPlugin> {

    @Resource
    private PluginConfigService pluginConfigService;

    /**
     * 获取ID
     *
     * @return ID
     */
    public String getId() {
        return getClass().getAnnotation(Component.class).value();
    }

    /**
     * 获取名称
     *
     * @return 名称
     */
    public abstract String getName();

    /**
     * 获取是否已安装
     *
     * @return 是否已安装
     */
    public boolean getIsInstalled() {
        return pluginConfigService.pluginIdExists(getId());
    }

    /**
     * 获取插件配置
     *
     * @return 插件配置
     */
    public PluginConfig getPluginConfig() {
        return pluginConfigService.findByPluginId(getId());
    }

    /**
     * 获取是否启用
     *
     * @return 是否启用
     */
    public boolean getIsEnabled() {
        PluginConfig pluginConfig = getPluginConfig();
        return pluginConfig != null ? pluginConfig.getIsEnabled() : false;
    }

    /**
     * 获取属性值
     *
     * @param name
     *            属性名称
     * @return 属性值
     */
    public String getAttribute(String name) {
        PluginConfig pluginConfig = getPluginConfig();
        return pluginConfig != null ? pluginConfig.getAttribute(name) : null;
    }

    /**
     * 获取排序
     *
     * @return 排序
     */
    public Integer getOrder() {
        PluginConfig pluginConfig = getPluginConfig();
        return pluginConfig != null ? pluginConfig.getOrder() : null;
    }

    /**
     * 获取分类
     */
    public abstract List<Category> getCategory();


    /**
     * 获取分类
     */
    public abstract Map<String,Object> getCategoryList(String url);

    /**
     * 搜索
     * @param keywords
     */
    public abstract void search(String keywords);


    /**
     * 获取详情
     * @param url
     */
    public abstract Map<String,Object> detail(String url);

    /**
     * 获取MP3下面的章节信息
     * @param id
     */
    public abstract void items(Long id);

    /**
     * 章节信息的播放地址
     * @param url
     */
    public abstract String mp3(String url);



    /**
     * 实现compareTo方法
     *
     * @param musicPlugin
     *            存储插件
     * @return 比较结果
     */
    @Override
    public int compareTo(MusicPlugin musicPlugin) {
        if (musicPlugin == null) {
            return 1;
        }
        return new CompareToBuilder().append(getOrder(), musicPlugin.getOrder()).append(getId(), musicPlugin.getId()).toComparison();
    }

    /**
     * 重写equals方法
     *
     * @param obj
     *            对象
     * @return 是否相等
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        MusicPlugin other = (MusicPlugin) obj;
        return new EqualsBuilder().append(getId(), other.getId()).isEquals();
    }

    /**
     * 重写hashCode方法
     *
     * @return HashCode
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(getId()).toHashCode();
    }

}
