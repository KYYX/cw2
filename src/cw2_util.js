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