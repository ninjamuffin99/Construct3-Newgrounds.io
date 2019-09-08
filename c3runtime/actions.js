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
		},

		//SCORES

		SetBoardID(id)
		{
			this.scoreboardID = id;
		},

		SetTag(tag)
		{
			this.tag = tag;
		},

		GetBoards()
		{
			var self = this;
			var getBoards = function (result) {
				if (result["success"]) {
					self.lastBoards = [];
					var boards = result["scoreboards"], board;
					var i, cnt = boards.length;
					for (i = 0; i < cnt; i++) {
						board = boards[i];
						self.lastBoards.push({
							"id": board["id"],
							"name": board["name"]
						})
					}
				}
				else
					self.lastBoards = null;
			};

			var cnds = C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds;
			var callback = getHandler(this, cnds.OnGetBoardsSuccess, cnds.OnGetBoardsError, getBoards);
			this.GetNGIO()["callComponent"]("ScoreBoard.getBoards", {}, callback);
		},

		PostScore(value, tag)
		{
			var cnds = C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds;
			var callback = getHandler(this, cnds.OnPostScoreSuccess, cnds.OnPostScoreError);
			var param = {
				"id": this.scoreboardID,
				"value": value,
			};

			if (this.tag !== "")
				param["tag"] = this.tag;
			this.GetNGIO()["callComponent"]("ScoreBoard.postScore", param, callback);
		},

		SetPeriod(period)
		{
			if (typeof (period) === "number")
				period = periodCode[period];
			this.period = period;
		},

		RequestInRange(skip, limit)
		{
			this.GetScoresInRange(skip, limit);
		},

		RequestTurnToPage(pageIndex)
		{
			this.pageIndex = pageIndex;
			var skip = this.GetSkip();
			this.GetScoresInRange(skip, this.limit);
		},

		RequestUpdateCurrentPage()
		{
			var skip = this.GetSkip();
			this.GetScoresInRange(skip, this.limit);
		},

		RequestTurnToPreviousPage()
		{
			this.pageIndex -= 1;
			if (this.pageIndex < 0)
				this.pageIndex = 0;
			var skip = this.GetSkip();
			this.GetScoresInRange(skip, this.limit);
		},

		ShowAll()
		{
			this.socialUser = null;
		},

		ShowUser(user)
		{
			this.socialUser = user;
		}

	};
}