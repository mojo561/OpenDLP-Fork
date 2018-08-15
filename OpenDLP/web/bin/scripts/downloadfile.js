function toggleProfileInput()
{
	toggleEnable(document.getElementById("sshusername"));
	toggleEnable(document.getElementById("sshpassword"));
}

function toggleEnable(element)
{
	if( element.disabled )
	{
		element.disabled = false;
	}
	else
	{
		element.disabled = true;
	}
}
