Component({
    data:{
        showTip: true,
        tip:'点击「添加到我的小程序」，下次访问更便捷',
    },
    methods:{
        hide:function (){
            this.setData({
                showTip:false,
            })
        }
    }
})
