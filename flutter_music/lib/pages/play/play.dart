import 'package:flutter/material.dart';
import 'package:flutter_music/constant/MyColor.dart';

class Play extends StatefulWidget {
  @override
  _PlayState createState() => _PlayState();
}

class _PlayState extends State<Play> {
  double _currentRate = 0;

  double currentSeconds = 0;
  double totalSeconds = 23840;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        backgroundColor: MyColor.playAppBarColor,
        title: Text(
          '女教师的超级高手',
          style: TextStyle(
            color: MyColor.playAppBarTextColor,
          ),
        ),
      ),
      body: Container(
        padding: EdgeInsets.only(
          left: 24,
          right: 24,
        ),
        decoration: BoxDecoration(
            gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFFfdfdfd),
            Color(0xFFfbe4ec),
          ],
        )),
        child: Column(
          children: <Widget>[
            Container(
              height: 60,
            ),
            Center(
              child: Container(
                width: 240,
                height: 240,
                decoration: BoxDecoration(
                  boxShadow: <BoxShadow>[
                    BoxShadow(
                      color: Color(0xFFdddddd),
                      offset: Offset(0.0, 0.0),
                      spreadRadius: 1.0,
                    ),
                  ],
                  borderRadius: BorderRadius.circular(20.0),
                  image: DecorationImage(
                    image: NetworkImage(
                      "https://img.tingchina.com/bookimg/yousheng/30854.gif",
                    ),
                    fit: BoxFit.fill,
                  ),
                ),
              ),
            ),
            Container(
              height: 20,
            ),
            Center(
              child: Text(
                "第0001集-桃子熟了",
                style: TextStyle(
                  color: Color(0xFF343434),
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Container(
              height: 60,
            ),
            Container(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Icon(
                        Icons.star_border,
                        color: Color(0xFF2c2c2c),
                      ),
                      Container(
                        width: 4,
                      ),
                      Text(
                        '收藏',
                        style: TextStyle(
                          color: Color(0xFF6e6a6b),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Icon(
                        Icons.timer,
                        color: Color(0xFF2c2c2c),
                      ),
                      Container(
                        width: 4,
                      ),
                      Text(
                        '定时',
                        style: TextStyle(
                          color: Color(0xFF6e6a6b),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Icon(
                        Icons.star_border,
                        color: Color(0xFF2c2c2c),
                      ),
                      Container(
                        width: 4,
                      ),
                      Text(
                        '倍速',
                        style: TextStyle(
                          color: Color(0xFF6e6a6b),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Icon(
                        Icons.list,
                        color: Color(0xFF2c2c2c),
                      ),
                      Container(
                        width: 4,
                      ),
                      Text(
                        '列表',
                        style: TextStyle(
                          color: Color(0xFF6e6a6b),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Container(
              height: 40,
            ),
            Container(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text("00:00"),
                  Expanded(
                    child: Slider(
                      value: _currentRate,
                      min: 0,
                      max: totalSeconds,
                      onChanged: (val) {
                        setState(() {
                          _currentRate = val;
                        });
                      },
                    ),
                  ),
                  Text(formatTime(totalSeconds)),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  String formatTime(double totalSeconds) {
    print(totalSeconds % 60);
    print(totalSeconds / 60);

    return "123:00";
  }
}
