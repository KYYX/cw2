module.exports = {
	/*
	 @name 分页组件默认配置
	 @param  max:number:1 -> 最大页码
	 @param  cur:number:1 -> 当前页码
	 @param auto:boolean:true -> 初次加载是否执行回调函数
	 @param callback:function(cur) -> 回调函数
	 */
	PAGE: {
		max:  1,
		cur:  1,
		auto: true,
		callback: function () {}
	},
	/*
	 @name 滚动条组件默认配置
	 @param  gap:number:40 -> 滚轮滚动一次移动的距离
	 @param  top:number:0  -> 滚动条默认距离顶部的位置
	 @TODO 拖拽滚动条
	 */
	SCROLL: {
		gap:  40,
        top:  0
	},
	/*
	 @name 单选组件默认配置
	 @param arrange:string:| -> 排列方式，-水平，!垂直
	 @param alias:object:{name,value} -> 别名对应
	 @param data:array:[]
	 @param callback:function(checked:object): -> 点击回调
	 */
	RADIO: {
		arrange: "|",
		alias: {name: 'name', value: 'value'},
		data: [],
		callback: function (checked) {}
	},
	/*
	 @name 复选组件默认配置
	 @param arrange:string:| -> 排列方式，-水平，!垂直
	 @param alias:object:{name,value} -> 别名对应
	 @param allBtn:boolean:false -> 是否有全选按钮
	 @param data:array:[]
	 @param callback:function(checkeds:array): -> 点击回调
	 */
	CHECKBOX: {
		arrange: "|",
		alias: {name: 'name', value: 'value'},
		data: [],
		allBtn: false,
		callback: function (checkeds) {}
	},
	/*
	 @name 下拉组件默认配置
	 @param alias:object:{name,value} -> 别名对应
	 @param data:array:[]
	 @param callback:function(checked): -> 点击回调
	 */
	SELECT: {
		placeholder: "",
		alias: {name: 'name', value: 'value'},
		data: [],
		callback: function (checked) {}
	},
	/*
	 @name 面板组件默认配置
	 @param title:string
	 @param content:string | jQuery
	 @param btns:array:[]
	 */
	PANEL: {
		title: "",
		content: "",
		btns: []
	},

	/*
	 @name 表格组件默认配置
	 @param mode:number -> 表格行是否可以选择
	 */
	TABLE: {
		mode: 0,
		cols: [],
		rows: [],
	},

	/*
	 * @name 标签组件默认配置
	 */
	TAB: {
		tabs: [],
		active: 1,
		callback: function ($currentContent) { }
	},

	/*
	 * @name 列表组件默认配置
	 */
	 LIST: {
	 	clickable: false,
	 	data: [],
	 	callback: function ($li, data) { }
	 },

	 /*
	 * @name 长廊组件默认配置
	 */
	 GALLERY: {
	 	count: 6,
	 	data: []
	 }
}