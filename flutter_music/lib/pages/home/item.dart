import 'package:flutter/material.dart';

class Item extends StatelessWidget {
  Map book;

  Item(this.book, {Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          RichText(
            text: TextSpan(children: <TextSpan>[
              TextSpan(text: book["category"]["name"],style: TextStyle(
                color: Colors.grey,
              ),),
              TextSpan(
                text: book["title"],
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.black54,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ]),
          ),
          RichText(
            text: TextSpan(children: <TextSpan>[
              TextSpan(text: '播音：',style: TextStyle(
                color: Colors.grey,
              ),),
              TextSpan(
                text: book["announcer"]["name"],
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.black54,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ]),
          ),
          RichText(
            text: TextSpan(children: <TextSpan>[
              TextSpan(text: '更新日期：',style: TextStyle(
                color: Colors.grey,
              ),),
              TextSpan(
                text: book["updateTime"],
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.black54,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ]),
          ),
          RichText(
            text: TextSpan(children: <TextSpan>[
              TextSpan(text: '状态：',style: TextStyle(
                color: Colors.grey,
              ),),
              TextSpan(
                text: book["status"],
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.black54,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ]),
          ),
          Text(book["memo"]),
        ],
      ),
    );
  }
}
