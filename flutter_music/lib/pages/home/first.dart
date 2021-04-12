import 'package:flutter/material.dart';
import 'package:flutter_music/pages/components/my_swiper.dart';
import 'package:flutter_music/pages/home/Block.dart';
import 'package:flutter_music/pages/home/item.dart';
import 'package:flutter_music/util/http.dart';

class First extends StatefulWidget {
  final Map category;

  First(this.category, {Key key}) : super(key: key);

  @override
  _FirstState createState() => _FirstState();
}

class _FirstState extends State<First> {
  Map newUpdate = {};
  Map news = {};
  Map like = {};
  Map bookTop = {};
  List banner = [];

  void load() async {
    Http.get("list?url=${widget.category['url']}&pluginId=ting74Plugin",
        (data) {
      setState(() {
        Map dataSource = data["data"];
        newUpdate = dataSource["newUpdate"];
        news = dataSource["news"];
        like = dataSource["like"];
        bookTop = dataSource["bookTop"];
        banner = dataSource["banner"];
        print(dataSource["bookTop"]);
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
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Block(newUpdate),
          Block(bookTop),
        ],
      ),
    );
  }
}
