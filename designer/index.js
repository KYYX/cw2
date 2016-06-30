$(function () {
	var current;
	var $toListLayout;
	var $toListComponent;
	var $createdComponentList = $(".created-component-list");
	var $main = $("#main");
	var $mainRoot = $("#main-root");

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
			content: '列 ( 1/12 宽 )',
			width: 'w1',
			role: 'col'
		},{
			content: '列 ( 1/6 宽 )',
			width: 'w2',
			role: 'col'
		},{
			content: '列 ( 1/4 宽 )',
			width: 'w3',
			role: 'col'
		},{
			content: '列 ( 1/3 宽 )',
			width: 'w4',
			role: 'col'
		},{
			content: '列 ( 5/12 宽 )',
			width: 'w5',
			role: 'col'
		},{
			content: '列 ( 1/2 宽 )',
			width: 'w6',
			role: 'col'
		},{
			content: '列 ( 7/12 宽 )',
			width: 'w7',
			role: 'col'
		},{
			content: '列 ( 2/3 宽 )',
			width: 'w8',
			role: 'col'
		},{
			content: '列 ( 3/4 宽 )',
			width: 'w9',
			role: 'col'
		},{
			content: '列 ( 5/6 宽 )',
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
			content: '滚动条 ( Scroll )',
			role: 'scroll'
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

	//点击主面板创建Row
	$main.click(function () {
		if (current && current.role === "row") {
			$mainRoot.append('<div class="cw-row"></div>');

			$createdComponentList.append('<li>' + current.role + ' ( #' + $.cw.uuid() + ' ) </li>')
		} else {
			$.cw.alert("请先在左侧选择行(Row)组件");
		}
	});

	//Row里面只能创建Col
	$("#main-root").on('click', '.cw-row', function () {
		var $this = $(this);

		if (current && current.role === "col") {
			$this.append('<div class="cw-col ' + current.width + '"></div>');
		} else {
			$.cw.alert("您当前选择的" + current.role + "组件，不被该容器所接受");
		}

		return false;
	});

	//Col面可以创建除Col以外的所有组件
	$("#main-root").on('click', '.cw-col', function () {
		var $this = $(this);

		if (current) {
			var role = current.role;

			if (role === "row") {
				$this.append('<div class="cw-row"></div>');
			} else if (role === "radio") {
				$this.toRadio({
					arrange: "-",
					data: [{
						value: "apple",
						name: "苹果"
					},{
						value: "banana",
						name: "香蕉"
					},{
						value: "pear",
						name: "梨子"
					}],
					callback: function (checked) {
						console.log(checked);
					}
				});
			} else if (role === "checkbox") {
				$this.toCheckbox({
					data: [{
						value: "footbal",
						name: "足球"
					},{
						value: "basketball",
						name: "篮球"
					},{
						value: "volleyball",
						name: "排球"
					}],
					allBtn: true,
					callback: function (checkeds) {
						console.log(checkeds);
					}
				});
			} else if (role === "select") {
				$this.toSelect({
					data: [{
						value: "footbal",
						name: "足球"
					},{
						value: "basketball",
						name: "篮球"
					},{
						value: "volleyball",
						name: "排球"
					}],
					callback: function (checkeds) {
						console.log(checkeds);
					}
				});
			} else if (role === "table") {
				$this.toTable({
					mode: 2,
					cols: [{
						key:  'name',
						text: '作业名称',
						type: 'url'
					}, {
						key:  'time',
						text: '提交时间'
					}, {
						key:  'score',
						text: '成绩'
					}, {
						key:  'time2',
						text: '完成时长'
					}],
					rows: [{
						name: 'Unit 1', href: '#', time: '2016-6-12', score: '100', time2: '6 min'
					},{
						name: 'Unit 1', href: '#', time: '2016-6-12', score: '100', time2: '6 min'
					},{
						name: 'Unit 1', href: '#', time: '2016-6-12', score: '100', time2: '6 min'
					}]
				});
			} else if (role === "page") {
				$this.toPage({
					max: 10
				});
			} else if (role === "scroll") {
				//TODO
			} else if (role === "panel") {
				$this.toPanel({
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
					tabs: [{
						text: '一年级',
						content: '这是一年级'
					},{
						text: '二年级',
						content: '这是二年级'
					}],
					active: 2,
					callback: function ($content, index) {
						index === 2 && $content.html("hahaha");
					}
				});
			} else if (role === "list") {
				$this.toList({
					clickable: true,
					data: [{
						content: 'Can you play the guitar?'
					},{
						content: 'What time do you go to school?'
					},{
						content: 'How do you go to school?'
					}],
					callback: function ($li, data) {
						console.log(data);
					}
				});
			} else if (role === "gallery") {
				$this.toGallery({
					data: [1,2,3,4,5,6,7,8,9,10]
				});
			} else {
				$.cw.alert("您当前选择的" + role + "组件，不被该容器所接受");
			}
		} else {
			$.cw.alert("请先在左右选择组件");
		}

		return false;
	});

	//参数赋值
	$toListLayout 	 = $("#tab-of-component-content-1 > .cw-list");
	$toListComponent = $("#tab-of-component-content-2 > .cw-list");
});