import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class SwiperComponent extends StatelessWidget {

  List list = [
    "https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/b2214b15c8712a553c6f4ad0cae2fc01.jpg",
    "https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/4d2b5df7cf0916fd4381c29c3ebf67c9.jpg",
    "https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/dd94efc6a032a2b58751f6666467865d.jpg",
    "https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/07a78da90fbf46d62b9efe8880217e1f.jpg",
  ];


  @override
  Widget build(BuildContext context) {
    return Swiper(
      itemBuilder: (BuildContext context, int index) {
        return new Image.network(
          list[index],
          fit: BoxFit.fill,
        );
      },
      autoplay: true,
      itemCount: list.length,
    );
  }
}
