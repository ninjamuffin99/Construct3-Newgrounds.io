"use strict";

{
	C3.Plugins.NinjaMuffin_NewgroundsC3Port.Exps =
	{
		Double(number)
		{
			return number * 2;
		},

		UserName()
		{
			var user = this.ngio["user"];
			var val = (user) ? user["name"] : "";
			return val.set_string(val || "");
		},

		UserID()
		{
			var user = this.ngio["user"];
			var val = (user) ? user["id"] : "";
			return val.set_string(val || "");
		}, 

		UserIconURL(sizeIdx)
		{
			if (typeof (sizeIdx) === "string")
            sizeIdx = sizeIdx.toLowerCase();

			switch (sizeIdx) {
				case 0:
				case "s":
				case "small":
					sizeIdx = "small";
					break;

				case 1:
				case "m":
				case "medium":
					sizeIdx = "medium";
					break;

				case 2:
				case "l":
				case "large":
					sizeIdx = "large";
					break;

				default:
					sizeIdx = "large";
					break;
			}

			var user = this.ngio["user"];
			var val = (user) ? user["icons"][sizeIdx] : "";
			return val.set_string(val || "");
		},

		ErrorMessage()
		{
			var val;
			if (this.lastResult && this.lastResult["error"])
				val = this.lastResult["error"]["message"];
			return val.set_string(val || "");
		},

		MedalsAsJSON()
		{
			var val;
			if (this.lastMedals)
				val = JSON.stringify(this.lastMedals);
			return val.set_string(val || "");
		},

		CurMedalDescription()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["description"];
			return val.set_string(val || "");
		},

		CurMedalDifficulty()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["difficulty"];
			return val.set_int(val || -1);
		},

		CurMedalIcon()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["icon"];
			return val.set_string(val || "");
		},

		CurMedalID()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["id"];
			return val.set_int(val || -1);
		},

		CurMedalName()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["name"];
			return val.set_string(val || "");
		},

		CurMedalValue()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["value"];
			return val.set_int(val || -1);
		},

		CurMedalIsSecret()
		{
			var val;
			if (this.exp_CurMedal)
				val = (this.exp_CurMedal["secret"]) ? 1 : 0;
			return val.set_int(val || -1);
		},

		CurMedalIsUnlocked()
		{
			var val;
			if (this.exp_CurMedal)
				val = (this.exp_CurMedal["unlocked"]) ? 1 : 0;
			return val.set_int(val || -1);
		},

		LoopIndex()
		{
			return this.exp_LoopIndex;
		},

		Index2MedalDescription(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["description"];
			return val.set_string(val || "");
		},

		Index2MedalDifficulty(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["difficulty"];
			return val.set_int(val || -1);
		},

		Index2MedalIcon()
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["icon"];
			return val.set_string(val || "");
		},

		Index2MedalID(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["id"];
			return val.set_int(val || -1);
		},

		Index2MedalName(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["name"];
			return val.set_string(val || "");
		},

		Index2MedalValue(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["value"];
			return val.set_int(val || -1);
		},

		Index2MedalIsSecret(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = (this.lastMedals[index]["secret"]) ? 1 : 0;
			return val.set_int(val || -1);
		},

		Index2MedalIsUnlocked(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = (this.lastMedals[index]["unlocked"]) ? 1 : 0;
			return val.set_int(val || -1);
		},

		MedalsCount()
		{
			var val;
			if (this.lastMedals)
				val = this.lastMedals.lngth;
			return val.set_int(val || 0);
		},

		LastUnlockedMedalID()
		{
			var val;
			if (this.lastResult && this.lastResult["medal"])
				val = this.lastResult["medal"]["id"];
			return val.set_int(val || 0);
		}

	};
	
}