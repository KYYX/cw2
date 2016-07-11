/*
 * 各组件配置的配置项
 */
var CONFIG = {
	//行
	row: [
		{
			key:   "margin",
			text:  "行间距",
			type:  "text",
			value: "全局设置",
			callback: function (marginBottom, self) {
				var _marginBottom = Number(marginBottom);
				var $input = $(self);

				if (_marginBottom > 0) {
					$("#" + current2.id).css('marginBottom', _marginBottom);
					$input.data('old', _marginBottom)
				} else {
					$.cw.alert('行间距只能为大于0的数字', function () {
						$input.select();
					});
					$input.val($input.data("old"));
				}
			}
		}
	],
	//列
	col: [
		{
			key:  "padding",
			text: "内边距",
			type: "select",
			config: {
				data: [{name: "有", value: 1, checked: true}, {name: "无", value: 0}]
			},
			callback: function (checked) {
				$("#" + current2.id).toggleClass('nopadding', checked.value);
			}
		},
		{
			key:  "width",
			text: "宽度",
			type: "select",
			config: {
				data: [
					{name: "自适应",  value: "0", checked: true},
					{name: "1 / 12",  value: "1"},
					{name: "2 / 12",  value: "2"},
					{name: "3 / 12",  value: "3"},
					{name: "4 / 12",  value: "4"},
					{name: "5 / 12",  value: "5"},
					{name: "6 / 12",  value: "6"},
					{name: "7 / 12",  value: "7"},
					{name: "8 / 12",  value: "8"},
					{name: "9 / 12",  value: "9"},
					{name: "10 / 12", value: "10"},
					{name: "11 / 12", value: "11"},
					{name: "独占",    value: "12"
				}]
			},
			callback: function (checked) {
				var currentEditNode = $("#" + current2.id)[0];

				currentEditNode.className = currentEditNode.className.replace(/\s?col-\d{1,2}/g, "") + " col-" + checked.value;
			}
		},
		{
			key:  "offset",
			text: "列偏移",
			type: "select",
			config: {
				data: [
					{name: "不偏移",  value: "0", checked: true},
					{name: "1 / 12",  value: "1"},
					{name: "2 / 12",  value: "2"},
					{name: "3 / 12",  value: "3"},
					{name: "4 / 12",  value: "4"},
					{name: "5 / 12",  value: "5"},
					{name: "6 / 12",  value: "6"},
					{name: "7 / 12",  value: "7"},
					{name: "8 / 12",  value: "8"},
					{name: "9 / 12",  value: "9"},
					{name: "10 / 12", value: "10"},
					{name: "11 / 12", value: "11"}
				]
			},
			callback: function (checked) {
				var currentEditNode = $("#" + current2.id)[0];

				currentEditNode.className = currentEditNode.className.replace(/\s?offset-\d{1,2}/g, "") + " offset-" + checked.value;
			}
		},
		{
			key:  "align",
			text: "水平对齐",
			type: "select",
			config: {
				data: [
					{name: "左", value: "left", checked: true},
					{name: "中", value: "center"},
					{name: "右", value: "right"}
				]
			},
			callback: function (checked) {
				$("#" + current2.id)
					.removeClass('cw-text-center cw-text-left cw-text-right')
					.addClass('cw-text-' + checked.value);
			}
		}
	],
	//静态文本
	text: [
		{
			key:   "text",
			text:  "文本内容",
			value: "静态文本",
			type:  "content"
		},
		{
			key:  "bold",
			text: "是否加粗",
			type: "checkbox",
			config: {
				data: [{name: "是", value: 1}]
			},
			callback: function (checked) {
				var fontWeight = checked.length > 0 ? "bold" : "normal";

				$("#" + current2.id).css('fontWeight', fontWeight);
			}
		}
	],
	//单选
	radio: [
		{
			key:   "data",
			text:  "数据源",
			value: "radio",
			type:  "text",
			source: true
		},
		{
			key:  "arrange",
			text: "排列方式",
			type: "select",
			config: {
				data: [{name: "水平", value: "-", checked: true}, {name: "垂直", value: "|"}]
			}
		}
	],
	//复选
	checkbox: [
		{
			key:   "data",
			text:  "数据源",
			value: "checkbox",
			type:  "text",
			source: true
		},
		{
			key:  "arrange",
			text: "排列方式",
			type: "select",
			config: {
				data: [{name: "水平", value: "-", checked: true}, {name: "垂直", value: "|"}]
			}
		}
	],
	//下拉
	select: [
		{
			key:   "data",
			text:  "数据源",
			value: "select",
			type:  "text",
			source: true
		}
	],
	//表格
	table: [
		{
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
		},
		{
			key:  "cols",
			text: "表头",
			type: "text",
			source: true
		},
		{
			key:  "rows",
			text: "数据源",
			type: "text",
			source: true
		}
	],
	//分页
	page: [
		{
			key: "max",
			text: "最大页码",
			type: "text",
			value: 1
		}
	],
	//面板
	panel: [
		{
			key:  "title",
			text: "标题",
			type: "text"
		}
	],
	//标签
	tab: [
			{
			key:  "tabs",
			text: "标签名列表",
			value: "tab",
			type: "text",
			source: true
		}
	],
	//列表
	list: [
		{
			key:  "data",
			text: "数据源",
			value: "list",
			type: "text",
			source: true
		}
	],
	//长廊
	gallery: [
		{
			key:   "data",
			text:  "数据源",
			value: "gallery",
			type:  "text",
			source: true
		},
		{
			key:  "height",
			text: "高度",
			type: "text"
		},
		{
			key:  "count",
			text: "每页显示数量",
			type: "text"
		}
	]
};
