package com.bootx.member.entity;

import com.bootx.common.BaseAttributeConverter;
import com.bootx.entity.BaseEntity;
import emoji4j.EmojiUtils;
import org.apache.commons.lang3.StringUtils;
import org.bouncycastle.jcajce.provider.digest.MD2;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.*;

@Entity
public class Member extends BaseEntity<Long> {

    /**
     * 树路径分隔符
     */
    public static final String TREE_PATH_SEPARATOR = ",";

    @NotNull
    @Column(nullable = false,updatable = false,unique = true)
    private String openId;

    @NotNull
    @Column(updatable = false,nullable = false)
    private Long appId;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    @JoinColumn(nullable = false)
    private MemberRank memberRank;

    private String nickName;

    private String sessionKey;

    private String token;

    private String unionid;

    private Integer gender;

    private String city;

    private String province;

    private String country;

    private String avatarUrl;

    /**
     * 是否认证过，如果用户主动点击获取用户信息之后，设置为true
     */
    private Boolean isAuth;

    /**
     * 积分
     */
    @Column(nullable = false)
    private Long point;

    /**
     * 余额
     */
    @Column(nullable = false, precision = 27, scale = 12)
    private BigDecimal balance;

    @Column(nullable = false, precision = 27, scale = 12)
    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.EAGER)
    private Member parent;

    @OneToMany(mappedBy = "parent",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Set<Member> children = new HashSet<>();

    @NotNull
    @Column(nullable = false)
    private Integer grade;

    /**
     * 树路径
     */
    @Column(nullable = false)
    private String treePath;

    @Min(0)
    @NotNull
    @Column(nullable = false)
    private Integer level;

    @Min(1)
    @NotNull
    @Column(nullable = false)
    private Integer rank;

    @Min(0)
    @NotNull
    @Column(nullable = false)
    private Integer gold;

    @Min(0)
    @NotNull
    @Column(nullable = false)
    private Integer ticket;

    @NotNull
    @Column(nullable = false)
    private Date updateDate;

    @NotNull
    @Convert(converter = ConfigConfigConvert.class)
    @Column(length = 3000,nullable = false)
    private Map<String,String> config = new HashMap<>();

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public Long getAppId() {
        return appId;
    }

    public void setAppId(Long appId) {
        this.appId = appId;
    }

    public MemberRank getMemberRank() {
        return memberRank;
    }

    public void setMemberRank(MemberRank memberRank) {
        this.memberRank = memberRank;
    }

    public String getNickName() {
       if(StringUtils.isNotBlank(nickName)){
           nickName = EmojiUtils.removeAllEmojis(nickName);
       }
        return nickName;
    }

    public void setNickName(String nickName) {
        if(StringUtils.isNotBlank(nickName)){
            nickName = EmojiUtils.removeAllEmojis(nickName);
        }
        this.nickName = nickName;
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUnionid() {
        return unionid;
    }

    public void setUnionid(String unionid) {
        this.unionid = unionid;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Boolean getIsAuth() {
        return isAuth;
    }

    public void setIsAuth(Boolean isAuth) {
        this.isAuth = isAuth;
    }

    public Long getPoint() {
        return point;
    }

    public void setPoint(Long point) {
        this.point = point;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Member getParent() {
        return parent;
    }

    public void setParent(Member parent) {
        this.parent = parent;
    }

    public Set<Member> getChildren() {
        return children;
    }

    public void setChildren(Set<Member> children) {
        this.children = children;
    }

    public Integer getGrade() {
        return grade;
    }

    /**
     * 获取树路径
     *
     * @return 树路径
     */
    public String getTreePath() {
        return treePath;
    }

    /**
     * 设置树路径
     *
     * @param treePath
     *            树路径
     */
    public void setTreePath(String treePath) {
        this.treePath = treePath;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public Integer getGold() {
        return gold;
    }

    public void setGold(Integer gold) {
        this.gold = gold;
    }

    public Integer getTicket() {
        return ticket;
    }

    public void setTicket(Integer ticket) {
        this.ticket = ticket;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Map<String, String> getConfig() {
        return config;
    }

    public void setConfig(Map<String, String> config) {
        this.config = config;
    }

    /**
     * 获取所有上级地区ID
     *
     * @return 所有上级地区ID
     */
    @Transient
    public Long[] getParentIds() {
        String[] parentIds = StringUtils.split(getTreePath(), TREE_PATH_SEPARATOR);
        Long[] result = new Long[parentIds.length];
        for (int i = 0; i < parentIds.length; i++) {
            result[i] = Long.valueOf(parentIds[i]);
        }
        return result;
    }

    /**
     * 获取所有上级地区
     *
     * @return 所有上级地区
     */
    @Transient
    public List<Member> getParents() {
        List<Member> parents = new ArrayList<>();
        recursiveParents(parents, this);
        return parents;
    }

    /**
     * 递归上级地区
     *
     * @param parents
     *            上级地区
     * @param area
     *            地区
     */
    private void recursiveParents(List<Member> parents, Member member) {
        if (member == null) {
            return;
        }
        Member parent = member.getParent();
        if (parent != null) {
            parents.add(0, parent);
            recursiveParents(parents, parent);
        }
    }

    @Convert
    public static class ConfigConfigConvert extends BaseAttributeConverter<Map<String,String>> {

    }
}
