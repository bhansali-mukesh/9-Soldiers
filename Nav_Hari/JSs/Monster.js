//	MUKESH KUMAR BHANSALI
//	All Right Reserved

function Demonstration()
{
	document.getElementById("instructions").style.display = "";
	How_To_Play = "";
	document.getElementById("instructions").innerHTML = How_To_Play;
	Draw_Demo_Ground();
}


function Draw_Demo_Ground()
{
	//	Thinking Mukesh
	Draw_Game();
		
	var Content="";
	var Divisions="";
	var Location;
	
	for(i=0; i<4; i++)
	{
		Free_Neighours[i] = 0;
		Immortal[(i + 1) * 2] = false;
	}
	
	for(i=0; i<3; i++)
	{
		Divisions+='<div id=' + i + '>';
		for(j=0; j < 8; j++)
		{
			Location =	(i+1)*10 + j+1;	
			Divisions+='<div id=' + Location + ' style="float:left"></div>';
			Filled[Location] = false;
			Auto_Filled[Location] = false;
			if((Location % 2) == 1)
				Immortal[Location] = false;
		}
		Divisions+='</div>';
	}
	//document.getElementById("navhari").innerHTML=Divisions;
	
	for(i=0;i<3;i++)
	{
		for(j=0; j < 8; j++)
		{
			Location =	(i+1)*10 + j+1;	
			Position[i*8 + j] = Location;
			document.getElementById(Location).innerHTML='<img src="' + Default_Image + '" class="player player-tab player-m" >';
			Neighbour[Location] = new Array(4);
			Neighbour_Hoods(Location);
		}
	}
	//window.setTimeout('Demo_instruction()',2000);
	document.getElementById("Score").innerHTML='Player_1 :	0/0</br></font><font color="'+ Player_2_Color +'">Player_2 :	0/0</br>';
	document.getElementById("Set_Player").innerHTML = "";
	
	Demo_instruction();
	/*Auto_Move(23);
	Auto_Move(32);
	Auto_Move(21);Auto_Step=32;Previous=21;Previous_Auto_Step=21;
	March();*/
}

How_To_Play = "";
var Demo_Positions = new Array("13","22","14","15","21","32","26","36","18","12");
function Demo_Step(Append)
{
	//2.	When you finish your in hand(9) Soldiers, click on any of your Soldier,<br> It will show neighbourhood places where it can move. </br>\
	//3.	Click on desire neighbourhood to move your Soldier over there.</br>\
	//4.	When you make an <b>Immortal Line* </b> the enemies soldier are trapped and you can kill one of them.<br> Click on one of them to kill and continue.</br></br>\
	//_______________________________________________________________________</br>';
	
	How_To_Play += Append;
	document.getElementById("instructions").innerHTML = How_To_Play;
}

function Demo_instruction()
{
	Demo_Step('_______________________________________________________________________</br>\
	<b><em>How to Play</b></em></br>\
	_______________________________________________________________________</br>\
	1.	To put your Soldiers down, click on any square wood. This is a place where a soldier can stay.</br>');

	var Mili_Second = 3000;
	for(var t=0; t<10; t++)
	{
		if(t%2==0)
		{
			window.setTimeout('Put_Human('+Demo_Positions[t]+')',Mili_Second);
			document.getElementById("turn").innerHTML='Player 2</br>';
		}
		else                                                                                              
		{
			window.setTimeout('Put_Auto('+Demo_Positions[t]+')',Mili_Second);
			document.getElementById("turn").innerHTML='Player 1</br>';
		}
		Mili_Second = Mili_Second + 1000;
	}                                                                                                                                                                                                                  
	
	window.setTimeout('Demo_Step("<br>2. If you succeds in putting your 3 Soldiers in a row, you can kill one of your opponent and vice verce. </br>&nbsp;&nbsp;&nbsp;Weak Soldiers will bow to you.<br>")',Mili_Second);
	Mili_Second = Mili_Second + 3000;
	
	window.setTimeout('Demo_Bow()',Mili_Second);
	Mili_Second = Mili_Second + 1000;
	
	window.setTimeout('Demo_Step("<br>3. Click one of them to make that Soldier Die.........<br>")',Mili_Second);
	Mili_Second = Mili_Second + 4000;
	
	window.setTimeout('Demo_Die(21)',Mili_Second);
	window.setTimeout('Demo_Step("<br>4. <B>Have fun and Cheeeerrrrrssss.........</B>")',Mili_Second);
	window.setTimeout('Demo_Step("<br><br><input style=\'float:centre;\' type=\'button\' value=\'       Play          \' onclick=\'Load_Theme();\'/><input style=\'float:right;\' type=\'button\' value=\'       Demonstrate          \' onclick=\'Demonstration();\'/><br>")',Mili_Second);
}

function Put_Human(To)
{
	document.getElementById(To).innerHTML = '<img src="' + Human_Shoulder + '" class="player player-tab player-m"  title="' + Auto_Title + '">';
	document.getElementById("turn").innerHTML='Player 2</br>';
}

function Put_Auto(To)
{
	document.getElementById(To).innerHTML = '<img src="' + Auto_Shoulder + '" class="player player-tab player-m"  title="' + Auto_Title + '">';
	document.getElementById("turn").innerHTML='Player 1</br>';
}

function Demo_Bow()
{
	for(var q=0; q<10; q=q+2)
	{
		document.getElementById(Demo_Positions[q]).innerHTML = document.getElementById(11).innerHTML = '<img src="' + Human_Shoulder_Blur + '" class="player player-tab player-m"  title="' + Human_Title + '">';
	}
}

function Demo_Die(Prey)
{
	for(var q=0; q<10; q=q+2)
	{
		document.getElementById(Demo_Positions[q]).innerHTML = document.getElementById(11).innerHTML = '<img src="' + Human_Shoulder + '" class="player player-tab player-m"  title="' + Human_Title + '">';
	}
	document.getElementById(Prey).innerHTML = '<img src="' + Default_Image + '" class="player player-tab player-m"  title="' + Human_Title + '">';
}