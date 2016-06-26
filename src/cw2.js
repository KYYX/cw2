require('./cw2.less');

require('./mousewheel');

(function ($) {
	'use strict';

	if (!$) {
		return alert('cw需要依赖jQuery');
	}

	//小小的polyfill
	if (typeof [].forEach !== "function") {
		Array.prototype.forEach = function (callback) {
			for (var i=0; i<this.length; i++) {
				callback(this[i], i);
			}
		};

		Array.prototype.filter = function (callback) {
			var arr = [];

			for (var i=0; i<this.length; i++) {
				var one = this[i];
				if (callback(one, i)) {
					arr.push(one);
				}
			}

			return arr;
		};
	}

	var $ROOT, $BODY, WH, WW;

	//静态变量
	$(function () {
		$ROOT = $(document);
		$BODY = $("body");
		WH = window.innerHeight;
		WW = window.innerWidth;
	});

	/*
	 @name 分页组件默认配置
	 @param  max:number:1 -> 最大页码
	 @param  cur:number:1 -> 当前页码
	 @param auto:boolean:true -> 初次加载是否执行回调函数
	 @param callback:function(cur) -> 回调函数
	 */
	var PAGE_CONFIG = {
		max:  1,
		cur:  1,
		auto: true,
		callback: function () {}
	};
	/*
	 @name 滚动条组件默认配置
	 @param  gap:number:40 -> 滚轮滚动一次移动的距离
	 @param  top:number:0  -> 滚动条默认距离顶部的位置
	 @TODO 拖拽滚动条
	 */
	var SCROLL_CONFIG = {
		gap:  40,
        top:  0
	};
	/*
	 @name 单选组件默认配置
	 @param arrange:string:| -> 排列方式，-水平，!垂直
	 @param alias:object:{name,value} -> 别名对应
	 @param data:array:[]
	 @param callback:function(checked:object): -> 点击回调
	 */
	var RADIO_CONFIG = {
		arrange: "|",
		alias: {name: 'name', value: 'value'},
		data: [],
		callback: function (checked) {}
	};
	/*
	 @name 复选组件默认配置
	 @param arrange:string:| -> 排列方式，-水平，!垂直
	 @param alias:object:{name,value} -> 别名对应
	 @param allBtn:boolean:false -> 是否有全选按钮
	 @param data:array:[]
	 @param callback:function(checkeds:array): -> 点击回调
	 */
	var CHECKBOX_CONFIG = {
		arrange: "|",
		alias: {name: 'name', value: 'value'},
		data: [],
		allBtn: false,
		callback: function (checkeds) {}
	};
	/*
	 @name 下拉组件默认配置
	 @param alias:object:{name,value} -> 别名对应
	 @param data:array:[]
	 @param callback:function(checked): -> 点击回调
	 */
	var SELECT_CONFIG = {
		placeholder: "",
		alias: {name: 'name', value: 'value'},
		data: [],
		callback: function (checked) {}
	};
	/*
	 @name 面板组件默认配置
	 @param title:string
	 @param content:string | jQuery
	 @param btns:array:[]
	 */
	var PANEL_CONFIG = {
		title: "",
		content: "",
		btns: []
	};

	/*
	 TODO
	 @name 表格组件默认配置
	 @param
	 */
	var TABLE_CONFIG = {
		
	};

	//jQuery插件实现方法
	var _toPage = (function () {
		var createPage = function (number) {
			return $("<li class='page' data-page='"+number+"'>"+number+"</li>");
		};

		var addPage = function ($page, number) {
			$page.append(createPage(number));
		}

		var render = function ($page, cur, max, callback, auto) {
			$page.empty();

			var $prev = $("<li class='prev'><上一页</li>");
			var $next = $("<li class='next'>下一页></li>");

			cur === 1   && $prev.addClass("disabled");
			cur === max && $next.addClass("disabled");

			$page.append($prev);

			if (cur <= 4) {
				for (var i=1; i<cur; i++) {
					addPage($page, i);
				}
			} else {
				addPage($page, 1);
				$page.append('<li class="other">...</li>');

				for (var i=cur - 2; i<cur; i++) {
					addPage($page, i);
				}
			}

			$page.append("<li class='current' data-page='"+cur+"'>"+cur+"</li>");

			if (max - cur > 3) {
				for (var i=cur + 1; i<=cur + 2; i++) {
					addPage($page, i);
				}

				$page.append('<li class="other">...</li>');
				addPage($page, max);
			} else {
				for (var i=cur + 1; i<=max; i++) {
					addPage($page, i);
				}
			}

			$page.append($next);

			if (!!auto === true) {
				callback(cur);
			}
		}

		return function ($this, cfg) {
			var cur   = cfg.cur;
			var $page = $("<ul class='cw page'></ul>");
			var args  = [$page, cur, cfg.max, cfg.callback, cfg.auto];

			$page.on("click", "li.page", function () {
				args[1] = Number(this.dataset.page);
				render.apply(null, args);
			});

			$page.on("click", "li.prev", function () {
				if ($(this).hasClass("disabled")) 
					return;

				args[1] -= 1;
				render.apply(null, args);
			});

			$page.on("click", "li.next", function () {
				if ($(this).hasClass("disabled")) 
					return;

				args[1] += 1;
				render.apply(null, args);
			});

			render.apply(null, args);

			args[4] = true;

			$this.empty().append($page);
		}
	})();

	var _toScroll = (function () {
	  	return function ($this, cfg) {
	  		var curTop = cfg.top > 0 ? 0 - cfg.top : 0; //当前页面位置;

	  		var $outerNode = $this,
	  			$innerNode = $this.children(":first");

	  		$outerNode.addClass("cw scroll outer").unbind('mousewheel');
	  		$innerNode.addClass("cw scroll inner").css("top", 0);
	        $outerNode.children(".cw.scroll-outer").remove();

	        var outerHeight = $outerNode.height();
	  		var innerHeight = $innerNode.height();


	        if (outerHeight < innerHeight) {
	        	$innerNode.css("top", curTop);

	        	var $outerScroll = $('<div class="cw scroll-outer"></div>');
		        var $innerScroll = $('<div class="cw scroll-inner" style="top: 0;"></div>');

		        $outerScroll.append($innerScroll);
		        $outerNode.append($outerScroll);

		        //设置外滚动条高
		        $outerScroll.height(outerHeight - 16);
		        //设置内滚动条高
				$innerScroll.height(outerHeight / innerHeight * 100 + "%");

		        var scrollOuterHeight = $outerScroll.height();
		        var scrollInnerHeight = $innerScroll.height();

		        var min = 0 - (innerHeight -  outerHeight); //最大滚动高度
		        var gap = cfg.gap;
		        var scrollMaxTop = scrollOuterHeight - scrollInnerHeight;

		        //屏幕滚动
		        var move = function (vector) {
		        	var innerTop = curTop + vector * gap;

		        	if (innerTop < min) { //移动到最底部
						curTop = min;
						$innerScroll.css("top", scrollMaxTop);
					} else if (innerTop > 0) { //移动到最顶部
						curTop = 0;
						$innerScroll.css("top", 0);
					} else {
						curTop = innerTop;
						$innerScroll.css("top", Math.abs(curTop) / innerHeight * scrollOuterHeight);
					}

					$innerNode.css("top", curTop);
		        };

		        //点击滚动条对页面的影响
		        $outerScroll.bind('click', function (event) {
		          if (event.offsetY < $innerScroll.offset().top) {
		            move(1); //滚动条上移
		          } else {
		            move(-1); //滚动条下移，屏幕上移
		          }
		        });

		        //阻止点击滚动条导致页面滚动
		        $innerScroll.bind('click', function (event) {
		          return false;
		        });

		        //绑定滚轮事件
		        $outerNode.bind('mousewheel', function (event) {
		        	move(event.deltaY);
		        	return false;
		        });
	        } else {
	        	$innerNode.css("top", 0);
	        }
	  	}
	})();

	var _toRadio = (function () {
		var render = function ($radio, data, checkedIndex) {
			$radio.empty();

			$.each(data, function (index, obj) {
				var name  = obj.name;
				// var value = obj.value;
				var $one  = $('<div>'+name+'</div>');

				// $one.data('value', value);
				// $one.data('name' , name);
				$one.data('index', index);

				if (index === checkedIndex) {
					$one.addClass('checked');
				}

				$radio.append($one);
			});
		};

		return function ($this, cfg, replace) {
			var $radio = $("<div class='cw radio'></div>");

			var checkedIndex = -1;

			//数据处理
			cfg.data.forEach(function (radioData, index) {
				if (!!radioData.checked) {
					checkedIndex = index;
				}

				radioData.name  = radioData[cfg.alias.name];
				radioData.value = radioData[cfg.alias.value];
			});

			//排列方式
			if (cfg.arrange === "-") {
				$radio.addClass("hor");
			}

			//事件监听
			$radio.on('click', 'div', function (event) {
				var $this = $(this);
				var index = $this.data("index");
				// var value = $this.data("value");
				// var name  = $this.data("name");

				checkedIndex = index;

				render($radio, cfg.data, checkedIndex);

				cfg.callback(cfg.data[checkedIndex]);
			});

			render($radio, cfg.data, checkedIndex);

			$this.empty().append($radio);
		}
	})();

	var _toCheckbox = (function () {
		var render = function ($checkbox, data, checkedIndexes) {
			$checkbox.empty();

			$.each(data, function (index, obj) {
				var $one  = $('<div>' + obj.name + '</div>');

				$one.data('index', index);

				if (checkedIndexes[index]) {
					$one.addClass('checked');
				}

				$checkbox.append($one);
			});
		};

		return function ($this, cfg) {
			var allBtn = cfg.allBtn;

			var $checkbox = $("<div class='cw checkbox'></div>");

			var checkedIndexes = [];

			//数据处理
			if (allBtn) {
				cfg.data.unshift({
					name:  "全部",
					value: "I LOVE CW"
				});
			}

			cfg.data.forEach(function (checkboxData, index) {
				if (!!checkboxData.checked) {
					checkedIndexes.push(true);
				} else {
					checkedIndexes.push(false);
				}

				checkboxData.name  = checkboxData[cfg.alias.name];
				checkboxData.value = checkboxData[cfg.alias.value];
			});

			//排列方式
			if (cfg.arrange === "-") {
				$checkbox.addClass("hor");
			}

			//事件监听
			$checkbox.on('click', 'div', function (event) {
				var checkeds = [];

				var $this = $(this);
				var index = $this.data("index");

				if (allBtn) {
					if (index === 0) {
						var checked = !checkedIndexes[index];

						cfg.data.forEach(function (checkboxData, index) {
							checkedIndexes[index] = checked;
						});
					} else {
						var checked = checkedIndexes[index] = !checkedIndexes[index];

						if (checked) {
							var checkedLength = checkedIndexes.filter(function (checked) {
								return checked;
							}).length;

							if (checkedLength === cfg.data.length - 1) {
								checkedIndexes[0] = true;
							} else {
								checkedIndexes[0] = false;
							}
						} else {
							checkedIndexes[0] = false;
						}
					}
				} else {
					checkedIndexes[index] = !checkedIndexes[index];
				}

				render($checkbox, cfg.data, checkedIndexes);

				var checkeds = cfg.data.filter(function (checkboxData, index) {
					return checkedIndexes[index];
				});

				if (allBtn && checkedIndexes[0]) {
					checkeds.shift();
				}

				cfg.callback(checkeds);
			});

			render($checkbox, cfg.data, checkedIndexes);

			$this.empty().append($checkbox);
		}
	})();

	var _toSelect = (function () {
		var selectTpl = '<div class="cw select">' +
						'	<div><p></p><i></i></div>' +
				        '	<ul></ul>' +
				        '</div>';

		return function ($this, cfg) {
			var $select = $(selectTpl);
			var $div 	= $select.children('div');
			var $p   	= $select.find('p');
			var $ul  	= $select.children('ul');

			var checkedIndex = 0;
			var height = cfg.data.length * 30 + 1;
			var expand = false;

			var show = function () {
				$select.addClass("expand");
				$ul.stop().animate({
					height: height
				}, 'fast', function () {
					expand = true;
					document.addEventListener('click', hide);
				});
			};

			var hide = function () {
				$ul.stop().animate({
					height: 0
				}, 'fast', function () {
					$select.removeClass("expand");
					expand = false;
					document.removeEventListener('click', hide);
				});
			};

			cfg.data.forEach(function (selectData, index) {
				!!selectData.checked && (checkedIndex = index);

				var name = selectData.name  = selectData[cfg.alias.name];
				selectData.value = selectData[cfg.alias.value];

				var $li = $('<li>' + name + '</li>');

				$li.click(function () {
					hide();
					$p.html(selectData.name);
					cfg.callback(selectData);
				});

				$ul.append($li);
			});

			$div.click(function () {
				expand ? hide() : show();
			});

			$p.html(cfg.data[checkedIndex].name);

			$this.empty().append($select);
		}
	})();

	var _toPanel = (function () {
		var tpl = '<div class="cw panel">' +
				  '	<div class="header"></div>' +
				  '	<div class="divide"></div>' +
				  '	<div class="content"></div>' +
				  '	<div class="divide"></div>' +
				  '	<div class="footer"></div>' +
				  '</div>';

		return function ($this, cfg) {
			var title   = cfg.title;
			var content = cfg.content;
			var btns    = cfg.btns;

			var $panel = $(tpl);

			var $footer = $panel.children('.footer');

			if (cfg.icon) {
				$panel.addClass("icon")
					  .css("backgroundImage", cfg.icon);
			}

			$panel.children('.header').append('<span class="cw ellipsis">' + title + '</span>');

			if (content instanceof jQuery) {
				$panel.children('.content').append(content);
			} else {
				$panel.children('.content').html(content);
			}

			if (btns instanceof Array && btns.length > 0) {
				btns.forEach(function (btn) {
					var $btn = $('<button class="cw btn '+(btn.type || "")+'">'+btn.name+'</button>');

					if (typeof btn.callback === "function") {
						$btn.click(btn.callback);
					}

					$footer.append($btn);
				});
			} else {
				$panel.children('.divide:last').remove();
				$footer.remove();
			}

			$this.append($panel);
		}
	})();

	//扩展jQuery插件
	$.fn.extend({
		toPage: function (cfg) {
			var _cfg = $.extend(PAGE_CONFIG, cfg);

			this.each(function () {
				_toPage($(this), _cfg);
			});
		},

		toScroll: function (cfg) {
			var _cfg = $.extend(SCROLL_CONFIG, cfg);

			this.each(function () {
				_toScroll($(this), _cfg);
			});
		},

		toRadio: function (cfg) {
			var _cfg = $.extend(RADIO_CONFIG, cfg);

			this.each(function () {
				_toRadio($(this), _cfg);
			});
		},

		toCheckbox: function (cfg) {
			var _cfg = $.extend(CHECKBOX_CONFIG, cfg);

			this.each(function () {
				_toCheckbox($(this), _cfg);
			});
		},

		toSelect: function (cfg) {
			var _cfg = $.extend(SELECT_CONFIG, cfg);

			this.each(function () {
				_toSelect($(this), _cfg);
			});
		},

		toPanel: function (cfg) {
			var _cfg = $.extend(PANEL_CONFIG, cfg);

			this.each(function () {
				_toPanel($(this), _cfg);
			});
		}
	});

	/************************/
	var toAlert = (function () {
		var _callback = function () {};

		var $alert = $('<div class="cw alert">' +
					   '	<div>' +
					   '		<div>这只是一个警告框</div>' +
					   '		<button>知道了</button>' +
					   '	</div>' + 
					   '</div>');
		var $div	 = $alert.children("div");
		var $content = $div.children("div");

		$alert.on('click', 'button', function () {
			$div.animate({opacity: 0}, 200, function () {
				$alert = $alert.detach();
				_callback();
				_callback = function () {};
			});
		});

		return function (content, callback) {
			if (typeof callback === "function") {
				_callback = callback;
			}

			$BODY.append($alert);

			$content.html(content);

			$div.css("marginTop", (WH - $div.height()) / 2)
				.animate({opacity: 1}, 200);
		};
	})();

	var toConfirm = (function () {
		var _callback = function () {};

		var $confirm = $('<div class="cw confirm">' +
					   '	<div>' +
					   '		<div>这只是一个确认框</div>' +
					   '		<button class="ok">好的</button>' +
					   '		<button class="cancel">取消</button>' +
					   '	</div>' + 
					   '</div>');
		var $div	 = $confirm.children("div");
		var $content = $div.children("div");

		$confirm.on('click', 'button', function () {
			var $this = $(this);

			$div.animate({opacity: 0}, 200, function () {
				$confirm = $confirm.detach();
				var flag = $this.hasClass("ok") ? true : false;
				_callback(flag);
				_callback = function () {};
			});
		});

		return function (content, callback) {
			if (typeof callback === "function") {
				_callback = callback;
			}

			$BODY.append($confirm);

			$content.html(content);

			$div.css("marginTop", (WH - $div.height()) / 2)
				.animate({opacity: 1}, 200);
		};
	})();

	//扩展jQuery
	$.extend({
		cw: {
			alert: toAlert,
			confirm: toConfirm
		}
	});
})(jQuery);