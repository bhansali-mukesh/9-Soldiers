//	MUKESH KUMAR BHANSALI
//	All Right Reserved

function Chaal(From_Location,To_Location)
{
	if(Killing)
		return;
	
	//If Hat-Trick Broken, Shoulder may die as it is not Immortal at the moment.
	if( IsImmortal(From_Location) )
		Noramlise(From_Location, false);
		
	//alert("To_Location = " + To_Location " Selected = " + Selected);
	document.getElementById(To_Location).innerHTML='<img src="' + Auto_Shoulder + '" title="' + Auto_Title + '" class="player player-tab player-m"  onclick="Calculate_Free_Neighbourhoods(' + To_Location + ',false);">';
	Auto_Filled[To_Location] = true;
	
	document.getElementById(Selected).innerHTML='<img src="' + Default_Image + '" class="player player-tab player-m" >';
	Auto_Filled[Selected] = false;
	
	for(i=0; i<4; i++)
	{
		if(Free_Neighours[i] != 0 && !Auto_Filled[Free_Neighours[i]])
		{
			document.getElementById(Free_Neighours[i]).innerHTML='<img src="' + Default_Image + '"  class="player player-tab player-m" >';
			Free_Neighours[i] = 0;
		}
	}
	
	if(Tikdi(To_Location,Filled, true))
		Kill(true);
		
	//	MB
	
	Human_Step = To_Location;
	First = false;
	if(!Killing)
		document.getElementById("turn").innerHTML='Player 2</br>';
	if(Artificial_Intelligency)
		March();
	if(Tikdi(To_Location,Auto_Filled, false))
		Kill(false);
	
	Auto_Step = To_Location;
	First = true;
	if(!Killing)
		document.getElementById("turn").innerHTML='Player 1</br>';
		
	Selected = "NA";
}