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
			//return false;
			//maybe have to do `return C3.Plugins.NinjaMuffin_NewgroundsC3Port.Instance.isLogin
			return this.IsLogin;
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
			
			var current_frame = this._runtime.GetEventSheetManager().getCurrentEventStackFrame();
			var current_event = current_frame.GetCurrentEvent();
			var solmod = current_event.GetSolModifiers();
			var solModifierAfterCnds = current_frame.isSolModifierAfterCnds();
			var c = this._runtime.GetEventSheetManager().GetEventStack();
	    	var p = this._runtime.GetEventStack(); 
	    	var h = c.Push(current_event);
	
			var i, cnt = this.lastMedals.length;
			for (i = 0; i < cnt; i++) {
				if (solModifierAfterCnds)
					this._runtime.GetEventSheetManager().PushCopySol(solmod);
	
				this.exp_LoopIndex = i;
				this.exp_CurMedal = this.lastMedals[this.exp_LoopIndex];
				current_event.Retrigger(current_frame, h);
	
				if (solModifierAfterCnds)
					this._runtime.GetEventSheetManager().PopSol(solmod);
			}
			p.Pop();
	
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
		},

		// SCORES AND SHIT

		OnGetBoardsSuccess()
		{
			return true;
		},

		OnGetBoardsError()
		{
			return true;
		},

		ForEachBoard()
		{
			if (!this.lastBoards)
            	return false;

			var current_frame = this._runtime.GetEventSheetManager().GetCurrentEventStackFrame();
			var current_event = current_frame.GetCurrentEvent();
			var solmod = current_event.GetSolModifiers();
			var solModifierAfterCnds = current_frame.IsSolModifierAfterCnds();
			var c = this._runtime.GetEventSheetManager().GetEventStack();
	    	var p = this._runtime.GetEventStack(); 
	    	var h = c.Push(current_event);

			var i, cnt = this.lastBoards.length;
			for (i = 0; i < cnt; i++) {
				if (solModifierAfterCnds)
					this._runtime.GetEventSheetManager().PushCopySol(solmod);

				this.exp_LoopIndex = i;
				this.exp_CurScore = this.lastBoards[this.exp_LoopIndex];
				current_event.Retrigger(current_frame, h);

				if (solModifierAfterCnds)
					this._runtime.GetEventSheetManager().PopSol(solmod);
			}
			p.Pop();

			return false;
		},

		OnPostScoreSuccess()
		{
			return true;
		},

		OnPostScoreError()
		{
			return true;
		},

		OnGetScoresSuccess()
		{
			return true;
		},

		OnGetScoresError()
		{
			return true;
		},

		ForEachScore(start, end)
		{
			if (!this.lastScores)
				return false;

			var r0 = this.lastScoresStartIndex;
			var r1 = this.lastScores.length + r0;
			if (start == null)
				start = r0;
			else
				start = C3.clamp(start, r0, r1);

			if (end == null)
				end = r1;
			else
				end = C3.clamp(end, r0, r1);

				var current_frame = this._runtime.GetEventSheetManager().GetCurrentEventStackFrame();
				var current_event = current_frame.GetCurrentEvent();
				var solmod = current_event.GetSolModifiers();
				var solModifierAfterCnds = current_frame.IsSolModifierAfterCnds();
				var c = this._runtime.GetEventSheetManager().GetEventStack();
				var p = this._runtime.GetEventStack(); 
				var h = c.Push(current_event);

			var i, cnt = end - start;
			for (i = start; i < cnt; i++) {
				if (solModifierAfterCnds)
				this._runtime.GetEventSheetManager().PushCopySol(solmod);

				this.exp_LoopIndex = i - start;
				this.exp_CurBoard = this.lastScores[this.exp_LoopIndex];
				current_event.Retrigger(current_frame, h);

				if (solModifierAfterCnds)
					this._runtime.GetEventSheetManager().PopSol(solmod);
			}
			p.Pop();

			return false;
		}

	};
}