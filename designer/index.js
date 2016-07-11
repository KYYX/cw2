/*
 * 暂时没有滚动条(Scroll)的演示支持
 * 有部分全局变量，会污染环境
 */

var current2; //当前配置组件 {id:, role:}

$(function () {
	var $pageWidth 		 = $("#page-width");
	var $rowMargin		 = $("#row-margin");
	var $colPadding		 = $("#col-padding");
	var $previewBtn    = $("#preview-btn");
	var $main 				 = $("#main");
	var $mainCanvas 	 = $("#main-canvas");
	var $mainRootWrap	 = $("#main-root-wrap");
	var $mainRoot   	 = $("#main-root");
	var $bottom 	  	 = $("#bottom");
	var $listOfCreated = $(".list-of-created");
	var $highlight 		 = $(".cover-highlight");
	var $createdComponentList = $(".created-component-list");

	var rowMarginStyleNode = document.createElement('style');
	var colPaddingStyleNode = document.createElement('style');

	var current;  //当前创建的组件 {id:, role: }
	var createdConfig = {}; //已创建的组件的属性配置
	var createdComponentConfig = {}; //已创建的组件属性
	var defaultPgeWidth = $mainRoot.width();

	//创建组件
	var createComponent = function ($this) {
		var id = cw.createUUID();
		var role = current.role;

		if (role === "col") {
			$.cw.toast("&lt;Col&gt;里面不能嵌套&lt;Col&gt;", 1000, $mainCanvas);
		} else if (role === "row") {
			$this.append('<div class="cw-row" id="' + id + '"></div>');

			addCreatedComponentList(id, role);
		} else if (role === "text") {
			var $span = $('<span class="cw-text" id="' + id + '" contenteditable=false>静态文本</span>').click(function (event) {
				event.stopPropagation();
			});

			$this.append($span);

			addCreatedComponentList(id, role);
		} else {
			try {
				var componentConfig = $.extend(true, {id: id}, CONFIG_COMPONENT[role.toUpperCase()], DS[role]);

				createdComponentConfig[id] = componentConfig;

				$this["to" + cw.capitalize(role)](componentConfig);

				$("#" + id).wrap('<div class="component-wrap"></div>');

				addCreatedComponentList(id, role);
			} catch (e) {
				return console.warn('unknown component <' + role + '>, please feedback to <337487652@qq.com>');
			}
		}
	};

	//编辑组件属性后，重绘组件
	var rerenderComponent = function (componentConfig) {
		var $this = $("#" + current2.id);
		var $parent = $this.parent();

		$this.remove();

		$parent["to" + cw.capitalize(current2.role)](componentConfig);
	};

	//向【已创建的组件】列表里添加组件
	var addCreatedComponentList = function (id, role) {
		createdConfig[id] = $.extend(true, [], CONFIG[role]);

		var $li = $('<li id="created-' + id + '" data-role="' + role + '">' +
							  '	<span>' + cw.capitalize(role) + ' ( #' + id + ' )</span>' +
							  '	<i title="Delete">x</i>' +
							  '	<div></div>' +
							  '</li>');

		$createdComponentList.append($li);

		$listOfCreated.toScroll({gap: 33});

		$mainRootWrap.toScroll({gap: 40});

		$li.click();
	};

	//从【已创建的组件】列表里删除组件
	var removeCreatedComponentList = function (id) {
		$("#created-" + id).remove();
	};

	//缩放画布到指定宽度
	var scaleMainRoot = function (pageWidth) {
		pageWidth = Number(pageWidth);

		if (pageWidth) {
			$mainRootWrap.css({
				width: pageWidth,
				zoom:  pageWidth > defaultPgeWidth ? defaultPgeWidth / pageWidth : 1
			});
		} else {
			pageWidth = defaultPgeWidth;
			$pageWidth.val(pageWidth);
			$mainRootWrap.css({
				width: pageWidth,
				zoom:  1
			});
		}
	};

	var setRowMargin = function (rowMargin) {
		rowMarginStyleNode.innerHTML = '#main-root .cw-row {margin-bottom: ' + rowMargin + 'px;}';
	};

	var setColPadding = function (colPadding) {
		var style = '';
		style += '#main-root {padding-left: ' + colPadding + 'px;padding-right: ' + colPadding + 'px}'
		style += '#main-root .cw-row {margin-left: -' + colPadding + 'px;margin-right: -' + colPadding + 'px}';
		style += '#main-root .cw-col {padding-left: ' + colPadding + 'px;padding-right: ' + colPadding + 'px}';
		colPaddingStyleNode.innerHTML = style;
	};
	//切换显示模式
	$(".toSelect-mode").toSelect({
		data: [{
			value: "dev",
			name: "开发"
		},{
			value: "preview",
			name: "预览"
		}],
		callback: function (checked) {
			$mainRoot.toggleClass('dev', (checked.value === "dev"));
		}
	});

	$(".toSelect-layout").toSelect({
		data: [{
			value: "1",
			name: "独占"
		},{
			value: "2",
			name: "左右"
		}],
		callback: function (checkeds) {
			console.log(checkeds);
		}
	});

	$(".toSelect-theme").toSelect({
		data: [{
			value: "1",
			name: "绿色"
		},{
			value: "2",
			name: "红色"
		}],
		callback: function (checkeds) {
			console.log(checkeds);
		}
	})

	//普通组件
	$(".list-of-create").toList({
		clickable: true,
		data: [{
			content: '行 ( Row )',
			checked: true,
			role: 'row'
		},{
			content: '列 ( Col )',
			role: 'col'
		},{
			content: '静态文本 ( Text )',
			role: 'text'
		},{
			content: '单选框 ( Radio )',
			role: 'radio'
		},{
			content: '复选框 ( Checkbox )',
			role: 'checkbox'
		},{
			content: '下拉列表 ( Select )',
			role: 'select'
		},{
			content: '表格 ( Table )',
			role: 'table'
		},{
			content: '分页 ( Page )',
			role: 'page'
		},{
			content: '面板 ( Panel )',
			role: 'panel'
		},{
			content: '标签 ( Tab )',
			role: 'tab'
		},{
			content: '列表 ( List )',
			role: 'list'
		},{
			content: '长廊 ( Gallery )',
			role: 'gallery'
		}],
		callback: function ($li, data) {
			current = data;
			console.log(data);
		}
	});





	//页面宽调整
	$pageWidth.val(defaultPgeWidth);
	$pageWidth.blur(function () {
		scaleMainRoot($pageWidth.val());
	}).keypress(function (event) {
		event.keyCode === 13 &&	$(this).blur();
	});

	$rowMargin.blur(function () {
		setRowMargin($rowMargin.val());
	}).keypress(function (event) {
		event.keyCode === 13 &&	$rowMargin.blur();
	});

	$colPadding.blur(function () {
		setColPadding($colPadding.val());
	}).keypress(function (event) {
		event.keyCode === 13 &&	$colPadding.blur();
	});

	$previewBtn.click(function () {
			if ($main.hasClass('fullScreen')) {
				$main.removeClass('fullScreen');
				$previewBtn.html('全屏预览');
				scaleMainRoot($pageWidth.val());
			} else {
				$mainRoot.css('zoom', 1);
				$main.addClass('fullScreen');
				$previewBtn.html('退出全屏');
			}
	});

	//高亮已创建的组件
	$createdComponentList.on('mouseenter', 'li', function () {
		var id   = $(this).attr('id').replace('created-', '');
		var role = $(this).data('role');

		var $target = $("#" + id);

		var BCR = $target[0].getBoundingClientRect();

		if (role === "row" || role === "col") {
			$highlight.css({
				left:   BCR.left - 8,
				top:    BCR.top - 8,
				width:  BCR.width,
				height: BCR.height
			}).addClass('show');
		} else {
			$target.addClass('highlight');
		}
	});

	//去高亮已创建的组件
	$createdComponentList.on('mouseleave', 'li', function () {
		var id   = $(this).attr('id').replace('created-', '');
		var role = $(this).data('role');

		var $target = $("#" + id);

		if (role === "row" || role === "col") {
			$highlight.removeClass('show');
		} else {
			$target.removeClass('highlight');
		}
	});

	//删除已创建组件
	$createdComponentList.on('click', 'li > i', function () {
		var $parent = $(this).parent();
		var id 	 = $parent.attr('id').replace('created-', '');
		var role = $parent.data('role');

		var confirmText = "确定删除该组件？";

		if ((role === "row" || role === "col") && !$("#" + id).is(":empty")) {
			confirmText = "确定删除该组件（该组件下已包含其他组件）？"
		}

		$.cw.confirm(confirmText, function (flag) {
			if (flag) {
				var $cpt  = $("#" + id);
				var $wrap = $cpt.parent('.component-wrap');

				//循环删除自己下面创建的组件
				$cpt.find('[id]').each(function () {
					var id  = $(this).attr("id");
					var $li = $("#created-" + id);

					if ($li.length > 0) {

						if ($li.hasClass("active")) {
							$li.click();
						}

						removeCreatedComponentList(id);
					} else { /* 不是创建的组件 */ }
				});

				if ($wrap.length > 0) {
					//普通组件删除wrap层
					$wrap.remove();
				} else {
					//布局组件直接删除
					$cpt.remove();
				}

				removeCreatedComponentList(id);
			} else { /* 取消删除操作 */ }
		});

		return false;
	});

	//点击主面板创建Row
	$mainCanvas.click(function () {
		if (current) {
			if (current.role === "row") {
				var id = cw.createUUID();

				$mainRoot.append('<div class="cw-row" id="' + id + '"></div>');

				addCreatedComponentList(id, current.role);
			} else {
				$.cw.toast("主面板只能添加 &lt;Row&gt; 组件", 1000, $mainCanvas);
			}
		} else { /* 当前没有选中组件则没有操作 */ }
	});

	//Row里面只能创建Col
	$mainRoot.on('click', '.cw-row', function () {
		var $this = $(this);

		if (current) {
			if (current.role === "col") {
				var id = cw.createUUID();

				createdComponentConfig[id] = {};

				$this.append('<div class="cw-col" id="' + id + '"></div>');

				addCreatedComponentList(id, current.role);
			} else {
				$.cw.toast("&lt;Row&gt; 里面只能添加 &lt;Col&gt;", 1000, $mainCanvas);
			}
		} else { /* 当前没有选中组件则没有操作 */ }

		return false;
	});

	//Col面可以创建除Col以外的所有组件
	$mainRoot.on('click', '.cw-col', function () {
		if (current) {
			var $target = $(this);

			createComponent($target);
		} else { }

		return false;
	});

	//点击右侧<li/>
	$createdComponentList.on('click', 'li', function () {
		current2 = null;

		var $this = $(this);

		$bottom.empty().removeClass('empty');

		if ($this.hasClass('cw-list-active')) {
			$this.removeClass('cw-list-active');
			$bottom.addClass('empty').append('<span>请在【已创建的组件】中选择组件</span>');
		} else {
			$createdComponentList.children('.cw-list-active').removeClass('cw-list-active');
			$this.addClass('cw-list-active');

			var id   = $this.attr('id').replace('created-', '');
			var role = $this.data('role');

			var configs = createdConfig[id];

			var $row;

			if (configs instanceof Array && configs.length > 0) {
				var componentConfig = createdComponentConfig[id]; //当前编辑组件的属性

				current2 = {
					id: id,
					role: role
				};

				configs.forEach(function (config, index) {
					var type  = config.type;
					var key   = config.key;
					var value = config.value || "";

					if (index % 3 === 0) {
						$row = $('<div class="cw-row"></div>');
						$bottom.append($row);
					}

					var $text = $('<div class="cw-col col-1 cw-text-right">' + config.text + '</div>');
					var $cfg  = $('<div class="cw-col col-3"></div>');

					if (type === "text") {
						var fromSource = !!config.source;

						var $input = $('<input type="text" />')
													.val(value)
													.data("old", value);

						$cfg.append($input);

						$input.change(function () {
							var data = this.value;

							if (fromSource) {
								data = DS_CUSTOM[data];

								if (!data) {
									return $.cw.alert('数据源【' + value + '】不存在');
								}

								config.value = this.value;

								componentConfig[key] = data;

								rerenderComponent(componentConfig);
							} else {
								typeof config.callback === "function" && config.callback(data, this);
							}
						}).focus(function () {
							$(this).select();
						});
					} else if (type === "content") {
						var $input = $('<input type="text" value="' + value + '" />');

						$cfg.append($input);

						$input.change(function () {
							$("#" + current2.id).html($(this).val());
						});
					} else {
						var attrComponentConfig = config.config;

						if (type === "select") {
							attrComponentConfig.expandTo = "top";
						}

						if (typeof attrComponentConfig.callback !== "function") {
							var attrComponentConfigData = attrComponentConfig.data;

							attrComponentConfig.callback = function (checked) {
								attrComponentConfigData.forEach(function (data) {
									if (data.value === checked.value && data.name === checked.name) {
										data.checked = true;
									} else {
										data.checked = false;
									}
								});

								componentConfig[key] = checked.value;

								if (typeof config.callback === "function") {
									config.callback(checked);
								} else {
									rerenderComponent(componentConfig);
								}
							}
						}

						$cfg["to" + cw.capitalize(type)](attrComponentConfig);
					}

					$row.append($text);
					$row.append($cfg);
				});
			} else {
				$bottom.addClass('empty').append('<span>该组件暂无配置项</span>');
			}
		}
	});

	document.head.appendChild(rowMarginStyleNode);
	document.head.appendChild(colPaddingStyleNode);
});
