/*
 * 暂时没有滚动条(Scroll)的演示支持
 */

$(function () {
	var current;

	var $toListLayout;
	var $toListComponent;
	var $createdComponentList = $(".created-component-list");
	var $main = $("#main");
	var $mainRoot = $("#main-root");
	var $listOfCreated = $(".list-of-created");
	var $highlight = $(".cover-highlight");

	var capitalize = function (str) {
		var cap = str[0].toUpperCase();

		return cap + str.substring(1);
	};

	var createComponent = function ($this) {
		var id = $.cw.uuid();
		var role = current.role;

		if (role === "col") {
			$.cw.alert("&lt;Col&gt;里面不能嵌套&lt;Col&gt;");
		} else if (role === "row") {
			$this.append('<div class="cw-row" id="' + id + '"></div>');

			addCreatedComponentList(id, role);
		} else {
			if (role === "radio") {
				$this.toRadio({
					id: id,
					arrange: "-",
					data: DS.radio,
					callback: function (checked) {
						console.log(checked);
					}
				});
			} else if (role === "checkbox") {
				$this.toCheckbox({
					id: id,
					data: DS.checkbox,
					allBtn: true,
					callback: function (checkeds) {
						console.log(checkeds);
					}
				});
			} else if (role === "select") {
				$this.toSelect({
					id: id,
					data: DS.select,
					callback: function (checkeds) {
						console.log(checkeds);
					}
				});
			} else if (role === "table") {
				$this.toTable({
					id: id,
					mode: 2,
					cols: DS.table.cols,
					rows: DS.table.rows
				});
			} else if (role === "page") {
				$this.toPage({
					id: id,
					max: 10
				});
			} else if (role === "panel") {
				$this.toPanel({
					id: id,
					icon: 	 "./images/icon_check.png",
					title: 	 "这是一个带icon的Panel组件",
					content: "我是panel的content部分",
					btns: [{
						name: "确定",
						callback: function () {
							alert("确定");
						}
					}, {
						name: "取消"
					}]
				});
			} else if (role === "tab") {
				$this.toTab({
					id: id,
					tabs: DS.tab,
					active: 2,
					callback: function ($content, index) {
						index === 2 && $content.html("hahaha");
					}
				});
			} else if (role === "list") {
				$this.toList({
					id: id,
					clickable: true,
					data: DS.list,
					callback: function ($li, data) {
						console.log(data);
					}
				});
			} else if (role === "gallery") {
				$this.toGallery({
					id: id,
					data: DS.gallery
				});
			} else {
				return console.warn('unknown component <' + role + '>, please feedback to <337487652@qq.com>');
			}

			$("#" + id).wrap('<div class="component-wrap"></div>');
			// addColCover($this, id);
			addCreatedComponentList(id, role);
		}
	};

	/*
	var replaceComponent = function ($target) {
		if ($target.is(':empty')) {
			createComponent($target);
		} else {
			$.cw.confirm('确定替换该区域内的组件？', function (flag) {
				if (flag) {
					var id = $target.children(":first").attr('id');
					removeCreatedComponentList(id);
					createComponent($target);
				}
			});
		}
	};
	
	var addColCover = function ($this, id) {
		var BCR = document.querySelector("#" + id).getBoundingClientRect();
		var $coverCol = $("<div class='cover-col'></div>");

		$coverCol.css({
			left:   BCR.left - 8,
			top:    BCR.top - 8,
			width:  BCR.width,
			height: BCR.height
		});

		$this.append($coverCol);
	};
	*/

	var addCreatedComponentList = function (id, role) {
		$createdComponentList.append('<li id="created-' + id + '" data-role="' + role + '">' +
									 '	<span>' + capitalize(role) + ' ( #' + id + ' )</span>' +
									 '	<i title="Delete">x</i>' +
									 '	<div></div>' +
									 '</li>');

		$listOfCreated.toScroll({
			gap: 33
		});
	};

	var removeCreatedComponentList = function (id) {
		$("#created-" + id).remove();
	};

	$(".toSelect-mode").toSelect({
		data: [{
			value: "dev",
			name: "开发"
		},{
			value: "preview",
			name: "预览"
		}],
		callback: function (checkeds) {
			console.log(checkeds);
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
		}],
		// active: 2,
		// callback: function ($content, index) {
		// 	index === 2 && $content.html("hahaha");
		// }
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
				var $parent = $("#" + id).parent('.component-wrap');
				
				if ($parent.length > 0) {
					$parent.remove();
				} else {
					$("#" + id).remove();
				}

				removeCreatedComponentList(id);
			} else { }
		});
	});

	//点击主面板创建Row
	$main.click(function () {
		if (current) {
			if (current.role === "row") {
				var id = $.cw.uuid();

				$mainRoot.append('<div class="cw-row" id="' + id + '"></div>');

				addCreatedComponentList(id, current.role);
			} else {
				$.cw.alert("主面板只能添加&lt;Row&gt;组件");
			}
		} else { }
	});

	//Row里面只能创建Col
	$("#main-root").on('click', '.cw-row', function () {
		var $this = $(this);

		if (current) {
			if (current.role === "col") {
				var id = $.cw.uuid();

				$this.append('<div class="cw-col ' + current.width + '" id="' + id + '"></div>');

				addCreatedComponentList(id, current.role);
			} else {
				$.cw.alert("&lt;Row&gt;里面只能添加&lt;Col&gt;");
			}
		} else { }

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

	/*
	$("#main-root").on('click', '.cover-col', function () {

		if (current) {
			var $target = $(this).parent('.cw-col');

			// replaceComponent($target);
			createComponent($target);
		} else { }

		return false;
	});
	*/

	//参数赋值
	$toListLayout 	 = $("#tab-of-component-content-1 > .cw-list");
	$toListComponent = $("#tab-of-component-content-2 > .cw-list");
});