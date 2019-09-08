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
			return (val || "");
		},

		UserID()
		{
			var user = this.ngio["user"];
			var val = (user) ? user["id"] : "";
			return (val || "");
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
			return (val || "");
		},

		ErrorMessage()
		{
			var val;
			if (this.lastResult && this.lastResult["error"])
				val = this.lastResult["error"]["message"];
			return (val || "");
		},




		//MEDALS




		MedalsAsJSON()
		{
			var val;
			if (this.lastMedals)
				val = JSON.stringify(this.lastMedals);
			return (val || "");
		},

		CurMedalDescription()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["description"];
			return (val || "");
		},

		CurMedalDifficulty()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["difficulty"];
			return (val || -1);
		},

		CurMedalIcon()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["icon"];
			return (val || "");
		},

		CurMedalID()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["id"];
			return (val || -1);
		},

		CurMedalName()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["name"];
			return (val || "");
		},

		CurMedalValue()
		{
			var val;
			if (this.exp_CurMedal)
				val = this.exp_CurMedal["value"];
			return (val || -1);
		},

		CurMedalIsSecret()
		{
			var val;
			if (this.exp_CurMedal)
				val = (this.exp_CurMedal["secret"]) ? 1 : 0;
			return (val || -1);
		},

		CurMedalIsUnlocked()
		{
			var val;
			if (this.exp_CurMedal)
				val = (this.exp_CurMedal["unlocked"]) ? 1 : 0;
			return (val || -1);
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
			return (val || "");
		},

		Index2MedalDifficulty(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["difficulty"];
			return (val || -1);
		},

		Index2MedalIcon()
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["icon"];
			return (val || "");
		},

		Index2MedalID(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["id"];
			return (val || -1);
		},

		Index2MedalName(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["name"];
			return (val || "");
		},

		Index2MedalValue(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = this.lastMedals[index]["value"];
			return (val || -1);
		},

		Index2MedalIsSecret(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = (this.lastMedals[index]["secret"]) ? 1 : 0;
			return (val || -1);
		},

		Index2MedalIsUnlocked(index)
		{
			var val;
			if (this.lastMedals && this.lastMedals[index])
				val = (this.lastMedals[index]["unlocked"]) ? 1 : 0;
			return (val || -1);
		},

		MedalsCount()
		{
			var val;
			if (this.lastMedals)
				val = this.lastMedals.lngth;
			return (val || 0);
		},

		LastUnlockedMedalID()
		{
			var val;
			if (this.lastResult && this.lastResult["medal"])
				val = this.lastResult["medal"]["id"];
			return (val || 0);
		},



		//SCORES



		BoardID()
		{
			return this.scoreboardID;
		},

		Period()
		{
			return this.period;
		},

		Tag()
		{
			return this.tag;
		},

		PageIndex()
		{
			return this.pageIndex;
		},

		LoopIndex()
		{
			return this.exp_LoopIndex;
		},

		BoardsAsJSON()
		{
			var val;
			if (this.lastBoards)
				val = JSON.stringify(this.lastBoards);
			return (val || "");
		},

		CurBoardID()
		{
			var val;
			if (this.exp_CurBoard)
				val = this.exp_CurBoard["id"];
			return (val || 0);
		},

		CurBoardName()
		{
			var val;
			if (this.exp_CurBoard)
				val = this.exp_CurBoard["name"];
			return (val || "");
		},

		Index2BoardID(index)
		{
			var val;
			if (this.lastBoards && this.lastBoards[index])
				val = this.lastBoards[index]["id"];
			return (val || 0);
		},

		Index2BoardName(index)
		{
			var val;
			if (this.lastBoards && this.lastBoards[index])
				val = this.lastBoards[index]["name"];
			return (val || "");
		},

		BoardsCount()
		{
			var val;
			if (this.lastBoards)
				val = this.lastBoards.length;
			return (val || 0);
		},

		ScoresAsJSON()
		{
			var val;
			if (this.lastScores)
				val = JSON.stringify(this.lastScores);
			return (val || "");
		},

		CurFormattedValue()
		{
			var val;
			if (this.exp_CurScore)
				val = this.exp_CurScore["formatted_value"];
			return (val || "");
		},

		CurUserName()
		{
			var val;
			if (this.exp_CurScore)
				val = this.exp_CurScore["user"]["name"];
			return (val || "");
		},

		CurUserID()
		{
			var val;
			if (this.exp_CurScore)
				val = this.exp_CurScore["user"]["id"];
			return (val || 0);
		},

		CurValue()
		{
			var val;
			if (this.exp_CurScore)
				val = this.exp_CurScore["value"];
			return (val || 0);
		}, 

		IndexFormattedValue(index)
		{
			var val;
			if (this.lastScores && this.lastScores[index])
				val = this.lastScores[index]["formatted_value"];
			return (val || "");
		},

		IndexUserName(index)
		{
			var val;
			if (this.lastScores && this.lastScores[index])
				val = this.lastScores[index]["user"]["name"];
			return (val || "");
		},

		IndexValue(index)
		{
			var val;
			if (this.lastScores && this.lastScores[index])
				val = this.lastScores[index]["value"];
			return (val || 0);
		},

		CurScoresCount()
		{
			var val;
			if (this.lastScores)
				val = this.lastScores.length;
			return (val || 0);
		},

		CurStartIndex()
		{
			return this.lastScoresStartIndex;
		},

		ScoresCount()
		{
			return CurStartIndex();
			//Same thing as above for some reason?? IDK IM DUM LOL
		}
	};
	
}