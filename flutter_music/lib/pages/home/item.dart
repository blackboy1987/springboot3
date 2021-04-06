import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:flutter_music/pages/model/Movie.dart';

class Item extends StatelessWidget {

  Map movie;

  Item(this.movie,{Key key}):super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: (){
        Navigator.of(context).pushNamed("/play",arguments: {
          "id": movie["id"],
        });
      },
      child: Container(
        child: Row(
          children: <Widget>[
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                border: Border.all(
                  width: 1.0,
                ),
                borderRadius: BorderRadius.all(
                  Radius.circular(18.0),
                ),
                image: DecorationImage(
                  image: NetworkImage(movie["img"]??'https://www.etingshu.com/uploads/allimg/191002/4856e7043fa43e12.jpg'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Container(
              width: 16,
            ),
            Expanded(
              child: IntrinsicHeight(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Expanded(
                      child: Text(
                        movie["title"]??'',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Container(
                      height: 12.0,
                    ),
                    Expanded(
                      child: Text(
                        movie["content"]??'',
                        style: TextStyle(
                          fontSize: 14.0,
                          color: Colors.grey,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Container(
                      height: 12.0,
                    ),
                    Expanded(
                      child: Container(
                        child: Row(
                          children: <Widget>[
                            Container(
                              margin: EdgeInsets.only(right: 4.0),
                              child: Icon(Icons.play_arrow_sharp),
                            ),
                            Container(
                              child: Text(renderText(movie["readCount"]??0)),
                              margin: EdgeInsets.only(right: 10.0),
                            ),
                            Container(
                              margin: EdgeInsets.only(right: 4.0),
                              child: Icon(Icons.list),
                            ),
                            Container(
                              child: Text("${movie["itemCount"]??0}集"),
                            ),
                          ],
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String renderText(readCount) {
    if(readCount!=null){
      if(readCount>=10000){
        double wan = readCount/10000;
        return "${wan.toStringAsFixed(2)}万";
      }
      return '$readCount';
    }

    return '0';

  }
}
