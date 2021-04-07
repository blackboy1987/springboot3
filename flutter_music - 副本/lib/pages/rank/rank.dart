import 'package:flutter/material.dart';
import 'package:flutter_music/constant/MyColor.dart';
import 'package:flutter_music/pages/rank/data.dart';

class Rank extends StatefulWidget {
  @override
  _RankState createState() => _RankState();
}

class _RankState extends State<Rank> with SingleTickerProviderStateMixin {

  TabController _TabController;

  final List<String> data = [
    '热销榜',
    '热门榜',
    '好评榜',
  ];

  @override
  void initState() {
    _TabController = TabController(length: data.length, vsync: this);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        title: Text("排行"),
        backgroundColor: MyColor.indexAppBarColor,
        actions: [
          Icon(Icons.search,size: 32,),
          Container(
            width: 16.0,
          )
        ],
        bottom: AppBar(
          elevation: 0.0,
          toolbarHeight:40,
          backgroundColor: Colors.white,
          title: TabBar(
            indicatorSize: TabBarIndicatorSize.label,
            unselectedLabelStyle: TextStyle(
              color: Color(0xFF818181),
            ),
            labelStyle: TextStyle(
              fontWeight: FontWeight.bold,
            ),
            controller: _TabController,
            tabs: List.generate(data.length, (index) => Text(data[index],style: TextStyle(color: Colors.black,),)),
          ),
        ),
      ),
      body: TabBarView(
        controller: _TabController,
        children: List.generate(data.length, (index) => Data(index)),
      ),
    );
  }
}
