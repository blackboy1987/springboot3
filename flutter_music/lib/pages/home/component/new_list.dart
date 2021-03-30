import 'package:flutter/material.dart';
import 'package:flutter_music/pages/home/component/item.dart';


class NewList extends StatelessWidget {

  String title;

  List list=[];

  NewList(this.title,this.list,{Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.max,
      children: <Widget>[
        Container(
          height: 60,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Text(
                this.title??'',
                style: TextStyle(
                  color: Color(0xFF212121),
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
              Icon(Icons.chevron_right, color: Color(0xFF888888), size: 28),
            ],
          ),
        ),
        Container(
          height: 5000,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            controller: ScrollController(
              // 回弹效果禁用
              keepScrollOffset: false,
            ),
            itemCount: 2,
            itemBuilder: (BuildContext context, index) {
              return list != null && list.length > 0
                  ? Item(list[index])
                  : Text("no");
            },
          ),
        ),
      ],
    );
  }
}
