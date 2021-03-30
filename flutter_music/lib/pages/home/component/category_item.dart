import 'package:flutter/material.dart';

class CategoryItem extends StatelessWidget {
  final Map item;

  CategoryItem(this.item, {Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text("aaa"),
    );
  }

  String calCount(val) {
    if (val == null || val == '') {
      return '0';
    }
    if (val > 10000 && val < 100000000) {
      return '${(val /100000).toStringAsFixed(1)} 万次';
    }
    if(val>100000000){
      return '${(val /100000000).toStringAsFixed(1)} 亿次';
    }
    return '$val';
  }
}
