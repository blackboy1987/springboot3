
package com.bootx.dao.impl;

import com.bootx.dao.NovelCategoryDao;
import com.bootx.entity.NovelCategory;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.springframework.stereotype.Repository;

import javax.persistence.TypedQuery;
import java.util.*;

/**
 * Dao - 文章分类
 * 
 * @author 好源++ Team
 * @version 6.1
 */
@Repository
public class NovelCategoryDaoImpl extends BaseDaoImpl<NovelCategory, Long> implements NovelCategoryDao {

	@Override
	public List<NovelCategory> findRoots(Integer count) {
		String jpql = "select novelCategory from NovelCategory novelCategory where novelCategory.parent is null order by novelCategory.order asc";
		TypedQuery<NovelCategory> query = entityManager.createQuery(jpql, NovelCategory.class);
		if (count != null) {
			query.setMaxResults(count);
		}
		return query.getResultList();
	}

	@Override
	public List<NovelCategory> findParents(NovelCategory novelCategory, boolean recursive, Integer count) {
		if (novelCategory == null || novelCategory.getParent() == null) {
			return Collections.emptyList();
		}
		TypedQuery<NovelCategory> query;
		if (recursive) {
			String jpql = "select novelCategory from NovelCategory novelCategory where novelCategory.id in (:ids) order by novelCategory.grade asc";
			query = entityManager.createQuery(jpql, NovelCategory.class).setParameter("ids", Arrays.asList(novelCategory.getParentIds()));
		} else {
			String jpql = "select novelCategory from NovelCategory novelCategory where novelCategory = :novelCategory";
			query = entityManager.createQuery(jpql, NovelCategory.class).setParameter("novelCategory", novelCategory.getParent());
		}
		if (count != null) {
			query.setMaxResults(count);
		}
		return query.getResultList();
	}

	@Override
	public List<NovelCategory> findChildren(NovelCategory novelCategory, boolean recursive, Integer count) {
		TypedQuery<NovelCategory> query;
		if (recursive) {
			if (novelCategory != null) {
				String jpql = "select novelCategory from NovelCategory novelCategory where novelCategory.treePath like :treePath order by novelCategory.grade asc, novelCategory.order asc";
				query = entityManager.createQuery(jpql, NovelCategory.class).setParameter("treePath", "%" + NovelCategory.TREE_PATH_SEPARATOR + novelCategory.getId() + NovelCategory.TREE_PATH_SEPARATOR + "%");
			} else {
				String jpql = "select novelCategory from NovelCategory novelCategory order by novelCategory.grade asc, novelCategory.order asc";
				query = entityManager.createQuery(jpql, NovelCategory.class);
			}
			if (count != null) {
				query.setMaxResults(count);
			}
			List<NovelCategory> result = query.getResultList();
			sort(result);
			return result;
		} else {
			String jpql = "select novelCategory from NovelCategory novelCategory where novelCategory.parent = :parent order by novelCategory.order asc";
			query = entityManager.createQuery(jpql, NovelCategory.class).setParameter("parent", novelCategory);
			if (count != null) {
				query.setMaxResults(count);
			}
			return query.getResultList();
		}
	}

	/**
	 * 排序文章分类
	 * 
	 * @param novelCategories
	 *            文章分类
	 */
	private void sort(List<NovelCategory> novelCategories) {
		if (CollectionUtils.isEmpty(novelCategories)) {
			return;
		}
		final Map<Long, Integer> orderMap = new HashMap<>();
		for (NovelCategory novelCategory : novelCategories) {
			orderMap.put(novelCategory.getId(), novelCategory.getOrder());
		}
		Collections.sort(novelCategories, new Comparator<NovelCategory>() {
			@Override
			public int compare(NovelCategory novelCategory1, NovelCategory novelCategory2) {
				Long[] ids1 = (Long[]) ArrayUtils.add(novelCategory1.getParentIds(), novelCategory1.getId());
				Long[] ids2 = (Long[]) ArrayUtils.add(novelCategory2.getParentIds(), novelCategory2.getId());
				Iterator<Long> iterator1 = Arrays.asList(ids1).iterator();
				Iterator<Long> iterator2 = Arrays.asList(ids2).iterator();
				CompareToBuilder compareToBuilder = new CompareToBuilder();
				while (iterator1.hasNext() && iterator2.hasNext()) {
					Long id1 = iterator1.next();
					Long id2 = iterator2.next();
					Integer order1 = orderMap.get(id1);
					Integer order2 = orderMap.get(id2);
					compareToBuilder.append(order1, order2).append(id1, id2);
					if (!iterator1.hasNext() || !iterator2.hasNext()) {
						compareToBuilder.append(novelCategory1.getGrade(), novelCategory2.getGrade());
					}
				}
				return compareToBuilder.toComparison();
			}
		});
	}

}