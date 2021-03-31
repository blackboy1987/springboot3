import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_music/constant/MyColor.dart';
import 'package:flutter_music/util/http.dart';
import 'package:flutter/foundation.dart';

const List<String> urls = [
  "https://pp.ting55.com/202103311528/09192ac8026a6af85a8e1106792bb1b9/2015/01/36/1.mp3?v=1617173933078"
];

class Play extends StatefulWidget {
  final Map arguments;

  Play({Key key, this.arguments}) : super(key: key);

  @override
  _PlayState createState() => _PlayState(this.arguments);
}

enum PlayerState { stopped, playing, paused }
enum PlayingRouteState { speakers, earpiece }

class _PlayState extends State<Play> {
  double _currentRate = 0;

  double currentSeconds = 0;
  double totalSeconds = 23840;

  final Map arguments;

  Map data = {};

  AudioPlayer _audioPlayer;
  AudioPlayerState _audioPlayerState;
  Duration _duration;
  Duration _position;

  PlayerState _playerState = PlayerState.stopped;
  PlayingRouteState _playingRouteState = PlayingRouteState.speakers;
  StreamSubscription _durationSubscription;
  StreamSubscription _positionSubscription;
  StreamSubscription _playerCompleteSubscription;
  StreamSubscription _playerErrorSubscription;
  StreamSubscription _playerStateSubscription;
  StreamSubscription<PlayerControlCommand> _playerControlCommandSubscription;

  get _isPlaying => _playerState == PlayerState.playing;

  get _isPaused => _playerState == PlayerState.paused;

  get _durationText => _duration?.toString()?.split('.')?.first ?? '';

  get _positionText => _position?.toString()?.split('.')?.first ?? '';

  _PlayState(this.arguments);

  void load() {
    Http.get(
      "detail?id=${this.arguments["id"]}",
      (result) {
        setState(() {
          data = result["data"];
        });
      },
    );
  }

  @override
  void initState() {
    _initAudioPlayer();
    load();
    super.initState();
  }

  @override
  void dispose() {
    // _audioPlayer.dispose();
    _durationSubscription?.cancel();
    _positionSubscription?.cancel();
    _playerCompleteSubscription?.cancel();
    _playerErrorSubscription?.cancel();
    _playerStateSubscription?.cancel();
    _playerControlCommandSubscription?.cancel();
    super.dispose();
  }

  void _initAudioPlayer() {
    _audioPlayer = AudioPlayer(mode: PlayerMode.MEDIA_PLAYER, playerId: "aaa");

    _durationSubscription = _audioPlayer.onDurationChanged.listen((duration) {
      setState(() => _duration = duration);

      // TODO implemented for iOS, waiting for android impl
      if (Theme.of(context).platform == TargetPlatform.iOS) {
        // (Optional) listen for notification updates in the background
        _audioPlayer.startHeadlessService();

        // set at least title to see the notification bar on ios.
        _audioPlayer.setNotification(
          title: 'App Name',
          artist: 'Artist or blank',
          albumTitle: 'Name or blank',
          imageUrl: 'url or blank',
          // forwardSkipInterval: const Duration(seconds: 30), // default is 30s
          // backwardSkipInterval: const Duration(seconds: 30), // default is 30s
          duration: duration,
          elapsedTime: Duration(seconds: 0),
          hasNextTrack: true,
          hasPreviousTrack: false,
        );
      }
    });

    // 监听播放进度
    _positionSubscription =
        _audioPlayer.onAudioPositionChanged.listen((p) => setState(() {
              _position = p;
            }));

    _playerCompleteSubscription =
        _audioPlayer.onPlayerCompletion.listen((event) {
      _onComplete();
      setState(() {
        _position = _duration;
      });
    });

    // 播放失败
    _playerErrorSubscription = _audioPlayer.onPlayerError.listen((msg) {
      setState(() {
        _playerState = PlayerState.stopped;
        _duration = Duration(seconds: 0);
        _position = Duration(seconds: 0);
      });
    });

    _playerControlCommandSubscription =
        _audioPlayer.onPlayerCommand.listen((command) {
      print('command');
    });

    /**
     * 播放状态的改变
     */
    _audioPlayer.onPlayerStateChanged.listen((state) {
      if (!mounted) return;
      setState(() {
        _audioPlayerState = state;
      });
    });

    _audioPlayer.onNotificationPlayerStateChanged.listen((state) {
      if (!mounted) return;
      setState(() => _audioPlayerState = state);
    });

    _playingRouteState = PlayingRouteState.speakers;
  }

  Future<int> _play() async {
    final playPosition = (_position != null &&
            _duration != null &&
            _position.inMilliseconds > 0 &&
            _position.inMilliseconds < _duration.inMilliseconds)
        ? _position
        : null;
    final result = await _audioPlayer.play(urls[0], position: playPosition);
    if (result == 1) setState(() => _playerState = PlayerState.playing);
    _audioPlayer.setPlaybackRate(playbackRate: 1.0);
    return result;
  }

  Future<int> _pause() async {
    final result = await _audioPlayer.pause();
    if (result == 1) {
      setState(() {
        _playerState = PlayerState.paused;
      });
    }
  }

  void _onComplete() {
    setState(() => _playerState = PlayerState.stopped);
  }

  /**
   * 获取播放地址
   */
  void getUrl(int novelItemId) {
    Http.get(
      "url?itemId=$novelItemId&id=${this.arguments["id"]}",
      (result) {
        print("$result");
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        backgroundColor: MyColor.playAppBarColor,
        title: Text(
          data["title"] ?? '',
          style: TextStyle(
            color: MyColor.playAppBarTextColor,
          ),
        ),
      ),
      body: Container(
        padding: EdgeInsets.only(
          left: 24,
          right: 24,
        ),
        decoration: BoxDecoration(
            gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFFfdfdfd),
            Color(0xFFfbe4ec),
          ],
        )),
        child: Column(
          children: <Widget>[
            Container(
              height: 60,
            ),
            Center(
              child: Container(
                width: 240,
                height: 240,
                decoration: BoxDecoration(
                  boxShadow: <BoxShadow>[
                    BoxShadow(
                      color: Color(0xFFdddddd),
                      offset: Offset(0.0, 0.0),
                      spreadRadius: 1.0,
                    ),
                  ],
                  borderRadius: BorderRadius.circular(20.0),
                  image: DecorationImage(
                    image: NetworkImage(
                      data["img"] ?? '',
                    ),
                    fit: BoxFit.fill,
                  ),
                ),
              ),
            ),
            Container(
              height: 20,
            ),
            Center(
              child: Text(
                "第0001集-桃子熟了",
                style: TextStyle(
                  color: Color(0xFF343434),
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Container(
              height: 60,
            ),
            Container(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Icon(
                        Icons.favorite_border,
                        color: Color(0xFF2c2c2c),
                      ),
                      Container(
                        width: 4,
                      ),
                      Text(
                        '收藏',
                        style: TextStyle(
                          color: Color(0xFF6e6a6b),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Icon(
                        Icons.timer,
                        color: Color(0xFF2c2c2c),
                      ),
                      Container(
                        width: 4,
                      ),
                      Text(
                        '定时',
                        style: TextStyle(
                          color: Color(0xFF6e6a6b),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Icon(
                        Icons.star_border,
                        color: Color(0xFF2c2c2c),
                      ),
                      Container(
                        width: 4,
                      ),
                      Text(
                        '倍速',
                        style: TextStyle(
                          color: Color(0xFF6e6a6b),
                        ),
                      ),
                    ],
                  ),
                  GestureDetector(
                    onTapDown: (TapDownDetails details) {
                      showModalBottomSheet(
                        context: context,
                        builder: (BuildContext context) {
                          return Container(
                              decoration: BoxDecoration(
                                color: Color(0xFFe2e2e2).withAlpha(100),
                              ),
                              child: Column(
                                children: <Widget>[
                                  Container(
                                    height: 60,
                                    padding: EdgeInsets.only(
                                      left: 32.0,
                                      right: 32.0,
                                    ),
                                    width: MediaQuery.of(context).size.width,
                                    decoration: BoxDecoration(
                                      border: Border(
                                        bottom: BorderSide(
                                          width: 2.0,
                                          color: Color(0xFFafafaf),
                                        ),
                                      ),
                                    ),
                                    child: Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: <Widget>[
                                        Text("共1234集"),
                                        Container(
                                          child: Row(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            mainAxisAlignment:
                                                MainAxisAlignment.end,
                                            children: <Widget>[
                                              IconButton(
                                                icon:
                                                    Icon(Icons.cloud_download),
                                              ),
                                              GestureDetector(
                                                child: Text(" 批量下载"),
                                              ),
                                              Container(
                                                width: 10,
                                              ),
                                              IconButton(
                                                  icon: Icon(Icons.list)),
                                              GestureDetector(
                                                  child: Text(" 正序")),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Expanded(
                                    child: ListView.separated(
                                        itemBuilder:
                                            (BuildContext context, int index) {
                                          return Container(
                                            child: ListTile(
                                              onTap: () {
                                                getUrl(
                                                    data["items"][index]["id"]);
                                              },
                                              leading: Icon(Icons.details),
                                              title: Text(data["items"][index]
                                                  ["title"]),
                                              trailing: IconButton(
                                                onPressed: () {
                                                  print("download");
                                                },
                                                icon:
                                                    Icon(Icons.download_sharp),
                                              ),
                                            ),
                                          );
                                        },
                                        separatorBuilder:
                                            (BuildContext context, int index) {
                                          return Divider(
                                            color: Color(0xFFaca8a9),
                                          );
                                        },
                                        itemCount: data["items"].length ?? 0),
                                  ),
                                  GestureDetector(
                                    onTapDown: (details) {
                                      Navigator.of(context).pop();
                                    },
                                    child: Container(
                                      height: 60,
                                      width: MediaQuery.of(context).size.width,
                                      decoration: BoxDecoration(
                                        border: Border(
                                          top: BorderSide(
                                            width: 1.0,
                                            color: Color(0xFFaea2a6),
                                          ),
                                        ),
                                      ),
                                      child: Center(
                                        child: Text(
                                          "关闭",
                                          style: TextStyle(
                                            color: Color(0xFF222222),
                                            fontSize: 20,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ));
                        },
                      );
                    },
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Icon(
                          Icons.list,
                          color: Color(0xFF2c2c2c),
                        ),
                        Container(
                          width: 4,
                        ),
                        Divider(
                          color: Color(0xFFababab),
                          thickness: 2,
                        ),
                        Text(
                          '列表',
                          style: TextStyle(
                            color: Color(0xFF6e6a6b),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Container(
              height: 40,
            ),
            Container(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(_positionText),
                  Expanded(
                    child: Slider(
                      activeColor: Color(0xFFF83786),
                      inactiveColor: Color(0xFF827C80),
                      value: (_position != null &&
                              _duration != null &&
                              // ignore: null_aware_before_operator
                              _position?.inMilliseconds > 0 &&
                              // ignore: null_aware_before_operator
                              _position?.inMilliseconds <
                                  _duration?.inMilliseconds)
                          // ignore: null_aware_before_operator
                          ? _position?.inMilliseconds /
                              _duration?.inMilliseconds
                          : 0.0,
                      onChanged: (v) {
                        // ignore: non_constant_identifier_names
                        final Position = v * _duration?.inMilliseconds;
                        _audioPlayer
                            .seek(Duration(milliseconds: Position.round()));
                      },
                    ),
                  ),
                  Text(_durationText),
                ],
              ),
            ),
            Container(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  GestureDetector(
                    onTapDown: (TapDownDetails details) {
                      final Position = _position?.inMilliseconds;
                      _audioPlayer.seek(
                          Duration(milliseconds: Position.round() - 30 * 1000));
                    },
                    child: Icon(
                      Icons.replay_30,
                      color: Color(0xFF2d2729),
                      size: 32,
                    ),
                  ),
                  Icon(
                    Icons.skip_previous,
                    color: Color(0xFF222222),
                    size: 32,
                  ),
                  _playerState == PlayerState.playing
                      ? GestureDetector(
                          onTapDown: (TapDownDetails details) {
                            _pause();
                          },
                          child: (Icon(
                            Icons.pause_circle_filled,
                            color: Color(0xFFfa669a),
                            size: 64,
                          )),
                        )
                      : GestureDetector(
                          onTapDown: (TapDownDetails details) {
                            _play();
                          },
                          child: (Icon(
                            Icons.play_circle_filled,
                            color: Color(0xFFfa669a),
                            size: 64,
                          )),
                        ),
                  Icon(
                    Icons.skip_next,
                    color: Color(0xFF222222),
                    size: 32,
                  ),
                  GestureDetector(
                    onTapDown: (TapDownDetails details) {
                      final Position = _position?.inMilliseconds;
                      _audioPlayer.seek(
                          Duration(milliseconds: Position.round() + 30 * 1000));
                    },
                    child: Icon(
                      Icons.forward_30,
                      color: Color(0xFF2d2729),
                      size: 32,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
