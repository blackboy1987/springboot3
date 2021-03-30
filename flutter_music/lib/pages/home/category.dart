import 'package:flutter/material.dart';
import 'package:flutter_music/pages/home/component/category_item.dart';
import 'package:flutter_music/util/http.dart';

class Category extends StatefulWidget {
  Map category;

  Category(this.category, {Key key}) : super(key: key);

  @override
  _CategoryState createState() => _CategoryState();
}

class _CategoryState extends State<Category> {
  List list;

  @override
  void initState() {
    Http.get("list", (data) {
      list = data["data"];
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    print(list);
    return Container(
      child: ListView.builder(
          itemCount: 10,
          itemBuilder: (BuildContext context, index) {
            return list!=null&&list.length>0?CategoryItem(list[index]):Text("bb") ;
          }),
    );
  }
}
