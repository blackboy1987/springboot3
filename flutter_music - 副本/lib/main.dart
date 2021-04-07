import 'package:flutter/material.dart';
import 'package:flutter_music/pages/index/Index.dart';
import 'package:flutter_music/pages/play/play.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

var routes = {
  '/': (BuildContext context) => Index(),
  '/app': (BuildContext context) => Index(),
  '/play': (BuildContext context, {arguments}) => Play(arguments: arguments),
};

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: 'app',
      onGenerateRoute: (settings) {
        final String name = settings.name;
        final Function pageContentBuilder = routes[name];
        if (pageContentBuilder != null) {
          if (settings.arguments != null) {
            final Route route = MaterialPageRoute(
                builder: (context) =>
                    pageContentBuilder(context, arguments: settings.arguments));
            //放回路由组件对象
            return route;
          } else {
            final Route route = MaterialPageRoute(
                builder: (context) => pageContentBuilder(context));
            return route;
          }
        }
      },
    );
  }
}