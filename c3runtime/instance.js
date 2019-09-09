"use strict";

{
	const tempQuad = new C3.Quad();
	
	C3.Plugins.NinjaMuffin_NewgroundsC3Port.Instance = class NinjaMuffin_NewgroundsC3PortInstance extends C3.SDKWorldInstanceBase
	{
		constructor(inst, properties)
		{
			super(inst);
			
			this._testProperty = 0;
			
			if (properties)
			{
				this._testProperty = properties[0];

				this.ngio = new window["Newgrounds"]["io"]["core"](properties[0], properties[1]);
				this.ngio["debug"] = (properties[2] === 1);

				this.period = "D";
				this.limit = 10;
				this.tag = "";
				this.socialUser = null;
				this.pageIndex = 0;
				
				this.lastResult = null;
				this.lastBoards = null;
				this.lastScores = null;
				this.lastScoresStartIndex = 0;
				this.lastMedals = null;

				this.exp_CurScore = null;
				this.exp_LoopIndex = 0;

				this.isLogin = false;

				this.LoginPooling();
			}
		}

		GetNGIO ()
		{
			return this.ngio;
		}
		
		Release()
		{
			super.Release();
		}

		onDestroy()
		{
			this.lastResult = null;
			this.lastBoards = null;
			this.lastScores = null;
		}


		// AUTHENTICATION SHIT

		getDebuggerValues(prospections)
		{
			C3.Plugins.NinjaMuffin_NewgroundsC3Port.Exps.UserName.call(this, fake_ret);
			var userName = fake_ret.value;

			C3.Plugins.NinjaMuffin_NewgroundsC3Port.Exps.UserID.call(this, fake_ret);
			var userID = fake_ret.value;

			var self = this;

			prospections.push({
				"title": this.type.name, 
				"properties": [
					{ "name": "User name", "value": userName, "readonly": true },
					{ "name": "User ID", "value": userID, "readonly": true},
				]
			});
		}

		onLoggedIn() 
		{
			console.log("LOGGED IN!!");
			this.isLogin = true;
			this.Trigger(C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds.OnLoginSucces, this);
		}

		onLoggedOut()
		{
			this.isLogin = false;
			this.ngio["getSessionLoader"]()["closePassport"]();
			this.Trigger(C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds.OnLoggedOut, this);
		}

		LoginPooling()
		{
			var self = this;
			var onGetSession = function (session) {
				var isLogin = session && !session["expired"] && session["user"];
	
				if (!self.isLogin && isLogin)
					self.onLoggedIn();
				else if (self.isLogin && !isLogin)
					self.onLoggedOut();
	
				self.isLogin = isLogin;
	
				// pooling next 3 seconds
				setTimeout(function () {
					self.LoginPooling();
				}, 3000);
			}
			this.ngio["getSessionLoader"]()["getValidSession"](onGetSession);
		}

		//SCORES SHIT

		GetSkip(pageIndex)
		{
			if (pageIndex == null)
				pageIndex = this.pageIndex;
			
			return pageIndex * this.limit;
		}

		GetScoresInRange(skip, limit)
		{
			var self = this;
			var getScores = function (result) {
				self.lastScoresStartIndex = skip;

				if (result["success"]) {
					self.lastScores = [];
					var scores = result["scores"], score, user;
					var i, cnt = scores.length;
					for (i = 0; i < cnt; i++) {
						score = scores[i];
						user = score["user"];
						self.lastScores.push({
							"formatted_value": score["formatted_value"],
							"user": {
								"id": user["id"],
								"name": user["name"],
							},
							"value": score["value"],
						})
					}
				}
				else {
					self.lastScores = null;
				}
			};
			var cnds = C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds;
			var callback = getHandler(this, cnds.OnGetScoresSuccess, cnds.OnGetScoresError, getScores);
			var param = {
				"id": this.scoreboardID,
				"limit": limit,
				"period": this.period,
				"skip": skip,
			};

			if (this.tag !== "")
				param["tag"] = this.tag;

			if (this.socialUser !== null) {
				param["social"] = true;
				param["user"] = this.socialUser;
			}
			this.GetNGIO()["callComponent"]("ScoreBoard.getScores", param, callback);
		}
		
		Draw(renderer)
		{
			const imageInfo = this._objectClass.GetImageInfo();
			const texture = imageInfo.GetTexture();
			
			if (!texture)
				return;			// dynamic texture load which hasn't completed yet; can't draw anything
			
			const wi = this.GetWorldInfo();
			const quad = wi.GetBoundingQuad();
			const rcTex = imageInfo.GetTexRect();

			renderer.SetTexture(texture);
			
			if (this._runtime.IsPixelRoundingEnabled())
			{
				const ox = Math.round(wi.GetX()) - wi.GetX();
				const oy = Math.round(wi.GetY()) - wi.GetY();
				tempQuad.copy(quad);
				tempQuad.offset(ox, oy);
				renderer.Quad3(tempQuad, rcTex);
			}
			else
			{
				renderer.Quad3(quad, rcTex);
			}
		}
		
		SaveToJson()
		{
			return {
				// data to be saved for savegames
			};
		}
		
		LoadFromJson(o)
		{
			// load state for savegames
		}
	};
	
}