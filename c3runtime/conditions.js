"use strict";

{
	C3.Plugins.NinjaMuffin_NewgroundsC3Port.Cnds =
	{
		//AUTHENTICATION SHIT
		OnLoginSuccess()
		{
			return true;
		},

		OnLoginError()
		{
			return true;
		},
		OnLoginCancel()
		{
			return true;
		},
		IsLogin()
		{
			return false;
			//maybe have to do `return C3.Plugins.NinjaMuffin_NewgroundsC3Port.Instance.isLogin
			//return this.IsLogin;
		},
		OnLoggedOut()
		{
			return true;
		},

		//MEDALS
		OnGetMedalsListSuccess()
		{
			return true;
		},
		OnGetMedalsListError()
		{
			return true;
		},
		ForEachMedal()
		{
			if (!this.lastMedals)
				return false;
			
			var current_frame = this.getCurrentEventStack();
			var current_event = current_frame.current_event;
			var solModifierAfterCnds = current_frame.isModifierAfterCnds();
	
			var i, cnt = this.lastMedals.length;
			for (i = 0; i < cnt; i++) {
				if (solModifierAfterCnds)
					this.pushCopySol(current_event.solModifiers);
	
				this.exp_LoopIndex = i;
				this.exp_CurMedal = this.lastMedals[this.exp_LoopIndex];
				current_event.retrigger();
	
				if (solModifierAfterCnds)
					this.popSol(current_event.solModifiers);
			}
	
			return false;
		},

		CurMedalIsSecret()
		{
			return this.exp_CurMedal && this.exp_CurMedal["secret"];
		},

		CurMedalIsUnlocked()
		{
			return this.exp_CurMedal && this.exp_CurMedal["unlocked"];
		},

		CompareCurMedalDifficulty()
		{
			if (this.exp_CurMedal && this.exp_CurMedal["difficulty"])
				return C3.do_cmp
		},

		Index2MedalIsSecret(index)
		{
			return this.lastMedals && this.lastMedals[index] && this.lastMedals[index]["secret"];
		},

		Index2MedalIsUnlocked(index)
		{
			return this.lastMedals && this.lastMedals[index] && this.lastMedals[index]["unlocked"];
		},

		CompareIndex2MedalDifficulty(index, cmp, s)
		{
			if (this.lastMedals && this.lastMedals[index])
            	return C3.do_cmp(this.lastMedals[index]["difficulty"], cmp, s - 1);

        	return false;
		},

		OnUnlockMedalSuccess()
		{
			return true;
		},

		OnUnlockMeadlError()
		{
			return true;
		}

	};
}