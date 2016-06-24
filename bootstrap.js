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
	icon: "./images/icon_check.png",
	title: "这是一个带icon的Panel组件",
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
	icon: "./images/icon_check.png",
	title: "这是一个带icon但没有footer的Panel组件",
	content: "我是panel的content部分",
});

$(".toPanel.tpl3").toPanel({
	title: "这是不带icon又没有footer的Panel组件",
	content: "我是panel的content部分",
});