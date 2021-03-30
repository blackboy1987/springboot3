import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_music/pages/home/center_category.dart';
import 'package:flutter_music/pages/home/component/index_swiper_component.dart';
import 'package:flutter_music/pages/home/component/new_list.dart';
import 'package:flutter_music/pages/home/component/swiper_component.dart';
import 'package:flutter_music/util/http.dart';

class First extends StatefulWidget {
  @override
  _FirstState createState() => _FirstState();
}

class _FirstState extends State<First> {

  Map<String,Object> data = {};

  @override
  void initState() {
    Http.get("index", (result) {
      setState(() {
        data = result["data"];
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        child: Column(
          children: <Widget>[
            Container(
              height: 180,
              margin: EdgeInsets.only(
                bottom: 30,
              ),
              child: SwiperComponent(),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                CenterCategory(
                  Icons.ac_unit,
                  bgColor: Color(0xffb69ef4),
                  title: '免费专区',
                ),
                CenterCategory(
                  Icons.ac_unit,
                  bgColor: Color(0xff6ac5fa),
                  title: '完本精品',
                ),
                CenterCategory(
                  Icons.ac_unit,
                  bgColor: Color(0xfff5d34d),
                  title: '女频精选',
                ),
                CenterCategory(
                  Icons.ac_unit,
                  bgColor: Color(0xff7be6d4),
                  title: '男频热门',
                ),
              ],
            ),
            ...render(data["list"]??[]),
            Container(
              margin: EdgeInsets.only(
                top: 30,
              ),
              padding: EdgeInsets.only(
                left: 20,
              ),
              child: NewList('最近更新',this.data["news"]),
            )
          ],
        ),
      ),
    );
  }

  List<Widget> render(List list) {
    List<Widget> widgets = [];
    list.forEach((item) {
      widgets.add(
          Container(
            margin: EdgeInsets.only(
              top: 30,
            ),
            padding: EdgeInsets.only(
              left: 20,
            ),
            child: IndexSwiperComponent(item["title"],item["list"]),
          )
      );
    });
    return widgets;
  }
}
