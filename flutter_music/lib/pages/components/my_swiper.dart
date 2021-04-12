import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class MySwiper extends StatelessWidget {

  List list;

  MySwiper(this.list,{Key key}):super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 240,
      width: MediaQuery.of(context).size.width,
      child: Swiper(
        itemCount: list.length,
        autoplay: true,
        // 自动翻页
        itemBuilder: (BuildContext context, int index) {
          // 构建
          return Container(
            margin: const EdgeInsets.only(bottom: 30),
            decoration: BoxDecoration(
              image: DecorationImage(
                image: NetworkImage(list[index]["img"]),
                fit: BoxFit.cover,
              ),
            ),
          );
        },
      ),
    );
  }
}
