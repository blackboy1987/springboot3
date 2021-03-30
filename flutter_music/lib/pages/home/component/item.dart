import 'package:flutter/material.dart';

class Item extends StatelessWidget {
  final Map item;

  Item(this.item, {Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 160,
      padding: EdgeInsets.only(top: 10),
      child: Row(
        children: <Widget>[
          Container(
            width: 140,
            height: 140,
            decoration: BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.circular(4),
                image: DecorationImage(
                  image: NetworkImage(this.item["img"]),
                  fit: BoxFit.cover,
                )),
          ),
          Expanded(
            child: Container(
              width: 140,
              height: 140,
              padding: EdgeInsets.only(left: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    this.item["title"] ?? '',
                    maxLines: 1,
                    overflow: TextOverflow.clip,
                    style: TextStyle(
                      color: Color(0xFF080808),
                      fontWeight: FontWeight.w700,
                      fontSize: 20,
                    ),
                  ),
                  Text(
                    this.item["author"] ?? '',
                    style: TextStyle(
                      color: Color(0xFF535353),
                      fontSize: 14,
                    ),
                  ),
                  Text(
                    this.item["content"],
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: Color(0xFF929292),
                    ),
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Icon(
                        Icons.play_arrow,
                        color: Color(0xFFB3B3B3),
                      ),
                      Text(
                        calCount(this.item["readCount"]),
                        style: TextStyle(
                          color: Color(0xFFA1A1A1),
                        ),
                      ),
                      Container(
                        width: 10,
                      ),
                      Icon(
                        Icons.list,
                        color: Color(0xFFB3B3B3),
                      ),
                      Text(
                        "${this.item['itemCount'] ?? 0}集",
                        style: TextStyle(
                          color: Color(0xFFA1A1A1),
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
        ],
      ),
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
