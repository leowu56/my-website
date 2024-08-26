System.register("chunks:///_virtual/architecture.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Architecture2.ts', './battle_model.ts', './player_model.ts', './mission_model.ts', './bag_model.ts'], function (exports) {
  var _inheritsLoose, cclegacy, log, Architecture, BattleModel, PlayerModel, MissionModel, BagModel;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      Architecture = module.Architecture;
    }, function (module) {
      BattleModel = module.BattleModel;
    }, function (module) {
      PlayerModel = module.PlayerModel;
    }, function (module) {
      MissionModel = module.MissionModel;
    }, function (module) {
      BagModel = module.BagModel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8df565QmpZMZIrTMpiHI3RN", "architecture", undefined);
      var QFArchitecture = exports('QFArchitecture', /*#__PURE__*/function (_Architecture) {
        _inheritsLoose(QFArchitecture, _Architecture);
        function QFArchitecture() {
          return _Architecture.apply(this, arguments) || this;
        }
        var _proto = QFArchitecture.prototype;
        /**
         * 这里执行IOC注入
         * 同时可以看到依赖了那些功能模块及工具、系统
         */
        _proto.IocInjection = function IocInjection() {
          log('游戏开始只注入必要模块');
          // 注入所有Models
          this.RegisterModel(new PlayerModel());
          this.RegisterModel(new BattleModel());
          this.RegisterModel(new MissionModel());
          this.RegisterModel(new BagModel());
        };
        _proto.IocInjectionAfterGetPlayer = function IocInjectionAfterGetPlayer() {
          log('getPlayer()后注入所有模块');
          // 注入所有Models
          // this.RegisterModel<PlayerModel>(new PlayerModel());
          // this.RegisterModel<BattleModel>(new BattleModel());
          // this.RegisterModel<MissionModel>(new MissionModel());
          // this.RegisterModel<BagModel>(new BagModel());

          // // 注入所有System
          // this.RegisterSystem<BattleSystem>(new BattleSystem());
        };

        return QFArchitecture;
      }(Architecture));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Architecture2.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventSystem.ts', './IOCContainer.ts', './Delegate.ts'], function (exports) {
  var _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, log, EventSystem, IOCContainer, Delegate;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      EventSystem = module.EventSystem;
    }, function (module) {
      IOCContainer = module.IOCContainer;
    }, function (module) {
      Delegate = module.Delegate;
    }],
    execute: function () {
      cclegacy._RF.push({}, "64523+9tuNBD44y9j1L9NCd", "Architecture", undefined);
      var Architecture = exports('Architecture', /*#__PURE__*/function () {
        function Architecture() {
          this.mContianer = new IOCContainer();
          this.OnRegisterPatch = new Delegate();
          this.mInited = false;
          this.mModels = [];
          this.mSystems = [];
          this.mEventSystem = new EventSystem();
        }
        Architecture.MakeSureArchitecture = function MakeSureArchitecture() {
          if (!this.mArchitecture) {
            var _this$mArchitecture$O;
            // init architecture
            this.mArchitecture = new this();
            var t = this.mArchitecture.constructor.name;
            log("\u6846\u67B6\u6587\u4EF6\u540D" + t);

            // do IOC injection of every item in this architecture
            this.mArchitecture.IocInjection();
            (_this$mArchitecture$O = this.mArchitecture.OnRegisterPatch) == null || _this$mArchitecture$O.invoke(this.Interface);

            // 执行Model层的Init函数
            this.mArchitecture.mModels.forEach(function (model) {
              model.Init();
            });
            this.mArchitecture.mModels = [];

            // 执行System层的Init函数
            this.mArchitecture.mSystems.forEach(function (system) {
              system.Init();
            });
            this.mArchitecture.mSystems = [];
            this.mArchitecture.mInited = true;
          }
        };
        var _proto = Architecture.prototype;
        _proto.RegisterModel = function RegisterModel(model) {
          // 指定模块所属架构
          model.SetArchitecture(this);
          var className = model.constructor.prototype.__className;
          this.mContianer.Register(className, model);
          if (!this.mInited) {
            this.mModels.push(model);
          } else {
            model.Init();
          }
        };
        _proto.GetModel = function GetModel(type) {
          var classType = type.prototype.__classType; // 获取类构造函数
          var className = classType.prototype.__className; // 获取类名
          return this.mContianer.Get(className);
        };
        _proto.RegisterSystem = function RegisterSystem(system) {
          // 指定System所属架构
          system.SetArchitecture(this);
          var className = system.constructor.prototype.__className;
          this.mContianer.Register(className, system);

          // if (!this.mInited) {
          //     this.mSystems.push(system);
          // } else {
          //     system.Init();
          // }
        };

        _proto.GetSystem = function GetSystem(type) {
          var classType = type.prototype.__classType; // 获取类构造函数
          var className = classType.prototype.__className; // 获取类名
          return this.mContianer.Get(className);
        };
        _proto.SendCommand = /*#__PURE__*/function () {
          var _SendCommand = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(command) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  command.SetArchitecture(this);
                  _context.next = 3;
                  return command.Execute();
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function SendCommand(_x) {
            return _SendCommand.apply(this, arguments);
          }
          return SendCommand;
        }();
        _proto.SendEvent = /*#__PURE__*/function () {
          var _SendEvent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(eventType, event) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (event === void 0) {
                    event = null;
                  }
                  _context2.next = 3;
                  return this.mEventSystem.Send(eventType, event);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function SendEvent(_x2, _x3) {
            return _SendEvent.apply(this, arguments);
          }
          return SendEvent;
        }();
        _proto.RegisterEvent = function RegisterEvent(eventType, onEvent, target) {
          if (target === void 0) {
            target = null;
          }
          return this.mEventSystem.Register(eventType, onEvent, target);
        };
        _proto.UnRegisterEvent = function UnRegisterEvent(eventType, onEvent, target) {
          if (target === void 0) {
            target = null;
          }
          this.mEventSystem.UnRegister(eventType, onEvent, target);
        };
        _proto.UnRegisterEventByTarget = function UnRegisterEventByTarget(target) {
          this.mEventSystem.UnRegisterByTarget(target);
        };
        _proto.IocInjection = function IocInjection() {};
        _createClass(Architecture, null, [{
          key: "Interface",
          get: function get() {
            if (!this.mArchitecture) {
              this.MakeSureArchitecture();
            }
            return this.mArchitecture;
          }
        }]);
        return Architecture;
      }());
      Architecture.mArchitecture = void 0;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ArrayUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "75266hBYBlNYIb847jZ3eWT", "ArrayUtil", undefined);
      /** 数组工具 */
      var ArrayUtil = exports('ArrayUtil', /*#__PURE__*/function () {
        function ArrayUtil() {}
        /**
         * 数组去重，并创建一个新数组返回
         * @param arr  源数组
         */
        ArrayUtil.noRepeated = function noRepeated(arr) {
          var res = [arr[0]];
          for (var i = 1; i < arr.length; i++) {
            var repeat = false;
            for (var j = 0; j < res.length; j++) {
              if (arr[i] == res[j]) {
                repeat = true;
                break;
              }
            }
            if (!repeat) {
              res.push(arr[i]);
            }
          }
          return res;
        }

        /**
         * 复制二维数组
         * @param array 目标数组
         */;
        ArrayUtil.copy2DArray = function copy2DArray(array) {
          var newArray = [];
          for (var i = 0; i < array.length; i++) {
            newArray.push(array[i].concat());
          }
          return newArray;
        }

        /**
         * Fisher-Yates Shuffle 随机置乱算法
         * @param array 目标数组
         */;
        ArrayUtil.fisherYatesShuffle = function fisherYatesShuffle(array) {
          var count = array.length;
          while (count) {
            var index = Math.floor(Math.random() * count--);
            var temp = array[count];
            array[count] = array[index];
            array[index] = temp;
          }
          return array;
        }

        /**
         * 混淆数组
         * @param array 目标数组
         */;
        ArrayUtil.confound = function confound(array) {
          var result = array.slice().sort(function () {
            return Math.random() - .5;
          });
          return result;
        }

        /**
         * 数组扁平化
         * @param array 目标数组
         */;
        ArrayUtil.flattening = function flattening(array) {
          for (; array.some(function (v) {
            return Array.isArray(v);
          });) {
            // 判断 array 中是否有数组
            array = [].concat.apply([], array); // 压扁数组
          }

          return array;
        }

        /** 删除数组中指定项 */;
        ArrayUtil.removeItem = function removeItem(array, item) {
          var temp = array.concat();
          for (var i = 0; i < temp.length; i++) {
            var value = temp[i];
            if (item == value) {
              array.splice(i, 1);
              break;
            }
          }
        }

        /**
         * 合并数组
         * @param array1 目标数组1
         * @param array2 目标数组2
         */;
        ArrayUtil.combineArrays = function combineArrays(array1, array2) {
          var newArray = [].concat(array1, array2);
          return newArray;
        }

        /**
         * 获取随机数组成员
         * @param array 目标数组
         */;
        ArrayUtil.getRandomValueInArray = function getRandomValueInArray(array) {
          var newArray = array[Math.floor(Math.random() * array.length)];
          return newArray;
        };
        ArrayUtil.isValidArray = function isValidArray(array) {
          return Array.isArray(array) && array.length > 0;
        }

        /**
         * 按指定字段分组
         * @param array 源数组
         * @param key 字段名称
         */;
        ArrayUtil.groupBy = function groupBy(array, key) {
          return array.reduce(function (acc, item) {
            var keyValue = String(item[key]); // Convert to string to ensure consistent key type
            if (!acc[keyValue]) {
              acc[keyValue] = [];
            }
            acc[keyValue].push(item);
            return acc;
          }, {});
        }

        /**
         * 将数组转换为以指定字段为键的对象
         * @param array 源数组
         * @param key 字段名称
         */;
        ArrayUtil.arrayToMap = function arrayToMap(array, key) {
          return array.reduce(function (acc, item) {
            var keyValue = String(item[key]); // Convert to string to ensure consistent key type
            acc[keyValue] = item;
            return acc;
          }, {});
        };
        return ArrayUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, AudioClip, error, AudioSource, hope;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      error = module.error;
      AudioSource = module.AudioSource;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "e52d2ysY1BEbpcT2Cz0Wwss", "AudioEffect", undefined);
      var ccclass = _decorator.ccclass;

      /**
       * 注：用playOneShot播放的音乐效果，在播放期间暂时没办法即时关闭音乐
       */

      /** 资源加载记录 */
      /** 游戏音效 */
      var AudioEffect = exports('AudioEffect', (_dec = ccclass('AudioEffect'), _dec(_class = /*#__PURE__*/function (_AudioSource) {
        _inheritsLoose(AudioEffect, _AudioSource);
        function AudioEffect() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AudioSource.call.apply(_AudioSource, [this].concat(args)) || this;
          _this.effects = new Map();
          _this._progress = 0;
          return _this;
        }
        var _proto = AudioEffect.prototype;
        /**
         * 加载音效并播放
         * @param url           音效资源地址
         * @param callback      资源加载完成并开始播放回调
         */
        _proto.load = function load(url, callback, bundleName) {
          var _this2 = this;
          if (bundleName == null) bundleName = hope.res.defaultBundleName;

          // 资源播放音乐对象
          if (url instanceof AudioClip) {
            this.effects.set(url.uuid, {
              source: true,
              ac: url
            });
            this.playOneShot(url, this.volume);
            callback && callback();
          } else {
            // 地址加载音乐资源后播放
            if (this.effects.has(url) == false) {
              hope.res.load(bundleName, url, AudioClip, function (err, data) {
                if (err) {
                  error(err);
                  return;
                }
                var key = bundleName + ":" + url;
                _this2.effects.set(key, {
                  source: false,
                  bundle: bundleName,
                  path: url,
                  ac: data
                });
                _this2.playOneShot(data, _this2.volume);
                callback && callback();
              });
            }
            // 播放缓存中音效
            else {
              var rr = this.effects.get(url);
              this.playOneShot(rr.ac, this.volume);
              callback && callback();
            }
          }
        }

        /** 释放所有已使用过的音效资源 */;
        _proto.releaseAll = function releaseAll() {
          for (var key in this.effects) {
            var rr = this.effects.get(key);
            if (rr.source) {
              this.release(rr.ac);
            } else {
              this.release(rr.path, rr.bundle);
            }
          }
          this.effects.clear();
        }

        /**
         * 释放指定地址音效资源
         * @param url           音效资源地址
         * @param bundleName    资源所在包名
         */;
        _proto.release = function release(url, bundleName) {
          if (bundleName == null) bundleName = hope.res.defaultBundleName;
          var ac = undefined;
          if (url instanceof AudioClip) {
            ac = url;
            if (this.effects.has(ac.uuid)) {
              this.effects["delete"](ac.uuid);
              ac.decRef();
            }
          } else {
            var key = bundleName + ":" + url;
            var rr = this.effects.get(key);
            if (rr) {
              this.effects["delete"](key);
              hope.res.release(rr.path, rr.bundle);
            }
          }
        };
        _createClass(AudioEffect, [{
          key: "progress",
          get: /** 获取音乐播放进度 */
          function get() {
            if (this.duration > 0) this._progress = this.currentTime / this.duration;
            return this._progress;
          }
          /**
           * 设置音乐当前播放进度
           * @param value     进度百分比0到1之间
           */,
          set: function set(value) {
            this._progress = value;
            this.currentTime = value * this.duration;
          }
        }]);
        return AudioEffect;
      }(AudioSource)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioEffect.ts', './AudioMusic.ts', './Hope.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, Component, AudioEffect, AudioMusic, hope;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
    }, function (module) {
      AudioEffect = module.AudioEffect;
    }, function (module) {
      AudioMusic = module.AudioMusic;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      cclegacy._RF.push({}, "252f0z+vPNL8Y/jsLYmomtw", "AudioManager", undefined);
      var LOCAL_STORE_KEY = "game_audio";

      /** 
       * 音频管理
       * @example 
      // 模块功能通过 oops.audio 调用
      oops.audio.playMusic("audios/nocturne");
       */
      var AudioManager = exports('AudioManager', /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioManager, _Component);
        function AudioManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 背景音乐管理对象 */
          _this.music = null;
          /** 音效管理对象 */
          _this.effect = null;
          /** 音乐管理状态数据 */
          _this.local_data = {};
          /** 背景音乐音量值 */
          _this._volume_music = 1;
          /** 音效音量值 */
          _this._volume_effect = 1;
          /** 背景音乐播放开关 */
          _this._switch_music = true;
          /** 音效果播放开关 */
          _this._switch_effect = true;
          return _this;
        }
        var _proto = AudioManager.prototype;
        /**
         * 设置背景音乐播放完成回调
         * @param callback 背景音乐播放完成回调
         */
        _proto.setMusicComplete = function setMusicComplete(callback) {
          if (callback === void 0) {
            callback = null;
          }
          this.music.onComplete = callback;
        }

        /**
         * 播放背景音乐
         * @param url        资源地址
         * @param callback   音乐播放完成事件
         */;
        _proto.playMusic = function playMusic(url, callback, bundleName) {
          if (this._switch_music) {
            this.music.loop = false;
            this.music.load(url, callback, bundleName);
          }
        }

        /** 循环播放背景音乐 */;
        _proto.playMusicLoop = function playMusicLoop(url, bundleName) {
          if (this._switch_music) {
            this.music.loop = true;
            this.music.load(url, null, bundleName);
          }
        }

        /** 停止背景音乐播放 */;
        _proto.stopMusic = function stopMusic() {
          if (this._switch_music && this.music.playing) {
            this.music.stop();
          }
        }

        /**
         * 获取背景音乐播放进度
         */;
        /**
         * 播放音效
         * @param url        资源地址
         */
        _proto.playEffect = function playEffect(url, callback, bundleName) {
          if (this._switch_effect) {
            this.effect.load(url, callback, bundleName);
          }
        }

        /** 释放音效资源 */;
        _proto.releaseEffect = function releaseEffect(url, bundleName) {
          this.effect.release(url, bundleName);
        }

        /** 
         * 获取音效音量 
         */;
        /** 恢复当前暂停的音乐与音效播放 */
        _proto.resumeAll = function resumeAll() {
          if (this.music) {
            if (!this.music.playing && this.music.progress > 0) this.music.play();
            if (!this.effect.playing && this.effect.progress > 0) this.effect.play();
          }
        }

        /** 暂停当前音乐与音效的播放 */;
        _proto.pauseAll = function pauseAll() {
          if (this.music) {
            if (this.music.playing) this.music.pause();
            if (this.effect.playing) this.effect.pause();
          }
        }

        /** 停止当前音乐与音效的播放 */;
        _proto.stopAll = function stopAll() {
          if (this.music) {
            this.music.stop();
            this.effect.stop();
          }
        }

        /** 保存音乐音效的音量、开关配置数据到本地 */;
        _proto.save = function save() {
          this.local_data.volume_music = this._volume_music;
          this.local_data.volume_effect = this._volume_effect;
          this.local_data.switch_music = this._switch_music;
          this.local_data.switch_effect = this._switch_effect;
          hope.storage.set(LOCAL_STORE_KEY, this.local_data);
        }

        /** 本地加载音乐音效的音量、开关配置数据并设置到游戏中 */;
        _proto.load = function load() {
          this.music = this.getComponent(AudioMusic) || this.addComponent(AudioMusic);
          this.effect = this.getComponent(AudioEffect) || this.addComponent(AudioEffect);
          this.local_data = hope.storage.getJson(LOCAL_STORE_KEY);
          if (this.local_data) {
            try {
              this.setState();
            } catch (e) {
              this.setStateDefault();
            }
          } else {
            this.setStateDefault();
          }
          if (this.music) this.music.volume = this._volume_music;
          if (this.effect) this.effect.volume = this._volume_effect;
        };
        _proto.setState = function setState() {
          this._volume_music = this.local_data.volume_music;
          this._volume_effect = this.local_data.volume_effect;
          this._switch_music = this.local_data.switch_music;
          this._switch_effect = this.local_data.switch_effect;
        };
        _proto.setStateDefault = function setStateDefault() {
          this.local_data = {};
          this._volume_music = 1;
          this._volume_effect = 1;
          this._switch_music = true;
          this._switch_effect = true;
        };
        _createClass(AudioManager, [{
          key: "progressMusic",
          get: function get() {
            return this.music.progress;
          }
          /**
           * 设置背景乐播放进度
           * @param value     播放进度值
           */,
          set: function set(value) {
            this.music.progress = value;
          }

          /**
           * 获取背景音乐音量
           */
        }, {
          key: "volumeMusic",
          get: function get() {
            return this._volume_music;
          }
          /** 
           * 设置背景音乐音量
           * @param value     音乐音量值
           */,
          set: function set(value) {
            this._volume_music = value;
            this.music.volume = value;
          }

          /** 
           * 获取背景音乐开关值 
           */
        }, {
          key: "switchMusic",
          get: function get() {
            return this._switch_music;
          }
          /** 
           * 设置背景音乐开关值
           * @param value     开关值
           */,
          set: function set(value) {
            this._switch_music = value;
            if (value == false) this.music.stop();
          }
        }, {
          key: "volumeEffect",
          get: function get() {
            return this._volume_effect;
          }
          /**
           * 设置获取音效音量
           * @param value     音效音量值
           */,
          set: function set(value) {
            this._volume_effect = value;
            this.effect.volume = value;
          }

          /** 
           * 获取音效开关值 
           */
        }, {
          key: "switchEffect",
          get: function get() {
            return this._switch_effect;
          }
          /**
           * 设置音效开关值
           * @param value     音效开关值
           */,
          set: function set(value) {
            this._switch_effect = value;
            if (value == false) this.effect.stop();
          }
        }]);
        return AudioManager;
      }(Component));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioMusic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, AudioSource, AudioClip;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSource = module.AudioSource;
      AudioClip = module.AudioClip;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "5c1f3kqGetBiIv48/CvuaQv", "AudioMusic", undefined);
      var ccclass = _decorator.ccclass,
        menu = _decorator.menu;

      /** 
       * 背景音乐 
       * 1、播放一个新背景音乐时，先加载音乐资源，然后停止正在播放的背景资源同时施放当前背景音乐资源，最后播放新的背景音乐
       */
      var AudioMusic = exports('AudioMusic', (_dec = ccclass('AudioMusic'), _dec(_class = /*#__PURE__*/function (_AudioSource) {
        _inheritsLoose(AudioMusic, _AudioSource);
        function AudioMusic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AudioSource.call.apply(_AudioSource, [this].concat(args)) || this;
          /** 背景音乐播放完成回调 */
          _this.onComplete = null;
          _this._progress = 0;
          _this._isLoading = false;
          _this._bundleName = null;
          // 当前音乐资源包
          _this._url = null;
          // 当前播放音乐
          _this._bundleName_next = null;
          // 下一个音乐资源包
          _this._url_next = null;
          return _this;
        }
        var _proto = AudioMusic.prototype;
        /**
         * 加载音乐并播放
         * @param url          音乐资源地址
         * @param callback     加载完成回调
         */
        _proto.load = /*#__PURE__*/
        function () {
          var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, callback, bundleName) {
            var data;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (bundleName == null) bundleName = oops.res.defaultBundleName;

                  // 下一个加载的背景音乐资源
                  if (!this._isLoading) {
                    _context.next = 5;
                    break;
                  }
                  this._bundleName_next = bundleName;
                  this._url_next = url;
                  return _context.abrupt("return");
                case 5:
                  this._isLoading = true;
                  _context.next = 8;
                  return oops.res.loadAsync(bundleName, url, AudioClip);
                case 8:
                  data = _context.sent;
                  if (data) {
                    this._isLoading = false;

                    // 处理等待加载的背景音乐
                    if (this._url_next != null) {
                      // 删除之前加载的音乐资源
                      this.release();

                      // 加载等待播放的背景音乐
                      this.load(this._url_next, callback, this._bundleName_next);
                      this._bundleName_next = this._url_next = null;
                    } else {
                      callback && callback();
                      this.playPrepare(bundleName, url, data);
                    }
                  }
                case 10:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function load(_x, _x2, _x3) {
            return _load.apply(this, arguments);
          }
          return load;
        }();
        _proto.playPrepare = function playPrepare(bundleName, url, data) {
          // 正在播放的时候先关闭
          if (this.playing) {
            this.stop();
          }

          // 删除当前正在播放的音乐
          this.release();

          // 播放背景音乐
          this.enabled = true;
          this.clip = data;
          this.play();

          // 记录新的资源包与资源名数据
          this._bundleName = bundleName;
          this._url = url;
        }

        /** cc.Component 生命周期方法，验证背景音乐播放完成逻辑，建议不要主动调用 */;
        _proto.update = function update(dt) {
          // 背景资源播放完成事件
          if (this.playing == false && this.progress == 0) {
            this.enabled = false;
            this.clip = null;
            this._bundleName = this._url = null;
            this.onComplete && this.onComplete();
          }
        }

        /** 释放当前背景音乐资源 */;
        _proto.release = function release() {
          if (this._url) {
            this.stop();
            this.clip = null;
            oops.res.release(this._url, this._bundleName);
          }
          this._bundleName = this._url = null;
        };
        _createClass(AudioMusic, [{
          key: "progress",
          get:
          // 下一个播放音乐
          /** 获取音乐播放进度 */
          function get() {
            if (this.duration > 0) this._progress = this.currentTime / this.duration;
            return this._progress;
          }
          /**
           * 设置音乐当前播放进度
           * @param value     进度百分比0到1之间
           */,
          set: function set(value) {
            this._progress = value;
            this.currentTime = value * this.duration;
          }
        }]);
        return AudioMusic;
      }(AudioSource)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Badge.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Enum, Label, Vec3, Sprite;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Label = module.Label;
      Vec3 = module.Vec3;
      Sprite = module.Sprite;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "bac76ow94VI+IpAB1DQUKfq", "Badge", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /** 红点位置 */
      var Position = exports('Position', /*#__PURE__*/function (Position) {
        Position[Position["TOP_LEFT"] = 0] = "TOP_LEFT";
        Position[Position["TOP_RIGHT"] = 1] = "TOP_RIGHT";
        return Position;
      }({}));
      Enum(Position);

      /** 红点组件 */
      var Badge = exports('Badge', (_dec = ccclass('Badge'), _dec2 = property({
        tooltip: '内容'
      }), _dec3 = property({
        type: Position,
        tooltip: '位置\n 0: 左上角 \n 1: 右上角'
      }), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Sprite) {
        _inheritsLoose(Badge, _Sprite);
        function Badge() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Sprite.call.apply(_Sprite, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "string", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "position", _descriptor2, _assertThisInitialized(_this));
          _this.label = null;
          return _this;
        }
        var _proto = Badge.prototype;
        _proto.onLoad = function onLoad() {
          this.label = this.node.getComponentInChildren(Label);
          this.setPosition(this.position);
        }

        /**
         * 设置位置
         * @param position  位置
         */;
        _proto.setPosition = function setPosition(position) {
          var parentSize = this.node.parent.uiTransform.contentSize;
          switch (position) {
            case Position.TOP_LEFT:
              {
                var x = -parentSize.width / 2;
                var y = parentSize.height / 2;
                this.node.setPosition(new Vec3(x, y, 0));
                break;
              }
            case Position.TOP_RIGHT:
              {
                var _x = parentSize.width / 2;
                var _y = parentSize.height / 2;
                this.node.setPosition(new Vec3(_x, _y, 0));
                break;
              }
          }
        }

        /**
         * 设置文字
         * @param text  文字
         */;
        _proto.setText = function setText(text) {
          if (this.label) {
            this.label.string = text;
          }
        };
        _createClass(Badge, [{
          key: "text",
          get: function get() {
            return this.string;
          },
          set: function set(text) {
            this.string = text;
            this.setText(text);
          }
        }]);
        return Badge;
      }(Sprite), _class3.POSITION = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "string", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '6';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "position", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Position.TOP_LEFT;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bag_ctrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseCtrl.ts', './bag_model.ts', './bag_item_cell.ts', './Hope.ts', './battle_model.ts', './event_game.ts'], function (exports) {
  var _inheritsLoose, cclegacy, instantiate, warn, NodePool, BaseCtrl, BagModel, CELL_TID_DIAMOND, BagItemCell, hope, BattleModel, GameEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      instantiate = module.instantiate;
      warn = module.warn;
      NodePool = module.NodePool;
    }, function (module) {
      BaseCtrl = module.BaseCtrl;
    }, function (module) {
      BagModel = module.BagModel;
      CELL_TID_DIAMOND = module.CELL_TID_DIAMOND;
    }, function (module) {
      BagItemCell = module.BagItemCell;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      BattleModel = module.BattleModel;
    }, function (module) {
      GameEvent = module.GameEvent;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6bb001ktKNKea9EaEcMoPl7", "bag_ctrl", undefined);
      var BagCtrl = exports('BagCtrl', /*#__PURE__*/function (_BaseCtrl) {
        _inheritsLoose(BagCtrl, _BaseCtrl);
        function BagCtrl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseCtrl.call.apply(_BaseCtrl, [this].concat(args)) || this;
          _this.poolCell = new NodePool('CellPool');
          return _this;
        }
        var _proto = BagCtrl.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          for (var i = 0; i < hope.config.tables.TbNormalStore.getDataList().length + 5; i++) {
            var nodeCell = instantiate(this.view.prefabBagItemCell);
            this.poolCell.put(nodeCell);
          }
          this.view.toggleContainer.toggleItems.forEach(function (toggle, index) {
            toggle.node.on('toggle', function (toggle) {
              _this2.onToggleClick(index, toggle);
            }, _this2);
          });

          // 默认刷新normal
          this.refreshNormal();
        };
        _proto.onDestroy = function onDestroy() {
          this.poolCell.clear();
        };
        _proto.onToggleClick = function onToggleClick(index, toggle) {
          warn(index + " toggle isChecked " + toggle.isChecked);
          if (toggle.isChecked) {
            switch (index) {
              case 0:
                this.refreshNormal();
                break;
              case 1:
                this.refreshFactory();
                break;
              case 2:
                this.refreshMaterial();
                break;
            }
          }
        };
        _proto.refreshNormal = function refreshNormal() {
          var _this3 = this;
          var openIndex = this.GetModel(BagModel).normalBagOpenIndex;
          var len = openIndex;
          if (len < hope.config.tables.TbNormalStore.getDataList().length) {
            len += 1;
          }
          this.setGridCount(len);
          warn(len + " - " + openIndex, this.GetModel(BagModel).normalBag);
          var _loop = function _loop() {
            var bag = _this3.GetModel(BagModel).normalBag[i];
            // 有可能是多的一个提供购买用的
            var compt = _this3.view.nodeGrid.children[i].getComponent(BagItemCell);
            compt.refreshNormal(bag == null ? void 0 : bag.cellId);
            compt.node.active = true;
            compt.cb = function () {
              _this3.removeBag(0, bag == null ? void 0 : bag.cellId);
              _this3.refreshNormal();
            };
          };
          for (var i = 0; i < openIndex; i++) {
            _loop();
          }

          // 还能解锁
          if (len > openIndex) {
            // 最后一个解锁用的
            var compt = this.view.nodeGrid.children[len - 1].getComponent(BagItemCell);
            compt.refreshNormal(null, true);
            compt.node.active = true;
            compt.cb = function () {
              warn("解锁");
              var tb = hope.config.tables.TbNormalStore.get(openIndex + 1);
              hope.gui.tip.alert("\u662F\u5426\u82B1\u8D39 " + tb.needCell.count + " \u94BB\u77F3\u89E3\u9501", function () {
                if (_this3.GetModel(BagModel).diamond < tb.needCell.count) {
                  hope.gui.toast("钻石不够");
                } else {
                  _this3.GetModel(BagModel).reqUnlockNormalBag();
                  // 这个应该是数据层处理的，偷懒了
                  _this3.GetModel(BagModel).removeBag(CELL_TID_DIAMOND, tb.needCell.count);
                  _this3.refreshNormal();
                  hope.message.dispatchEvent(GameEvent.BattleRefreshUI);
                }
              }, "购买格子", "购买");
            };
          }
        };
        _proto.refreshFactory = function refreshFactory() {
          var _this4 = this;
          var tbs = hope.config.tables.TbFactoryStore.getDataList();
          this.setGridCount(tbs.length);
          var _loop2 = function _loop2(i) {
            var compt = _this4.view.nodeGrid.children[i].getComponent(BagItemCell);
            var bag = _this4.GetModel(BagModel).factoryBag[i];
            compt.refreshFactory(tbs[i].storeCell, true, !!(bag != null && bag.cellId));
            compt.node.active = true;
            compt.cb = function () {
              // 生产仓库点击不知道需求
              _this4.removeBag(1, tbs[i].storeCell);
              _this4.refreshFactory();
            };
          };
          for (var i = 0; i < tbs.length; i++) {
            _loop2(i);
          }
        };
        _proto.refreshMaterial = function refreshMaterial() {
          var _this5 = this;
          var tbs = hope.config.tables.TbMaterialStore.getDataList();
          this.setGridCount(tbs.length);
          var _loop3 = function _loop3(i) {
            var compt = _this5.view.nodeGrid.children[i].getComponent(BagItemCell);
            var bag = _this5.GetModel(BagModel).materialBag[i];
            compt.refreshMaterial(tbs[i].storeCell, true, bag == null ? void 0 : bag.count);
            compt.node.active = true;
            compt.cb = function () {
              _this5.removeBag(2, tbs[i].storeCell);
              _this5.refreshMaterial();
            };
          };
          for (var i = 0; i < tbs.length; i++) {
            _loop3(i);
          }
        };
        _proto.removeBag = function removeBag(type, cellTid) {
          if (type == 0) ;else if (type == 1) {
            // this.GetModel(BagModel).removeFactory(cellTid)
            return;
          } else ;
          var valid = this.GetModel(BattleModel).getAllEmptyCells();
          if (cellTid && valid.length > 0) {
            if (this.GetModel(BagModel).removeBag(cellTid, 1)) {
              hope.message.dispatchEvent(GameEvent.BattleSetCell, {
                gridCellData: valid[0],
                cellTid: cellTid
              });
            }
          } else {
            if (cellTid) {
              hope.gui.toast("没有位置了");
            } else {
              warn("点击空了");
            }
          }
        };
        _proto.setGridCount = function setGridCount(count) {
          // 先获取否则删除后长度会变化
          var gridLength = this.view.nodeGrid.children.length;
          // 如果 this.view.nodeGrid.children 数量小于 count 就创建，则删除多余格子
          if (gridLength < count) {
            for (var i = 0; i < count - gridLength; i++) {
              var node = this.poolCell.get();
              node.active = false;
              node.parent = this.view.nodeGrid;
            }
          } else {
            for (var _i = 0; _i < gridLength - count; _i++) {
              // this.view.nodeGrid.children[i].destroy()
              // this.view.nodeGrid.children[i].removeFromParent();
              this.poolCell.put(this.view.nodeGrid.children[_i]);
            }
          }
        };
        return BagCtrl;
      }(BaseCtrl));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bag_item_cell.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './cell_base.ts', './ViewUtil.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Label, Button, Component, CellBase, ViewUtil;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Button = module.Button;
      Component = module.Component;
    }, function (module) {
      CellBase = module.CellBase;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "ac26fZUwPNPgblJd3B2BlgX", "bag_item_cell", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BagItemCell = exports('BagItemCell', (_dec = ccclass('BagItemCell'), _dec2 = property(CellBase), _dec3 = property(CellBase), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Label), _dec7 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BagItemCell, _Component);
        function BagItemCell() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "comptCell", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comptCellBack", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgLock", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgQuest", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelCount", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btn", _descriptor6, _assertThisInitialized(_this));
          _this._cb = void 0;
          return _this;
        }
        var _proto = BagItemCell.prototype;
        _proto.onLoad = function onLoad() {
          ViewUtil.registerButtonClick(this.btn, this.onClick, this);
        };
        _proto.refreshNormal = function refreshNormal(cellTId, lock) {
          if (lock === void 0) {
            lock = false;
          }
          this.comptCell.node.active = !!cellTId;
          if (this.comptCell.node.active) {
            this.comptCell.refresh(cellTId);
          }
          this.comptCellBack.node.active = false;
          this.nodeImgQuest.active = false;
          this.nodeImgLock.active = lock;
          this.labelCount.node.active = false;
        };
        _proto.refreshFactory = function refreshFactory(cellTId, unlock, have) {
          if (unlock === void 0) {
            unlock = true;
          }
          if (have === void 0) {
            have = true;
          }
          this.comptCellBack.node.active = unlock;
          if (this.comptCellBack.node.active) {
            this.comptCellBack.node.opacity = 0.5 * 255;
            this.comptCellBack.refresh(cellTId);
          }
          this.comptCell.node.active = have;
          if (this.comptCell.node.active) {
            this.comptCell.refresh(cellTId);
          }
          this.nodeImgQuest.active = !unlock;
          this.nodeImgLock.active = false;
          this.labelCount.node.active = false;
        };
        _proto.refreshMaterial = function refreshMaterial(cellTId, unlock, count) {
          if (unlock === void 0) {
            unlock = true;
          }
          if (count === void 0) {
            count = 0;
          }
          this.comptCellBack.node.active = unlock;
          if (this.comptCellBack.node.active) {
            this.comptCellBack.node.opacity = 0.5 * 255;
            this.comptCellBack.refresh(cellTId);
          }
          this.comptCell.node.active = count > 0;
          if (this.comptCell.node.active) {
            this.comptCell.refresh(cellTId);
          }
          this.nodeImgQuest.active = !unlock;
          this.nodeImgLock.active = false;
          this.labelCount.node.active = true;
          this.labelCount.string = count.toString();
        };
        _proto.onClick = function onClick() {
          if (this._cb) {
            this._cb();
          }
        };
        _createClass(BagItemCell, [{
          key: "cb",
          set: function set(value) {
            this._cb = value;
          }
        }]);
        return BagItemCell;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "comptCell", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "comptCellBack", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgLock", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgQuest", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelCount", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bag_model.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IModel.ts', './Hope.ts', './player_model.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, warn, ModelDecorator, AbstractModel, hope, PlayerModel;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
    }, function (module) {
      ModelDecorator = module.ModelDecorator;
      AbstractModel = module.AbstractModel;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      PlayerModel = module.PlayerModel;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "7ccb5L/JZBKWaZFcnkAEG+0", "bag_model", undefined);
      var BAG_TYPE_OTHER = exports('BAG_TYPE_OTHER', "W88"); // 背包其他类型（保存，金币，体力，钻石）
      var CELL_TID_GOLD = exports('CELL_TID_GOLD', "I400001");
      var CELL_TID_POWER = exports('CELL_TID_POWER', "I400003");
      var CELL_TID_DIAMOND = exports('CELL_TID_DIAMOND', "I400002");
      var CELL_TYPE_OTHER_STORE = exports('CELL_TYPE_OTHER_STORE', "L006");
      var CELL_TYPE_BUBBLE = exports('CELL_TYPE_BUBBLE', "L006");
      var CELL_TYPE_METERIAL_STORE = exports('CELL_TYPE_METERIAL_STORE', "L003");
      var BagModel = exports('BagModel', (_dec = ModelDecorator('BagModel'), _dec(_class = /*#__PURE__*/function (_AbstractModel) {
        _inheritsLoose(BagModel, _AbstractModel);
        function BagModel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AbstractModel.call.apply(_AbstractModel, [this].concat(args)) || this;
          _this._player = void 0;
          return _this;
        }
        var _proto = BagModel.prototype;
        _proto.OnInit = function OnInit() {};
        _proto.addReward = function addReward(tId, count) {
          var cellTb = hope.config.tables.TbCell.get(tId);
          if (!cellTb) {
            warn(tId + " add bag, but not found");
            return false;
          }
          if (cellTb.type === CELL_TYPE_OTHER_STORE) {
            return this.addItemToStore(this.player.data.bag.otherStore, tId, count);
          }
          if (cellTb.type === CELL_TYPE_BUBBLE) {
            return this.addBag(tId, count);
          }
          if (count > 1) {
            hope.gui.toast(tId + " add reward, but count > 1");
          }
          for (var i = 0; i < count; i++) {
            this.player.data.bag.rewardStore.push({
              cellId: tId,
              count: 1
            });
          }
        };
        _proto.removeReward = function removeReward(tId) {
          var cell = this.rewardBag.find(function (cell) {
            return cell.cellId === tId;
          });
          if (cell) {
            var index = this.rewardBag.indexOf(cell);
            this.rewardBag.splice(index, 1);
            return true;
          } else {
            warn(tId + " remove reward from store, but not found");
            return false;
          }
        }

        // 获取空余位置
        ;

        _proto.getNormalBagEmpty = function getNormalBagEmpty() {
          for (var i = 0; i < this.normalBagOpenIndex; i++) {
            if (!this.normalBag[i]) {
              this.normalBag.push({
                cellId: "",
                count: 0
              });
            }
          }
          return this.normalBag.filter(function (v) {
            return v.cellId === "";
          });
        };
        _proto.addBag = function addBag(tId, count) {
          var _this2 = this;
          var cellTb = hope.config.tables.TbCell.get(tId);
          if (!cellTb) {
            warn(tId + " add bag, but not found");
            return false;
          }
          if (cellTb.type === CELL_TYPE_OTHER_STORE) {
            return this.addItemToStore(this.player.data.bag.otherStore, tId, count);
          }
          var factory = hope.config.tables.TbFactoryStore.getDataList().some(function (v) {
            return v.storeCell == tId && v.needLevel <= _this2.player.levelInfo.level;
          });
          if (factory) {
            return this.addItemToStore(this.player.data.bag.factoryStore, tId, count);
          }
          var material = hope.config.tables.TbMaterialStore.getDataList().some(function (v) {
            return v.storeCell == tId;
          });
          if (material) {
            return this.addItemToStore(this.player.data.bag.materialStore, tId, count);
          }
          var normal = this.getNormalBagEmpty();
          if (normal.length > 0) {
            // const bag = this.normalBag.find(v => v.cellId == "");
            // if (bag) {
            normal[0].cellId = tId;
            normal[0].count = count; // 确保设置了 count
            return true;
            // }
          }

          warn(tId + " add normal bag, but not found");
          return false;
        };
        _proto.addItemToStore = function addItemToStore(store, tId, count) {
          var cell = store.find(function (cell) {
            return cell.cellId === tId;
          });
          var cellTb = hope.config.tables.TbCell.get(tId);
          if (cell) {
            cell.count += count;
          } else if (cellTb != null) {
            store.push({
              cellId: tId,
              count: count
            });
          } else {
            warn(tId + " add item to store, but not found");
            return false;
          }
          return true;
        };
        _proto.removeBags = function removeBags(items) {
          var _this3 = this;
          if (!this.haveBags(items)) return false;
          return items.every(function (item) {
            return _this3.removeBag(item.id, item.count);
          });
        };
        _proto.removeBag = function removeBag(tId, count) {
          var cellTb = hope.config.tables.TbCell.get(tId);
          if (!cellTb) {
            warn(tId + " remove bag, but not found");
            return false;
          }
          if (cellTb.type === CELL_TYPE_OTHER_STORE) {
            return this.removeItemFromStore(this.player.data.bag.otherStore, tId, count);
          }
          var factory = this.factoryBag.some(function (v) {
            return v.cellId == tId;
          });
          if (factory) {
            return this.removeItemFromStore(this.player.data.bag.factoryStore, tId, count);
          }
          var material = this.materialBag.some(function (v) {
            return v.cellId == tId;
          });
          if (material) {
            return this.removeItemFromStore(this.materialBag, tId, count);
          }
          var bag = this.normalBag.find(function (v) {
            return v.cellId == tId;
          });
          if (bag) {
            if (bag.count > count) {
              bag.count -= count;
              return true;
            } else if (bag.count === count) {
              bag.cellId = "";
              bag.count = 0;
              return true;
            }
          }
          warn(tId + " want remove bag, but not found");
          return false;
        };
        _proto.haveBags = function haveBags(items) {
          var _this4 = this;
          return items.every(function (item) {
            return _this4.haveBag(item.id, item.count);
          });
        };
        _proto.haveBag = function haveBag(tId, count) {
          var cellTb = hope.config.tables.TbCell.get(tId);
          if (!cellTb) {
            warn(tId + " remove bag, but not found");
            return false;
          }
          if (cellTb.type === CELL_TYPE_OTHER_STORE) {
            return this.haveItemFromStore(this.player.data.bag.otherStore, tId, count);
          }
          var factory = this.factoryBag.some(function (v) {
            return v.cellId == tId;
          });
          if (factory) {
            return this.haveItemFromStore(this.player.data.bag.factoryStore, tId, count);
          }
          var material = this.materialBag.some(function (v) {
            return v.cellId == tId;
          });
          if (material) {
            return this.haveItemFromStore(this.materialBag, tId, count);
          }
          var bag = this.normalBag.find(function (v) {
            return v.cellId == tId;
          });
          if (bag) {
            if (bag.count >= count) {
              return true;
            }
          }
          return false;
        };
        _proto.removeItemFromStore = function removeItemFromStore(store, tId, count) {
          var cell = store.find(function (cell) {
            return cell.cellId === tId;
          });
          if (cell) {
            if (cell.count > count) {
              cell.count -= count;
            } else if (cell.count === count) {
              var index = store.indexOf(cell);
              store.splice(index, 1);
            } else {
              warn(tId + " remove count is greater than available count");
              return false;
            }
            return true;
          } else {
            warn(tId + " remove item from store, but not found");
            return false;
          }
        };
        _proto.haveItemFromStore = function haveItemFromStore(store, tId, count) {
          var cell = store.find(function (cell) {
            return cell.cellId === tId;
          });
          if (cell) {
            if (cell.count >= count) {
              return true;
            } else {
              warn(tId + " remove count is greater than available count");
              return false;
            }
          } else {
            warn(tId + " remove item from store, but not found");
            return false;
          }
        };
        _proto.reqUnlockNormalBag = function reqUnlockNormalBag() {
          this.player.data.bag.normalStoreOpenIndex++;
          this.player.data.bag.normalStore.push({
            cellId: "",
            count: 0
          });
        };
        _createClass(BagModel, [{
          key: "player",
          get: function get() {
            if (!this._player) {
              this._player = this.GetModel(PlayerModel);
            }
            return this._player;
          }
        }, {
          key: "gold",
          get: function get() {
            var _this$player$data$bag, _this$player$data$bag2;
            // 返回bag数组里面cellId等于I400001的count
            return (_this$player$data$bag = (_this$player$data$bag2 = this.player.data.bag.otherStore.find(function (cell) {
              return cell.cellId === CELL_TID_GOLD;
            })) == null ? void 0 : _this$player$data$bag2.count) != null ? _this$player$data$bag : 0;
          }
        }, {
          key: "diamond",
          get: function get() {
            var _this$player$data$bag3, _this$player$data$bag4;
            // 返回bag数组里面cellId等于I400001的count
            return (_this$player$data$bag3 = (_this$player$data$bag4 = this.player.data.bag.otherStore.find(function (cell) {
              return cell.cellId === CELL_TID_DIAMOND;
            })) == null ? void 0 : _this$player$data$bag4.count) != null ? _this$player$data$bag3 : 0;
          }
        }, {
          key: "power",
          get: function get() {
            var _this$player$data$bag5, _this$player$data$bag6;
            // 返回bag数组里面cellId等于I400001的count
            return (_this$player$data$bag5 = (_this$player$data$bag6 = this.player.data.bag.otherStore.find(function (cell) {
              return cell.cellId === CELL_TID_POWER;
            })) == null ? void 0 : _this$player$data$bag6.count) != null ? _this$player$data$bag5 : 0;
          }
        }, {
          key: "normalBagOpenIndex",
          get: function get() {
            return this.player.data.bag.normalStoreOpenIndex;
          }
        }, {
          key: "normalBag",
          get: function get() {
            return this.player.data.bag.normalStore || [];
          }
        }, {
          key: "factoryBag",
          get: function get() {
            return this.player.data.bag.factoryStore || [];
          }
        }, {
          key: "materialBag",
          get: function get() {
            return this.player.data.bag.materialStore || [];
          }
        }, {
          key: "rewardBag",
          get: function get() {
            return this.player.data.bag.rewardStore || [];
          }
        }]);
        return BagModel;
      }(AbstractModel)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bag.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseView.ts', './bag_ctrl.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ToggleContainer, Prefab, Node, warn, BindCtrl, BaseView, BagCtrl;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ToggleContainer = module.ToggleContainer;
      Prefab = module.Prefab;
      Node = module.Node;
      warn = module.warn;
    }, function (module) {
      BindCtrl = module.BindCtrl;
      BaseView = module.BaseView;
    }, function (module) {
      BagCtrl = module.BagCtrl;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "9ea055bMNZGKbmC5wk9zgnM", "bag", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Bag = exports('Bag', (_dec = ccclass('Bag'), _dec2 = BindCtrl(BagCtrl), _dec3 = property(ToggleContainer), _dec4 = property(Prefab), _dec5 = property(Node), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_BaseView) {
        _inheritsLoose(Bag, _BaseView);
        function Bag() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseView.call.apply(_BaseView, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "toggleContainer", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "prefabBagItemCell", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeGrid", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Bag.prototype;
        _proto.onAdded = function onAdded(args) {
          warn("++++++++++", args);
        };
        return Bag;
      }(BaseView), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "toggleContainer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefabBagItemCell", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeGrid", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './architecture.ts', './IController.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, QFArchitecture, AbstractController;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      QFArchitecture = module.QFArchitecture;
    }, function (module) {
      AbstractController = module.AbstractController;
    }],
    execute: function () {
      cclegacy._RF.push({}, "151dec1YR9M6oV6BpTSKTSP", "BaseCtrl", undefined);
      var BaseCtrl = exports('BaseCtrl', /*#__PURE__*/function (_AbstractController) {
        _inheritsLoose(BaseCtrl, _AbstractController);
        function BaseCtrl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AbstractController.call.apply(_AbstractController, [this].concat(args)) || this;
          _this._view = void 0;
          return _this;
        }
        var _proto = BaseCtrl.prototype;
        _proto.bindView = function bindView(view) {
          this._view = view;
        };
        _proto.GetArchitecture = function GetArchitecture() {
          return QFArchitecture.Interface;
        };
        _createClass(BaseCtrl, [{
          key: "view",
          get: function get() {
            return this._view;
          }
        }]);
        return BaseCtrl;
      }(AbstractController));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameComponent.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, GameComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameComponent = module.GameComponent;
    }],
    execute: function () {
      exports('BindCtrl', BindCtrl);
      cclegacy._RF.push({}, "cdf73ry2EJGC5p6SWirVign", "BaseView", undefined);
      var BaseView = exports('BaseView', /*#__PURE__*/function (_GameComponent) {
        _inheritsLoose(BaseView, _GameComponent);
        function BaseView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GameComponent.call.apply(_GameComponent, [this].concat(args)) || this;
          _this._ctrl = void 0;
          return _this;
        }
        var _proto = BaseView.prototype;
        _proto.onLoad = function onLoad() {
          if (this._ctrl && this._ctrl.onLoad) {
            this._ctrl.onLoad();
          }
        };
        _proto.start = function start() {
          if (this._ctrl && this._ctrl.start) {
            this._ctrl.start();
          }
        };
        _proto.update = function update(deltaTime) {
          if (this._ctrl && this._ctrl.update) {
            this._ctrl.update(deltaTime);
          }
        };
        _proto.onDestroy = function onDestroy() {
          if (this._ctrl && this._ctrl.onDestroy) {
            this._ctrl.onDestroy();
          }
          _GameComponent.prototype.onDestroy.call(this);
        }

        // 手动绑定控制器和创建实例的方法
        ;

        _proto.manualBindCtrl = function manualBindCtrl(ctrlConstructor) {
          if (!this._ctrl) {
            var ctrl = new ctrlConstructor(); // 创建控制器实例
            this._ctrl = ctrl; // 绑定控制器
            ctrl.bindView(this); // 绑定视图
          }
        };

        _createClass(BaseView, [{
          key: "ctrl",
          get: function get() {
            return this._ctrl;
          },
          set: function set(value) {
            this._ctrl = value;
          }
        }]);
        return BaseView;
      }(GameComponent));
      function BindCtrl(ctrlConstructor) {
        return function (viewClass) {
          return /*#__PURE__*/function (_viewClass) {
            _inheritsLoose(_class2, _viewClass);
            function _class2() {
              var _this2;
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }
              _this2 = _viewClass.call.apply(_viewClass, [this].concat(args)) || this;
              _this2.manualBindCtrl(ctrlConstructor);
              return _this2;
            }
            return _class2;
          }(viewClass);
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/battle_ctrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts', './ViewUtil.ts', './Drag.ts', './cell.ts', './cell_bg.ts', './battle_model.ts', './event_game.ts', './config_game_ui.ts', './mission_model.ts', './mission_item.ts', './bag_model.ts', './BaseCtrl.ts', './player_model.ts', './TimeUtils.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, Size, warn, instantiate, Vec3, log, error, tween, NodePool, hope, ViewUtil, Drag, Cell, CellBg, COLUMN_NUM, ROW_NUM, BattleModel, CellType, SwapType, DirectionsFour, GameEvent, UIID, MissionModel, MissionItem, BagModel, CELL_TID_POWER, CELL_TID_DIAMOND, BaseCtrl, PlayerModel, TimeUtil;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Size = module.Size;
      warn = module.warn;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      log = module.log;
      error = module.error;
      tween = module.tween;
      NodePool = module.NodePool;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }, function (module) {
      Drag = module.Drag;
    }, function (module) {
      Cell = module.Cell;
    }, function (module) {
      CellBg = module.CellBg;
    }, function (module) {
      COLUMN_NUM = module.COLUMN_NUM;
      ROW_NUM = module.ROW_NUM;
      BattleModel = module.BattleModel;
      CellType = module.CellType;
      SwapType = module.SwapType;
      DirectionsFour = module.DirectionsFour;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      UIID = module.UIID;
    }, function (module) {
      MissionModel = module.MissionModel;
    }, function (module) {
      MissionItem = module.MissionItem;
    }, function (module) {
      BagModel = module.BagModel;
      CELL_TID_POWER = module.CELL_TID_POWER;
      CELL_TID_DIAMOND = module.CELL_TID_DIAMOND;
    }, function (module) {
      BaseCtrl = module.BaseCtrl;
    }, function (module) {
      PlayerModel = module.PlayerModel;
    }, function (module) {
      TimeUtil = module.TimeUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f1307Y8kv1NOKlrK2yeJroz", "battle_ctrl", undefined);
      var BattleCtrl = exports('BattleCtrl', /*#__PURE__*/function (_BaseCtrl) {
        _inheritsLoose(BattleCtrl, _BaseCtrl);
        function BattleCtrl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseCtrl.call.apply(_BaseCtrl, [this].concat(args)) || this;
          // 定义二维数组来保存 Cell 组件
          _this.cellCompts = [];
          // Cell Node池子，默认隐藏，创建等情况使用
          _this.poolCell = new NodePool('CellPool');
          // cell适配大小
          _this.sizeCell = void 0;
          // 每个类型的Mission
          _this.mapMission = new Map();
          _this._recoverTime = 0;
          return _this;
        }
        var _proto = BattleCtrl.prototype;
        _proto.onLoad = function onLoad() {
          // 初始化二维数组
          this.cellCompts = Array.from({
            length: COLUMN_NUM
          }, function () {
            return Array(ROW_NUM).fill(null);
          });

          // 算出自适应的砖块大小
          var h = this.view.nodeGird.h / ROW_NUM;
          var w = this.view.nodeGird.w / COLUMN_NUM;
          var wh = h < w ? h : w;
          this.sizeCell = new Size(w, w);
          warn(this.view.nodeGird.size, w, h, wh);
          for (var i = 0; i < this.GetModel(BattleModel).map.data.length; i++) {
            var data = this.GetModel(BattleModel).map.data[i];

            // 棋盘
            var nodeCellBg = instantiate(this.view.prefabCellBg);
            nodeCellBg.size = this.sizeCell;
            var cellBgCmpt = nodeCellBg.getComponent(CellBg);
            cellBgCmpt.refresh(data);
            this.view.nodeGirdBg.addChild(nodeCellBg);
            nodeCellBg.position = new Vec3(w * data.x + w / 2, w * -data.y - w / 2, 0);

            // 棋子
            var nodeCell = instantiate(this.view.prefabCell);
            nodeCell.size = this.sizeCell;
            var cellComp = nodeCell.getComponent(Cell);
            // 这里获取idx为了填表方便使用策划方便的id
            cellComp.refresh({
              cell: data,
              unlockLevel: this.GetModel(BattleModel).checkLevelLock(data)
            });
            this.view.nodeGird.addChild(nodeCell);
            nodeCell.position = new Vec3(w * data.x + w / 2, w * -data.y - w / 2, 0);

            // 保存 cellComp 到二维数组
            this.cellCompts[data.x][data.y] = cellComp;

            // 增加回调
            var drag = cellComp.getComponent(Drag);
            drag.clickCallback = this.onDragClick.bind(this);
            drag.dragMoveCallback = this.onDragMove.bind(this);
            drag.checkSucceedCallback = this.onDragSucceedCheck.bind(this);
            drag.checkDragCallback = this.onDragCheck.bind(this);
            drag.succeedCallback = this.onDragSucceed.bind(this);
          }
          for (var _i = 0; _i < 5; _i++) {
            var _nodeCell = instantiate(this.view.prefabCell);
            _nodeCell.size = this.sizeCell;
            this.poolCell.put(_nodeCell);
          }
          this.refreshUI();
          this.addEvent();
        };
        _proto.update = function update(deltaTime) {
          // 这里做ui相关倒计时
          // 创建一个累计时间，每一分钟恢复一点体力
          if (this.GetModel(BagModel).power < hope.config.tables.TbConfig.defaultLimit) {
            this._recoverTime += deltaTime;
            if (this._recoverTime >= hope.config.tables.TbConfig.defaultRecoverTime) {
              this.GetModel(BagModel).addBag(CELL_TID_POWER, 1);
              this._recoverTime = 0;
              this.refreshTop();
            }
          }
        };
        _proto.addEvent = function addEvent() {
          var _this2 = this;
          ViewUtil.registerButtonClick(this.view.btnMap, function () {
            hope.gui.open(UIID.Map);
            hope.gui.removeByNode(_this2.view.node);
          }, this);
          ViewUtil.registerButtonClick(this.view.btnSell, this.onBtnSellClick, this);
          ViewUtil.registerButtonClick(this.view.btnAd, this.onBtnAdClick, this);
          ViewUtil.registerButtonClick(this.view.btnDiamond, this.onBtnDiamondClick, this);
          ViewUtil.registerButtonClick(this.view.btnBag, this.onBtnBagClick, this);
          ViewUtil.registerButtonClick(this.view.btnRewardStore, this.onBtnRewardStoreClick, this);
          ViewUtil.registerButtonClick(this.view.btnLevel, function () {
            _this2.GetModel(PlayerModel).data.exp += 10;
            _this2.refreshTop();
          }, this);
          hope.message.on(GameEvent.BattleCellCountdownFinish, this.onHandler, this);
          hope.message.on(GameEvent.BattleMissionClickFinish, this.onHandler, this);
          hope.message.on(GameEvent.BattleSetCell, this.onHandler, this);
          hope.message.on(GameEvent.BattleRefreshUI, this.refreshUI, this);
        };
        _proto.removeEvent = function removeEvent() {
          hope.message.offAllByObject(this);
        };
        _proto.onDestroy = function onDestroy() {
          this.removeEvent();
          this.poolCell.clear();
        };
        _proto.onHandler = function onHandler(event, args) {
          switch (event) {
            case GameEvent.BattleCellCountdownFinish:
              warn("-----泡泡破了-----", args);
              this.onCellCountdownFinish(args);
              break;
            case GameEvent.BattleMissionClickFinish:
              warn("-----完成任务-----", args);
              this.missionFinish(args);
              break;
            case GameEvent.BattleSetCell:
              warn("-----设置cell-----", args);
              this.setCell(args.gridCellData, args.cellTid);
              break;
          }
        };
        _proto.refreshUI = function refreshUI() {
          this.refreshTop();
          this.refreshMission();
          this.refreshBottom();
        };
        _proto.refreshTop = function refreshTop() {
          this.view.labelLevel.string = "" + this.GetModel(PlayerModel).levelInfo.level;
          this.view.labelExp.string = this.GetModel(PlayerModel).levelInfo.currentExp + "/" + this.GetModel(PlayerModel).levelInfo.nextLevelExp;
          this.view.labelDiamond.string = "" + this.GetModel(BagModel).diamond;
          this.view.labelGold.string = "" + this.GetModel(BagModel).gold;
          this.view.labelPower.string = "" + this.GetModel(BagModel).power;
        };
        _proto.refreshBottom = function refreshBottom() {
          var selectCell = this.GetModel(BattleModel).selectCell;
          if (selectCell) {
            var tbCell = hope.config.tables.TbCell.get(selectCell.cellId);
            this.view.labelBottomInfo.string = tbCell.name + "-" + selectCell.x + "-" + selectCell.y;
            this.view.btnAd.node.active = !!tbCell.bubbleId;
            this.view.btnDiamond.node.active = !!tbCell.bubbleId || selectCell.countdown >= 0;
            this.view.btnSell.node.active = !tbCell.factoryId && !tbCell.bubbleId && selectCell.active && !!tbCell.sellCell;
            this.view.btnInfo.node.active = true;
          } else {
            this.view.labelBottomInfo.string = "";
            this.view.btnAd.node.active = false;
            this.view.btnDiamond.node.active = false;
            this.view.btnSell.node.active = false;
            this.view.btnInfo.node.active = false;
          }
        };
        _proto.refreshMission = function refreshMission() {
          var _this3 = this;
          this.GetModel(MissionModel).refreshMission();
          var typeMissions = this.GetModel(MissionModel).getTbMissionsGroupByType();
          var doingTypes = this.GetModel(MissionModel).getDoingMissionTypes();

          // 刷新任务面板
          for (var type in typeMissions) {
            // 如果有这个类型的任务
            if (doingTypes.includes(type)) {
              // 没有创建过node
              if (!this.mapMission.has(type)) {
                var compt = instantiate(this.view.prefabMission).getComponent(MissionItem);
                this.view.scrollViewMission.content.addChild(compt.node);
                this.mapMission.set(type, compt);
              }
              this.mapMission.get(type).refresh(this.GetModel(MissionModel).getDoingMissionByType(type));
            } else {
              if (this.mapMission.has(type)) {
                this.mapMission.get(type).node.active = false;
              }
            }
          }
          this.GetModel(BattleModel).getAllValidCells().forEach(function (cellData) {
            var comp = _this3.getCellCompt(cellData);
            comp.missionNeed(cellData.isMissionNeed);
          });
          this.view.btnRewardStore.node.active = this.GetModel(BagModel).rewardBag.length > 0;
          warn("warn:---", this.GetModel(BagModel).rewardBag);
          if (this.view.btnRewardStore.node.active) {
            // 这里禁用一下cell里面的
            this.view.comptReardStore.btn.node.active = false;
            this.view.comptReardStore.refreshNormal(this.GetModel(BagModel).rewardBag[this.GetModel(BagModel).rewardBag.length - 1].cellId);
          }
        };
        _proto.onDragClick = function onDragClick(e) {
          var node = e.getCurrentTarget();
          var compt = node.getComponent(Cell);
          var cellData = this.GetModel(BattleModel).map.getCell(compt.x, compt.y);
          log("onDragClick: " + cellData.x + "-" + cellData.y, cellData);
          if (this.GetModel(BattleModel).checkLevelLock(cellData) > 0) {
            hope.gui.toast("等级锁定");
            return;
          }
          if (cellData.ground) {
            hope.gui.toast("有尘土");
            return;
          }
          var tbCell = hope.config.tables.TbCell.get(cellData.cellId);
          if (!tbCell) {
            return;
          }

          // 是生产物
          if (this.GetModel(BattleModel).isFactoryCell(cellData.x, cellData.y)) {
            if (!cellData.active) {
              hope.gui.toast("未激活");
              return;
            }
            if (this.GetModel(BattleModel).selectCell == cellData) {
              if (cellData.useCount == 0 && tbCell.factoryId_ref.startCd > 0) {
                cellData.countdown = tbCell.factoryId_ref.startCd;
              }
              this.factoryMake(cellData);
            }
          } else if (tbCell.type == CellType.VALUE) {
            // 这里是点击金币，体力等
            if (this.GetModel(BattleModel).selectCell == cellData) {
              // 卖了，这里选择变成空了，下面不要执行，否则又要被选择了
              this.sellCell(cellData);
              return;
            }
          }
          // 点击了最后都要选择
          this.selectCell(cellData);
        };
        _proto.onDragCheck = function onDragCheck(e) {
          var node = e.getCurrentTarget();
          var compt = node.getComponent(Cell);
          var data = this.GetModel(BattleModel).map.getCell(compt.x, compt.y);
          return data.cellId && data.active && !data.ground;
        };
        _proto.onDragMove = function onDragMove(e) {
          var node = e.getCurrentTarget();
          this.cellCompts.flat().filter(function (cellComp) {
            return cellComp.data.cell.cellId;
          }).forEach(function (cellComp) {
            var p = e.getUILocation();
            if (ViewUtil.isPointCollidingWithNode(p, cellComp.node) && cellComp.node != node) ;
          });
        };
        _proto.onDragSucceedCheck = function onDragSucceedCheck(e) {
          var _this4 = this;
          var node = e.getCurrentTarget();
          var compt = node.getComponent(Cell);
          var cellData = this.GetModel(BattleModel).map.getCell(compt.x, compt.y);
          var result = null;
          var p = e.getUILocation();
          this.cellCompts.flat().forEach(function (otherCompt) {
            if (ViewUtil.isPointCollidingWithNode(p, otherCompt.node) && otherCompt.node != node) {
              var otherData = _this4.GetModel(BattleModel).map.getCell(otherCompt.x, otherCompt.y);
              if (otherData.ground) {
                hope.gui.toast("onDragSucceedCheck-有尘土");
                return;
              }
              log("A cell: " + cellData.x + "-" + cellData.y + " || B cell: " + otherData.x + "-" + otherData.y);
              var swapType = _this4.GetModel(BattleModel).checkSwapType(cellData, otherData);
              if (swapType != SwapType.None) {
                result = {
                  swapA: cellData,
                  swapB: otherData,
                  type: swapType
                };
                return;
              } else {
                hope.gui.toast("checkSwapType 无法移动");
              }
              // 这里选择起来先
              _this4.selectCell(cellData);
            }
          });
          if (ViewUtil.isPointCollidingWithNode(p, this.view.btnBag.node)) {
            this.addBag(cellData);
          }
          return result;
        };
        _proto.onDragSucceed = function onDragSucceed(e, checkData) {
          var swapA = checkData.swapA,
            swapB = checkData.swapB,
            type = checkData.type;
          error("测试");
          if (type == SwapType.None) {
            warn("不可能");
          }
          log("type:" + type + " -- swapA cell: " + swapA.x + "-" + swapA.y + " to swapB cell: " + swapB.x + "-" + swapB.y);
          if (type == SwapType.Swap) {
            this.swap(swapA, swapB);
            this.selectCell(swapA);
          } else if (type == SwapType.Merge) {
            this.merge(swapA, swapB);
            this.selectCell(swapB);
            // 有合并的话，刷新任务
            this.refreshMission();
          }
        };
        _proto.onBtnRewardStoreClick = function onBtnRewardStoreClick(e) {
          var cellTid = this.GetModel(BagModel).rewardBag[this.GetModel(BagModel).rewardBag.length - 1].cellId;
          var valid = this.GetModel(BattleModel).getAllEmptyCells();
          if (cellTid && valid.length > 0) {
            if (this.GetModel(BagModel).removeReward(cellTid)) {
              hope.message.dispatchEvent(GameEvent.BattleSetCell, {
                gridCellData: valid[0],
                cellTid: cellTid
              });
            }
            this.refreshMission();
          } else {
            if (cellTid) {
              hope.gui.toast("没有位置了");
            } else {
              warn("点击空了");
            }
          }
        };
        _proto.onBtnSellClick = function onBtnSellClick(e) {
          this.sellCell(this.GetModel(BattleModel).selectCell);
        };
        _proto.onBtnAdClick = function onBtnAdClick(e) {
          var _this5 = this;
          hope.gui.tip.alert("是否看广告戳破", function () {
            _this5.burstBubble(_this5.GetModel(BattleModel).selectCell);
          }, "广告戳破", "看广告");
        };
        _proto.onBtnDiamondClick = function onBtnDiamondClick(e) {
          var _this6 = this;
          var selectCell = this.GetModel(BattleModel).selectCell;
          var tbCell = hope.config.tables.TbCell.get(selectCell.cellId);
          if (tbCell.bubbleId_ref) {
            hope.gui.tip.alert("是否花费钻石戳破", function () {
              _this6.burstBubble(_this6.GetModel(BattleModel).selectCell);
            }, "钻石戳破", "购买");
          } else {
            var need = Math.ceil(selectCell.countdown / 180) * tbCell.factoryId_ref.buyCdCount;
            hope.gui.tip.alert("\u662F\u5426\u82B1\u8D39" + need + "\u94BB\u77F3\u51CF\u5C11cd", function () {
              if (_this6.GetModel(BagModel).removeBag(CELL_TID_DIAMOND, need)) {
                // 通过本身倒计时去触发逻辑
                selectCell.countdown = 0.000001;
              } else {
                hope.gui.toast("钻石不足");
              }
            }, "减少cd", "购买");
          }
        };
        _proto.onBtnBagClick = function onBtnBagClick(e) {
          hope.gui.open(UIID.BattleBag, null, null);
        };
        _proto.selectCell = function selectCell(cellData) {
          // 相同就不做操作
          if (cellData == this.GetModel(BattleModel).selectCell) {
            return;
          }
          // 如果之前有选择的，先强制不选择
          if (this.GetModel(BattleModel).selectCell) {
            this.cellCompts[this.GetModel(BattleModel).selectCell.x][this.GetModel(BattleModel).selectCell.y].select(false);
          }
          // 数据层选择
          this.GetModel(BattleModel).selectCell = cellData;
          // 刷新选择的节点选择高亮，有可能没了，比如卖了
          if (this.GetModel(BattleModel).selectCell) {
            this.cellCompts[this.GetModel(BattleModel).selectCell.x][this.GetModel(BattleModel).selectCell.y].select(cellData.isSelect);
          }
          // 界面刷新（下部分变动）
          this.refreshBottom();
        };
        _proto.sellCell = function sellCell(cellData) {
          // 点数据，请求
          this.GetModel(BattleModel).reqSell(cellData);
          this.clearCell(cellData);
          this.refreshTop();
        };
        _proto.clearCell = function clearCell(cellData) {
          // 清除
          this.GetModel(BattleModel).clearCell(cellData.x, cellData.y);
          // 这里是真的刷新
          var newItemCellData = {
            cell: this.GetModel(BattleModel).map.getCell(cellData.x, cellData.y)
          };
          var cellComp = this.cellCompts[cellData.x][cellData.y];
          // 界面也要刷新
          cellComp.refresh(newItemCellData);
          if (this.GetModel(BattleModel).selectCell == cellData) {
            this.selectCell(null);
          }
          // 坐标立马还原
          cellComp.node.position = this.getPos(cellData.x, cellData.y);
        };
        _proto.setCell = function setCell(cellData, cellTid) {
          // 清除
          this.GetModel(BattleModel).setCell(cellData.x, cellData.y, cellTid);
          // 这里是真的刷新
          var newItemCellData = {
            cell: this.GetModel(BattleModel).map.getCell(cellData.x, cellData.y)
          };
          var cellComp = this.cellCompts[cellData.x][cellData.y];
          cellComp.refresh(newItemCellData);

          // 坐标立马还原
          cellComp.node.position = this.getPos(cellData.x, cellData.y);
        }

        // 交换逻辑
        ;

        _proto.swap = function swap(swapA, swapB) {
          var x1 = swapA.x;
          var y1 = swapA.y;
          var x2 = swapB.x;
          var y2 = swapB.y;

          // 交换 cellCompts 容器中的组件
          var tempCellComp = this.cellCompts[x1][y1];
          this.cellCompts[x1][y1] = this.cellCompts[x2][y2];
          this.cellCompts[x2][y2] = tempCellComp;

          // 交换模型中的数据
          this.GetModel(BattleModel).swap(x1, y1, x2, y2);

          // 使用 moveTo 函数移动格子到新位置
          this.moveTo(this.cellCompts[x1][y1]);
          this.moveTo(this.cellCompts[x2][y2]);
        }

        // 合并逻辑
        ;

        _proto.merge = function merge(swapA, swapB) {
          var _this7 = this;
          // 处理A、B合并数据
          this.GetModel(BattleModel).merge(swapA, swapB);

          // 检查周围4个解除沙尘
          this.GetModel(BattleModel).checkAround(swapB, function (other) {
            _this7.getCellCompt(other).refresh();
          }, DirectionsFour);

          // A 立马返回
          this.getCellCompt(swapA).node.position = this.getPos(swapA.x, swapA.y);
          // 刷新 or 动画
          this.getCellCompt(swapA).refresh();
          this.getCellCompt(swapB).refresh();

          // 这里要传swapB，因为A已经被合并了
          var tbCell = hope.config.tables.TbCell.get(swapB.cellId);
          this.mergeMake(swapB, tbCell.mergeCell1Chance);
          // 这里可能生产出2个东西
          this.mergeMake(swapB, tbCell.mergeCell2Chance);
        }

        // 合并生产
        ;

        _proto.mergeMake = /*#__PURE__*/
        function () {
          var _mergeMake = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(cellData, tbCellChances) {
            var mergeNearestCell, x, y, mergeMakeData, newItemCellData;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // 合并后额外生产前提是要找到
                  mergeNearestCell = this.GetModel(BattleModel).findNearestActiveCell(cellData, true); // 找到周边空位
                  if (!mergeNearestCell) {
                    _context.next = 16;
                    break;
                  }
                  log("\u5408\u5E76\u751F\u4EA7nearestCell: " + mergeNearestCell.x + "-" + mergeNearestCell.y);
                  x = mergeNearestCell.x;
                  y = mergeNearestCell.y;
                  mergeMakeData = this.GetModel(BattleModel).mergeMake(tbCellChances, x, y);
                  if (!mergeMakeData) {
                    _context.next = 13;
                    break;
                  }
                  _context.next = 9;
                  return this.animTempCellMoveTo(cellData, x, y);
                case 9:
                  // 这里是真的刷新
                  newItemCellData = {
                    cell: this.GetModel(BattleModel).map.getCell(mergeMakeData.x, mergeMakeData.y)
                  };
                  this.cellCompts[x][y].refresh(newItemCellData);
                  _context.next = 14;
                  break;
                case 13:
                  warn("合并生产没有random到cell");
                case 14:
                  _context.next = 17;
                  break;
                case 16:
                  hope.gui.toast("合并生成没有格子了");
                case 17:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function mergeMake(_x, _x2) {
            return _mergeMake.apply(this, arguments);
          }
          return mergeMake;
        }() // 生产物生产
        ;

        _proto.factoryMake = /*#__PURE__*/
        function () {
          var _factoryMake = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(cellData) {
            var factoryNearestCell, x, y, factoryMakeData, newItemCellData, tbCell, useCountMax;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(cellData.countdown > 0)) {
                    _context2.next = 3;
                    break;
                  }
                  hope.gui.toast("生产物cd中");
                  return _context2.abrupt("return");
                case 3:
                  // 找到周边空位
                  factoryNearestCell = this.GetModel(BattleModel).findNearestActiveCell(cellData, true);
                  if (!factoryNearestCell) {
                    _context2.next = 22;
                    break;
                  }
                  x = factoryNearestCell.x;
                  y = factoryNearestCell.y;
                  log("\u5DE5\u5382\u751F\u4EA7nearestCell: " + factoryNearestCell.x + "-" + factoryNearestCell.y);
                  factoryMakeData = this.GetModel(BattleModel).factoryMake(cellData, x, y);
                  if (!factoryMakeData) {
                    _context2.next = 19;
                    break;
                  }
                  _context2.next = 12;
                  return this.animTempCellMoveTo(cellData, x, y);
                case 12:
                  // 这里是真的刷新
                  newItemCellData = {
                    cell: this.GetModel(BattleModel).map.getCell(factoryMakeData.x, factoryMakeData.y)
                  };
                  this.cellCompts[x][y].refresh(newItemCellData);
                  // hope.gui.toast("refresh")

                  // 生产次数达到上限消失
                  tbCell = hope.config.tables.TbCell.get(cellData.cellId);
                  if (tbCell.factoryId_ref.factoryCountChance.length > 0) {
                    useCountMax = this.GetModel(PlayerModel).getRandomIdFromChances(tbCell.factoryId_ref.factoryCountChance).id; // 如果次数大于次数上限，并且不是repeat，就消失，否则就进入冷却
                    if (cellData.useCount >= Number(useCountMax)) {
                      if (tbCell.factoryId_ref.repeat) {
                        cellData.useCount = 0;
                        cellData.countdown = Number(this.GetModel(PlayerModel).getRandomIdFromChances(tbCell.factoryId_ref.cdChance).id);
                      } else {
                        this.clearCell(cellData);
                      }
                    }
                  }
                  this.refreshUI();
                  _context2.next = 20;
                  break;
                case 19:
                  hope.gui.toast("没有体力生产物创建物品失败");
                case 20:
                  _context2.next = 23;
                  break;
                case 22:
                  hope.gui.toast("生产物没有格子了");
                case 23:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function factoryMake(_x3) {
            return _factoryMake.apply(this, arguments);
          }
          return factoryMake;
        }();
        _proto.onCellCountdownFinish = function onCellCountdownFinish(cellData) {
          var tbCell = hope.config.tables.TbCell.get(cellData.cellId);
          if (tbCell.bubbleId_ref) {
            this.burstBubble(cellData);
          }
          this.refreshBottom();
        }

        // 戳泡泡
        ;

        _proto.burstBubble = function burstBubble(cellData) {
          var tbCell = hope.config.tables.TbCell.get(cellData.cellId);
          if (tbCell.bubbleId_ref) {
            this.GetModel(BattleModel).burstBubble(cellData);
            var newItemCellData = {
              cell: this.GetModel(BattleModel).map.getCell(cellData.x, cellData.y)
            };
            this.cellCompts[cellData.x][cellData.y].refresh(newItemCellData);
          } else {
            hope.gui.toast("\u6233\u6CE1\u6CE1\u7F3A\u5C11\u8868:" + cellData.cellId);
          }
        };
        _proto.animTempCellMoveTo = /*#__PURE__*/function () {
          var _animTempCellMoveTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(cellData, x, y) {
            var targetPosition, targetData;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  targetPosition = this.getPos(x, y);
                  targetData = this.GetModel(BattleModel).map.getCell(x, y);
                  _context3.next = 4;
                  return this.animTempCellMove(cellData, targetData, targetPosition);
                case 4:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function animTempCellMoveTo(_x4, _x5, _x6) {
            return _animTempCellMoveTo.apply(this, arguments);
          }
          return animTempCellMoveTo;
        }();
        _proto.animTempCellMove = /*#__PURE__*/function () {
          var _animTempCellMove = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(cellData, targetData, targetPosition) {
            var _this8 = this;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return", new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve) {
                    var tempCell, tempCellData;
                    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                      while (1) switch (_context4.prev = _context4.next) {
                        case 0:
                          tempCell = _this8.poolCell.get().getComponent(Cell);
                          _this8.view.nodeGird.addChild(tempCell.node);

                          // 设置初始位置为生产者位置
                          tempCell.node.position = _this8.getPos(cellData.x, cellData.y);

                          // 刷新成新的物品的样子或保持老物品的样子
                          tempCellData = {
                            cell: _this8.GetModel(BattleModel).map.getCell(targetData.x, targetData.y),
                            unlockLevel: 0
                          };
                          tempCell.refresh(tempCellData);
                          tempCell.node.active = true;

                          // 移动到目标位置，并隐藏，放回池中
                          _context4.next = 8;
                          return _this8.moveToVec3(tempCell, targetPosition);
                        case 8:
                          resolve();
                          _context4.next = 11;
                          return TimeUtil.sleep(0.5 * 1000);
                        case 11:
                          tempCell.node.active = false;
                          _this8.poolCell.put(tempCell.node);
                        case 13:
                        case "end":
                          return _context4.stop();
                      }
                    }, _callee4);
                  }))));
                case 1:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));
          function animTempCellMove(_x7, _x8, _x9) {
            return _animTempCellMove.apply(this, arguments);
          }
          return animTempCellMove;
        }();
        _proto.moveTo = /*#__PURE__*/function () {
          var _moveTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(cell, x, y) {
            var targetPosition;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  targetPosition = this.getPos(x != null ? x : cell.x, y != null ? y : cell.y);
                  _context6.next = 3;
                  return this.moveToVec3(cell, targetPosition);
                case 3:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this);
          }));
          function moveTo(_x11, _x12, _x13) {
            return _moveTo.apply(this, arguments);
          }
          return moveTo;
        }();
        _proto.moveToVec3 = function moveToVec3(cell, pos) {
          return new Promise(function (resolve) {
            var duration = 0.2; // 动画持续时间
            tween(cell.node).to(duration, {
              position: pos
            }).call(function () {
              resolve();
            }).start();
          });
        }

        // 任务完成
        ;

        _proto.missionFinish = /*#__PURE__*/
        function () {
          var _missionFinish = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(detail) {
            var removeCell, p, _iterator, _step, _cell;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  removeCell = [];
                  removeCell.push.apply(removeCell, detail.haveCell_);
                  if (!(removeCell.length > 0)) {
                    _context7.next = 9;
                    break;
                  }
                  p = [];
                  for (_iterator = _createForOfIteratorHelperLoose(removeCell); !(_step = _iterator()).done;) {
                    _cell = _step.value;
                    this.clearCell(_cell);
                  }
                  _context7.next = 7;
                  return Promise.all(p);
                case 7:
                  this.GetModel(MissionModel).reqFinishMission(detail);
                  this.refreshUI();
                case 9:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this);
          }));
          function missionFinish(_x14) {
            return _missionFinish.apply(this, arguments);
          }
          return missionFinish;
        }();
        _proto.addBag = function addBag(cellData) {
          if (this.GetModel(BagModel).addBag(cellData.cellId, 1)) {
            this.clearCell(cellData);
          } else {
            hope.gui.toast("背包满了");
          }
        };
        _proto.getPos = function getPos(x, y) {
          return new Vec3(this.sizeCell.width * x + this.sizeCell.width / 2, this.sizeCell.width * -y - this.sizeCell.width / 2, 0);
        };
        _proto.getCellCompt = function getCellCompt(cell) {
          return this.cellCompts[cell.x][cell.y];
        };
        return BattleCtrl;
      }(BaseCtrl));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/battle_model.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IModel.ts', './Hope.ts', './TwoDimensionalArray.ts', './bag_model.ts', './player_model.ts', './schema.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _createClass, cclegacy, warn, ModelDecorator, AbstractModel, hope, TwoDimensionalArray, BagModel, CELL_TID_POWER, PlayerModel;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
    }, function (module) {
      ModelDecorator = module.ModelDecorator;
      AbstractModel = module.AbstractModel;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      TwoDimensionalArray = module.TwoDimensionalArray;
    }, function (module) {
      BagModel = module.BagModel;
      CELL_TID_POWER = module.CELL_TID_POWER;
    }, function (module) {
      PlayerModel = module.PlayerModel;
    }, null],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "1f5aes5QjtGOoGdKrN5B6uu", "battle_model", undefined);
      // 行数
      var ROW_NUM = exports('ROW_NUM', 9);
      // 列数
      var COLUMN_NUM = exports('COLUMN_NUM', 7);
      var SwapType = exports('SwapType', /*#__PURE__*/function (SwapType) {
        SwapType[SwapType["None"] = 0] = "None";
        SwapType[SwapType["Swap"] = 1] = "Swap";
        SwapType[SwapType["Merge"] = 2] = "Merge";
        return SwapType;
      }({}));
      var CellType = exports('CellType', /*#__PURE__*/function (CellType) {
        CellType["VALUE"] = "L004";
        return CellType;
      }({}));
      var DirectionsEight = exports('DirectionsEight', [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]); // 八个方向，优先四个主要方向

      var DirectionsFour = exports('DirectionsFour', [[0, -1], [0, 1], [-1, 0], [1, 0]]); // 四个方向

      var BattleModel = exports('BattleModel', (_dec = ModelDecorator('BattleModel'), _dec(_class = /*#__PURE__*/function (_AbstractModel) {
        _inheritsLoose(BattleModel, _AbstractModel);
        function BattleModel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AbstractModel.call.apply(_AbstractModel, [this].concat(args)) || this;
          _this.map = null;
          // 选择的cell
          _this._selectCell = void 0;
          return _this;
        }
        var _proto = BattleModel.prototype;
        _proto.OnInit = function OnInit() {
          this.map = new TwoDimensionalArray(COLUMN_NUM, ROW_NUM, this.GetModel(PlayerModel).data.grid);
        };
        _proto.setCell = function setCell(x, y, cellTid) {
          if (cellTid === void 0) {
            cellTid = null;
          }
          var cell = this.map.getCell(x, y);
          cell.cellId = cellTid;
          this.map.setCell(x, y, cell);
        }

        // 清除
        ;

        _proto.clearCell = function clearCell(x, y) {
          this.setCell(x, y);
        }

        // 获取所有有效的cell
        ;

        _proto.getAllValidCells = function getAllValidCells() {
          var validCells = [];
          var cellData = this.map.getData();
          for (var i = 0; i < cellData.length; i++) {
            var _cell = cellData[i];
            // warn(`${cell.x} - ${cell.y}`, cell)
            if (_cell.active && !_cell.ground) {
              validCells.push(_cell);
            }
          }
          return validCells;
        }

        // 获取有效的空格
        ;

        _proto.getAllEmptyCells = function getAllEmptyCells() {
          var emptyCells = [];
          var cellData = this.map.getData();
          for (var i = 0; i < cellData.length; i++) {
            var _cell2 = cellData[i];
            if (_cell2.active && !_cell2.ground && !_cell2.cellId) {
              emptyCells.push(_cell2);
            }
          }
          return emptyCells;
        }

        // 是否是生产品
        ;

        _proto.isFactoryCell = function isFactoryCell(x, y) {
          var _hope$config$tables$T;
          var data = this.map.getCell(x, y);
          return !!((_hope$config$tables$T = hope.config.tables.TbCell.get(data.cellId)) != null && _hope$config$tables$T.factoryId_ref);
        }

        // 检查是否有尘土
        ;

        _proto.checkGround = function checkGround(cellData) {
          if (!cellData.active || this.checkLevelLock(cellData) > 0) {
            return true;
          }
          var foundGround = false;
          this.checkAround(cellData, function (other) {
            if (!other.active) {
              foundGround = true;
            }
          }, DirectionsFour);
          return foundGround;
        }

        // 检查格子是否等级限制返回限制等级
        ;

        _proto.checkLevelLock = function checkLevelLock(data) {
          var tbIdx = Number("" + (data.x + 1) + (data.y + 1));
          var tbInitMap = hope.config.tables.TbInitMap.get(tbIdx);
          if (tbInitMap.openLevel > 0 && this.GetModel(PlayerModel).levelInfo.level < tbInitMap.openLevel) {
            return tbInitMap.openLevel;
          }
          return 0;
        }

        // 检查周围的cell
        ;

        _proto.checkAround = function checkAround(cellData, cb, directions) {
          var x = cellData.x,
            y = cellData.y;
          for (var _iterator = _createForOfIteratorHelperLoose(directions), _step; !(_step = _iterator()).done;) {
            var direction = _step.value;
            var newX = x + direction[0];
            var newY = y + direction[1];
            if (newX >= 0 && newX < COLUMN_NUM && newY >= 0 && newY < ROW_NUM) {
              var _cell3 = this.map.getCell(newX, newY);
              cb(_cell3);
            }
          }
        }

        // 找到最近的cell
        ;

        _proto.findNearestActiveCell = function findNearestActiveCell(startCell, eightDirections) {
          var _this2 = this;
          if (eightDirections === void 0) {
            eightDirections = false;
          }
          var visited = [];
          var queue = [];

          // 初始化visited数组，标记所有位置为未访问
          for (var y = 0; y < ROW_NUM; y++) {
            visited[y] = [];
            for (var x = 0; x < COLUMN_NUM; x++) {
              visited[y][x] = false;
            }
          }

          // 将起始位置加入队列，并标记为访问过
          queue.push({
            cell: startCell,
            distance: 0
          });
          visited[startCell.y][startCell.x] = true;
          var directions = eightDirections ? DirectionsEight : DirectionsFour;

          // BFS循环
          var _loop = function _loop() {
              var current = queue.shift();

              // 没有尘土，没有东西
              if (!current.cell.ground && !current.cell.cellId) {
                return {
                  v: current.cell
                }; // 找到最近的激活的cell，直接返回
              }

              // 检查当前位置的周围位置
              _this2.checkAround(current.cell, function (neighbor) {
                if (!visited[neighbor.y][neighbor.x]) {
                  visited[neighbor.y][neighbor.x] = true;
                  queue.push({
                    cell: neighbor,
                    distance: current.distance + 1
                  });
                }
              }, directions);
            },
            _ret;
          while (queue.length > 0) {
            _ret = _loop();
            if (_ret) return _ret.v;
          }
          return null; // 如果没有找到符合条件的cell，则返回null
        }

        // 两个格子可以交换
        ;

        _proto.checkSwapType = function checkSwapType(swapA, swapB) {
          // 优先合并再互换
          if (this.canMerge(swapA, swapB)) {
            return SwapType.Merge;
          }
          if (this.canSwap(swapA, swapB)) {
            return SwapType.Swap;
          }
          return SwapType.None;
        };
        _proto.canSwap = function canSwap(swapA, swapB) {
          // 有一个东西，只要没有等级锁，不是尘土，不是未激活品
          if ((swapA.cellId || swapB.cellId) && swapA.active && !swapA.ground && this.checkLevelLock(swapA) <= 0 && swapB.active && !swapB.ground && this.checkLevelLock(swapB) <= 0) {
            return true;
          }
          return false;
        };
        _proto.canMerge = function canMerge(swapA, swapB) {
          // 有两个相同的东西，只要没有等级锁，不是尘土，有一个是激活，并且可以升级
          if (swapA.cellId && swapB.cellId && swapA.cellId == swapB.cellId && (swapA.active || swapB.active) && !swapA.ground && !swapB.ground && this.checkLevelLock(swapA) <= 0 && this.checkLevelLock(swapB) <= 0) {
            var tbCellB = hope.config.tables.TbCell.get(swapB.cellId);
            if (tbCellB.upgradeCellId) {
              return true;
            }
          }
          return false;
        }

        // 两个格子交换
        ;

        _proto.swap = function swap(x1, y1, x2, y2) {
          var _this3 = this;
          // 交换容器
          this.map.swap(x1, y1, x2, y2);
          // 交换数据的xy属性
          var updateCellXY = function updateCellXY(x, y) {
            var cell = _this3.map.getCell(x, y);
            cell.x = x;
            cell.y = y;
          };
          updateCellXY(x1, y1);
          updateCellXY(x2, y2);
        }

        // 两个格子合并
        ;

        _proto.merge = function merge(swapA, swapB) {
          // A 数据清空
          swapA.cellId = null;
          // B 数据升级
          var tbCellB = hope.config.tables.TbCell.get(swapB.cellId);
          swapB.cellId = tbCellB.upgradeCellId;
          // B 被激活
          swapB.active = true;
          // 检查周围4个解除沙尘
          this.checkAround(swapB, function (other) {
            other.ground = false;
          }, DirectionsFour);
        }

        // 生产物生成一个数据
        ;

        _proto.factoryMake = function factoryMake(cellData, x, y) {
          // 这里没体力了
          if (this.GetModel(BagModel).power <= 0) {
            return null;
          }

          // 生产一次
          cellData.useCount = (isNaN(cellData.useCount) ? 0 : cellData.useCount) + 1;
          var tbCell = hope.config.tables.TbCell.get(cellData.cellId);
          var randomId = this.GetModel(PlayerModel).getRandomIdFromChances(tbCell.factoryId_ref.makeCellChance).id;
          var tbNewCell = hope.config.tables.TbCell.get(randomId);
          if (!tbNewCell) warn("\u7B56\u5212\u68C0\u67E5Cell\u8868:" + randomId);
          var newCellData = {
            x: x,
            y: y,
            cellId: randomId,
            active: true,
            ground: false
          };
          this.GetModel(BagModel).addBag(CELL_TID_POWER, -1);
          this.map.setCell(x, y, newCellData);
          return newCellData;
        }

        // 合并生成一个数据
        ;

        _proto.mergeMake = function mergeMake(tbCellChances, x, y) {
          if (tbCellChances.length <= 0) return null;

          // 有可能什么都不生成
          var randomId = this.GetModel(PlayerModel).getRandomIdFromChances(tbCellChances, 10000).id;
          if (!randomId) return null;
          var tbNewCell = hope.config.tables.TbCell.get(randomId);
          if (!tbNewCell) warn("\u7B56\u5212\u68C0\u67E5Cell\u8868:" + randomId);

          // 这里可以生成泡泡或者其他任何东西
          var newCellData = {
            x: x,
            y: y,
            cellId: randomId,
            active: true,
            ground: false
          };
          // 如果是泡泡
          if (tbNewCell.bubbleId_ref) {
            newCellData.countdown = tbNewCell.bubbleId_ref.bubbleReachTime;
          }
          this.map.setCell(x, y, newCellData);
          return newCellData;
        }

        // 泡泡破了生成
        ;

        _proto.burstBubble = function burstBubble(cellData) {
          var tbCell = hope.config.tables.TbCell.get(cellData.cellId);
          if (cellData.countdown < 0) {
            var randomId = tbCell.bubbleId_ref.bubbleNotReachCellChance[0].id;
            // 计算总概率
            var totalProbability = tbCell.bubbleId_ref.bubbleNotReachCellChance.reduce(function (sum, chance) {
              return sum + chance.chance;
            }, 0);
            // 生成一个随机数
            var randomValue = Math.random() * totalProbability;
            // 选择对应的id
            var cumulativeProbability = 0;
            for (var _iterator2 = _createForOfIteratorHelperLoose(tbCell.bubbleId_ref.bubbleNotReachCellChance), _step2; !(_step2 = _iterator2()).done;) {
              var chance = _step2.value;
              cumulativeProbability += chance.chance;
              if (randomValue <= cumulativeProbability) {
                randomId = chance.id;
                break;
              }
            }
            warn(cellData.cellId, randomId);
            cellData.cellId = randomId;
          } else {
            cellData.cellId = tbCell.bubbleId_ref.bubbleReachCellId;
          }
          cellData.countdown = 0;
        };
        _proto.reqSell = function reqSell(cellData) {
          var tbCell = hope.config.tables.TbCell.get(cellData.cellId);
          warn("sell:", tbCell);
          for (var i = 0; i < tbCell.sellCell.length; i++) {
            this.GetModel(BagModel).addBag(tbCell.sellCell[i].id, tbCell.sellCell[i].count);
          }
        };
        _createClass(BattleModel, [{
          key: "selectCell",
          get: function get() {
            return this._selectCell;
          },
          set: function set(value) {
            if (this._selectCell) {
              this._selectCell.isSelect = false;
            }
            // 这里有可能需求变成没有任何选择
            if (value) {
              value.isSelect = true;
            }
            this._selectCell = value;
          }
        }]);
        return BattleModel;
      }(AbstractModel)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/battle.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseView.ts', './battle_ctrl.ts', './bag_item_cell.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, ScrollView, Button, Label, BindCtrl, BaseView, BattleCtrl, BagItemCell;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      ScrollView = module.ScrollView;
      Button = module.Button;
      Label = module.Label;
    }, function (module) {
      BindCtrl = module.BindCtrl;
      BaseView = module.BaseView;
    }, function (module) {
      BattleCtrl = module.BattleCtrl;
    }, function (module) {
      BagItemCell = module.BagItemCell;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21;
      cclegacy._RF.push({}, "6e67cCPTOJK57/5SkiP83TS", "battle", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Battle = exports('Battle', (_dec = ccclass('Battle'), _dec2 = BindCtrl(BattleCtrl), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec8 = property(ScrollView), _dec9 = property(Button), _dec10 = property(BagItemCell), _dec11 = property(Button), _dec12 = property(Button), _dec13 = property(Button), _dec14 = property(Button), _dec15 = property(Button), _dec16 = property(Button), _dec17 = property(Label), _dec18 = property(Button), _dec19 = property(Label), _dec20 = property(Label), _dec21 = property(Label), _dec22 = property(Label), _dec23 = property(Label), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_BaseView) {
        _inheritsLoose(Battle, _BaseView);
        function Battle() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseView.call.apply(_BaseView, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "nodeGird", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeGirdBg", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "prefabCellBg", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "prefabCell", _descriptor4, _assertThisInitialized(_this));
          // mission
          _initializerDefineProperty(_this, "prefabMission", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scrollViewMission", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnRewardStore", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comptReardStore", _descriptor8, _assertThisInitialized(_this));
          // bottom
          _initializerDefineProperty(_this, "btnMap", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnSell", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnAd", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDiamond", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnInfo", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnBag", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelBottomInfo", _descriptor15, _assertThisInitialized(_this));
          // top
          _initializerDefineProperty(_this, "btnLevel", _descriptor16, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelLevel", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelExp", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelGold", _descriptor19, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelPower", _descriptor20, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelDiamond", _descriptor21, _assertThisInitialized(_this));
          return _this;
        }
        return Battle;
      }(BaseView), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeGird", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeGirdBg", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefabCellBg", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefabCell", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "prefabMission", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "scrollViewMission", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btnRewardStore", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "comptReardStore", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "btnMap", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "btnSell", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "btnAd", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "btnDiamond", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "btnInfo", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "btnBag", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "labelBottomInfo", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "btnLevel", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "labelLevel", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "labelExp", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "labelGold", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "labelPower", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "labelDiamond", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildTimeConstants.ts", ['cc', './env'], function (exports) {
  var cclegacy, env;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      env = module;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8d77dzaOKVJAazQ7kOBl4VG", "BuildTimeConstants", undefined);
      var keys = Object.keys(env).sort();

      /* 游戏运行环境 */
      var BuildTimeConstants = exports('BuildTimeConstants', function BuildTimeConstants() {
        var keyNameMaxLen = keys.reduce(function (len, key) {
          return Math.max(len, key.length);
        }, 0);
        var enviroment = "" + keys.map(function (key) {
          var value = env[key];
          var valueRep = typeof value === 'boolean' ? value ? 'true' : 'false' : value;
          return "\n" + key.padStart(keyNameMaxLen, ' ') + " : " + valueRep;
        });
        console.log(enviroment);
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ButtonSimple.ts', './Hope.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Animation, AnimationClip, Node, Sprite, ButtonSimple, hope;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      AnimationClip = module.AnimationClip;
      Node = module.Node;
      Sprite = module.Sprite;
    }, function (module) {
      ButtonSimple = module.default;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "1be36hrGO5Oz6Eapg6ygW03", "ButtonEffect", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;

      /** 有特效短按按钮 */
      var ButtonEffect = exports('default', (_dec = ccclass("ButtonEffect"), _dec2 = menu('ui/button/ButtonEffect'), _dec3 = property({
        tooltip: "是否开启"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_ButtonSimple) {
        _inheritsLoose(ButtonEffect, _ButtonSimple);
        function ButtonEffect() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ButtonSimple.call.apply(_ButtonSimple, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "disabledEffect", _descriptor, _assertThisInitialized(_this));
          _this.anim = void 0;
          return _this;
        }
        var _proto = ButtonEffect.prototype;
        _proto.onLoad = function onLoad() {
          this.anim = this.node.addComponent(Animation);
          var ac_start = hope.res.get("common/anim/button_scale_start", AnimationClip);
          var ac_end = hope.res.get("common/anim/button_scale_end", AnimationClip);
          this.anim.defaultClip = ac_start;
          this.anim.createState(ac_start, ac_start == null ? void 0 : ac_start.name);
          this.anim.createState(ac_end, ac_end == null ? void 0 : ac_end.name);
          this.node.on(Node.EventType.TOUCH_START, this.onTouchtStart, this);
          _ButtonSimple.prototype.onLoad.call(this);
        };
        _proto.onTouchtStart = function onTouchtStart(event) {
          if (!this.disabledEffect) {
            this.anim.play("button_scale_start");
          }
        };
        _proto.onTouchEnd = function onTouchEnd(event) {
          if (!this.disabledEffect) {
            this.anim.play("button_scale_end");
          }
          _ButtonSimple.prototype.onTouchEnd.call(this, event);
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchtStart, this);
          _ButtonSimple.prototype.onDestroy.call(this);
        };
        _createClass(ButtonEffect, [{
          key: "grayscale",
          get: /** 按钮禁用效果 */
          function get() {
            return this.node.getComponent(Sprite).grayscale;
          },
          set: function set(value) {
            if (this.node.getComponent(Sprite)) {
              this.node.getComponent(Sprite).grayscale = value;
            }
          }
        }]);
        return ButtonEffect;
      }(ButtonSimple), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabledEffect", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonSimple.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, Node, game, Component, hope;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      Node = module.Node;
      game = module.game;
      Component = module.Component;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "8d645yObX1FvJfk2sbi0rxp", "ButtonSimple", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;

      /** 短按按钮 */
      var ButtonSimple = exports('default', (_dec = ccclass("ButtonSimple"), _dec2 = menu('ui/button/ButtonSimple'), _dec3 = property({
        tooltip: "是否只触发一次"
      }), _dec4 = property({
        tooltip: "每次触发间隔"
      }), _dec5 = property({
        tooltip: "触摸音效",
        type: AudioClip
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ButtonSimple, _Component);
        function ButtonSimple() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "once", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "interval", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "effect", _descriptor3, _assertThisInitialized(_this));
          _this.touchCount = 0;
          _this.touchtEndTime = 0;
          return _this;
        }
        var _proto = ButtonSimple.prototype;
        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }

        /** 触摸结束 */;
        _proto.onTouchEnd = function onTouchEnd(event) {
          if (this.once) {
            if (this.touchCount > 0) {
              event.propagationStopped = true;
              return;
            }
            this.touchCount++;
          }

          // 防连点500毫秒出发一次事件
          if (this.touchtEndTime && game.totalTime - this.touchtEndTime < this.interval) {
            event.propagationStopped = true;
          } else {
            this.touchtEndTime = game.totalTime;

            // 短按触摸音效
            this.playEffect();
          }
        }

        /** 短按触摸音效 */;
        _proto.playEffect = function playEffect() {
          if (this.effect) hope.audio.playEffect(this.effect);
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          if (this.effect) hope.audio.releaseEffect(this.effect);
        };
        return ButtonSimple;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "once", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "interval", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "effect", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonTouchLong.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ButtonEffect.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EventHandler, ButtonEffect;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventHandler = module.EventHandler;
    }, function (module) {
      ButtonEffect = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "da96en7WYpPTaPIkO1l/Nux", "ButtonTouchLong", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;

      /** 长按按钮 */
      var ButtonTouchLong = exports('ButtonTouchLong', (_dec = ccclass("ButtonTouchLong"), _dec2 = menu('ui/button/ButtonTouchLong'), _dec3 = property({
        tooltip: "长按时间（秒）"
      }), _dec4 = property({
        type: [EventHandler],
        tooltip: "长按时间（秒）"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_ButtonEffect) {
        _inheritsLoose(ButtonTouchLong, _ButtonEffect);
        function ButtonTouchLong() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ButtonEffect.call.apply(_ButtonEffect, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "time", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "clickEvents", _descriptor2, _assertThisInitialized(_this));
          _this._passTime = 0;
          _this._isTouchLong = true;
          _this._event = null;
          return _this;
        }
        var _proto = ButtonTouchLong.prototype;
        _proto.onLoad = function onLoad() {
          this._isTouchLong = false;
          _ButtonEffect.prototype.onLoad.call(this);
        }

        /** 触摸开始 */;
        _proto.onTouchtStart = function onTouchtStart(event) {
          this._event = event;
          this._passTime = 0;
          _ButtonEffect.prototype.onTouchtStart.call(this, event);
        }

        /** 触摸结束 */;
        _proto.onTouchEnd = function onTouchEnd(event) {
          if (this._passTime > this.time) {
            event.propagationStopped = true;
          }
          this._event = null;
          this._passTime = 0;
          this._isTouchLong = false;
          _ButtonEffect.prototype.onTouchEnd.call(this, event);
        };
        _proto.removeTouchLong = function removeTouchLong() {
          this._event = null;
          this._isTouchLong = false;
        }

        /** 引擎更新事件 */;
        _proto.update = function update(dt) {
          var _this2 = this;
          if (this._event && !this._isTouchLong) {
            this._passTime += dt;
            if (this._passTime >= this.time) {
              this._isTouchLong = true;
              this.clickEvents.forEach(function (event) {
                event.emit([event.customEventData]);
                // 长按触摸音效
                _this2.playEffect();
              });
              this.removeTouchLong();
            }
          }
        };
        return ButtonTouchLong;
      }(ButtonEffect), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "time", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "clickEvents", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ByteBuf.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "547c3jRdqJL7pAAKclrKnlY", "ByteBuf", undefined);
      var EDeserializeError = exports('EDeserializeError', /*#__PURE__*/function (EDeserializeError) {
        EDeserializeError[EDeserializeError["OK"] = 0] = "OK";
        EDeserializeError[EDeserializeError["NOT_ENOUGH"] = 1] = "NOT_ENOUGH";
        EDeserializeError[EDeserializeError["EXCEED_SIZE"] = 2] = "EXCEED_SIZE";
        return EDeserializeError;
      }({}));
      var MIN_CAPACITY = 16;
      var f_2power32 = Math.pow(2, 32);
      var f_2power56 = Math.pow(2, 56);
      var ByteBuf = exports('default', /*#__PURE__*/function () {
        function ByteBuf(bytes) {
          this._bytes = void 0;
          this._readerIndex = void 0;
          this._writerIndex = void 0;
          this._bytes = bytes != null ? new Uint8Array(bytes) : ByteBuf.emptyBuff;
          this._readerIndex = 0;
          this._writerIndex = bytes != null ? bytes.length : 0;
        }
        var _proto = ByteBuf.prototype;
        _proto.Replace = function Replace(bytes) {
          this._bytes = new Uint8Array(bytes);
          this._readerIndex = 0;
          this._writerIndex = bytes.length;
        };
        _proto.Replace2 = function Replace2(bytes, beginPos, endPos) {
          this._bytes = new Uint8Array(bytes.subarray(beginPos, endPos));
          this._readerIndex = beginPos;
          this._writerIndex = endPos;
        };
        _proto.getBytesNotSafe = function getBytesNotSafe() {
          return this._bytes;
        };
        _proto.AddWriteIndex = function AddWriteIndex(add) {
          this._writerIndex += add;
        };
        _proto.AddReadIndex = function AddReadIndex(add) {
          this._readerIndex += add;
        };
        _proto.CopyData = function CopyData() {
          var n = this.Remaining;
          if (n > 0) {
            return new Uint8Array(this._bytes.buffer.slice(this._readerIndex, this._writerIndex));
          } else {
            return ByteBuf.emptyBuff;
          }
        };
        _proto.DiscardReadBytes = function DiscardReadBytes() {
          this._bytes.copyWithin(0, this._readerIndex, this._writerIndex);
          this._writerIndex -= this._readerIndex;
          this._readerIndex = 0;
        };
        _proto.WriteBytesWithoutSize = function WriteBytesWithoutSize(bs) {
          this.WriteBytesWithoutSize2(bs, 0, bs.length);
        };
        _proto.WriteBytesWithoutSize2 = function WriteBytesWithoutSize2(bs, offset, len) {
          this.EnsureWrite(len);
          for (var i = 0; i < len; i++) {
            this._bytes[this._writerIndex + i] = bs[offset + i];
          }
          this._writerIndex += len;
        };
        _proto.Clear = function Clear() {
          this._readerIndex = this._writerIndex = 0;
        };
        ByteBuf.PropSize = function PropSize(initSize, needSize) {
          for (var i = Math.max(initSize, MIN_CAPACITY); i <<= 1;) {
            if (i >= needSize) {
              return i;
            }
          }
        };
        _proto.EnsureWrite0 = function EnsureWrite0(size) {
          var needSize = this._writerIndex + size - this._readerIndex;
          if (needSize <= this.Capacity) {
            this._bytes.copyWithin(0, this._readerIndex, this._writerIndex);
            this._writerIndex -= this._readerIndex;
            this._readerIndex = 0;
          } else {
            var newCapacity = ByteBuf.PropSize(this.Capacity, needSize);
            var oldBuf = this._bytes;
            this._bytes = new Uint8Array(newCapacity);
            this._bytes.set(oldBuf.subarray(this._readerIndex, this._writerIndex));
            this._writerIndex -= this._readerIndex;
            this._readerIndex = 0;
          }
        };
        _proto.EnsureWrite = function EnsureWrite(size) {
          if (this._writerIndex + size > this.Capacity) {
            this.EnsureWrite0(size);
          }
        };
        _proto.EnsureRead = function EnsureRead(size) {
          if (this._readerIndex + size > this._writerIndex) {
            throw new Error();
          }
        };
        _proto.CanRead = function CanRead(size) {
          return this._readerIndex + size <= this._writerIndex;
        };
        _proto.WriteBool = function WriteBool(b) {
          this.EnsureWrite(1);
          this._bytes[this._writerIndex++] = b ? 1 : 0;
        };
        _proto.ReadBool = function ReadBool() {
          this.EnsureRead(1);
          return this._bytes[this._readerIndex++] != 0;
        };
        _proto.WriteByte = function WriteByte(x) {
          this.EnsureWrite(1);
          this._bytes[this._writerIndex++] = x;
        };
        _proto.ReadByte = function ReadByte() {
          this.EnsureRead(1);
          return this._bytes[this._readerIndex++];
        };
        _proto.WriteShort = function WriteShort(x) {
          if (x >= 0) {
            if (x < 0x80) {
              this.EnsureWrite(1);
              this._bytes[this._writerIndex++] = x;
              return;
            } else if (x < 0x4000) {
              this.EnsureWrite(2);
              var v = x | 0x8000;
              new DataView(this._bytes.buffer).setUint16(this._writerIndex, v, false);
              this._writerIndex += 2;
              return;
            }
          }
          this.EnsureWrite(4);
          this._bytes[this._writerIndex] = 0xff;
          new DataView(this._bytes.buffer).setInt16(this._writerIndex + 1, x, false);
          this._writerIndex += 3;
        };
        _proto.ReadShort = function ReadShort() {
          this.EnsureRead(1);
          var h = this._bytes[this._readerIndex];
          if (h < 0x80) {
            this._readerIndex++;
            return h;
          } else if (h < 0xc0) {
            this.EnsureRead(2);
            var x = new DataView(this._bytes.buffer).getUint16(this._readerIndex, false) & 0x3fff;
            this._readerIndex += 2;
            return x;
          } else if (h == 0xff) {
            this.EnsureRead(3);
            var _x = new DataView(this._bytes.buffer).getInt16(this._readerIndex + 1, false);
            this._readerIndex += 3;
            return _x;
          } else {
            throw new Error();
          }
        };
        _proto.ReadFshort = function ReadFshort() {
          this.EnsureRead(2);
          var x = new DataView(this._bytes.buffer).getInt16(this._readerIndex, true);
          this._readerIndex += 2;
          return x;
        };
        _proto.WriteFshort = function WriteFshort(x) {
          this.EnsureWrite(2);
          new DataView(this._bytes.buffer).setInt16(this._writerIndex, x, true);
          this._writerIndex += 2;
        };
        _proto.WriteInt = function WriteInt(x) {
          if (x < 0) {
            this.EnsureWrite(5);
            this._bytes[this._writerIndex] = 0xff;
            new DataView(this._bytes.buffer).setInt32(this._writerIndex + 1, x, false);
            this._writerIndex += 5;
          } else if (x < 0x80) {
            this.EnsureWrite(1);
            this._bytes[this._writerIndex++] = x;
          } else if (x < 0x4000) {
            this.EnsureWrite(2);
            new DataView(this._bytes.buffer).setUint16(this._writerIndex, x | 0x8000, false);
            this._writerIndex += 2;
          } else if (x < 0x200000) {
            this.EnsureWrite(4);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, (x | 0xc00000) << 8, false);
            this._writerIndex += 3;
          } else if (x < 0x10000000) {
            this.EnsureWrite(4);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, x | 0xe0000000, false);
            this._writerIndex += 4;
          } else {
            this.EnsureWrite(5);
            this._bytes[this._writerIndex] = 0xf0;
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 1, x, false);
            this._writerIndex += 5;
          }
        };
        _proto.ReadInt = function ReadInt() {
          this.EnsureRead(1);
          var h = this._bytes[this._readerIndex];
          if (h < 0x80) {
            this._readerIndex++;
            return h;
          } else if (h < 0xc0) {
            this.EnsureRead(2);
            var x = new DataView(this._bytes.buffer).getUint16(this._readerIndex, false) & 0x3fff;
            this._readerIndex += 2;
            return x;
          } else if (h < 0xe0) {
            this.EnsureRead(3);
            var _x2 = (h & 0x1f) << 16 | new DataView(this._bytes.buffer).getUint16(this._readerIndex + 1, false);
            this._readerIndex += 3;
            return _x2;
          } else if (h < 0xf0) {
            this.EnsureRead(4);
            var _x3 = new DataView(this._bytes.buffer).getInt32(this._readerIndex, false) & 0x0fffffff;
            this._readerIndex += 4;
            return _x3;
          } else {
            this.EnsureRead(5);
            var _x4 = new DataView(this._bytes.buffer).getInt32(this._readerIndex + 1, false);
            this._readerIndex += 5;
            return _x4;
          }
        };
        _proto.ReadFint = function ReadFint() {
          this.EnsureRead(4);
          var x = new DataView(this._bytes.buffer).getInt32(this._readerIndex, true);
          this._readerIndex += 4;
          return x;
        };
        _proto.WriteFint = function WriteFint(x) {
          this.EnsureWrite(4);
          new DataView(this._bytes.buffer).setInt32(this._writerIndex, x, true);
          this._writerIndex += 4;
        };
        _proto.WriteNumberAsLong = function WriteNumberAsLong(x) {
          if (x < 0) {
            this.EnsureWrite(9);
            this._bytes[this._writerIndex] = 0xff;
            new DataView(this._bytes.buffer).setBigInt64(this._writerIndex + 1, BigInt(x), false);
            this._writerIndex += 9;
          } else if (x < 0x80) {
            this.EnsureWrite(1);
            this._bytes[this._writerIndex++] = x;
          } else if (x < 0x4000) {
            this.EnsureWrite(2);
            new DataView(this._bytes.buffer).setUint16(this._writerIndex, x | 0x8000, false);
            this._writerIndex += 2;
          } else if (x < 0x200000) {
            this.EnsureWrite(4);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, (x | 0xc00000) << 8, false);
            this._writerIndex += 3;
          } else if (x < 0x10000000) {
            this.EnsureWrite(4);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, x | 0xe0000000, false);
            this._writerIndex += 4;
          } else if (x < 0x800000000) {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setUint8(this._writerIndex, x / 0x100000000 | 0xf0);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 1, x % 0x100000000, false);
            this._writerIndex += 5;
          } else if (x < 0x40000000000) {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setUint16(this._writerIndex, x / 0x100000000 | 0xf800, false);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 2, x % 0x100000000, false);
            this._writerIndex += 6;
          } else if (x < 0x200000000000) {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, (x / 0x100000000 | 0xfc0000) << 8, false);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 3, x % 0x100000000, false);
            this._writerIndex += 7;
          } else if (x <= Number.MAX_SAFE_INTEGER) {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, x / 0x100000000 | 0xfe000000, false);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 4, x % 0x100000000, false);
            this._writerIndex += 8;
          } else if (x < f_2power56) {
            this.EnsureWrite(9);
            var n = BigInt(x);
            new DataView(this._bytes.buffer).setBigInt64(this._writerIndex, n | BigInt(0xfe) << BigInt(56), false);
            this._writerIndex += 8;
          } else {
            this.EnsureWrite(9);
            this._bytes[this._writerIndex] = 0xff;
            new DataView(this._bytes.buffer).setBigInt64(this._writerIndex + 1, BigInt(x), false);
            this._writerIndex += 9;
          }
        };
        _proto.ReadLongAsNumber = function ReadLongAsNumber() {
          this.EnsureRead(1);
          var h = this._bytes[this._readerIndex];
          if (h < 0x80) {
            this._readerIndex++;
            return h;
          } else if (h < 0xc0) {
            this.EnsureRead(2);
            var x = new DataView(this._bytes.buffer).getUint16(this._readerIndex, false) & 0x3fff;
            this._readerIndex += 2;
            return x;
          } else if (h < 0xe0) {
            this.EnsureRead(3);
            var _x5 = (h & 0x1f) << 16 | new DataView(this._bytes.buffer).getUint16(this._readerIndex + 1, false);
            this._readerIndex += 3;
            return _x5;
          } else if (h < 0xf0) {
            this.EnsureRead(4);
            var _x6 = new DataView(this._bytes.buffer).getInt32(this._readerIndex, false) & 0x0fffffff;
            this._readerIndex += 4;
            return _x6;
          } else if (h < 0xf8) {
            this.EnsureRead(5);
            var xl = new DataView(this._bytes.buffer).getUint32(this._readerIndex + 1, false);
            var xh = h & 0x07;
            this._readerIndex += 5;
            return xh * 0x100000000 + xl;
          } else if (h < 0xfc) {
            this.EnsureRead(6);
            var _xl = new DataView(this._bytes.buffer).getUint32(this._readerIndex + 2, false);
            var _xh = new DataView(this._bytes.buffer).getUint16(this._readerIndex, false) & 0x3ff;
            this._readerIndex += 6;
            return _xh * 0x100000000 + _xl;
          } else if (h < 0xfe) {
            this.EnsureRead(7);
            var _xl2 = new DataView(this._bytes.buffer).getUint32(this._readerIndex + 3, false);
            var _xh2 = new DataView(this._bytes.buffer).getUint32(this._readerIndex, false) >> 8 & 0x1ffff;
            this._readerIndex += 7;
            return _xh2 * 0x100000000 + _xl2;
          } else if (h < 0xff) {
            this.EnsureRead(8);
            var _xl3 = new DataView(this._bytes.buffer).getUint32(this._readerIndex + 4, false);
            var _xh3 = new DataView(this._bytes.buffer).getUint32(this._readerIndex, false) & 0xffffff;
            this._readerIndex += 8;
            return _xh3 * f_2power32 + _xl3;
          } else {
            this.EnsureRead(9);
            var _x7 = new DataView(this._bytes.buffer).getBigInt64(this._readerIndex + 1, false);
            this._readerIndex += 9;
            return Number(_x7);
          }
        };
        _proto.WriteLong = function WriteLong(n) {
          if (n < 0 || n >= f_2power56) {
            this.EnsureWrite(9);
            this._bytes[this._writerIndex] = 0xff;
            new DataView(this._bytes.buffer).setBigInt64(this._writerIndex + 1, n, false);
            this._writerIndex += 9;
            return;
          }
          if (n > Number.MAX_SAFE_INTEGER) {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setBigUint64(this._writerIndex, n | BigInt(0xfe) << BigInt(56), false);
            this._writerIndex += 8;
            return;
          }
          var x = Number(n);
          if (x < 0x80) {
            this.EnsureWrite(1);
            this._bytes[this._writerIndex++] = x;
          } else if (x < 0x4000) {
            this.EnsureWrite(2);
            new DataView(this._bytes.buffer).setUint16(this._writerIndex, x | 0x8000, false);
            this._writerIndex += 2;
          } else if (x < 0x200000) {
            this.EnsureWrite(4);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, (x | 0xc00000) << 8, false);
            this._writerIndex += 3;
          } else if (x < 0x10000000) {
            this.EnsureWrite(4);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, x | 0xe0000000, false);
            this._writerIndex += 4;
          } else if (x < 0x800000000) {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setUint8(this._writerIndex, x / 0x100000000 | 0xf0);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 1, x % 0x100000000, false);
            this._writerIndex += 5;
          } else if (x < 0x40000000000) {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setUint16(this._writerIndex, x / 0x100000000 | 0xf800, false);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 2, x % 0x100000000, false);
            this._writerIndex += 6;
          } else if (x < 0x200000000000) {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, (x / 0x100000000 | 0xfc0000) << 8, false);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 3, x % 0x100000000, false);
            this._writerIndex += 7;
          } else {
            this.EnsureWrite(8);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex, x / 0x100000000 | 0xfe000000, false);
            new DataView(this._bytes.buffer).setUint32(this._writerIndex + 4, x % 0x100000000, false);
            this._writerIndex += 8;
          }
        };
        _proto.ReadLong = function ReadLong() {
          this.EnsureRead(1);
          var h = this._bytes[this._readerIndex];
          if (h < 0x80) {
            this._readerIndex++;
            return BigInt(h);
          } else if (h < 0xc0) {
            this.EnsureRead(2);
            var x = new DataView(this._bytes.buffer).getUint16(this._readerIndex, false) & 0x3fff;
            this._readerIndex += 2;
            return BigInt(x);
          } else if (h < 0xe0) {
            this.EnsureRead(3);
            var _x8 = (h & 0x1f) << 16 | new DataView(this._bytes.buffer).getUint16(this._readerIndex + 1, false);
            this._readerIndex += 3;
            return BigInt(_x8);
          } else if (h < 0xf0) {
            this.EnsureRead(4);
            var _x9 = new DataView(this._bytes.buffer).getInt32(this._readerIndex, false) & 0x0fffffff;
            this._readerIndex += 4;
            return BigInt(_x9);
          } else if (h < 0xf8) {
            this.EnsureRead(5);
            var xl = new DataView(this._bytes.buffer).getUint32(this._readerIndex + 1, false);
            var xh = h & 0x07;
            this._readerIndex += 5;
            return BigInt(xh * 0x100000000 + xl);
          } else if (h < 0xfc) {
            this.EnsureRead(6);
            var _xl4 = new DataView(this._bytes.buffer).getUint32(this._readerIndex + 2, false);
            var _xh4 = new DataView(this._bytes.buffer).getUint16(this._readerIndex, false) & 0x3ff;
            this._readerIndex += 6;
            return BigInt(_xh4 * 0x100000000 + _xl4);
          } else if (h < 0xfe) {
            this.EnsureRead(7);
            var _xl5 = new DataView(this._bytes.buffer).getUint32(this._readerIndex + 3, false);
            var _xh5 = new DataView(this._bytes.buffer).getUint32(this._readerIndex, false) >> 8 & 0x1ffff;
            this._readerIndex += 7;
            return BigInt(_xh5 * 0x100000000 + _xl5);
          } else if (h < 0xff) {
            this.EnsureRead(8);
            var _xl6 = new DataView(this._bytes.buffer).getUint32(this._readerIndex + 4, false);
            var _xh6 = new DataView(this._bytes.buffer).getUint32(this._readerIndex, false) & 0xffffff;
            this._readerIndex += 8;
            return BigInt(_xh6) << BigInt(32) | BigInt(_xl6);
          } else {
            this.EnsureRead(9);
            var _x10 = new DataView(this._bytes.buffer).getBigInt64(this._readerIndex + 1, false);
            this._readerIndex += 9;
            return _x10;
          }
        };
        _proto.WriteFlong = function WriteFlong(x) {
          this.EnsureWrite(8);
          new DataView(this._bytes.buffer).setBigInt64(this._writerIndex, x, true);
          this._writerIndex += 8;
        };
        _proto.ReadFlong = function ReadFlong() {
          this.EnsureRead(8);
          var x = new DataView(this._bytes.buffer).getBigInt64(this._readerIndex, true);
          this._readerIndex += 8;
          return x;
        };
        _proto.WriteFloat = function WriteFloat(x) {
          this.EnsureWrite(4);
          new DataView(this._bytes.buffer).setFloat32(this._writerIndex, x, true);
          this._writerIndex += 4;
        };
        _proto.ReadFloat = function ReadFloat() {
          this.EnsureRead(4);
          var x = new DataView(this._bytes.buffer).getFloat32(this._readerIndex, true);
          this._readerIndex += 4;
          return x;
        };
        _proto.WriteDouble = function WriteDouble(x) {
          this.EnsureWrite(8);
          new DataView(this._bytes.buffer).setFloat64(this._writerIndex, x, true);
          this._writerIndex += 8;
        };
        _proto.ReadDouble = function ReadDouble() {
          this.EnsureRead(8);
          var x = new DataView(this._bytes.buffer).getFloat64(this._readerIndex, true);
          this._readerIndex += 8;
          return x;
        };
        _proto.WriteSize = function WriteSize(n) {
          this.WriteInt(n);
        };
        _proto.ReadSize = function ReadSize() {
          return this.ReadInt();
        };
        _proto.WriteString = function WriteString(x) {
          var n = new TextEncoder().encode(x).length;
          this.WriteSize(n);
          if (n > 0) {
            this.EnsureWrite(n);
            new TextEncoder().encodeInto(x, this._bytes.subarray(this._writerIndex, this._writerIndex + n));
            this._writerIndex += n;
          }
        };
        _proto.ReadString = function ReadString() {
          var n = this.ReadSize();
          if (n > 0) {
            this.EnsureRead(n);
            var s = new TextDecoder().decode(this._bytes.subarray(this._readerIndex, this._readerIndex + n));
            this._readerIndex += n;
            return s;
          } else {
            return "";
          }
        };
        _proto.WriteBytes = function WriteBytes(x) {
          var n = x != null ? x.length : 0;
          this.WriteSize(n);
          if (n > 0) {
            this.EnsureWrite(n);
            this._bytes.set(x, this._writerIndex);
            this._writerIndex += n;
          }
        };
        _proto.ReadBytes = function ReadBytes() {
          var n = this.ReadSize();
          if (n > 0) {
            this.EnsureRead(n);
            var x = this._bytes.subarray(this._readerIndex, this._readerIndex + n);
            this._readerIndex += n;
            return x;
          } else {
            return ByteBuf.emptyBuff;
          }
        };
        _proto.WriteArrayBuffer = function WriteArrayBuffer(b) {
          this.WriteBytes(new Uint8Array(b));
        };
        _proto.ReadArrayBuffer = function ReadArrayBuffer() {
          return this.ReadBytes().buffer;
        };
        _proto.SkipBytes = function SkipBytes() {
          var n = this.ReadSize();
          this.EnsureRead(n);
          this._readerIndex += n;
        };
        _proto.WriteByteBufWithSize = function WriteByteBufWithSize(o) {
          var n = o.Size;
          if (n > 0) {
            this.WriteSize(n);
            this.WriteBytesWithoutSize2(o._bytes, o._readerIndex, n);
          } else {
            this.WriteByte(0);
          }
        };
        _proto.WriteByteBufWithoutSize = function WriteByteBufWithoutSize(o) {
          var n = o.Size;
          if (n > 0) {
            this.WriteBytesWithoutSize2(o._bytes, o._readerIndex, n);
          }
        };
        _proto.WriteRawTag1 = function WriteRawTag1(b1) {
          this.EnsureWrite(1);
          this._bytes[this._writerIndex++] = b1;
        };
        _proto.WriteRawTag2 = function WriteRawTag2(b1, b2) {
          this.EnsureWrite(2);
          this._bytes[this._writerIndex] = b1;
          this._bytes[this._writerIndex + 1] = b2;
          this._writerIndex += 2;
        };
        _proto.WriteRawTag3 = function WriteRawTag3(b1, b2, b3) {
          this.EnsureWrite(3);
          this._bytes[this._writerIndex] = b1;
          this._bytes[this._writerIndex + 1] = b2;
          this._bytes[this._writerIndex + 2] = b3;
          this._writerIndex += 3;
        };
        _createClass(ByteBuf, [{
          key: "Capacity",
          get: function get() {
            return this._bytes.length;
          }
        }, {
          key: "Size",
          get: function get() {
            return this._writerIndex - this._readerIndex;
          }
        }, {
          key: "Empty",
          get: function get() {
            return this._writerIndex <= this._readerIndex;
          }
        }, {
          key: "NotEmpty",
          get: function get() {
            return this._writerIndex > this._readerIndex;
          }
        }, {
          key: "Remaining",
          get: function get() {
            return this._writerIndex - this._readerIndex;
          }
        }, {
          key: "NotCompactWritable",
          get: function get() {
            return this._bytes.length - this._writerIndex;
          }
        }]);
        return ByteBuf;
      }());
      ByteBuf.emptyBuff = new Uint8Array(0);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraUtil.ts", ['cc'], function (exports) {
  var cclegacy, Vec3, view;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      view = module.view;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2415eAuGddNNJbeMm7SIshi", "CameraUtil", undefined);

      /** 摄像机工具 */
      var CameraUtil = exports('CameraUtil', /*#__PURE__*/function () {
        function CameraUtil() {}
        /**
         * 当前世界坐标是否在摄像机显示范围内
         * @param camera    摄像机
         * @param worldPos  坐标
         */
        CameraUtil.isInView = function isInView(camera, worldPos) {
          var cameraPos = camera.node.getWorldPosition();
          var viewPos = camera.worldToScreen(worldPos);
          var dir = Vec3.normalize(new Vec3(), worldPos.subtract(cameraPos));
          var forward = camera.node.forward;
          var dot = Vec3.dot(forward, dir);
          var viewportRect = view.getViewportRect();

          // 判断物体是否在相机前面
          if (dot > 0
          // 判断物体是否在视窗内
          && viewPos.x <= viewportRect.width && viewPos.x >= 0 && viewPos.y <= viewportRect.height && viewPos.y >= 0) return true;else return false;
        };
        return CameraUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/cell_base.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts', './GameComponent.ts', './ResSprite.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, hope, GameComponent, ResSprite;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      GameComponent = module.GameComponent;
    }, function (module) {
      ResSprite = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "5e72dnwe0ZC5ZRFia2FbndP", "cell_base", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CellBase = exports('CellBase', (_dec = ccclass('CellBase'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_GameComponent) {
        _inheritsLoose(CellBase, _GameComponent);
        function CellBase() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GameComponent.call.apply(_GameComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "nodeCell", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgCell", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgFactory", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = CellBase.prototype;
        _proto.refresh = /*#__PURE__*/function () {
          var _refresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(cellTId) {
            var tbCell, res;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // 获取cell静态数据
                  tbCell = hope.config.tables.TbCell.get(cellTId);
                  res = tbCell.res || tbCell.id;
                  ResSprite.replaceSpriteFrame(this.nodeImgCell, "texture/battle/cell/" + res);
                  // 是否是生产物
                  this.nodeImgFactory.active = !!tbCell.factoryId;
                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function refresh(_x) {
            return _refresh.apply(this, arguments);
          }
          return refresh;
        }();
        return CellBase;
      }(GameComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeCell", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgCell", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgFactory", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/cell_bg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameComponent.ts', './ResSprite.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, GameComponent, ResSprite;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      GameComponent = module.GameComponent;
    }, function (module) {
      ResSprite = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "5bf486PNXFIe5QS/zvlDlW9", "cell_bg", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CellBg = exports('CellBg', (_dec = ccclass('CellBg'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_GameComponent) {
        _inheritsLoose(CellBg, _GameComponent);
        function CellBg() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GameComponent.call.apply(_GameComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "nodeImgBg", _descriptor, _assertThisInitialized(_this));
          _this.x = 0;
          _this.y = 0;
          return _this;
        }
        var _proto = CellBg.prototype;
        _proto.refresh = function refresh(data) {
          if (data.x) this.x = data.x;
          if (data.y) this.y = data.y;

          // 初始化背景
          var bgTexture;
          if (this.x % 2 === 0) {
            bgTexture = this.y % 2 === 0 ? "texture/battle/cell_bg1" : "texture/battle/cell_bg2";
          } else {
            bgTexture = this.y % 2 === 0 ? "texture/battle/cell_bg2" : "texture/battle/cell_bg1";
          }
          ResSprite.replaceSpriteFrame(this.nodeImgBg, bgTexture);
        };
        return CellBg;
      }(GameComponent), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeImgBg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/cell.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts', './ViewUtil.ts', './StringUtil.ts', './event_game.ts', './GameComponent.ts', './ResSprite.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Node, Color, hope, ViewUtil, StringUtil, GameEvent, GameComponent, ResSprite;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      Color = module.Color;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }, function (module) {
      StringUtil = module.StringUtil;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      GameComponent = module.GameComponent;
    }, function (module) {
      ResSprite = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
      cclegacy._RF.push({}, "9e170dh9KFBrptUQsCXYBe5", "cell", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Cell = exports('Cell', (_dec = ccclass('Cell'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Node), _dec10 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_GameComponent) {
        _inheritsLoose(Cell, _GameComponent);
        function Cell() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GameComponent.call.apply(_GameComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labelDebug", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeCell", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgCell", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgInfo", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeSelect", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelLevel", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelCountdown", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgFactory", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgGround", _descriptor9, _assertThisInitialized(_this));
          _this._tbCell = void 0;
          _this._data = void 0;
          _this._isOnload = false;
          _this._animName = void 0;
          return _this;
        }
        var _proto = Cell.prototype;
        _proto.refresh = /*#__PURE__*/function () {
          var _refresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            var res;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  data = this._data = data || this.data;

                  // 初始化物品
                  this.nodeCell.active = !!data.cell.cellId;
                  if (!data.cell.cellId) {
                    this._tbCell = null;
                  } else {
                    // 获取cell静态数据
                    this._tbCell = hope.config.tables.TbCell.get(data.cell.cellId);
                    res = this._tbCell.res || this._tbCell.id;
                    ResSprite.replaceSpriteFrame(this.nodeImgCell, "texture/battle/cell/" + res);
                    // 是否是生产物
                    this.nodeImgFactory.active = !!this._tbCell.factoryId;
                    // 是否是泡泡
                    this.setBubble(!!this._tbCell.bubbleId);
                  }

                  // 开启等级
                  this.labelLevel.node.parent.active = data.unlockLevel > 0;
                  if (data.unlockLevel > 0) {
                    this.labelLevel.string = data.unlockLevel.toString();
                  }

                  // 尘土，并且等级是不显示的
                  this.nodeImgGround.active = data.cell.ground || this.labelLevel.node.parent.active;

                  // 是否激活
                  this.nodeImgCell.uiSprite.grayscale = !data.cell.active;
                  this.nodeImgFactory.uiSprite.grayscale = !data.cell.active;
                  this.missionNeed(data.missionNeed);

                  // debug
                  this.labelDebug.string = this.x + "-" + this.y;
                  this.labelDebug.node.active = false;
                  this.node.name = this.x + "-" + this.y;
                // warn(`${this.node.name}`, data)
                case 12:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function refresh(_x) {
            return _refresh.apply(this, arguments);
          }
          return refresh;
        }();
        _proto.start = function start() {
          this._isOnload = true;
          this.setBubble(this._animName == "cell_pp");
        };
        _proto.setBubble = function setBubble(isBubble) {
          this._animName = isBubble ? "cell_pp" : "cell_normal";
          if (this._isOnload) {
            ViewUtil.playNodeAnimation(this.node, this._animName);
          }
        };
        _proto.update = function update(dt) {
          this.labelCountdown.node.active = this.data.cell.countdown > 0;
          if (this.data.cell.countdown > 0) {
            this.labelCountdown.string = StringUtil.formatTimeString(this.data.cell.countdown, "%{hh}:%{mm}:%{ss}");
            this.data.cell.countdown -= dt;
            if (this.data.cell.countdown < 0) {
              hope.message.dispatchEvent(GameEvent.BattleCellCountdownFinish, this.data.cell);
            }
          }
        };
        _proto.select = function select(isSelect) {
          this.nodeSelect.active = isSelect;
        };
        _proto.missionNeed = function missionNeed(isNeed) {
          // 这里要把数据改了，否则下次refresh没参数的时候就没了
          this.data.missionNeed = isNeed;
          // 是否是任务需要物品
          this.nodeImgInfo.color = isNeed ? new Color(0, 255, 0, 255) : new Color(255, 255, 255, 0);
        };
        _createClass(Cell, [{
          key: "data",
          get: function get() {
            return this._data;
          }
        }, {
          key: "x",
          get: function get() {
            return this.data.cell.x;
          }
        }, {
          key: "y",
          get: function get() {
            return this.data.cell.y;
          }
        }]);
        return Cell;
      }(GameComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelDebug", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeCell", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgCell", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgInfo", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodeSelect", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "labelLevel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "labelCountdown", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgFactory", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgGround", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CommonPrompt.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, hope;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "653bf8VPC5Fn49zFJFqXVgx", "CommonPrompt", undefined);
      // import { LanguageLabel } from "../../../libs/gui/language/LanguageLabel";
      // import { oops } from "../../Oops";

      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /** 公共提示窗口 */
      var CommonPrompt = exports('CommonPrompt', (_dec = ccclass("CommonPrompt"), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CommonPrompt, _Component);
        function CommonPrompt() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 窗口标题多语言组件 */
          _initializerDefineProperty(_this, "lab_title", _descriptor, _assertThisInitialized(_this));
          /** 提示内容多语言组件 */
          _initializerDefineProperty(_this, "lab_content", _descriptor2, _assertThisInitialized(_this));
          /** 确认按钮文本多语言组件 */
          _initializerDefineProperty(_this, "lab_ok", _descriptor3, _assertThisInitialized(_this));
          /** 取消按钮文本多语言组件 */
          _initializerDefineProperty(_this, "lab_cancel", _descriptor4, _assertThisInitialized(_this));
          _this.config = {};
          return _this;
        }
        var _proto = CommonPrompt.prototype;
        /**
         *
         *
         * @param params 参数
         * {
         *     title:      标题
         *     content:    内容
         *     okWord:     ok按钮上的文字
         *     okFunc:     确认时执行的方法
         *     cancelWord: 取消按钮的文字
         *     cancelFunc: 取消时执行的方法
         *     needCancel: 是否需要取消按钮
         * }
         */
        _proto.onAdded = function onAdded(params) {
          if (params === void 0) {
            params = {};
          }
          this.config = params || {};
          this.setTitle();
          this.setContent();
          this.setBtnOkLabel();
          this.setBtnCancelLabel();
          this.node.active = true;
        };
        _proto.setTitle = function setTitle() {
          if (this.config.title) {
            this.lab_title.string = this.config.title;
          }
        };
        _proto.setContent = function setContent() {
          if (this.config.content) {
            this.lab_content.string = this.config.content;
          }
        };
        _proto.setBtnOkLabel = function setBtnOkLabel() {
          if (this.config.okWord) {
            this.lab_ok.string = this.config.okWord;
          }
        };
        _proto.setBtnCancelLabel = function setBtnCancelLabel() {
          if (this.lab_cancel) {
            if (this.config.cancelWord) {
              this.lab_cancel.string = this.config.cancelWord;
            }
            this.lab_cancel.node.parent.active = this.config.needCancel || false;
          }
        };
        _proto.onOk = function onOk() {
          if (typeof this.config.okFunc == "function") {
            this.config.okFunc();
          }
          this.close();
        };
        _proto.onClose = function onClose() {
          if (typeof this.config.closeFunc == "function") {
            this.config.closeFunc();
          }
          this.close();
        };
        _proto.onCancel = function onCancel() {
          if (typeof this.config.cancelFunc == "function") {
            this.config.cancelFunc();
          }
          this.close();
        };
        _proto.close = function close() {
          hope.gui.removeByNode(this.node);
        };
        _proto.onDestroy = function onDestroy() {
          this.config = null;
        };
        return CommonPrompt;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lab_title", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lab_content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lab_ok", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lab_cancel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/config_game_ui.ts", ['cc', './LayerManager.ts'], function (exports) {
  var cclegacy, LayerType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      LayerType = module.LayerType;
    }],
    execute: function () {
      var _UIConfigData;
      cclegacy._RF.push({}, "19a8dWGGoROEbwxD08I9rGH", "config_game_ui", undefined);

      /** 界面唯一标识（方便服务器通过编号数据触发界面打开） */
      var UIID = exports('UIID', /*#__PURE__*/function (UIID) {
        UIID[UIID["Loading"] = 1] = "Loading";
        UIID[UIID["Netinstable"] = 2] = "Netinstable";
        UIID[UIID["Pop1"] = 3] = "Pop1";
        UIID[UIID["Pop2"] = 4] = "Pop2";
        UIID[UIID["Dialog"] = 5] = "Dialog";
        UIID[UIID["Confirm"] = 6] = "Confirm";
        UIID[UIID["Map"] = 7] = "Map";
        UIID[UIID["Battle"] = 8] = "Battle";
        UIID[UIID["BattleBag"] = 9] = "BattleBag";
        return UIID;
      }({}));

      /** 打开界面方式的配置数据 */
      var UIConfigData = exports('UIConfigData', (_UIConfigData = {}, _UIConfigData[UIID.Loading] = {
        layer: LayerType.UI,
        prefab: "loading/prefab/loading",
        bundle: "resources"
      }, _UIConfigData[UIID.Netinstable] = {
        layer: LayerType.PopUp,
        prefab: "common/prefab/netinstable"
      }, _UIConfigData[UIID.Pop1] = {
        layer: LayerType.PopUp,
        prefab: "demo/Pop1"
      }, _UIConfigData[UIID.Pop2] = {
        layer: LayerType.PopUp,
        prefab: "demo/Pop2"
      }, _UIConfigData[UIID.Dialog] = {
        layer: LayerType.Dialog,
        prefab: "demo/Dialog"
      }, _UIConfigData[UIID.Confirm] = {
        layer: LayerType.Dialog,
        prefab: "common/prefab/confirm"
      }, _UIConfigData[UIID.Battle] = {
        layer: LayerType.UI,
        prefab: "gui/prefab/panel_battle"
      }, _UIConfigData[UIID.BattleBag] = {
        layer: LayerType.PopUp,
        vacancy: true,
        mask: true,
        prefab: "gui/prefab/battle/dialog_bag"
      }, _UIConfigData[UIID.Map] = {
        layer: LayerType.UI,
        prefab: "gui/prefab/panel_map"
      }, _UIConfigData));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Config.ts", ['cc', './ByteBuf.ts'], function (exports) {
  var cclegacy, ByteBuf;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ByteBuf = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1908e2eUsZCq6AlqdN+s3MV", "Config", undefined);
      /** 游戏配置静态访问类 */
      var Config = exports('Config', /*#__PURE__*/function () {
        function Config() {
          /** 环境常量 */
          // public btc!: BuildTimeConstants;
          /** 游戏配置数据，版本号、支持语种等数据 */
          this.game = void 0;
          /** 浏览器查询参数 */
          this.query = void 0;
          /** 静态表 */
          this.tables = void 0;
          this.__map_tables_json = new Map();
          this.__map_tables_bin = new Map();
        }
        var _proto = Config.prototype;
        _proto.loaderJson = function loaderJson(fileName) {
          if (this.__map_tables_json.has(fileName)) {
            return this.__map_tables_json.get(fileName).json;
          }
          return null;
        };
        _proto.loaderBin = function loaderBin(fileName) {
          if (this.__map_tables_bin.has(fileName)) {
            return new ByteBuf(this.__map_tables_bin.get(fileName));
          }
          return null;
        };
        return Config;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DateExt.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "39b72c+d8hOjJNTuwrz5TEE", "DateExt", undefined);
      /** 格式化时间字符串 */
      Date.prototype.format = function (format) {
        var year = this.getFullYear();
        var month = this.getMonth() + 1;
        var day = this.getDate();
        var hours = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        return format.replace('yy', year.toString()).replace('mm', (month < 10 ? '0' : '') + month).replace('dd', (day < 10 ? '0' : '') + day).replace('hh', (hours < 10 ? '0' : '') + hours).replace('mm', (minutes < 10 ? '0' : '') + minutes).replace('ss', (seconds < 10 ? '0' : '') + seconds);
      };
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Defines.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "82d3a9c71JEkI95d3qscHm8", "Defines", undefined);
      /*** 界面回调参数对象定义 */
      /** 本类型仅供gui模块内部使用，请勿在功能逻辑中使用 */
      var ViewParams = exports('ViewParams', function ViewParams() {
        /** 界面配置 */
        this.config = null;
        /** 传递给打开界面的参数 */
        this.params = null;
        /** 窗口事件 */
        this.callbacks = null;
        /** 是否在使用状态 */
        this.valid = true;
        /** 界面根节点 */
        this.node = null;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Delegate.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e6c2bWbtY5O3rSemMeKUqav", "Delegate", undefined);
      var Delegate = exports('Delegate', /*#__PURE__*/function () {
        function Delegate() {
          this.list = [];
        }
        var _proto = Delegate.prototype;
        _proto.addListener = function addListener(callback, target) {
          for (var i = 0; i < this.list.length; i++) {
            var element = this.list[i];
            if (element && element.fun === callback && element.target === target) {
              return;
            }
          }
          var w = {
            target: target,
            fun: callback
          };
          this.list.push(w);
        };
        _proto.invoke = /*#__PURE__*/function () {
          var _invoke = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(val) {
            var p, i, w;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  p = [];
                  i = 0;
                case 2:
                  if (!(i < this.list.length)) {
                    _context.next = 10;
                    break;
                  }
                  w = this.list[i];
                  if (w) {
                    _context.next = 6;
                    break;
                  }
                  return _context.abrupt("return");
                case 6:
                  // log('这里Event有可能卡住，我先打个log');
                  p.push(w.fun.call(w.target, val));
                // await w.fun.call(w.target, val);
                case 7:
                  i++;
                  _context.next = 2;
                  break;
                case 10:
                  _context.next = 12;
                  return Promise.all(p);
                case 12:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function invoke(_x) {
            return _invoke.apply(this, arguments);
          }
          return invoke;
        }();
        _proto.removeListener = function removeListener(callback, target) {
          for (var i = 0; i < this.list.length; i++) {
            var element = this.list[i];
            if (element && element.fun === callback && element.target === target) {
              this.list.splice(i, 1);
              return;
            }
          }
        };
        _proto.removeListenerByTarget = function removeListenerByTarget(target) {
          for (var i = 0; i < this.list.length; i++) {
            var element = this.list[i];
            if (element && element.target === target) {
              this.list.splice(i, 1);
              return;
            }
          }
        };
        return Delegate;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DelegateComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, log, Component, hope;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      log = module.log;
      Component = module.Component;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "d8f1fGRD7dBzIeBSkOpd/Py", "DelegateComponent", undefined);
      var ccclass = _decorator.ccclass;

      /** 窗口事件触发组件 */
      var DelegateComponent = exports('DelegateComponent', (_dec = ccclass('DelegateComponent'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DelegateComponent, _Component);
        function DelegateComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 视图参数 */
          _this.vp = null;
          /** 界面关闭回调 - 包括关闭动画播放完（辅助框架内存业务流程使用） */
          _this.onCloseWindow = null;
          return _this;
        }
        var _proto = DelegateComponent.prototype;
        /** 窗口添加 */
        _proto.add = function add() {
          // 触发窗口组件上添加到父节点后的事件
          this.applyComponentsFunction(this.node, "onAdded", this.vp.params);
          if (typeof this.vp.callbacks.onAdded === "function") {
            this.vp.callbacks.onAdded(this.node, this.vp.params);
          }
        }

        /** 删除节点，该方法只能调用一次，将会触发onBeforeRemoved回调 */;
        _proto.remove = function remove(isDestroy) {
          if (this.vp.valid) {
            // 触发窗口移除舞台之前事件
            this.applyComponentsFunction(this.node, "onBeforeRemove", this.vp.params);

            //  通知外部对象窗口组件上移除之前的事件（关闭窗口前的关闭动画处理）
            if (typeof this.vp.callbacks.onBeforeRemove === "function") {
              this.vp.callbacks.onBeforeRemove(this.node, this.onBeforeRemoveNext.bind(this, isDestroy));
            } else {
              this.removed(this.vp, isDestroy);
            }
          }
        }

        /** 窗口关闭前动画处理完后的回调方法，主要用于释放资源 */;
        _proto.onBeforeRemoveNext = function onBeforeRemoveNext(isDestroy) {
          this.removed(this.vp, isDestroy);
        }

        /** 窗口组件中触发移除事件与释放窗口对象 */;
        _proto.removed = function removed(vp, isDestroy) {
          vp.valid = false;
          if (vp.callbacks && typeof vp.callbacks.onRemoved === "function") {
            vp.callbacks.onRemoved(this.node, vp.params);
          }

          // 界面移除舞台事件
          this.onCloseWindow && this.onCloseWindow(vp);
          if (isDestroy) {
            // 释放界面显示对象
            this.node.destroy();

            // 释放界面相关资源
            hope.res.release(vp.config.prefab);
            log("\u3010\u754C\u9762\u7BA1\u7406\u3011\u91CA\u653E\u3010" + vp.config.prefab + "\u3011\u754C\u9762\u8D44\u6E90");
          } else {
            this.node.removeFromParent();
          }
        };
        _proto.onDestroy = function onDestroy() {
          // 触发窗口组件上窗口移除之后的事件
          this.applyComponentsFunction(this.node, "onRemoved", this.vp.params);
          this.vp = null;
        };
        _proto.applyComponentsFunction = function applyComponentsFunction(node, funName, params) {
          for (var i = 0; i < node.components.length; i++) {
            var component = node.components[i];
            var func = component[funName];
            if (func) {
              func.call(component, params);
            }
          }
        };
        return DelegateComponent;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Drag.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, Node, Vec2, NodeEventType, Vec3, UITransform, tween, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Node = module.Node;
      Vec2 = module.Vec2;
      NodeEventType = module.NodeEventType;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "3222bC/ES9JUptTWBLONzT4", "Drag", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FloatType = exports('FloatType', /*#__PURE__*/function (FloatType) {
        FloatType[FloatType["None"] = 0] = "None";
        FloatType[FloatType["MoveToTop"] = 1] = "MoveToTop";
        FloatType[FloatType["MoveToTopLayer"] = 2] = "MoveToTopLayer";
        return FloatType;
      }({}));
      var DragBackHomeType = exports('DragBackHomeType', /*#__PURE__*/function (DragBackHomeType) {
        DragBackHomeType[DragBackHomeType["SetPosition"] = 0] = "SetPosition";
        DragBackHomeType[DragBackHomeType["Tween"] = 1] = "Tween";
        return DragBackHomeType;
      }({}));
      var DragBackTweenType = exports('DragBackTweenType', /*#__PURE__*/function (DragBackTweenType) {
        DragBackTweenType[DragBackTweenType["Time"] = 0] = "Time";
        DragBackTweenType[DragBackTweenType["Speed"] = 1] = "Speed";
        return DragBackTweenType;
      }({}));
      var EasingString = exports('EasingString', /*#__PURE__*/function (EasingString) {
        EasingString[EasingString["linear"] = 0] = "linear";
        EasingString[EasingString["smooth"] = 1] = "smooth";
        EasingString[EasingString["fade"] = 2] = "fade";
        EasingString[EasingString["constant"] = 3] = "constant";
        EasingString[EasingString["quadIn"] = 4] = "quadIn";
        EasingString[EasingString["quadOut"] = 5] = "quadOut";
        EasingString[EasingString["quadInOut"] = 6] = "quadInOut";
        EasingString[EasingString["quadOutIn"] = 7] = "quadOutIn";
        EasingString[EasingString["cubicIn"] = 8] = "cubicIn";
        EasingString[EasingString["cubicOut"] = 9] = "cubicOut";
        EasingString[EasingString["cubicInOut"] = 10] = "cubicInOut";
        EasingString[EasingString["cubicOutIn"] = 11] = "cubicOutIn";
        EasingString[EasingString["quartIn"] = 12] = "quartIn";
        EasingString[EasingString["quartOut"] = 13] = "quartOut";
        EasingString[EasingString["quartInOut"] = 14] = "quartInOut";
        EasingString[EasingString["quartOutIn"] = 15] = "quartOutIn";
        EasingString[EasingString["quintIn"] = 16] = "quintIn";
        EasingString[EasingString["quintOut"] = 17] = "quintOut";
        EasingString[EasingString["quintInOut"] = 18] = "quintInOut";
        EasingString[EasingString["quintOutIn"] = 19] = "quintOutIn";
        EasingString[EasingString["sineIn"] = 20] = "sineIn";
        EasingString[EasingString["sineOut"] = 21] = "sineOut";
        EasingString[EasingString["sineInOut"] = 22] = "sineInOut";
        EasingString[EasingString["sineOutIn"] = 23] = "sineOutIn";
        EasingString[EasingString["expoIn"] = 24] = "expoIn";
        EasingString[EasingString["expoOut"] = 25] = "expoOut";
        EasingString[EasingString["expoInOut"] = 26] = "expoInOut";
        EasingString[EasingString["expoOutIn"] = 27] = "expoOutIn";
        EasingString[EasingString["circIn"] = 28] = "circIn";
        EasingString[EasingString["circOut"] = 29] = "circOut";
        EasingString[EasingString["circInOut"] = 30] = "circInOut";
        EasingString[EasingString["circOutIn"] = 31] = "circOutIn";
        EasingString[EasingString["elasticIn"] = 32] = "elasticIn";
        EasingString[EasingString["elasticOut"] = 33] = "elasticOut";
        EasingString[EasingString["elasticInOut"] = 34] = "elasticInOut";
        EasingString[EasingString["elasticOutIn"] = 35] = "elasticOutIn";
        EasingString[EasingString["backIn"] = 36] = "backIn";
        EasingString[EasingString["backOut"] = 37] = "backOut";
        EasingString[EasingString["backInOut"] = 38] = "backInOut";
        EasingString[EasingString["backOutIn"] = 39] = "backOutIn";
        EasingString[EasingString["bounceIn"] = 40] = "bounceIn";
        EasingString[EasingString["bounceOut"] = 41] = "bounceOut";
        EasingString[EasingString["bounceInOut"] = 42] = "bounceInOut";
        EasingString[EasingString["bounceOutIn"] = 43] = "bounceOutIn";
        return EasingString;
      }({}));
      var Drag = exports('Drag', (_dec = ccclass('Drag'), _dec2 = property({
        tooltip: "触碰点偏移量敏感"
      }), _dec3 = property({
        tooltip: "失败时回到起始位置"
      }), _dec4 = property({
        type: Enum(DragBackHomeType),
        tooltip: "回家的方式",
        visible: function visible() {
          return this.backHomeWhenFailed;
        }
      }), _dec5 = property({
        type: Enum(EasingString),
        tooltip: "缓动类型",
        visible: function visible() {
          return this.backHomeWhenFailed && this.backHomeType == DragBackHomeType.Tween;
        }
      }), _dec6 = property({
        type: Enum(FloatType),
        tooltip: "上浮类型"
      }), _dec7 = property({
        type: Node,
        visible: function visible() {
          return this.floatType == FloatType.MoveToTopLayer;
        }
      }), _dec8 = property({
        tooltip: "松开后返回原来的层级",
        visible: function visible() {
          return this.floatType != FloatType.None;
        }
      }), _dec9 = property({
        type: Enum(DragBackTweenType),
        tooltip: "拖拽失败后返回类型"
      }), _dec10 = property({
        tooltip: "拖拽失败后返回初始位置的时间/速度"
      }), _dec11 = property({
        tooltip: "用于区分点击和拖动的阈值"
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Drag, _Component);
        function Drag() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "touchOffsetSensitive", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backHomeWhenFailed", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backHomeType", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backTweenEasing", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "floatType", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "topLayerNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backToOriZ", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backTweenType", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backTweenValue", _descriptor9, _assertThisInitialized(_this));
          // 默认速度为300，时间为0.5秒
          _initializerDefineProperty(_this, "clickThreshold", _descriptor10, _assertThisInitialized(_this));
          // 点击回调
          _this.clickCallback = null;
          // 检测是否拖拽回调
          _this.checkDragCallback = null;
          // 拖拽移动回调
          _this.dragMoveCallback = null;
          // 放手监测是否成功回调（失败自动回去）
          _this.checkSucceedCallback = null;
          // 放手检测成功后回调
          _this.succeedCallback = null;
          _this.srcParent = void 0;
          _this.zOrder = void 0;
          _this.dragStartPos = new Vec2(0, 0);
          _this.dragOffset = new Vec2(0, 0);
          _this.backTween = void 0;
          _this.isMovingBackHome = false;
          _this.isDragging = false;
          _this.touchStartPos = new Vec2(0, 0);
          return _this;
        }
        var _proto = Drag.prototype;
        // 记录初始触摸位置
        _proto.start = function start() {
          this.node.on(NodeEventType.TOUCH_START, this.OnDragStart, this);
          this.node.on(NodeEventType.TOUCH_MOVE, this.OnDragMove, this);
          this.node.on(NodeEventType.TOUCH_END, this.OnDragEnd, this);
          this.node.on(NodeEventType.TOUCH_CANCEL, this.OnDragEnd, this);
        };
        _proto.OnDragStart = function OnDragStart(e) {
          if (this.isMovingBackHome) {
            return;
          }
          this.isDragging = false;

          // 节点原始位置
          this.dragStartPos.set(this.node.position.x, this.node.position.y);

          // 触摸原始位置
          var touchPoint = e.getUILocation();
          this.touchStartPos.set(touchPoint.x, touchPoint.y);
          Vec2.subtract(this.dragOffset, this.dragStartPos, touchPoint);
          switch (this.floatType) {
            case FloatType.MoveToTop:
              this.zOrder = this.node.getSiblingIndex();
              this.node.setSiblingIndex(Infinity);
              break;
            case FloatType.MoveToTopLayer:
              this.zOrder = this.node.getSiblingIndex();
              this.srcParent = this.node.parent;
              this.node.parent = this.topLayerNode;
              break;
          }
        };
        _proto.OnDragMove = function OnDragMove(e) {
          if (this.isMovingBackHome) {
            return;
          }
          var touchPoint = e.getUILocation();

          // 如果不是正在拖动状态，进行拖动检测
          if (!this.isDragging) {
            var distance = Vec2.distance(this.touchStartPos, touchPoint);
            var shouldStartDragging = distance > this.clickThreshold && (!this.checkDragCallback || this.checkDragCallback(e));
            if (shouldStartDragging) {
              this.isDragging = true;
            } else {
              return;
            }
          }
          var newPos = this.touchOffsetSensitive ? new Vec3(touchPoint.x + this.dragOffset.x, touchPoint.y + this.dragOffset.y, 0) : new Vec3(touchPoint.x, touchPoint.y, 0);
          this.node.setPosition(newPos);
          if (this.dragMoveCallback) {
            this.dragMoveCallback(e);
          }
        };
        _proto.OnDragEnd = function OnDragEnd(e) {
          if (this.isMovingBackHome) {
            return;
          }
          var touchPoint = e.getUILocation();
          var nodeBoundingBox = this.node.getComponent(UITransform).getBoundingBoxToWorld();

          // 如果不是拖动且有点击回调
          if (!this.isDragging) {
            if (this.clickCallback && nodeBoundingBox.contains(touchPoint)) {
              this.clickCallback(e);
              this.OnArrivedHome();
            }
            return; // 点击处理完毕，直接返回
          }

          // 如果拖动成功回调存在，则检查拖动是否成功
          if (this.checkSucceedCallback) {
            var checkData = this.checkSucceedCallback(e);
            if (checkData) {
              this.succeedCallback && this.succeedCallback(e, checkData);
            } else if (this.backHomeWhenFailed) {
              this.backHome();
            }
          } else if (this.backHomeWhenFailed) {
            this.backHome();
          }
        };
        _proto.backHome = function backHome() {
          var _this2 = this;
          this.isMovingBackHome = true;
          var p = new Vec3(this.dragStartPos.x, this.dragStartPos.y, 0);
          if (this.backHomeType === DragBackHomeType.SetPosition) {
            this.node.setPosition(p);
            this.OnArrivedHome();
          } else if (this.backHomeType === DragBackHomeType.Tween) {
            this.backTween && this.backTween.stop();
            var easing = EasingString[this.backTweenEasing];
            if (this.backTweenType === DragBackTweenType.Time) {
              this.backTween = tween(this.node).to(this.backTweenValue, {
                position: p
              }, {
                easing: easing
              }).call(function () {
                _this2.OnArrivedHome();
              }).start();
            } else if (this.backTweenType === DragBackTweenType.Speed) {
              var distance = Vec2.distance(new Vec2(this.node.position.x, this.node.position.y), new Vec2(p.x, p.y));
              var dynamicTweenTime = distance / this.backTweenValue; // 根据速度计算时间
              this.backTween = tween(this.node).to(dynamicTweenTime, {
                position: p
              }, {
                easing: easing
              }).call(function () {
                _this2.OnArrivedHome();
              }).start();
            }
          }
        };
        _proto.OnArrivedHome = function OnArrivedHome() {
          if (this.backToOriZ) switch (this.floatType) {
            case FloatType.MoveToTop:
              this.node.setSiblingIndex(this.zOrder);
              break;
            case FloatType.MoveToTopLayer:
              this.node.parent = this.srcParent;
              this.node.setSiblingIndex(this.zOrder);
              break;
          }
          this.isMovingBackHome = false;
          this.isDragging = false;
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(NodeEventType.TOUCH_START, this.OnDragStart, this);
          this.node.off(NodeEventType.TOUCH_MOVE, this.OnDragMove, this);
          this.node.off(NodeEventType.TOUCH_END, this.OnDragEnd, this);
          this.node.off(NodeEventType.TOUCH_CANCEL, this.OnDragEnd, this);
        };
        return Drag;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "touchOffsetSensitive", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "backHomeWhenFailed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "backHomeType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return DragBackHomeType.SetPosition;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "backTweenEasing", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EasingString.linear;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "floatType", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return FloatType.None;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "topLayerNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "backToOriZ", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "backTweenType", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return DragBackTweenType.Speed;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "backTweenValue", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "clickThreshold", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/dynamic_prefab.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './frame_loader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, log, Node, CCObject, instantiate, warn, Component, FrameLoader;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      log = module.log;
      Node = module.Node;
      CCObject = module.CCObject;
      instantiate = module.instantiate;
      warn = module.warn;
      Component = module.Component;
    }, function (module) {
      FrameLoader = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "6f230TPcllM+5KwRxboDTfc", "dynamic_prefab", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        executeInEditMode = _decorator.executeInEditMode;
      var DynamicPrefab = exports('DynamicPrefab', (_dec = menu('挂载组件/DynamicPrefab'), _dec2 = executeInEditMode(), _dec3 = property({
        type: Prefab,
        tooltip: '要动态挂载的预设'
      }), _dec4 = property({
        tooltip: '是否启用分帧加载'
      }), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DynamicPrefab, _Component);
        function DynamicPrefab() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "prefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "enableAsyncLoad", _descriptor2, _assertThisInitialized(_this));
          _this._prefabNode = null;
          return _this;
        }
        var _proto = DynamicPrefab.prototype;
        _proto.onLoad = function onLoad() {
          log('DynamicPrefab onLoad:' + this.prefab.name);
          {
            if (this.enableAsyncLoad) {
              FrameLoader.inst.addPendingMount(this); // 将 DynamicPrefab 添加到分帧加载
            } else {
              this.mountPrefab(); // 同步加载预设
            }
          }
        };

        _proto.mountPrefabForPreview = function mountPrefabForPreview() {
          var previewNode = new Node('PreviewNode'); // 创建一个新节点用于预览
          previewNode._objFlags = CCObject.Flags.DontSave;
          // 这里预览就不要用creator自带的就行
          var instance = instantiate(this.prefab);
          previewNode.addChild(instance);
          this.node.addChild(previewNode); // 将新节点添加为当前节点的子节点
        };

        _proto.getNode = function getNode() {
          if (!this.prefabNode) {
            // 分帧加载进行中，直接加载并标记分帧已结束
            this.mountPrefab();
          }
          return this.prefabNode;
        };
        _proto.getCompt = function getCompt(type) {
          var node = this.getNode();
          return node.getComponent(type);
        };
        _proto.mountPrefab = function mountPrefab() {
          if (!this.prefabNode) {
            warn("\u6211\u662F\u901A\u8FC7\u3010\u540C\u6B65\u52A0\u8F7D\u3011\uFF1A" + this.prefab.name);
            var instance = instantiate(this.prefab);
            this.node.addChild(instance);
            this.prefabNode = instance;
          }
        };
        _createClass(DynamicPrefab, [{
          key: "prefabNode",
          get: function get() {
            return this._prefabNode;
          },
          set: function set(value) {
            if (this._prefabNode) {
              warn('已经被复值过了!!!!');
            } else {
              this._prefabNode = value;
            }
          }
        }]);
        return DynamicPrefab;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enableAsyncLoad", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/event_game.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "53c5cZJBftKUpSaGa9/fBEL", "event_game", undefined);
      var GameEvent = exports('GameEvent', /*#__PURE__*/function (GameEvent) {
        GameEvent["GameServerConnected"] = "GameServerConnected";
        GameEvent["LoginSuccess"] = "LoginSuccess";
        GameEvent["BattleCellCountdownFinish"] = "BattleCellCountdownFinish";
        GameEvent["BattleSetCell"] = "BattleSetCell";
        GameEvent["BattleRefreshUI"] = "BattleRefreshUI";
        GameEvent["BattleMissionClickFinish"] = "BattleMissionClickFinish";
        GameEvent["GameMapClickFinish"] = "GameMapClickFinish";
        GameEvent["GameMapClickLevelUp"] = "GameMapClickLevelUp";
        GameEvent["GameMapClickGoGame"] = "GameMapClickGoGame";
        return GameEvent;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventDispatcher.ts", ['cc', './MessageManager.ts'], function (exports) {
  var cclegacy, MessageEventData;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      MessageEventData = module.MessageEventData;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c680af5iPNKeIO4cArf/90m", "EventDispatcher", undefined);

      /* 事件对象基类，继承该类将拥有发送和接送事件的能力 */
      var EventDispatcher = exports('EventDispatcher', /*#__PURE__*/function () {
        function EventDispatcher() {
          this._msg = null;
        }
        var _proto = EventDispatcher.prototype;
        /**
         * 注册全局事件
         * @param event     事件名
         * @param listener  处理事件的侦听器函数
         * @param object    侦听函数绑定的作用域对象
         */
        _proto.on = function on(event, listener, object) {
          if (this._msg == null) {
            this._msg = new MessageEventData();
          }
          this._msg.on(event, listener, object);
        }

        /**
         * 移除全局事件
         * @param event      事件名
         */;
        _proto.off = function off(event) {
          if (this._msg) {
            this._msg.off(event);
          }
        }

        /** 
         * 触发全局事件 
         * @param event      事件名
         * @param args       事件参数
         */;
        _proto.dispatchEvent = function dispatchEvent(event) {
          var _this$_msg;
          if (this._msg == null) {
            this._msg = new MessageEventData();
          }
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          (_this$_msg = this._msg).dispatchEvent.apply(_this$_msg, [event].concat(args));
        }

        /**
         * 销毁事件对象
         */;
        _proto.destroy = function destroy() {
          if (this._msg) {
            this._msg.clear();
          }
          this._msg = null;
        };
        return EventDispatcher;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventMessage.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "beea7u9xnJD4rMj6ua/LTcF", "EventMessage", undefined);
      /**
       * 全局事件监听方法
       * @param event      事件名
       * @param args       事件参数
       */
      /** 框架内部全局事件  */
      var EventMessage = exports('EventMessage', /*#__PURE__*/function (EventMessage) {
        EventMessage["GAME_SHOW"] = "GAME_ENTER";
        EventMessage["GAME_HIDE"] = "GAME_EXIT";
        EventMessage["GAME_RESIZE"] = "GAME_RESIZE";
        EventMessage["GAME_FULL_SCREEN"] = "GAME_FULL_SCREEN";
        EventMessage["GAME_ORIENTATION"] = "GAME_ORIENTATION";
        return EventMessage;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventSystem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Delegate.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, Component, Delegate;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
    }, function (module) {
      Delegate = module.Delegate;
    }],
    execute: function () {
      cclegacy._RF.push({}, "09d8dc4WTxJ7JUF5QprKmgl", "EventSystem", undefined);
      var EventSystemUnRegister = exports('EventSystemUnRegister', /*#__PURE__*/function () {
        function EventSystemUnRegister(eventSystem, eventType, onEvent, target) {
          if (target === void 0) {
            target = null;
          }
          this.mEventSystem = null;
          this.mEventType = '';
          this.mOnEvent = null;
          this.mTarget = null;
          this.mEventSystem = eventSystem;
          this.mEventType = eventType;
          this.mOnEvent = onEvent;
          this.mTarget = target;
        }
        var _proto = EventSystemUnRegister.prototype;
        _proto.UnRegister = function UnRegister() {
          this.mEventSystem.UnRegister(this.mEventType, this.mOnEvent, this.mTarget);
          this.mEventSystem = null;
          this.mOnEvent = null;
          this.mTarget = null;
        };
        _proto.UnRegisterWhenGameObjectDestroyed = function UnRegisterWhenGameObjectDestroyed(node) {
          var trigger = node.getComponent(UnRegisterDestroyTrigger);
          if (!trigger) {
            trigger = node.addComponent(UnRegisterDestroyTrigger);
          }
          trigger.AddUnRegister(this);
        };
        return EventSystemUnRegister;
      }());
      var UnRegisterDestroyTrigger = exports('UnRegisterDestroyTrigger', /*#__PURE__*/function (_Component) {
        _inheritsLoose(UnRegisterDestroyTrigger, _Component);
        function UnRegisterDestroyTrigger() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.mUnRegisters = new Set();
          return _this;
        }
        var _proto2 = UnRegisterDestroyTrigger.prototype;
        _proto2.AddUnRegister = function AddUnRegister(unRegister) {
          this.mUnRegisters.add(unRegister);
        };
        _proto2.onDestroy = function onDestroy() {
          this.mUnRegisters.forEach(function (value) {
            value.UnRegister();
          });
          this.mUnRegisters.clear();
        };
        return UnRegisterDestroyTrigger;
      }(Component));
      var EventSystem = exports('EventSystem', /*#__PURE__*/function () {
        function EventSystem() {
          this.mEventRegisteration = new Map();
        }
        var _proto3 = EventSystem.prototype;
        _proto3.Register = function Register(type, onEvent, target) {
          if (!this.mEventRegisteration.has(type)) {
            this.mEventRegisteration.set(type, new Registerations());
          }
          var registeration = this.mEventRegisteration.get(type);
          registeration.OnEvent.addListener(onEvent, target);
          return new EventSystemUnRegister(this, type, onEvent, target);
        };
        _proto3.UnRegister = function UnRegister(type, onEvent, target) {
          if (!this.mEventRegisteration.has(type)) {
            return;
          }
          var registeration = this.mEventRegisteration.get(type);
          registeration.OnEvent.removeListener(onEvent, target);
        };
        _proto3.UnRegisterByTarget = function UnRegisterByTarget(target) {
          this.mEventRegisteration.forEach(function (registeration, eventType) {
            if (registeration instanceof Registerations) {
              registeration.OnEvent.removeListenerByTarget(target);
            }
          });
        };
        _proto3.Send = /*#__PURE__*/function () {
          var _Send = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(eventType, e) {
            var registeration;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (this.mEventRegisteration.has(eventType)) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  registeration = this.mEventRegisteration.get(eventType);
                  _context.next = 5;
                  return registeration.OnEvent.invoke(e);
                case 5:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function Send(_x, _x2) {
            return _Send.apply(this, arguments);
          }
          return Send;
        }();
        return EventSystem;
      }());
      var Registerations = exports('Registerations', function Registerations() {
        this.OnEvent = new Delegate();
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/frame_loader.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, game, instantiate, warn, Node, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      game = module.game;
      instantiate = module.instantiate;
      warn = module.warn;
      Node = module.Node;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "6184cPPKrREe6VpG1vuA9P1", "frame_loader", undefined);
      // import Res from '../../../util/Res';

      var ccclass = _decorator.ccclass;
      var FrameLoader = exports('default', ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FrameLoader, _Component);
        function FrameLoader() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.pendingMounts = [];
          _this.isRunning = false;
          return _this;
        }
        var _proto = FrameLoader.prototype;
        _proto.onLoad = function onLoad() {
          if (FrameLoader._instance && FrameLoader._instance !== this) {
            // 如果实例已存在且不是当前实例，则销毁当前实例
            this.node.destroy();
            return;
          }

          // 设置当前实例为单例
          FrameLoader._instance = this;
        };
        _proto.addPendingMount = function addPendingMount(node) {
          this.pendingMounts.push(node);
          if (!this.isRunning) {
            this.isRunning = true;
            // 获取上一帧到现在时间
            this.schedule(this.loadPendingPrefabs, game.deltaTime);
          }
        };
        _proto.loadPendingPrefabs = function loadPendingPrefabs() {
          var maxFramesPerUpdate = 1;
          for (var i = 0; i < maxFramesPerUpdate; i++) {
            if (this.pendingMounts.length > 0) {
              var dynamicPrefab = this.pendingMounts.shift();
              if (!dynamicPrefab.prefabNode) {
                var instance = instantiate(dynamicPrefab.prefab);
                warn("\u6211\u662F\u901A\u8FC7\u3010\u5206\u5E27\u52A0\u8F7D\u3011\uFF1A" + dynamicPrefab.prefab.name);
                dynamicPrefab.node.addChild(instance);
                dynamicPrefab.prefabNode = instance;
              }
            } else {
              this.isRunning = false; // 分帧加载结束
              this.unschedule(this.loadPendingPrefabs);
              break;
            }
          }
        };
        _createClass(FrameLoader, null, [{
          key: "inst",
          get:
          // 标记分帧加载是否正在运行

          function get() {
            if (!this._instance) {
              var node = new Node('SingletonNode');
              this._instance = node.addComponent(FrameLoader);
              director.getScene().addChild(node);
              director.addPersistRootNode(node);
            }
            return this._instance;
          }
        }]);
        return FrameLoader;
      }(Component), _class2._instance = null, _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/game_map_ctrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts', './game_map_item.ts', './event_game.ts', './BaseCtrl.ts', './mission_model.ts', './config_game_ui.ts', './player_model.ts', './ViewUtil.ts'], function (exports) {
  var _inheritsLoose, cclegacy, instantiate, warn, hope, GameMapItem, GameEvent, BaseCtrl, MissionModel, UIID, PlayerModel, ViewUtil;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      instantiate = module.instantiate;
      warn = module.warn;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      GameMapItem = module.GameMapItem;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      BaseCtrl = module.BaseCtrl;
    }, function (module) {
      MissionModel = module.MissionModel;
    }, function (module) {
      UIID = module.UIID;
    }, function (module) {
      PlayerModel = module.PlayerModel;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "720978wNwNCx4dr8aLiJU8A", "game_map_ctrl", undefined);
      var GameMapCtrl = exports('GameMapCtrl', /*#__PURE__*/function (_BaseCtrl) {
        _inheritsLoose(GameMapCtrl, _BaseCtrl);
        function GameMapCtrl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseCtrl.call.apply(_BaseCtrl, [this].concat(args)) || this;
          _this._compts = [];
          return _this;
        }
        var _proto = GameMapCtrl.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          var tbs = hope.config.tables.TbGameMap.getDataList();
          for (var i = 0; i < tbs.length; i++) {
            var node = instantiate(this.view.prefabPotion);
            var compt = node.getComponent(GameMapItem);
            this._compts.push(compt);
            node.parent = this.view.layoutMap.node;
          }
          this.refresh();
          hope.message.on(GameEvent.GameMapClickFinish, this.onHandler, this);
          hope.message.on(GameEvent.GameMapClickLevelUp, this.onHandler, this);
          hope.message.on(GameEvent.GameMapClickGoGame, this.onHandler, this);
          ViewUtil.registerButtonClick(this.view.btnSave, function () {
            _this2.GetModel(PlayerModel).save();
          }, this);
          ViewUtil.registerButtonClick(this.view.btnRemove, function () {
            _this2.GetModel(PlayerModel).clear();
          }, this);
        };
        _proto.onDestroy = function onDestroy() {
          hope.message.offAllByObject(this);
        };
        _proto.refresh = function refresh() {
          var _this3 = this;
          this.GetModel(MissionModel).refreshGameMapMission();
          var tbs = hope.config.tables.TbGameMap.getDataList();
          var _loop = function _loop() {
            var compt = _this3._compts[i].getComponent(GameMapItem);
            var tb = tbs[i];
            var detail = _this3.GetModel(MissionModel).getDoingGameMap().find(function (v, i) {
              return v.tId == tb.id;
            });
            if (detail) {
              detail.process = detail.buildLevel / _this3.GetModel(MissionModel).getGameMapBuildLevelMax(detail.tId);
              compt.refresh(detail);
            } else {
              compt.refresh(_this3.GetModel(MissionModel).getGameMapDetail(tb.id));
            }
          };
          for (var i = 0; i < tbs.length; i++) {
            _loop();
          }
        };
        _proto.onHandler = function onHandler(event, args) {
          var _this4 = this;
          switch (event) {
            case GameEvent.GameMapClickFinish:
              var state = args.state;
              switch (state) {
                case 0:
                  hope.gui.toast("该地图还未激活");
                  break;
                case 1:
                  {
                    var _tb = hope.config.tables.TbGameMap.get(args.tId);
                    var _str = '';
                    var r = _tb.unlockCell;
                    var item = hope.config.tables.TbCell.get(r.id);
                    _str += item.name + " " + r.count + " \u4E2A";
                    hope.gui.tip.alert("\u4F60\u662F\u5426\u82B1\u8D39 " + _str + " \u6FC0\u6D3B\uFF1F", function () {
                      if (_this4.GetModel(MissionModel).reqUnlockMap(_tb.id)) {
                        _this4.refresh();
                      } else {
                        hope.gui.toast("材料不足");
                      }
                    }, "激活", "是的", "不要");
                    break;
                  }
                case 2:
                  hope.gui.open(UIID.Battle);
                  hope.gui.removeByNode(this.view.node);
                  break;
                case 3:
                  hope.gui.toast("该地图已完成");
                  break;
              }
              break;
            case GameEvent.GameMapClickLevelUp:
              warn(args);
              var tbMap = hope.config.tables.TbGameMap.get(args.tId);
              var tb = hope.config.tables.TbGameMapBuild.getDataList().find(function (v, i) {
                return v.map == tbMap.id && v.level == args.buildLevel;
              });
              var str = '';
              var needs = tb.needCell;
              for (var i = 0; i < needs.length; i++) {
                var need = needs[i];
                var needTb = hope.config.tables.TbCell.get(need.id);
                str += needTb.name + " " + need.count + " \u4E2A ";
              }
              var reward = tb.reward;
              var rewardTb = hope.config.tables.TbCell.get(reward.id);
              str += "\u83B7\u53D6\uFF1A " + rewardTb.name + " " + reward.count + " \u4E2A ";
              str += "\u548C exp " + tb.rewardExp + " ";
              hope.gui.tip.alert("\u4F60\u662F\u5426\u82B1\u8D39 " + str + " \u5347\u7EA7\uFF1F", function () {
                if (_this4.GetModel(MissionModel).reqBuildLevelUp(args.tId, args.buildLevel)) {
                  _this4.refresh();
                } else {
                  hope.gui.toast("材料不足");
                }
              }, "升级", "是的", "不要");
              break;
            case GameEvent.GameMapClickGoGame:
              hope.gui.open(UIID.Battle);
              hope.gui.removeByNode(this.view.node);
              break;
          }
        };
        return GameMapCtrl;
      }(BaseCtrl));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/game_map_item.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameComponent.ts', './ViewUtil.ts', './Hope.ts', './event_game.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Button, Label, ProgressBar, GameComponent, ViewUtil, hope, GameEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Button = module.Button;
      Label = module.Label;
      ProgressBar = module.ProgressBar;
    }, function (module) {
      GameComponent = module.GameComponent;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      GameEvent = module.GameEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "cc8c7zhDzRG0LO4NIQfsTGi", "game_map_item", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameMapItem = exports('GameMapItem', (_dec = ccclass('GameMapItem'), _dec2 = property(Node), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(ProgressBar), _dec9 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_GameComponent) {
        _inheritsLoose(GameMapItem, _GameComponent);
        function GameMapItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GameComponent.call.apply(_GameComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "nodeImgNpc", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnFinish", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnLevelUp", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnMap", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelName", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelState", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "barProcess", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelReward", _descriptor8, _assertThisInitialized(_this));
          _this._data = void 0;
          return _this;
        }
        var _proto = GameMapItem.prototype;
        _proto.onLoad = function onLoad() {
          ViewUtil.registerButtonClick(this.btnFinish, this.onFinish, this);
          ViewUtil.registerButtonClick(this.btnLevelUp, this.onLevelUp, this);
          ViewUtil.registerButtonClick(this.btnMap, this.onGame, this);
        };
        _proto.refresh = function refresh(detail) {
          this._data = detail;
          var tb = hope.config.tables.TbGameMap.get(detail.tId);
          this.labelName.string = "\u5EFA\u7B51\u540D\uFF1A" + tb.name;
          var str = '';
          for (var i = 0; i < tb.reward.length; i++) {
            var r = tb.reward[i];
            var item = hope.config.tables.TbCell.get(r.id);
            str += item.name + " " + r.count + " \u4E2A";
          }
          this.labelReward.string = "\u5956\u52B1\uFF1A" + str + " exp: " + tb.rewardExp;
          switch (detail.state) {
            case 0:
              this.labelState.string = detail.state + ":\u672A\u6FC0\u6D3B0";
              break;
            case 1:
              this.labelState.string = detail.state + ":\u53EF\u4EE5\u6FC0\u6D3B";
              break;
            case 2:
              this.labelState.string = detail.state + ":\u5DF2\u7ECF\u6FC0\u6D3B";
              break;
            case 3:
              this.labelState.string = detail.state + ":\u5DF2\u5B8C\u6210";
              break;
          }
          this.barProcess.node.active = detail.state == 2;
          this.btnLevelUp.node.active = detail.state == 2;
          if (this.barProcess.node.active) this.barProcess.progress = detail.process;
        };
        _proto.onFinish = function onFinish() {
          hope.message.dispatchEvent(GameEvent.GameMapClickFinish, this._data);
        };
        _proto.onLevelUp = function onLevelUp() {
          hope.message.dispatchEvent(GameEvent.GameMapClickLevelUp, this._data);
        };
        _proto.onGame = function onGame() {
          hope.message.dispatchEvent(GameEvent.GameMapClickGoGame, this._data);
        };
        return GameMapItem;
      }(GameComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeImgNpc", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnFinish", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnLevelUp", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnMap", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelName", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "labelState", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "barProcess", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "labelReward", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/game_map.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseView.ts', './game_map_ctrl.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Layout, Button, BindCtrl, BaseView, GameMapCtrl;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Layout = module.Layout;
      Button = module.Button;
    }, function (module) {
      BindCtrl = module.BindCtrl;
      BaseView = module.BaseView;
    }, function (module) {
      GameMapCtrl = module.GameMapCtrl;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "3327a2eZZ1DGKVe5vS2vuKj", "game_map", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameMap = exports('GameMap', (_dec = ccclass('GameMap'), _dec2 = BindCtrl(GameMapCtrl), _dec3 = property(Prefab), _dec4 = property(Layout), _dec5 = property(Button), _dec6 = property(Button), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_BaseView) {
        _inheritsLoose(GameMap, _BaseView);
        function GameMap() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseView.call.apply(_BaseView, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "prefabPotion", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "layoutMap", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnSave", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnRemove", _descriptor4, _assertThisInitialized(_this));
          return _this;
        }
        return GameMap;
      }(BaseView), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabPotion", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "layoutMap", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnSave", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnRemove", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventDispatcher.ts', './EventMessage.ts', './ViewUtil.ts', './ButtonTouchLong.ts', './Hope.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, Prefab, instantiate, error, Node, Button, EventHandler, input, Input, Component, EventDispatcher, EventMessage, ViewUtil, ButtonTouchLong, hope;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      error = module.error;
      Node = module.Node;
      Button = module.Button;
      EventHandler = module.EventHandler;
      input = module.input;
      Input = module.Input;
      Component = module.Component;
    }, function (module) {
      EventDispatcher = module.EventDispatcher;
    }, function (module) {
      EventMessage = module.EventMessage;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }, function (module) {
      ButtonTouchLong = module.ButtonTouchLong;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "10e9e2FeLpJzq1QuR4SWa2s", "GameComponent", undefined);
      var ccclass = _decorator.ccclass;

      /** 加载资源类型 */
      var ResType = /*#__PURE__*/function (ResType) {
        ResType[ResType["Load"] = 0] = "Load";
        ResType[ResType["LoadDir"] = 1] = "LoadDir";
        ResType[ResType["Audio"] = 2] = "Audio";
        return ResType;
      }(ResType || {});
      /** 资源加载记录 */
      /**
       * 游戏显示对象组件模板
       * 1、当前对象加载的资源，会在对象释放时，自动释放引用的资源
       * 2、当前对象支持启动游戏引擎提供的各种常用逻辑事件
       */
      var GameComponent = exports('GameComponent', (_dec = ccclass("GameComponent"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameComponent, _Component);
        function GameComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          //#region 全局事件管理
          _this._event = null;
          //#endregion
          //#region 预制节点管理
          /** 摊平的节点集合（所有节点不能重名） */
          _this.nodes = null;
          //#endregion
          //#region 资源加载管理
          /** 资源路径 */
          _this.resPaths = null;
          return _this;
        }
        var _proto = GameComponent.prototype;
        /**
         * 注册全局事件
         * @param event       事件名
         * @param listener    处理事件的侦听器函数
         * @param object      侦听函数绑定的this对象
         */
        _proto.on = function on(event, listener, object) {
          this.event.on(event, listener, object);
        }

        /**
         * 移除全局事件
         * @param event      事件名
         */;
        _proto.off = function off(event) {
          this.event.off(event);
        }

        /**
         * 触发全局事件
         * @param event      事件名
         * @param args       事件参数
         */;
        _proto.dispatchEvent = function dispatchEvent(event) {
          var _this$event;
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          (_this$event = this.event).dispatchEvent.apply(_this$event, [event].concat(args));
        };
        /** 通过节点名获取预制上的节点，整个预制不能有重名节点 */
        _proto.getNode = function getNode(name) {
          if (this.nodes) {
            return this.nodes.get(name);
          }
          return undefined;
        }

        /** 平摊所有节点存到Map<string, Node>中通过get(name: string)方法获取 */;
        _proto.nodeTreeInfoLite = function nodeTreeInfoLite() {
          this.nodes = new Map();
          ViewUtil.nodeTreeInfoLite(this.node, this.nodes);
        }

        /**
         * 从资源缓存中找到预制资源名并创建一个显示对象
         * @param path 资源路径
         */;
        _proto.createPrefabNode = function createPrefabNode(path) {
          var p = hope.res.get(path, Prefab);
          var n = instantiate(p);
          return n;
        }

        /**
         * 加载预制并创建预制节点
         * @param path 资源路径
         */;
        _proto.createPrefabNodeAsync = function createPrefabNodeAsync(path) {
          var _this2 = this;
          return new Promise(function (resolve, reject) {
            _this2.load(path, Prefab, function (err, content) {
              if (err) {
                error("\u540D\u4E3A\u3010" + path + "\u3011\u7684\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25");
                resolve(null);
              } else {
                var node = instantiate(content);
                resolve(node);
              }
            });
          });
        };
        // 资源使用记录
        /**
         * 获取资源
         * @param path          资源路径
         * @param type          资源类型
         * @param bundleName    远程资源包名
         */
        _proto.getRes = function getRes(path, type, bundleName) {
          return hope.res.get(path, type, bundleName);
        }

        /**
         * 添加资源使用记录
         * @param type          资源类型
         * @param bundleName    资源包名
         * @param paths         资源路径
         */;
        _proto.addPathToRecord = function addPathToRecord(type, bundleName, paths) {
          if (this.resPaths == null) this.resPaths = new Map();
          var rps = this.resPaths.get(type);
          if (rps == null) {
            rps = new Map();
            this.resPaths.set(type, rps);
          }
          if (paths instanceof Array) {
            var realBundle = bundleName;
            for (var index = 0; index < paths.length; index++) {
              var realPath = paths[index];
              var key = realBundle + ":" + realPath;
              if (!rps.has(key)) {
                rps.set(key, {
                  path: realPath,
                  bundle: realBundle
                });
              }
            }
          } else if (typeof paths === "string") {
            var _realBundle = bundleName;
            var _realPath = paths;
            var _key3 = _realBundle + ":" + _realPath;
            if (!rps.has(_key3)) {
              rps.set(_key3, {
                path: _realPath,
                bundle: _realBundle
              });
            }
          } else {
            var _realBundle2 = hope.res.defaultBundleName;
            var _realPath2 = bundleName;
            var _key4 = _realBundle2 + ":" + _realPath2;
            if (!rps.has(_key4)) {
              rps.set(_key4, {
                path: _realPath2,
                bundle: _realBundle2
              });
            }
          }
        }

        /** 异步加载资源 */;
        _proto.loadAsync = function loadAsync(bundleName, paths, type) {
          this.addPathToRecord(ResType.Load, bundleName, paths);
          return hope.res.loadAsync(bundleName, paths, type);
        }

        /** 加载资源 */;
        _proto.load = function load(bundleName, paths, type, onProgress, onComplete) {
          this.addPathToRecord(ResType.Load, bundleName, paths);
          hope.res.load(bundleName, paths, type, onProgress, onComplete);
        }

        /** 加载文件名中资源 */;
        _proto.loadDir = function loadDir(bundleName, dir, type, onProgress, onComplete) {
          var realDir;
          var realBundle;
          if (typeof dir === "string") {
            realDir = dir;
            realBundle = bundleName;
          } else {
            realDir = bundleName;
            realBundle = hope.res.defaultBundleName;
          }
          this.addPathToRecord(ResType.LoadDir, realBundle, realDir);
          hope.res.loadDir(bundleName, dir, type, onProgress, onComplete);
        }

        /** 释放一个资源 */;
        _proto.release = function release() {
          if (this.resPaths) {
            var rps = this.resPaths.get(ResType.Load);
            if (rps) {
              rps.forEach(function (value) {
                hope.res.release(value.path, value.bundle);
              });
              rps.clear();
            }
          }
        }

        /** 释放一个文件夹的资源 */;
        _proto.releaseDir = function releaseDir() {
          if (this.resPaths) {
            var rps = this.resPaths.get(ResType.LoadDir);
            if (rps) {
              rps.forEach(function (value) {
                hope.res.releaseDir(value.path, value.bundle);
              });
            }
          }
        }

        /** 释放音效资源 */;
        _proto.releaseAudioEffect = function releaseAudioEffect() {
          if (this.resPaths) {
            var rps = this.resPaths.get(ResType.Audio);
            if (rps) {
              rps.forEach(function (value) {
                hope.audio.releaseEffect(value.path, value.bundle);
              });
            }
          }
        }

        //#endregion

        //#region 音频播放管理
        /**
         * 播放背景音乐（不受自动释放资源管理）
         * @param url           资源地址
         * @param callback      资源加载完成回调
         * @param bundleName    资源包名
         */;
        _proto.playMusic = function playMusic(url, callback, bundleName) {
          hope.audio.playMusic(url, callback, bundleName);
        }

        /**
         * 循环播放背景音乐（不受自动释放资源管理）
         * @param url           资源地址
         * @param bundleName    资源包名
         */;
        _proto.playMusicLoop = function playMusicLoop(url, bundleName) {
          hope.audio.stopMusic();
          hope.audio.playMusicLoop(url, bundleName);
        }

        /**
         * 播放音效
         * @param url           资源地址
         * @param callback      资源加载完成回调
         * @param bundleName    资源包名
         */;
        _proto.playEffect = function playEffect(url, callback, bundleName) {
          if (bundleName == null) bundleName = hope.res.defaultBundleName;
          this.addPathToRecord(ResType.Audio, bundleName, url);
          hope.audio.playEffect(url, callback, bundleName);
        }

        //#endregion

        //#region 游戏逻辑事件
        /**
         * 批量设置当前界面按钮事件
         * @example
         * 注：按钮节点Label1、Label2必须绑定UIButton等类型的按钮组件才会生效，方法名必须与节点名一致
         * this.setButton();
         *
         * Label1(event: EventTouch) { console.log(event.target.name); }
         * Label2(event: EventTouch) { console.log(event.target.name); }
         */;
        _proto.setButton = function setButton() {
          var _this3 = this;
          // 自定义按钮批量绑定触摸事件
          this.node.on(Node.EventType.TOUCH_END, function (event) {
            var self = _this3;
            var func = self[event.target.name];
            if (func) {
              func.call(_this3, event);
            }
            // 不触发界面根节点触摸事件、不触发长按钮组件的触摸事件
            else if (event.target != _this3.node && event.target.getComponent(ButtonTouchLong) == null) {
              error("\u540D\u4E3A\u3010" + event.target.name + "\u3011\u7684\u6309\u94AE\u4E8B\u4EF6\u65B9\u6CD5\u4E0D\u5B58\u5728");
            }
          }, this);

          // Cocos Creator Button组件批量绑定触摸事件（使用UIButton支持放连点功能）
          var regex = /<([^>]+)>/;
          var buttons = this.node.getComponentsInChildren(Button);
          buttons.forEach(function (b) {
            var node = b.node;
            var self = _this3;
            var func = self[node.name];
            if (func) {
              var event = new EventHandler();
              event.target = _this3.node;
              event.handler = b.node.name;
              event.component = _this3.name.match(regex)[1];
              b.clickEvents.push(event);
            } else error("\u540D\u4E3A\u3010" + node.name + "\u3011\u7684\u6309\u94AE\u4E8B\u4EF6\u65B9\u6CD5\u4E0D\u5B58\u5728");
          });
        }

        /**
         * 批量设置全局事件
         * @example
         *  this.setEvent("onGlobal");
         *  this.dispatchEvent("onGlobal", "全局事件");
         *
         *  onGlobal(event: string, args: any) { console.log(args) };
         */;
        _proto.setEvent = function setEvent() {
          var self = this;
          for (var _len3 = arguments.length, args = new Array(_len3), _key5 = 0; _key5 < _len3; _key5++) {
            args[_key5] = arguments[_key5];
          }
          for (var _i = 0, _args = args; _i < _args.length; _i++) {
            var name = _args[_i];
            var func = self[name];
            if (func) this.on(name, self[name], this);else error("\u540D\u4E3A\u3010" + name + "\u3011\u7684\u5168\u5C40\u4E8B\u65B9\u6CD5\u4E0D\u5B58\u5728");
          }
        }

        /**
         * 键盘事件开关
         * @param on 打开键盘事件为true
         */;
        _proto.setKeyboard = function setKeyboard(on) {
          if (on) {
            input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
            input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
          } else {
            input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
            input.off(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
          }
        }

        /** 键按下 */;
        _proto.onKeyDown = function onKeyDown(event) {}

        /** 键放开 */;
        _proto.onKeyUp = function onKeyUp(event) {}

        /** 键长按 */;
        _proto.onKeyPressing = function onKeyPressing(event) {}

        /** 监听游戏从后台进入事件 */;
        _proto.setGameShow = function setGameShow() {
          this.on(EventMessage.GAME_SHOW, this.onGameShow, this);
        }

        /** 监听游戏切到后台事件 */;
        _proto.setGameHide = function setGameHide() {
          this.on(EventMessage.GAME_HIDE, this.onGameHide, this);
        }

        /** 监听游戏画笔尺寸变化事件 */;
        _proto.setGameResize = function setGameResize() {
          this.on(EventMessage.GAME_RESIZE, this.onGameResize, this);
        }

        /** 监听游戏全屏事件 */;
        _proto.setGameFullScreen = function setGameFullScreen() {
          this.on(EventMessage.GAME_FULL_SCREEN, this.onGameFullScreen, this);
        }

        /** 监听游戏旋转屏幕事件 */;
        _proto.setGameOrientation = function setGameOrientation() {
          this.on(EventMessage.GAME_ORIENTATION, this.onGameOrientation, this);
        }

        /** 游戏从后台进入事件回调 */;
        _proto.onGameShow = function onGameShow() {}

        /** 游戏切到后台事件回调 */;
        _proto.onGameHide = function onGameHide() {}

        /** 游戏画笔尺寸变化事件回调 */;
        _proto.onGameResize = function onGameResize() {}

        /** 游戏全屏事件回调 */;
        _proto.onGameFullScreen = function onGameFullScreen() {}

        /** 游戏旋转屏幕事件回调 */;
        _proto.onGameOrientation = function onGameOrientation() {}

        //#endregion
        ;

        _proto.onDestroy = function onDestroy() {
          // 释放消息对象
          if (this._event) {
            this._event.destroy();
            this._event = null;
          }

          // 节点引用数据清除
          if (this.nodes) {
            this.nodes.clear();
            this.nodes = null;
          }

          // 自动释放资源
          if (this.resPaths) {
            this.releaseAudioEffect();
            this.release();
            this.releaseDir();
            this.resPaths.clear();
            this.resPaths = null;
          }
        };
        _createClass(GameComponent, [{
          key: "event",
          get: /** 全局事件管理器 */
          function get() {
            if (this._event == null) this._event = new EventDispatcher();
            return this._event;
          }
        }]);
        return GameComponent;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, log;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b174f91JvNJy6zOPgIzQUvv", "GameConfig", undefined);

      /* 游戏配置解析，对应 resources/config/config.json 配置 */
      var GameConfig = exports('GameConfig', /*#__PURE__*/function () {
        function GameConfig(config) {
          this._data = null;
          this._data = Object.freeze(config.json);
          log(this._data, "游戏配置");
        }
        _createClass(GameConfig, [{
          key: "version",
          get: /** 客户端版本号配置 */
          function get() {
            return this._data["config"]["version"];
          }
          /** 包名 */
        }, {
          key: "package",
          get: function get() {
            return this._data["config"]["package"];
          }
          /** 游戏每秒传输帧数 */
        }, {
          key: "frameRate",
          get: function get() {
            return this._data.config.frameRate;
          }
          /** 本地存储内容加密 key */
        }, {
          key: "localDataKey",
          get: function get() {
            return this._data.config.localDataKey;
          }
          /** 本地存储内容加密 iv */
        }, {
          key: "localDataIv",
          get: function get() {
            return this._data.config.localDataIv;
          }
          /** Http 服务器地址 */
        }, {
          key: "httpServer",
          get: function get() {
            return this._data.config.httpServer;
          }
          /** Http 请求超时时间 */
        }, {
          key: "httpTimeout",
          get: function get() {
            return this._data.config.httpTimeout;
          }

          /** 获取当前客户端支持的语言类型 */
        }, {
          key: "language",
          get: function get() {
            return this._data.language.type || ["zh"];
          }
          /** 获取当前客户端支持的语言 Json 配置路径 */
        }, {
          key: "languagePathJson",
          get: function get() {
            return this._data.language.path.json || "language/json";
          }
          /** 获取当前客户端支持的语言纹理配置路径 */
        }, {
          key: "languagePathTexture",
          get: function get() {
            return this._data.language.path.texture || "language/texture";
          }

          /** 是否启用远程资源 */
        }, {
          key: "bundleEnable",
          get: function get() {
            return this._data.bundle.enable;
          }
          /** 远程资源服务器地址 */
        }, {
          key: "bundleServer",
          get: function get() {
            return this._data.bundle.server;
          }
          /** 远程资源名 */
        }, {
          key: "bundleName",
          get: function get() {
            return this._data.bundle.name;
          }
          /** 远程资源版本号 */
        }, {
          key: "bundleVersion",
          get: function get() {
            return this._data.bundle.version;
          }
        }, {
          key: "data",
          get: /** 游戏配置数据 */
          function get() {
            return this._data;
          }
        }]);
        return GameConfig;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameQueryConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './StringUtil.ts'], function (exports) {
  var _createClass, cclegacy, sys, log, StringUtil;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
      log = module.log;
    }, function (module) {
      StringUtil = module.StringUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4b650KvxiJHaq+BXF0QFgSd", "GameQueryConfig", undefined);

      /**
       * 获取和处理浏览器地址栏参数
       * @example
       * config.query.data.username
       */
      var GameQueryConfig = exports('GameQueryConfig', /*#__PURE__*/function () {
        /** 构造函数 */
        function GameQueryConfig() {
          this._data = null;
          if (!sys.isBrowser) {
            this._data = {};
            return;
          }
          this._data = this.parseUrl();
          if (!this._data["username"]) {
            this._data["username"] = StringUtil.guid();
          }
          log(this._data, "查询参数");
        }
        var _proto = GameQueryConfig.prototype;
        _proto.parseUrl = function parseUrl() {
          if (typeof window !== "object") return {};
          if (!window.document) return {};
          var url = window.document.location.href.toString();
          var u = url.split("?");
          if (typeof u[1] == "string") {
            u = u[1].split("&");
            var get = {};
            for (var i = 0, l = u.length; i < l; ++i) {
              var j = u[i];
              var x = j.indexOf("=");
              if (x < 0) {
                continue;
              }
              var key = j.substring(0, x);
              var value = j.substring(x + 1);
              get[decodeURIComponent(key)] = value && decodeURIComponent(value);
            }
            return get;
          } else {
            return {};
          }
        };
        _createClass(GameQueryConfig, [{
          key: "debug",
          get: /** 调试模式开关 */
          function get() {
            return this._data["debug"];
          }

          /** 玩家帐号名 */
        }, {
          key: "username",
          get: function get() {
            return this._data["username"];
          }

          /** 语言 */
        }, {
          key: "lang",
          get: function get() {
            return this._data["lang"] || "zh";
          }
        }, {
          key: "data",
          get: /** 浏览器地址栏原始参数 */
          function get() {
            return this._data;
          }
        }]);
        return GameQueryConfig;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, UITransform, view, math, screen, ResolutionPolicy, log, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      view = module.view;
      math = module.math;
      screen = module.screen;
      ResolutionPolicy = module.ResolutionPolicy;
      log = module.log;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "9461cd/dGNEGK5I5J24xY6L", "GUI", undefined);
      var ccclass = _decorator.ccclass;

      /** 游戏界面屏幕自适应管理 */
      var GUI = exports('GUI', (_dec = ccclass('GUI'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GUI, _Component);
        function GUI() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 是否为竖屏显示 */
          _this.portrait = void 0;
          /** 竖屏设计尺寸 */
          _this.portraitDrz = null;
          /** 横屏设计尺寸 */
          _this.landscapeDrz = null;
          /** 界面层矩形信息组件 */
          _this.transform = null;
          return _this;
        }
        var _proto = GUI.prototype;
        _proto.onLoad = function onLoad() {
          this.init();
        }

        /** 初始化引擎 */;
        _proto.init = function init() {
          this.transform = this.getComponent(UITransform);
          if (view.getDesignResolutionSize().width > view.getDesignResolutionSize().height) {
            this.landscapeDrz = view.getDesignResolutionSize();
            this.portraitDrz = new math.Size(this.landscapeDrz.height, this.landscapeDrz.width);
          } else {
            this.portraitDrz = view.getDesignResolutionSize();
            this.landscapeDrz = new math.Size(this.portraitDrz.height, this.portraitDrz.width);
          }
          this.resize();
        }

        /** 游戏画布尺寸变化 */;
        _proto.resize = function resize() {
          var dr;
          if (view.getDesignResolutionSize().width > view.getDesignResolutionSize().height) {
            dr = this.landscapeDrz;
          } else {
            dr = this.portraitDrz;
          }
          var s = screen.windowSize;
          var rw = s.width;
          var rh = s.height;
          var finalW = rw;
          var finalH = rh;
          if (rw / rh > dr.width / dr.height) {
            // 如果更长，则用定高
            finalH = dr.height;
            finalW = finalH * rw / rh;
            this.portrait = false;
          } else {
            // 如果更短，则用定宽
            finalW = dr.width;
            finalH = finalW * rh / rw;
            this.portrait = true;
          }

          // 通过设置设计分辨率和匹配模式来进行游戏画面的屏幕适配
          view.setDesignResolutionSize(finalW, finalH, ResolutionPolicy.UNKNOWN);
          this.transform.width = finalW;
          this.transform.height = finalH;
          log(dr, "设计尺寸");
          log(s, "屏幕尺寸");
        };
        return GUI;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Hope.ts", ['cc', './Config.ts'], function (exports) {
  var cclegacy, Config;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Config = module.Config;
    }],
    execute: function () {
      cclegacy._RF.push({}, "76f44zLaEFN87TTPvJKqHrO", "Hope", undefined);

      /** 框架版本号 */
      var version = exports('version', "1.2.0");

      /** 框架核心模块访问入口 */
      var hope = exports('hope', function hope() {});

      // 引入oops全局变量以方便调试
      /** ----------核心模块---------- */
      /** 日志管理 */
      // static log = Logger;
      /** 游戏配置 */
      hope.config = new Config();
      /** 本地存储 */
      hope.storage = void 0;
      /** 资源管理 */
      hope.res = void 0;
      /** 全局消息 */
      hope.message = void 0;
      /** 随机工具 */
      // static random = RandomManager.instance;
      /** 游戏时间管理 */
      hope.timer = void 0;
      /** 游戏音乐管理 */
      hope.audio = void 0;
      /** 二维界面管理 */
      hope.gui = void 0;
      {
        //@ts-ignore
        window.hope = hope;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Hot.ts", ['cc'], function (exports) {
  var cclegacy, log, sys, resources, error, native;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
      sys = module.sys;
      resources = module.resources;
      error = module.error;
      native = module.native;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3b339hX38ZE/IglKIg47pyj", "Hot", undefined);

      /** 热更参数 */
      var HotOptions = exports('HotOptions', /*#__PURE__*/function () {
        function HotOptions() {
          /** 获取到版本号信息 */
          this.onVersionInfo = null;
          /** 发现新版本，请更新 */
          this.onNeedToUpdate = null;
          /** 和远程版本一致，无须更新 */
          this.onNoNeedToUpdate = null;
          /** 更新失败 */
          this.onUpdateFailed = null;
          /** 更新完成 */
          this.onUpdateSucceed = null;
          /** 更新进度 */
          this.onUpdateProgress = null;
        }
        var _proto = HotOptions.prototype;
        _proto.check = function check() {
          for (var key in this) {
            if (key !== 'check') {
              if (!this[key]) {
                log("\u53C2\u6570HotOptions." + key + "\u672A\u8BBE\u7F6E\uFF01");
                return false;
              }
            }
          }
          return true;
        };
        return HotOptions;
      }());

      /** 热更管理 */
      var Hot = exports('Hot', /*#__PURE__*/function () {
        function Hot() {
          this.assetsMgr = null;
          this.options = null;
          this.state = Hot.State.None;
          this.storagePath = "";
          this.manifest = "";
        }
        var _proto2 = Hot.prototype;
        /** 热更初始化 */
        _proto2.init = function init(opt) {
          var _this = this;
          if (!sys.isNative) {
            return;
          }
          if (!opt.check()) {
            return;
          }
          this.options = opt;
          if (this.assetsMgr) {
            return;
          }
          resources.load('project', function (err, res) {
            if (err) {
              error("【热更新界面】缺少热更新配置文件");
              return;
            }
            _this.showSearchPath();
            _this.manifest = res.nativeUrl;
            _this.storagePath = native.fileUtils.getWritablePath() + "hope_framework_remote";
            _this.assetsMgr = new native.AssetsManager(_this.manifest, _this.storagePath, function (versionA, versionB) {
              var _this$options;
              console.log("【热更新】客户端版本: " + versionA + ', 当前最新版本: ' + versionB);
              ((_this$options = _this.options) == null ? void 0 : _this$options.onVersionInfo) && _this.options.onVersionInfo({
                local: versionA,
                server: versionB
              });
              var vA = versionA.split('.');
              var vB = versionB.split('.');
              for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || '0');
                if (a !== b) {
                  return a - b;
                }
              }
              if (vB.length > vA.length) {
                return -1;
              } else {
                return 0;
              }
            });

            // 设置验证回调，如果验证通过，则返回true，否则返回false
            _this.assetsMgr.setVerifyCallback(function (path, asset) {
              // 压缩资源时，我们不需要检查其md5，因为zip文件已被删除
              var compressed = asset.compressed;
              // 检索正确的md5值
              var expectedMD5 = asset.md5;
              // 资源路径是相对路径，路径是绝对路径
              var relativePath = asset.path;
              // 资源文件的大小，但此值可能不存在
              var size = asset.size;
              return true;
            });
            var localManifest = _this.assetsMgr.getLocalManifest();
            console.log('【热更新】热更资源存放路径: ' + _this.storagePath);
            console.log('【热更新】本地资源配置路径: ' + _this.manifest);
            console.log('【热更新】本地包地址: ' + localManifest.getPackageUrl());
            console.log('【热更新】远程 project.manifest 地址: ' + localManifest.getManifestFileUrl());
            console.log('【热更新】远程 version.manifest 地址: ' + localManifest.getVersionFileUrl());
            _this.checkUpdate();
          });
        }

        /** 删除热更所有存储文件 */;
        _proto2.clearHotUpdateStorage = function clearHotUpdateStorage() {
          native.fileUtils.removeDirectory(this.storagePath);
        }

        // 检查更新
        ;

        _proto2.checkUpdate = function checkUpdate() {
          if (!this.assetsMgr) {
            console.log('【热更新】请先初始化');
            return;
          }
          if (this.assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            error('【热更新】未初始化');
            return;
          }
          if (!this.assetsMgr.getLocalManifest().isLoaded()) {
            console.log('【热更新】加载本地 manifest 失败 ...');
            return;
          }
          this.assetsMgr.setEventCallback(this.onHotUpdateCallBack.bind(this));
          this.state = Hot.State.Check;
          // 下载version.manifest，进行版本比对
          this.assetsMgr.checkUpdate();
        }

        /** 开始更热 */;
        _proto2.hotUpdate = function hotUpdate() {
          if (!this.assetsMgr) {
            console.log('【热更新】请先初始化');
            return;
          }
          this.assetsMgr.setEventCallback(this.onHotUpdateCallBack.bind(this));
          this.state = Hot.State.Update;
          this.assetsMgr.update();
        };
        _proto2.onHotUpdateCallBack = function onHotUpdateCallBack(event) {
          var _this$options2, _this$options3;
          var code = event.getEventCode();
          switch (code) {
            case native.EventAssetsManager.ALREADY_UP_TO_DATE:
              console.log("【热更新】当前版本与远程版本一致且无须更新");
              ((_this$options2 = this.options) == null ? void 0 : _this$options2.onNoNeedToUpdate) && this.options.onNoNeedToUpdate(code);
              break;
            case native.EventAssetsManager.NEW_VERSION_FOUND:
              console.log('【热更新】发现新版本,请更新');
              ((_this$options3 = this.options) == null ? void 0 : _this$options3.onNeedToUpdate) && this.options.onNeedToUpdate(code, this.assetsMgr.getTotalBytes());
              break;
            case native.EventAssetsManager.ASSET_UPDATED:
              console.log('【热更新】资产更新');
              break;
            case native.EventAssetsManager.UPDATE_PROGRESSION:
              if (this.state === Hot.State.Update) {
                var _this$options4;
                // event.getPercent();
                // event.getPercentByFile();
                // event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                // event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
                console.log('【热更新】更新中...', event.getDownloadedFiles(), event.getTotalFiles(), event.getPercent());
                ((_this$options4 = this.options) == null ? void 0 : _this$options4.onUpdateProgress) && this.options.onUpdateProgress(event);
              }
              break;
            case native.EventAssetsManager.UPDATE_FINISHED:
              this.onUpdateFinished();
              break;
            default:
              this.onUpdateFailed(code);
              break;
          }
        };
        _proto2.onUpdateFailed = function onUpdateFailed(code) {
          var _this$options5;
          this.assetsMgr.setEventCallback(null);
          ((_this$options5 = this.options) == null ? void 0 : _this$options5.onUpdateFailed) && this.options.onUpdateFailed(code);
        };
        _proto2.onUpdateFinished = function onUpdateFinished() {
          var _this$options6;
          this.assetsMgr.setEventCallback(null);
          var searchPaths = native.fileUtils.getSearchPaths();
          var newPaths = this.assetsMgr.getLocalManifest().getSearchPaths();
          Array.prototype.unshift.apply(searchPaths, newPaths);
          localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
          native.fileUtils.setSearchPaths(searchPaths);
          console.log('【热更新】更新成功');
          ((_this$options6 = this.options) == null ? void 0 : _this$options6.onUpdateSucceed) && this.options.onUpdateSucceed();
        };
        _proto2.showSearchPath = function showSearchPath() {
          console.log("========================搜索路径========================");
          var searchPaths = native.fileUtils.getSearchPaths();
          for (var i = 0; i < searchPaths.length; i++) {
            console.log("[" + i + "]: " + searchPaths[i]);
          }
          console.log("======================================================");
        };
        return Hot;
      }());
      Hot.State = {
        None: 0,
        Check: 1,
        Update: 2
      };
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HotUpdate.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hot.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ProgressBar, Label, sys, game, warn, director, Component, Hot, HotOptions;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ProgressBar = module.ProgressBar;
      Label = module.Label;
      sys = module.sys;
      game = module.game;
      warn = module.warn;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      Hot = module.Hot;
      HotOptions = module.HotOptions;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "24f51jBC45K+p+Y7VhdL0zg", "HotUpdate", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /** 热更新界面控制脚本 */
      var HotUpdate = exports('HotUpdate', (_dec = ccclass('HotUpdate'), _dec2 = property(ProgressBar), _dec3 = property(Label), _dec4 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HotUpdate, _Component);
        function HotUpdate() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 热更新业务管理对象 */
          _this.hot = new Hot();
          _initializerDefineProperty(_this, "progress", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labProgress", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labText", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = HotUpdate.prototype;
        _proto.onLoad = function onLoad() {
          if (sys.isNative) {
            this.labText.string = '检查更新中';
            this.startHotUpdate();
          } else {
            this.startGame();
          }
        }

        /** 开始热更新 */;
        _proto.startHotUpdate = function startHotUpdate() {
          var _this2 = this;
          var options = new HotOptions();
          options.onVersionInfo = function (data) {
            console.log("\u3010\u70ED\u66F4\u65B0\u754C\u9762\u3011\u672C\u5730\u7248\u672C:" + data.local + ",\u8FDC\u7A0B\u7248\u672C:" + data.server);
          };
          options.onUpdateProgress = function (event) {
            // 进度提示字
            var pc = event.getPercent();
            var _total = event.getTotalBytes();
            var _have = event.getDownloadedBytes();
            var total, have;
            if (_total < 1048576) {
              // 小于1m，就显示kb
              _total = Math.ceil(_total / 1024);
              total = _total + 'K';
            } else {
              // 显示m
              total = (_total / (1024 * 1024)).toFixed(1);
              total = total + 'M';
            }
            if (_have < 1048576) {
              // 小于1m，就显示kb
              _have = Math.ceil(_have / 1024);
              have = _have + 'K';
            } else {
              // 显示m
              have = (_have / (1024 * 1024)).toFixed(1);
              have = have + 'M';
            }
            if (total == '0K') {
              _this2.labText.string = '检查更新中';
            } else {
              _this2.labText.string = "\u66F4\u65B0\u4E2D\uFF1A " + have + " /" + total + "  ( " + parseInt(pc * 100 + "") + "  %)";
            }

            // 进度条
            if (!isNaN(event.getPercent())) {
              // this.lv.data.finished = event.getDownloadedFiles();
              // this.lv.data.total = event.getTotalFiles();
              _this2.progress.progress = event.getPercent();
            }
          };
          options.onNeedToUpdate = function (data, totalBytes) {
            _this2.labText.string = "发现新版本资源";
            var total = "";
            if (totalBytes < 1048576) {
              // 小于1m，就显示kb
              // totalBytes = Math.ceil(totalBytes / 1024);
              // total = total + 'KB';
              total = Math.ceil(totalBytes / 1024) + 'KB';
            } else {
              total = (totalBytes / (1024 * 1024)).toFixed(1);
              total = total + 'MB';
            }

            // 提示更新
            _this2.checkForceUpdate(function () {
              // 非 WIFI 环境提示玩家
              _this2.showUpdateDialog(total, function () {
                _this2.hot.hotUpdate();
              });
            });
          };
          options.onNoNeedToUpdate = function () {
            _this2.labText.string = "不需要更新";
            // this.lv.enter();
            _this2.startGame();
          };
          options.onUpdateFailed = function () {
            _this2.labText.string = "更新失败";
            _this2.hot.checkUpdate();
          };
          options.onUpdateSucceed = function () {
            // this.lv.data.progress = 100;
            _this2.progress.progress = 1;
            _this2.labText.string = "更新成功";
            setTimeout(function () {
              game.restart();
            }, 1000);
          };
          this.hot.init(options);
        }

        /** 检查是否强制更新信息 */;
        _proto.checkForceUpdate = function checkForceUpdate(callback) {
          var _this3 = this;
          var operate = {
            title: '系统提示',
            content: "当前版本过旧，需要下载新的安装包才能进行游戏，是否更新？",
            okWord: '确定',
            cancelWord: '取消',
            okFunc: function okFunc() {
              // 这里每次要clean？？
              _this3.hot.clearHotUpdateStorage();
              callback();
            },
            cancelFunc: function cancelFunc() {
              game.end();
            },
            needCancel: true
          };
          // oops.gui.open(UIID.Window, operate);
          warn(operate);
          callback();
        }

        /** 非 WIFI 环境提示玩家 */;
        _proto.showUpdateDialog = function showUpdateDialog(size, callback) {
          if (sys.getNetworkType() == sys.NetworkType.LAN) {
            callback();
            return;
          }
          // tips.alert(oops.language.getLangByID("update_nowifi_tip") + size, callback);
        };

        _proto.startGame = function startGame() {
          director.loadScene('root_game');
        };
        return HotUpdate;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progress", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labProgress", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labText", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanGetModel.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "db968dB7yBFj4+3Sfv+vimf", "ICanGetModel", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanGetSystem.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "141ddBnNEVLVbKtZGWI94O4", "ICanGetSystem", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanRegisterEvent.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a1b17kRm/5J4J8xEXSpkUqL", "ICanRegisterEvent", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanSendCommand.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3c806GBdvBDBLwv3UesXbr6", "ICanSendCommand", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanSendEvent.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "95776UDcYBGA4KdQsQHNDKd", "ICanSendEvent", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanSetArchitecture.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e07e9HDyolIor0GIM6jzyo6", "ICanSetArchitecture", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICommand.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c6eb0NpjnhI0LZZzICuqs2v", "ICommand", undefined);
      var AbstractCommand = exports('AbstractCommand', /*#__PURE__*/function () {
        function AbstractCommand() {
          this.mArchitecture = null;
        }
        var _proto = AbstractCommand.prototype;
        _proto.Execute = /*#__PURE__*/function () {
          var _Execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.OnExecute();
                case 2:
                  return _context.abrupt("return", _context.sent);
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function Execute() {
            return _Execute.apply(this, arguments);
          }
          return Execute;
        }();
        _proto.SetArchitecture = function SetArchitecture(architecture) {
          this.mArchitecture = architecture;
        };
        _proto.GetModel = function GetModel(type) {
          return this.mArchitecture.GetModel(type);
        };
        _proto.SendEvent = function SendEvent(eventType, e) {
          if (e === void 0) {
            e = null;
          }
          return this.mArchitecture.SendEvent(eventType, e);
        };
        _proto.SendCommand = function SendCommand(command) {
          return this.mArchitecture.SendCommand(command);
        };
        return AbstractCommand;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IController.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4b308au9Q5GOLLOrt1/aWrA", "IController", undefined);
      var AbstractController = exports('AbstractController', /*#__PURE__*/function () {
        function AbstractController() {}
        var _proto = AbstractController.prototype;
        _proto.GetModel = function GetModel(type) {
          return this.GetArchitecture().GetModel(type);
        }

        // public GetSystem<T extends ISystem>(type: { prototype: T }): T {
        //     return this.GetArchitecture().GetSystem<T>(type);
        // }
        ;

        _proto.SendCommand = function SendCommand(command) {
          return this.GetArchitecture().SendCommand(command);
        }

        // public DoQuery<D, T extends IQuery<D>>(query: T): D {
        //     return this.GetArchitecture().DoQuery(query);
        // }
        ;

        _proto.SendEvent = function SendEvent(eventType, e) {
          return this.GetArchitecture().SendEvent(eventType, e);
        };
        _proto.RegisterEvent = function RegisterEvent(eventType, onEvent, target) {
          return this.GetArchitecture().RegisterEvent(eventType, onEvent, target);
        };
        _proto.UnRegisterEvent = function UnRegisterEvent(eventType, onEvent, target) {
          this.GetArchitecture().UnRegisterEvent(eventType, onEvent, target);
        };
        _proto.UnRegisterEventByTarget = function UnRegisterEventByTarget(target) {
          this.GetArchitecture().UnRegisterEventByTarget(target);
        };
        return AbstractController;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ImageUtil.ts", ['cc'], function (exports) {
  var cclegacy, Color, Texture2D;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Texture2D = module.Texture2D;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c5280CLHlBCjaF87hlKsCaS", "ImageUtil", undefined);

      /**
       * 图像工具
       */
      var ImageUtil = exports('ImageUtil', /*#__PURE__*/function () {
        function ImageUtil() {}
        /**
         * 获取纹理中指定像素的颜色，原点为左上角，从像素 (1, 1) 开始。
         * @param texture 纹理
         * @param x x 坐标
         * @param y y 坐标
         * @example
        // 获取纹理左上角第一个像素的颜色
        const color = ImageUtil.getPixelColor(texture, 1, 1);
        cc.color(50, 100, 123, 255);
         */
        ImageUtil.getPixelColor = function getPixelColor(texture, x, y) {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = texture.width;
          canvas.height = texture.height;
          var image = texture.getHtmlElementObj();
          ctx.drawImage(image, 0, 0, texture.width, texture.height);
          var imageData = ctx.getImageData(0, 0, texture.width, texture.height);
          var pixelIndex = (y - 1) * texture.width * 4 + (x - 1) * 4;
          var pixelData = imageData.data.slice(pixelIndex, pixelIndex + 4);
          var color = new Color(pixelData[0], pixelData[1], pixelData[2], pixelData[3]);
          image.remove();
          canvas.remove();
          return color;
        }

        /**
         * 将图像转为 Base64 字符（仅 png、jpg 或 jpeg 格式资源）（有问题）
         * @param url 图像地址
         * @param callback 完成回调
         */;
        ImageUtil.imageToBase64 = function imageToBase64(url, callback) {
          return new Promise(function (res) {
            var _exec;
            var extname = (_exec = /\.png|\.jpg|\.jpeg/.exec(url)) == null ? void 0 : _exec[0];
            //@ts-ignore
            if (['.png', '.jpg', '.jpeg'].includes(extname)) {
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              var image = new Image();
              image.src = url;
              image.onload = function () {
                canvas.height = image.height;
                canvas.width = image.width;
                ctx.drawImage(image, 0, 0);
                extname = extname === '.jpg' ? 'jpeg' : extname.replace('.', '');
                var dataURL = canvas.toDataURL("image/" + extname);
                callback && callback(dataURL);
                res(dataURL);
                image.remove();
                canvas.remove();
              };
            } else {
              console.warn('Not a jpg/jpeg or png resource!');
              callback && callback("");
              res("");
            }
          });
        }

        /**
         * 将 Base64 字符转为 cc.Texture2D 资源（有问题）
         * @param base64 Base64 字符
         */;
        ImageUtil.base64ToTexture = function base64ToTexture(base64) {
          var image = document.createElement('img');
          image.src = base64;
          var texture = new Texture2D();
          //@ts-ignore
          texture.initWithElement(image);
          image.remove();
          return texture;
        }

        /**
         * 将 Base64 字符转为二进制数据（有问题）
         * @param base64 Base64 字符
         */;
        ImageUtil.base64ToBlob = function base64ToBlob(base64) {
          var strings = base64.split(',');
          //@ts-ignore
          var type = /image\/\w+|;/.exec(strings[0])[0];
          var data = window.atob(strings[1]);
          var arrayBuffer = new ArrayBuffer(data.length);
          var uint8Array = new Uint8Array(arrayBuffer);
          for (var i = 0; i < data.length; i++) {
            uint8Array[i] = data.charCodeAt(i) & 0xff;
          }
          return new Blob([uint8Array], {
            type: type
          });
        };
        return ImageUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IModel.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "043c54vUm5M35xayS1HNc8m", "IModel", undefined);
      var AbstractModel = exports('AbstractModel', /*#__PURE__*/function () {
        function AbstractModel() {
          this.mArchitecture = null;
        }
        var _proto = AbstractModel.prototype;
        _proto.SetArchitecture = function SetArchitecture(architecture) {
          this.mArchitecture = architecture;
        };
        _proto.GetModel = function GetModel(type) {
          return this.mArchitecture.GetModel(type);
        }

        // public GetUtility<T extends IUtility>(type: { prototype: T }): T {
        //     return this.mArchitecture.GetUtility<T>(type);
        // }
        ;

        _proto.SendEvent = function SendEvent(eventType, e) {
          this.mArchitecture.SendEvent(eventType, e);
        };
        _proto.Init = function Init() {
          this.OnInit();
        };
        return AbstractModel;
      }());

      // 自定义装饰器，用于记录类名
      var ModelDecorator = exports('ModelDecorator', function ModelDecorator(name) {
        return function (constructor) {
          constructor.prototype.__className = name;
          constructor.prototype.__classType = constructor;
        };
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IOCContainer.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "203dagkn+ZHnLZ5c3HAUCJN", "IOCContainer", undefined);
      var IOCContainer = exports('IOCContainer', /*#__PURE__*/function () {
        function IOCContainer() {
          this.m = new Map();
        }
        var _proto = IOCContainer.prototype;
        _proto.Register = function Register(key, instance) {
          this.m.set(key, instance);
        };
        _proto.Get = function Get(key) {
          // let className = type.prototype.constructor.__className;
          if (!this.m.has(key)) {
            console.error('IOCContainer err, get instance fail with ' + key);
            return null;
          }
          return this.m.get(key);
        };
        return IOCContainer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ISystem.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b242a+okRRC3ZfKIhPvmoWP", "ISystem", undefined);
      var AbstractSystem = exports('AbstractSystem', /*#__PURE__*/function () {
        function AbstractSystem() {
          this.mArchitecture = null;
        }
        var _proto = AbstractSystem.prototype;
        _proto.SetArchitecture = function SetArchitecture(architecture) {
          this.mArchitecture = architecture;
        };
        _proto.GetModel = function GetModel(type) {
          var _this$mArchitecture;
          return (_this$mArchitecture = this.mArchitecture) == null ? void 0 : _this$mArchitecture.GetModel(type);
        };
        _proto.GetSystem = function GetSystem(type) {
          return this.mArchitecture.GetSystem(type);
        };
        _proto.RegisterEvent = function RegisterEvent(eventType, onEvent, target) {
          return this.mArchitecture.RegisterEvent(eventType, onEvent, target);
        };
        _proto.UnRegisterEvent = function UnRegisterEvent(eventType, onEvent, target) {
          this.mArchitecture.UnRegisterEvent(eventType, onEvent, target);
        };
        _proto.SendEvent = function SendEvent(eventType, e) {
          this.mArchitecture.SendEvent(eventType, e);
        };
        _proto.SendCommand = function SendCommand(command) {
          this.mArchitecture.SendCommand(command);
        }

        // public Init(): void {
        //     this.OnInit();
        // }
        ;

        _proto.Update = function Update() {
          this.OnUpdate();
        }

        // protected abstract OnInit(): void;
        ;

        return AbstractSystem;
      }());

      // 自定义装饰器，用于记录类名
      var SystemDecorator = exports('SystemDecorator', function SystemDecorator(name) {
        return function (constructor) {
          constructor.prototype.__className = name;
          constructor.prototype.__classType = constructor;
        };
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JsonUtil.ts", ['cc', './ResLoader.ts'], function (exports) {
  var cclegacy, JsonAsset, resLoader;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      JsonAsset = module.JsonAsset;
    }, function (module) {
      resLoader = module.resLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "86901aQAjtEgoY3jWlFIlef", "JsonUtil", undefined);

      /** 资源路径 */
      var path = "config/game/";

      /** 数据缓存 */
      var data = new Map();

      /** JSON数据表工具 */
      var JsonUtil = exports('JsonUtil', /*#__PURE__*/function () {
        function JsonUtil() {}
        /**
         * 通知资源名从缓存中获取一个Json数据表
         * @param name  资源名
         */
        JsonUtil.get = function get(name) {
          if (data.has(name)) return data.get(name);
        }

        /**
         * 通知资源名加载Json数据表
         * @param name      资源名
         * @param callback  资源加载完成回调
         */;
        JsonUtil.load = function load(name, callback) {
          if (data.has(name)) callback(data.get(name));else {
            var url = path + name;
            resLoader.load(url, JsonAsset, function (err, content) {
              if (err) {
                console.warn(err.message);
                callback(null);
              } else {
                data.set(name, content.json);
                callback(content.json);
              }
            });
          }
        }

        /**
         * 异步加载Json数据表
         * @param name 资源名
         */;
        JsonUtil.loadAsync = function loadAsync(name) {
          return new Promise(function (resolve, reject) {
            if (data.has(name)) {
              resolve(data.get(name));
            } else {
              var url = path + name;
              resLoader.load(url, JsonAsset, function (err, content) {
                if (err) {
                  console.warn(err.message);
                  resolve(null);
                } else {
                  data.set(name, content.json);
                  resolve(content.json);
                }
              });
            }
          });
        }

        /**
         * 通过指定资源名释放资源
         * @param name 资源名
         */;
        JsonUtil.release = function release(name) {
          var url = path + name;
          data["delete"](name);
          resLoader.release(url);
        };
        return JsonUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Defines.ts', './LayerPopup.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ViewParams, LayerPopUp;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ViewParams = module.ViewParams;
    }, function (module) {
      LayerPopUp = module.LayerPopUp;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dcad5w8wHlEDJpIKJ4gUxEP", "LayerDialog", undefined);

      /** 模式弹窗数据 */

      /*
       * 模式弹窗层，该层的窗口同时只能显示一个，删除以后会自动从队列当中取一个弹窗，直到队列为空
       */
      var LayerDialog = exports('LayerDialog', /*#__PURE__*/function (_LayerPopUp) {
        _inheritsLoose(LayerDialog, _LayerPopUp);
        function LayerDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _LayerPopUp.call.apply(_LayerPopUp, [this].concat(args)) || this;
          /** 窗口调用参数队列 */
          _this.params = [];
          return _this;
        }
        var _proto = LayerDialog.prototype;
        _proto.add = function add(config, params, callbacks) {
          // 控制同一时间只能显示一个模式窗口
          if (this.ui_nodes.size > 0) {
            this.params.push({
              config: config,
              params: params,
              callbacks: callbacks
            });
            return;
          }
          this.black.enabled = true;
          this.show(config, params, callbacks);
        }

        /** 显示模式弹窗 */;
        _proto.show = function show(config, params, callbacks) {
          var vp = this.ui_cache.get(config.prefab);
          if (vp == null) {
            vp = new ViewParams();
            vp.valid = true;
            vp.config = config;
          }
          vp.params = params || {};
          vp.callbacks = callbacks != null ? callbacks : {};
          this.ui_nodes.set(vp.config.prefab, vp);
          this.load(vp, config.bundle);
          return config.prefab;
        };
        _proto.onCloseWindow = function onCloseWindow(vp) {
          _LayerPopUp.prototype.onCloseWindow.call(this, vp);
          setTimeout(this.next.bind(this), 0);
        };
        _proto.setBlackDisable = function setBlackDisable() {
          if (this.params.length == 0) {
            this.black.enabled = false;
            this.closeVacancyRemove();
            this.closeMask();
          }
        };
        _proto.next = function next() {
          if (this.params.length > 0) {
            var param = this.params.shift();
            this.show(param.config, param.params, param.callbacks);
          }
        };
        return LayerDialog;
      }(LayerPopUp));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GUI.ts', './DelegateComponent.ts', './LayerDialog.ts', './LayerNotify.ts', './LayerPopup.ts', './LayerUI.ts', './UIMap.ts', './TipsManager.ts'], function (exports) {
  var _asyncToGenerator, _createClass, _regeneratorRuntime, cclegacy, warn, Node, Layers, Widget, Camera, GUI, DelegateComponent, LayerDialog, LayerNotify, LayerPopUp, LayerUI, UIMap, TipsManager;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _createClass = module.createClass;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
      Node = module.Node;
      Layers = module.Layers;
      Widget = module.Widget;
      Camera = module.Camera;
    }, function (module) {
      GUI = module.GUI;
    }, function (module) {
      DelegateComponent = module.DelegateComponent;
    }, function (module) {
      LayerDialog = module.LayerDialog;
    }, function (module) {
      LayerNotify = module.LayerNotify;
    }, function (module) {
      LayerPopUp = module.LayerPopUp;
    }, function (module) {
      LayerUI = module.LayerUI;
    }, function (module) {
      UIMap = module.UIMap;
    }, function (module) {
      TipsManager = module.TipsManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7ba675xFGdHqIOykTysNzEu", "LayerManager", undefined);

      /** 界面层类型 */
      var LayerType = exports('LayerType', /*#__PURE__*/function (LayerType) {
        LayerType["Game"] = "LayerGame";
        LayerType["UI"] = "LayerUI";
        LayerType["PopUp"] = "LayerPopUp";
        LayerType["Dialog"] = "LayerDialog";
        LayerType["System"] = "LayerSystem";
        LayerType["Notify"] = "LayerNotify";
        LayerType["Guide"] = "LayerGuide";
        return LayerType;
      }({}));

      /**
       * 界面配置结构体
       * @example
       // 界面唯一标识
       export enum UIID {
       Loading = 1,
       Window,
       Netinstable
       }
         // 打开界面方式的配置数据
       export var UIConfigData: { [key: number]: UIConfig } = {
       [UIID.Loading]: { layer: LayerType.UI, prefab: "loading/prefab/loading", bundle: "resources" },
       [UIID.Netinstable]: { layer: LayerType.PopUp, prefab: "common/prefab/netinstable" },
       [UIID.Window]: { layer: LayerType.Dialog, prefab: "common/prefab/window" }
       }
       */

      /** 界面层级管理器 */
      var LayerManager = exports('LayerManager', /*#__PURE__*/function () {
        var _proto = LayerManager.prototype;
        /**
         * 初始化所有UI的配置对象
         * @param configs 配置对象
         */
        _proto.init = function init(configs) {
          this.configs = configs;
        }

        /**
         * 渐隐飘过提示
         * @param content 文本表示
         * @param useI18n 是否使用多语言
         * @example
         * oops.gui.toast("提示内容");
         */;
        _proto.toast = function toast(content, useI18n) {
          if (useI18n === void 0) {
            useI18n = false;
          }
          this.notify.toast(content, useI18n);
        }

        /** 打开等待提示 */;
        _proto.waitOpen = function waitOpen() {
          this.notify.waitOpen();
        }

        /** 关闭等待提示 */;
        _proto.waitClose = function waitClose() {
          this.notify.waitClose();
        }

        /**
         * 设置界面配置
         * @param uiId   要设置的界面id
         * @param config 要设置的配置
         */;
        _proto.setConfig = function setConfig(uiId, config) {
          this.configs[uiId] = config;
        }

        /**
         * 设置界面地图配置
         * @param data 界面地图数据
         */;
        _proto.setUIMap = function setUIMap(data) {
          if (this.uiMap == null) {
            this.uiMap = new UIMap();
          }
          this.uiMap.init(this, data);
        }

        /**
         * 同步打开一个窗口
         * @param uiId          窗口唯一编号
         * @param uiArgs        窗口参数
         * @param callbacks     回调对象
         * @example
         var uic: UICallbacks = {
         onAdded: (node: Node, params: any) => {
         var comp = node.getComponent(LoadingViewComp) as ecs.Comp;
         }
         onRemoved:(node: Node | null, params: any) => {
           }
         };
         oops.gui.open(UIID.Loading, null, uic);
         */;
        _proto.open = function open(uiId, uiArgs, callbacks) {
          if (uiArgs === void 0) {
            uiArgs = null;
          }
          var config = this.configs[uiId];
          if (config == null) {
            warn("\u6253\u5F00\u7F16\u53F7\u4E3A\u3010" + uiId + "\u3011\u7684\u754C\u9762\u5931\u8D25\uFF0C\u914D\u7F6E\u4FE1\u606F\u4E0D\u5B58\u5728");
            return;
          }
          switch (config.layer) {
            case LayerType.UI:
              this.ui.add(config, uiArgs, callbacks);
              break;
            case LayerType.PopUp:
              this.popup.add(config, uiArgs, callbacks);
              break;
            case LayerType.Dialog:
              this.dialog.add(config, uiArgs, callbacks);
              break;
            case LayerType.System:
              this.system.add(config, uiArgs, callbacks);
              break;
          }
        }

        /**
         * 异步打开一个窗口
         * @param uiId          窗口唯一编号
         * @param uiArgs        窗口参数
         * @example
         * var node = await oops.gui.openAsync(UIID.Loading);
         */;
        _proto.openAsync = /*#__PURE__*/
        function () {
          var _openAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(uiId, uiArgs) {
            var _this = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (uiArgs === void 0) {
                    uiArgs = null;
                  }
                  return _context.abrupt("return", new Promise(function (resolve, reject) {
                    var callbacks = {
                      onAdded: function onAdded(node, params) {
                        resolve(node);
                      },
                      onLoadFailure: function onLoadFailure() {
                        resolve(null);
                      }
                    };
                    _this.open(uiId, uiArgs, callbacks);
                  }));
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function openAsync(_x, _x2) {
            return _openAsync.apply(this, arguments);
          }
          return openAsync;
        }()
        /**
         * 场景替换
         * @param removeUiId  移除场景编号
         * @param openUiId    新打开场景编号
         * @param uiArgs      新打开场景参数
         */;

        _proto.replace = function replace(removeUiId, openUiId, uiArgs) {
          if (uiArgs === void 0) {
            uiArgs = null;
          }
          this.open(openUiId, uiArgs);
          this.remove(removeUiId);
        }

        /**
         * 异步场景替换
         * @param removeUiId  移除场景编号
         * @param openUiId    新打开场景编号
         * @param uiArgs      新打开场景参数
         */;
        _proto.replaceAsync = function replaceAsync(removeUiId, openUiId, uiArgs) {
          var _this2 = this;
          if (uiArgs === void 0) {
            uiArgs = null;
          }
          return new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
            var node;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this2.openAsync(openUiId, uiArgs);
                case 2:
                  node = _context2.sent;
                  _this2.remove(removeUiId);
                  resolve(node);
                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          })));
        }

        /**
         * 缓存中是否存在指定标识的窗口
         * @param uiId 窗口唯一标识
         * @example
         * oops.gui.has(UIID.Loading);
         */;
        _proto.has = function has(uiId) {
          var config = this.configs[uiId];
          if (config == null) {
            warn("\u7F16\u53F7\u4E3A\u3010" + uiId + "\u3011\u7684\u754C\u9762\u914D\u7F6E\u4E0D\u5B58\u5728\uFF0C\u914D\u7F6E\u4FE1\u606F\u4E0D\u5B58\u5728");
            return false;
          }
          var result = false;
          switch (config.layer) {
            case LayerType.UI:
              result = this.ui.has(config.prefab);
              break;
            case LayerType.PopUp:
              result = this.popup.has(config.prefab);
              break;
            case LayerType.Dialog:
              result = this.dialog.has(config.prefab);
              break;
            case LayerType.System:
              result = this.system.has(config.prefab);
              break;
          }
          return result;
        }

        /**
         * 缓存中是否存在指定标识的窗口
         * @param uiId 窗口唯一标识
         * @example
         * oops.gui.has(UIID.Loading);
         */;
        _proto.get = function get(uiId) {
          var config = this.configs[uiId];
          if (config == null) {
            warn("\u7F16\u53F7\u4E3A\u3010" + uiId + "\u3011\u7684\u754C\u9762\u914D\u7F6E\u4E0D\u5B58\u5728\uFF0C\u914D\u7F6E\u4FE1\u606F\u4E0D\u5B58\u5728");
            return null;
          }
          var result = null;
          switch (config.layer) {
            case LayerType.UI:
              result = this.ui.get(config.prefab);
              break;
            case LayerType.PopUp:
              result = this.popup.get(config.prefab);
              break;
            case LayerType.Dialog:
              result = this.dialog.get(config.prefab);
              break;
            case LayerType.System:
              result = this.system.get(config.prefab);
              break;
          }
          return result;
        }

        /**
         * 移除指定标识的窗口
         * @param uiId         窗口唯一标识
         * @param isDestroy    移除后是否释放
         * @example
         * oops.gui.remove(UIID.Loading);
         */;
        _proto.remove = function remove(uiId, isDestroy) {
          var config = this.configs[uiId];
          if (config == null) {
            warn("\u5220\u9664\u7F16\u53F7\u4E3A\u3010" + uiId + "\u3011\u7684\u754C\u9762\u5931\u8D25\uFF0C\u914D\u7F6E\u4FE1\u606F\u4E0D\u5B58\u5728");
            return;
          }
          switch (config.layer) {
            case LayerType.UI:
              this.ui.remove(config.prefab, isDestroy);
              break;
            case LayerType.PopUp:
              this.popup.remove(config.prefab, isDestroy);
              break;
            case LayerType.Dialog:
              this.dialog.remove(config.prefab, isDestroy);
              break;
            case LayerType.System:
              this.system.remove(config.prefab, isDestroy);
              break;
          }
        }

        /**
         * 删除一个通过this框架添加进来的节点
         * @param node          窗口节点
         * @param isDestroy     移除后是否释放资源
         * @example
         * oops.gui.removeByNode(cc.Node);
         */;
        _proto.removeByNode = function removeByNode(node, isDestroy) {
          if (node instanceof Node) {
            var comp = node.getComponent(DelegateComponent);
            if (comp && comp.vp) {
              // 释放显示的界面
              if (node.parent) {
                node.parent.remove(comp.vp.config.prefab, isDestroy);
              }
              // 释放缓存中的界面
              else if (isDestroy) {
                switch (comp.vp.config.layer) {
                  case LayerType.UI:
                    // @ts-ignore 注：不对外使用
                    this.ui.removeCache(comp.vp.config.prefab);
                    break;
                  case LayerType.PopUp:
                    // @ts-ignore 注：不对外使用
                    this.popup.removeCache(comp.vp.config.prefab);
                    break;
                  case LayerType.Dialog:
                    // @ts-ignore 注：不对外使用
                    this.dialog.removeCache(comp.vp.config.prefab);
                    break;
                  case LayerType.System:
                    // @ts-ignore 注：不对外使用
                    this.system.removeCache(comp.vp.config.prefab);
                    break;
                }
              }
            } else {
              warn("\u5F53\u524D\u5220\u9664\u7684node\u4E0D\u662F\u901A\u8FC7\u754C\u9762\u7BA1\u7406\u5668\u6DFB\u52A0\u5230\u821E\u53F0\u4E0A");
              node.destroy();
            }
          }
        }

        /**
         * 清除所有窗口
         * @param isDestroy 移除后是否释放
         * @example
         * oops.gui.clear();
         */;
        _proto.clear = function clear(isDestroy) {
          if (isDestroy === void 0) {
            isDestroy = false;
          }
          this.ui.clear(isDestroy);
          this.popup.clear(isDestroy);
          this.dialog.clear(isDestroy);
          this.system.clear(isDestroy);
        }

        /**
         * 构造函数
         * @param root  界面根节点
         */;
        function LayerManager(root) {
          /** 界面根节点 */
          this.root = void 0;
          /** 界面摄像机 */
          this.camera = void 0;
          /** 游戏界面特效层 */
          this.game = void 0;
          /** 新手引导层 */
          this.guide = void 0;
          /** 界面地图 */
          this.uiMap = void 0;
          /** 界面层 */
          this.ui = void 0;
          /** 弹窗层 */
          this.popup = void 0;
          /** 只能弹出一个的弹窗 */
          this.dialog = void 0;
          /** 游戏系统提示弹窗  */
          this.system = void 0;
          /** 消息提示控制器，请使用show方法来显示 */
          this.notify = void 0;
          /** UI配置 */
          this.configs = {};
          this._tip = void 0;
          this.root = root;
          this.camera = this.root.getComponentInChildren(Camera);
          this.game = this.create_node(LayerType.Game);
          this.ui = new LayerUI(LayerType.UI);
          this.popup = new LayerPopUp(LayerType.PopUp);
          this.dialog = new LayerDialog(LayerType.Dialog);
          this.system = new LayerDialog(LayerType.System);
          this.notify = new LayerNotify(LayerType.Notify);
          this.guide = this.create_node(LayerType.Guide);
          root.addChild(this.game);
          root.addChild(this.ui);
          root.addChild(this.popup);
          root.addChild(this.dialog);
          root.addChild(this.system);
          root.addChild(this.notify);
          root.addChild(this.guide);
        }
        _proto.create_node = function create_node(name) {
          var node = new Node(name);
          node.layer = Layers.Enum.UI_2D;
          var w = node.addComponent(Widget);
          w.isAlignLeft = w.isAlignRight = w.isAlignTop = w.isAlignBottom = true;
          w.left = w.right = w.top = w.bottom = 0;
          w.alignMode = 2;
          w.enabled = true;
          return node;
        };
        _createClass(LayerManager, [{
          key: "portrait",
          get: /** 是否为竖屏显示 */
          function get() {
            return this.root.getComponent(GUI).portrait;
          }
        }, {
          key: "tip",
          get: function get() {
            if (!this._tip) {
              this._tip = new TipsManager();
            }
            return this._tip;
          }
        }]);
        return LayerManager;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerNotify.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Notify.ts', './ViewUtil.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Layers, BlockInputEvents, find, instantiate, Widget, Node, Notify, ViewUtil;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Layers = module.Layers;
      BlockInputEvents = module.BlockInputEvents;
      find = module.find;
      instantiate = module.instantiate;
      Widget = module.Widget;
      Node = module.Node;
    }, function (module) {
      Notify = module.Notify;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "da14ax+B2xNsL2taQFOh7we", "LayerNotify", undefined);
      var ToastPrefabPath = 'common/prefab/notify';
      var WaitPrefabPath = 'common/prefab/wait';

      /*
       * 滚动消息提示层
       */
      var LayerNotify = exports('LayerNotify', /*#__PURE__*/function (_Node) {
        _inheritsLoose(LayerNotify, _Node);
        function LayerNotify(name) {
          var _this;
          _this = _Node.call(this, name) || this;
          _this.black = void 0;
          /** 等待提示资源 */
          _this.wait = null;
          /** 自定义弹出提示资源 */
          _this.notify = null;
          /** 自定义弹出提示内容资源 */
          _this.notifyItem = null;
          var widget = _this.addComponent(Widget);
          widget.isAlignLeft = widget.isAlignRight = widget.isAlignTop = widget.isAlignBottom = true;
          widget.left = widget.right = widget.top = widget.bottom = 0;
          widget.alignMode = 2;
          widget.enabled = true;
          _this.init();
          return _this;
        }
        var _proto = LayerNotify.prototype;
        _proto.init = function init() {
          this.layer = Layers.Enum.UI_2D;
          this.black = this.addComponent(BlockInputEvents);
          this.black.enabled = false;
        }

        /** 打开等待提示 */;
        _proto.waitOpen = function waitOpen() {
          if (this.wait == null) this.wait = ViewUtil.createPrefabNode(WaitPrefabPath);
          if (this.wait.parent == null) {
            this.wait.parent = this;
            this.black.enabled = true;
          }
        }

        /** 关闭等待提示 */;
        _proto.waitClose = function waitClose() {
          if (this.wait.parent) {
            this.wait.parent = null;
            this.black.enabled = false;
          }
        }

        /**
         * 渐隐飘过提示
         * @param content 文本表示
         * @param useI18n 是否使用多语言
         */;
        _proto.toast = function toast(content, useI18n) {
          var _this2 = this;
          try {
            if (this.notify == null) {
              this.notify = ViewUtil.createPrefabNode(ToastPrefabPath);
              this.notifyItem = find("item", this.notify);
              this.notifyItem.parent = null;
            }
            this.notify.parent = this;
            var childNode = instantiate(this.notifyItem);
            var toastCom = childNode.getChildByName("prompt").getComponent(Notify);
            childNode.parent = this.notify;
            toastCom.onComplete = function () {
              if (_this2.notify.children.length == 0) {
                _this2.notify.parent = null;
              }
            };
            toastCom.toast(content, useI18n);

            // 超过3个提示，就施放第一个提示
            if (this.notify.children.length > 3) {
              this.notify.children[0].destroy();
            }
          } catch (_unused) {
            console.error("从oops-game-kit项目中拷贝 assets/bundle/common/prefab/notify.prefab 与 assets/bundle/common/anim/notify.anim 覆盖到本项目中");
          }
        };
        return LayerNotify;
      }(Node));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerPopup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LayerUI.ts', './ViewUtil.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, Layers, BlockInputEvents, Node, LayerUI, ViewUtil;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Layers = module.Layers;
      BlockInputEvents = module.BlockInputEvents;
      Node = module.Node;
    }, function (module) {
      LayerUI = module.LayerUI;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "25d07BQBCFADaSsh/I3GrTX", "LayerPopup", undefined);
      var Mask = 'common/prefab/mask';

      /* 弹窗层，允许同时弹出多个窗口 */
      var LayerPopUp = exports('LayerPopUp', /*#__PURE__*/function (_LayerUI) {
        _inheritsLoose(LayerPopUp, _LayerUI);
        function LayerPopUp(name) {
          var _this;
          _this = _LayerUI.call(this, name) || this;
          /** 触摸事件阻挡 */
          _this.black = void 0;
          /** 半透明遮罩资源 */
          _this.mask = void 0;
          _this.init();
          return _this;
        }
        var _proto = LayerPopUp.prototype;
        _proto.init = function init() {
          this.layer = Layers.Enum.UI_2D;
          this.black = this.addComponent(BlockInputEvents);
          this.black.enabled = false;
        };
        _proto.showUi = function showUi(vp) {
          _LayerUI.prototype.showUi.call(this, vp);

          // 界面加载完成显示时，启动触摸非窗口区域关闭
          this.openVacancyRemove(vp.config);

          // 界面加载完成显示时，层级事件阻挡
          this.black.enabled = true;
        };
        _proto.onCloseWindow = function onCloseWindow(vp) {
          _LayerUI.prototype.onCloseWindow.call(this, vp);

          // 界面关闭后，关闭触摸事件阻挡、关闭触摸非窗口区域关闭、关闭遮罩
          this.setBlackDisable();
        }

        /** 设置触摸事件阻挡 */;
        _proto.setBlackDisable = function setBlackDisable() {
          // 所有弹窗关闭后，关闭事件阻挡功能
          if (this.ui_nodes.size == 0) {
            this.black.enabled = false;
          }
          this.closeVacancyRemove();
          this.closeMask();
        }

        /** 关闭遮罩 */;
        _proto.closeMask = function closeMask() {
          var flag = true;
          for (var _iterator = _createForOfIteratorHelperLoose(this.ui_nodes.values()), _step; !(_step = _iterator()).done;) {
            var value = _step.value;
            if (value.config.mask) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.mask.parent = null;
          }
        }

        /** 启动触摸非窗口区域关闭 */;
        _proto.openVacancyRemove = function openVacancyRemove(config) {
          if (!this.hasEventListener(Node.EventType.TOUCH_END, this.onTouchEnd, this)) {
            this.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          }

          // 背景半透明遮罩
          if (this.mask == null) {
            this.mask = ViewUtil.createPrefabNode(Mask);
          }
          if (config.mask) {
            this.mask.parent = this;
            this.mask.setSiblingIndex(0);
          }
        }

        /** 关闭触摸非窗口区域关闭 */;
        _proto.closeVacancyRemove = function closeVacancyRemove() {
          var flag = true;
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.ui_nodes.values()), _step2; !(_step2 = _iterator2()).done;) {
            var value = _step2.value;
            if (value.config.vacancy) {
              flag = false;
              break;
            }
          }
          if (flag && this.hasEventListener(Node.EventType.TOUCH_END, this.onTouchEnd, this)) {
            this.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          }
        };
        _proto.onTouchEnd = function onTouchEnd(event) {
          var _this2 = this;
          if (event.target === this) {
            this.ui_nodes.forEach(function (vp) {
              // 关闭已显示的界面
              if (vp.valid && vp.config.vacancy) {
                _this2.remove(vp.config.prefab, vp.config.destroy);
              }
            });
          }
        };
        _proto.clear = function clear(isDestroy) {
          _LayerUI.prototype.clear.call(this, isDestroy);
          this.black.enabled = false;
          this.active = false;
          this.closeVacancyRemove();
          this.closeMask();
        };
        return LayerPopUp;
      }(LayerUI));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Defines.ts', './DelegateComponent.ts', './Hope.ts'], function (exports) {
  var _inheritsLoose, cclegacy, instantiate, Widget, Node, ViewParams, DelegateComponent, hope;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      instantiate = module.instantiate;
      Widget = module.Widget;
      Node = module.Node;
    }, function (module) {
      ViewParams = module.ViewParams;
    }, function (module) {
      DelegateComponent = module.DelegateComponent;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bc8b86Br9dGeKxeLijkyJKE", "LayerUI", undefined);

      /** 界面层对象 */
      var LayerUI = exports('LayerUI', /*#__PURE__*/function (_Node) {
        _inheritsLoose(LayerUI, _Node);
        /**
         * UI基础层，允许添加多个预制件节点
         * @param name 该层名
         * @param container 容器Node
         */
        function LayerUI(name) {
          var _this;
          _this = _Node.call(this, name) || this;
          /** 显示界面节点集合 */
          _this.ui_nodes = new Map();
          /** 被移除的界面缓存数据 */
          _this.ui_cache = new Map();
          var widget = _this.addComponent(Widget);
          widget.isAlignLeft = widget.isAlignRight = widget.isAlignTop = widget.isAlignBottom = true;
          widget.left = widget.right = widget.top = widget.bottom = 0;
          widget.alignMode = 2;
          widget.enabled = true;
          return _this;
        }

        /**
         * 添加一个预制件节点到层容器中，该方法将返回一个唯一`uuid`来标识该操作节点
         * @param prefabPath 预制件路径
         * @param params     自定义参数
         * @param callbacks  回调函数对象，可选
         * @returns ture为成功,false为失败
         */
        var _proto = LayerUI.prototype;
        _proto.add = function add(config, params, callbacks) {
          if (this.ui_nodes.has(config.prefab)) {
            console.warn("\u8DEF\u5F84\u4E3A\u3010" + config.prefab + "\u3011\u7684\u9884\u5236\u91CD\u590D\u52A0\u8F7D");
            return;
          }

          // 检查缓存中是否存界面
          var vp = this.ui_cache.get(config.prefab);
          if (vp == null) {
            vp = new ViewParams();
            vp.config = config;
          }
          this.ui_nodes.set(config.prefab, vp);
          vp.params = params != null ? params : {};
          vp.callbacks = callbacks != null ? callbacks : {};
          vp.valid = true;
          this.load(vp, config.bundle);
        }

        /**
         * 加载界面资源
         * @param vp         显示参数
         * @param bundle     远程资源包名，如果为空就是默认本地资源包
         */;
        _proto.load = function load(vp, bundle) {
          var _this2 = this;
          if (vp && vp.node) {
            this.showUi(vp);
          } else {
            // 优先加载配置的指定资源包中资源，如果没配置则加载默认资源包资源
            bundle = bundle || hope.res.defaultBundleName;
            hope.res.load(bundle, vp.config.prefab, function (err, res) {
              if (err) {
                _this2.ui_nodes["delete"](vp.config.prefab);
                console.warn("\u8DEF\u5F84\u4E3A\u3010" + vp.config.prefab + "\u3011\u7684\u9884\u5236\u52A0\u8F7D\u5931\u8D25");
                vp.callbacks && vp.callbacks.onLoadFailure && vp.callbacks.onLoadFailure();
                return;
              }
              var childNode = instantiate(res);
              vp.node = childNode;
              var comp = childNode.addComponent(DelegateComponent);
              comp.vp = vp;
              comp.onCloseWindow = _this2.onCloseWindow.bind(_this2);
              _this2.showUi(vp);
            });
          }
        };
        _proto.onCloseWindow = function onCloseWindow(vp) {
          this.ui_nodes["delete"](vp.config.prefab);
        }

        /**
         * 创建界面节点
         * @param vp  视图参数
         */;
        _proto.showUi = function showUi(vp) {
          // 触发窗口添加事件
          var comp = vp.node.getComponent(DelegateComponent);
          comp.add();
          vp.node.parent = this;

          // 标记界面为使用状态
          vp.valid = true;
        }

        /**
         * 根据预制件路径删除，预制件如在队列中也会被删除，如果该预制件存在多个也会一起删除
         * @param prefabPath   预制路径
         * @param isDestroy    移除后是否释放
         */;
        _proto.remove = function remove(prefabPath, isDestroy) {
          var release = undefined;
          if (isDestroy !== undefined) release = isDestroy;

          // 界面移出舞台
          var vp = this.ui_nodes.get(prefabPath);
          if (vp) {
            // // 优先使用参数中控制的释放条件，如果未传递参数则用配置中的释放条件
            // if (release === undefined && vp.config.destroy !== undefined) {
            //     release = vp.config.destroy;
            // }
            // // 默认不缓存关闭的界面
            // else {
            //     release = true;
            // }

            // 优先使用参数中控制的释放条件，如果未传递参数则用配置中的释放条件，默认不缓存关闭的界面
            if (release === undefined) {
              release = vp.config.destroy !== undefined ? vp.config.destroy : true;
            }

            // 不释放界面，缓存起来待下次使用
            if (release === false) {
              this.ui_cache.set(vp.config.prefab, vp);
            }
            var childNode = vp.node;
            var comp = childNode.getComponent(DelegateComponent);
            comp.remove(release);
          }

          // 验证是否删除后台缓存界面
          if (release === true) this.removeCache(prefabPath);
        }

        /** 删除缓存的界面，当缓存界面被移除舞台时，可通过此方法删除缓存界面 */;
        _proto.removeCache = function removeCache(prefabPath) {
          var vp = this.ui_cache.get(prefabPath);
          if (vp) {
            this.ui_nodes["delete"](vp.config.prefab);
            this.ui_cache["delete"](prefabPath);
            var childNode = vp.node;
            childNode.destroy();
          }
        }

        /**
         * 根据预制路径获取已打开界面的节点对象
         * @param prefabPath  预制路径
         */;
        _proto.get = function get(prefabPath) {
          var vp = this.ui_nodes.get(prefabPath);
          if (vp) return vp.node;
          return null;
        }

        /**
         * 判断当前层是否包含 uuid或预制件路径对应的Node节点
         * @param prefabPath 预制件路径或者UUID
         */;
        _proto.has = function has(prefabPath) {
          return this.ui_nodes.has(prefabPath);
        }

        /**
         * 清除所有节点，队列当中的也删除
         * @param isDestroy  移除后是否释放
         */;
        _proto.clear = function clear(isDestroy) {
          var _this3 = this;
          // 清除所有显示的界面
          this.ui_nodes.forEach(function (value, key) {
            _this3.remove(value.config.prefab, isDestroy);
            value.valid = false;
          });
          this.ui_nodes.clear();

          // 清除缓存中的界面
          if (isDestroy) {
            this.ui_cache.forEach(function (value, prefabPath) {
              _this3.removeCache(prefabPath);
            });
          }
        };
        return LayerUI;
      }(Node));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/List.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0b0c3p3VohCzI2RC+AGcpH6", "List", undefined);
      /** 列表 */
      var List = exports('List', /*#__PURE__*/function () {
        function List(only) {
          if (only === void 0) {
            only = true;
          }
          this.element = void 0;
          /** 是否保证元素的唯一性 */
          this.only = false;
          /** 元素数量(内部再增删时会修改这个参数，外部只做计算和绑定使用，切记不可做赋值操作) */
          this.count = 0;
          this.only = only;
          this.element = [];
        }

        /**
         * 添加到末尾(注意如果保证唯一性，那么重复时就直接返回)
         * @param value 
         */
        var _proto = List.prototype;
        _proto.push = function push(value) {
          if (this.only) {
            var index = this.element.indexOf(value);
            if (index >= 0) {
              return false;
            }
          }
          this.element.push(value);
          this.count = this.element.length;
          return true;
        }

        /**
         * 添加到列表头部(注意如果保证唯一性，那么重复时就直接返回)
         * @param value 
         * @returns 
         */;
        _proto.unshift = function unshift(value) {
          if (this.only) {
            var index = this.element.indexOf(value);
            if (index >= 0) {
              return false;
            }
          }
          this.element.unshift(value);
          this.count = this.element.length;
          return true;
        }

        /**
         * 获取并删除最后一个元素
         * @returns 
         */;
        _proto.pop = function pop() {
          if (this.element.length > 0) {
            var result = this.element.pop();
            this.count = this.element.length;
            return result;
          }
          return null;
        }

        /**
         * 获取并删除第一个元素
         * @returns 
         */;
        _proto.shift = function shift() {
          if (this.element.length > 0) {
            var result = this.element.shift();
            this.count = this.element.length;
            return result;
          }
          return null;
        }

        /**
         * 删除指定索引的元素
         * @param index 
         */;
        _proto.removeAt = function removeAt(index) {
          if (index >= this.element.length) {
            throw new Error("删除索引超出范围！");
          }
          var result = this.element[index];
          this.element.splice(index, 1);
          this.count = this.element.length;
          return result;
        }

        /**
         * 删除元素
         * @param value 
         */;
        _proto.remove = function remove(value) {
          var index = this.element.indexOf(value);
          if (index < 0) {
            throw new Error("要删除的内容不在列表中！" + value);
          }
          var result = this.element[index];
          this.element.splice(index, 1);
          this.count = this.element.length;
        }

        /** 移除所有元素 */;
        _proto.clear = function clear() {
          this.count = 0;
          this.element.length = 0;
        }

        /**
         * 判断是否包含
         * @param value 
         * @returns 
         */;
        _proto.has = function has(value) {
          return this.find(value) >= 0;
        }

        /**
         * 查找元素下标
         * @param value 
         * @returns 
         */;
        _proto.find = function find(value) {
          return this.element.indexOf(value);
        }

        /**
         * 查找元素下标
         * @param predicate 
         * @returns 
         */;
        _proto.findIndex = function findIndex(predicate) {
          var index = this.element.findIndex(predicate);
          return index;
        }

        /**
         * 获取指定元素
         * @param index 
         * @returns 
         */;
        _proto.get = function get(index) {
          if (index >= this.element.length) {
            throw new Error("超出索引范围:" + index + "/" + this.element.length);
          }
          return this.element[index];
        }

        /**
         * 源列表数据(注意不要直接进行增删操作，而是通过List.push....等接口进行操作)
         */;
        _createClass(List, [{
          key: "elements",
          get: function get() {
            return this.element;
          }
        }]);
        return List;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadingIndicator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "95143M/82NCOLKGzw14JlmS", "LoadingIndicator", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /** 加载延时提示动画 */
      var LoadingIndicator = exports('LoadingIndicator', (_dec = ccclass("LoadingIndicator"), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoadingIndicator, _Component);
        function LoadingIndicator() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "loading", _descriptor, _assertThisInitialized(_this));
          _this.loading_rotate = 0;
          return _this;
        }
        var _proto = LoadingIndicator.prototype;
        _proto.update = function update(dt) {
          this.loading_rotate += dt * 220;
          this.loading.setRotationFromEuler(0, 0, -this.loading_rotate % 360);
          if (this.loading_rotate > 360) {
            this.loading_rotate -= 360;
          }
        };
        return LoadingIndicator;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "loading", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './architecture.ts', './ByteBuf.ts', './config_game_ui.ts', './event_game.ts', './schema.ts', './bag.ts', './bag_ctrl.ts', './bag_item_cell.ts', './battle.ts', './battle_ctrl.ts', './cell.ts', './cell_base.ts', './cell_bg.ts', './mission_item.ts', './mission_item_cell.ts', './game_map.ts', './game_map_ctrl.ts', './game_map_item.ts', './bag_model.ts', './battle_model.ts', './mission_model.ts', './player_model.ts', './Hope.ts', './Root.ts', './BaseCtrl.ts', './BaseView.ts', './Architecture2.ts', './ICanSetArchitecture.ts', './ICommand.ts', './IController.ts', './IModel.ts', './ISystem.ts', './ICanGetModel.ts', './ICanGetSystem.ts', './ICanRegisterEvent.ts', './ICanSendCommand.ts', './ICanSendEvent.ts', './Delegate.ts', './EventSystem.ts', './IOCContainer.ts', './AudioEffect.ts', './AudioManager.ts', './AudioMusic.ts', './BuildTimeConstants.ts', './Config.ts', './GameConfig.ts', './GameQueryConfig.ts', './EventDispatcher.ts', './EventMessage.ts', './MessageManager.ts', './ResLoader.ts', './StorageManager.ts', './Timer.ts', './TimerManager.ts', './DateExt.ts', './NodeExt.ts', './GUI.ts', './Defines.ts', './DelegateComponent.ts', './LayerDialog.ts', './LayerManager.ts', './LayerNotify.ts', './LayerPopup.ts', './LayerUI.ts', './UIMap.ts', './CommonPrompt.ts', './LoadingIndicator.ts', './Notify.ts', './TipsManager.ts', './ArrayUtil.ts', './CameraUtil.ts', './ImageUtil.ts', './JsonUtil.ts', './MathUtil.ts', './ObjectUtil.ts', './PlatformUtil.ts', './RegexUtil.ts', './StringUtil.ts', './TimeUtils.ts', './Vec3Util.ts', './ViewUtil.ts', './List.ts', './TwoDimensionalArray.ts', './dynamic_prefab.ts', './frame_loader.ts', './Badge.ts', './RoundRectMask.ts', './ButtonEffect.ts', './ButtonSimple.ts', './ButtonTouchLong.ts', './UIButton.ts', './Drag.ts', './outline.ts', './RenderAlternative.ts', './RenderReactiveHandler.ts', './GameComponent.ts', './ResSpine.ts', './ResSprite.ts', './Hot.ts', './HotUpdate.ts', './root_game.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MathUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f98ce3ouc9B4KtzcYXPnT+8", "MathUtil", undefined);
      /** 数学工具 */
      var MathUtil = exports('MathUtil', /*#__PURE__*/function () {
        function MathUtil() {}
        /**
         * 获得随机方向
         * @param x -1为左，1为右
         * @returns 
         */
        MathUtil.sign = function sign(x) {
          if (x > 0) {
            return 1;
          }
          if (x < 0) {
            return -1;
          }
          return 0;
        }

        /**
         * 随时间变化进度值
         * @param start 初始值
         * @param end   结束值
         * @param t     时间
         */;
        MathUtil.progress = function progress(start, end, t) {
          return start + (end - start) * t;
        }

        /**
         * 插值
         * @param numStart 开始数值
         * @param numEnd   结束数值
         * @param t        时间
         */;
        MathUtil.lerp = function lerp(numStart, numEnd, t) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }
          return numStart * (1 - t) + numEnd * t;
        }

        /**
         * 角度插值
         * @param angle1 角度1
         * @param angle2 角度2
         * @param t      时间
         */;
        MathUtil.lerpAngle = function lerpAngle(current, target, t) {
          current %= 360;
          target %= 360;
          var dAngle = target - current;
          if (dAngle > 180) {
            target = current - (360 - dAngle);
          } else if (dAngle < -180) {
            target = current + (360 + dAngle);
          }
          return (MathUtil.lerp(current, target, t) % 360 + 360) % 360;
        }

        /**
         * 按一定的速度从一个角度转向令一个角度
         * @param current 当前角度
         * @param target  目标角度
         * @param speed   速度
         */;
        MathUtil.angleTowards = function angleTowards(current, target, speed) {
          current %= 360;
          target %= 360;
          var dAngle = target - current;
          if (dAngle > 180) {
            target = current - (360 - dAngle);
          } else if (dAngle < -180) {
            target = current + (360 + dAngle);
          }
          var dir = target - current;
          if (speed > Math.abs(dir)) {
            return target;
          }
          return ((current + speed * Math.sign(dir)) % 360 + 360) % 360;
        }

        /**
         * 获取方位内值，超过时获取对应边界值
         * @param value     值
         * @param minLimit  最小值
         * @param maxLimit  最大值
         */;
        MathUtil.clamp = function clamp(value, minLimit, maxLimit) {
          if (value < minLimit) {
            return minLimit;
          }
          if (value > maxLimit) {
            return maxLimit;
          }
          return value;
        }

        /**
         * 获得一个值的概率
         * @param value 值
         */;
        MathUtil.probability = function probability(value) {
          return Math.random() < value;
        };
        return MathUtil;
      }());
      /**
       * 角度转弧度
       */
      MathUtil.deg2Rad = Math.PI / 180;
      /**
       * 弧度转角度
       */
      MathUtil.rad2Deg = 180 / Math.PI;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MessageManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, warn, log;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
      log = module.log;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a401fY+wj9NsqOACoZ7Zy/R", "MessageManager", undefined);
      var EventData = function EventData() {
        this.event = void 0;
        this.listener = void 0;
        this.object = void 0;
      };
      /** 批量注册、移除全局事件对象 */
      var MessageEventData = exports('MessageEventData', /*#__PURE__*/function () {
        function MessageEventData() {
          this.events = new Map();
        }
        var _proto = MessageEventData.prototype;
        /**
         * 注册全局事件
         * @param event      事件名
         * @param listener   处理事件的侦听器函数
         * @param object     侦听函数绑定的作用域对象
         */
        _proto.on = function on(event, listener, object) {
          var eds = this.events.get(event);
          if (eds == null) {
            eds = [];
            this.events.set(event, eds);
          }
          var ed = new EventData();
          ed.event = event;
          ed.listener = listener;
          ed.object = object;
          eds.push(ed);
          message.on(event, listener, object);
        }

        /**
         * 移除全局事件
         * @param event     事件名
         */;
        _proto.off = function off(event) {
          var eds = this.events.get(event);
          if (!eds) return;
          for (var _iterator = _createForOfIteratorHelperLoose(eds), _step; !(_step = _iterator()).done;) {
            var eb = _step.value;
            message.off(event, eb.listener, eb.object);
          }
          this.events["delete"](event);
        }

        /**
         * 触发全局事件
         * @param event(string)      事件名
         * @param args(any)          事件参数
         */;
        _proto.dispatchEvent = function dispatchEvent(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          message.dispatchEvent.apply(message, [event].concat(args));
        }

        /** 清除所有的全局事件监听 */;
        _proto.clear = function clear() {
          for (var event in this.events) {
            this.off(event);
          }
        };
        return MessageEventData;
      }());

      /**
       * 全局消息管理
       * @example
       // 注册持续监听的全局事件
       export class RoleViewComp extends Component{
       onLoad(){
       // 监听全局事件
       oops.message.on(GameEvent.GameServerConnected, this.onHandler, this);
       }
         protected onDestroy() {
       // 对象释放时取消注册的全局事件
       oops.message.off(GameEvent.GameServerConnected, this.onHandler, this);
       }
         private onHandler(event: string, args: any) {
       switch (event) {
       case GameEvent.GameServerConnected:
       console.log("处理游戏服务器连接成功后的逻辑");
       break;
       }
       }
       }
         // 注册只触发一次的全局事件
       export class RoleViewComp extends Component{
       onLoad(){
       // 监听一次事件，事件响应后，该监听自动移除
       oops.message.once(GameEvent.GameServerConnected, this.onHandler, this);
       }
         private onHandler(event: string, args: any) {
       switch (event) {
       case GameEvent.GameServerConnected:
       console.log("处理游戏服务器连接成功后的逻辑");
       break;
       }
       }
       }
       */
      var MessageManager = exports('MessageManager', /*#__PURE__*/function () {
        function MessageManager() {
          this.events = new Map();
        }
        var _proto2 = MessageManager.prototype;
        /**
         * 注册全局事件
         * @param event      事件名
         * @param listener   处理事件的侦听器函数
         * @param object     侦听函数绑定的作用域对象
         */
        _proto2.on = function on(event, listener, object) {
          if (!event || !listener) {
            warn("\u6CE8\u518C\u3010" + event + "\u3011\u4E8B\u4EF6\u7684\u4FA6\u542C\u5668\u51FD\u6570\u4E3A\u7A7A");
            return;
          }
          var eds = this.events.get(event);
          if (eds == null) {
            eds = [];
            this.events.set(event, eds);
          }
          var length = eds.length;
          for (var i = 0; i < length; i++) {
            var bin = eds[i];
            if (bin.listener == listener && bin.object == object) {
              warn("\u540D\u4E3A\u3010" + event + "\u3011\u7684\u4E8B\u4EF6\u91CD\u590D\u6CE8\u518C\u4FA6\u542C\u5668");
            }
          }
          var data = new EventData();
          data.event = event;
          data.listener = listener;
          data.object = object;
          eds.push(data);
        }

        /**
         * 监听一次事件，事件响应后，该监听自动移除
         * @param event     事件名
         * @param listener  事件触发回调方法
         * @param object    侦听函数绑定的作用域对象
         */;
        _proto2.once = function once(event, listener, object) {
          var _this = this;
          var _listener2 = function _listener($event) {
            _this.off(event, _listener2, object);
            _listener2 = null;
            for (var _len2 = arguments.length, $args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              $args[_key2 - 1] = arguments[_key2];
            }
            listener.call(object, $event, $args);
          };
          this.on(event, _listener2, object);
        }

        /**
         * 移除全局事件
         * @param event     事件名
         * @param listener  处理事件的侦听器函数
         * @param object    侦听函数绑定的作用域对象
         */;
        _proto2.off = function off(event, listener, object) {
          var eds = this.events.get(event);
          if (!eds) {
            log("\u540D\u4E3A\u3010" + event + "\u3011\u7684\u4E8B\u4EF6\u4E0D\u5B58\u5728");
            return;
          }
          var length = eds.length;
          for (var i = 0; i < length; i++) {
            var bin = eds[i];
            if (bin.listener == listener && bin.object == object) {
              eds.splice(i, 1);
              break;
            }
          }
          if (eds.length == 0) {
            this.events["delete"](event);
          }
        }

        /**
         * 触发全局事件
         * @param event(string)      事件名
         * @param args(any)          事件参数
         */;
        _proto2.dispatchEvent = function dispatchEvent(event) {
          var list = this.events.get(event);
          if (list != null) {
            var eds = list.concat();
            var length = eds.length;
            for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              args[_key3 - 1] = arguments[_key3];
            }
            for (var i = 0; i < length; i++) {
              var _eventBin$listener;
              var eventBin = eds[i];
              (_eventBin$listener = eventBin.listener).call.apply(_eventBin$listener, [eventBin.object, event].concat(args));
            }
          }
        }

        /**
         * 移除指定对象的所有事件监听器
         * @param object    侦听函数绑定的作用域对象
         */;
        _proto2.offAllByObject = function offAllByObject(object) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.events.entries()), _step2; !(_step2 = _iterator2()).done;) {
            var _step2$value = _step2.value,
              event = _step2$value[0],
              eds = _step2$value[1];
            for (var i = eds.length - 1; i >= 0; i--) {
              if (eds[i].object === object) {
                eds.splice(i, 1);
              }
            }
            if (eds.length === 0) {
              this.events["delete"](event);
            }
          }
        };
        return MessageManager;
      }());
      var message = exports('message', new MessageManager());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/mission_item_cell.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './cell_base.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Component, CellBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      CellBase = module.CellBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "4c638SxNqlLnZFW1l7sq+wk", "mission_item_cell", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MissionItemCell = exports('MissionItemCell', (_dec = ccclass('MissionItemCell'), _dec2 = property(CellBase), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MissionItemCell, _Component);
        function MissionItemCell() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "comptCell", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgInfo", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = MissionItemCell.prototype;
        _proto.refresh = function refresh(cellTId, finish) {
          this.comptCell.refresh(cellTId);
          this.nodeImgInfo.color = finish ? new Color(0, 255, 0) : new Color(255, 255, 255);
        };
        return MissionItemCell;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "comptCell", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgInfo", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/mission_item.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './mission_item_cell.ts', './ViewUtil.ts', './Hope.ts', './GameComponent.ts', './event_game.ts', './ResSprite.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Button, Label, log, MissionItemCell, ViewUtil, hope, GameComponent, GameEvent, ResSprite;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Button = module.Button;
      Label = module.Label;
      log = module.log;
    }, function (module) {
      MissionItemCell = module.MissionItemCell;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      GameComponent = module.GameComponent;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      ResSprite = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "03249ZvVlxJhYnN6sVg7tNw", "mission_item", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MissionItem = exports('MissionItem', (_dec = ccclass('MissionItem'), _dec2 = property([MissionItemCell]), _dec3 = property(Node), _dec4 = property(Button), _dec5 = property(Label), _dec6 = property(Node), _dec7 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_GameComponent) {
        _inheritsLoose(MissionItem, _GameComponent);
        function MissionItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GameComponent.call.apply(_GameComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "comptItemCell", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgNpc", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnFinish", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelRewardCount", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeImgReward", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelDebug", _descriptor6, _assertThisInitialized(_this));
          _this._data = void 0;
          return _this;
        }
        var _proto = MissionItem.prototype;
        _proto.onLoad = function onLoad() {
          ViewUtil.registerButtonClick(this.btnFinish, this.onFinish, this);
        };
        _proto.refresh = function refresh(detail) {
          log(detail);
          this._data = detail;
          var tbMission = hope.config.tables.TbMission.get(detail.tId);
          var res = tbMission.npc_ref.res || tbMission.npc_ref.id;
          ResSprite.replaceSpriteFrame(this.nodeImgNpc, "texture/npc/" + res);
          var tbCell = hope.config.tables.TbCell.get(detail.reward1.tId);
          var resReward = tbCell.res || tbCell.id;
          ResSprite.replaceSpriteFrame(this.nodeImgReward, "texture/battle/cell/" + resReward);
          this.labelRewardCount.string = "+" + detail.reward1.count;
          for (var i = 0; i < this.comptItemCell.length; i++) {
            var cell = this.comptItemCell[i];
            var cellTId = detail.cellTIds[i];
            if (cellTId) {
              cell.refresh(cellTId, !!detail.haveCell_[i]);
              cell.node.active = true;
            } else {
              cell.node.active = false;
            }
          }
          this.btnFinish.node.active = detail.cellTIds.every(function (cellTId, i) {
            return detail.haveCell_[i];
          });
          this.labelDebug.string = tbMission.name;
        };
        _proto.onFinish = function onFinish() {
          hope.message.dispatchEvent(GameEvent.BattleMissionClickFinish, this._data);
        };
        return MissionItem;
      }(GameComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "comptItemCell", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgNpc", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnFinish", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "labelRewardCount", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodeImgReward", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "labelDebug", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/mission_model.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IModel.ts', './player_model.ts', './Hope.ts', './ArrayUtil.ts', './battle_model.ts', './bag_model.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _createClass, cclegacy, warn, log, ModelDecorator, AbstractModel, PlayerModel, hope, ArrayUtil, BattleModel, BagModel;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
      log = module.log;
    }, function (module) {
      ModelDecorator = module.ModelDecorator;
      AbstractModel = module.AbstractModel;
    }, function (module) {
      PlayerModel = module.PlayerModel;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      ArrayUtil = module.ArrayUtil;
    }, function (module) {
      BattleModel = module.BattleModel;
    }, function (module) {
      BagModel = module.BagModel;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "5af66d74JJAlKSpf5/xhkfL", "mission_model", undefined);
      var MissionModel = exports('MissionModel', (_dec = ModelDecorator('MissionModel'), _dec(_class = /*#__PURE__*/function (_AbstractModel) {
        _inheritsLoose(MissionModel, _AbstractModel);
        function MissionModel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AbstractModel.call.apply(_AbstractModel, [this].concat(args)) || this;
          _this._modelPlayer = void 0;
          _this._modelBattle = void 0;
          _this._modelBag = void 0;
          /**
           * 根据类型获取任务列表的分组。
           *
           * 此方法用于从存储的任务数据中，根据任务类型对任务进行分组。如果已经进行了分组，则直接返回分组结果，
           * 否则重新进行分组。这样做的目的是为了提高效率，避免重复的分组操作。
           *
           * @returns {Record<string, Mission[]>} 返回一个记录（object），其中键（key）是任务类型，值（value）是该类型的任务数组。
           */
          _this._tbMissionGroupByType = null;
          return _this;
        }
        var _proto = MissionModel.prototype;
        _proto.OnInit = function OnInit() {};
        _proto.refreshMission = function refreshMission() {
          var typeMissions = this.getTbMissionsGroupByType();
          var doingTypes = this.getDoingMissionTypes();
          warn("refreshMission[start]", typeMissions, doingTypes);

          // 按照类型遍历所有任务
          for (var type in typeMissions) {
            // 这个任务类型已经有了
            if (doingTypes.includes(type)) {
              log("\u4EFB\u52A1\u7C7B\u578B" + type + "\u5DF2\u7ECF\u6709\u4E86", typeMissions[type]);
              continue;
            }

            // 没有这个类型的任务就尝试去生成任务
            var detail = this.generateMissionByType(type);
            if (detail && detail.tId) {
              // 生成了就添加
              this.player.data.mission.doing.push(detail);
            }
          }
          var cells = this.battle.getAllValidCells();

          // 清理之前的cell上标记
          cells.forEach(function (cell) {
            cell.isMissionNeed = false;
          });
          // 清理之前的mission上标记
          this.player.data.mission.doing.forEach(function (detail) {
            detail.haveCell_ = new Array(detail.cellTIds.length);
          });
          this.player.data.mission.doing.forEach(function (detail) {
            var _loop = function _loop() {
              var needCellTid = detail.cellTIds[i];
              var find = cells.filter(function (v) {
                return v.cellId == needCellTid;
              });
              if (find.length > 0) {
                find[0].isMissionNeed = true;
                detail.haveCell_[i] = find[0];
                return 1; // break
              }
            };

            for (var i = 0; i < detail.cellTIds.length; i++) {
              if (_loop()) break;
            }
          });

          // 刷新所有的任务状态
          warn("refreshMission[end]", this.player.data.mission);
        };
        _proto.refreshGameMapMission = function refreshGameMapMission() {
          var _this2 = this;
          // const dataList = hope.config.tables.TbGameMap.getDataList();
          var mapDoing = this.player.data.mission.mapDoing;
          mapDoing.forEach(function (tb) {
            var newDetail = _this2.getGameMapDetail(tb.tId);
            var index = mapDoing.findIndex(function (detail) {
              return detail.tId === tb.tId;
            });
            if (index !== -1) {
              mapDoing[index] = newDetail;
            } else {
              warn("---------注意");
            }
          });
          warn("refreshGameMapMission[end]", this.player.data.mission.mapDoing);
        };
        _proto.reqUnlockMap = function reqUnlockMap(tId) {
          warn(tId);
          var tb = hope.config.tables.TbGameMap.get(tId);
          warn(tb);
          if (this.bag.removeBag(tb.unlockCell.id, tb.unlockCell.count)) {
            for (var i = 0; i < tb.reward.length; i++) {
              this.bag.addReward(tb.reward[i].id, tb.reward[i].count);
            }
            this.GetModel(PlayerModel).data.exp += tb.rewardExp;
            this.player.data.mission.mapDoing.push({
              tId: tb.id,
              buildLevel: 1
            });
            return true;
          } else {
            return false;
          }
        };
        _proto.reqBuildLevelUp = function reqBuildLevelUp(tId, lv) {
          warn(tId);
          var tbMap = hope.config.tables.TbGameMap.get(tId);
          warn(tbMap);
          var tb = hope.config.tables.TbGameMapBuild.getDataList().find(function (v, i) {
            return v.map == tbMap.id && v.level == lv;
          });
          warn(tb.needCell);
          if (this.bag.removeBags(tb.needCell)) {
            this.bag.addReward(tb.reward.id, tb.reward.count);
            this.GetModel(PlayerModel).data.exp += tb.rewardExp;
            var doing = this.player.data.mission.mapDoing.find(function (v, i) {
              return v.tId == tId;
            });
            doing.buildLevel++;
            if (this.getGameMapBuildLevel(tId) >= this.getGameMapBuildLevelMax(tId)) {
              this.player.data.mission.mapDoneTIds.push(tId);
            }
            return true;
          } else {
            return false;
          }
        };
        _proto.getGameMapDetail = function getGameMapDetail(tId) {
          // 0 未激活 1 可以激活 2 已经激活 3 已完成
          var tb = hope.config.tables.TbGameMap.get(tId);
          var state = 0;
          var buildLevel = 0;
          warn(this.player.data.mission.mapDoing);
          var idx = this.player.data.mission.mapDoing.findIndex(function (detail) {
            return detail.tId === tId;
          });
          if (idx == -1) {
            if (this.player.levelInfo.level >= tb.unlockLevel) {
              state = 1;
            } else {
              state = 0;
            }
          } else {
            state = 2;
            var doing = this.player.data.mission.mapDoing[idx];
            buildLevel = doing.buildLevel ? doing.buildLevel : 1;
          }
          if (this.player.data.mission.mapDoneTIds.includes(tId)) {
            state = 3;
          }
          return {
            tId: tId,
            state: state,
            buildLevel: buildLevel
          };
        };
        _proto.getGameMapBuildLevel = function getGameMapBuildLevel(tId) {
          var doing = this.player.data.mission.mapDoing.find(function (v, i) {
            return v.tId == tId;
          });
          if (this.player.data.mission.mapDoing.find(function (detail) {
            return detail.tId === tId;
          })) {
            return this.getGameMapBuildLevelMax(tId);
          } else if (doing) {
            return doing.buildLevel;
          } else {
            return 0;
          }
        };
        _proto.getGameMapBuildLevelMax = function getGameMapBuildLevelMax(tId) {
          var builds = hope.config.tables.TbGameMapBuild.getDataList().filter(function (v, i) {
            return v.map == tId;
          });
          var build = builds.reduce(function (max, current) {
            return current.level > max.level ? current : max;
          });
          return build.level;
        };
        _proto.getDoingGameMap = function getDoingGameMap() {
          return this.player.data.mission.mapDoing;
        };
        _proto.getDoingMissionTypes = function getDoingMissionTypes() {
          var doingTypes = [];
          for (var _iterator = _createForOfIteratorHelperLoose(this.getDoingMissions()), _step; !(_step = _iterator()).done;) {
            var missionDetail = _step.value;
            var tbMission = hope.config.tables.TbMission.get(missionDetail.tId);
            if (!doingTypes.includes(tbMission.type)) {
              doingTypes.push(tbMission.type);
            }
          }
          return doingTypes;
        };
        _proto.getDoingMissionByType = function getDoingMissionByType(type) {
          return this.getDoingMissions().find(function (detail) {
            var tbMission = hope.config.tables.TbMission.get(detail.tId);
            return tbMission.type == type;
          });
        };
        _proto.getDoingMissions = function getDoingMissions() {
          return this.player.data.mission.doing;
        };
        _proto.generateMissionByType = function generateMissionByType(type) {
          var _this3 = this;
          var typeMissions = this.getTbMissionsGroupByType();
          log("\u51C6\u5907\u751F\u6210\u4EFB\u52A1\u7C7B\u578B" + type, typeMissions[type]);
          var unlockMissions = [];
          for (var _iterator2 = _createForOfIteratorHelperLoose(typeMissions[type]), _step2; !(_step2 = _iterator2()).done;) {
            var _tbMission = _step2.value;
            var shouldGenerate = true;

            // TODO: 建筑模块xxx

            if (!(this.player.levelInfo.level >= _tbMission.unlockLevel.mix && this.player.levelInfo.level <= _tbMission.unlockLevel.max)) {
              log("\u7B49\u7EA7\u4E0D\u591F", _tbMission);
              shouldGenerate = false;
            }
            if (!_tbMission.unlockMission.every(function (element) {
              return _this3.player.data.mission.doneTIds.includes(element);
            })) {
              log("\u524D\u7F6E\u4EFB\u52A1\u672A\u5B8C\u6210", _tbMission);
              shouldGenerate = false;
            }

            // 如果只触发一次的任务，则不再生成
            if (_tbMission.unlockOnlyOne && this.player.data.mission.doneTIds.includes(_tbMission.id)) {
              log("\u4EFB\u52A1\u53EA\u89E6\u53D1\u4E00\u6B21\uFF0C\u5DF2\u7ECF\u5B8C\u6210", _tbMission);
              shouldGenerate = false;
            }
            if (ArrayUtil.isValidArray(_tbMission.unlockCell)) {
              log("\u9700\u8981\u7269\u54C1", _tbMission.unlockCell);
              var _loop2 = function _loop2() {
                var element = _tbMission.unlockCell[i];
                if (!_this3.player.data.grid.find(function (cell) {
                  return cell.active && cell.cellId == element.id;
                })) {
                  log("\u6CA1\u6709\u8FD9\u4E2A\u7269\u54C1", _tbMission);
                  shouldGenerate = false;
                  return 1; // break
                }
              };

              for (var i = 0; i < _tbMission.unlockCell.length; i++) {
                if (_loop2()) break;
              }
            }
            if (shouldGenerate) {
              unlockMissions.push(_tbMission);
            }
          }

          // 从unlockMissions中随机选择一个生成任务返回
          if (ArrayUtil.isValidArray(unlockMissions)) {
            var tbMission = ArrayUtil.getRandomValueInArray(unlockMissions);
            var cellTIds = [];
            if (ArrayUtil.isValidArray(tbMission.rewardNeedCell1)) {
              cellTIds.push(this.player.getRandomIdFromChances(tbMission.rewardNeedCell1).id);
            }
            if (ArrayUtil.isValidArray(tbMission.rewardNeedCell2)) {
              cellTIds.push(this.player.getRandomIdFromChances(tbMission.rewardNeedCell2).id);
            }
            if (ArrayUtil.isValidArray(tbMission.rewardNeedCell3)) {
              cellTIds.push(this.player.getRandomIdFromChances(tbMission.rewardNeedCell3).id);
            }
            // idx在tbMission的reward数组中随机一个
            var reward1 = this.player.getRandomIdFromChances(tbMission.reward1);
            var reward2 = this.player.getRandomIdFromChances(tbMission.reward2);
            var detail = {
              cellTIds: cellTIds,
              tId: tbMission.id,
              haveCell_: new Array(cellTIds.length),
              reward1: reward1,
              reward2: reward2
            };
            log("\u6210\u529F\u751F\u6210\u4EFB\u52A1\u7C7B\u578B" + type, detail, tbMission);
            return detail;
          }
          log("\u5931\u8D25\u751F\u6210\u4EFB\u52A1\u7C7B\u578B" + type);
          return null;
        };
        _proto.reqFinishMission = function reqFinishMission(missionDetail) {
          this.player.data.mission.doneTIds.push(missionDetail.tId);
          this.player.data.mission.doing = this.player.data.mission.doing.filter(function (detail) {
            return detail.tId != missionDetail.tId;
          });
          this.bag.addReward(missionDetail.reward1.tId, missionDetail.reward1.count);
          if (missionDetail.reward2) {
            this.bag.addReward(missionDetail.reward2.tId, missionDetail.reward2.count);
          }
        };
        _proto.getTbMissionsGroupByType = function getTbMissionsGroupByType() {
          // 检查是否已经按类型分组过任务，如果没有，则进行分组
          if (!this._tbMissionGroupByType) {
            // 从配置的表格数据中获取所有任务数据
            var tbMission = hope.config.tables.TbMission.getDataList();
            // 使用数组工具的groupBy方法，根据任务的类型对任务进行分组
            this._tbMissionGroupByType = ArrayUtil.groupBy(tbMission, 'type');
          }
          // 返回按类型分组的任务列表
          return this._tbMissionGroupByType;
        };
        _createClass(MissionModel, [{
          key: "player",
          get: function get() {
            if (!this._modelPlayer) {
              this._modelPlayer = this.GetModel(PlayerModel);
            }
            return this._modelPlayer;
          }
        }, {
          key: "battle",
          get: function get() {
            if (!this._modelBattle) {
              this._modelBattle = this.GetModel(BattleModel);
            }
            return this._modelBattle;
          }
        }, {
          key: "bag",
          get: function get() {
            if (!this._modelBag) {
              this._modelBag = this.GetModel(BagModel);
            }
            return this._modelBag;
          }
        }]);
        return MissionModel;
      }(AbstractModel)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NodeExt.ts", ['cc'], function () {
  var cclegacy, Node, UITransform, Size, UIOpacity, UIRenderer, Color, v3, Graphics, Label, RichText, Sprite, Button, Canvas, EditBox, Layout, PageView, ProgressBar, ScrollView, Slider, Toggle, Widget, Mask;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      UITransform = module.UITransform;
      Size = module.Size;
      UIOpacity = module.UIOpacity;
      UIRenderer = module.UIRenderer;
      Color = module.Color;
      v3 = module.v3;
      Graphics = module.Graphics;
      Label = module.Label;
      RichText = module.RichText;
      Sprite = module.Sprite;
      Button = module.Button;
      Canvas = module.Canvas;
      EditBox = module.EditBox;
      Layout = module.Layout;
      PageView = module.PageView;
      ProgressBar = module.ProgressBar;
      ScrollView = module.ScrollView;
      Slider = module.Slider;
      Toggle = module.Toggle;
      Widget = module.Widget;
      Mask = module.Mask;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3b310nEWQxLSJHamj3HO91i", "NodeExt", undefined);

      // ========= 扩展 cc 提示声明 =========

      /** 扩展节点属性 */
      {
        //@ts-ignore
        if (!Node.prototype["$__definedProperties__"]) {
          //@ts-ignore
          Node.prototype["$__definedProperties__"] = true;
          var componentMap = {
            "uiGraphics": Graphics,
            "uiLabel": Label,
            "uiRichText": RichText,
            "uiSprite": Sprite,
            "uiButton": Button,
            "uiCanvas": Canvas,
            "uiEditBox": EditBox,
            "uiLayout": Layout,
            "uiPageView": PageView,
            "uiProgressBar": ProgressBar,
            "uiScrollView": ScrollView,
            "uiSlider": Slider,
            "uiToggle": Toggle,
            "uiWidget": Widget,
            "uiOpacity": UIOpacity,
            "uiTransform": UITransform,
            "uiMask": Mask
          };
          var _loop = function _loop(key) {
            Object.defineProperty(Node.prototype, key, {
              get: function get() {
                return this.getComponent(componentMap[key]);
              },
              set: function set(value) {}
            });
          };
          for (var key in componentMap) {
            _loop(key);
          }

          /** 获取、设置节点的 X 欧拉角 */
          Object.defineProperty(Node.prototype, "angle_x", {
            get: function get() {
              var self = this;
              return self.eulerAngles.x;
            },
            set: function set(value) {
              var self = this;
              self.setRotationFromEuler(value, self.eulerAngles.y, self.eulerAngles.z);
            }
          });

          /** 获取、设置节点的 Y 欧拉角 */
          Object.defineProperty(Node.prototype, "angle_y", {
            get: function get() {
              return this.eulerAngles.y;
            },
            set: function set(value) {
              var self = this;
              self.setRotationFromEuler(self.eulerAngles.x, value, self.eulerAngles.z);
            }
          });

          /** 获取、设置节点的 Z 欧拉角 */
          Object.defineProperty(Node.prototype, "angle_z", {
            get: function get() {
              return this.eulerAngles.y;
            },
            set: function set(value) {
              var self = this;
              self.setRotationFromEuler(self.eulerAngles.x, self.eulerAngles.y, value);
            }
          });

          /** 获取、设置节点的 X 坐标 */
          Object.defineProperty(Node.prototype, "x", {
            get: function get() {
              var self = this;
              return self.position.x;
            },
            set: function set(value) {
              var self = this;
              self.setPosition(value, self.position.y);
            }
          });

          /** 获取、设置节点的 Y 坐标 */
          Object.defineProperty(Node.prototype, "y", {
            get: function get() {
              var self = this;
              return self.position.y;
            },
            set: function set(value) {
              var self = this;
              self.setPosition(self.position.x, value);
            }
          });

          /** 获取、设置节点的 Z 坐标 */
          Object.defineProperty(Node.prototype, "z", {
            get: function get() {
              var self = this;
              return self.position.z;
            },
            set: function set(value) {
              var self = this;
              self.setPosition(self.position.x, self.position.y, value);
            }
          });

          /** 获取、设置节点的宽度 */
          Object.defineProperty(Node.prototype, "w", {
            configurable: true,
            get: function get() {
              var _self$getComponent$wi, _self$getComponent;
              var self = this;
              return (_self$getComponent$wi = (_self$getComponent = self.getComponent(UITransform)) == null ? void 0 : _self$getComponent.width) != null ? _self$getComponent$wi : 0;
            },
            set: function set(value) {
              var self = this;
              (self.getComponent(UITransform) || self.addComponent(UITransform)).width = value;
            }
          });

          /** 获取、设置节点的高度 */
          Object.defineProperty(Node.prototype, "h", {
            configurable: true,
            get: function get() {
              var _self$getComponent$he, _self$getComponent2;
              var self = this;
              return (_self$getComponent$he = (_self$getComponent2 = self.getComponent(UITransform)) == null ? void 0 : _self$getComponent2.height) != null ? _self$getComponent$he : 0;
            },
            set: function set(value) {
              var self = this;
              (self.getComponent(UITransform) || self.addComponent(UITransform)).height = value;
            }
          });

          /** 获取、设置节点的尺寸 */
          Object.defineProperty(Node.prototype, "size", {
            get: function get() {
              var self = this;
              var uiTransform = self.getComponent(UITransform);
              return new Size(uiTransform.width, uiTransform.height);
            },
            set: function set(value) {
              var self = this;
              var uiTransform = self.getComponent(UITransform) || self.addComponent(UITransform);
              uiTransform.width = value.width;
              uiTransform.height = value.height;
            }
          });

          /** 获取、设置节点的水平锚点 */
          Object.defineProperty(Node.prototype, "anchor_x", {
            get: function get() {
              var _self$getComponent$an, _self$getComponent3;
              var self = this;
              return (_self$getComponent$an = (_self$getComponent3 = self.getComponent(UITransform)) == null ? void 0 : _self$getComponent3.anchorX) != null ? _self$getComponent$an : 0.5;
            },
            set: function set(value) {
              var self = this;
              (self.getComponent(UITransform) || self.addComponent(UITransform)).anchorX = value;
            }
          });

          /** 获取、设置节点的垂直锚点 */
          Object.defineProperty(Node.prototype, "anchor_y", {
            get: function get() {
              var _self$getComponent$an2, _self$getComponent4;
              var self = this;
              return (_self$getComponent$an2 = (_self$getComponent4 = self.getComponent(UITransform)) == null ? void 0 : _self$getComponent4.anchorY) != null ? _self$getComponent$an2 : 0.5;
            },
            set: function set(value) {
              var self = this;
              (self.getComponent(UITransform) || self.addComponent(UITransform)).anchorY = value;
            }
          });

          /** 获取、设置节点的透明度 */
          Object.defineProperty(Node.prototype, "opacity", {
            get: function get() {
              var self = this;
              var op = self.getComponent(UIOpacity);
              if (op != null) {
                return op.opacity;
              }
              var render = self.getComponent(UIRenderer);
              if (render) {
                return render.color.a;
              }
              return 255;
            },
            set: function set(value) {
              var self = this;
              var op = self.getComponent(UIOpacity);
              if (op != null) {
                op.opacity = value;
                return;
              }
              var render = self.getComponent(UIRenderer);
              if (render) {
                // 直接通过 color.a 设置透明度会有bug，没能直接生效，需要激活节点才生效
                // (render.color.a as any) = value;

                // 创建一个颜色缓存对象，避免每次都创建新对象
                if (!this.$__color__) {
                  this.$__color__ = new Color(render.color.r, render.color.g, render.color.b, value);
                } else {
                  this.$__color__.a = value;
                }
                render.color = this.$__color__; // 设置 color 对象则可以立刻生效
              } else {
                self.addComponent(UIOpacity).opacity = value;
              }
            }
          });

          /** 获取、设置节点的颜色 */
          Object.defineProperty(Node.prototype, "color", {
            get: function get() {
              var _self$getComponent5;
              var self = this;
              return (_self$getComponent5 = self.getComponent(UIRenderer)) == null ? void 0 : _self$getComponent5.color;
            },
            set: function set(value) {
              var self = this;
              var render = self.getComponent(UIRenderer);
              render && (render.color = value);
            }
          });

          /** 获取、设置节点的 X 缩放系数 */
          Object.defineProperty(Node.prototype, "scale_x", {
            get: function get() {
              var self = this;
              return self.scale.x;
            },
            set: function set(value) {
              var self = this;
              self.scale = v3(value, self.scale.y, self.scale.z);
            }
          });

          /** 获取、设置节点的 Y 缩放系数 */
          Object.defineProperty(Node.prototype, "scale_y", {
            get: function get() {
              var self = this;
              return self.scale.y;
            },
            set: function set(value) {
              var self = this;
              self.scale = v3(self.scale.x, value, self.scale.z);
            }
          });

          /** 获取、设置节点的 Z 缩放系数 */
          Object.defineProperty(Node.prototype, "scale_z", {
            get: function get() {
              var self = this;
              return self.scale.z;
            },
            set: function set(value) {
              var self = this;
              self.scale = v3(self.scale.x, self.scale.y, value);
            }
          });
        }
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Notify.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Animation, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Animation = module.Animation;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "01391Mp6X1Gn554rkzavN4K", "Notify", undefined);
      // import { LanguageLabel } from "../../../libs/gui/language/LanguageLabel";

      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /** 滚动消息提示组件  */
      var Notify = exports('Notify', (_dec = ccclass('Notify'), _dec2 = property(Label), _dec3 = property(Animation), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Notify, _Component);
        function Notify() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "lab_content", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "animation", _descriptor2, _assertThisInitialized(_this));
          /** 提示动画完成 */
          _this.onComplete = null;
          return _this;
        }
        var _proto = Notify.prototype;
        _proto.onLoad = function onLoad() {
          if (this.animation) this.animation.on(Animation.EventType.FINISHED, this.onFinished, this);
        };
        _proto.onFinished = function onFinished() {
          this.node.destroy();
          this.onComplete && this.onComplete();
        }

        /**
         * 显示提示
         * @param msg       文本
         * @param useI18n   设置为 true 时，使用多语言功能 msg 参数为多语言 key
         */;
        _proto.toast = function toast(msg, useI18n) {
          //     let label = this.lab_content.getComponent(LanguageLabel)!;
          //     if (useI18n) {
          //         label.enabled = true;
          //         label.dataID = msg;
          //     }
          //     else {
          //         label.enabled = false;
          this.lab_content.string = msg;
          //     }
        };

        return Notify;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lab_content", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ObjectUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0448bKQYoRGLbvxhlsWjaWa", "ObjectUtil", undefined);
      /** 对象工具 */
      var ObjectUtil = exports('ObjectUtil', /*#__PURE__*/function () {
        function ObjectUtil() {}
        /**
         * 判断指定的值是否为对象
         * @param value 值
         */
        ObjectUtil.isObject = function isObject(value) {
          return Object.prototype.toString.call(value) === '[object Object]';
        }

        /**
         * 深拷贝
         * @param target 目标
         */;
        ObjectUtil.deepCopy = function deepCopy(target) {
          if (target == null || typeof target !== 'object') {
            return target;
          }
          var result = null;
          if (target instanceof Date) {
            result = new Date();
            result.setTime(target.getTime());
            return result;
          }
          if (target instanceof Array) {
            result = [];
            for (var i = 0, length = target.length; i < length; i++) {
              result[i] = this.deepCopy(target[i]);
            }
            return result;
          }
          if (target instanceof Object) {
            result = {};
            for (var key in target) {
              if (target.hasOwnProperty(key)) {
                result[key] = this.deepCopy(target[key]);
              }
            }
            return result;
          }
          console.warn("\u4E0D\u652F\u6301\u7684\u7C7B\u578B\uFF1A" + result);
        }

        /**
         * 拷贝对象
         * @param target 目标
         */;
        ObjectUtil.copy = function copy(target) {
          return JSON.parse(JSON.stringify(target));
        };
        return ObjectUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/outline.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Material, CCInteger, Sprite, Component, Color;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Material = module.Material;
      CCInteger = module.CCInteger;
      Sprite = module.Sprite;
      Component = module.Component;
      Color = module.Color;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "2c3f4+pZHxJp4pLYu63Efde", "outline", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        executeInEditMode = _decorator.executeInEditMode;
      var OutlineComponent = exports('OutlineComponent', (_dec = ccclass('OutlineComponent'), _dec2 = property({
        type: Material
      }), _dec3 = property({
        type: CCInteger,
        min: 1,
        max: 10,
        step: 1
      }), _dec(_class = executeInEditMode(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OutlineComponent, _Component);
        function OutlineComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "outlineWidth", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "outlineColor", _descriptor3, _assertThisInitialized(_this));
          _this._materialInstance = null;
          return _this;
        }
        var _proto = OutlineComponent.prototype;
        _proto.onLoad = function onLoad() {
          this.updateMaterial();
        };
        _proto.updateMaterial = function updateMaterial() {
          var sprite = this.getComponent(Sprite);
          if (sprite && this.material) {
            this._materialInstance = new Material();
            this._materialInstance.copy(this.material);
            this.updateMaterialProperties();
            sprite.customMaterial = this._materialInstance;
          }
        };
        _proto.updateMaterialProperties = function updateMaterialProperties() {
          if (this._materialInstance) {
            this._materialInstance.setProperty('outlineWidth', this.outlineWidth);
            this._materialInstance.setProperty('outlineColor', this.outlineColor);
          }
        };
        _createClass(OutlineComponent, [{
          key: "OutlineWidth",
          get: function get() {
            return this.outlineWidth;
          },
          set: function set(value) {
            this.outlineWidth = value;
            this.updateMaterialProperties();
          }
        }, {
          key: "OutlineColor",
          get: function get() {
            return this.outlineColor;
          },
          set: function set(value) {
            this.outlineColor = value;
            this.updateMaterialProperties();
          }
        }]);
        return OutlineComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "outlineWidth", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "outlineColor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(0, 0, 0, 255);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "OutlineWidth", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "OutlineWidth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "OutlineColor", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "OutlineColor"), _class2.prototype)), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatformUtil.ts", ['cc'], function (exports) {
  var cclegacy, native, sys;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      native = module.native;
      sys = module.sys;
    }],
    execute: function () {
      cclegacy._RF.push({}, "403e0/0zrxDfKhZhaLYipBP", "PlatformUtil", undefined);

      /** 平台数据 */
      var PlatformUtil = exports('PlatformUtil', /*#__PURE__*/function () {
        function PlatformUtil() {}
        /** 是否为安卓系统 */
        PlatformUtil.isNativeAndroid = function isNativeAndroid() {
          if (typeof native == "undefined") return false;
          if (sys.isNative && sys.platform === sys.Platform.ANDROID) return true;
          return false;
        }

        /** 是否为苹果系统 */;
        PlatformUtil.isNativeIOS = function isNativeIOS() {
          if (typeof native == "undefined") return false;
          if (sys.isNative && sys.os === sys.OS.IOS) return true;
          return false;
        }

        /** 获取平台名 */;
        PlatformUtil.getPlateform = function getPlateform() {
          if (this.isNativeAndroid()) return 'android';else if (this.isNativeIOS()) return 'ios';else return 'h5';
        }

        // static isIOSWebview() {
        //     //@ts-ignore
        //     if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sdkLoginOut)
        //         return true
        //     else
        //         return false
        // }
        ;

        return PlatformUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/player_model.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts', './IModel.ts', './battle_model.ts', './bag_model.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _createClass, cclegacy, warn, hope, ModelDecorator, AbstractModel, COLUMN_NUM, ROW_NUM, CELL_TID_GOLD, CELL_TID_DIAMOND, CELL_TID_POWER;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      ModelDecorator = module.ModelDecorator;
      AbstractModel = module.AbstractModel;
    }, function (module) {
      COLUMN_NUM = module.COLUMN_NUM;
      ROW_NUM = module.ROW_NUM;
    }, function (module) {
      CELL_TID_GOLD = module.CELL_TID_GOLD;
      CELL_TID_DIAMOND = module.CELL_TID_DIAMOND;
      CELL_TID_POWER = module.CELL_TID_POWER;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "dbbd5s7u0pEya3W6y1bIcPI", "player_model", undefined);
      var PLAYER_KEY = "player-key";
      var PlayerModel = exports('PlayerModel', (_dec = ModelDecorator('PlayerModel'), _dec(_class = /*#__PURE__*/function (_AbstractModel) {
        _inheritsLoose(PlayerModel, _AbstractModel);
        function PlayerModel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AbstractModel.call.apply(_AbstractModel, [this].concat(args)) || this;
          // 服务器给的完整数据
          _this._player = void 0;
          _this._cumulativeExp = null;
          return _this;
        }
        var _proto = PlayerModel.prototype;
        _proto.OnInit = function OnInit() {
          this.data = hope.storage.getJson(PLAYER_KEY, null);
          if (!this.data) {
            this.data = {
              exp: 0,
              grid: this.initGridData(),
              mission: this.initMissionData(),
              bag: this.initBagData()
            };
          }
          warn(this.data);
        };
        _proto.save = function save() {
          hope.storage.set(PLAYER_KEY, this.data);
        };
        _proto.clear = function clear() {
          hope.storage.remove(PLAYER_KEY);
        }

        // 初始化战斗布局
        ;

        _proto.initGridData = function initGridData() {
          var mapCells = new Array(COLUMN_NUM * ROW_NUM);
          var idx = 0;
          for (var y = 0; y < ROW_NUM; y++) {
            for (var x = 0; x < COLUMN_NUM; x++) {
              var tbIdx = Number("" + (x + 1) + (y + 1));
              var tb = hope.config.tables.TbInitMap.get(tbIdx);
              var cellData = {
                x: x,
                y: y,
                cellId: tb.cell
              };
              cellData.active = tb.active;
              cellData.ground = tb.ground;
              mapCells[idx++] = cellData;
            }
          }
          return mapCells;
        }

        // 初始化任务
        ;

        _proto.initMissionData = function initMissionData() {
          return {
            mapDoing: [],
            mapDoneTIds: [],
            doing: [],
            doneTIds: []
          };
        };
        _proto.initBagData = function initBagData() {
          return {
            normalStoreOpenIndex: hope.config.tables.TbConfig.defaultNormalStoreOpen,
            otherStore: [{
              cellId: CELL_TID_GOLD,
              count: hope.config.tables.TbConfig.defaultGold
              // count: 10
            }, {
              cellId: CELL_TID_DIAMOND,
              count: hope.config.tables.TbConfig.defaultDiamond
            }, {
              cellId: CELL_TID_POWER,
              count: hope.config.tables.TbConfig.defaultPower
            }],
            normalStore: [],
            factoryStore: [],
            materialStore: [],
            rewardStore: []
          };
        };
        // 定义一个通用的函数来获取随机ID
        _proto.getRandomIdFromChances = function getRandomIdFromChances(chances, totalProbability) {
          // 计算总概率，如果没有传入totalProbability，则使用chances中的总和
          var totalProb = totalProbability != null ? totalProbability : chances.reduce(function (sum, chance) {
            return sum + chance.chance;
          }, 0);

          // 如果总概率为0，直接返回null
          if (totalProb === 0) {
            warn("totalProbability is 0");
            return null;
          }

          // 生成一个随机数
          var randomValue = Math.random() * totalProb;
          var cumulativeProbability = 0;

          // 选择对应的id
          for (var _iterator = _createForOfIteratorHelperLoose(chances), _step; !(_step = _iterator()).done;) {
            var chance = _step.value;
            cumulativeProbability += chance.chance;
            if (randomValue <= cumulativeProbability) {
              // chance有count就返回count否则返回0
              return {
                id: chance.id,
                tId: chance.id,
                count: chance.count ? chance.count : 0
              };
            }
          }

          // 如果没有匹配的ID，返回null
          return null;
        };
        _createClass(PlayerModel, [{
          key: "data",
          get: function get() {
            return this._player;
          },
          set: function set(newPlayer) {
            this._player = newPlayer;
          }
        }, {
          key: "levelInfo",
          get:
          // 缓存，用于存储预计算的累计经验

          function get() {
            var exp = this.data.exp;
            // warn('exp:---', exp)
            var levelData = hope.config.tables.TbLevelup.getDataList();
            var totalLevels = levelData.length;

            // 如果累计经验未计算过，则进行预计算
            if (!this._cumulativeExp) {
              this._cumulativeExp = [];
              var cumulative = 0;
              for (var i = 0; i < totalLevels; i++) {
                cumulative += levelData[i].exp;
                this._cumulativeExp.push(cumulative);
              }
            }
            for (var _i = 0; _i < totalLevels; _i++) {
              if (exp < this._cumulativeExp[_i]) {
                var currentLevel = _i;
                var currentExp = exp - (_i > 0 ? this._cumulativeExp[_i - 1] : 0); // 当前等级的经验值

                // 计算下一级需要的经验值，即当前级别的升级所需经验
                var nextLevelExp = levelData[_i].exp;
                return {
                  level: currentLevel,
                  currentExp: currentExp,
                  nextLevelExp: nextLevelExp
                };
              }
            }

            // 如果累计经验达到或超过所有等级所需的累计经验，返回最高等级
            return {
              level: totalLevels,
              currentExp: exp - this._cumulativeExp[totalLevels - 1],
              nextLevelExp: 0
            };
          }
        }]);
        return PlayerModel;
      }(AbstractModel)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RegexUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fbcdbGedZVOyKPmmas8Td+5", "RegexUtil", undefined);
      /** 正则工具 */
      var RegexUtil = exports('RegexUtil', /*#__PURE__*/function () {
        function RegexUtil() {}
        /**
         * 判断字符是否为双字节字符（如中文字符）
         * @param string 原字符串
         */
        RegexUtil.isDoubleWord = function isDoubleWord(string) {
          return /[^\x00-\xff]/.test(string);
        };
        return RegexUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RenderAlternative.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RenderReactiveHandler.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, director, sys, UIOpacity, instantiate, UITransform, UIRenderer, Component, RenderReactiveHandler;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      director = module.director;
      sys = module.sys;
      UIOpacity = module.UIOpacity;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      UIRenderer = module.UIRenderer;
      Component = module.Component;
    }, function (module) {
      RenderReactiveHandler = module.RenderReactiveHandler;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3;
      cclegacy._RF.push({}, "463bde4unVICo3Wix7DM9J8", "RenderAlternative", undefined);

      /**
       * 目前该渲染代理功能存在的问题
       * 1.被代理节点的父级不能出现scaleX和scaleY不一致的情况，被代理节点本身没有这个限制
       */
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RenderAlternative = exports('default', (_dec = property(Node), _dec2 = property({
        tooltip: '设置同步的间隔(秒为单位)，0就是每帧都同步，0.1就是隔0.1秒同步一次'
      }), ccclass(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RenderAlternative, _Component);
        function RenderAlternative() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /**渲染层节点 */
          _initializerDefineProperty(_this, "renderLayer", _descriptor, _assertThisInitialized(_this));
          /**渲染的zIndex */
          _initializerDefineProperty(_this, "renderZIndex", _descriptor2, _assertThisInitialized(_this));
          /**同步的间隔（帧为单位） */
          _initializerDefineProperty(_this, "syncInv", _descriptor3, _assertThisInitialized(_this));
          /**渲染的sIndex */
          _this.sIndex = 0;
          /**非渲染组件 */
          _this.proxyRender = null;
          /**渲染组件 */
          _this.renderCompnent = null;
          /**渲染节点的ui控件 */
          _this.renderUiTrans = null;
          /**ui控件 */
          _this.uiTrans = null;
          /**上次更新的数据 */
          _this.lastWMat4 = null;
          /**上次更新的数据 */
          _this.lastLMat4 = null;
          /**上次更新的数据 */
          _this.lastPos = null;
          /**距离下次刷新累计了多少间隔 */
          _this.accuTime = 0;
          /**最后一次刷新时间 */
          _this.lastFrameTime = null;
          /**是否进行刷新 */
          _this.isAttachFrame = false;
          return _this;
        }
        RenderAlternative.isDirty = function isDirty(renderLayer) {
          return this._isDirty.has(renderLayer) ? this._isDirty.get(renderLayer) : false;
        };
        RenderAlternative.setDirty = function setDirty(renderLayer) {
          if (renderLayer && !this.isDirty(renderLayer)) {
            this._isDirty.set(renderLayer, true);
            this.sortOnce(renderLayer);
          }
        };
        RenderAlternative.sortOnce = function sortOnce(renderLayer) {
          var _this2 = this;
          requestAnimationFrame(function () {
            renderLayer.children.sort(_this2.sortChildren);
            _this2._isDirty.set(renderLayer, false);
          });
        };
        RenderAlternative.sortChildren = function sortChildren(a, b) {
          //@ts-ignore
          return a._rZIndex - b._rZIndex;
        };
        var _proto = RenderAlternative.prototype;
        /**
         * 设置渲染节点层
         * @param layer
         */
        _proto.init = function init(layer) {
          if (layer) {
            this.renderLayer = layer;
          }
          if (!this.renderLayer) {
            console.warn("\u8282\u70B9" + this.node.name + "\u6CA1\u6709\u8BBE\u7F6E\u6E32\u67D3\u5C42");
            return null;
          }
          return this.initRender();
        }

        /**
         * 初始化渲染节点
         */;
        _proto.initRender = function initRender() {
          var node = this.getRender();
          node.setParent(this.renderLayer ? this.renderLayer : director.getScene().getChildByName("Canvas"));
          this.isAttachFrame = true;
          requestAnimationFrame(this.frameUpdate.bind(this));
          return this.doProxy();
        }

        /**生成代理 */;
        _proto.doProxy = function doProxy() {
          this.proxyRender = new Proxy(this.renderCompnent, new RenderReactiveHandler());
          return this.proxyRender;
        };
        _proto.frameUpdate = function frameUpdate() {
          var now = sys.now();
          !this.lastFrameTime && (this.lastFrameTime = now);
          var dt = now - this.lastFrameTime;
          if (this.proxyRender) {
            this.accuTime += dt;
            if (this.accuTime >= this.syncInv) {
              this.accuTime -= this.syncInv;
              this.updateProp();
            }
          }
          if (this.isAttachFrame) {
            requestAnimationFrame(this.frameUpdate.bind(this));
          }
        }

        /**更新最新状态 */;
        _proto.updateProp = function updateProp() {
          var _this$node$matrix;
          var node = this.renderCompnent.node;
          var uiTrans = this.renderUiTrans;
          if (!this.node.activeInHierarchy) {
            node.active = false;
            return;
          }
          node.active = true;
          uiTrans.anchorX = this.uiTrans.anchorX;
          uiTrans.anchorY = this.uiTrans.anchorY;
          uiTrans.width = this.uiTrans.width;
          uiTrans.height = this.uiTrans.height;
          node.layer = this.node.layer;
          var opacity = this.getOpacity(this.node);
          if (opacity != 255) {
            var uiOpacity = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
            uiOpacity.opacity = opacity;
          }
          var wMat4 = this.node.worldMatrix.clone();
          var lMat4 = (_this$node$matrix = this.node.matrix) == null ? void 0 : _this$node$matrix.clone();
          //此处本可以过滤许多不必要的更新，但尚未排查出问题
          {
            this.onAngleChange();
            this.onScaleChange();
            this.onPosChange();
            this.lastLMat4 = lMat4;
            this.lastWMat4 = wMat4;
          }
          //@ts-ignore
          node._rZIndex = this.zIndex;
          RenderAlternative.setDirty(this.renderLayer);
        };
        _proto.onDestroy = function onDestroy() {
          this.renderCompnent.node.destroy();
          this.renderCompnent = null;
          this.proxyRender = null;
        }

        /**
         * 获取节点透明度
         * @param node
         */;
        _proto.getOpacity = function getOpacity(node) {
          var _node$getComponent;
          var opacity = (((_node$getComponent = node.getComponent(UIOpacity)) == null ? void 0 : _node$getComponent.opacity) || 255) / 255;
          var parentNode = node.parent;
          while (parentNode != this.renderLayer.parent && parentNode != director.getScene()) {
            var _parentNode$getCompon;
            opacity *= (((_parentNode$getCompon = parentNode.getComponent(UIOpacity)) == null ? void 0 : _parentNode$getCompon.opacity) || 255) / 255;
            parentNode = parentNode.parent;
          }
          return opacity * 255;
        }

        /**位置变化处理 */;
        _proto.onPosChange = function onPosChange() {
          this.renderCompnent.node.worldPosition = this.node.worldPosition.clone();
        }

        /**旋转变化处理 */;
        _proto.onAngleChange = function onAngleChange() {
          this.renderCompnent.node.worldRotation = this.node.worldRotation.clone();
        }

        /**缩放变化处理 */;
        _proto.onScaleChange = function onScaleChange() {
          this.renderCompnent.node.worldScale = this.node.worldScale.clone();
        }

        /**
         * 获取渲染组件
         * @param node
         */;
        _proto.getRender = function getRender() {
          var node = instantiate(this.node);
          node.removeAllChildren();
          this.uiTrans = this.node.getComponent(UITransform);
          this.renderUiTrans = node.getComponent(UITransform);
          this.renderCompnent = node.getComponent(UIRenderer);
          this.node.getComponent(UIRenderer).destroy();
          for (var i = 0, len = node.components.length; i < len; ++i) {
            var comp = node.components[i];
            if (!(comp instanceof UIRenderer || comp instanceof UITransform)) {
              comp.destroy();
            }
          }
          return node;
        };
        _createClass(RenderAlternative, [{
          key: "zIndex",
          get: /**获取总的ZIndex */
          function get() {
            var zIndex = this.renderZIndex + this.sIndex * 0.01;
            var parentNode = this.node.parent;
            while (parentNode != ((_this$renderLayer = this.renderLayer) == null ? void 0 : _this$renderLayer.parent) && parentNode != director.getScene()) {
              var _this$renderLayer;
              var render = parentNode.getComponent(RenderAlternative);
              if (render) {
                zIndex += render.zIndex + 1;
                break;
              }
              parentNode = parentNode.parent;
            }
            return zIndex;
          }
        }]);
        return RenderAlternative;
      }(Component), _class3._isDirty = new WeakMap(), _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderLayer", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "renderZIndex", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "syncInv", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.01;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RenderReactiveHandler.ts", ['cc'], function (exports) {
  var cclegacy, Component;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
    }],
    execute: function () {
      exports({
        hasChanged: hasChanged,
        hasOwn: hasOwn,
        isObject: isObject
      });
      cclegacy._RF.push({}, "e07f3vvCO9I86tK3C8QN3Xe", "RenderReactiveHandler", undefined);
      function isObject(value) {
        return value !== null && typeof value === 'object';
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;

      /** 是否自身上存在属性 */
      function hasOwn(val, key) {
        if (val instanceof Component) {
          return key in val;
        }
        return hasOwnProperty.call(val, key);
      }

      /** 比较值是否变化了，考虑NaN；如果是对象直接认为改变了 */
      function hasChanged(value, oldValue) {
        var type = typeof value;
        if (type === "object") return true;
        return !Object.is(value, oldValue);
      }
      var RenderReactiveHandler = exports('RenderReactiveHandler', /*#__PURE__*/function () {
        function RenderReactiveHandler(reactiveTarget) {
          /**需要作出反应的对象 */
          this.reactiveTarget = null;
          this.reactiveTarget = reactiveTarget;
        }
        var _proto = RenderReactiveHandler.prototype;
        /**
         *
         * @param target 被代理的对象
         * @param prop 被代理的对象的属性名
         * @param value 被代理的对象的属性值
         * @param receiver 代理对象
         * @returns
         */
        _proto.set = function set(target, prop, value, receiver) {
          var oldValue = Reflect.get(target, prop);
          var hadKey = hasOwn(target, prop);
          var result = Reflect.set(target, prop, value);
          if (!hadKey || hasChanged(value, oldValue)) {
            if (prop == "angle" || prop == 'scale' || prop == "position" || prop == "_renderFlag") return;
            if (prop == 'activeInHierarchy') {
              console.warn(target);
            }
            // 属性变化
            this.reactiveTarget && Reflect.set(this.reactiveTarget, prop, value);
          }
          return result;
        };
        _proto.apply = function apply() {
          console.warn(arguments);
        };
        _proto.get = function get(target, prop, receiver) {
          if (prop === '__raw__') {
            return target;
          } else if (prop === '__isReactive__') {
            return true;
          }
          var rawValue = Reflect.get(target, prop);
          return rawValue;
        };
        _proto.deleteProperty = function deleteProperty(target, prop) {
          var hadKey = hasOwn(target, prop);
          var oldValue = target[prop];
          var result = Reflect.deleteProperty(target, prop);
          return result;
        };
        return RenderReactiveHandler;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResLoader.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, assetManager, error, warn, Asset, js, resources, instantiate, Prefab, AudioClip, SpriteFrame, Texture2D, hope;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      assetManager = module.assetManager;
      error = module.error;
      warn = module.warn;
      Asset = module.Asset;
      js = module.js;
      resources = module.resources;
      instantiate = module.instantiate;
      Prefab = module.Prefab;
      AudioClip = module.AudioClip;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      cclegacy._RF.push({}, "00c65grRa5NNZcXPXWNseXg", "ResLoader", undefined);

      // (error: Error | null, asset: T) => void;  (error: Error | null, asset: T[], urls: string[]) => void;

      /**
       * 游戏资管理
       * 1、加载默认resources文件夹中资源
       * 2、加载默认bundle远程资源
       * 3、主动传递bundle名时，优先加载传递bundle名资源包中的资源
       */
      var ResLoader = exports('ResLoader', /*#__PURE__*/function () {
        function ResLoader() {
          /** 全局默认加载的资源包名 */
          this.defaultBundleName = "resources";
        }
        var _proto = ResLoader.prototype;
        _proto.loadRemote = function loadRemote(url) {
          var options = null;
          var onComplete = null;
          if ((arguments.length <= 1 ? 0 : arguments.length - 1) == 2) {
            options = arguments.length <= 1 ? undefined : arguments[1];
            onComplete = arguments.length <= 2 ? undefined : arguments[2];
          } else {
            onComplete = arguments.length <= 1 ? undefined : arguments[1];
          }
          assetManager.loadRemote(url, options, onComplete);
        }

        /**
         * 加载资源包
         * @param url       资源地址
         * @param complete  完成事件
         * @param v         资源MD5版本号
         * @example
         var serverUrl = "http://192.168.1.8:8080/";         // 服务器地址
         var md5 = "8e5c0";                                  // Cocos Creator 构建后的MD5字符
         await oops.res.loadBundle(serverUrl,md5);
         */;
        _proto.loadBundle = function loadBundle(url, v) {
          return new Promise(function (resolve, reject) {
            assetManager.loadBundle(url, {
              version: v
            }, function (err, bundle) {
              if (err) {
                return error(err);
              }
              resolve(bundle);
            });
          });
        }

        /**
         * 加载一个资源
         * @param bundleName    远程包名
         * @param paths         资源路径
         * @param type          资源类型
         * @param onProgress    加载进度回调
         * @param onComplete    加载完成回调
         * @example
         oops.res.load("spine_path", sp.SkeletonData, (err: Error | null, sd: sp.SkeletonData) => {
          });
         */;
        _proto.load = function load(bundleName, paths, type, onProgress, onComplete) {
          var args = null;
          if (typeof paths === "string" || paths instanceof Array) {
            args = this.parseLoadResArgs(paths, type, onProgress, onComplete);
            args.bundle = bundleName;
          } else {
            args = this.parseLoadResArgs(bundleName, paths, type, onProgress);
            args.bundle = this.defaultBundleName;
          }
          this.loadByArgs(args);
        };
        _proto.loadAsync = function loadAsync(bundleName, paths, type) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            _this.load(bundleName, paths, type, function (err, asset) {
              if (err) {
                warn(err.message);
              }
              resolve(asset);
            });
          });
        }

        /**
         * 加载文件夹中的资源
         * @param bundleName    远程包名
         * @param dir           文件夹名
         * @param type          资源类型
         * @param onProgress    加载进度回调
         * @param onComplete    加载完成回调
         * @example
         // 加载进度事件
         var onProgressCallback = (finished: number, total: number, item: any) => {
         console.log("资源加载进度", finished, total);
         }
          // 加载完成事件
         var onCompleteCallback = () => {
         console.log("资源加载完成");
         }
         oops.res.loadDir("game", onProgressCallback, onCompleteCallback);
         */;
        _proto.loadDir = function loadDir(bundleName, dir, type, onProgress, onComplete) {
          var args = null;
          if (typeof dir === "string") {
            args = this.parseLoadResArgs(dir, type, onProgress, onComplete);
            args.bundle = bundleName;
          } else {
            args = this.parseLoadResArgs(bundleName, dir, type, onProgress);
            args.bundle = this.defaultBundleName;
          }
          args.dir = args.paths;
          this.loadByArgs(args);
        }

        /**
         * 通过资源相对路径释放资源
         * @param path          资源路径
         * @param bundleName    远程资源包名
         */;
        _proto.release = function release(path, bundleName) {
          if (bundleName == null) bundleName = this.defaultBundleName;
          var bundle = assetManager.getBundle(bundleName);
          if (bundle) {
            var asset = bundle.get(path);
            if (asset) {
              this.releasePrefabtDepsRecursively(asset);
            }
          }
        }

        /**
         * 通过相对文件夹路径删除所有文件夹中资源
         * @param path          资源文件夹路径
         * @param bundleName    远程资源包名
         */;
        _proto.releaseDir = function releaseDir(path, bundleName) {
          var _this2 = this;
          if (bundleName == null) bundleName = this.defaultBundleName;
          var bundle = assetManager.getBundle(bundleName);
          if (bundle) {
            var infos = bundle.getDirWithPath(path);
            if (infos) {
              infos.map(function (info) {
                _this2.releasePrefabtDepsRecursively(info.uuid);
              });
            }
            if (path == "" && bundleName != "resources") {
              assetManager.removeBundle(bundle);
            }
          }
        }

        /** 释放预制依赖资源 */;
        _proto.releasePrefabtDepsRecursively = function releasePrefabtDepsRecursively(uuid) {
          if (uuid instanceof Asset) {
            uuid.decRef();
            // assetManager.releaseAsset(uuid);
          } else {
            var asset = assetManager.assets.get(uuid);
            if (asset) {
              asset.decRef();
              // assetManager.releaseAsset(asset);
            }
          }

          // Cocos引擎内部已处理子关联资源的释放
          // if (asset instanceof Prefab) {
          //     var uuids: string[] = assetManager.dependUtil.getDepsRecursively(uuid)!;
          //     uuids.forEach(uuid => {
          //         var asset = assetManager.assets.get(uuid)!;
          //         asset.decRef();
          //     });
          // }
        }

        /**
         * 获取资源
         * @param path          资源路径
         * @param type          资源类型
         * @param bundleName    远程资源包名
         */;
        _proto.get = function get(path, type, bundleName) {
          if (bundleName == null) bundleName = this.defaultBundleName;
          var bundle = assetManager.getBundle(bundleName);
          return bundle.get(path, type);
        }

        /** 打印缓存中所有资源信息 */;
        _proto.dump = function dump() {
          assetManager.assets.forEach(function (value, key) {
            console.log(assetManager.assets.get(key));
          });
          console.log("\u5F53\u524D\u8D44\u6E90\u603B\u6570:" + assetManager.assets.count);
        };
        _proto.parseLoadResArgs = function parseLoadResArgs(paths, type, onProgress, onComplete) {
          var pathsOut = paths;
          var typeOut = type;
          var onProgressOut = onProgress;
          var onCompleteOut = onComplete;
          if (onComplete === undefined) {
            var isValidType = js.isChildClassOf(type, Asset);
            if (onProgress) {
              onCompleteOut = onProgress;
              if (isValidType) {
                onProgressOut = null;
              }
            } else if (onProgress === undefined && !isValidType) {
              onCompleteOut = type;
              onProgressOut = null;
              typeOut = null;
            }
            if (onProgress !== undefined && !isValidType) {
              onProgressOut = type;
              typeOut = null;
            }
          }
          return {
            paths: pathsOut,
            type: typeOut,
            onProgress: onProgressOut,
            onComplete: onCompleteOut
          };
        };
        _proto.loadByBundleAndArgs = function loadByBundleAndArgs(bundle, args) {
          if (args.dir) {
            bundle.loadDir(args.paths, args.type, args.onProgress, args.onComplete);
          } else {
            if (typeof args.paths == 'string') {
              bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            } else {
              bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
          }
        };
        _proto.loadByArgs = function loadByArgs(args) {
          var _this3 = this;
          if (args.bundle) {
            if (assetManager.bundles.has(args.bundle)) {
              var bundle = assetManager.bundles.get(args.bundle);
              this.loadByBundleAndArgs(bundle, args);
            } else {
              // 自动加载bundle
              assetManager.loadBundle(args.bundle, function (err, bundle) {
                if (!err) {
                  _this3.loadByBundleAndArgs(bundle, args);
                }
              });
            }
          } else {
            this.loadByBundleAndArgs(resources, args);
          }
        };
        _proto.instantiate = function instantiate$1(original) {
          if (!original) {
            error("[Res.instantiate] original is null");
            return null;
          }
          var node = instantiate(original);
          return node;
        }

        /**
         * 加载指定类型资源
         * @param bundleName 外部资源包名
         * @param assetName  目标加载资源名
         */;
        _proto.loadAsset = function loadAsset(assetName, assetType, bundleName) {
          if (bundleName === void 0) {
            bundleName = hope.res.defaultBundleName;
          }
          var url = assetName;
          // 兼容3.x ,加载 SpriteFrame 路径需要添加后缀
          if (assetType === SpriteFrame) {
            url += "/spriteFrame";
          } else if (assetType === Texture2D) {
            url += "/texture";
          }
          return new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  hope.res.load(bundleName, url, function (err, res) {
                    if (!err) {
                      // 加载成功
                      resolve(res);
                    } else {
                      //加载失败
                      warn("\u5916\u90E8\u8D44\u6E90\u5305" + bundleName + "\uFF0C\u8DEF\u5F84" + url + ",\u52A0\u8F7D\u5931\u8D25", err);
                      resolve(null);
                    }
                  });
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
        }

        /**
         * 加载预制体
         * @param bundleName ab包名（模块名）
         * @param assetName 资源名
         */;
        _proto.loadPrefab = function loadPrefab(assetName, bundleName) {
          return this.loadAsset(assetName, Prefab, bundleName);
        }

        /**
         * 加载音频
         * @param bundleName ab包名（模块名）
         * @param assetName 资源名
         */;
        _proto.loadAudio = function loadAudio(assetName, bundleName) {
          return this.loadAsset(assetName, AudioClip, bundleName);
        }

        /**
         * 加载图片
         * @param bundleName ab包名（模块名）
         * @param assetName 资源名
         */;
        _proto.loadTexture = /*#__PURE__*/
        function () {
          var _loadTexture = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(assetName, bundleName) {
            var result;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.loadAsset(assetName, SpriteFrame, bundleName);
                case 2:
                  result = _context2.sent;
                  if (!(result == null)) {
                    _context2.next = 7;
                    break;
                  }
                  _context2.next = 6;
                  return this.loadAsset("common/texture/outside", SpriteFrame, bundleName);
                case 6:
                  result = _context2.sent;
                case 7:
                  return _context2.abrupt("return", result);
                case 8:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function loadTexture(_x3, _x4) {
            return _loadTexture.apply(this, arguments);
          }
          return loadTexture;
        }()
        /**
         * 通过资源相对路径释放资源
         * @param bundleName     ab包名（模块名）
         * @param assetName      资源名
         */;

        _proto.releaseAsset = function releaseAsset(assetName, assetType, bundleName) {
          var url = assetName;
          // 兼容3.x ,加载 SpriteFrame 路径需要添加后缀
          if (assetType === SpriteFrame) {
            url += "/spriteFrame";
          } else if (assetType === Texture2D) {
            url += "/texture";
          }
          hope.res.release(url, bundleName);
        };
        return ResLoader;
      }());
      var resLoader = exports('resLoader', new ResLoader());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResSpine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, sp, Component, hope;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Component = module.Component;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "099f5/Yt2NPPp8tUGIAlAxf", "ResSpine", undefined);
      var menu = _decorator.menu,
        disallowMultiple = _decorator.disallowMultiple,
        requireComponent = _decorator.requireComponent,
        ccclass = _decorator.ccclass;

      /**
       * spine组件，自动管理资源的引用计数
       */
      var ResSpine = exports('default', (_dec = requireComponent(sp.Skeleton), _dec2 = menu("Framework/UI组件/ResSpine"), ccclass(_class = disallowMultiple(_class = _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ResSpine, _Component);
        function ResSpine() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // 动态加载的资源
          _this._asset = null;
          _this._url = "";
          _this._spine = null;
          return _this;
        }
        var _proto = ResSpine.prototype;
        _proto.onDestroy = function onDestroy() {
          var _this$_asset;
          (_this$_asset = this._asset) == null || _this$_asset.decRef();
        }

        /**
         * 设置skeletonData
         * @param url 骨骼资源路径，规则同Res加载路径
         */;
        _proto.setSkeletonData = /*#__PURE__*/
        function () {
          var _setSkeletonData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
            var result;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this._url = url;
                  _context.t0 = hope.res.get(url, sp.SkeletonData);
                  if (_context.t0) {
                    _context.next = 6;
                    break;
                  }
                  _context.next = 5;
                  return hope.res.loadAsync(url, sp.SkeletonData);
                case 5:
                  _context.t0 = _context.sent;
                case 6:
                  result = _context.t0;
                  // 如短时间内多次调用，需保证使用最后一次加载的资源
                  if (result instanceof sp.SkeletonData && this._url === url) {
                    this.skeletonData = result;
                  }
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function setSkeletonData(_x) {
            return _setSkeletonData.apply(this, arguments);
          }
          return setSkeletonData;
        }();
        _createClass(ResSpine, [{
          key: "spine",
          get: function get() {
            if (!this._spine) {
              this._spine = this.getComponent(sp.Skeleton);
            }
            return this._spine;
          }
        }, {
          key: "skeletonData",
          get: function get() {
            return this.spine.skeletonData;
          },
          set: function set(v) {
            var _this$_asset2;
            if (!this.isValid || this.spine.skeletonData === v) {
              return;
            }
            v == null || v.addRef();
            (_this$_asset2 = this._asset) == null || _this$_asset2.decRef();
            this._asset = v;
            this.spine.skeletonData = v;
          }
        }]);
        return ResSpine;
      }(Component)) || _class) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResSprite.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Sprite, Component, hope;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "2de00SI9QBBUZu5dD6uBNH8", "ResSprite", undefined);
      var menu = _decorator.menu,
        disallowMultiple = _decorator.disallowMultiple,
        requireComponent = _decorator.requireComponent,
        ccclass = _decorator.ccclass;

      /**
       * 精灵组件，自动管理资源的引用计数
       */
      var ResSprite = exports('default', (_dec = requireComponent(Sprite), _dec2 = menu("Framework/UI组件/ResSprite"), ccclass(_class = disallowMultiple(_class = _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ResSprite, _Component);
        function ResSprite() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // 动态加载的资源
          _this._asset = null;
          _this._sprite = null;
          return _this;
        }
        var _proto = ResSprite.prototype;
        _proto.onDestroy = function onDestroy() {
          var _this$_asset;
          (_this$_asset = this._asset) == null || _this$_asset.decRef();
        }

        /**
         * 加载并设置spriteFrame
         * @param url 图片或图集路径，规则同Res加载路径
         * @param key 如果需要加载的url为图集时，需传入图集的key
         */;
        _proto.setSpriteFrame = /*#__PURE__*/
        function () {
          var _setSpriteFrame = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
            var result;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return hope.res.loadTexture(url);
                case 2:
                  result = _context.sent;
                  this.spriteFrame = result;
                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function setSpriteFrame(_x) {
            return _setSpriteFrame.apply(this, arguments);
          }
          return setSpriteFrame;
        }();
        ResSprite.replaceSpriteFrame = /*#__PURE__*/function () {
          var _replaceSpriteFrame = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(node, url) {
            var autoRes;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  autoRes = node.getComponent(ResSprite);
                  if (!autoRes) {
                    autoRes = node.addComponent(ResSprite);
                  }
                  _context2.next = 4;
                  return autoRes.setSpriteFrame(url);
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function replaceSpriteFrame(_x2, _x3) {
            return _replaceSpriteFrame.apply(this, arguments);
          }
          return replaceSpriteFrame;
        }();
        _createClass(ResSprite, [{
          key: "sprite",
          get: function get() {
            if (!this._sprite) {
              this._sprite = this.getComponent(Sprite);
            }
            return this._sprite;
          }
        }, {
          key: "spriteFrame",
          get: function get() {
            return this.sprite.spriteFrame;
          },
          set: function set(v) {
            var _this$_asset2;
            if (!this.isValid || this.sprite.spriteFrame === v) {
              return;
            }
            v == null || v.addRef();
            // 同一个再次被替换先释放之前的
            (_this$_asset2 = this._asset) == null || _this$_asset2.decRef();
            this._asset = v;
            this.sprite.spriteFrame = v;
          }
        }]);
        return ResSprite;
      }(Component)) || _class) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/root_game.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Root.ts', './Hope.ts', './config_game_ui.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, profiler, Root, hope, UIConfigData, UIID;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      profiler = module.profiler;
    }, function (module) {
      Root = module.Root;
    }, function (module) {
      hope = module.hope;
    }, function (module) {
      UIConfigData = module.UIConfigData;
      UIID = module.UIID;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "85d5bSW1KJLspxaOeFAbC3/", "root_game", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RootGame = exports('RootGame', (_dec = ccclass('RootGame'), _dec(_class = /*#__PURE__*/function (_Root) {
        _inheritsLoose(RootGame, _Root);
        function RootGame() {
          return _Root.apply(this, arguments) || this;
        }
        var _proto = RootGame.prototype;
        _proto.initGui = function initGui() {
          hope.res.loadDir("common");
          hope.gui.init(UIConfigData);
          hope.gui.open(UIID.Map);

          // 性能信息
          profiler.hideStats();
        };
        return RootGame;
      }(Root)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Root.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts', './GUI.ts', './EventMessage.ts', './schema.ts', './LayerManager.ts', './TimerManager.ts', './AudioManager.ts', './StorageManager.ts', './MessageManager.ts', './ResLoader.ts', './GameQueryConfig.ts', './GameConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, game, Game, sys, screen, director, warn, log, Component, JsonAsset, version, hope, GUI, EventMessage, Tables, LayerManager, TimerManager, AudioManager, StorageManager, message, resLoader, GameQueryConfig, GameConfig;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      game = module.game;
      Game = module.Game;
      sys = module.sys;
      screen = module.screen;
      director = module.director;
      warn = module.warn;
      log = module.log;
      Component = module.Component;
      JsonAsset = module.JsonAsset;
    }, function (module) {
      version = module.version;
      hope = module.hope;
    }, function (module) {
      GUI = module.GUI;
    }, function (module) {
      EventMessage = module.EventMessage;
    }, function (module) {
      Tables = module.Tables;
    }, function (module) {
      LayerManager = module.LayerManager;
    }, function (module) {
      TimerManager = module.TimerManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      message = module.message;
    }, function (module) {
      resLoader = module.resLoader;
    }, function (module) {
      GameQueryConfig = module.GameQueryConfig;
    }, function (module) {
      GameConfig = module.GameConfig;
    }],
    execute: function () {
      var _dec, _dec2, _class, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "32094/zvrxD7J8I/jCzlCkQ", "Root", undefined);
      var property = _decorator.property;
      var isInited = false;

      /** 框架显示层根节点 */
      var Root = exports('Root', (_dec = property({
        type: Node,
        tooltip: "游戏层"
      }), _dec2 = property({
        type: Node,
        tooltip: "界面层"
      }), (_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Root, _Component);
        function Root() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 游戏层节点 */
          _initializerDefineProperty(_this, "game", _descriptor, _assertThisInitialized(_this));
          // 可使用多摄像机自定义二维或三维游戏场景
          /** 界面层节点 */
          _initializerDefineProperty(_this, "gui", _descriptor2, _assertThisInitialized(_this));
          /** 持久根节点 */
          _this.persistRootNode = null;
          return _this;
        }
        var _proto = Root.prototype;
        _proto.onLoad = function onLoad() {
          if (!isInited) {
            isInited = true; // 注：这里是规避cc3.8在编辑器模式下运行时，关闭游戏会两次初始化报错

            console.log("Hope Framework v" + version);
            this.enabled = false;
            this.loadConfig();
          }
        };
        _proto.loadConfig = /*#__PURE__*/function () {
          var _loadConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var config_name, config;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // 创建持久根节点
                  this.persistRootNode = new Node("PersistRootNode");
                  director.addPersistRootNode(this.persistRootNode);

                  // 资源管理模块
                  hope.res = resLoader;
                  config_name = "config";
                  _context.next = 6;
                  return hope.res.loadAsync(config_name, JsonAsset);
                case 6:
                  config = _context.sent;
                  if (!config) {
                    _context.next = 24;
                    break;
                  }
                  hope.config.query = new GameQueryConfig();
                  hope.config.game = new GameConfig(config);

                  // 初始化鲁班配置表
                  _context.next = 12;
                  return this.loadTable();
                case 12:
                  // 本地存储模块
                  hope.storage = new StorageManager();
                  // config没有
                  // hope.storage.init(hope.config.game.localDataKey, hope.config.game.localDataIv);      // 初始化本地存储加密

                  // 全局消息
                  hope.message = message;

                  // 创建音频模块
                  hope.audio = this.persistRootNode.addComponent(AudioManager);
                  hope.audio.load();

                  // 创建时间模块
                  hope.timer = this.persistRootNode.addComponent(TimerManager);

                  // 游戏场景管理
                  // hope.game = new GameManager(this.game);

                  // 游戏界面管理
                  hope.gui = new LayerManager(this.gui);

                  // 网络模块
                  // hope.http.server = hope.config.game.httpServer;                                      // Http 服务器地址
                  // hope.http.timeout = hope.config.game.httpTimeout;                                    // Http 请求超时时间

                  // config没有
                  // game.frameRate = hope.config.game.frameRate;                                         // 初始化每秒传输帧数

                  this.enabled = true;
                  this.init();
                  this.run();
                  hope.res.release(config_name);
                  _context.next = 25;
                  break;
                case 24:
                  this.loadConfig();
                case 25:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function loadConfig() {
            return _loadConfig.apply(this, arguments);
          }
          return loadConfig;
        }();
        _proto.update = function update(dt) {
          // oops.ecs.execute(dt);
        }

        /** 初始化游戏界面 */;
        _proto.initGui = function initGui() {}

        /** 初始化游戏业务模块 */;
        _proto.initEcsSystem = function initEcsSystem() {}

        /** 加载完引擎配置文件后执行 */;
        _proto.run = function run() {};
        _proto.init = function init() {
          this.initGui();
          // this.initEcsSystem();
          // oops.ecs.init();

          // 游戏显示事件
          game.on(Game.EVENT_SHOW, this.onShow, this);
          // 游戏隐藏事件
          game.on(Game.EVENT_HIDE, this.onHide, this);

          // 添加游戏界面屏幕自适应管理组件
          this.gui.addComponent(GUI);

          // 游戏尺寸修改事件
          if (sys.isMobile == false) {
            screen.on("window-resize", function () {
              hope.message.dispatchEvent(EventMessage.GAME_RESIZE);
            }, this);
            screen.on("fullscreen-change", function () {
              hope.message.dispatchEvent(EventMessage.GAME_FULL_SCREEN);
            }, this);
          }
          screen.on("orientation-change", function () {
            hope.message.dispatchEvent(EventMessage.GAME_ORIENTATION);
          }, this);
        };
        _proto.onShow = function onShow() {
          hope.timer.load(); // 处理回到游戏时减去逝去时间
          hope.audio.resumeAll(); // 恢复所有暂停的音乐播放
          director.resume(); // 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生
          game.resume(); // 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效
          hope.message.dispatchEvent(EventMessage.GAME_SHOW);
        };
        _proto.onHide = function onHide() {
          hope.timer.save(); // 处理切到后台后记录切出时间
          hope.audio.pauseAll(); // 暂停所有音乐播放
          director.pause(); // 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。 如果想要更彻底得暂停游戏，包含渲染，音频和事件
          game.pause(); // 暂停游戏主循环。包含：游戏逻辑、渲染、输入事件派发（Web 和小游戏平台除外）
          hope.message.dispatchEvent(EventMessage.GAME_HIDE);
        }

        // 加载鲁班
        ;

        _proto.loadTable = function loadTable() {
          return new Promise(function (resolve, reject) {
            var config_table_dir = "config/table";
            hope.res.loadDir(config_table_dir, function (error, cfgs) {
              warn(cfgs, hope.res.get("config/table/item_tbitem"));

              // --json--
              // cfgs.forEach((data: JsonAsset) => {
              //     hope.config.__map_tables_json.set(data.name, data);
              // });
              // hope.config.tables = new cfg.Tables(hope.config.loaderJson.bind(hope.config));

              // --bin--
              cfgs.forEach(function (data) {
                hope.config.__map_tables_bin.set(data.name, new Uint8Array(data.buffer().slice(0, data.buffer().byteLength)));
              });
              hope.config.tables = new Tables(hope.config.loaderBin.bind(hope.config));
              log(hope.config.tables.TbConfig);
              hope.res.releaseDir(config_table_dir);
              resolve();
            });
          });
        };
        return Root;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "game", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "gui", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class)));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoundRectMask.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Mask, CCFloat, UITransform, game, Game, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Mask = module.Mask;
      CCFloat = module.CCFloat;
      UITransform = module.UITransform;
      game = module.game;
      Game = module.Game;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "da0f8CBQkZDqaekNuERqKjA", "RoundRectMask", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        executeInEditMode = _decorator.executeInEditMode,
        disallowMultiple = _decorator.disallowMultiple,
        requireComponent = _decorator.requireComponent,
        menu = _decorator.menu;
      var RoundRectMask = exports('RoundRectMask', (_dec = ccclass('RoundRectMask'), _dec2 = executeInEditMode(true), _dec3 = disallowMultiple(true), _dec4 = requireComponent(Mask), _dec5 = menu('渲染组件/圆角遮罩'), _dec6 = property({
        type: CCFloat,
        tooltip: '圆角半径:\n0-1之间为最小边长比例值, \n>1为具体像素值'
      }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RoundRectMask, _Component);
        function RoundRectMask() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // 圆角半径
          _initializerDefineProperty(_this, "propRadius", _descriptor, _assertThisInitialized(_this));
          _this.mask = null;
          return _this;
        }
        var _proto = RoundRectMask.prototype;
        _proto.onEnable = function onEnable() {
          this.mask = this.getComponent(Mask);
          this.updateMask(this.radius);
        };
        _proto.updateMask = function updateMask(r) {
          var _radius = r >= 0 ? r : 0;
          if (_radius < 1) {
            var uiTransform = this.node.getComponent(UITransform);
            _radius = Math.min((uiTransform == null ? void 0 : uiTransform.width) || 0, (uiTransform == null ? void 0 : uiTransform.width) || 0) * _radius;
          }
          if (this.mask) {
            // @ts-ignore.
            this.mask['radius'] = _radius;
            // @ts-ignore.
            this.mask['onDraw'] = this.onDraw.bind(this.mask);
            this.mask['_updateGraphics'] = this._updateGraphics.bind(this.mask);
            this.mask.type = Mask.Type.GRAPHICS_RECT;
          }
        };
        _proto._updateGraphics = function _updateGraphics() {
          // @ts-ignore.
          var graphics = this._graphics;
          if (!graphics) {
            return;
          }
          this.onDraw(graphics);
        }

        /**
         * mask 用于绘制罩子的函数.
         * this 指向mask 对象,需要特别注意.
         * @param graphics
         */;
        _proto.onDraw = function onDraw(graphics) {
          var uiTransform = this.node.getComponent(UITransform);
          graphics.clear();
          var width = uiTransform.width;
          var height = uiTransform.height;
          var x = -width * uiTransform.anchorX;
          var y = -height * uiTransform.anchorY;
          graphics.roundRect(x, y, width, height, this.radius || 0);
          if (game.renderType === Game.RENDER_TYPE_CANVAS) {
            graphics.stroke();
          } else {
            graphics.fill();
          }
        };
        _createClass(RoundRectMask, [{
          key: "radius",
          get: function get() {
            return this.propRadius;
          },
          set: function set(r) {
            this.propRadius = r;
            this.updateMask(r);
          }
        }]);
        return RoundRectMask;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "propRadius", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _class2)) || _class) || _class) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/schema.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _createClass, cclegacy;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        base: void 0,
        cell: void 0,
        ft: void 0,
        init: void 0,
        item: void 0,
        test: void 0
      });
      cclegacy._RF.push({}, "f4ae3Vwoi5M5qu3jOi60lmP", "schema", undefined); //------------------------------------------------------------------------------
      // <auto-generated>
      //     This code was generated by a tool.
      //     Changes to this file may cause incorrect behavior and will be lost if
      //     the code is regenerated.
      // </auto-generated>
      //------------------------------------------------------------------------------
      var item;
      (function (_item2) {
        var EQuality = /*#__PURE__*/function (EQuality) {
          EQuality[EQuality["WHITE"] = 1] = "WHITE";
          EQuality[EQuality["BLUE"] = 2] = "BLUE";
          EQuality[EQuality["PURPLE"] = 3] = "PURPLE";
          EQuality[EQuality["RED"] = 4] = "RED";
          return EQuality;
        }({});
        _item2.EQuality = EQuality;
      })(item || (item = exports('item', {})));
      var test;
      (function (_test5) {
        var AccessFlag = /*#__PURE__*/function (AccessFlag) {
          AccessFlag[AccessFlag["WRITE"] = 1] = "WRITE";
          AccessFlag[AccessFlag["READ"] = 2] = "READ";
          AccessFlag[AccessFlag["TRUNCATE"] = 4] = "TRUNCATE";
          AccessFlag[AccessFlag["NEW"] = 8] = "NEW";
          AccessFlag[AccessFlag["READ_WRITE"] = 3] = "READ_WRITE";
          return AccessFlag;
        }({});
        _test5.AccessFlag = AccessFlag;
      })(test || (test = exports('test', {})));
      var vector2 = exports('vector2', /*#__PURE__*/function () {
        function vector2(_buf_) {
          this.x = void 0;
          this.y = void 0;
          this.x = _buf_.ReadFloat();
          this.y = _buf_.ReadFloat();
        }
        var _proto = vector2.prototype;
        _proto.resolve = function resolve(tables) {};
        return vector2;
      }());
      var vector3 = exports('vector3', /*#__PURE__*/function () {
        function vector3(_buf_) {
          this.x = void 0;
          this.y = void 0;
          this.z = void 0;
          this.x = _buf_.ReadFloat();
          this.y = _buf_.ReadFloat();
          this.z = _buf_.ReadFloat();
        }
        var _proto2 = vector3.prototype;
        _proto2.resolve = function resolve(tables) {};
        return vector3;
      }());
      var vector4 = exports('vector4', /*#__PURE__*/function () {
        function vector4(_buf_) {
          this.x = void 0;
          this.y = void 0;
          this.z = void 0;
          this.w = void 0;
          this.x = _buf_.ReadFloat();
          this.y = _buf_.ReadFloat();
          this.z = _buf_.ReadFloat();
          this.w = _buf_.ReadFloat();
        }
        var _proto3 = vector4.prototype;
        _proto3.resolve = function resolve(tables) {};
        return vector4;
      }());
      (function (_item) {
        var ItemExchange = /*#__PURE__*/function () {
          function ItemExchange(_buf_) {
            /**
             * 道具id
             */
            this.id = void 0;
            /**
             * 道具数量
             */
            this.num = void 0;
            this.id = _buf_.ReadInt();
            this.num = _buf_.ReadInt();
          }
          var _proto4 = ItemExchange.prototype;
          _proto4.resolve = function resolve(tables) {};
          return ItemExchange;
        }();
        _item.ItemExchange = ItemExchange;
      })(item || (item = exports('item', {})));
      (function (_test) {
        var TestExcelBean1 = /*#__PURE__*/function () {
          function TestExcelBean1(_buf_) {
            /**
             * 最高品质
             */
            this.x1 = void 0;
            /**
             * 黑色的
             */
            this.x2 = void 0;
            /**
             * 蓝色的
             */
            this.x3 = void 0;
            /**
             * 最差品质
             */
            this.x4 = void 0;
            this.x1 = _buf_.ReadInt();
            this.x2 = _buf_.ReadString();
            this.x3 = _buf_.ReadInt();
            this.x4 = _buf_.ReadFloat();
          }
          var _proto5 = TestExcelBean1.prototype;
          _proto5.resolve = function resolve(tables) {};
          return TestExcelBean1;
        }();
        _test.TestExcelBean1 = TestExcelBean1;
      })(test || (test = exports('test', {})));
      var base;
      (function (_base) {
        var Range = /*#__PURE__*/function () {
          function Range(_buf_) {
            /**
             * 最小
             */
            this.mix = void 0;
            /**
             * 最大
             */
            this.max = void 0;
            this.mix = _buf_.ReadInt();
            this.max = _buf_.ReadInt();
          }
          var _proto36 = Range.prototype;
          _proto36.resolve = function resolve(tables) {};
          return Range;
        }();
        _base.Range = Range;
      })(base || (base = exports('base', {})));
      (function (_test2) {
        var Shape = /*#__PURE__*/function () {
          Shape.constructorFrom = function constructorFrom(_buf_) {
            switch (_buf_.ReadInt()) {
              case 2131829196:
                return new test.Circle(_buf_);
              case -31893773:
                return new test.Rectangle(_buf_);
              default:
                throw new Error();
            }
          };
          function Shape(_buf_) {}
          var _proto6 = Shape.prototype;
          _proto6.resolve = function resolve(tables) {};
          return Shape;
        }();
        _test2.Shape = Shape;
      })(test || (test = exports('test', {})));
      (function (_test3) {
        var Circle = /*#__PURE__*/function (_test$Shape) {
          _inheritsLoose(Circle, _test$Shape);
          function Circle(_buf_) {
            var _this;
            _this = _test$Shape.call(this, _buf_) || this;
            /**
             * 半径
             */
            _this.radius = void 0;
            _this.radius = _buf_.ReadFloat();
            return _this;
          }
          var _proto7 = Circle.prototype;
          _proto7.resolve = function resolve(tables) {
            _test$Shape.prototype.resolve.call(this, tables);
          };
          return Circle;
        }(test.Shape);
        _test3.Circle = Circle;
      })(test || (test = exports('test', {})));
      (function (_test4) {
        var Rectangle = /*#__PURE__*/function (_test$Shape2) {
          _inheritsLoose(Rectangle, _test$Shape2);
          function Rectangle(_buf_) {
            var _this2;
            _this2 = _test$Shape2.call(this, _buf_) || this;
            /**
             * 宽度
             */
            _this2.width = void 0;
            /**
             * 高度
             */
            _this2.height = void 0;
            _this2.width = _buf_.ReadFloat();
            _this2.height = _buf_.ReadFloat();
            return _this2;
          }
          var _proto8 = Rectangle.prototype;
          _proto8.resolve = function resolve(tables) {
            _test$Shape2.prototype.resolve.call(this, tables);
          };
          return Rectangle;
        }(test.Shape);
        _test4.Rectangle = Rectangle;
      })(test || (test = exports('test', {})));
      var cell;
      (function (_cell7) {
        var CellValue = /*#__PURE__*/function () {
          CellValue.constructorFrom = function constructorFrom(_buf_) {
            switch (_buf_.ReadInt()) {
              case 1042714401:
                return new cell.CellCount(_buf_);
              case -2042652830:
                return new cell.CellChance(_buf_);
              case 1856565685:
                return new cell.CellCountChance(_buf_);
              default:
                throw new Error();
            }
          };
          function CellValue(_buf_) {
            /**
             * 物品id
             */
            this.id = void 0;
            this.id = _buf_.ReadString();
          }
          var _proto37 = CellValue.prototype;
          _proto37.resolve = function resolve(tables) {};
          return CellValue;
        }();
        _cell7.CellValue = CellValue;
      })(cell || (cell = exports('cell', {})));
      (function (_cell) {
        var CellCount = /*#__PURE__*/function (_cell$CellValue) {
          _inheritsLoose(CellCount, _cell$CellValue);
          function CellCount(_buf_) {
            var _this3;
            _this3 = _cell$CellValue.call(this, _buf_) || this;
            /**
             * 数量
             */
            _this3.count = void 0;
            _this3.count = _buf_.ReadInt();
            return _this3;
          }
          var _proto9 = CellCount.prototype;
          _proto9.resolve = function resolve(tables) {
            _cell$CellValue.prototype.resolve.call(this, tables);
          };
          return CellCount;
        }(cell.CellValue);
        _cell.CellCount = CellCount;
      })(cell || (cell = exports('cell', {})));
      (function (_cell2) {
        var CellChance = /*#__PURE__*/function (_cell$CellValue2) {
          _inheritsLoose(CellChance, _cell$CellValue2);
          function CellChance(_buf_) {
            var _this4;
            _this4 = _cell$CellValue2.call(this, _buf_) || this;
            /**
             * 概率
             */
            _this4.chance = void 0;
            _this4.chance = _buf_.ReadInt();
            return _this4;
          }
          var _proto10 = CellChance.prototype;
          _proto10.resolve = function resolve(tables) {
            _cell$CellValue2.prototype.resolve.call(this, tables);
          };
          return CellChance;
        }(cell.CellValue);
        _cell2.CellChance = CellChance;
      })(cell || (cell = exports('cell', {})));
      (function (_cell3) {
        var CellCountChance = /*#__PURE__*/function (_cell$CellValue3) {
          _inheritsLoose(CellCountChance, _cell$CellValue3);
          function CellCountChance(_buf_) {
            var _this5;
            _this5 = _cell$CellValue3.call(this, _buf_) || this;
            /**
             * 数量
             */
            _this5.count = void 0;
            /**
             * 概率
             */
            _this5.chance = void 0;
            _this5.count = _buf_.ReadInt();
            _this5.chance = _buf_.ReadInt();
            return _this5;
          }
          var _proto11 = CellCountChance.prototype;
          _proto11.resolve = function resolve(tables) {
            _cell$CellValue3.prototype.resolve.call(this, tables);
          };
          return CellCountChance;
        }(cell.CellValue);
        _cell3.CellCountChance = CellCountChance;
      })(cell || (cell = exports('cell', {})));
      var NormalStore = exports('NormalStore', /*#__PURE__*/function () {
        function NormalStore(_buf_) {
          /**
           * 第几个格子
           */
          this.id = void 0;
          /**
           * 开启所需物品及数量（物品ID,数量;）
           */
          this.needCell = void 0;
          this.id = _buf_.ReadInt();
          if (_buf_.ReadBool()) {
            this.needCell = new cell.CellCount(_buf_);
          } else {
            this.needCell = null;
          }
        }
        var _proto12 = NormalStore.prototype;
        _proto12.resolve = function resolve(tables) {
          var _this$needCell;
          (_this$needCell = this.needCell) == null || _this$needCell.resolve(tables);
        };
        return NormalStore;
      }());
      var FactoryStore = exports('FactoryStore', /*#__PURE__*/function () {
        function FactoryStore(_buf_) {
          /**
           * 仓库格子序号
           */
          this.id = void 0;
          /**
           * 放置生产物ID
           */
          this.storeCell = void 0;
          this.storeCell_ref = void 0;
          /**
           * 开启所需等级
           */
          this.needLevel = void 0;
          /**
           * 开启所需生产物
           */
          this.needCell = void 0;
          this.needCell_ref = void 0;
          this.id = _buf_.ReadInt();
          this.storeCell = _buf_.ReadString();
          this.needLevel = _buf_.ReadInt();
          this.needCell = _buf_.ReadString();
        }
        var _proto13 = FactoryStore.prototype;
        _proto13.resolve = function resolve(tables) {
          this.storeCell_ref = tables.TbCell.get(this.storeCell);
          this.needCell_ref = tables.TbCell.get(this.needCell);
        };
        return FactoryStore;
      }());
      var Config = exports('Config', /*#__PURE__*/function () {
        function Config(_buf_) {
          /**
           * 默认体力
           */
          this.defaultPower = void 0;
          /**
           * 每点体力恢复时长（秒）
           */
          this.defaultRecoverTime = void 0;
          /**
           * 恢复体力上限
           */
          this.defaultLimit = void 0;
          /**
           * 初始等级
           */
          this.defaultLevel = void 0;
          /**
           * 初始经验值
           */
          this.defaultExp = void 0;
          /**
           * 初始金币
           */
          this.defaultGold = void 0;
          /**
           * 初始钻石
           */
          this.defaultDiamond = void 0;
          /**
           * 初始开启普通仓库数量
           */
          this.defaultNormalStoreOpen = void 0;
          this.defaultPower = _buf_.ReadInt();
          this.defaultRecoverTime = _buf_.ReadInt();
          this.defaultLimit = _buf_.ReadInt();
          this.defaultLevel = _buf_.ReadInt();
          this.defaultExp = _buf_.ReadInt();
          this.defaultGold = _buf_.ReadInt();
          this.defaultDiamond = _buf_.ReadInt();
          this.defaultNormalStoreOpen = _buf_.ReadInt();
        }
        var _proto14 = Config.prototype;
        _proto14.resolve = function resolve(tables) {};
        return Config;
      }());
      var InitMap = exports('InitMap', /*#__PURE__*/function () {
        function InitMap(_buf_) {
          /**
           * 这是id(有公式)
           */
          this.id = void 0;
          /**
           * 是否激活<br/>true|1|y|yes 或 false|0|n|no
           */
          this.active = void 0;
          /**
           * 是否沙土<br/>true|1|y|yes 或 false|0|n|no
           */
          this.ground = void 0;
          /**
           * 引用Cell表
           */
          this.cell = void 0;
          this.cell_ref = void 0;
          /**
           * 开放等级
           */
          this.openLevel = void 0;
          this.id = _buf_.ReadInt();
          this.active = _buf_.ReadBool();
          this.ground = _buf_.ReadBool();
          this.cell = _buf_.ReadString();
          this.openLevel = _buf_.ReadInt();
        }
        var _proto15 = InitMap.prototype;
        _proto15.resolve = function resolve(tables) {
          this.cell_ref = tables.TbCell.get(this.cell);
        };
        return InitMap;
      }());
      var MaterialStore = exports('MaterialStore', /*#__PURE__*/function () {
        function MaterialStore(_buf_) {
          /**
           * 仓库格子序号
           */
          this.id = void 0;
          /**
           * 放置材料物品ID
           */
          this.storeCell = void 0;
          this.storeCell_ref = void 0;
          this.id = _buf_.ReadInt();
          this.storeCell = _buf_.ReadString();
        }
        var _proto16 = MaterialStore.prototype;
        _proto16.resolve = function resolve(tables) {
          this.storeCell_ref = tables.TbCell.get(this.storeCell);
        };
        return MaterialStore;
      }());
      var Npc = exports('Npc', /*#__PURE__*/function () {
        function Npc(_buf_) {
          /**
           * NPC ID
           */
          this.id = void 0;
          /**
           * NPC名称
           */
          this.name = void 0;
          /**
           * NPC资源
           */
          this.res = void 0;
          this.id = _buf_.ReadString();
          this.name = _buf_.ReadString();
          this.res = _buf_.ReadString();
        }
        var _proto17 = Npc.prototype;
        _proto17.resolve = function resolve(tables) {};
        return Npc;
      }());
      var Levelup = exports('Levelup', /*#__PURE__*/function () {
        function Levelup(_buf_) {
          /**
           * 等级
           */
          this.id = void 0;
          /**
           * 升级当前等级需要经验
           */
          this.exp = void 0;
          /**
           * 升级奖励（物品ID,数量;）
           */
          this.reward = void 0;
          this.id = _buf_.ReadInt();
          this.exp = _buf_.ReadInt();
          {
            var n = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.reward = [];
            for (var i = 0; i < n; i++) {
              var _e0 = void 0;
              _e0 = new cell.CellCount(_buf_);
              this.reward.push(_e0);
            }
          }
        }
        var _proto18 = Levelup.prototype;
        _proto18.resolve = function resolve(tables) {
          for (var _iterator = _createForOfIteratorHelperLoose(this.reward), _step; !(_step = _iterator()).done;) {
            var _e = _step.value;
            _e == null || _e.resolve(tables);
          }
        };
        return Levelup;
      }());
      var CellBubble = exports('CellBubble', /*#__PURE__*/function () {
        function CellBubble(_buf_) {
          /**
           * 泡泡能力ID
           */
          this.id = void 0;
          /**
           * 泡泡名称
           */
          this.name = void 0;
          /**
           * 泡泡时间s
           */
          this.bubbleReachTime = void 0;
          /**
           * 时间内戳破变成ID
           */
          this.bubbleReachCellId = void 0;
          this.bubbleReachCellId_ref = void 0;
          /**
           * 时间外戳破变成ID
           */
          this.bubbleNotReachCellChance = void 0;
          /**
           * 戳泡泡钻数
           */
          this.bubbleDiamondCount = void 0;
          /**
           * 是否支持广告<br/>true|1|y|yes 或 false|0|n|no
           */
          this.bubbleIsAd = void 0;
          this.id = _buf_.ReadString();
          this.name = _buf_.ReadString();
          this.bubbleReachTime = _buf_.ReadInt();
          this.bubbleReachCellId = _buf_.ReadString();
          {
            var n = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.bubbleNotReachCellChance = [];
            for (var i = 0; i < n; i++) {
              var _e0 = void 0;
              _e0 = new cell.CellChance(_buf_);
              this.bubbleNotReachCellChance.push(_e0);
            }
          }
          this.bubbleDiamondCount = _buf_.ReadInt();
          this.bubbleIsAd = _buf_.ReadBool();
        }
        var _proto19 = CellBubble.prototype;
        _proto19.resolve = function resolve(tables) {
          this.bubbleReachCellId_ref = tables.TbCell.get(this.bubbleReachCellId);
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.bubbleNotReachCellChance), _step2; !(_step2 = _iterator2()).done;) {
            var _e = _step2.value;
            _e == null || _e.resolve(tables);
          }
        };
        return CellBubble;
      }());
      var GameMapBuild = exports('GameMapBuild', /*#__PURE__*/function () {
        function GameMapBuild(_buf_) {
          /**
           * 建筑任务ID
           */
          this.id = void 0;
          /**
           * 任务名称
           */
          this.name = void 0;
          /**
           * 对应建筑ID
           */
          this.map = void 0;
          this.map_ref = void 0;
          /**
           * 建筑等级
           */
          this.level = void 0;
          /**
           * 任务进度
           */
          this.procress = void 0;
          /**
           * 所需物品及数量
           */
          this.needCell = void 0;
          /**
           * 奖励物品及数量
           */
          this.reward = void 0;
          /**
           * 获得经验
           */
          this.rewardExp = void 0;
          this.id = _buf_.ReadString();
          this.name = _buf_.ReadString();
          this.map = _buf_.ReadString();
          this.level = _buf_.ReadInt();
          this.procress = _buf_.ReadInt();
          {
            var n = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.needCell = [];
            for (var i = 0; i < n; i++) {
              var _e0 = void 0;
              _e0 = new cell.CellCount(_buf_);
              this.needCell.push(_e0);
            }
          }
          if (_buf_.ReadBool()) {
            this.reward = new cell.CellCount(_buf_);
          } else {
            this.reward = null;
          }
          this.rewardExp = _buf_.ReadInt();
        }
        var _proto20 = GameMapBuild.prototype;
        _proto20.resolve = function resolve(tables) {
          var _this$reward;
          this.map_ref = tables.TbGameMap.get(this.map);
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.needCell), _step3; !(_step3 = _iterator3()).done;) {
            var _e = _step3.value;
            _e == null || _e.resolve(tables);
          }
          (_this$reward = this.reward) == null || _this$reward.resolve(tables);
        };
        return GameMapBuild;
      }());
      var CellFactory = exports('CellFactory', /*#__PURE__*/function () {
        function CellFactory(_buf_) {
          /**
           * 生产物能力ID
           */
          this.id = void 0;
          /**
           * 生产物名称
           */
          this.name = void 0;
          /**
           * 生产物图片
           */
          this.res = void 0;
          /**
           * 生产物能力等级
           */
          this.level = void 0;
          /**
           * 是否重复生产<br/>true|1|y|yes 或 false|0|n|no
           */
          this.repeat = void 0;
          /**
           * 生产次数，概率
           */
          this.factoryCountChance = void 0;
          /**
           * 扣除体力
           */
          this.subPower = void 0;
          /**
           * 冷却时间（秒）<br/>秒，概率
           */
          this.cdChance = void 0;
          /**
           * 特殊功能
           */
          this.specialFeature = void 0;
          /**
           * 重置物品ID
           */
          this.resetCellId = void 0;
          this.resetCellId_ref = void 0;
          /**
           * 每180秒清冷却所需钻石数
           */
          this.buyCdCount = void 0;
          /**
           * 生产开启冷却时间（秒）
           */
          this.startCd = void 0;
          /**
           * 生产物品概率
           */
          this.makeCellChance = void 0;
          this.id = _buf_.ReadString();
          this.name = _buf_.ReadString();
          this.res = _buf_.ReadString();
          this.level = _buf_.ReadString();
          this.repeat = _buf_.ReadBool();
          {
            var n = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.factoryCountChance = [];
            for (var i = 0; i < n; i++) {
              var _e0 = void 0;
              _e0 = new cell.CellChance(_buf_);
              this.factoryCountChance.push(_e0);
            }
          }
          this.subPower = _buf_.ReadInt();
          {
            var _n = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.cdChance = [];
            for (var _i = 0; _i < _n; _i++) {
              var _e2 = void 0;
              _e2 = new cell.CellChance(_buf_);
              this.cdChance.push(_e2);
            }
          }
          this.specialFeature = _buf_.ReadString();
          this.resetCellId = _buf_.ReadString();
          this.buyCdCount = _buf_.ReadInt();
          this.startCd = _buf_.ReadInt();
          {
            var _n2 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.makeCellChance = [];
            for (var _i2 = 0; _i2 < _n2; _i2++) {
              var _e3 = void 0;
              _e3 = new cell.CellChance(_buf_);
              this.makeCellChance.push(_e3);
            }
          }
        }
        var _proto21 = CellFactory.prototype;
        _proto21.resolve = function resolve(tables) {
          for (var _iterator4 = _createForOfIteratorHelperLoose(this.factoryCountChance), _step4; !(_step4 = _iterator4()).done;) {
            var _e = _step4.value;
            _e == null || _e.resolve(tables);
          }
          for (var _iterator5 = _createForOfIteratorHelperLoose(this.cdChance), _step5; !(_step5 = _iterator5()).done;) {
            var _e4 = _step5.value;
            _e4 == null || _e4.resolve(tables);
          }
          this.resetCellId_ref = tables.TbCell.get(this.resetCellId);
          for (var _iterator6 = _createForOfIteratorHelperLoose(this.makeCellChance), _step6; !(_step6 = _iterator6()).done;) {
            var _e5 = _step6.value;
            _e5 == null || _e5.resolve(tables);
          }
        };
        return CellFactory;
      }());
      var GameMap = exports('GameMap', /*#__PURE__*/function () {
        function GameMap(_buf_) {
          /**
           * 建筑ID
           */
          this.id = void 0;
          /**
           * 名称
           */
          this.name = void 0;
          /**
           * 资源
           */
          this.res = void 0;
          /**
           * 解锁等级
           */
          this.unlockLevel = void 0;
          /**
           * 最高等级
           */
          this.maxLevel = void 0;
          /**
           * 解锁所需物品及数量（物品ID,数量）
           */
          this.unlockCell = void 0;
          /**
           * 解锁后奖励（物品ID,数量;）
           */
          this.reward = void 0;
          /**
           * 解锁后奖励经验值
           */
          this.rewardExp = void 0;
          this.id = _buf_.ReadString();
          this.name = _buf_.ReadString();
          this.res = _buf_.ReadString();
          this.unlockLevel = _buf_.ReadInt();
          this.maxLevel = _buf_.ReadInt();
          if (_buf_.ReadBool()) {
            this.unlockCell = new cell.CellCount(_buf_);
          } else {
            this.unlockCell = null;
          }
          {
            var n = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.reward = [];
            for (var i = 0; i < n; i++) {
              var _e0 = void 0;
              _e0 = new cell.CellCount(_buf_);
              this.reward.push(_e0);
            }
          }
          this.rewardExp = _buf_.ReadInt();
        }
        var _proto22 = GameMap.prototype;
        _proto22.resolve = function resolve(tables) {
          var _this$unlockCell;
          (_this$unlockCell = this.unlockCell) == null || _this$unlockCell.resolve(tables);
          for (var _iterator7 = _createForOfIteratorHelperLoose(this.reward), _step7; !(_step7 = _iterator7()).done;) {
            var _e = _step7.value;
            _e == null || _e.resolve(tables);
          }
        };
        return GameMap;
      }());
      var Mission = exports('Mission', /*#__PURE__*/function () {
        function Mission(_buf_) {
          /**
           * 任务ID
           */
          this.id = void 0;
          /**
           * 任务名称
           */
          this.name = void 0;
          /**
           * 任务NPC ID
           */
          this.npc = void 0;
          this.npc_ref = void 0;
          /**
           * 任务类型
           */
          this.type = void 0;
          /**
           * 解锁需建筑ID
           */
          this.unlockBuild = void 0;
          /**
           * 解锁需等级（1,3）
           */
          this.unlockLevel = void 0;
          /**
           * 是否只触发一次<br/>true|1|y|yes 或 false|0|n|no
           */
          this.unlockOnlyOne = void 0;
          /**
           * 解锁需完成任务
           */
          this.unlockMission = void 0;
          /**
           * 解锁需拥有物品（物品ID,数量;）
           */
          this.unlockCell = void 0;
          /**
           * 完成任务需要-1（物品ID,概率;）
           */
          this.rewardNeedCell1 = void 0;
          /**
           * 完成任务需要-2（物品ID,概率;）
           */
          this.rewardNeedCell2 = void 0;
          /**
           * 完成任务需要-3（物品ID,概率;）
           */
          this.rewardNeedCell3 = void 0;
          /**
           * 完成任务随机奖励1（物品ID,数量,概率;）
           */
          this.reward1 = void 0;
          /**
           * 完成任务随机奖励2（物品ID,数量,概率;）
           */
          this.reward2 = void 0;
          this.id = _buf_.ReadString();
          this.name = _buf_.ReadString();
          this.npc = _buf_.ReadString();
          this.type = _buf_.ReadString();
          this.unlockBuild = _buf_.ReadString();
          this.unlockLevel = new base.Range(_buf_);
          this.unlockOnlyOne = _buf_.ReadBool();
          {
            var n = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.unlockMission = [];
            for (var i = 0; i < n; i++) {
              var _e0 = void 0;
              _e0 = _buf_.ReadString();
              this.unlockMission.push(_e0);
            }
          }
          {
            var _n3 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.unlockCell = [];
            for (var _i3 = 0; _i3 < _n3; _i3++) {
              var _e6 = void 0;
              _e6 = new cell.CellCount(_buf_);
              this.unlockCell.push(_e6);
            }
          }
          {
            var _n4 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.rewardNeedCell1 = [];
            for (var _i4 = 0; _i4 < _n4; _i4++) {
              var _e7 = void 0;
              _e7 = new cell.CellChance(_buf_);
              this.rewardNeedCell1.push(_e7);
            }
          }
          {
            var _n5 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.rewardNeedCell2 = [];
            for (var _i5 = 0; _i5 < _n5; _i5++) {
              var _e8 = void 0;
              _e8 = new cell.CellChance(_buf_);
              this.rewardNeedCell2.push(_e8);
            }
          }
          {
            var _n6 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.rewardNeedCell3 = [];
            for (var _i6 = 0; _i6 < _n6; _i6++) {
              var _e9 = void 0;
              _e9 = new cell.CellChance(_buf_);
              this.rewardNeedCell3.push(_e9);
            }
          }
          {
            var _n7 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.reward1 = [];
            for (var _i7 = 0; _i7 < _n7; _i7++) {
              var _e10 = void 0;
              _e10 = new cell.CellCountChance(_buf_);
              this.reward1.push(_e10);
            }
          }
          {
            var _n8 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.reward2 = [];
            for (var _i8 = 0; _i8 < _n8; _i8++) {
              var _e11 = void 0;
              _e11 = new cell.CellCountChance(_buf_);
              this.reward2.push(_e11);
            }
          }
        }
        var _proto23 = Mission.prototype;
        _proto23.resolve = function resolve(tables) {
          var _this$unlockLevel;
          this.npc_ref = tables.TbNpc.get(this.npc);
          (_this$unlockLevel = this.unlockLevel) == null || _this$unlockLevel.resolve(tables);
          for (var _iterator8 = _createForOfIteratorHelperLoose(this.unlockCell), _step8; !(_step8 = _iterator8()).done;) {
            var _e = _step8.value;
            _e == null || _e.resolve(tables);
          }
          for (var _iterator9 = _createForOfIteratorHelperLoose(this.rewardNeedCell1), _step9; !(_step9 = _iterator9()).done;) {
            var _e12 = _step9.value;
            _e12 == null || _e12.resolve(tables);
          }
          for (var _iterator10 = _createForOfIteratorHelperLoose(this.rewardNeedCell2), _step10; !(_step10 = _iterator10()).done;) {
            var _e13 = _step10.value;
            _e13 == null || _e13.resolve(tables);
          }
          for (var _iterator11 = _createForOfIteratorHelperLoose(this.rewardNeedCell3), _step11; !(_step11 = _iterator11()).done;) {
            var _e14 = _step11.value;
            _e14 == null || _e14.resolve(tables);
          }
          for (var _iterator12 = _createForOfIteratorHelperLoose(this.reward1), _step12; !(_step12 = _iterator12()).done;) {
            var _e15 = _step12.value;
            _e15 == null || _e15.resolve(tables);
          }
          for (var _iterator13 = _createForOfIteratorHelperLoose(this.reward2), _step13; !(_step13 = _iterator13()).done;) {
            var _e16 = _step13.value;
            _e16 == null || _e16.resolve(tables);
          }
        };
        return Mission;
      }());
      var Cell = exports('Cell', /*#__PURE__*/function () {
        function Cell(_buf_) {
          /**
           * 物品ID
           */
          this.id = void 0;
          /**
           * 物品名称
           */
          this.name = void 0;
          /**
           * 物品图片
           */
          this.res = void 0;
          /**
           * 物品类型
           */
          this.type = void 0;
          /**
           * 对应生产能力ID
           */
          this.factoryId = void 0;
          this.factoryId_ref = void 0;
          /**
           * 对应泡泡能力ID
           */
          this.bubbleId = void 0;
          this.bubbleId_ref = void 0;
          /**
           * 普通合成额外出物品概率<br/>万分率不填或roll不到就不出<br/>(泡泡）
           */
          this.mergeCell1Chance = void 0;
          /**
           * 普通合成额外出物品概率<br/>万分率不填或roll不到就不出<br/>(资源）
           */
          this.mergeCell2Chance = void 0;
          /**
           * 特殊合成物ID
           */
          this.specialMergeCellId = void 0;
          this.specialMergeCellId_ref = void 0;
          /**
           * 物品等级
           */
          this.level = void 0;
          /**
           * 升级物品ID
           */
          this.upgradeCellId = void 0;
          this.upgradeCellId_ref = void 0;
          /**
           * 售卖获得物品（物品ID,数量;）
           */
          this.sellCell = void 0;
          /**
           * 获得物品（物品ID,数量;）
           */
          this.rewardCell = void 0;
          /**
           * 商城购买该物品的钻石数量
           */
          this.shopPrice = void 0;
          this.id = _buf_.ReadString();
          this.name = _buf_.ReadString();
          this.res = _buf_.ReadString();
          this.type = _buf_.ReadString();
          this.factoryId = _buf_.ReadString();
          this.bubbleId = _buf_.ReadString();
          {
            var n = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.mergeCell1Chance = [];
            for (var i = 0; i < n; i++) {
              var _e0 = void 0;
              _e0 = new cell.CellChance(_buf_);
              this.mergeCell1Chance.push(_e0);
            }
          }
          {
            var _n9 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.mergeCell2Chance = [];
            for (var _i9 = 0; _i9 < _n9; _i9++) {
              var _e17 = void 0;
              _e17 = new cell.CellChance(_buf_);
              this.mergeCell2Chance.push(_e17);
            }
          }
          this.specialMergeCellId = _buf_.ReadString();
          this.level = _buf_.ReadInt();
          this.upgradeCellId = _buf_.ReadString();
          {
            var _n10 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.sellCell = [];
            for (var _i10 = 0; _i10 < _n10; _i10++) {
              var _e18 = void 0;
              _e18 = new cell.CellCount(_buf_);
              this.sellCell.push(_e18);
            }
          }
          {
            var _n11 = Math.min(_buf_.ReadSize(), _buf_.Size);
            this.rewardCell = [];
            for (var _i11 = 0; _i11 < _n11; _i11++) {
              var _e19 = void 0;
              _e19 = new cell.CellCount(_buf_);
              this.rewardCell.push(_e19);
            }
          }
          this.shopPrice = _buf_.ReadInt();
        }
        var _proto24 = Cell.prototype;
        _proto24.resolve = function resolve(tables) {
          this.factoryId_ref = tables.TbCellFactory.get(this.factoryId);
          this.bubbleId_ref = tables.TbCellBubble.get(this.bubbleId);
          for (var _iterator14 = _createForOfIteratorHelperLoose(this.mergeCell1Chance), _step14; !(_step14 = _iterator14()).done;) {
            var _e = _step14.value;
            _e == null || _e.resolve(tables);
          }
          for (var _iterator15 = _createForOfIteratorHelperLoose(this.mergeCell2Chance), _step15; !(_step15 = _iterator15()).done;) {
            var _e20 = _step15.value;
            _e20 == null || _e20.resolve(tables);
          }
          this.specialMergeCellId_ref = tables.TbCell.get(this.specialMergeCellId);
          this.upgradeCellId_ref = tables.TbCell.get(this.upgradeCellId);
          for (var _iterator16 = _createForOfIteratorHelperLoose(this.sellCell), _step16; !(_step16 = _iterator16()).done;) {
            var _e21 = _step16.value;
            _e21 == null || _e21.resolve(tables);
          }
          for (var _iterator17 = _createForOfIteratorHelperLoose(this.rewardCell), _step17; !(_step17 = _iterator17()).done;) {
            var _e22 = _step17.value;
            _e22 == null || _e22.resolve(tables);
          }
        };
        return Cell;
      }());
      var init;
      (function (_init2) {
        var TbInitMap = /*#__PURE__*/function () {
          function TbInitMap(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new InitMap(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto38 = TbInitMap.prototype;
          _proto38.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto38.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto38.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto38.resolve = function resolve(tables) {
            for (var _iterator28 = _createForOfIteratorHelperLoose(this._dataList), _step28; !(_step28 = _iterator28()).done;) {
              var data = _step28.value;
              data.resolve(tables);
            }
          };
          return TbInitMap;
        }();
        _init2.TbInitMap = TbInitMap;
      })(init || (init = exports('init', {})));
      (function (_cell4) {
        var TbCellFactory = /*#__PURE__*/function () {
          function TbCellFactory(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new CellFactory(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto25 = TbCellFactory.prototype;
          _proto25.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto25.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto25.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto25.resolve = function resolve(tables) {
            for (var _iterator18 = _createForOfIteratorHelperLoose(this._dataList), _step18; !(_step18 = _iterator18()).done;) {
              var data = _step18.value;
              data.resolve(tables);
            }
          };
          return TbCellFactory;
        }();
        _cell4.TbCellFactory = TbCellFactory;
      })(cell || (cell = exports('cell', {})));
      (function (_cell5) {
        var TbCell = /*#__PURE__*/function () {
          function TbCell(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new Cell(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto26 = TbCell.prototype;
          _proto26.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto26.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto26.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto26.resolve = function resolve(tables) {
            for (var _iterator19 = _createForOfIteratorHelperLoose(this._dataList), _step19; !(_step19 = _iterator19()).done;) {
              var data = _step19.value;
              data.resolve(tables);
            }
          };
          return TbCell;
        }();
        _cell5.TbCell = TbCell;
      })(cell || (cell = exports('cell', {})));
      (function (_cell6) {
        var TbCellBubble = /*#__PURE__*/function () {
          function TbCellBubble(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new CellBubble(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto27 = TbCellBubble.prototype;
          _proto27.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto27.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto27.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto27.resolve = function resolve(tables) {
            for (var _iterator20 = _createForOfIteratorHelperLoose(this._dataList), _step20; !(_step20 = _iterator20()).done;) {
              var data = _step20.value;
              data.resolve(tables);
            }
          };
          return TbCellBubble;
        }();
        _cell6.TbCellBubble = TbCellBubble;
      })(cell || (cell = exports('cell', {})));
      (function (_init) {
        var TbConfig = /*#__PURE__*/function () {
          function TbConfig(_buf_) {
            this._data = void 0;
            if (_buf_.ReadInt() != 1) throw new Error('table mode=one, but size != 1');
            this._data = new Config(_buf_);
          }
          var _proto28 = TbConfig.prototype;
          _proto28.getData = function getData() {
            return this._data;
          }

          /**
           * 默认体力
           */;
          _proto28.resolve = function resolve(tables) {
            this._data.resolve(tables);
          };
          _createClass(TbConfig, [{
            key: "defaultPower",
            get: function get() {
              return this._data.defaultPower;
            }
            /**
             * 每点体力恢复时长（秒）
             */
          }, {
            key: "defaultRecoverTime",
            get: function get() {
              return this._data.defaultRecoverTime;
            }
            /**
             * 恢复体力上限
             */
          }, {
            key: "defaultLimit",
            get: function get() {
              return this._data.defaultLimit;
            }
            /**
             * 初始等级
             */
          }, {
            key: "defaultLevel",
            get: function get() {
              return this._data.defaultLevel;
            }
            /**
             * 初始经验值
             */
          }, {
            key: "defaultExp",
            get: function get() {
              return this._data.defaultExp;
            }
            /**
             * 初始金币
             */
          }, {
            key: "defaultGold",
            get: function get() {
              return this._data.defaultGold;
            }
            /**
             * 初始钻石
             */
          }, {
            key: "defaultDiamond",
            get: function get() {
              return this._data.defaultDiamond;
            }
            /**
             * 初始开启普通仓库数量
             */
          }, {
            key: "defaultNormalStoreOpen",
            get: function get() {
              return this._data.defaultNormalStoreOpen;
            }
          }]);
          return TbConfig;
        }();
        _init.TbConfig = TbConfig;
      })(init || (init = exports('init', {})));
      var ft;
      (function (_ft8) {
        var TbMission = /*#__PURE__*/function () {
          function TbMission(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new Mission(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto39 = TbMission.prototype;
          _proto39.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto39.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto39.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto39.resolve = function resolve(tables) {
            for (var _iterator29 = _createForOfIteratorHelperLoose(this._dataList), _step29; !(_step29 = _iterator29()).done;) {
              var data = _step29.value;
              data.resolve(tables);
            }
          };
          return TbMission;
        }();
        _ft8.TbMission = TbMission;
      })(ft || (ft = exports('ft', {})));
      (function (_ft) {
        var TbNpc = /*#__PURE__*/function () {
          function TbNpc(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new Npc(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto29 = TbNpc.prototype;
          _proto29.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto29.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto29.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto29.resolve = function resolve(tables) {
            for (var _iterator21 = _createForOfIteratorHelperLoose(this._dataList), _step21; !(_step21 = _iterator21()).done;) {
              var data = _step21.value;
              data.resolve(tables);
            }
          };
          return TbNpc;
        }();
        _ft.TbNpc = TbNpc;
      })(ft || (ft = exports('ft', {})));
      (function (_ft2) {
        var TbLevelup = /*#__PURE__*/function () {
          function TbLevelup(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new Levelup(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto30 = TbLevelup.prototype;
          _proto30.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto30.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto30.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto30.resolve = function resolve(tables) {
            for (var _iterator22 = _createForOfIteratorHelperLoose(this._dataList), _step22; !(_step22 = _iterator22()).done;) {
              var data = _step22.value;
              data.resolve(tables);
            }
          };
          return TbLevelup;
        }();
        _ft2.TbLevelup = TbLevelup;
      })(ft || (ft = exports('ft', {})));
      (function (_ft3) {
        var TbFactoryStore = /*#__PURE__*/function () {
          function TbFactoryStore(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new FactoryStore(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto31 = TbFactoryStore.prototype;
          _proto31.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto31.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto31.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto31.resolve = function resolve(tables) {
            for (var _iterator23 = _createForOfIteratorHelperLoose(this._dataList), _step23; !(_step23 = _iterator23()).done;) {
              var data = _step23.value;
              data.resolve(tables);
            }
          };
          return TbFactoryStore;
        }();
        _ft3.TbFactoryStore = TbFactoryStore;
      })(ft || (ft = exports('ft', {})));
      (function (_ft4) {
        var TbNormalStore = /*#__PURE__*/function () {
          function TbNormalStore(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new NormalStore(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto32 = TbNormalStore.prototype;
          _proto32.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto32.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto32.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto32.resolve = function resolve(tables) {
            for (var _iterator24 = _createForOfIteratorHelperLoose(this._dataList), _step24; !(_step24 = _iterator24()).done;) {
              var data = _step24.value;
              data.resolve(tables);
            }
          };
          return TbNormalStore;
        }();
        _ft4.TbNormalStore = TbNormalStore;
      })(ft || (ft = exports('ft', {})));
      (function (_ft5) {
        var TbMaterialStore = /*#__PURE__*/function () {
          function TbMaterialStore(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new MaterialStore(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto33 = TbMaterialStore.prototype;
          _proto33.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto33.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto33.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto33.resolve = function resolve(tables) {
            for (var _iterator25 = _createForOfIteratorHelperLoose(this._dataList), _step25; !(_step25 = _iterator25()).done;) {
              var data = _step25.value;
              data.resolve(tables);
            }
          };
          return TbMaterialStore;
        }();
        _ft5.TbMaterialStore = TbMaterialStore;
      })(ft || (ft = exports('ft', {})));
      (function (_ft6) {
        var TbGameMap = /*#__PURE__*/function () {
          function TbGameMap(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new GameMap(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto34 = TbGameMap.prototype;
          _proto34.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto34.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto34.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto34.resolve = function resolve(tables) {
            for (var _iterator26 = _createForOfIteratorHelperLoose(this._dataList), _step26; !(_step26 = _iterator26()).done;) {
              var data = _step26.value;
              data.resolve(tables);
            }
          };
          return TbGameMap;
        }();
        _ft6.TbGameMap = TbGameMap;
      })(ft || (ft = exports('ft', {})));
      (function (_ft7) {
        var TbGameMapBuild = /*#__PURE__*/function () {
          function TbGameMapBuild(_buf_) {
            this._dataMap = void 0;
            this._dataList = void 0;
            this._dataMap = new Map();
            this._dataList = [];
            for (var n = _buf_.ReadInt(); n > 0; n--) {
              var _v = void 0;
              _v = new GameMapBuild(_buf_);
              this._dataList.push(_v);
              this._dataMap.set(_v.id, _v);
            }
          }
          var _proto35 = TbGameMapBuild.prototype;
          _proto35.getDataMap = function getDataMap() {
            return this._dataMap;
          };
          _proto35.getDataList = function getDataList() {
            return this._dataList;
          };
          _proto35.get = function get(key) {
            return this._dataMap.get(key);
          };
          _proto35.resolve = function resolve(tables) {
            for (var _iterator27 = _createForOfIteratorHelperLoose(this._dataList), _step27; !(_step27 = _iterator27()).done;) {
              var data = _step27.value;
              data.resolve(tables);
            }
          };
          return TbGameMapBuild;
        }();
        _ft7.TbGameMapBuild = TbGameMapBuild;
      })(ft || (ft = exports('ft', {})));
      var Tables = exports('Tables', /*#__PURE__*/function () {
        Tables.getTableNames = function getTableNames() {
          var names = [];
          names.push('init_tbinitmap');
          names.push('cell_tbcellfactory');
          names.push('cell_tbcell');
          names.push('cell_tbcellbubble');
          names.push('init_tbconfig');
          names.push('ft_tbmission');
          names.push('ft_tbnpc');
          names.push('ft_tblevelup');
          names.push('ft_tbfactorystore');
          names.push('ft_tbnormalstore');
          names.push('ft_tbmaterialstore');
          names.push('ft_tbgamemap');
          names.push('ft_tbgamemapbuild');
          return names;
        };
        function Tables(loader) {
          this._TbInitMap = void 0;
          this._TbCellFactory = void 0;
          this._TbCell = void 0;
          this._TbCellBubble = void 0;
          this._TbConfig = void 0;
          this._TbMission = void 0;
          this._TbNpc = void 0;
          this._TbLevelup = void 0;
          this._TbFactoryStore = void 0;
          this._TbNormalStore = void 0;
          this._TbMaterialStore = void 0;
          this._TbGameMap = void 0;
          this._TbGameMapBuild = void 0;
          this._TbInitMap = new init.TbInitMap(loader('init_tbinitmap'));
          this._TbCellFactory = new cell.TbCellFactory(loader('cell_tbcellfactory'));
          this._TbCell = new cell.TbCell(loader('cell_tbcell'));
          this._TbCellBubble = new cell.TbCellBubble(loader('cell_tbcellbubble'));
          this._TbConfig = new init.TbConfig(loader('init_tbconfig'));
          this._TbMission = new ft.TbMission(loader('ft_tbmission'));
          this._TbNpc = new ft.TbNpc(loader('ft_tbnpc'));
          this._TbLevelup = new ft.TbLevelup(loader('ft_tblevelup'));
          this._TbFactoryStore = new ft.TbFactoryStore(loader('ft_tbfactorystore'));
          this._TbNormalStore = new ft.TbNormalStore(loader('ft_tbnormalstore'));
          this._TbMaterialStore = new ft.TbMaterialStore(loader('ft_tbmaterialstore'));
          this._TbGameMap = new ft.TbGameMap(loader('ft_tbgamemap'));
          this._TbGameMapBuild = new ft.TbGameMapBuild(loader('ft_tbgamemapbuild'));
          this._TbInitMap.resolve(this);
          this._TbCellFactory.resolve(this);
          this._TbCell.resolve(this);
          this._TbCellBubble.resolve(this);
          this._TbConfig.resolve(this);
          this._TbMission.resolve(this);
          this._TbNpc.resolve(this);
          this._TbLevelup.resolve(this);
          this._TbFactoryStore.resolve(this);
          this._TbNormalStore.resolve(this);
          this._TbMaterialStore.resolve(this);
          this._TbGameMap.resolve(this);
          this._TbGameMapBuild.resolve(this);
        }
        _createClass(Tables, [{
          key: "TbInitMap",
          get: function get() {
            return this._TbInitMap;
          }
        }, {
          key: "TbCellFactory",
          get: function get() {
            return this._TbCellFactory;
          }
        }, {
          key: "TbCell",
          get: function get() {
            return this._TbCell;
          }
        }, {
          key: "TbCellBubble",
          get: function get() {
            return this._TbCellBubble;
          }
        }, {
          key: "TbConfig",
          get: function get() {
            return this._TbConfig;
          }
        }, {
          key: "TbMission",
          get: function get() {
            return this._TbMission;
          }
        }, {
          key: "TbNpc",
          get: function get() {
            return this._TbNpc;
          }
        }, {
          key: "TbLevelup",
          get: function get() {
            return this._TbLevelup;
          }
        }, {
          key: "TbFactoryStore",
          get: function get() {
            return this._TbFactoryStore;
          }
        }, {
          key: "TbNormalStore",
          get: function get() {
            return this._TbNormalStore;
          }
        }, {
          key: "TbMaterialStore",
          get: function get() {
            return this._TbMaterialStore;
          }
        }, {
          key: "TbGameMap",
          get: function get() {
            return this._TbGameMap;
          }
        }, {
          key: "TbGameMapBuild",
          get: function get() {
            return this._TbGameMapBuild;
          }
        }]);
        return Tables;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StorageManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './env'], function (exports) {
  var _createClass, cclegacy, sys, PREVIEW;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      PREVIEW = module.PREVIEW;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ed226gLF85Oyr+WhA9TJZLX", "StorageManager", undefined);
      // import { EncryptUtil } from "../../utils/EncryptUtil";

      /** 本地存储 */
      var StorageManager = exports('StorageManager', /*#__PURE__*/function () {
        function StorageManager() {
          this._key = null;
          this._iv = null;
          this._id = null;
        }
        var _proto = StorageManager.prototype;
        /**
         * 初始化密钥
         * @param key aes加密的key 
         * @param iv  aes加密的iv
         */
        _proto.init = function init(key, iv) {
          // EncryptUtil.initCrypto(key, iv);

          // this._key = EncryptUtil.md5(key);
          // this._iv = EncryptUtil.md5(iv);
        }

        /**
         * 设置用户唯一标识
         * @param id 
         */;
        _proto.setUser = function setUser(id) {
          this._id = id;
        }

        /**
         * 存储本地数据
         * @param key 存储key
         * @param value 存储值
         * @returns 
         */;
        _proto.set = function set(key, value) {
          var keywords = this.getKey(key);
          if (null == key) {
            console.error("存储的key不能为空");
            return;
          }
          if (this.encrypted) ;
          if (null == value) {
            console.warn("存储的值为空，则直接移除该存储");
            this.remove(key);
            return;
          }
          if (typeof value === 'function') {
            console.error("储存的值不能为方法");
            return;
          }
          if (typeof value === 'object') {
            try {
              value = JSON.stringify(value);
            } catch (e) {
              console.error("\u89E3\u6790\u5931\u8D25\uFF0Cstr = " + value);
              return;
            }
          } else if (typeof value === 'number') {
            value = value + "";
          }
          if (this.encrypted && null != this._key && null != this._iv) ;
          sys.localStorage.setItem(keywords, value);
        }

        /**
         * 获取指定关键字的数据
         * @param key          获取的关键字
         * @param defaultValue 获取的默认值
         * @returns 
         */;
        _proto.get = function get(key, defaultValue) {
          if (defaultValue === void 0) {
            defaultValue = "";
          }
          if (null == key) {
            console.error("存储的key不能为空");
            return null;
          }
          key = this.getKey(key);
          if (this.encrypted) ;
          var str = sys.localStorage.getItem(key);
          if (null != str && '' !== str && this.encrypted && null != this._key && null != this._iv) ;
          if (null === str) {
            return defaultValue;
          }
          return str;
        }

        /** 获取指定关键字的数值 */;
        _proto.getNumber = function getNumber(key, defaultValue) {
          if (defaultValue === void 0) {
            defaultValue = 0;
          }
          var r = this.get(key);
          if (r == "0") {
            return Number(r);
          }
          return Number(r) || defaultValue;
        }

        /** 获取指定关键字的布尔值 */;
        _proto.getBoolean = function getBoolean(key) {
          var r = this.get(key);
          return r.toLowerCase() === 'true';
        }

        /** 获取指定关键字的JSON对象 */;
        _proto.getJson = function getJson(key, defaultValue) {
          var r = this.get(key);
          return r && JSON.parse(r) || defaultValue;
        }

        /**
         * 删除指定关键字的数据
         * @param key 需要移除的关键字
         * @returns 
         */;
        _proto.remove = function remove(key) {
          if (null == key) {
            console.error("存储的key不能为空");
            return;
          }
          var keywords = this.getKey(key);
          if (this.encrypted) ;
          sys.localStorage.removeItem(keywords);
        }

        /** 清空整个本地存储 */;
        _proto.clear = function clear() {
          sys.localStorage.clear();
        }

        /** 获取数据分组关键字 */;
        _proto.getKey = function getKey(key) {
          if (this._id == null || this._id == "") {
            return key;
          }
          return this._id + "_" + key;
        }

        /** 数据加密开关 */;
        _createClass(StorageManager, [{
          key: "encrypted",
          get: function get() {
            return !PREVIEW;
          }
        }]);
        return StorageManager;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StringUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3cf043w7FtFZIlI5YF6g+gx", "StringUtil", undefined);
      var TimeUnit = /*#__PURE__*/function (TimeUnit) {
        TimeUnit[TimeUnit["S"] = 0] = "S";
        TimeUnit[TimeUnit["M"] = 1] = "M";
        TimeUnit[TimeUnit["H"] = 2] = "H";
        TimeUnit[TimeUnit["D"] = 3] = "D";
        return TimeUnit;
      }(TimeUnit || {});
      /** 字符串工具 */
      var StringUtil = exports('StringUtil', /*#__PURE__*/function () {
        function StringUtil() {}
        /** 获取一个唯一标识的字符串 */
        StringUtil.guid = function guid() {
          var guid = "";
          for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
          }
          return guid;
        }

        /**
         * 转美式计数字符串
         * @param value 数字
         * @example
         * 123456789 = 123,456,789
         */;
        StringUtil.numberTotPermil = function numberTotPermil(value) {
          return value.toLocaleString();
        }

        /** 
         * 转英文单位计数
         * @param value 数字
         * @param fixed 保留小数位数
         * @example
         * 12345 = 12.35K
         */;
        StringUtil.numberToThousand = function numberToThousand(value, fixed) {
          if (fixed === void 0) {
            fixed = 2;
          }
          var k = 1000;
          var sizes = ['', 'K', 'M', 'G'];
          if (value < k) {
            return value.toString();
          } else {
            var i = Math.floor(Math.log(value) / Math.log(k));
            var r = value / Math.pow(k, i);
            return r.toFixed(fixed) + sizes[i];
          }
        }

        /** 
         * 转中文单位计数
         * @param value 数字
         * @param fixed 保留小数位数
         * @example
         * 12345 = 1.23万
         */;
        StringUtil.numberToTenThousand = function numberToTenThousand(value, fixed) {
          if (fixed === void 0) {
            fixed = 2;
          }
          var k = 10000;
          var sizes = ['', '万', '亿', '万亿'];
          if (value < k) {
            return value.toString();
          } else {
            var i = Math.floor(Math.log(value) / Math.log(k));
            return (value / Math.pow(k, i)).toFixed(fixed) + sizes[i];
          }
        }

        /**
         * 时间格式化
         * @param date  时间对象
         * @param fmt   格式化字符(yyyy-MM-dd hh:mm:ss S)
         */;
        StringUtil.format = function format(date, fmt) {
          var o = {
            "M+": date.getMonth() + 1,
            // 月份 
            "d+": date.getDate(),
            // 日 
            "h+": date.getHours(),
            // 小时 
            "m+": date.getMinutes(),
            // 分 
            "s+": date.getSeconds(),
            // 秒 
            "q+": Math.floor((date.getMonth() + 3) / 3),
            // 季度 
            "S": date.getMilliseconds() // 毫秒 
          };

          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
          }
          return fmt;
        }

        /**
         * "," 分割字符串成数组
         * @param str 字符串
         */;
        StringUtil.stringToArray1 = function stringToArray1(str) {
          if (str == "") {
            return [];
          }
          return str.split(",");
        }

        /** 
         * "|" 分割字符串成数组 
         * @param str 字符串
         */;
        StringUtil.stringToArray2 = function stringToArray2(str) {
          if (str == "") {
            return [];
          }
          return str.split("|");
        }

        /** 
         * ":" 分割字符串成数组
         * @param str 字符串
         */;
        StringUtil.stringToArray3 = function stringToArray3(str) {
          if (str == "") {
            return [];
          }
          return str.split(":");
        }

        /** 
         * ";" 分割字符串成数组 
         * @param str 字符串
         */;
        StringUtil.stringToArray4 = function stringToArray4(str) {
          if (str == "") {
            return [];
          }
          return str.split(";");
        }

        /**
         * 字符串截取
         * @param str     字符串
         * @param n       截取长度
         * @param showdot 是否把截取的部分用省略号代替
         */;
        StringUtil.sub = function sub(str, n, showdot) {
          if (showdot === void 0) {
            showdot = false;
          }
          var r = /[^\x00-\xff]/g;
          if (str.replace(r, "mm").length <= n) {
            return str;
          }
          var m = Math.floor(n / 2);
          for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
              if (showdot) {
                return str.substr(0, i) + "...";
              } else {
                return str.substr(0, i);
              }
            }
          }
          return str;
        }

        /**
         * 计算字符串长度，中文算两个字节
         * @param str 字符串
         */;
        StringUtil.stringLen = function stringLen(str) {
          var realLength = 0,
            len = str.length,
            charCode = -1;
          for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;else realLength += 2;
          }
          return realLength;
        }

        /**
         * 是否为空
         * @param str 
         */;
        StringUtil.IsEmpty = function IsEmpty(str) {
          if (str == null || str == undefined || str.length == 0) {
            return true;
          }
          return false;
        }

        /**
         * 参数替换
         * @param  str
         * @param  rest
         *  
         * @example
         *
         * var str:string = "here is some info '{0}' and {1}";
         * StringUtil.substitute(str, 15.4, true);
         *
         * "here is some info '15.4' and true"
         */;
        StringUtil.substitute = function substitute(str) {
          if (str == null) return '';
          for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
          }
          var len = rest.length;
          var args;
          if (len == 1 && rest[0] instanceof Array) {
            args = rest[0];
            len = args.length;
          } else {
            args = rest;
          }
          for (var i = 0; i < len; i++) {
            str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
          }
          return str;
        }

        /**
        * 根据参数返回格式化字符串
        * @param text 源字符串
        * @param option 用于格式化源字符串的数据，可以是键值对，也可以按顺序传参
        * @example
        * // 可使用以下两种调用方式，返回结果都是"测试字符串111--abc..."
        * Tool.formatString("测试字符串%{a1}--%{a2}...", {a1: 111, a2: "abc"});
        * Tool.formatString("测试字符串%{a1}--%{a2}...", 111, "abc");
        */;
        StringUtil.formatString = function formatString(text) {
          var result = text;
          for (var _len2 = arguments.length, option = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            option[_key2 - 1] = arguments[_key2];
          }
          if (option.length === 1 && Object.prototype.toString.call(option[0]) === "[object Object]") {
            // 参数为键值对
            for (var arg in option[0]) {
              if (option[0].hasOwnProperty(arg)) {
                var reg = new RegExp("%{" + arg + "}", "g");
                result = result.replace(reg, "" + option[0][arg]);
              }
            }
          } else {
            // 参数为数组
            option.forEach(function (value) {
              result = result.replace(/%\{.*?\}/, "" + value);
            });
          }
          return result;
        }

        /**
         * 对一段时间返回格式化时间字符串
         * @param sec 时间s
         * @param format 格式化字符串
         * @example
         * // 当format为string时，会以format中的最大时间单位进行格式化
         * Tool.formatTimeString(3601, "%{m}:%{s}"); // 60:1
         * Tool.formatTimeString(3601, "%{mm}:%{ss}"); // 60:01
         * Tool.formatTimeString(3601, "%{hh}:%{mm}:%{ss}"); // 01:00:01
         * 
         * // 当format为object时，会以传入的sec计算最大的时间单位，并选择format对应的字符串进行格式化
         * Tool.formatTimeString(100, {
         *     S: "%{s}秒",
         *     M: "%{m}分%{s}秒",
         *     H: "%{h}时%{m}分%{s}秒",
         *     D: "%{d}天%{h}时%{m}分%{s}秒"
         * }); // 1分40秒
         * Tool.formatTimeString(100000, {
         *     S: "%{s}秒",
         *     M: "%{m}分%{s}秒",
         *     H: "%{h}时%{m}分%{s}秒",
         *     D: "%{d}天%{h}时%{m}分%{s}秒"
         * }); // 1天3时46分40秒
         */;
        StringUtil.formatTimeString = function formatTimeString(sec, format) {
          if (format === void 0) {
            format = "%{hh}:%{mm}:%{ss}";
          }
          var seconds = Math.floor(sec);
          var minutes = Math.floor(seconds / 60);
          var hours = Math.floor(seconds / 3600);
          var days = Math.floor(seconds / 86400);
          var maxUnit = TimeUnit.S;
          var result = "";
          if (typeof format === "string") {
            // 查询格式化字符串中最大的单位
            result = format;
            if (/%\{d+\}/.test(format)) {
              maxUnit = TimeUnit.D;
            } else if (/%\{h+\}/.test(format)) {
              maxUnit = TimeUnit.H;
            } else if (/%\{m+\}/.test(format)) {
              maxUnit = TimeUnit.M;
            }
          } else {
            // 以传入的数值判断最大单位
            if (days > 0) {
              maxUnit = TimeUnit.D;
              result = format.D;
            } else if (hours > 0) {
              maxUnit = TimeUnit.H;
              result = format.H;
            } else if (minutes > 0) {
              maxUnit = TimeUnit.M;
              result = format.M;
            } else {
              maxUnit = TimeUnit.S;
              result = format.S;
            }
          }
          if (maxUnit > TimeUnit.S) {
            seconds %= 60;
          }
          if (maxUnit > TimeUnit.M) {
            minutes %= 60;
          }
          if (maxUnit > TimeUnit.H) {
            hours %= 24;
          }
          var data = {
            dd: days < 10 ? "0" + days : "" + days,
            d: "" + days,
            hh: hours < 10 ? "0" + hours : "" + hours,
            h: "" + hours,
            mm: minutes < 10 ? "0" + minutes : "" + minutes,
            m: "" + minutes,
            ss: seconds < 10 ? "0" + seconds : "" + seconds,
            s: "" + seconds
          };
          result = this.formatString(result, data);
          return result;
        }

        /**
         * 将一个Date对象或Date时间戳返回格式化日期字符串
         * @param date Date对象或Date时间戳
         * @param format 格式化字符串
         * @param isUTC true:UTC时间 false:本地时间
         * @example
         * Tool.formatDateString(0, "%{YYYY}-%{MM}-%{dd} %{hh}:%{mm}:%{ss}", true); // "1970-01-01 00:00:00"
         * Tool.formatDateString(0, "%{dd}/%{MM}/%{YY}", true); // "01/01/70"
         */;
        StringUtil.formatDateString = function formatDateString(date, format, isUTC) {
          if (format === void 0) {
            format = "%{YYYY}-%{MM}-%{dd} %{hh}:%{mm}:%{ss}";
          }
          if (isUTC === void 0) {
            isUTC = false;
          }
          var src = date instanceof Date ? date : new Date(date);
          var year = isUTC ? src.getUTCFullYear() : src.getFullYear();
          var month = isUTC ? src.getUTCMonth() + 1 : src.getMonth() + 1;
          var days = isUTC ? src.getUTCDate() : src.getDate();
          var hours = isUTC ? src.getUTCHours() : src.getHours();
          var minutes = isUTC ? src.getUTCMinutes() : src.getMinutes();
          var seconds = isUTC ? src.getUTCSeconds() : src.getSeconds();
          var data = {
            YYYY: "" + year,
            YY: year % 100 < 10 ? "0" + year % 100 : "" + year % 100,
            MM: month < 10 ? "0" + month : "" + month,
            M: "" + month,
            dd: days < 10 ? "0" + days : "" + days,
            d: "" + days,
            hh: hours < 10 ? "0" + hours : "" + hours,
            h: "" + hours,
            mm: minutes < 10 ? "0" + minutes : "" + minutes,
            m: "" + minutes,
            ss: seconds < 10 ? "0" + seconds : "" + seconds,
            s: "" + seconds
          };
          var result = this.formatString(format, data);
          return result;
        };
        return StringUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Timer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6021fct1uhJsImEuhdFWC0f", "Timer", undefined);
      /** 
       * 定时触发组件 
       * @example
          export class Test extends Component {
              // 创建一个定时跳动组件
              private timer: Timer = new Timer(1);
                update(dt: number) {
                  if (this.timer.update(this.dt)) {
                      console.log(每一秒触发一次);
                  }
              }
          }
       */
      var Timer = exports('Timer', /*#__PURE__*/function () {
        /**
         * 定时触发组件
         * @param step  触发间隔时间（秒）
         */
        function Timer(step) {
          if (step === void 0) {
            step = 0;
          }
          this.callback = null;
          this._elapsedTime = 0;
          this._step = -1;
          this.step = step;
        }
        var _proto = Timer.prototype;
        _proto.update = function update(dt) {
          if (this.step <= 0) return false;
          this._elapsedTime += dt;
          if (this._elapsedTime >= this._step) {
            var _this$callback;
            this._elapsedTime -= this._step;
            (_this$callback = this.callback) == null || _this$callback.call(this);
            return true;
          }
          return false;
        };
        _proto.reset = function reset() {
          this._elapsedTime = 0;
        };
        _proto.stop = function stop() {
          this._elapsedTime = 0;
          this.step = -1;
        };
        _createClass(Timer, [{
          key: "elapsedTime",
          get: function get() {
            return this._elapsedTime;
          }
        }, {
          key: "step",
          get: /** 触发间隔时间（秒） */
          function get() {
            return this._step;
          },
          set: function set(step) {
            this._step = step; // 每次修改时间
            this._elapsedTime = 0; // 逝去时间
          }
        }, {
          key: "progress",
          get: function get() {
            return this._elapsedTime / this._step;
          }
        }]);
        return Timer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimerManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './StringUtil.ts', './Timer.ts'], function (exports) {
  var _inheritsLoose, cclegacy, game, Component, StringUtil, Timer;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      game = module.game;
      Component = module.Component;
    }, function (module) {
      StringUtil = module.StringUtil;
    }, function (module) {
      Timer = module.Timer;
    }],
    execute: function () {
      cclegacy._RF.push({}, "73600VLsIBLOKhOhd7td4P8", "TimerManager", undefined);

      /** 时间管理 */
      var TimerManager = exports('TimerManager', /*#__PURE__*/function (_Component) {
        _inheritsLoose(TimerManager, _Component);
        function TimerManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 倒计时数据 */
          _this.times = {};
          /** 服务器时间 */
          _this.date_s = new Date();
          /** 服务器初始时间 */
          _this.date_s_start = new Date();
          /** 服务器时间后修正时间 */
          _this.polymeric_s = 0;
          /** 客户端时间 */
          _this.date_c = new Date();
          return _this;
        }
        var _proto = TimerManager.prototype;
        /** 后台管理倒计时完成事件 */
        _proto.update = function update(dt) {
          for (var key in this.times) {
            var data = this.times[key];
            var timer = data.timer;
            if (timer.update(dt)) {
              if (data.object[data.field] > 0) {
                data.object[data.field]--;

                // 倒计时结束触发
                if (data.object[data.field] == 0) {
                  this.onTimerComplete(data);
                }
                // 触发每秒回调事件  
                else if (data.onSecond) {
                  data.onSecond.call(data.object);
                }
              }
            }
          }
        }

        /** 触发倒计时完成事件 */;
        _proto.onTimerComplete = function onTimerComplete(data) {
          if (data.onComplete) data.onComplete.call(data.object);
          if (data.event) this.node.dispatchEvent(data.event);
          delete this.times[data.id];
        }

        /**
         * 在指定对象上注册一个倒计时的回调管理器
         * @param object        注册定时器的对象
         * @param field         时间字段
         * @param onSecond      每秒事件
         * @param onComplete    倒计时完成事件
         * @returns 
         * @example
        export class Test extends Component {
            private timeId!: string;
            
            start() {
                // 在指定对象上注册一个倒计时的回调管理器
                this.timeId = oops.timer.register(this, "countDown", this.onSecond, this.onComplete);
            }
            
            private onSecond() {
                console.log("每秒触发一次");
            }
              private onComplete() {
                console.log("倒计时完成触发");
            }
        }
         */;
        _proto.register = function register(object, field, onSecond, onComplete) {
          var timer = new Timer();
          timer.step = 1;
          var data = {};
          data.id = StringUtil.guid();
          data.timer = timer;
          data.object = object; // 管理对象
          data.field = field; // 时间字段
          data.onSecond = onSecond; // 每秒事件
          data.onComplete = onComplete; // 倒计时完成事件
          this.times[data.id] = data;
          return data.id;
        }

        /** 
         * 在指定对象上注销一个倒计时的回调管理器 
         * @param id         时间对象唯一表示
         * @example
        export class Test extends Component {
            private timeId!: string;
              start() {
                this.timeId = oops.timer.register(this, "countDown", this.onSecond, this.onComplete);
            }
              onDestroy() {
                // 在指定对象上注销一个倒计时的回调管理器
                oops.timer.unRegister(this.timeId);
            }
        }
         */;
        _proto.unRegister = function unRegister(id) {
          if (this.times[id]) delete this.times[id];
        }

        /**
         * 服务器时间与本地时间同步
         * @param value   服务器时间刻度
         */;
        _proto.setServerTime = function setServerTime(value) {
          this.polymeric_s = this.getTime();
          this.date_s_start.setTime(value);
        }

        /** 获取写服务器同步的时间刻度 */;
        _proto.getServerTime = function getServerTime() {
          return this.date_s_start.getTime() + this.getTime() - this.polymeric_s;
        }

        /** 获取服务器时间对象 */;
        _proto.getServerDate = function getServerDate() {
          this.date_s.setTime(this.getServerTime());
          return this.date_s;
        }

        /** 获取本地时间刻度 */;
        _proto.getClientTime = function getClientTime() {
          return Date.now();
        }

        /** 获取本地时间对象 */;
        _proto.getClientDate = function getClientDate() {
          this.date_c.setTime(this.getClientTime());
          return this.date_c;
        }

        /** 获取游戏开始到现在逝去的时间 */;
        _proto.getTime = function getTime() {
          return game.totalTime;
        }

        /** 游戏最小化时记录时间数据 */;
        _proto.save = function save() {
          for (var key in this.times) {
            this.times[key].startTime = this.getTime();
          }
        }

        /** 游戏最大化时回复时间数据 */;
        _proto.load = function load() {
          for (var key in this.times) {
            var interval = Math.floor((this.getTime() - (this.times[key].startTime || this.getTime())) / 1000);
            var data = this.times[key];
            data.object[data.field] = data.object[data.field] - interval;
            if (data.object[data.field] <= 0) {
              data.object[data.field] = 0;
              this.onTimerComplete(data);
            } else {
              this.times[key].startTime = null;
            }
          }
        };
        return TimerManager;
      }(Component));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimeUtils.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "20a73hl4xNF/7JXPEFruX4d", "TimeUtils", undefined);
      /** 时间工具 */
      var TimeUtil = exports('TimeUtil', /*#__PURE__*/function () {
        function TimeUtil() {}
        /** 间隔天数 */
        TimeUtil.daysBetween = function daysBetween(time1, time2) {
          if (time2 == undefined || time2 == null) {
            time2 = +new Date();
          }
          var startDate = new Date(time1).toLocaleDateString();
          var endDate = new Date(time2).toLocaleDateString();
          var startTime = new Date(startDate).getTime();
          var endTime = new Date(endDate).getTime();
          var dates = Math.abs(startTime - endTime) / (1000 * 60 * 60 * 24);
          return dates;
        }

        /** 间隔秒数 */;
        TimeUtil.secsBetween = function secsBetween(time1, time2) {
          if (time2 == undefined || time2 == null) {
            time2 = +new Date();
          }
          var dates = Math.abs(time2 - time1) / 1000;
          return dates;
        }

        /**
         * 代码休眠时间
         * @param ms 毫秒
         */;
        TimeUtil.sleep = /*#__PURE__*/
        function () {
          var _sleep = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ms) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", new Promise(function (resolve) {
                    setTimeout(function () {
                      resolve();
                    }, ms);
                  }));
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function sleep(_x) {
            return _sleep.apply(this, arguments);
          }
          return sleep;
        }();
        return TimeUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TipsManager.ts", ['cc', './config_game_ui.ts', './Hope.ts'], function (exports) {
  var cclegacy, tween, Vec3, UIID, hope;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      UIID = module.UIID;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ae8ebmU379E+rrSb8sjlfIy", "TipsManager", undefined);
      /** 提示窗口管理 */
      var TipsManager = exports('TipsManager', /*#__PURE__*/function () {
        function TipsManager() {}
        var _proto = TipsManager.prototype;
        // test(callback?: Function) {
        //     let operate: any = {
        //         title: 'common_prompt_title_sys',
        //         content: "common_prompt_content",
        //         okWord: 'common_prompt_ok',
        //         cancelWord: 'common_prompt_cancal',
        //         okFunc: () => {
        //             console.log("okFunc");
        //         },
        //         cancelFunc: () => {
        //             console.log("cancelFunc");
        //         },
        //         needCancel: true
        //     };
        //     hope.gui.open(UIID.Confirm, operate, this.getPopCommonEffect());
        // }
        _proto.alert = function alert(content, cb, title, okWord, cancelWord) {
          var operate = {
            title: title,
            content: content,
            okWord: okWord,
            cancelWord: cancelWord,
            okFunc: function okFunc() {
              cb && cb();
            },
            needCancel: true
          };
          hope.gui.open(UIID.Confirm, operate, this.getPopCommonEffect());
        }

        // confirm(content: string, cb: Function, okWord: string = "common_prompt_ok") {
        //     let operate: any = {
        //         title: 'common_prompt_title_sys',
        //         content: content,
        //         okWord: okWord,
        //         cancelWord: 'common_prompt_cancal',
        //         okFunc: () => {
        //             cb && cb()
        //         },
        //         cancelFunc: () => {

        //         },
        //         needCancel: true
        //     };
        //     hope.gui.open(UIID.Confirm, operate, this.getPopCommonEffect());
        // }

        /** 弹窗动画 */;
        _proto.getPopCommonEffect = function getPopCommonEffect(callbacks) {
          var newCallbacks = {
            // 节点添加动画
            onAdded: function onAdded(node, params) {
              node.setScale(0.1, 0.1, 0.1);
              tween(node).to(0.2, {
                scale: new Vec3(1, 1, 1)
              }).start();
            },
            // 节点删除动画
            onBeforeRemove: function onBeforeRemove(node, next) {
              tween(node).to(0.2, {
                scale: new Vec3(0.1, 0.1, 0.1)
              }).call(next).start();
            }
          };
          if (callbacks) {
            if (callbacks && callbacks.onAdded) {
              var onAdded = callbacks.onAdded;
              // @ts-ignore
              callbacks.onAdded = function (node, params) {
                onAdded(node, params);

                // @ts-ignore
                newCallbacks.onAdded(node, params);
              };
            }
            if (callbacks && callbacks.onBeforeRemove) {
              var onBeforeRemove = callbacks.onBeforeRemove;
              callbacks.onBeforeRemove = function (node, params) {
                onBeforeRemove(node, params);

                // @ts-ignore
                newCallbacks.onBeforeRemove(node, params);
              };
            }
            return callbacks;
          }
          return newCallbacks;
        };
        return TipsManager;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDimensionalArray.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c66b7AKnzlAiL6i/kRhV37T", "TwoDimensionalArray", undefined);
      var TwoDimensionalArray = exports('TwoDimensionalArray', /*#__PURE__*/function () {
        function TwoDimensionalArray(width, height, initialData) {
          this.width = void 0;
          this.height = void 0;
          this._data = void 0;
          if (initialData.length !== width * height) {
            throw new Error('Initial data length does not match width * height');
          }
          this.width = width;
          this.height = height;
          this._data = initialData;
        }

        // 将二维数组的坐标转换为一维数组的索引
        var _proto = TwoDimensionalArray.prototype;
        _proto.getIndex = function getIndex(x, y) {
          if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw new Error("Index (" + x + ", " + y + ") is out of bounds.");
          }
          return y * this.width + x;
        }

        // 设置指定位置的数据
        ;

        _proto.setCell = function setCell(x, y, value) {
          var index = this.getIndex(x, y);
          this.data[index] = value;
        }

        // 获取指定位置的数据
        ;

        _proto.getCell = function getCell(x, y) {
          var index = this.getIndex(x, y);
          return this.data[index];
        }

        // 交换两个位置的数据
        ;

        _proto.swap = function swap(x1, y1, x2, y2) {
          var index1 = this.getIndex(x1, y1);
          var index2 = this.getIndex(x2, y2);
          var _ref = [this.data[index2], this.data[index1]];
          this.data[index1] = _ref[0];
          this.data[index2] = _ref[1];
        }

        // 获取数据数组
        ;

        _proto.isValidPosition = function isValidPosition(x, y) {
          return x >= 0 && x < this.width && y >= 0 && y < this.height;
        };
        _proto.getData = function getData() {
          return this._data;
        };
        _createClass(TwoDimensionalArray, [{
          key: "data",
          get: function get() {
            return this._data;
          }
        }]);
        return TwoDimensionalArray;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, game, Button, hope;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      game = module.game;
      Button = module.Button;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "86cefAWukVE77lEwgfFdYeD", "UIButton", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;

      /** 
       * 通用按钮
       * 1、防连点
       * 2、按钮点击触发音效
       */
      var UIButton = exports('default', (_dec = ccclass("UIButton"), _dec2 = menu('ui/button/UIButton'), _dec3 = property({
        tooltip: "每次触发间隔"
      }), _dec4 = property({
        tooltip: "是否只触发一次"
      }), _dec5 = property({
        tooltip: "触摸音效",
        type: AudioClip
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Button) {
        _inheritsLoose(UIButton, _Button);
        function UIButton() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Button.call.apply(_Button, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "interval", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "once", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "effect", _descriptor3, _assertThisInitialized(_this));
          /** 触摸次数 */
          _this._touchCount = 0;
          /** 触摸结束时间 */
          _this._touchEndTime = 0;
          return _this;
        }
        var _proto = UIButton.prototype;
        /** 触摸结束 */
        _proto._onTouchEnded = function _onTouchEnded(event) {
          // 是否只触发一次
          if (this.once) {
            if (this._touchCount > 0) {
              event.propagationStopped = true;
              return;
            }
            this._touchCount++;
          }

          // 防连点500毫秒出发一次事件
          if (this._touchEndTime && game.totalTime - this._touchEndTime < this.interval) {
            event.propagationStopped = true;
          } else {
            this._touchEndTime = game.totalTime;
            _Button.prototype._onTouchEnded.call(this, event);
          }

          // 短按触摸音效
          if (this.effect) hope.audio.playEffect(this.effect);
        };
        _proto.onDestroy = function onDestroy() {
          if (this.effect) hope.audio.releaseEffect(this.effect);
        };
        return UIButton;
      }(Button), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "interval", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "once", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "effect", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIMap.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1bd03ggtItIIajoqd0I4VGL", "UIMap", undefined);
      /** 界面关系树节点 */
      var TreeNode = function TreeNode() {
        this.id = void 0;
        /** 父节点编号 */
        this.pid = void 0;
        /** 父节点 */
        this.parent = null;
        /** 子节点 */
        this.child = [];
        /** 界面名 */
        this.name = void 0;
        /** 界面代号（用于同一界面有多条路径时） */
        this.panel = void 0;
      };
      /** 用于树形结构两节点之间的寻路功能 */
      var UIMap = exports('UIMap', /*#__PURE__*/function () {
        function UIMap() {
          /** UI层级管理器 */
          this.manager = void 0;
          /** 界面节点树 */
          this.nodes = new Map();
        }
        var _proto = UIMap.prototype;
        /** 创建UI关系树 */
        _proto.init = function init(manager, data) {
          var _this = this;
          this.manager = manager;

          // 解析数据
          for (var key in data) {
            var d = data[key];
            var n = new TreeNode();
            n.id = parseInt(key);
            n.pid = d.parent;
            n.name = d.name;
            n.panel = d.panel;
            this.nodes.set(n.id, n);
          }

          // 设置节点关系
          this.nodes.forEach(function (value, key) {
            value.parent = _this.nodes.get(value.pid);
            if (value.parent) value.parent.child.push(value);
          });
        }

        /**
         * 树节点寻路
         * @param startId 起始节点编号
         * @param endId   结束节点编号
         * @returns 
         */;
        _proto.pathFinding = function pathFinding(startId, endId) {
          var _this2 = this;
          var start = this.nodes.get(startId);
          var end = this.nodes.get(endId);
          var close = this.findUp(start);
          var open = this.findUp(end);
          close.forEach(function (value) {
            _this2.manager.remove(value.id, true);
          });
          open.forEach(function (value) {
            _this2.manager.open(value.id);
          });
          return {
            paths_close: close,
            paths_open: open
          };
        }

        /** 向上寻找子节点直到根节点停止，并返回节点路径数组 */;
        _proto.findUp = function findUp(start) {
          var paths = [];
          var current = start;
          while (current.parent != null) {
            // 父级为空时为根节点
            paths.push(current);
            current = current.parent;
          }
          return paths;
        }

        /** 释放所有节点 */;
        _proto.release = function release() {
          this.nodes.clear();
        };
        return UIMap;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Vec3Util.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MathUtil.ts'], function (exports) {
  var _createClass, cclegacy, Vec3, Mat4, MathUtil;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Mat4 = module.Mat4;
    }, function (module) {
      MathUtil = module.MathUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "505c8KALIZLD52eA3YYGotg", "Vec3Util", undefined);

      /** 向量工具 */
      var Vec3Util = exports('Vec3Util', /*#__PURE__*/function () {
        function Vec3Util() {}
        /**
         * 随时间变化进度值
         * @param start  起始位置
         * @param end    结束位置
         * @param t      进度[0，1]
         */
        Vec3Util.progress = function progress(start, end, t) {
          var current = new Vec3();
          current.x = MathUtil.progress(start.x, end.x, t);
          current.y = MathUtil.progress(start.y, end.y, t);
          current.z = MathUtil.progress(start.z, end.z, t);
          return current;
        }

        /**
         * 求两个三维向量的和
         * @param pos1  向量1
         * @param pos2  向量2
         */;
        Vec3Util.add = function add(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.add(outPos, pos1, pos2);
          return outPos;
        }

        /**
         * 求两个三维向量的差
         * @param pos1  向量1
         * @param pos2  向量2
         */;
        Vec3Util.sub = function sub(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.subtract(outPos, pos1, pos2);
          return outPos;
        }

        /**
         * 三维向量乘以常量
         * @param pos     向量
         * @param scalar  常量
         */;
        Vec3Util.mul = function mul(pos, scalar) {
          var outPos = new Vec3();
          Vec3.multiplyScalar(outPos, pos, scalar);
          return outPos;
        }

        /**
         * 三维向量除常量
         * @param pos     向量
         * @param scalar  常量
         */;
        Vec3Util.div = function div(pos, scalar) {
          var outPos = new Vec3();
          outPos.x = pos.x / scalar;
          outPos.y = pos.y / scalar;
          outPos.z = pos.z / scalar;
          return outPos;
        }

        /**
         * 判断两个三维向量的值是否相等
         * @param pos1  向量1
         * @param pos2  向量2
         */;
        Vec3Util.equals = function equals(pos1, pos2) {
          if (pos1.x == pos2.x && pos1.y == pos2.y && pos1.z == pos2.z) {
            return true;
          }
          return false;
        }

        /**
         * 三维向量的模
         * @param pos  向量
         */;
        Vec3Util.magnitude = function magnitude(pos) {
          return pos.length();
        }

        /**
         * 三维向量归一化
         * @param pos  向量
         */;
        Vec3Util.normalize = function normalize(pos) {
          var outPos = new Vec3(pos.x, pos.y, pos.z);
          return outPos.normalize();
        }

        /**
         * 获得位置1，到位置2的方向
         * @param pos1  向量1
         * @param pos2  向量2
         */;
        Vec3Util.direction = function direction(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.subtract(outPos, pos2, pos1);
          return outPos.normalize();
        }

        /**
         * 获得两点间的距离
         * @param pos1  向量1
         * @param pos2  向量2
         */;
        Vec3Util.distance = function distance(pos1, pos2) {
          return Vec3.distance(pos1, pos2);
        }

        /**
         * 插值运算
         * @param posStart  开始俏步
         * @param posEnd    结束位置
         * @param t         时间
         */;
        Vec3Util.lerp = function lerp(posStart, posEnd, t) {
          return this.bezierOne(t, posStart, posEnd);
        }

        /**
         * 球面插值
         * @param from  起点
         * @param to    终点
         * @param t     时间
         */;
        Vec3Util.slerp = function slerp(from, to, t) {
          if (t <= 0) {
            return from;
          } else if (t >= 1) {
            return to;
          }
          var dir = this.rotateTo(from, to, Vec3.angle(from, to) / Math.PI * 180 * t);
          var lenght = to.length() * t + from.length() * (1 - t);
          return dir.normalize().multiplyScalar(lenght);
        }

        /**
         * 向量旋转一个角度
         * @param from  起点
         * @param to    终点
         * @param angle 角并
         */;
        Vec3Util.rotateTo = function rotateTo(from, to, angle) {
          //如果两个方向角度为0，则返回目标
          if (Vec3.angle(from, to) == 0) {
            return to;
          }
          var axis = new Vec3(); // 获得旋转轴
          Vec3.cross(axis, from, to);
          axis.normalize();
          var radian = angle * Math.PI / 180; // 获得弧度
          var rotateMatrix = new Mat4();
          rotateMatrix.rotate(radian, axis);
          return new Vec3(from.x * rotateMatrix.m00 + from.y * rotateMatrix.m04 + from.z * rotateMatrix.m08, from.x * rotateMatrix.m01 + from.y * rotateMatrix.m05 + from.z * rotateMatrix.m09, from.x * rotateMatrix.m02 + from.y * rotateMatrix.m06 + from.z * rotateMatrix.m10);
        }

        /**
         * 一次贝塞尔即为线性插值函数
         * @param t 
         * @param posStart 
         * @param posEnd 
         * @returns 
         */;
        Vec3Util.bezierOne = function bezierOne(t, posStart, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }
          var pStart = posStart.clone();
          var pEnd = posEnd.clone();
          return pStart.multiplyScalar(1 - t).add(pEnd.multiplyScalar(t));
        }

        /**
         * 二次贝塞尔曲线
         * @param t 
         * @param posStart 
         * @param posCon 
         * @param posEnd 
         * @returns 
         */;
        Vec3Util.bezierTwo = function bezierTwo(t, posStart, posCon, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }
          var n = 1 - t;
          var tt = t * t;
          var pStart = posStart.clone();
          var pos = new Vec3();
          var pCon = posCon.clone();
          var pEnd = posEnd.clone();
          pos.add(pStart.multiplyScalar(n * n));
          pos.add(pCon.multiplyScalar(2 * n * t));
          pos.add(pEnd.multiplyScalar(tt));
          return pos;
        }

        /**
         * 三次贝塞尔
         * @param t 
         * @param posStart 
         * @param posCon1 
         * @param posCon2 
         * @param posEnd 
         * @returns 
         */;
        Vec3Util.bezierThree = function bezierThree(t, posStart, posCon1, posCon2, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }
          var n = 1 - t;
          var nn = n * n;
          var nnn = nn * n;
          var tt = t * t;
          var ttt = tt * t;
          var pStart = posStart.clone();
          var pos = posStart.clone();
          var pCon1 = posCon1.clone();
          var pCon2 = posCon2.clone();
          var pEnd = posEnd.clone();
          pos.add(pStart.multiplyScalar(nnn));
          pos.add(pCon1.multiplyScalar(3 * nn * t));
          pos.add(pCon2.multiplyScalar(3 * n * tt));
          pos.add(pEnd.multiplyScalar(ttt));
          return pos;
        }

        /**
         * 点乘
         * @param dir1 方向量1
         * @param dir2 方向量2
         */;
        Vec3Util.dot = function dot(dir1, dir2) {
          var tempDir1 = dir1;
          var tempDir2 = dir2;
          return tempDir1.x * tempDir2.x + tempDir1.y * tempDir2.y + tempDir1.z * tempDir2.z;
        }

        /**
         * 叉乘
         * @param dir1 方向量1
         * @param dir2 方向量2
         */;
        Vec3Util.cross = function cross(dir1, dir2) {
          var i = new Vec3(1, 0, 0);
          var j = new Vec3(0, 1, 0);
          var k = new Vec3(0, 0, 1);
          var tempDir1 = new Vec3(dir1.x, dir1.y, dir1.z);
          var tempDir2 = new Vec3(dir2.x, dir2.y, dir2.z);
          var iv = i.multiplyScalar(tempDir1.y * tempDir2.z - tempDir2.y * tempDir1.z);
          var jv = j.multiplyScalar(tempDir2.x * tempDir1.z - tempDir1.x * tempDir2.z);
          var kv = k.multiplyScalar(tempDir1.x * tempDir2.y - tempDir2.x * tempDir1.y);
          return iv.add(jv).add(kv);
        }

        /**
         * 获得两个方向向量的角度
         * @param dir1 方向量1
         * @param dir2 方向量2
         */;
        Vec3Util.angle = function angle(dir1, dir2) {
          var dotValue = this.dot(dir1.clone().normalize(), dir2.clone().normalize());
          return Math.acos(dotValue) / Math.PI * 180 * Math.sign(dotValue);
        }

        /**
         * 获得方向a到方向b的角度（带有方向的角度）
         * @param a 角度a
         * @param b 角度b
         */;
        Vec3Util.dirAngle = function dirAngle(a, b) {
          var c = Vec3Util.cross(a, b);
          var angle = Vec3Util.angle(a, b);
          // a 到 b 的夹角
          var sign = Math.sign(Vec3Util.dot(c.normalize(), Vec3Util.cross(b.normalize(), a.normalize())));
          return angle * sign;
        };
        _createClass(Vec3Util, null, [{
          key: "x",
          get:
          /**
           * X轴
           */
          function get() {
            return new Vec3(1, 0, 0);
          }

          /**
           * Y轴
           */
        }, {
          key: "y",
          get: function get() {
            return new Vec3(0, 1, 0);
          }

          /**
           * Z轴
           */
        }, {
          key: "z",
          get: function get() {
            return new Vec3(0, 0, 1);
          }

          /**
           * 左向量
           */
        }, {
          key: "left",
          get: function get() {
            return new Vec3(-1, 0, 0);
          }

          /**
           * 右向量
           */
        }, {
          key: "right",
          get: function get() {
            return new Vec3(1, 0, 0);
          }

          /**
           * 上向量
           */
        }, {
          key: "up",
          get: function get() {
            return new Vec3(0, 1, 0);
          }

          /**
           * 下向量
           */
        }, {
          key: "down",
          get: function get() {
            return new Vec3(0, -1, 0);
          }

          /**
           * 前向量
           */
        }, {
          key: "forward",
          get: function get() {
            return new Vec3(0, 0, 1);
          }

          /**
           * 后向量
           */
        }, {
          key: "back",
          get: function get() {
            return new Vec3(0, 0, -1);
          }

          /**
           * 1向量
           */
        }, {
          key: "one",
          get: function get() {
            return new Vec3(1, 1, 1);
          }

          /**
           * 0向量
           */
        }, {
          key: "zero",
          get: function get() {
            return new Vec3(0, 0, 0);
          }
        }]);
        return Vec3Util;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Hope.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, UITransform, v3, Size, Prefab, instantiate, Animation, AnimationClip, Button, warn, log, hope;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      UITransform = module.UITransform;
      v3 = module.v3;
      Size = module.Size;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Animation = module.Animation;
      AnimationClip = module.AnimationClip;
      Button = module.Button;
      warn = module.warn;
      log = module.log;
    }, function (module) {
      hope = module.hope;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2cd37X6yBNEN5VY43zku/kv", "ViewUtil", undefined);
      /** 显示对象工具 */
      var ViewUtil = exports('ViewUtil', /*#__PURE__*/function () {
        function ViewUtil() {}
        /**
         * 把Node当前的节点树结构根据Node命名转成一个js对象,重名的组件会覆盖，
         * Node的name不应该包含空格键，否则将跳过
         * @param parent 被遍历的Node组件
         * @param obj    绑定的js对象 (可选)
         */
        ViewUtil.nodeTreeInfoLite = function nodeTreeInfoLite(parent, obj) {
          var map = obj || new Map();
          var items = parent.children;
          for (var i = 0; i < items.length; i++) {
            var _node = items[i];
            if (_node.name.indexOf(" ") < 0) {
              map.set(_node.name, _node);
            }
            ViewUtil.nodeTreeInfoLite(_node, map);
          }
          return map;
        }

        /**
         * 正则搜索节点名字,符合条件的节点将会返回
         * @param reg     正则表达式
         * @param parent  要搜索的父节点
         * @param nodes   返回的数组（可选）
         */;
        ViewUtil.findNodes = function findNodes(reg, parent, nodes) {
          var ns = nodes || [];
          var items = parent.children;
          for (var i = 0; i < items.length; i++) {
            var _name = items[i].name;
            if (reg.test(_name)) {
              ns.push(items[i]);
            }
            ViewUtil.findNodes(reg, items[i], ns);
          }
          return ns;
        };
        /**
         * 节点之间坐标互转
         * @param a         A节点
         * @param b         B节点
         * @param aPos      A节点空间中的相对位置
         */
        ViewUtil.calculateASpaceToBSpacePos = function calculateASpaceToBSpacePos(a, b, aPos) {
          var world = a.getComponent(UITransform).convertToWorldSpaceAR(aPos);
          var space = b.getComponent(UITransform).convertToNodeSpaceAR(world);
          return space;
        }

        /**
         * 屏幕转空间坐标
         * @param event 触摸事件
         * @param space 转到此节点的坐标空间
         */;
        ViewUtil.calculateScreenPosToSpacePos = function calculateScreenPosToSpacePos(event, space) {
          var uil = event.getUILocation();
          var worldPos = v3(uil.x, uil.y);
          var mapPos = space.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
          return mapPos;
        }

        /**
         * 显示对象等比缩放
         * @param targetWidth       目标宽
         * @param targetHeight      目标高
         * @param defaultWidth      默认宽
         * @param defaultHeight     默认高
         */;
        ViewUtil.uniformScale = function uniformScale(targetWidth, targetHeight, defaultWidth, defaultHeight) {
          var widthRatio = defaultWidth / targetWidth;
          var heightRatio = defaultHeight / targetHeight;
          var ratio;
          widthRatio < heightRatio ? ratio = widthRatio : ratio = heightRatio;
          var size = new Size(Math.floor(targetWidth * ratio), Math.floor(targetHeight * ratio));
          return size;
        }

        /**
         * 从资源缓存中找到预制资源名并创建一个显示对象（建议使用GameComponent里的同名方法，能自动管理内存施放）
         * @param path 资源路径
         */;
        ViewUtil.createPrefabNode = function createPrefabNode(path) {
          var p = hope.res.get(path, Prefab);
          var n = instantiate(p);
          return n;
        }

        /**
         * 加载预制并创建预制节点（建议使用GameComponent里的同名方法，能自动管理内存施放）
         * @param path 资源路径
         */;
        ViewUtil.createPrefabNodeAsync = function createPrefabNodeAsync(path) {
          var _this = this;
          return new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  hope.res.load(path, Prefab, function (err, content) {
                    if (err) {
                      console.error("\u540D\u4E3A\u3010" + path + "\u3011\u7684\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25");
                      return;
                    }
                    var node = _this.createPrefabNode(path);
                    resolve(node);
                  });
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
        }

        /**
         * 添加节点动画
         * @param path              资源路径
         * @param node              目标节点
         * @param onlyOne           是否唯一
         * @param isDefaultClip     是否播放默认动画剪辑
         */;
        ViewUtil.addNodeAnimation = function addNodeAnimation(path, node, onlyOne, isDefaultClip) {
          if (onlyOne === void 0) {
            onlyOne = true;
          }
          if (isDefaultClip === void 0) {
            isDefaultClip = false;
          }
          if (!node || !node.isValid) {
            return;
          }
          var anim = node.getComponent(Animation);
          if (anim == null) {
            anim = node.addComponent(Animation);
          }
          var clip = hope.res.get(path, AnimationClip);
          if (!clip) {
            return;
          }
          if (onlyOne && anim.getState(clip.name) && anim.getState(clip.name).isPlaying) {
            return;
          }
          if (isDefaultClip) {
            anim.defaultClip = clip;
            anim.play();
            return;
          }

          // 播放完成后恢复播放默认动画
          anim.once(Animation.EventType.FINISHED, function () {
            if (anim.defaultClip) {
              anim.play();
            }
          }, this);
          if (anim.getState(clip.name)) {
            anim.play(clip.name);
            return;
          }
          anim.createState(clip, clip.name);
          anim.play(clip.name);
        }

        /**
        * 检测一个点是否与一个节点碰撞
        * @param {Vec2} point - 需要检测的点
        * @param {Node} node - 需要检测碰撞的节点
        * @returns {boolean} - 是否碰撞
        */;
        ViewUtil.isPointCollidingWithNode = function isPointCollidingWithNode(point, node) {
          if (!node) return false;

          // 获取节点的边界框
          var boundingBox = node.getComponent(UITransform).getBoundingBoxToWorld();

          // 检测点是否在边界框内
          return boundingBox.contains(point);
        }

        /**
        * 检测两个节点是否碰撞
        * @param {Node} nodeA - 第一个节点
        * @param {Node} nodeB - 第二个节点
        * @returns {boolean} - 是否碰撞
        */;
        ViewUtil.isNodeCollidingWithNode = function isNodeCollidingWithNode(nodeA, nodeB) {
          if (!nodeA || !nodeB) return false;

          // 获取两个节点的边界框
          var boundingBoxA = nodeA.getComponent(UITransform).getBoundingBoxToWorld();
          var boundingBoxB = nodeB.getComponent(UITransform).getBoundingBoxToWorld();

          // 检测两个边界框是否相交
          return boundingBoxA.intersects(boundingBoxB);
        };
        ViewUtil.registerButtonClick = function registerButtonClick(btn, cb, target) {
          btn.node.on(Button.EventType.CLICK, cb, target);
        };
        ViewUtil.unregisterButtonClick = function unregisterButtonClick(btn, cb, target) {
          btn.node.off(Button.EventType.CLICK, cb, target);
        }

        /**
         * 播放节点动画
         * @param node              目标节点
         * @param onlyOne           是否唯一
         * @param isDefaultClip     是否播放默认动画剪辑
         */;
        ViewUtil.playNodeAnimation = function playNodeAnimation(node, animName, onlyOne) {
          var _anim$defaultClip, _anim$getState;
          if (onlyOne === void 0) {
            onlyOne = true;
          }
          if (!node || !node.isValid) {
            return;
          }
          var anim = node.getComponent(Animation);
          if (anim == null) {
            warn("\u64AD\u653E" + animName + "\uFF0C\u8282\u70B9\u4E0A\u6CA1\u6709Animation\u7EC4\u4EF6");
            return;
          }
          var clips = anim.clips;
          if (clips.length <= 0) {
            warn("\u64AD\u653E" + animName + "\uFF0C\u8282\u70B9\u4E0AAnimation\u7EC4\u4EF6\u7684clips\u4E3A\u7A7A");
            return;
          }

          // 如果 animName 是布尔值，则使用默认动画片段名称
          var isDefaultClip = typeof animName === 'boolean' && animName;
          var clipName = typeof animName === 'string' ? animName : isDefaultClip ? ((_anim$defaultClip = anim.defaultClip) == null ? void 0 : _anim$defaultClip.name) || '' : '';
          if (!clipName) {
            warn("\u64AD\u653E\u53C2\u6570\u6CA1\u6709\uFF1A" + animName, clips);
            return;
          }
          var clip = clips.find(function (c) {
            return c.name === clipName;
          });
          if (!clip) {
            warn("\u64AD\u653Eclip\u6CA1\u6709\u627E\u5230\uFF1A" + clipName, clips);
            return;
          }
          if (onlyOne && (_anim$getState = anim.getState(clip.name)) != null && _anim$getState.isPlaying) {
            warn("\u64AD\u653E\u4E2D\uFF1A" + clipName);
            return;
          }
          if (isDefaultClip) {
            if (anim.defaultClip !== clip) {
              anim.defaultClip = clip;
            }
            log("isDefaultClip\u64AD\u653E\u53C2\u6570\uFF1A" + animName + "\uFF0C\u64AD\u653E\uFF1A" + anim.defaultClip.name);
            anim.play();
            return;
          }

          // 播放完成后恢复播放默认动画
          anim.once(Animation.EventType.FINISHED, function () {
            if (anim.defaultClip) {
              anim.play();
            }
          });

          // log(`播放参数：${animName}，播放：${clip.name}`);
          if (anim.getState(clip.name)) {
            anim.play(clip.name);
          } else {
            anim.createState(clip, clip.name);
            anim.play(clip.name);
          }
        };
        return ViewUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});