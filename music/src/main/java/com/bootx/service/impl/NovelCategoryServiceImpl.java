
package com.bootx.service.impl;

import com.bootx.dao.NovelCategoryDao;
import com.bootx.entity.NovelCategory;
import com.bootx.service.NovelCategoryService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;

/**
 * Service - 文章分类
 * 
 * @author 好源++ Team
 * @version 6.1
 */
@Service
public class NovelCategoryServiceImpl extends BaseServiceImpl<NovelCategory, Long> implements NovelCategoryService {

	@Resource
	private NovelCategoryDao novelCategoryDao;

	@Override
	@Transactional(readOnly = true)
	public List<NovelCategory> findRoots() {
		return novelCategoryDao.findRoots(null);
	}

	@Override
	@Transactional(readOnly = true)
	public List<NovelCategory> findRoots(Integer count) {
		return novelCategoryDao.findRoots(count);
	}

	@Override
	@Transactional(readOnly = true)
	@Cacheable(value = "novelCategory", condition = "#useCache")
	public List<NovelCategory> findRoots(Integer count, boolean useCache) {
		return novelCategoryDao.findRoots(count);
	}

	@Override
	@Transactional(readOnly = true)
	public List<NovelCategory> findParents(NovelCategory novelCategory, boolean recursive, Integer count) {
		return novelCategoryDao.findParents(novelCategory, recursive, count);
	}

	@Override
	@Transactional(readOnly = true)
	@Cacheable(value = "novelCategory", condition = "#useCache")
	public List<NovelCategory> findParents(Long novelCategoryId, boolean recursive, Integer count, boolean useCache) {
		NovelCategory novelCategory = novelCategoryDao.find(novelCategoryId);
		if (novelCategoryId != null && novelCategory == null) {
			return Collections.emptyList();
		}
		return novelCategoryDao.findParents(novelCategory, recursive, count);
	}

	@Override
	@Transactional(readOnly = true)
	public List<NovelCategory> findTree() {
		return novelCategoryDao.findChildren(null, true, null);
	}

	@Override
	@Transactional(readOnly = true)
	public List<NovelCategory> findChildren(NovelCategory novelCategory, boolean recursive, Integer count) {
		return novelCategoryDao.findChildren(novelCategory, recursive, count);
	}

	@Override
	@Transactional(readOnly = true)
	@Cacheable(value = "novelCategory", condition = "#useCache")
	public List<NovelCategory> findChildren(Long novelCategoryId, boolean recursive, Integer count, boolean useCache) {
		NovelCategory novelCategory = novelCategoryDao.find(novelCategoryId);
		if (novelCategoryId != null && novelCategory == null) {
			return Collections.emptyList();
		}
		return novelCategoryDao.findChildren(novelCategory, recursive, count);
	}

	@Override
	public NovelCategory findByName(String name) {
		return novelCategoryDao.find("name",name);
	}

	@Override
	@Transactional
	@CacheEvict(value = { "novel", "novelCategory" }, allEntries = true)
	public NovelCategory save(NovelCategory novelCategory) {
		Assert.notNull(novelCategory, "[Assertion failed] - novelCategory is required; it must not be null");

		setValue(novelCategory);
		return super.save(novelCategory);
	}

	@Override
	@Transactional
	@CacheEvict(value = { "novel", "novelCategory" }, allEntries = true)
	public NovelCategory update(NovelCategory novelCategory) {
		Assert.notNull(novelCategory, "[Assertion failed] - novelCategory is required; it must not be null");

		setValue(novelCategory);
		for (NovelCategory children : novelCategoryDao.findChildren(novelCategory, true, null)) {
			setValue(children);
		}
		return super.update(novelCategory);
	}

	@Override
	@Transactional
	@CacheEvict(value = { "novel", "novelCategory" }, allEntries = true)
	public NovelCategory update(NovelCategory novelCategory, String... ignoreProperties) {
		return super.update(novelCategory, ignoreProperties);
	}

	@Override
	@Transactional
	@CacheEvict(value = { "novel", "novelCategory" }, allEntries = true)
	public void delete(Long id) {
		super.delete(id);
	}

	@Override
	@Transactional
	@CacheEvict(value = { "novel", "novelCategory" }, allEntries = true)
	public void delete(Long... ids) {
		super.delete(ids);
	}

	@Override
	@Transactional
	@CacheEvict(value = { "novel", "novelCategory" }, allEntries = true)
	public void delete(NovelCategory novelCategory) {
		super.delete(novelCategory);
	}

	/**
	 * 设置值
	 * 
	 * @param novelCategory
	 *            文章分类
	 */
	private void setValue(NovelCategory novelCategory) {
		if (novelCategory == null) {
			return;
		}
		NovelCategory parent = novelCategory.getParent();
		if (parent != null) {
			novelCategory.setTreePath(parent.getTreePath() + parent.getId() + NovelCategory.TREE_PATH_SEPARATOR);
		} else {
			novelCategory.setTreePath(NovelCategory.TREE_PATH_SEPARATOR);
		}
		novelCategory.setGrade(novelCategory.getParentIds().length);
	}

}