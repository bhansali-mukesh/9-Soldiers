//	MUKESH KUMAR BHANSALI
//	All Right Reserved

//var Theme = document.getElementById("theme");

var Selected = 11;
var Position = new Array();
var Filled = new Array();
var Auto_Filled = new Array();
var Neighbour = new Array(24);
var Immortal = new Array();
var Total_Neighbour = 0;
var Immortals = 0;
var Free_Neighours = new Array();
var Neighbourhood_Image = "Resources/Snow.jpg";
var Human_Title = "Player 1";
var Auto_Title = "Player 2";
var Killing = false;
var Remaining = 18;
var Your_Shoulders = 0;
var Rivals_Shoulders = 0;
var Rivals = 0;
var Yours = 0;

var Artificial_Intelligency = false;
var Player_2_Color = "WHITE";
var Result_Color = "SILVER";

var Human_Step = 11;
var First = true;

var Pre_Ready = "";

function First_Player()
{
	if(document.getElementById("Set") == null)
		return;
		
	Reset();
	
	if(document.getElementById("Set").value == "Human")
	{
		First = true;
	}
	else
	{
		First = false;
		Step();
	}
}

function Neighbour_Hoods(Shoulder)
{
	if(Shoulder % 2 == 0)
	{
		Neighbour[Shoulder][0] = (Shoulder - 1);
		
		if((Shoulder + 2) % 10 == 0)
			Neighbour[Shoulder][1] = (Shoulder - 7);
		else
			Neighbour[Shoulder][1] = (Shoulder + 1);
		
		var Square = Shoulder / 10;
		Square = parseInt(Square);
		
		switch (Square)
		{
			case 1: 
					Neighbour[Shoulder][2] = 0;
					Neighbour[Shoulder][3] = (Shoulder + 10);
					break;
					
			case 2: 
					Neighbour[Shoulder][2] = (Shoulder - 10);
					Neighbour[Shoulder][3] = (Shoulder + 10);
					break;
	
			case 3: 
					Neighbour[Shoulder][2] = (Shoulder - 10);
					Neighbour[Shoulder][3] = 0;
					break;
			default: alert("Galat hain");
		}
		
		
	}
	else
	{
		if((Shoulder - 1) % 10 == 0)
			Neighbour[Shoulder][0] = (Shoulder + 7);
		else
			Neighbour[Shoulder][0] = (Shoulder - 1);
		
		Neighbour[Shoulder][1] = (Shoulder + 1);
		Neighbour[Shoulder][2] = 0;
		Neighbour[Shoulder][3] = 0;
	}
}

function Finish_In_Hand_Shoulders(Human)
{//alert("Finish");
	Remaining--;
	if(Killing)
	{
		if(Remaining <= 0)
			Remaining = 101;
			
		return;
	}
	if(Remaining <= 0)
	{
		Selected = "NA";
		for(i=0; i<24; i++)
		{
			//alert(Filled[Position[i]] + " at " + Position[i]);
			if(Filled[Position[i]])
			{
				if( !( IsImmortal(Position[i]) ))
					document.getElementById(Position[i]).innerHTML='<img src="' + Human_Shoulder + '" title="Player 1"  class="player player-tab player-m"  onclick="Calculate_Free_Neighbourhoods(' + Position[i] + ',true);">';
			}
			else
				if(Auto_Filled[Position[i]])
				{
					if( !( IsImmortal(Position[i])) )
						if(!Artificial_Intelligency)
							document.getElementById(Position[i]).innerHTML='<img src="' + Auto_Shoulder + '" title="Player 2" class="player player-tab player-m"  onclick="Calculate_Free_Neighbourhoods(' + Position[i] + ',false);">';
						else
							document.getElementById(Position[i]).innerHTML='<img src="' + Auto_Shoulder + '" title="Player 2" class="player player-tab player-m"  >';
				}
				else
					document.getElementById(Position[i]).innerHTML='<img src="' + Default_Image + '" class="player player-tab player-m" >';
		}
		if(Artificial_Intelligency && Human)
			March();
	}
	else
		if(Artificial_Intelligency && Human)
			Step();
}

function Tikdi(Shoulder,My_Shoulders_Positions, Player_1)
{
	var flag = false;
	if(Shoulder % 2 == 0)
	{
		var Mod_10 = Shoulder % 10;
		if(My_Shoulders_Positions[10 + Mod_10] && My_Shoulders_Positions[20 + Mod_10] && My_Shoulders_Positions[30 + Mod_10])
		{
				flag = Immortal_Streak( Mod_10 );
				Form_Streak( [ 10 + Mod_10, 20 + Mod_10, 30 + Mod_10 ], true, Player_1);
		}
		
		if(My_Shoulders_Positions[Neighbour[Shoulder][0]] && My_Shoulders_Positions[Neighbour[Shoulder][1]])
		{
			flag = Immortal_Streak( Neighbour[Shoulder][0] );
			Form_Streak( [ Shoulder, Neighbour[Shoulder][0], Neighbour[Shoulder][1] ], true,  Player_1);
		}
	}
	else
	{
		var Right_Neighbour = Neighbour[Shoulder][0];
		var Left_Neighbour = Neighbour[Shoulder][1];
				
		if(My_Shoulders_Positions[Right_Neighbour] && My_Shoulders_Positions[Neighbour[Right_Neighbour][0]])
		{
			flag = Immortal_Streak( Neighbour[Right_Neighbour][0] );
			Form_Streak( [ Shoulder, Right_Neighbour, Neighbour[Right_Neighbour][0] ], true, Player_1);
		}
		
		if(My_Shoulders_Positions[Left_Neighbour] && My_Shoulders_Positions[Neighbour[Left_Neighbour][1]])
		{
			flag = Immortal_Streak(Shoulder);
			Form_Streak( [ Shoulder, Left_Neighbour, Neighbour[Left_Neighbour][1] ], true, Player_1);
		}
	}
	return flag;
}

function Noramlise(Shoulder, Player_1)
{
	if((Shoulder % 2) == 1)
	{
		var Right_Neighbour = Neighbour[Shoulder][0];
		var Left_Neighbour = Neighbour[Shoulder][1];
		
		if(Immortal[Shoulder])
		{
			Form_Streak( [ Shoulder, Left_Neighbour, Neighbour[ Left_Neighbour][1] ], false, Player_1);
			Immortal[Shoulder] = false;
		}	
		if(Immortal[Neighbour[Right_Neighbour][0]])
		{
			Form_Streak( [ Shoulder, Right_Neighbour,  Neighbour[Right_Neighbour][0] ], false, Player_1);
			Immortal[Neighbour[Right_Neighbour][0]] = false;
		}
	}
	else
	{
		var Mod_10 = Shoulder % 10;
		if(Immortal[Mod_10])
		{
			Form_Streak( [ 10 + Mod_10, 20 + Mod_10, 30 + Mod_10 ], false, Player_1);
			Immortal[Mod_10] = false;
		}
			
		if(Immortal[Neighbour[Shoulder][0]])
		{
			Form_Streak( [ Shoulder, Neighbour[Shoulder][0], Neighbour[Shoulder][1] ], false, Player_1);
			Immortal[Neighbour[Shoulder][0]] = false;
		}
	}
	
	return false;
}

function Form_Streak(indices, Immortal, Player_1)
{
	for (var i in indices)
	{
		if(!Immortal && ( !IsImmortal(indices[i]) ) )
		{
			Form_One(indices[i], Immortal, Player_1);
		}//	KUMAR MUKESH
		Form_One(indices[i], Immortal, Player_1);
	}
}

function Form_One(index, Immortal, Player_1)
{
	var Image;
	if (Player_1)
		if(Immortal)
			Image = Human_Shoulder_Strong;
		else
			Image = Human_Shoulder;
	else
		if(Immortal)
			Image = Auto_Shoulder_Strong;
		else
			Image = Auto_Shoulder;
	
	document.getElementById(index).innerHTML = '<img src="' + Image + '" class="player player-tab player-m"  title="' + Auto_Title + '" onclick="Calculate_Free_Neighbourhoods(' + index + ',' + Player_1 + ');" >';
}

function IsImmortal( Place )
{
	if((Place % 2) == 1)
	{
		if(Immortal[Place])
			return true;
			
		if(Immortal[Neighbour[Neighbour[Place][0]][0]])
			return true;
	}
	else
	{
		if(Immortal[(Place % 10)])
			return true;
			
		if(Immortal[Neighbour[Place][0]])
			return true;
	}
	return false;
}

function Immortal_Streak(Index)
{
	Immortals++;
	Immortal[Index] = true;								//alert(Index);
	return true;
}

function Calculate_Free_Neighbourhoods(Selected_Shoulder,Player_1)
{
	if(Killing)
		return;
	
	if((First && Player_1) || (!Player_1 && !First))
	{
		var Pre_Selected = document.getElementById(Selected);
		if(Pre_Selected)
			Pre_Selected.innerHTML = Pre_Ready;
		
		Selected = Selected_Shoulder;
		Pre_Ready = document.getElementById(Selected).innerHTML;
		
		var Ready;
		if(Player_1)
			Ready = Human_Shoulder_Ready;
		else
			Ready = Auto_Shoulder_Ready;
			
		document.getElementById(Selected).innerHTML='<img src="' + Ready + '" class="player player-tab player-m"  onclick="Calculate_Free_Neighbourhoods(' + Selected + ',' + Player_1 + ');">';
		
		Total_Neighbour = 0;
	
		for(i=0; i<4; i++)
		{
			if(Free_Neighours[i] != 0 && !Filled[Free_Neighours[i]] && !Auto_Filled[Free_Neighours[i]])
			{
				document.getElementById(Free_Neighours[i]).innerHTML='<img src="' + Default_Image + '"  class="player player-tab player-m" >';
				Free_Neighours[i] = 0;
			}
		}
	
		for(i=0; i<4; i++)
		{
			if(!Filled[Neighbour[Selected_Shoulder][i]] && !Auto_Filled[Neighbour[Selected_Shoulder][i]] && Neighbour[Selected_Shoulder][i] != 0)
			{
				Free_Neighours[i] = Neighbour[Selected_Shoulder][i];
				Total_Neighbour++;
			}
			else
				Free_Neighours[i] = 0;
		}
		Show_Free_Neighbourhoods(Selected_Shoulder,Player_1);
	}
}

function Show_Free_Neighbourhoods(Selected_Shoulder,Player_1)
{
	if(Total_Neighbour == 0)
	{
		alert("This Shoulder can not move at the moment as no space left in neighbourhood");
		return;
	}
	for(i=0; i<4; i++)
	{
		if(Free_Neighours[i] != 0)
		{
			if(Player_1)
				document.getElementById(Neighbour[Selected_Shoulder][i]).innerHTML='<img src=' + Neighbourhood_Image + ' title="'+Neighbour[Selected_Shoulder][i]+'"   class="player player-tab player-m"  onclick="Haal(' + Selected_Shoulder + ',' + Neighbour[Selected_Shoulder][i] + ');">';
			else
				document.getElementById(Neighbour[Selected_Shoulder][i]).innerHTML='<img src=' + Neighbourhood_Image + ' title="'+Neighbour[Selected_Shoulder][i]+'"   class="player player-tab player-m"  onclick="Chaal(' + Selected_Shoulder + ',' + Neighbour[Selected_Shoulder][i] + ');">';
		}
	}
}

function Dhani()
{
	var About = '<img src="Resources/Nav_Hari.js">\
				 <img src="Resources/Shoulder.js">';
	document.getElementById("instructions").innerHTML=About;
	window.setTimeout('instruction()',5000);
}

function Die(Prey,Player_1,Human)
{
	//alert("Die");
	var Opponent_Positions;
	
	if(Player_1)
		Opponent_Positions = Auto_Filled;
	else
		Opponent_Positions = Filled;
		
	Opponent_Positions[Prey] = false;
	
	if(Remaining <= 0)
		document.getElementById(Prey).innerHTML='<img src="' + Default_Image + '"  class="player player-tab player-m" >';
	else
	{
		if(Artificial_Intelligency)
		{
			for(var q=1; q>0; q--)
			{
				//document.getElementById(Prey).innerHTML='<img src="' + Blood_Image + '"  class="player player-tab player-m" >';
				//alert("Opponent Had killed this Soldier");
			}
		}
		document.getElementById(Prey).innerHTML='<img src="' + Default_Image + '" class="player player-tab player-m"  onclick="Shoulder(' + Prey + ');">';
	}
		
	for(i=0; i<24; i++)
	{
		if( Opponent_Positions[Position[i]] && !( IsImmortal(Position[i]) ) )
		{
			if(Remaining <= 0)
			{
				if(Player_1)
					document.getElementById(Position[i]).innerHTML='<img src="' + Auto_Shoulder + '" title="Player 2" class="player player-tab player-m"  onclick="Calculate_Free_Neighbourhoods(' + Position[i] + ',false);">';
				else
					document.getElementById(Position[i]).innerHTML='<img src="' + Human_Shoulder + '" title="Player 1" class="player player-tab player-m"  onclick="Calculate_Free_Neighbourhoods(' + Position[i] + ',true);">';
			}
			else
			{
				if(Player_1)
					document.getElementById(Position[i]).innerHTML='<img src="' + Auto_Shoulder + '" title="Player_2" class="player player-tab player-m" >';
				else
					document.getElementById(Position[i]).innerHTML='<img src="' + Human_Shoulder + '" title="Player_1" class="player player-tab player-m" >';
			}
		}
	}
	
	if(Killing && Artificial_Intelligency)
	{
		if(Rivals_Shoulders == 1)
		{
			document.getElementById("Score").innerHTML='Player_1:	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2:	' + Rivals_Shoulders + '/' + Rivals + '</br> <font color="'+ Result_Color +'" size=+6><b><em>Game Over! You Rock</font></b></em>';
			return 0;
		}
			
		Killing = false;
		if(Remaining > 0)
		{
			if(Prey == Auto_Step)
			{
				if(!Hapi(Previous_Auto_Step,Auto_Filled,Filled))
					Auto_Step = Prey;
			}
			else
			{
				if(!Hapi(Auto_Step,Auto_Filled,Filled))
				{
					Auto_Step = Prey;
				}
			}
			Remaining--;
			Score_Update();
			Auto_Move(Auto_Step);
		}
		else
		{
			if(Prey == Auto_Step)
			{
				if(Auto_Filled[Previous_Auto_Step])
					Auto_Step = Previous_Auto_Step;
				else
					if(Auto_Filled[Previous])
						Auto_Step = Previous;
				else
				{
					for(var i=0; i<24; i++)
					{
						if(Auto_Filled[Position[i]])
						{
							Auto_Step = Position[i];
							break;
						}
					}
				}
			}
			March();
		}
	}
	
	Killing = false;
	if(Remaining >= 100)
	{
		Remaining = 0;
	}
	if(Player_1)
	{
		Rivals_Shoulders--;
		if(Rivals_Shoulders > 0)
			document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'>Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br>';
		else
			document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br> <font color="'+ Result_Color +'" size=+6><b><em>Game Over! You Rock</font></b></em>';
	}
	else
	{
		Your_Shoulders--;
		if(Your_Shoulders > 0)
			document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br>';
		else
			document.getElementById("Score").innerHTML='Player_1 :	' + Your_Shoulders + '/' + Yours + '</br></font><font color="'+ Player_2_Color +'">Player_2 :	' + Rivals_Shoulders + '/' + Rivals + '</br> <font color="'+ Result_Color +'" size=+6><b><em>Game Over! Rival Rock</font></b></em>';
	}
	if(Player_1)
		document.getElementById("turn").innerHTML='Player 2</br>';
	else
		document.getElementById("turn").innerHTML='Player 1</br>';
}

function Toggle(id)
{
	var element = document.getElementById(id);
	if(element)
	{
		display = element.style ? element.style.display : "";
		if(display == "none")
			display = "";
		else
			display = "none";
	}
	element.style.display = display;
}

function Timepass(Mili_Seconds)
{
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < Mili_Seconds);
}

function Hide_Element(id)
{
	var element = document.getElementById(id);
	if(element)
		element.style.display = "none";
}