/*
 * DS = data store
 * 生成组件时用的默认数据源
 */
var DS = {
	radio: { 
		data: [{
			value: "apple",
			name: "苹果"
		},{
			value: "banana",
			name: "香蕉"
		},{
			value: "pear",
			name: "梨子"
		}]
	},

	checkbox: {
		data: [{
			value: "footbal",
			name: "足球"
		},{
			value: "basketball",
			name: "篮球"
		},{
			value: "volleyball",
			name: "排球"
		}]
	},

	select: {
		data: [{
			value: "footbal",
			name: "足球"
		},{
			value: "basketball",
			name: "篮球"
		},{
			value: "volleyball",
			name: "排球"
		}]
	},

	table: {
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
	},

	tab: {
		tabs: [{
			text: '一年级',
			content: '这是一年级'
		},{
			text: '二年级',
			content: '这是二年级'
		}]
	},

	list: {
		data: [{
			content: 'Can you play the guitar?'
		},{
			content: 'What time do you go to school?'
		},{
			content: 'How do you go to school?'
		}]
	},

	gallery: {data: [1,2,3,4,5,6,7,8,9,10]}
};