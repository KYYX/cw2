/*
 * 暂时没有滚动条(Scroll)的演示支持
 * 有部分全局变量，会污染环境
 */

var current2; //当前配置组件 {id:, role:}

$(function () {
	var $pageWidth = $("#page-width");
	var $toListLayout;
	var $toListComponent;
	var $createdComponentList = $(".created-component-list");
	var $main 		= $("#main");
	var $mainCanvas = $("#main-canvas");
	var $mainRoot   = $("#main-root");
	var $bottom = $("#bottom");
	var $listOfCreated = $(".list-of-created");
	var $highlight = $(".cover-highlight");

	var current;  //当前创建的组件 {id:, role: }
	var createdConfig = {}; //已创建的组件的属性配置
	var createdComponentConfig = {}; //已创建的组件属性
	var defaultPgeWidth = $mainRoot.width();

	var createComponent = function ($this) {
		var id = cw.createUUID();
		var role = current.role;

		if (role === "col") {
			$.cw.alert("&lt;Col&gt;里面不能嵌套&lt;Col&gt;");
		} else if (role === "row") {
			$this.append('<div class="cw-row" id="' + id + '"></div>');

			addCreatedComponentList(id, role);
		} else if (role === "text") {
			var $span = $('<span class="cw-text" id="' + id + '" contenteditable="true">静态文本</span>').click(function (event) {
				event.stopPropagation();
			});

			$this.append($span);

			addCreatedComponentList(id, role);
		} else {
			try {
				var componentConfig = $.extend(true, {id: id}, CONFIG_COMPONENT[role.toUpperCase()], DS[role]);

				$this["to" + cw.capitalize(role)](componentConfig);

				$("#" + id).wrap('<div class="component-wrap"></div>');

				createdComponentConfig[id] = componentConfig;
			
				addCreatedComponentList(id, role);
			} catch (e) {
				return console.warn('unknown component <' + role + '>, please feedback to <337487652@qq.com>');
			}
		}
	};

	//编辑组件属性后，重绘组件
	var rerenderComponent = function (componentConfig) {
		var $parent = $("#" + current2.id).parent();

		$("#" + current2.id).remove();

		$parent["to" + cw.capitalize(current2.role)](componentConfig);
	};

	var addCreatedComponentList = function (id, role) {
		$createdComponentList.append('<li id="created-' + id + '" data-role="' + role + '">' +
									 '	<span>' + cw.capitalize(role) + ' ( #' + id + ' )</span>' +
									 '	<i title="Delete">x</i>' +
									 '	<div></div>' +
									 '</li>');

		$listOfCreated.toScroll({
			gap: 33
		});

		createdConfig[id] = $.extend(true, [], CONFIG[role]);
	};

	var removeCreatedComponentList = function (id) {
		$("#created-" + id).remove();
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

	//左侧组件栏
	$(".toTab-component").toTab({
		id: "tab-of-component",
		tabs: [{
			text: '布局'
		},{
			text: '组件'
		}]
	});

	//布局组件
	$("#tab-of-component-content-1").toList({
		clickable: true,
		data: [{
			content: '行 ( Row )',
			width: 'w',
			role: 'row'
		},{
			content: '列 ( 自适应宽 )',
			width: 'auto',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;1/12 宽 )',
			width: 'w1',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;2/12 宽 )',
			width: 'w2',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;3/12 宽 )',
			width: 'w3',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;4/12 宽 )',
			width: 'w4',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;5/12 宽 )',
			width: 'w5',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;6/12 宽 )',
			width: 'w6',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;7/12 宽 )',
			width: 'w7',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;8/12 宽 )',
			width: 'w8',
			role: 'col'
		},{
			content: '列 ( &nbsp;&nbsp;9/12 宽 )',
			width: 'w9',
			role: 'col'
		},{
			content: '列 ( 10/12 宽 )',
			width: 'w10',
			role: 'col'
		},{
			content: '列 ( 11/12 宽 )',
			width: 'w11',
			role: 'col'
		},{
			content: '列 ( 独占 )',
			width: 'w12',
			role: 'col'
		}],
		callback: function ($li, data) {
			$toListComponent.children(".cw-list-active").removeClass('cw-list-active');
			current = data;
			console.log(data);
		}
	});

	//普通组件
	$("#tab-of-component-content-2").toList({
		clickable: true,
		data: [{
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
			$toListLayout.children(".cw-list-active").removeClass('cw-list-active');
			current = data;
			console.log(data);
		}
	});





	//页面宽调整
	$pageWidth.val(defaultPgeWidth).blur(function () {
		var pageWidth = Number($(this).val());

		if (pageWidth) {
			if (pageWidth > defaultPgeWidth) {
				$mainRoot.css({
					width: pageWidth,
					zoom: defaultPgeWidth / pageWidth
				});
			} else {
				$mainRoot.css({
					width: pageWidth,
					zoom: 1
				});
			}
		} else {
			$pageWidth.val($mainCanvas.width())
		}
	}).keypress(function (event) {
		if (event.keyCode === 13) {
			$(this).blur();
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
	$main.click(function () {
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
	$("#main-root").on('click', '.cw-row', function () {
		var $this = $(this);

		if (current) {
			if (current.role === "col") {
				var id = cw.createUUID();

				$this.append('<div class="cw-col ' + current.width + '" id="' + id + '"></div>');

				addCreatedComponentList(id, current.role);
			} else {
				$.cw.toast("&lt;Row&gt; 里面只能添加 &lt;Col&gt;", 1000, $mainCanvas);
			}
		} else { /* 当前没有选中组件则没有操作 */ }

		return false;
	});

	//Col面可以创建除Col以外的所有组件
	$("#main-root").on('click', '.cw-col', function () {
		if (current) {
			var $target = $(this);

			createComponent($target);
		} else { }

		return false;
	});

	//参数赋值
	$toListLayout 	 = $("#tab-of-component-content-1 > .cw-list");
	$toListComponent = $("#tab-of-component-content-2 > .cw-list");

	//点击右侧<li/>
	$createdComponentList.on('click', 'li', function () {
		current2 = null;

		var $this = $(this);

		$bottom.empty().removeClass('empty');

		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$bottom.addClass('empty').append('<span>请在【已创建的组件】中选择组件</span>');
		} else {
			$createdComponentList.children('.active').removeClass('active');
			$this.addClass('active');

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
					var type = config.type;
					var key  = config.key;

					if (index % 3 === 0) {
						$row = $('<div class="cw-row"></div>');
						$bottom.append($row);
					}

					var $text = $('<div class="cw-col w1 cw-text-right">' + config.text + '</div>');
					var $cfg  = $('<div class="cw-col w3"></div>');

					if (type === "text") {
						var fromSource = !!config.source;

						var $input = $('<input type="text" value="' + (config.value || "") + '" />');

						$cfg.append($input);

						$input.change(function () {
							var data = this.value;

							if (fromSource) {
								data = DS_CUSTOM[data];
								
								if (!data) {
									return $.cw.alert('数据源【' + this.value + '】不存在');
								}
							}

							config.value = this.value;

							componentConfig[key] = data;

							rerenderComponent(componentConfig);
						});
					} else if (type === "content") {
						var $input = $('<input type="text" value="' + (config.value || "") + '" />');

						$cfg.append($input);

						$input.change(function () {
							$("#" + current2.id).html($(this).val());
						});
					} else {
						var attrComponentConfig = config.config;

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

								rerenderComponent(componentConfig);
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
});