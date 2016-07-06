/*
 * 各组件的配置项
 */
var CONFIG = {
	col: [{
		key:  "padding",
		text: "内边距",
		type: "radio",
		config: {
			data: [{name: "有", value: 1, checked: true}, {name: "无", value: 0}],
			callback: function (checked) {
				$("#" + current2.id).toggleClass('nopadding', checked.value);
			}
		}
	},{
		key:  "align",
		text: "水平对齐",
		type: "radio",
		config: {
			data: [{
				name: "左", value: "left", checked: true
			},{
				name: "中", value: "center"
			},{
				name: "右", value: "right"
			}],
			callback: function (checked) {
				$("#" + current2.id).removeClass('cw-text-center cw-text-left cw-text-right')
									.addClass('cw-text-' + checked.value);
			}
		}
	}],

	text: [{
		key:   "text",
		text:  "文本内容",
		value: "静态文本",
		type:  "content"
	}],

	radio: [{
		key:   "data",
		text:  "数据源",
		value: "radio",
		type:  "text",
		source: true
	}, {
		key:  "arrange",
		text: "排列方式",
		type: "radio",
		config: {
			data: [{name: "水平", value: "-", checked: true}, {name: "垂直", value: "|"}]
		}
	}],

	checkbox: [{
		key:   "data",
		text:  "数据源",
		value: "checkbox",
		type:  "text",
		source: true
	}, {
		key:  "arrange",
		text: "排列方式",
		type: "radio",
		config: {
			data: [{name: "水平", value: "-", checked: true}, {name: "垂直", value: "|"}]
		}
	}],

	select: [{
		key:   "data",
		text:  "数据源",
		value: "select",
		type:  "text",
		source: true
	}],

	table: [{
		key:  "mode",
		text: "模式",
		type: "select",
		config: {
			data: [{
				name: "普通",
				value: 0,
				checked: true
			},{
				name: "带单选框",
				value: 1
			},{
				name: "带复选框",
				value: 2
			}]
		}
	},{
		key:  "cols",
		text: "表头",
		type: "text",
		source: true
	},{
		key:  "rows",
		text: "数据源",
		type: "text",
		source: true
	}],

	page: [{
		key: "max",
		text: "最大页码",
		type: "text",
		value: 1
	}],

	panel: [{
		key:  "title",
		text: "标题",
		type: "text"
	}],

	tab: [{
		key:  "tabs",
		text: "标签名列表",
		value: "tab",
		type: "text",
		source: true
	}],

	list: [{
		key:  "data",
		text: "数据源",
		value: "list",
		type: "text",
		source: true
	}],

	gallery: [{
		key:   "data",
		text:  "数据源",
		value: "gallery",
		type:  "text",
		source: true
	},{
		key:  "height",
		text: "高度",
		type: "text"
	},{
		key:  "count",
		text: "每页显示数量",
		type: "text"
	}]
}