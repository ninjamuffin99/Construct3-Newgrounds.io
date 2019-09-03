"use strict";

{
	const tempQuad = new C3.Quad();
	
	C3.Plugins.NinjaMuffin_NewgroundsC3Port.Instance = class DrawingInstance extends C3.SDKWorldInstanceBase
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
				console.log(this.ngio);

				//this.isLogin = false;

				this.LoginPooling();
			}
		}
		
		Release()
		{
			super.Release();
		}

		onDestroy()
		{

		}

		onLoggedIn() 
		{
			this.isLogin = true;
			
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