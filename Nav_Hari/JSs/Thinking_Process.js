//	MUKESH KUMAR BHANSALI
//	All Right Reserved

var Moved = false;
var Previous_Auto_Step = 0;
var Auto_Step = 11;

function Hapi(Last_Step,Player_1,Player_2)
{
	//Auto_Step = 0;
	if(Last_Step % 2 == 0)
	{
		var Square = Last_Step / 10;
		Square = parseInt(Square);
		var Mod_10 = Last_Step % 10;
		switch (Square)
		{
			case 1: 
					if(Player_1[20 + Mod_10] && !Player_1[30 + Mod_10] && !Player_2[30 + Mod_10])
					{
						Auto_Step = 30 + Mod_10;
						return true;

					}
					if(!Player_1[20 + Mod_10] && Player_1[30 + Mod_10] && !Player_2[20 + Mod_10])
					{
							Auto_Step = 20 + Mod_10;	
							return true;
					}
					break;
            case 2: if(Player_1[10 + Mod_10] && !Player_1[30 + Mod_10] && !Player_2[30 + Mod_10])
					{
						Auto_Step = 30 + Mod_10;
						return true;	
					}
					if(!Player_1[10 + Mod_10] && Player_1[30 + Mod_10] && !Player_2[10 + Mod_10])
					{	
						Auto_Step = 10 + Mod_10;
						return true;
					}
					break;
            case 3: if(Player_1[10 + Mod_10] && !Player_1[20 + Mod_10] && !Player_2[20 + Mod_10])
					{
						Auto_Step = 20 + Mod_10;
						return true;
					}
					if(!Player_1[10 + Mod_10] && Player_1[20 + Mod_10] && !Player_2[10 + Mod_10])
					{	
						Auto_Step = 10 + Mod_10;
						return true;
					}
                    break;
			default: alert("galat hain");
		}
		
		//if(!Moved)
		if(Player_1[Neighbour[Last_Step][0]] && !Player_1[Neighbour[Last_Step][1]] && !Player_2[Neighbour[Last_Step][1]])
		{
			Auto_Step = Neighbour[Last_Step][1];
			return true;
		}
		if(Player_1[Neighbour[Last_Step][1]] && !Player_1[Neighbour[Last_Step][0]] && !Player_2[Neighbour[Last_Step][0]])
		{
			Auto_Step = Neighbour[Last_Step][0];
			return true;
		}
			
	}
	else
	{
		var Right_Neighbour = Neighbour[Last_Step][0];
		var Left_Neighbour = Neighbour[Last_Step][1];
													   
		//Checking Whether 2 Shoulders are already in line in right
				
		if(Player_1[Right_Neighbour] && !Player_1[Neighbour[Right_Neighbour][0]] && !Player_2[Neighbour[Right_Neighbour][0]])
		{
			Auto_Step = Neighbour[Right_Neighbour][0];
			return true;
		}
				
		//Checking Whether 2 Shoulders are already in line in left
				
		if(Player_1[Left_Neighbour] && !Player_1[Neighbour[Left_Neighbour][1]] && !Player_2[Neighbour[Left_Neighbour][1]])
		{
			Auto_Step = Neighbour[Left_Neighbour][1];
			return true;
		}
			
		//Checking Whether Space Between 2 Shouldiers in right
		
		if(Player_1[Neighbour[Right_Neighbour][0]] && !Player_1[Neighbour[Last_Step][0]] && !Player_2[Neighbour[Last_Step][0]])
		{
			Auto_Step = Neighbour[Last_Step][0];
			return true;
		}
		
		//Checking Whether Space Between 2 Between 2 Shouldiers in left
		
		if(Player_1[Neighbour[Left_Neighbour][1]] && !Player_1[Neighbour[Last_Step][1]] && !Player_2[Neighbour[Last_Step][1]])
		{
			Auto_Step = Neighbour[Last_Step][1];
			return true;
		}
	}
	return false;
}


function Second_Neighbour(Side)
{
	var First_Neighbour = Neighbour[Previous_Auto_Step][Side];
	var Neighbour_To_Neighbour = Neighbour[Neighbour[Previous_Auto_Step][Side]][Side];
	if(!Filled[First_Neighbour] && !Auto_Filled[First_Neighbour] && !Filled[Neighbour_To_Neighbour] && !Auto_Filled[Neighbour_To_Neighbour])
	{
		Auto_Step = Neighbour_To_Neighbour;
		return true;
	}
	return false;
}

function Step()
{
	if(Killing)
		return;
	var Previous = 	Previous_Auto_Step;
	//alert(Previous);
	Previous_Auto_Step = Auto_Step;
	
	if(!Hapi(Auto_Step,Auto_Filled,Filled))
		if(!Hapi(Human_Step,Filled,Auto_Filled))
			if(!Second_Neighbour(0))
				if(!Second_Neighbour(1))
				{
					for(i=0; i<24; i++)
					{
						if(!Filled[Position[i]] && !Auto_Filled[Position[i]])
						{
							Auto_Step = Position[i]; 	
							break;
						}
					}
				}
				
	Score_Update();
	Auto_Move(Auto_Step);
	Finish_In_Hand_Shoulders(false);
}

function Auto_Move(To)
{
	var Humann_Prey = "";
	var Preyed = false;
	
	document.getElementById(To).innerHTML = '<img src="' + Auto_Shoulder + '" class="player player-tab player-m"  title="' + Auto_Title + '">';
	Auto_Filled[To] = true;
	if(Tikdi(To, Auto_Filled, false))
	{
		if((Human_Step % 2) == 1)
		{
			if(!Immortal[Human_Step] && !Immortal[Neighbour[Neighbour[Human_Step][0]][0]])
			{
				Humann_Prey = Human_Step;
				Preyed = true;
			}
		}
		else
		{
			if(!Immortal[(Human_Step % 10)] && !Immortal[Neighbour[Human_Step][0]])
			{
				Humann_Prey = Human_Step;		
				Preyed = true;
			}
		}
		//	MUKESH  KUMAR BHANSALI
		if(Preyed)
			//Die(Humann_Prey,Filled,Human_Shoulder,"Shoulder");
			Die(Humann_Prey,false,false);
		else
			alert("Last Moved is Immortal");
		
	}
	Moved = false;
	document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br>';
	First = !First;
}

function Score_Update()
{
	if(First)
	{
		Your_Shoulders++;
		Yours++;
		document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br>';
	}
	else
	{
		Rivals_Shoulders++;
		Rivals++; 
		document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br>';
	}
	
	if(!Killing)
	{
		if(First)
			document.getElementById("turn").innerHTML='Player 2</br>';
		else
			document.getElementById("turn").innerHTML='Player 1</br>';
	}

}