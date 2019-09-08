"use strict";

{
	
	C3.Plugins.NinjaMuffin_NewgroundsC3Port.Acts =
	{
		// AUTHENTICATION SHIT
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
		},

		//MEDAL SHIT
		GetList()
		{
			var self = this;
			var getMedals = function (result) {
				if (result["success"]) {
					self.lastMedals = [];
					var medals = result["medals"], medal;
					var i, cnt = medals.length;
					for (i = 0; i < cnt; i++) {
						medal = medals[i];
						var data = {
							"description": medal["description"],
							"difficulty": medal["difficulty"],
							"icon": medal["icon"],
							"id": medal["id"],
							"name": medal["name"],
							"secret": medal["secret"],
							"value": medal["value"],
						};
						if (medal["unlocked"] != null)
							data["unlocked"] = medal["unlocked"];

						self.lastMedals.push(data);
					}
				}
				else {
					self.lastMedals = null;
				}

			};

			var cnds = C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds;
			var callback = getHandler(this, cnds.OnGetMedalsListSuccess, cnds.OnGetMedalsListError, getMedals);
			this.GetNGIO()["callComponent"]("Medal.getList", {}, callback);
		},

		Unlock(id)
		{
			var cnds = C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds;
			var callback = getHandler(this, cnds.OnUnlockMedalSuccess, cnds.OnUnlockMedalError);
			var param = {
				"id": id,
			};
			this.GetNGIO()["callComponent"]("Medal.unlock", param, callback);
		}
	};
}