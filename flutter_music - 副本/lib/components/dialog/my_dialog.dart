import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_music/components/dialog/message_config.dart';

class MyDialog extends Dialog {
  MessageConfig messageConfig;

  MyDialog({Key key,this.messageConfig}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return new Material(
      //创建透明层
      type: MaterialType.transparency, //透明类型
      child: new Center(
        //保证控件居中效果
        child: SizedBox(
          width: 120.0,
          height: 120.0,
          child: Container(
            decoration: ShapeDecoration(
              color: Color(0xffffffff),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(
                  Radius.circular(8.0),
                ),
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                CircularProgressIndicator(),
                Padding(
                  padding: const EdgeInsets.only(
                    top: 20.0,
                  ),
                  child: Text(
                    messageConfig?.title??'',
                    style: TextStyle(fontSize: 12.0),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }


  static successDialog(BuildContext context,{MessageConfig messageConfig}) {
    showDialog<Null>(
      context: context, //BuildContext对象
      barrierDismissible: false,
      builder: (BuildContext context) {
        Timer.periodic(Duration(seconds: 2), (timer) {
          MyDialog.hide(context);
          timer.cancel();
        });
        return MyDialog(
          //调用对话框
          messageConfig: messageConfig,
        );
      },
    );
  }

  static hide(BuildContext context) {
    Navigator.pop(context);
  }
}
