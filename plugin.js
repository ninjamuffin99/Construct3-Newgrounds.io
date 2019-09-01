"use strict";

{
	////////////////////////////////////////////
	// The plugin ID is how Construct identifies different kinds of plugins.
	// *** NEVER CHANGE THE PLUGIN ID! ***
	// If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
	// plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
	// Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
	// If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
	// and create an entirely new plugin with a different plugin ID.
	const PLUGIN_ID = "NinjaMuffin_NewgroundsC3Port";
	////////////////////////////////////////////
	
	const PLUGIN_VERSION = "1.0.0.0";
	const PLUGIN_CATEGORY = "general";
	
	let app = null;
	
	const PLUGIN_CLASS = SDK.Plugins.NinjaMuffin_NewgroundsC3Port = class NinjaMuffin_NewgroundsC3Port extends SDK.IPluginBase
	{
		constructor()
		{
			super(PLUGIN_ID);
			
			SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
			
			this._info.SetName(lang(".name"));
			this._info.SetDescription(lang(".description"));
			this._info.SetVersion(PLUGIN_VERSION);
			this._info.SetCategory(PLUGIN_CATEGORY);
			this._info.SetAuthor("ninjamuffin99");
			this._info.SetHelpUrl(lang(".help-url"));
			this._info.SetPluginType("world");			// mark as world plugin, which can draw
			this._info.SetIsResizable(true);			// allow to be resized
			this._info.SetIsRotatable(true);			// allow to be rotated
			this._info.SetHasImage(true);
			this._info.SetSupportsEffects(true);		// allow effects
			this._info.SetMustPreDraw(true);
			
			// Only support the newer C3 runtime
			this._info.SetSupportedRuntimes(["c3"]);
			
			SDK.Lang.PushContext(".properties");
			
			this._info.SetProperties([
				new SDK.PluginProperty("text", "app-id", "39685:NJ1KkPGb"),
				new SDK.PluginProperty("text", "aes-key", "qsqKxz5dJouIkUNe3NBppQ=="),
				new SDK.PluginProperty("check", "debug", false)
			]);

			this._info.AddFileDependency({
				filename: "newgroundsio.min.js",
				type: "external-script"
				});
			
			SDK.Lang.PopContext();		// .properties
			
			SDK.Lang.PopContext();
		}
	};
	
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}