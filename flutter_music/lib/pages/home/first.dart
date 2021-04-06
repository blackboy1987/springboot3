import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_music/components/dialog/loading_dialog.dart';
import 'package:flutter_music/pages/home/item.dart';
import 'package:flutter_music/pages/model/Movie.dart';
import 'package:flutter_music/util/http.dart';

class First extends StatefulWidget {

  Map category;

  First(this.category,{Key key}):super(key: key);

  @override
  _FirstState createState() => _FirstState();
}

class _FirstState extends State<First> {

  bool loading = false;

  int page = 1;

  List list = [];

  ScrollController _scrollController = ScrollController();

  void load() async {
    Http.get("list?categoryId=${widget.category['id']}&pageNumber=$page", (data){
      setState(() {
        if(page==1){
          list = data["data"];
        }else{
          list.addAll(data["data"]);
        }
        page = page+1;
      });
    });
  }

  @override
  void initState() {
    load();
    _scrollController.addListener(() {
      if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
        load();
      }
    });
    super.initState();
  }

  Future<void> _onRefresh() async{
    load();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin:EdgeInsets.only(left: 16.0,right: 16.0,top:16.0,),
      child: RefreshIndicator(
        onRefresh: _onRefresh,
        child: ListView.separated(
          controller: _scrollController,
          itemBuilder: (BuildContext context, int index)=>Item(list[index]),
          separatorBuilder: (BuildContext context, int index)=>Divider(
            color: Colors.red,
          ),
          itemCount: list.length,
        ),
      ),
    );
  }
}
