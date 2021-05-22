//	MUKESH KUMAR BHANSALI
//	All Right Reserved

var Set_Clock = new Date();
var Time = 0;
var Timer_String;
var GMT_Index = 0;
			
function Start_Watch()
{
	try
	{
		setInterval(function(){Update_Time()},1000);
	}
	catch(error)
	{
		alert(error.message);
	}
		// BHANSALI MUKESH
}
			
function Update_Time()
{	
	Set_Clock.setHours(0,0,Time++);
	Timer_String = Set_Clock.toTimeString();
	GMT_Index = Timer_String.indexOf('GMT');
	Timer_String = Timer_String.substring(0, GMT_Index);
	document.getElementById("Stop_Watch").innerHTML = Timer_String;
}
		
function Reset_Clock()
{
	Time = 0;
}