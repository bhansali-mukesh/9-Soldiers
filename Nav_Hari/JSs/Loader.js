//	MUKESH KUMAR BHANSALI
//	All Right Reserved

var Theme;
var Path_Image;
var Space_Image;

var Human_Shoulder;
var Auto_Shoulder;
var Human_Shoulder_Blur;
var Auto_Shoulder_Blur;
var Human_Shoulder_Strong;
var Auto_Shoulder_Strong;

var Human_Shoulder_Ready;
var Auto_Shoulder_Ready;
var Default_Image;

function Mukesh_Load_Karo()
{
	document.getElementsByTagName("body")[0].background="Resources/" + Theme + "/" + Theme + ".jpg";

	clearTimeout();
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
	
	for(i=0;i<3;i++)
	{
		for(j=0; j < 8; j++)
		{
			Location =	(i+1)*10 + j+1;	
			Position[i*8 + j] = Location;
			document.getElementById(Location).innerHTML='<img src="' + Default_Image + '" class="player player-tab player-m" onclick="Shoulder(' + Position[i*8 + j] + ');">';
			Neighbour[Location] = new Array(4);
			Neighbour_Hoods(Location);
		}
	}
	
	instruction();
	window.setTimeout('Hide_Element("instructions")',30000);
	
	
	document.getElementById("Score").innerHTML='<a onclick="javascript:Lekhak();"><img width="10" height="10" src="JSs/Player.js">Player_1 :	0/0</br></font><font color="'+ Player_2_Color +'">Player_2 :	0/0</br>';
	document.getElementById("turn").innerHTML='Player 1</br>';
	
	loadfile("JSs/Human.js ");
	removefile("JSs/Monster.js");
	
	if(document.getElementById("players_type").value == "Humans")
	{
		Artificial_Intelligency = false;
		document.getElementById("Set_Player").innerHTML = "";
		removefile("JSs/Thinking_Process.js");
		removefile("JSs/Auto_Move.js");
		loadfile("JSs/Second.js");
	}
	else
	{
		removefile("JSs/Second.js");
		loadfile("JSs/Thinking_Process.js");
		loadfile("JSs/Auto_Move.js");
		Artificial_Intelligency = true;
		var Player = '<img src = "space.jpeg" height=14 width = 150 style="opacity:0;">\
		<select id="Set" onchange="First_Player();">\
		<option value="Human"  selected>Human Player First</option>\
		<option value="Machine">Auto Player First</option>\
		</select>';
	
		document.getElementById("Set_Player").innerHTML = Player;
	}

	First_Player();
}

function Load_Theme()
{
	try
	{
		if(Lekhak)
		{
			Theme = document.getElementById("theme").value;
			Calculate_Resources();
			Mukesh_Load_Karo();
		}
	}
	catch(e)
	{
		alert("Error in Theme Selection " + e.message);
	}
}


function Lekhak()
{
	var Bhansali = '<a href="javascript:Load_Theme();"><img src="Bhansali.jpg"></a>';
	document.getElementById("navhari").innerHTML=Bhansali;
}

function Calculate_Resources()
{
	Path_Image = "Resources/" + Theme + "/Battle_Ground.jpg";
	Space_Image = "Resources/space.jpeg";

	Human_Shoulder = "Resources/" + Theme + "/Player_1.jpg";
	Auto_Shoulder = "Resources/" + Theme + "/Player_2.jpg";
	Human_Shoulder_Blur = "Resources/" + Theme + "/Blur_Player_1.gif";
	Auto_Shoulder_Blur = "Resources/" + Theme + "/Blur_Player_2.gif";
	Human_Shoulder_Strong = "Resources/" + Theme + "/Abhay.gif";
	Auto_Shoulder_Strong = "Resources/" + Theme + "/Nirbhay.gif";

	Human_Shoulder_Ready = "Resources/" + Theme + "/Player_1_Ready.gif";
	Auto_Shoulder_Ready = "Resources/" + Theme + "/Player_2_Ready.gif";
	Default_Image = "Resources/" + Theme + "/Parking.jpg";
}

function Reset()
{
	for(i=0; i<4; i++)
	{
		Free_Neighours[i] = 0;
		Immortal[(i + 1) * 2] = false;
	}
	
	for(i=0; i<3; i++)
	{
		for(j=0; j < 8; j++)
		{
			Location =	(i+1)*10 + j+1;	
			Filled[Location] = false;
			
			Auto_Filled[Location] = false;
			document.getElementById(Location).innerHTML='<img src="' + Default_Image + '" class="player player-tab player-m"  onclick="Shoulder(' + Position[i*8 + j] + ');">';
			
			if((Location % 2) == 1)
				Immortal[Location] = false;
		}
	}
	Moved = false;
	Previous_Auto_Step = 0;
	Auto_Step = 11;
	Previous = 11;
	From = 11;//	JASOL
	Ookda = false;
	Human_Step = 11;
	Selected = 11;
	Killing = false;
	Remaining = 18;
	Your_Shoulders = 0;
	Rivals_Shoulders = 0;
	Rivals = 0;
	Yours = 0;
	document.getElementById("Score").innerHTML='Player_1 :	0/0</br></font><font color="'+ Player_2_Color +'">Player_2 :	0/0</br>';

	//Reset_Clock();
	Time = 0;
}

function loadfile(filename)
{

	var files = document.getElementsByTagName("script");
	var file_Index;
	var Exist = false;
	for(var z=0; z<files.length; z++)
	{
		file_Index = files[z].src.indexOf(filename);
		if (file_Index != -1)	//if filename is a external file
		{ 
			Exist = true;
		}
	}
	
	if(!Exist)
	{ 
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
		fileref.setAttribute("id", filename);
	}
  
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
	//alert(filename);
}

function removefile(filename)
{

	var files = document.getElementsByTagName("script");
	var file_Index;
	for(var z=0; z<files.length; z++)
	{
		file_Index = files[z].src.indexOf(filename);
		if (file_Index != -1)	//if filename is a external file
		{ 
			files[z].parentNode.removeChild(files[z]);
		}
	}	
}

function Draw_Game()
{
	var UI_String = '</br></br>\
	<div id="11" class="left"></div>\
	<div class="left"><img class="outer-horizon-path outer-horizon-path-tab outer-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="12" class="left"></div>\
	<div class="left"><img class="outer-horizon-path outer-horizon-path-tab outer-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="13"></div>\
	<div class="div-dimention-big div-dimention-big-tab div-dimention-big-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-big div-dimention-big-tab div-dimention-big-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
	<div style="float:left; "></div>\
	<div id="21" class="left"></div>\
	<div class="left"><img class="middle-horizon-path middle-horizon-path-tab  middle-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="22" class="left"></div>\
	<div class="left"><img class="middle-horizon-path middle-horizon-path-tab  middle-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="23" class="div-dimention-small div-dimention-small-tab div-dimention-small-m"></div>\
	<div><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
		<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-medium div-dimention-medium-tab div-dimention-medium-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-medium div-dimention-medium-tab div-dimention-medium-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
		<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
	<div id="31" class="left"></div>\
	<div class="left"><img class="inner-horizon-path inner-horizon-path-tab inner-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="32" class="left"></div>\
	<div class="left"><img class="inner-horizon-path inner-horizon-path-tab inner-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="33" class="div-dimention-small div-dimention-small-tab div-dimention-small-m"></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
	<div><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
		<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-medium div-dimention-medium-tab div-dimention-medium-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
		<div id="18" class="left"></div>\
	<div class="left"><img class="inner-horizon-path inner-horizon-path-tab inner-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="28" class="left"></div>\
	<div class="left"><img class="inner-horizon-path inner-horizon-path-tab inner-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="38" class="left"></div>\
	<div class="left"><img src=' + Space_Image + ' class="middle-horizon-path middle-horizon-path-tab  middle-horizon-path-m" style="opacity:0;" onclick="Dhani();"></div>\
	<div id="34" class="left"></div>\
	<div class="left"><img class="inner-horizon-path inner-horizon-path-tab inner-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="24" class="left"></div>\
	<div class="left"><img class="inner-horizon-path inner-horizon-path-tab inner-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="14"></div>\
		<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-medium div-dimention-medium-tab div-dimention-medium-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
		<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
	<div id="37" class="left"></div>\
	<div class="left"><img class="inner-horizon-path inner-horizon-path-tab inner-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="36" class="left"></div>\
	<div class="left"><img class="inner-horizon-path inner-horizon-path-tab inner-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="35" class="div-dimention-small div-dimention-small-tab div-dimention-small-m"></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
	<div><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
		<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-medium div-dimention-medium-tab div-dimention-medium-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-medium div-dimention-medium-tab div-dimention-medium-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
		<div class="div-dimention-small div-dimention-small-tab div-dimention-small-m" ><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
	<div id="27" class="left"></div>\
	<div class="left"><img class="middle-horizon-path middle-horizon-path-tab  middle-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="26" class="left"></div>\
	<div class="left"><img class="middle-horizon-path middle-horizon-path-tab  middle-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="25" class="div-dimention-small div-dimention-small-tab div-dimention-small-m"></div>\
	<div><img class="inner-vertical-portion inner-vertical-portion-tab inner-vertical-portion-m" src=' + Path_Image + '></div>\
		<div class="div-dimention-big div-dimention-big-tab div-dimention-big-m" ><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div class="div-dimention-big div-dimention-big-tab div-dimention-big-m"><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
	<div><img class="vertical-junction vertical-junction-tab vertical-junction-m" src=' + Path_Image + '></div>\
		<div id="17" class="left"></div>\
	<div class="left"><img class="outer-horizon-path outer-horizon-path-tab outer-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="16" class="left"></div>\
	<div class="left"><img class="outer-horizon-path outer-horizon-path-tab outer-horizon-path-m" src=' + Path_Image + '></div>\
	<div id="15"></div>\
	<div style="float:left;width:525;">.</div><img src="Resources/Shoulder.js" width="60" height="60" style="opacity:0.4">';
	
	document.getElementById("navhari").innerHTML=UI_String;
}

function instruction()
{
	Rules_and_Regulations = '<b><em>Instructions</b></em></br>\
	_______________________________________________________________________</br>\
	This is the game of <b><em>9 Soldiers</b></em> called Nav Hari.</br>\
	The game has following rules,regulations and guide lines.</br></br>\
	1.	This game needs, two and exactly two player(Army) to play.</br>\
	2.	Both will have 9 Soldiers in their Batalian.</br>\
	3.	You and your opponent can put them wherever you want if place is available.</br>\
	4.	When you finish with all 9, you can move them in their neighbourhood if place is available.</br></br>\
	<em>\
	5.	If you succeds in putting your 3 Soldiers in a row, you can kill one of your opponent and vice verce.</br>\
	6.	Soldiers(3), which are in a row, they makes <b>Immortal Line,</b> hence can not even die.</br>\
	7.	If you or your opponent finds no space to move for every live Soldier or when you makes an immortal line and all opponent Soldiers are immortal at the moment and no opponent to be killed, it will be tie(Deadlock).</br></br>\
	</em>\
	<b>\
	8.	You can see your\'s and opponent\'s score above.</b></br>';
	
	var How_To_Play ='_______________________________________________________________________</br>\
	<b><em>How to Play</b></em></br>\
	_______________________________________________________________________</br>\
	1.	To put your Soldiers down, click on any square wood. This is a place where a soldier can stay.</br>\
	2.	When you finish your in hand(9) Soldiers, click on any of your Soldier,<br> It will show neighbourhood places where it can move. </br>\
	3.	Click on desire neighbourhood to move your Soldier over there.</br>\
	4.	When you make an <b>Immortal Line* </b> the enemies soldier are trapped and you can kill one of them.<br> Click on one of them to kill and continue.</br></br>\
	_______________________________________________________________________</br>';
	
	var Instructions = Rules_and_Regulations + How_To_Play;
	document.getElementById("instructions").innerHTML = Instructions;
}

function Load_Demonstration()
{
	removefile("JSs/Thinking_Process.js");
	removefile("JSs/Human.js");
	removefile("JSs/Auto_Move.js");
	removefile("JSs/Second.js");

	loadfile("JSs/Monster.js");
	window.setTimeout('Demonstration()',2000);
}