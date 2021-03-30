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
  '/play': (BuildContext context) => Play(),
};

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: 'app',
      onGenerateRoute: onGenerateRoute,
    );
  }
}

var onGenerateRoute = (RouteSettings setting) {
  print('$setting');
  final String name = setting.name;
  final Function pageContentBuilder = routes[name];
  if (pageContentBuilder != null) {
    if (setting.arguments != null) {
      final Route route = MaterialPageRoute(
          builder: (context) =>
              pageContentBuilder(context, arguments: setting.arguments));
      return route;
    } else {
      final Route route =
      MaterialPageRoute(builder: (context) => pageContentBuilder(context));
      return route;
    }
  }
};
