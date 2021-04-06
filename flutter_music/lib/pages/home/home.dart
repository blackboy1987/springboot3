import 'package:flutter/material.dart';
import 'package:flutter_music/constant/MyColor.dart';
import 'package:flutter_music/pages/home/first.dart';
import 'package:flutter_music/util/http.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> with SingleTickerProviderStateMixin {
  TabController tabController;

  List categories = [
    {"id": "34", "name": "相声小品"},
    {"id": "44", "name": "都市言情"},
    {"id": "43", "name": "财经"},
    {"id": "42", "name": "诗歌"},
    {"id": "41", "name": "网游"},
    {"id": "40", "name": "经典纪实"},
    {"id": "39", "name": "粤语"},
    {"id": "38", "name": "笑话"},
    {"id": "37", "name": "穿越"},
    {"id": "36", "name": "科幻有声"},
    {"id": "35", "name": "相声评书"},
    {"id": "23", "name": "儿童"},
    {"id": "33", "name": "百家讲坛"},
    {"id": "32", "name": "玄幻奇幻"},
    {"id": "31", "name": "武侠小说"},
    {"id": "30", "name": "文学"},
    {"id": "29", "name": "戏曲"},
    {"id": "28", "name": "恐怖惊悚"},
    {"id": "27", "name": "广播"},
    {"id": "26", "name": "历史军事"},
    {"id": "25", "name": "刑侦推理"},
    {"id": "24", "name": "军事"}
  ];

  void load() {
    Http.get("category", (data) {
      print(data);
      setState(() {
        // categories = data["data"];
      });
    });
  }

  @override
  void initState() {
    tabController = new TabController(
      initialIndex: 0,
      length: categories.length,
      vsync: this,
    );
    load();
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
          (index) => First(categories[index]),
        ),
      ),
    );
  }
}
