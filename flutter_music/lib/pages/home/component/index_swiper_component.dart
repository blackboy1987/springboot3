import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_music/pages/home/component/item.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class IndexSwiperComponent extends StatelessWidget {
  String title;

  List list;

  IndexSwiperComponent(this.title, this.list, {Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Container(
          height: 60,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Text(
                this.title,
                style: TextStyle(
                  color: Color(0xFF212121),
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
              Icon(Icons.chevron_right, color: Color(0xFF888888), size: 28),
            ],
          ),
        ),
        Container(
          height: 480,
          width: MediaQuery.of(context).size.width,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            controller: ScrollController(
              // 回弹效果禁用
              keepScrollOffset: false,
            ),
            itemCount: 2,
            itemBuilder: (BuildContext context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * 0.8,
                height: 100,
                margin: EdgeInsets.only(right: 20),
                child: ListView.builder(
                    controller: ScrollController(
                      // 回弹效果禁用
                      keepScrollOffset: false,
                    ),
                    itemCount: 3,
                    itemBuilder: (BuildContext context, index1) {
                      return list != null && list.length > 0
                          ? Item(list[index + index1])
                          : null;
                    }),
              );
            },
          ),
        ),
      ],
    );
  }
}
