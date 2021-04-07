
import 'dart:ui' show Color;

import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';

class MyColor extends ColorSwatch<int> {

  static const Color indexAppBarColor = Color(0xFFFE4080);

  static const Color indexAppBarIndicatorColor = Color(0xfffcfa43);


  static const Color playAppBarColor = Colors.white;

  static const Color playAppBarTextColor = Color(0xFF2b2b2b);

  MyColor(int primary, Map<int, Color> swatch) : super(primary, swatch);

}
