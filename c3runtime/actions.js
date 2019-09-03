"use strict";

{
	C3.Plugins.NinjaMuffin_NewgroundsC3Port.Acts =
	{
		Alert()
		{
			alert("Test property = " + this._testProperty);
		},
		Login()
		{
			var self = this;
			var onLoggedIn = function () {
				self.onLoggedIn();
			};
			var onLoginFailed = function () {
				self.Trigger(C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds.OnLoginError, self);
			};
			var onLoginCancelled = function () {
				self.Trigger(C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds.OnLoginCancel, self);
			};
	
			var onGetSession = function () {
				self.ngio["requestLogin"](onLoggedIn, onLoginFailed, onLoginCancelled);
			};
	
			this.ngio["getSessionLoader"]()["getValidSession"](onGetSession);
		},

		LoggingOut()
		{
			var self = this;
			var onLoggedOut = function () {
				self.onLoggedOut();
			}
			var onGetSession = function () {
				self.ngio["logOut"](onLoggedOut);
			};

			this.ngio["getSessionLoader"]()["getValidSession"](onGetSession);
		}
	};
}