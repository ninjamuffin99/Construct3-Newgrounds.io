"use strict";

{
	C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds =
	{
		IsLargeNumber(number)
		{
			return number > 100;
		},

		OnLoginSuccess()
		{
			return true;
		},

		OnLoginError()
		{
			return true;
		},
		OnLoginCancel()
		{
			return true;
		},
		IsLogin()
		{
			return false;
			//maybe have to do `return C3.Plugins.NinjaMuffin_NewgroundsC3Port.Instance.isLogin
			//return this.IsLogin;
		},
		OnLoggedOut()
		{
			return true;
		}
	};
}