"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        lunboList: [],
        speed: 30,
        color: '#807C7C',
        page: 1,
        list: [],
        load: "上拉加载更多",
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function () {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            });
        }
        util_1.config();
        this.lunbo();
        this.all(this.data.page);
    },
    getUserProfile: function () {
        var _this = this;
        wx.getUserProfile({
            desc: '展示用户信息',
            success: function (res) {
                console.log(res);
                _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
            }
        });
    },
    getUserInfo: function (e) {
        console.log(e);
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },
    lunbo: function () {
        var root = this;
        util_1.get("lunbo", function (response) {
            root.setData({
                lunboList: response.data,
            });
        });
    },
    all: function (page) {
        var root = this;
        util_1.post("all", { page: page }, function (response) {
            console.log("all", response.data);
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
        this.all(this.data.page);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHlDQUFtRDtBQUVuRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsYUFBYTtRQUNwQixRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO1FBQ25ELHFCQUFxQixFQUFFLEtBQUs7UUFDNUIsU0FBUyxFQUFFLEVBQUU7UUFDYixLQUFLLEVBQUMsRUFBRTtRQUNSLEtBQUssRUFBQyxTQUFTO1FBQ2YsSUFBSSxFQUFFLENBQUM7UUFDUCxJQUFJLEVBQUMsRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsZUFBZSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDO0tBQ3pHO0lBRUQsV0FBVztRQUNULEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsY0FBYztTQUNwQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUVKLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLHFCQUFxQixFQUFFLElBQUk7YUFDNUIsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxhQUFNLEVBQUUsQ0FBQztRQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsY0FBYztRQUFkLGlCQVlDO1FBVkMsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUNoQixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDaEIsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7b0JBQ3RCLFdBQVcsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFdBQVcsRUFBWCxVQUFZLENBQU07UUFFaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxLQUFLLEVBQUM7UUFDSixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsVUFBRyxDQUFDLE9BQU8sRUFBQyxVQUFBLFFBQVE7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUk7YUFDekIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsR0FBRyxFQUFDLFVBQVUsSUFBWTtRQUN4QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsV0FBSSxDQUFDLEtBQUssRUFBQyxFQUFDLElBQUksTUFBQSxFQUFDLEVBQUMsVUFBQSxRQUFRO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFHLElBQUksS0FBRyxDQUFDLEVBQUM7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7b0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDO29CQUN0QixJQUFJLEVBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxRQUFRLENBQUEsQ0FBQyxDQUFBLGVBQWU7aUJBQ3JELENBQUMsQ0FBQzthQUNKO2lCQUFJO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUMxQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQztvQkFDdEIsSUFBSSxFQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsUUFBUSxDQUFBLENBQUMsQ0FBQSxlQUFlO2lCQUNyRCxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGFBQWEsRUFBQztRQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuaW1wb3J0IHtjb25maWcsIGdldCwgcG9zdH0gZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxcIjtcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtb3R0bzogJ0hlbGxvIFdvcmxkJyxcbiAgICB1c2VySW5mbzoge30sXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgICBjYW5JVXNlR2V0VXNlclByb2ZpbGU6IGZhbHNlLFxuICAgIGx1bmJvTGlzdDogW10sXG4gICAgc3BlZWQ6MzAsXG4gICAgY29sb3I6JyM4MDdDN0MnLFxuICAgIHBhZ2U6IDEsXG4gICAgbGlzdDpbXSxcbiAgICBsb2FkOiBcIuS4iuaLieWKoOi9veabtOWkmlwiLFxuICAgIGNhbklVc2VPcGVuRGF0YTogd3guY2FuSVVzZSgnb3Blbi1kYXRhLnR5cGUudXNlckF2YXRhclVybCcpICYmIHd4LmNhbklVc2UoJ29wZW4tZGF0YS50eXBlLnVzZXJOaWNrTmFtZScpIC8vIOWmgumcgOWwneivleiOt+WPlueUqOaIt+S/oeaBr+WPr+aUueS4umZhbHNlXG4gIH0sXG4gIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxuICBiaW5kVmlld1RhcCgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL2xvZ3MvbG9ncycsXG4gICAgfSlcbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAod3guZ2V0VXNlclByb2ZpbGUpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNhbklVc2VHZXRVc2VyUHJvZmlsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgY29uZmlnKCk7XG4gICAgdGhpcy5sdW5ibygpO1xuICAgIHRoaXMuYWxsKHRoaXMuZGF0YS5wYWdlKTtcbiAgfSxcbiAgZ2V0VXNlclByb2ZpbGUoKSB7XG4gICAgLy8g5o6o6I2Q5L2/55Sod3guZ2V0VXNlclByb2ZpbGXojrflj5bnlKjmiLfkv6Hmga/vvIzlvIDlj5HogIXmr4/mrKHpgJrov4for6XmjqXlj6Pojrflj5bnlKjmiLfkuKrkurrkv6Hmga/lnYfpnIDnlKjmiLfnoa7orqTvvIzlvIDlj5HogIXlpqXlloTkv53nrqHnlKjmiLflv6vpgJ/loavlhpnnmoTlpLTlg4/mmLXnp7DvvIzpgb/lhY3ph43lpI3lvLnnqpdcbiAgICB3eC5nZXRVc2VyUHJvZmlsZSh7XG4gICAgICBkZXNjOiAn5bGV56S655So5oi35L+h5oGvJywgLy8g5aOw5piO6I635Y+W55So5oi35Liq5Lq65L+h5oGv5ZCO55qE55So6YCU77yM5ZCO57ut5Lya5bGV56S65Zyo5by556qX5Lit77yM6K+36LCo5oWO5aGr5YaZXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XG4gICAgLy8g5LiN5o6o6I2Q5L2/55SoZ2V0VXNlckluZm/ojrflj5bnlKjmiLfkv6Hmga/vvIzpooTorqHoh6oyMDIx5bm0NOaciDEz5pel6LW377yMZ2V0VXNlckluZm/lsIbkuI3lho3lvLnlh7rlvLnnqpfvvIzlubbnm7TmjqXov5Tlm57ljL/lkI3nmoTnlKjmiLfkuKrkurrkv6Hmga9cbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIGx1bmJvOmZ1bmN0aW9uICgpe1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzO1xuICAgIGdldChcImx1bmJvXCIscmVzcG9uc2UgPT4ge1xuICAgICAgcm9vdC5zZXREYXRhKHtcbiAgICAgICAgbHVuYm9MaXN0OiByZXNwb25zZS5kYXRhLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGFsbDpmdW5jdGlvbiAocGFnZTogbnVtYmVyKXtcbiAgICBjb25zdCByb290ID0gdGhpcztcbiAgICBwb3N0KFwiYWxsXCIse3BhZ2V9LHJlc3BvbnNlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsXCIscmVzcG9uc2UuZGF0YSk7XG4gICAgICBpZihwYWdlPT09MSl7XG4gICAgICAgIHJvb3Quc2V0RGF0YSh7XG4gICAgICAgICAgbGlzdDogcmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICBwYWdlOiByb290LmRhdGEucGFnZSsxLFxuICAgICAgICAgIGxvYWQ6cmVzcG9uc2UuZGF0YS5sZW5ndGg+MD8n5LiK5ouJ5Yqg6L295pu05aSaJzonfn7Ct+aIkeaYr+acieW6lee6v+eahOS6usK3fn4nXG4gICAgICAgIH0pO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJvb3Quc2V0RGF0YSh7XG4gICAgICAgICAgbGlzdDogcm9vdC5kYXRhLmxpc3QuY29uY2F0KHJlc3BvbnNlLmRhdGEpLFxuICAgICAgICAgIHBhZ2U6IHJvb3QuZGF0YS5wYWdlKzEsXG4gICAgICAgICAgbG9hZDpyZXNwb25zZS5kYXRhLmxlbmd0aD4wPyfkuIrmi4nliqDovb3mm7TlpJonOid+fsK35oiR5piv5pyJ5bqV57q/55qE5Lq6wrd+fidcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIG9uUmVhY2hCb3R0b206ZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5hbGwodGhpcy5kYXRhLnBhZ2UpO1xuICB9XG59KVxuIl19