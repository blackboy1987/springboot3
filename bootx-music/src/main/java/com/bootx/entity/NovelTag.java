
package com.bootx.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity - 文章标签
 * 
 * @author 好源++ Team
 * @version 6.1
 */
@Entity
public class NovelTag extends OrderedEntity<Long> {

	private static final long serialVersionUID = -2735037966597250149L;

	/**
	 * 名称
	 */
	@JsonView(BaseView.class)
	@NotEmpty
	@Length(max = 200)
	@Column(nullable = false)
	private String name;

	/**
	 * 备注
	 */
	@JsonView(BaseView.class)
	@Length(max = 200)
	private String memo;

	/**
	 * 文章
	 */
	@ManyToMany(mappedBy = "novelTags", fetch = FetchType.LAZY)
	private Set<Novel> novels = new HashSet<>();

	/**
	 * 获取名称
	 * 
	 * @return 名称
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置名称
	 * 
	 * @param name
	 *            名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 获取备注
	 * 
	 * @return 备注
	 */
	public String getMemo() {
		return memo;
	}

	/**
	 * 设置备注
	 * 
	 * @param memo
	 *            备注
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}

	public Set<Novel> getNovels() {
		return novels;
	}

	public void setNovels(Set<Novel> novels) {
		this.novels = novels;
	}

	/**
	 * 删除前处理
	 */
	@PreRemove
	public void preRemove() {
		Set<Novel> novels = getNovels();
		if (novels != null) {
			for (Novel novel : novels) {
				novel.getNovelTags().remove(this);
			}
		}
	}

}