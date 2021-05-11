import { get} from "../../utils/util";

Page({
    data:{
        typeList: [],
        wu: true,
        appConfig: wx.getStorageSync("appConfig") || {},
    },
    onLoad() {
        this.type();
    },


    type:function (){
        const root = this;
        get("type",response => {
            root.setData({
                typeList: response.data ||[]
            })
        })
    },
    openWin: function(n) {
        wx.navigateTo({
            url: "/pages/type/list/list?tid=" + n.currentTarget.dataset.id
        });
    }
})
