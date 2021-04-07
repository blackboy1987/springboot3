
package com.bootx.dao;

import com.bootx.entity.NovelCategory;

import java.util.List;

/**
 * Dao - 文章分类
 * 
 * @author 好源++ Team
 * @version 6.1
 */
public interface NovelCategoryDao extends BaseDao<NovelCategory, Long> {

	/**
	 * 查找顶级文章分类
	 * 
	 * @param count
	 *            数量
	 * @return 顶级文章分类
	 */
	List<NovelCategory> findRoots(Integer count);

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

}