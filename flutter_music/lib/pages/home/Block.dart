import 'package:flutter/material.dart';
import 'package:flutter_music/pages/home/item.dart';

class Block extends StatelessWidget {

  Map map;

  Block(this.map,{Key key}):super(key: key);

  @override
  Widget build(BuildContext context) {
    print("=====1===================================");
    print(map["books"].length);
    print("=====2================================");
    return Container(
      margin: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            map["title"],
            style: TextStyle(
              fontSize: 38,
            ),
          ),
          SizedBox(
            height: 16,
          ),
          ListView.separated(
            itemCount: map["books"].length,
            separatorBuilder: (BuildContext context, int index) {
              return Divider();
            },
            itemBuilder: (BuildContext context, int index) {
              return Item(map["books"][index]);
            },
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
          ),
        ],
      ),
    );
  }
}
