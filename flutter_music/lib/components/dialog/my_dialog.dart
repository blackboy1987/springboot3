import 'package:flutter/material.dart';
import 'package:flutter_music/components/dialog/message_config.dart';

class MyDialog {
  static showLoadingDialog(BuildContext context, MessageConfig messageConfig) {
    showDialog(
      context: context,
      barrierDismissible: false, //点击遮罩不关闭对话框
      builder: (context) {
        return AlertDialog(
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              CircularProgressIndicator(),
              Padding(
                padding: const EdgeInsets.only(top: 26.0),
                child: Text(messageConfig.title),
              ),
              Padding(
                  padding: const EdgeInsets.only(top: 26.0),
                  child: MaterialButton(
                    child: Text("关闭"),
                    onPressed: () {
                      hideDialog(context);
                    },
                  ))
            ],
          ),
        );
      },
    );
  }

  static successDialog(BuildContext context,{ String title}) {
    showLoadingDialog(
      context,
      MessageConfig(
        title: title ?? '操作成功',
        type: Type.success,
      ),
    );
  }

  static hideDialog(BuildContext context) {
    Navigator.of(context).pop();
  }
}
