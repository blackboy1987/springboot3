import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:flutter_music/pages/home/first.dart';
import 'package:flutter_music/util/http.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> with SingleTickerProviderStateMixin {
  TabController tabController;

  bool loading = true;

  List categories = [];

  void load() async {
    await EasyLoading.show();
    setState(() {
      loading = true;
    });
    Http.get("category?pluginId=ting74Plugin", (data) {
      setState(() {
        categories = data["data"];
        tabController = new TabController(
          initialIndex: 0,
          length: categories.length,
          vsync: this,
        );
        loading = false;
        EasyLoading.dismiss(animation: true);
      });
    });
  }

  @override
  void initState() {
    load();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    print(categories.length);
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        bottomOpacity: 0.0,
        title: Text("74听书网"),
      ),
      body: loading?Center(
        child: Text("abc"),
      ):Scaffold(
        appBar: AppBar(
          elevation: 0.0,
          bottomOpacity: 0.0,
          title: TabBar(
            indicatorSize: TabBarIndicatorSize.label,
            unselectedLabelStyle: TextStyle(
              fontSize: 15,
            ),
            unselectedLabelColor: Colors.white,
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
        ),
        body: TabBarView(
          controller: tabController,
          children: List.generate(
            categories.length,
                (index) => index==0?First(categories[index]):Container(child: Text('$index'),),
          ),
        ),
      ),
    );
  }
}
