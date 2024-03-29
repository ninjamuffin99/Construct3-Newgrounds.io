"use strict";

{
	C3.Plugins.NinjaMuffin_NewgroundsC3Port.Type = class NinjaMuffin_NewgroundsC3PortType extends C3.SDKTypeBase
	{
		constructor(objectClass)
		{
			super(objectClass);
		}
		
		Release()
		{
			super.Release();
		}
		
		OnCreate()
		{
			this.GetImageInfo().LoadAsset(this._runtime);
		}

		LoadTextures(renderer)
		{
			return this.GetImageInfo().LoadStaticTexture(renderer, {
				sampling: this._runtime.GetSampling()
			});
		}

		ReleaseTextures()
		{
			this.GetImageInfo().ReleaseTexture();
		}
	};
}