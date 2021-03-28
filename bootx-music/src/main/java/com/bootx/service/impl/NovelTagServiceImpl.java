
package com.bootx.service.impl;

import com.bootx.common.Filter;
import com.bootx.common.Order;
import com.bootx.dao.NovelTagDao;
import com.bootx.entity.NovelTag;
import com.bootx.service.NovelTagService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Service - 文章标签
 * 
 * @author 好源++ Team
 * @version 6.1
 */
@Service
public class NovelTagServiceImpl extends BaseServiceImpl<NovelTag, Long> implements NovelTagService {

	@Resource
	private NovelTagDao novelTagDao;

	@Override
	@Transactional(readOnly = true)
	@Cacheable(value = "novelTag", condition = "#useCache")
	public List<NovelTag> findList(Integer count, List<Filter> filters, List<Order> orders, boolean useCache) {
		return novelTagDao.findList(null, count, filters, orders);
	}

	@Override
	public NovelTag findByName(String name) {
		return novelTagDao.find("name",name);
	}

	@Override
	@Transactional
	@CacheEvict(value = "novelTag", allEntries = true)
	public NovelTag save(NovelTag novelTag) {
		return super.save(novelTag);
	}

	@Override
	@Transactional
	@CacheEvict(value = "novelTag", allEntries = true)
	public NovelTag update(NovelTag novelTag) {
		return super.update(novelTag);
	}

	@Override
	@Transactional
	@CacheEvict(value = "novelTag", allEntries = true)
	public NovelTag update(NovelTag novelTag, String... ignoreProperties) {
		return super.update(novelTag, ignoreProperties);
	}

	@Override
	@Transactional
	@CacheEvict(value = "novelTag", allEntries = true)
	public void delete(Long id) {
		super.delete(id);
	}

	@Override
	@Transactional
	@CacheEvict(value = "novelTag", allEntries = true)
	public void delete(Long... ids) {
		super.delete(ids);
	}

	@Override
	@Transactional
	@CacheEvict(value = "novelTag", allEntries = true)
	public void delete(NovelTag novelTag) {
		super.delete(novelTag);
	}

}