
import 'dart:ui' show Color;

import 'package:flutter/painting.dart';

class MyColor extends ColorSwatch<int> {

  static const Color indexAppBarColor = Color(0xFFFE4080);

  static const Color indexAppBarIndicatorColor = Color(0xfffcfa43);

  MyColor(int primary, Map<int, Color> swatch) : super(primary, swatch);

}
