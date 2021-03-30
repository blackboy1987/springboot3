import 'package:flutter/material.dart';
import 'package:flutter_music/constant/MyColor.dart';
import 'package:flutter_music/pages/home/category.dart';
import 'package:flutter_music/pages/home/first.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> with SingleTickerProviderStateMixin {
  TabController tabController;

  List categories = [
    {"id": 0, "name": "精选"},
    {"id": 1, "name": "人物传记"},
    {"id": 2, "name": "刑侦推理"},
    {"id": 3, "name": "历史军事"},
    {"id": 4, "name": "官场商战"},
    {"id": 5, "name": "恐怖惊悚"},
    {"id": 6, "name": "武侠小说"},
    {"id": 7, "name": "玄幻奇幻"},
    {"id": 8, "name": "百家讲坛"},
    {"id": 9, "name": "相声评书"},
    {"id": 10, "name": "经典纪实"},
    {"id": 11, "name": "科幻有声"},
    {"id": 12, "name": "穿越"},
    {"id": 13, "name": "都市言情"},
    {"id": 14, "name": "通俗文学"}
  ];

  @override
  void initState() {
    tabController = new TabController(
      initialIndex: 0,
      length: categories.length,
      vsync: this,
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        bottomOpacity: 0.0,
        backgroundColor: MyColor.indexAppBarColor,
        title: TabBar(
          indicatorColor: MyColor.indexAppBarIndicatorColor,
          indicatorSize: TabBarIndicatorSize.label,
          unselectedLabelStyle: TextStyle(
            fontSize: 15,
          ),
          unselectedLabelColor: Colors.white,
          labelColor: MyColor.indexAppBarIndicatorColor,
          labelStyle: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
          controller: tabController,
          isScrollable: true,
          tabs: List.generate(
            categories.length,
            (index) => Text(categories[index]['name']),
          ),
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {
              Navigator.pushNamed(context, '/play');
            },
          ),
        ],
      ),
      body: TabBarView(
        controller: tabController,
        children: List.generate(
          categories.length,
          (index) => index == 0 ? First() : Category(categories[index]),
        ),
      ),
    );
  }
}
