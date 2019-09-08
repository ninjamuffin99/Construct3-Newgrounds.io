"use strict";

var getHandler = function (self, successTrig, errorTrig, callback) {
	var handler = function (result) {
		if (callback)
			callback(result);

		self.lastResult = result;
		var trig = (result["success"]) ? successTrig : errorTrig;
		self.Trigger(trig, self);
	};
	return handler;
};

var fake_ret = {
	value: 0,
	set_any: function (value) { this.value = value; },
	set_int: function (value) { this.value = value; },
	set_float: function (value) { this.value = value; },
	set_string: function (value) { this.value = value; },
};


{
	C3.Plugins.NinjaMuffin_NewgroundsC3Port = class NinjaMuffin_NewgroundsC3PortPlugin extends C3.SDKPluginBase
	{
		constructor(opts)
		{
			super(opts);
		}
		
		Release()
		{
			super.Release();
		}
	};
}