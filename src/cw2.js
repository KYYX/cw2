//默认组件样式
require('./cw2.less');
//鼠标滚轮事件插件
require('./jquery.mousewheel');
//组件默认配置
import CONFIG from './config';

const str = ('abcdefghijklmnopqrstuvwxyz' + 
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
			'1234567890').split('');

var createUUID = function (digit) {
	var _digit = digit || 4;
	var uuid = "";

	for (var i=0; i<_digit; i++) {
		uuid += str[~~(Math.random() * 62)];
	}

	return uuid;
};

(function ($) {
	'use strict';

	if (!$) {
		return alert('cw2套件需要依赖jQuery库');
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

	var CW = {};
	var COMPONENTS = ['Page',   'Scroll', 'Radio', 'Checkbox', 
	 				  'Select', 'Panel',  'Table', 'Tab', 'List',
	 				  'Gallery'];
	var $ROOT, $BODY, WH, WW;

	//静态变量
	$(function () {
		$ROOT = $(document);
		$BODY = $("body");
		WH = window.innerHeight;
		WW = window.innerWidth;

		$(".cw-container .cw-col").each(function () {
			var hasId = true
			var id;

			do {
				id = createUUID();
				hasId = $("#" + id).length > 0 ? true : false;
			} while (hasId);

			$(this).attr('id', id);
		});
	});

	//jQuery插件实现方法
	CW._toPage = (function () {
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
			var id 	  = cfg.id || createUUID();
			var cur   = cfg.cur;
			var $page = $("<ul class='cw page' id='" + id + "'></ul>");
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

	CW._toScroll = (function () {
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

	CW._toRadio = (function () {
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
			var id = cfg.id || createUUID();

			var $radio = $("<div class='cw radio' id='" + id + "'></div>");

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

	CW._toCheckbox = (function () {
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
			var id 	   = cfg.id || createUUID();
			var allBtn = cfg.allBtn;

			var $checkbox = $("<div class='cw checkbox' id='" + id + "'></div>");

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

	CW._toSelect = (function () {
		var selectTpl = '<div class="cw select">' +
						'	<div><p></p><i></i></div>' +
				        '	<ul></ul>' +
				        '</div>';

		return function ($this, cfg) {
			var id = cfg.id || createUUID();

			var $select = $(selectTpl).attr('id', id);
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

	CW._toPanel = (function () {
		var tpl = '<div class="cw panel">' +
				  '	<div class="header"></div>' +
				  '	<div class="divide"></div>' +
				  '	<div class="content"></div>' +
				  '	<div class="divide"></div>' +
				  '	<div class="footer"></div>' +
				  '</div>';

		return function ($this, cfg) {
			var id 	    = cfg.id || createUUID();
			var title   = cfg.title;
			var content = cfg.content;
			var btns    = cfg.btns;

			var $panel = $(tpl).attr('id', id);

			var $footer = $panel.children('.footer');

			if (cfg.icon) {
				$panel.addClass("icon")
					  .css("backgroundImage", cfg.icon);
			}

			$panel.children('.header').append('<span class="cw-ellipsis">' + title + '</span>');

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

	CW._toTable = (function () {
		var tpl = '<table class="cw-table">' +
				  '	<thead><tr></tr></thead>' +
				  '	<tbody></tbody>' +
				  '</table>';

		var radioClassName 			 = 'cw-table-radio';
		var radioCheckedClassName 	 = 'cw-table-radio-checked';
		var checkboxClassName 		 = 'cw-table-checkbox';
		var checkboxCheckedClassName = 'cw-table-checkbox-checked';

		return function ($this, cfg) {
			var id 	  = cfg.id || createUUID();
			var mode  = cfg.mode;
			var align = cfg.align;
			var cols  = cfg.cols;
			var rows  = cfg.rows;

			var keyList = [];

			var $table = $(tpl).attr('id', id);
			var $thead = $table.children('thead').children('tr:first');
			var $tbody = $table.children('tbody');
			var $checkboxAll;

			if (mode !== 0) {
				var $head;

				if (mode === 2) {
					$head = $('<th>' +
							  '	<i class="cw-table-icon cw-table-checkbox"></i>' +
							  '</th>');

					$checkboxAll = $head.children('i').click(function () {
						var $this = $(this);

						$this.toggleClass(checkboxCheckedClassName);
						
						$tbody.find("." + checkboxClassName).toggleClass(
							checkboxCheckedClassName, $this.hasClass(checkboxCheckedClassName)
						);
					});
				} else {
					$head = $('<th>&nbsp;</th>');
				}

				$thead.append($head);
			}

			cols.forEach(function (col, index) {
				keyList.push(col.key);

				$thead.append('<th>' + (col.text || "&nbsp;") + '</th>');
			});

			rows.forEach(function (data, index) {
				var className = (index + 1) % 2 === 0 ? "cw-even" : "cw-odd";
				var $tr = $('<tr class="'+className+'"></tr>');

				if (mode !== 0) {
					var type = mode === 1 ? 'radio' : 'checkbox';
					var $td = $('<td class="cw-box">' +
								'	<i class="cw-table-icon cw-table-' + type + '"></i>' +
								'</td>');

					$td.children('.' + radioClassName).click(function () {
						$tbody.find("." + radioCheckedClassName).removeClass(radioCheckedClassName);
						$(this).addClass(radioCheckedClassName);
					});
				

					$td.children('.' + checkboxClassName).click(function () {
						$(this).toggleClass(checkboxCheckedClassName);
						var checkedAmount = $tbody.find("." + checkboxCheckedClassName).length;

						$checkboxAll.toggleClass(
							checkboxCheckedClassName, (checkedAmount === rows.length)
						);
					});
					
					$tr.append($td);
				}

				keyList.forEach(function (key, _index) {
					var col   = cols[_index];
					var align = col.align || "center";
					var text  = data[key];
					var type  = col.type;

					var $td   = $('<td class="cw-text-' + align + '"></td>');

					if (type === "url") {
						$td.append('<a class="cw-link" href="' + data.href + '">' + text + '</a>');
					} else {
						$td.html(text);
					}

					$tr.append($td);
				});

				$tbody.append($tr);
			});

			$this.empty().append($table);
		}
	})();

	CW._toTab = (function () {
		var tpl = '<div class="cw-tab">' +
				  '	<ul class="cw-tab-tabs"></ul>' + 
				  '	<div class="cw-tab-contents"></div>' + 
				  '</div>';

		return function ($this, cfg) {
			var id = cfg.id || createUUID();

			var $tab  = $(tpl).attr("id", id);
			var $tabs = $tab.children('.cw-tab-tabs');
			var $contents = $tab.children('.cw-tab-contents');

			cfg.tabs.forEach(function (tab, index) {
				var contentId = id + "-content-" + (index + 1);
				var $tab 	 = $('<li>'  + tab.text    + '</li>');
				var $content = $('<div id="' + contentId + '">' + (tab.content || "") + '</div>');

				$tab.click(function () {
					$tabs.children('.cw-tab-active').removeClass('cw-tab-active');
					$tab.addClass('cw-tab-active');

					$contents.children('.cw-tab-content-show').removeClass('cw-tab-content-show');
					cfg.callback($content, (index + 1));
					$content.addClass('cw-tab-content-show');
				});

				$tabs.append($tab);
				$contents.append($content);
			});

			$this.empty().append($tab);

			$tabs.children(':eq(' + (cfg.active - 1) + ')').click();
		}
	})();

	CW._toList = (function () {
		var divide = '<div class="cw-list-divide"></div>';

		var activeCN = 'cw-list-active';

		return function ($this, cfg) {
			var id = cfg.id || createUUID();

			var $list = $('<ul class="cw-list" id="' + id + '"></ul>');

			if (cfg.clickable) {
				$list.addClass('cw-list-clickable').on('click', 'li', function () {
					var $this = $(this);

					$list.children('.' + activeCN).removeClass(activeCN);
					$this.addClass(activeCN);

					cfg.callback($this, $this.data('data'));
				});
			}

			cfg.data.forEach(function (data, index) {
				if (index > 0) {
					$list.append(divide);
				}

				var $li = $('<li></li>').data('data', data);

				if (data.content instanceof jQuery) {
					$li.append(data.content);
				} else {
					$li.html(data.content);
				}

				$list.append($li);
			});


			$this.empty().append($list);
		}
	})();

	CW._toGallery = (function () {
		var tpl = '<div class="cw-gallery">' +
				  '	<i class="cw-gallery-arrow cw-gallery-arrow-prev cw-gallery-arrow-disabled"></i>' +
				  '	<div class="cw-gallery-content"><ul></ul></div>' +
				  '	<i class="cw-gallery-arrow cw-gallery-arrow-next cw-gallery-arrow-disabled"></i>' +
				  '</div>';

		var arrowDisabledCN = 'cw-gallery-arrow-disabled';

		return function ($this, cfg) {
			var id = cfg.id || createUUID();

			var $gallery = $(tpl).attr('id', id);
			var $content = $gallery.find('.cw-gallery-content');
			var $list    = $content.children('ul');
			var $prev    = $gallery.children('.cw-gallery-arrow-prev');
			var $next    = $gallery.children('.cw-gallery-arrow-next');
			var width;
			var width2;
			var maxIndex = Math.ceil(cfg.data.length / cfg.count);
			var currentIndex = 0;

			if (maxIndex > 1) {
				$next.removeClass(arrowDisabledCN);
			}

			$gallery.on('click', '.cw-gallery-arrow', function () {
				var $this = $(this);

				if ($this.hasClass(arrowDisabledCN)) {

				} else if ($this.hasClass('cw-gallery-arrow-next')) {
					currentIndex += 1;
				} else {
					currentIndex -= 1;
				}

				if (currentIndex === 0) {
					$prev.addClass(arrowDisabledCN);
					$next.removeClass(arrowDisabledCN);
				} else if (currentIndex === maxIndex - 1) {
					$prev.removeClass(arrowDisabledCN);
					$next.addClass(arrowDisabledCN);
				} else {

				}

				$list.animate({
					left: 0 - width * currentIndex
				});
			});

			$this.empty().append($gallery);

			width = $content.width();
			width2 = width / cfg.count;

			cfg.data.forEach(function (data, index) {
				var $li = $('<li>' + index + '</li>').width(width2);

				$list.append($li);
			});
		}
	})();

	var cw_extends = {};

	COMPONENTS.forEach(function (name) {
		cw_extends['to' + name] = function (cfg) {
			var NAME = name.toUpperCase();
			var _cfg = $.extend(true, {}, CONFIG[NAME], cfg);

			this.each(function () {
				CW['_to' + name]($(this), _cfg);
			});
		}
	});

	//扩展jQuery插件
	 $.fn.extend(cw_extends);

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

		var $confirm = $('<div class="cw-confirm">' +
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
			confirm: toConfirm,
			uuid: createUUID
		}
	});
})(jQuery);