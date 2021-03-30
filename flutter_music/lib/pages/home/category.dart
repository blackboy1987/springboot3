import 'package:flutter/material.dart';

class Category extends StatefulWidget {

  Map category;

  Category(this.category,{Key key}):super(key: key);

  @override
  _CategoryState createState() => _CategoryState();
}

class _CategoryState extends State<Category> {

  @override
  void initState() {
    print(widget.category);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text("category"),
    );
  }
}
