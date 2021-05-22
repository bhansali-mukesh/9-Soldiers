//	MUKESH KUMAR BHANSALI
//	All Right Reserved
	
var Previous = 11;
var From = 11;
var Ookda = false;

function If_Near_Soldier(Army,Place)
{
	for(var k=0; k<4; k++)
	{
		if(Army[Neighbour[Place][k]])
			return Neighbour[Place][k];
	}
	return 0;
}

function Make_Tikdi()
{
	var Horizontal_Neighbour;
	var Vertical_Neighbour;
	
	for(var a=0; a<2; a++)
	{
		Horizontal_Neighbour = Neighbour[Auto_Step][a];
		Vertical_Neighbour = Neighbour[Auto_Step][(a+2)];

		if(Horizontal_Neighbour != 0 && !Filled[Horizontal_Neighbour] && !Auto_Filled[Horizontal_Neighbour])
		{
			if((Auto_Step % 2) == 0)
			{
				if(Auto_Filled[Neighbour[Horizontal_Neighbour][a]] && Auto_Filled[Neighbour[Neighbour[Horizontal_Neighbour][a]][a]])
				{
					From = Auto_Step;
					Auto_Step = Horizontal_Neighbour;
					return true;
				}
			}
			else
			{
				var Mod = Horizontal_Neighbour%10;
				if((Auto_Filled[(Mod+10)] + Auto_Filled[(Mod+20)] + Auto_Filled[(Mod+30)]) == 2)
				{
					From = Auto_Step;
					Auto_Step = Horizontal_Neighbour;
					return true;
				}				
			}
		}
		if(Vertical_Neighbour != 0 && !Filled[Vertical_Neighbour] && !Auto_Filled[Vertical_Neighbour])
		{
			if((Auto_Step % 2) == 0)
			{
				if(Auto_Filled[Neighbour[Vertical_Neighbour][0]] && Auto_Filled[Neighbour[Vertical_Neighbour][1]])
				{
					From = Auto_Step;
					Auto_Step = Vertical_Neighbour;
					return true;
				}
			}
		}
		
	}
	return false;
}

function Auto_Immortal()
{//alert("Auto immortal");
	var Place = 0;
	for(var m=0; m<24; m=m+2)
	{
		Place = Position[m];
		if(Immortal[Place] && Auto_Filled[Place])
		{
			for(var t=0; t<2; t++)
			{
				for(var n=0; n<4; n++)
				{
					if(Neighbour[Place][n] != 0 && !Auto_Filled[Neighbour[Place][n]] && !Filled[Neighbour[Place][n]])
					{
						From = Place;
						Auto_Step =  Neighbour[Place][n];
						//Immortal[Position[m]] = false;
						Ookda = true;
						return true;
					}
				}
				Place = Neighbour[Place][1];
			}
		}
	}
	for(var m=2; m<=8; m=m+2)
	{
		Place = m+10;
		if(Immortal[m] && Auto_Filled[Place])
		{
			for(var t=0; t<2; t++)
			{
				for(var n=0; n<4; n++)
				{
					if(Neighbour[Place][n] != 0 && !Auto_Filled[Neighbour[Place][n]] && !Filled[Neighbour[Place][n]])
					{
						From = Place;
						Auto_Step =  Neighbour[Place][n];
						Immortal[m] = false;
						Ookda = true;//	RAJASTHAN
						return true;
					}
				}
				Place = m+10;
			}
		}
	}
	return false;
}

function Common_Neighbour(Army)
{//alert("Common");
	var Auto_Neighbour;
	for(var i=0; i<4; i++)
	{
		Auto_Neighbour = Neighbour[Auto_Step][i];
		if(Auto_Neighbour != 0)
		{
			for(var j=0; j<4; j++)
			{
				if((Auto_Neighbour == Neighbour[Previous][j]) && !Filled[Auto_Neighbour] && !Auto_Filled[Auto_Neighbour])
				{
					var Common = If_Near_Soldier(Army,Auto_Neighbour);
					if(Common != 0)
					{
						From = Common;
						Auto_Step = Auto_Neighbour;
						return true;
					}
				}
			}
		}
	}
	return false;
}

function Immortal_Move(Last_Step,Player_1,Player_2)
{//alert("Immortal Move");
	if(Last_Step % 2 == 0)
	{
		var If_Near_Soldier_Result = 0;
		var Square = Last_Step / 10;
		Square = parseInt(Square);
		var Mod_10 = Last_Step % 10;
		switch (Square)
		{
			case 1: 
					if(Player_1[20 + Mod_10] && !Player_1[30 + Mod_10] && !Player_2[30 + Mod_10])
					{
						If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,(30 + Mod_10));
						if(If_Near_Soldier_Result != 0)
						{
							From = If_Near_Soldier_Result;
							Auto_Step = 30 + Mod_10;
							return true;
						}

					}
					if(!Player_1[20 + Mod_10] && Player_1[30 + Mod_10] && !Player_2[20 + Mod_10])
					{
						If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,(20 + Mod_10));
						if(If_Near_Soldier_Result != 0)
						{
							From = If_Near_Soldier_Result;
							Auto_Step = 20 + Mod_10;
							return true;
						}
					}
					break;
            case 2: if(Player_1[10 + Mod_10] && !Player_1[30 + Mod_10] && !Player_2[30 + Mod_10])
					{
						If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,(30 + Mod_10));
						if(If_Near_Soldier_Result != 0)
						{
							From = If_Near_Soldier_Result;
							Auto_Step = 30 + Mod_10;
							return true;	
						}
					}
					if(!Player_1[10 + Mod_10] && Player_1[30 + Mod_10] && !Player_2[10 + Mod_10])
					{	
						If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,(10 + Mod_10));
						if(If_Near_Soldier_Result != 0)
						{
							From = If_Near_Soldier_Result;
							Auto_Step = 10 + Mod_10;
							return true;
						}
					}
					break;
            case 3: if(Player_1[10 + Mod_10] && !Player_1[20 + Mod_10] && !Player_2[20 + Mod_10])
					{
						If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,(20 + Mod_10));
						if(If_Near_Soldier_Result != 0)
						{
							From = If_Near_Soldier_Result;
							Auto_Step = 20 + Mod_10;
							return true;
						}
					}
					if(!Player_1[10 + Mod_10] && Player_1[20 + Mod_10] && !Player_2[10 + Mod_10])
					{	
						If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,(10 + Mod_10));
						if(If_Near_Soldier_Result != 0)
						{
							From = If_Near_Soldier_Result;
							Auto_Step = 10 + Mod_10;
							return true;
						}
					}
                    break;
			default: alert("galat hain");
		}
		//if(!Moved)
		if(Player_1[Neighbour[Last_Step][0]] && !Player_1[Neighbour[Last_Step][1]] && !Player_2[Neighbour[Last_Step][1]])
		{
			If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,Neighbour[Last_Step][1]);
			if(If_Near_Soldier_Result != 0)
			{
				From = If_Near_Soldier_Result;
				Auto_Step = Neighbour[Last_Step][1];
				return true;
			}
		}
		if(Player_1[Neighbour[Last_Step][1]] && !Player_1[Neighbour[Last_Step][0]] && !Player_2[Neighbour[Last_Step][0]])
		{
			If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,Neighbour[Last_Step][0]);
			if(If_Near_Soldier_Result != 0)
			{
				From = If_Near_Soldier_Result;
				Auto_Step = Neighbour[Last_Step][0];
				return true;
			}
		}
			
	}
	else
	{
		var Right_Neighbour = Neighbour[Last_Step][0];
		var Left_Neighbour = Neighbour[Last_Step][1];
													   
		//Checking Whether 2 Shoulders are already in line in right
				
		if(Player_1[Right_Neighbour] && !Player_1[Neighbour[Right_Neighbour][0]] && !Player_2[Neighbour[Right_Neighbour][0]])
		{
			If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,Neighbour[Right_Neighbour][0]);
			if(If_Near_Soldier_Result != 0)
			{
				From = If_Near_Soldier_Result;
				Auto_Step = Neighbour[Right_Neighbour][0];
				return true;
			}
		}
				
		//Checking Whether 2 Shoulders are already in line in left
				
		if(Player_1[Left_Neighbour] && !Player_1[Neighbour[Left_Neighbour][1]] && !Player_2[Neighbour[Left_Neighbour][1]])
		{
			If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,Neighbour[Left_Neighbour][1]);
			if(If_Near_Soldier_Result != 0)
			{
				From = If_Near_Soldier_Result;
				Auto_Step = Neighbour[Left_Neighbour][1];
				return true;
			}
		}
			
		//Checking Whether Space Between 2 Shouldiers in right
		
		if(Player_1[Neighbour[Right_Neighbour][0]] && !Player_1[Neighbour[Last_Step][0]] && !Player_2[Neighbour[Last_Step][0]])
		{
			If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,Neighbour[Last_Step][0]);
			if(If_Near_Soldier_Result != 0)
			{
				From = If_Near_Soldier_Result;
				Auto_Step = Neighbour[Last_Step][0];
				return true;
			}
		}
		
		//Checking Whether Space Between 2 Between 2 Shouldiers in left
		
		if(Player_1[Neighbour[Left_Neighbour][1]] && !Player_1[Neighbour[Last_Step][1]] && !Player_2[Neighbour[Last_Step][1]])
		{
			If_Near_Soldier_Result = If_Near_Soldier(Auto_Filled,Neighbour[Last_Step][1]);
			if(If_Near_Soldier_Result != 0)
			{
				From = If_Near_Soldier_Result;
				Auto_Step = Neighbour[Last_Step][1];
				return true;
			}
		}
	}
	return false;
}

function March()
{
	if(Killing)
		return;
	Previous = Previous_Auto_Step;
	Previous_Auto_Step = Auto_Step;
	if(Ookda && !Auto_Filled[From] && !Filled[From] && Auto_Filled[Auto_Step])
	{
		var temp = Auto_Step;
		Auto_Step = From;
		From = temp;
		Ookda = false;
		Auto_Move_Ahead();
		return;
	}
	Ookda = false;
	if(!Make_Tikdi())
		if(!Immortal_Move(Auto_Step,Auto_Filled,Filled))
			if(!Immortal_Move(Human_Step,Filled,Auto_Filled))
				if(!Auto_Immortal())
					if(!Common_Neighbour(Auto_Filled))
					{
						for(var i=0; i<24; i++)
						{
							if(!Filled[Position[i]] && !Auto_Filled[Position[i]])
							{
								From = If_Near_Soldier(Auto_Filled,Position[i]);
								if(From != 0)
								{
									Auto_Step = Position[i];
									break;
								}
							}
						}
					}
	Auto_Move_Ahead();
}

function Auto_Move_Ahead()
{//alert("Move :	" + From + " To : " + Auto_Step);
	//If Hat-Trick Broken, Shoulder may die as it is not Immortal at the moment.
	if( IsImmortal(From) )
		Noramlise(From, false);
		
	Auto_Filled[From] = false;
	document.getElementById(From).innerHTML = '<img src="' + Default_Image + '"  class="player player-tab player-m" >';
	Auto_Move(Auto_Step);
}