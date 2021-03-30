import 'package:dio/dio.dart';

class Http {
  static const String baseUrl = "http://192.168.0.108:9000/";

  static void get(url, callback) {
    Dio().get(baseUrl + url).then((response) {
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
