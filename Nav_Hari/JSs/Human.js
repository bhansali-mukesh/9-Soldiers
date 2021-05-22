//	MUKESH KUMAR BHANSALI
//	All Right Reserved

function Shoulder(To_Location)
{
	if(Killing)
		return;

	if(First)
	{
		document.getElementById(To_Location).innerHTML='<img src="' + Human_Shoulder + '" title="Player_1" class="player player-tab player-m">';
		Filled[To_Location] = true;
		Human_Step = To_Location;
		Your_Shoulders++;
		Yours++;
		document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br>';
		if(Tikdi(To_Location,Filled, true))
			Kill(true);
	}
	else
		if(!Artificial_Intelligency)
		{
			document.getElementById(To_Location).innerHTML='<img src="' + Auto_Shoulder + '" title="Player_2" class="player player-tab player-m">';
			Auto_Filled[To_Location] = true;
			Human_Step = To_Location;
			Rivals_Shoulders++;
			Rivals++; 
			document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br>';
			if(Tikdi(To_Location,Auto_Filled, false))
				Kill(false);
		}
		
	if(!Killing)
	{
		if(First)
			document.getElementById("turn").innerHTML='Player 2</br>';
		else
			document.getElementById("turn").innerHTML='Player 1</br>';
	}
	First = !First;
	Finish_In_Hand_Shoulders(true);
}

function Haal(From_Location,To_Location)
{
	if(Killing)
		return;
	
	//If Hat-Trick Broken, Shoulder may die as it is not Immortal at the moment.
	if( IsImmortal(From_Location) )
		Noramlise(From_Location, true);
			
	//alert("To_Location = " + To_Location " Selected = " + Selected);
	document.getElementById(To_Location).innerHTML='<img src="' + Human_Shoulder + '" title="' + Human_Title + '" class="player player-tab player-m" onclick="Calculate_Free_Neighbourhoods(' + To_Location + ',true);">';
	Filled[To_Location] = true;
	
	document.getElementById(Selected).innerHTML='<img src="' + Default_Image + '" class="player player-tab player-m">';
	Filled[Selected] = false;
	
	for(i=0; i<4; i++)
	{
		if(Free_Neighours[i] != 0 && !Filled[Free_Neighours[i]])
		{
			document.getElementById(Free_Neighours[i]).innerHTML='<img src="' + Default_Image + '"  class="player player-tab player-m">';
			Free_Neighours[i] = 0;	//	Muksa Jain
		}
	}
	
	if(Tikdi(To_Location,Filled, true))
		Kill(true);
	
	Human_Step = To_Location;
	First = false;
	if(!Killing)
		document.getElementById("turn").innerHTML='Player 2</br>';
	if(Artificial_Intelligency)
		March();
		
	Selected = "NA";
}

function Kill(Player_1)
{
	//alert("Kill");
	var Opponent_Array;
	var Opponent_Title;
	var Place = "";
	var Opponent_Shoulder_Image;
	var Total_Unsafe_Shoulder = 0;
	
	Killing = true;
	if(Player_1)
		Opponent_Array = Auto_Filled;
	else
		Opponent_Array = Filled;
			
	for(i=0; i<24; i++)
	{
		Place = Position[i];
		if(Opponent_Array[Place])
		{
			if ( IsImmortal(Place) )
				continue;
			
			Total_Unsafe_Shoulder++;
			if(Player_1)
				document.getElementById(Place).innerHTML = '<img src="' + Auto_Shoulder_Blur + '" class="player player-tab player-m"  title="' + Auto_Title + '" onclick="Die(' + Place + ',true);" >';
			else
				document.getElementById(Place).innerHTML = '<img src="' + Human_Shoulder_Blur + '" class="player player-tab player-m"  title="' + Human_Title + '" onclick="Die(' + Place + ',false);" >';	
		}
	}
	if(Total_Unsafe_Shoulder == 0)
		document.getElementById("Score").innerHTML='Player_1:	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2:	' + Rivals_Shoulders + '/' + Rivals + '</br> <font color="'+ Result_Color +'" size=+6><b><em>Match Tie Due to Deadlock.&nbsp;<input type="button" value="Play Again" onclick="Reset()"></font></b></em>';
}