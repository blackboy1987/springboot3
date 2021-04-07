import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class Index extends StatefulWidget {
  @override
  _IndexState createState() => _IndexState();
}

class _IndexState extends State<Index> with SingleTickerProviderStateMixin {
  TabController _tabBarController;

  @override
  void initState() {
    _tabBarController = new TabController(length: 2, vsync: this);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'aa',
      home: Scaffold(
        appBar: AppBar(
          elevation: 0.0,
          bottom: TabBar(controller: _tabBarController, tabs: <Widget>[
            Text("1"),
            Text("2"),
          ]),
          bottomOpacity: 0.8,
        ),
        body: TabBarView(
            controller: _tabBarController,
            children: <Widget>[Text('1'), Text('2')]),
      ),
    );
  }
}
