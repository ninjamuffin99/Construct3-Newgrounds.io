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
				
				this.lastResult = null;
				this.lastMedals = null;
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

		}

		getDebuggerCalues(prospections)
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