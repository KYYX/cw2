$(function () {
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
});