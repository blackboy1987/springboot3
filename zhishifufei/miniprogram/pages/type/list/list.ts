import {post} from "../../../utils/util";

Page({
    data:{
        page:1,
        tid:1,
        list:[],
        load:'上拉加载更多',
    },
    onLoad:function (e:any){
        this.setData({
            tid:e.tid,
        })
        wx.showLoading({
            title: "加载中",
            mask: true
        }).then();
        this.leibiao(this.data.page);
        wx.hideLoading().then();
    },
    leibiao:function (page: number){
        const root = this;
        post("leibiao",{page,tid:root.data.tid},response => {
            if(response.data.length>0){
                root.setData({

                })
            }else{

            }
            if(page===1){
                root.setData({
                    list: response.data,
                    page: root.data.page+1,
                    load:response.data.length>0?'上拉加载更多':'~~·我是有底线的人·~~'
                });
            }else{
                root.setData({
                    list: root.data.list.concat(response.data),
                    page: root.data.page+1,
                    load:response.data.length>0?'上拉加载更多':'~~·我是有底线的人·~~'
                });
            }
        });
    },
    onReachBottom: function() {
       const root = this;
       root.leibiao(root.data.page);
    },
    openWin: function(e:{currentTarget:{dataset:{id: number,title: string}}}) {
        wx.navigateTo({
            url: "/pages/details/details?tid=" + e.currentTarget.dataset.id + "&title=" + e.currentTarget.dataset.title
        });
    },

})
