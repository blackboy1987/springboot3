import 'package:dio/dio.dart';

class Http {
  // static const String baseUrl = "http://172.16.12.223:9000/";

  static const String baseUrl = "http://192.168.0.106:9000/";

  static void get(url, callback) {
    print("==========================url");
    print(url);
    Dio().get(baseUrl + url).then((response) {
      print(response.data);
      callback(response.data);
    });
  }

  static void post(url, params, callback) {
    Dio().post(baseUrl + url, data: params).then((response) {
      print(response.data);
      callback(response.data);
    });
  }
}
