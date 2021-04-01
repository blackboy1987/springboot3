
enum Type { success, error,waring }

class MessageConfig {

  String title;

  Type type;

  MessageConfig({this.title='此操作成功',this.type=Type.success});

}