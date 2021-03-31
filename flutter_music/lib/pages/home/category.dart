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
  int page = 1;

  ScrollController _scrollController = ScrollController();

  void load(page){
    Http.get("list?categoryId=${widget.category['id']}&pageNumber=$page", (data) {
      setState(() {
        if(page==1){
          list = data["data"];
        }else{
          list = [
            ...list,
            ...data["data"]
          ];
        }
      });
    });
  }

  Future<void> _onRefresh() async {
    setState(() {
      page = 1;
      load(1);
    });
  }

  @override
  void initState() {
    load(1);
    _scrollController.addListener(() {
      if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
        page = page+1;
        load(page);
      }
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _onRefresh,
      child: Container(
        padding: EdgeInsets.only(left:16.0,top: 10,right: 16.0,),
        child: ListView.separated(
            controller: _scrollController,
            itemCount: list==null?0:list.length,
            separatorBuilder: (BuildContext context,index){
              return Divider(
                color: Color(0xFFC6C6C6),
              );
            },
            itemBuilder: (BuildContext context, index) {
              return list!=null?CategoryItem(list[index]):Text("bb") ;
            }),
      ),
    );
  }
}
