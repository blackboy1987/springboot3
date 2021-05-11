import {post,formatHtml} from "../../utils/util";

Page({
    data:{
        tid:null,
        title:'',
        info:{},
        content:'',
    },
    onLoad(query: Record<string, string | undefined>) {
        console.log("query",query);
        this.setData(query);
        this.getlist();
    },
    getlist: function() {
        const root = this;
        if(root.data.tid){
            post("getlist",{
                tid:root.data.tid,
            },response => {
                console.log(formatHtml(response.data.content));
                root.setData({
                    info: response.data,
                    content: formatHtml(response.data.content),
                })
            });
        }
    },
})
