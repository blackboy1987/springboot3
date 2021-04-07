import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class Data extends StatefulWidget {
  int index;

  Data(this.index, {Key key}) : super(key: key);

  @override
  _DataState createState() => _DataState();
}

class _DataState extends State<Data> with SingleTickerProviderStateMixin {
  int _currentIndex = 0;

  final List<String> data = [
    '热销榜',
    '热门榜',
    '好评榜',
  ];

  @override
  void initState() {
    _currentIndex = 0;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
            gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: <Color>[
                  Color(0xFFF8B0C6),
                  Color(0xFFF8F8F8),
                  Color(0xFFF8F8F8),
                  Color(0xFFF8F8F8),
                ])),
        padding: EdgeInsets.only(left: 16.0, right: 16.0),
        child: Column(
          children: <Widget>[
            Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: List.generate(
                  data.length,
                      (index) =>
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            _currentIndex = index;
                          });
                        },
                        child: Chip(
                          label: Text(data[index]),
                          labelStyle: TextStyle(
                            color: _currentIndex == index
                                ? Colors.white
                                : Color(0xFF726D71),
                            fontWeight: _currentIndex == index
                                ? FontWeight.w700
                                : FontWeight.normal,
                          ),
                          labelPadding: EdgeInsets.only(
                            left: 20,
                            right: 20,
                            top: 4,
                            bottom: 4,
                          ),
                          backgroundColor: _currentIndex == index
                              ? Color(0xFFFD6693)
                              : Colors.white,
                        ),
                      ),
                ),
              ),
            ),
            Container(
              height: MediaQuery.of(context).size.height-300,
              child: ListView.separated(itemBuilder: (itemBuilder, index) {
                return ListTile(
                  leading: Text('$index'),
                  title: Text("aaa"),
                  trailing: Text("495.3万"),
                );
              }, separatorBuilder: (separatorBuilder, index) {
                return Divider(
                  thickness: 2.0,
                );
              }, itemCount: 50,),
            ),
          ],
        ));
  }
}
