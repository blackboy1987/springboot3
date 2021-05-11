"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./utils/util");
App({
    globalData: {},
    onLaunch: function () {
        util_1.config();
        wx.login({
            success: function (res) {
                console.log(res.code);
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EscUNBQW9DO0FBRXBDLEdBQUcsQ0FBYTtJQUNkLFVBQVUsRUFBRSxFQUFFO0lBQ2QsUUFBUTtRQUVOLGFBQU0sRUFBRSxDQUFDO1FBR1QsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAudHNcbmltcG9ydCB7Y29uZmlnfSBmcm9tIFwiLi91dGlscy91dGlsXCI7XG5cbkFwcDxJQXBwT3B0aW9uPih7XG4gIGdsb2JhbERhdGE6IHt9LFxuICBvbkxhdW5jaCgpIHtcblxuICAgIGNvbmZpZygpO1xuXG4gICAgLy8g5bCP56iL5bqP5ZCv5Yqo5bCx5omn6KGM55m75b2V44CC6I635Y+W55So5oi355qE5pyA5Z+65pys5L+h5oGvXG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxufSlcbiJdfQ==