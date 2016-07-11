const str = ('abcdefghijklmnopqrstuvwxyz' +
			 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
			 '1234567890').split('');

var cw = window.cw = {};

//创建唯一ID
cw.createUUID = function (digit) {
	var _digit = digit || 4;
	var uuid = "";

	for (var i=0; i<_digit; i++) {
		uuid += str[~~(Math.random() * str.length)];
	}

	return uuid;
};

//首字母大写
cw.capitalize = function (str) {
	return typeof str === "string" ? str[0].toUpperCase() + str.substring(1) : str;
};

//获得DOM的真实高度
cw.getDomContentHeight = function (node) {
	var _node = jQuery && node instanceof jQuery ? node[0] : node;
	var style = window.getComputedStyle(_node, null);

	return parseFloat(style.getPropertyValue('height'));
};
