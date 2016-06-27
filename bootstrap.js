$(".toScroll").toScroll({
	gap: 10
});

$(".toPage").toPage({
	max: 10
});

$(".toRadio").toRadio({
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

$(".toCheckbox").toCheckbox({
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

$(".toSelect").toSelect({
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

$(".toPanel.tpl1").toPanel({
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

$(".toPanel.tpl2").toPanel({
	icon: 	 "./images/icon_check.png",
	title: 	 "这是一个带icon但没有footer的Panel组件",
	content: "我是panel的content部分",
});

$(".toPanel.tpl3").toPanel({
	title: 	 "这是不带icon又没有footer的Panel组件",
	content: "我是panel的content部分",
});

$(".toTable").toTable({
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

$(".toTab").toTab({
	tabs: [{
		text: '一年级',
		content: '这是一年级'
	},{
		text: '二年级',
		content: '这是二年级'
	}],
	callback: function ($content, index) {
		index === 2 && $content.html("hahaha");
	}
});