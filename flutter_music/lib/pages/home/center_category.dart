import 'package:flutter/material.dart';

class CenterCategory extends StatelessWidget {
  final double size;
  final Color bgColor;
  final IconData icon;
  final String title;

  const CenterCategory(this.icon,
      {Key key, this.size = 48, this.bgColor = Colors.white, this.title})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        GestureDetector(
          onTap: (){
            Navigator.pushNamed(context,"/play");
          },
          child: Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: BorderRadius.circular(size),
              boxShadow: <BoxShadow>[
                BoxShadow(
                  color: bgColor,
                  offset: Offset(0.0, 4.0),
                  blurRadius: 10,
                  spreadRadius: 0,
                ),
              ],
            ),
            child: Center(
              child: Icon(
                icon,
                color: Colors.white,
                size: 28.0,
              ),
            ),
          ),
        ),
        Container(
          height: 20,
        ),
        Text(
          title,
          style: TextStyle(
            color: Color(0xff1e1e1e),
            fontSize: 14,
          ),
        ),
      ],
    );
  }
}
