"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../utils/util");
Page({
    data: {
        page: 1,
        tid: 1,
        list: [],
        load: '上拉加载更多',
    },
    onLoad: function (e) {
        this.setData({
            tid: e.tid,
        });
        wx.showLoading({
            title: "加载中",
            mask: true
        }).then();
        this.leibiao(this.data.page);
        wx.hideLoading().then();
    },
    leibiao: function (page) {
        var root = this;
        util_1.post("leibiao", { page: page, tid: root.data.tid }, function (response) {
            if (response.data.length > 0) {
                root.setData({});
            }
            else {
            }
            if (page === 1) {
                root.setData({
                    list: response.data,
                    page: root.data.page + 1,
                    load: response.data.length > 0 ? '上拉加载更多' : '~~·我是有底线的人·~~'
                });
            }
            else {
                root.setData({
                    list: root.data.list.concat(response.data),
                    page: root.data.page + 1,
                    load: response.data.length > 0 ? '上拉加载更多' : '~~·我是有底线的人·~~'
                });
            }
        });
    },
    onReachBottom: function () {
        var root = this;
        root.leibiao(root.data.page);
    },
    openWin: function (e) {
        console.log("e", e.currentTarget.dataset);
        wx.navigateTo({
            url: "/pages/details/details?tid=" + e + "&title=" + n
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBeUM7QUFFekMsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFDO1FBQ0QsSUFBSSxFQUFDLENBQUM7UUFDTixHQUFHLEVBQUMsQ0FBQztRQUNMLElBQUksRUFBQyxFQUFFO1FBQ1AsSUFBSSxFQUFDLFFBQVE7S0FDaEI7SUFDRCxNQUFNLEVBQUMsVUFBVSxDQUFLO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEVBQUMsQ0FBQyxDQUFDLEdBQUc7U0FDWixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ1gsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUNELE9BQU8sRUFBQyxVQUFVLElBQVk7UUFDMUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLFdBQUksQ0FBQyxTQUFTLEVBQUMsRUFBQyxJQUFJLE1BQUEsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsRUFBQyxVQUFBLFFBQVE7WUFDNUMsSUFBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUM7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFFWixDQUFDLENBQUE7YUFDTDtpQkFBSTthQUVKO1lBQ0QsSUFBRyxJQUFJLEtBQUcsQ0FBQyxFQUFDO2dCQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1QsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO29CQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQztvQkFDdEIsSUFBSSxFQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsUUFBUSxDQUFBLENBQUMsQ0FBQSxlQUFlO2lCQUN2RCxDQUFDLENBQUM7YUFDTjtpQkFBSTtnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNULElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDMUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUM7b0JBQ3RCLElBQUksRUFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLFFBQVEsQ0FBQSxDQUFDLENBQUEsZUFBZTtpQkFDdkQsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxhQUFhLEVBQUU7UUFDWixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxPQUFPLEVBQUUsVUFBUyxDQUFLO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNWLEdBQUcsRUFBRSw2QkFBNkIsR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUM7U0FDekQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cG9zdH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIjtcblxuUGFnZSh7XG4gICAgZGF0YTp7XG4gICAgICAgIHBhZ2U6MSxcbiAgICAgICAgdGlkOjEsXG4gICAgICAgIGxpc3Q6W10sXG4gICAgICAgIGxvYWQ6J+S4iuaLieWKoOi9veabtOWkmicsXG4gICAgfSxcbiAgICBvbkxvYWQ6ZnVuY3Rpb24gKGU6YW55KXtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHRpZDplLnRpZCxcbiAgICAgICAgfSlcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6IFwi5Yqg6L295LitXCIsXG4gICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pLnRoZW4oKTtcbiAgICAgICAgdGhpcy5sZWliaWFvKHRoaXMuZGF0YS5wYWdlKTtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKS50aGVuKCk7XG4gICAgfSxcbiAgICBsZWliaWFvOmZ1bmN0aW9uIChwYWdlOiBudW1iZXIpe1xuICAgICAgICBjb25zdCByb290ID0gdGhpcztcbiAgICAgICAgcG9zdChcImxlaWJpYW9cIix7cGFnZSx0aWQ6cm9vdC5kYXRhLnRpZH0scmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgcm9vdC5zZXREYXRhKHtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGFnZT09PTEpe1xuICAgICAgICAgICAgICAgIHJvb3Quc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHJvb3QuZGF0YS5wYWdlKzEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWQ6cmVzcG9uc2UuZGF0YS5sZW5ndGg+MD8n5LiK5ouJ5Yqg6L295pu05aSaJzonfn7Ct+aIkeaYr+acieW6lee6v+eahOS6usK3fn4nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByb290LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBsaXN0OiByb290LmRhdGEubGlzdC5jb25jYXQocmVzcG9uc2UuZGF0YSksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHJvb3QuZGF0YS5wYWdlKzEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWQ6cmVzcG9uc2UuZGF0YS5sZW5ndGg+MD8n5LiK5ouJ5Yqg6L295pu05aSaJzonfn7Ct+aIkeaYr+acieW6lee6v+eahOS6usK3fn4nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24oKSB7XG4gICAgICAgY29uc3Qgcm9vdCA9IHRoaXM7XG4gICAgICAgcm9vdC5sZWliaWFvKHJvb3QuZGF0YS5wYWdlKTtcbiAgICB9LFxuICAgIG9wZW5XaW46IGZ1bmN0aW9uKGU6YW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZVwiLGUuY3VycmVudFRhcmdldC5kYXRhc2V0KTtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IFwiL3BhZ2VzL2RldGFpbHMvZGV0YWlscz90aWQ9XCIgKyBlICsgXCImdGl0bGU9XCIgKyBuXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbn0pXG4iXX0=