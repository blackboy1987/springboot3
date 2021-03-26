
Component({
    properties: {
        autoplay:{
            type:Boolean,
            value: true,
        },
        controls:{
            type:Boolean,
            value: true,
        },
        danmuBtn:{
            type:Boolean,
            value: false,
        },
        duration:{
            type:Number,
            value: 0,
        },
        enableDanmu:{
            type:Boolean,
            value: true,
        },
        src:{
            type:String,
            value:'',
        },
        poster:{
            type:String,
            value:'',
        }
    },
    data: {},
    methods: {
        bindEnd:function (e){
            this.triggerEvent('bindEnd',e.detail);
        },
        bindPlay:function (e){
            this.triggerEvent('bindPlay',e.detail);
        },
        bindTimeUpdate:function (e){
            this.triggerEvent('bindTimeUpdate',e.detail);
        },
    }
});
