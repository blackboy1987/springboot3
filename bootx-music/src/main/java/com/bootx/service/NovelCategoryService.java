
package com.bootx.service;


import com.bootx.entity.NovelCategory;

import java.util.List;

/**
 * Service - 文章分类
 * 
 * @author 好源++ Team
 * @version 6.1
 */
public interface NovelCategoryService extends BaseService<NovelCategory, Long> {

	/**
	 * 查找顶级文章分类
	 * 
	 * @return 顶级文章分类
	 */
	List<NovelCategory> findRoots();

	/**
	 * 查找顶级文章分类
	 * 
	 * @param count
	 *            数量
	 * @return 顶级文章分类
	 */
	List<NovelCategory> findRoots(Integer count);

	/**
	 * 查找顶级文章分类
	 * 
	 * @param count
	 *            数量
	 * @param useCache
	 *            是否使用缓存
	 * @return 顶级文章分类
	 */
	List<NovelCategory> findRoots(Integer count, boolean useCache);

	/**
	 * 查找上级文章分类
	 * 
	 * @param novelCategory
	 *            文章分类
	 * @param recursive
	 *            是否递归
	 * @param count
	 *            数量
	 * @return 上级文章分类
	 */
	List<NovelCategory> findParents(NovelCategory novelCategory, boolean recursive, Integer count);

	/**
	 * 查找上级文章分类
	 * 
	 * @param novelCategoryId
	 *            文章分类ID
	 * @param recursive
	 *            是否递归
	 * @param count
	 *            数量
	 * @param useCache
	 *            是否使用缓存
	 * @return 上级文章分类
	 */
	List<NovelCategory> findParents(Long novelCategoryId, boolean recursive, Integer count, boolean useCache);

	/**
	 * 查找文章分类树
	 * 
	 * @return 文章分类树
	 */
	List<NovelCategory> findTree();

	/**
	 * 查找下级文章分类
	 * 
	 * @param novelCategory
	 *            文章分类
	 * @param recursive
	 *            是否递归
	 * @param count
	 *            数量
	 * @return 下级文章分类
	 */
	List<NovelCategory> findChildren(NovelCategory novelCategory, boolean recursive, Integer count);

	/**
	 * 查找下级文章分类
	 * 
	 * @param novelCategoryId
	 *            文章分类ID
	 * @param recursive
	 *            是否递归
	 * @param count
	 *            数量
	 * @param useCache
	 *            是否使用缓存
	 * @return 下级文章分类
	 */
	List<NovelCategory> findChildren(Long novelCategoryId, boolean recursive, Integer count, boolean useCache);

	NovelCategory findByName(String name);
}