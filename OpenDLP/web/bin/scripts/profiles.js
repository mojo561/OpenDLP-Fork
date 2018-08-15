function validate_form(thisform)
{
	with( thisform )
	{
		if( profilename.value == "" )
		{
			alert( "\"Profile Name\" cannot be blank." );
			profilename.focus();
			return false;
		}

		if( scantype.value != "win_agent" && scantype.value != "meta_agent" && scantype.value != "post_agent" && scantype.value != "win_agentless" && scantype.value != "win_share" && scantype.value != "unix_agentless" && scantype.value != "mssql_agentless" && scantype.value != "mysql_agentless" )
		{
			alert( "\"Scan Type\" cannot be blank." );
			scantype.focus();
			return false;
		}

		if( username.value == "" && scantype.value != "win_share" && scantype.value != "meta_agent" && scantype.value != "post_agent")
		{		  
			alert( "\"Username\" cannot be blank." );
			username.focus();
			return false;
		}

		if( domain.value == "" && (scantype.value == "win_agent" || scantype.value == "win_agentless"))
		{
			alert( "\"Windows Domain/Workgroup\" cannot be blank." );
			domain.focus();
			return false;
		}

		if(( scantype.value == "win_agent" || scantype.value == "meta_agent" || scantype.value == "post_agent" || scantype.value == "win_agentless" || scantype.value == "unix_agentless" || scantype.value == "win_share" ) && !(dir_choice[0].checked) )
		{
			var directories = document.profile.directories.value;
			var directories_split = directories.value.split("\n");
			for( i = 0; i < directories_split.length; i++ )
			{
				if( directories_split[i] == "" )
				{
					alert( "Blank line detected at line " + i + " in \"Directories\" textarea (after the line \"" + directories_split[i-1] + "\"). Correct this to continue." );
					directories.focus();
					return false;
				}
			}
		}

		if(( scantype.value == "win_agent" || scantype.value == "meta_agent"  || scantype.value == "post_agent" || scantype.value == "win_agentless" || scantype.value == "unix_agentless" || scantype.value == "win_share" ) && !(ext_choice[0].checked) )
		{
			var extensions = document.profile.extensions.value;
			var extensions_split = extensions.value.split("\n");
			for( i = 0; i < extensions_split.length; i++ )
			{
				if( extensions_split[i] == "" )
				{
					alert( "Blank line detected at line " + i + " in \"File Extensions\" textarea (after the line \"" + extensions_split[i-1] + "\"). Correct this to continue." );
					extensions.focus();
					return false;
				}
			}
		}

		if(( scantype.value == "win_agent" || scantype.value == "meta_agent" || scantype.value == "post_agent" || scantype.value == "win_agentless" || scantype.value == "unix_agentless" || scantype.value == "win_share" ) )
		{
			var zipfiles = zipfile.value;
			var zipfiles_split = zipfiles.split("\n");
			for( i = 0; i < zipfiles_split.length; i++ )
			{
				if( zipfiles_split[i] == "" )
				{
					alert( "Blank line detected at line " + i + " in \"ZIP Extensions\" textarea (after the line \"" + zipfiles_split[i-1] + "\"). Correct this to continue." );
					zipfile.focus();
					return false;
				}
			}
		}

		if( (scantype.value == "mssql_agentless" || scantype.value == "mysql_agentless") && !(db_choice[0].checked ))
		{
			var databases = document.profile.databases.value;
			var databases_split = databases.value.split("\n");
			for( i = 0; i < databases_split.length; i++ )
			{
				if( databases_split[i] == "" )
				{
					alert( "Blank line detected at line " + i + " in \"Databases\" textarea (after the line \"" + databases_split[i-1] + "\"). Correct this to continue." );
					databases.focus();
					return false;
				}
			}
		}

		if( (scantype.value == "mssql_agentless" || scantype.value == "mysql_agentless") && !(table_choice[0].checked ))
		{
			var tables = document.profile.tables.value;
			var tables_split = tables.value.split("\n");
			for( i = 0; i < tables_split.length; i++ )
			{
				if( tables_split[i] == "" )
				{
					alert( "Blank line detected at line " + i + " in \"Tables\" textarea (after the line \"" + tables_split[i-1] + "\"). Correct this to continue." );
					tables.focus();
					return false;
				}
			}
		}

		if( (scantype.value == "mssql_agentless" || scantype.value == "mysql_agentless") && !(column_choice[0].checked ))
		{
			var columns = document.profile.columns.value;
			var columns_split = columns.value.split("\n");
			for( i = 0; i < columns_split.length; i++ )
			{
				if( columns_split[i] == "" )
				{
					alert( "Blank line detected at line " + i + " in \"Columns\" textarea (after the line \"" + columns_split[i-1] + "\"). Correct this to continue." );
					columns.focus();
					return false;
				}
			}
		}

		if( (scantype.value == "mssql_agentless" || scantype.value == "mysql_agentless") && ((rows.value == "") || rows.value < 0 ))
		{
			alert( "Invalid entry in \"Limit columns to X rows\"." );
			rows.focus();
			return false;
		}

		var creditcards = document.profile.creditcards.value;
		var creditcards_split = creditcards.value.split("\n");
		for( i = 0; i < creditcards_split.length; i++ )
		{
			if( creditcards_split[i] == "" )
			{
				alert( "Blank line detected at line " + i + " in \"Credit Cards\" textarea (after the line \"" + creditcards_split[i-1] + "\"). Correct this to continue." );
				creditcards.focus();
				return false;
			}
		}

		if( (scantype.value == "win_agent" || scantype.value == "meta_agent" || scantype.value == "post_agent") && url.value == "" )
		{
			alert( "\"Upload URL\" cannot be blank." );
			url.focus();
			return false;
		}

		if( (scantype.value == "win_agent" || scantype.value == "meta_agent" || scantype.value == "post_agent") && urluser.value == "" )
		{
			alert( "\"Upload URL username\" cannot be blank." );
			urluser.focus();
			return false;
		}

		//NEW: Josh 2018.07.22
		//Don't error out unless we want to update the urlpassword...
		//if( (scantype.value == "win_agent" || scantype.value == "meta_agent" || scantype.value == "post_agent") && urlpass.value == "" )
		if( (scantype.value == "win_agent" || scantype.value == "meta_agent" || scantype.value == "post_agent") && (urlpass.disabled == false && urlpass.value == "") )
		{
			alert( "\"Upload URL password\" cannot be blank." );
			urlpass.focus();
			return false;
		}

		if( (scantype.value == "win_agent" || scantype.value == "meta_agent" || scantype.value == "post_agent") && wait.value < 1 )
		{
			alert( "\"Time between uploads\" must be at least 1." );
			wait.focus();
			return false;
		}

		if( concurrent.value < 1 )
		{
			alert( "\"Concurrent deployments\" must be at least 1." );
			concurrent.focus();
			return false;
		}

		//Modified: Josh 2018.07.10
		//Only warn if we mean to actually update / add a password
		// TODO let's not allow this...
		if( password.disabled == false && password.value == "" && scantype.value != "meta_agent" && scantype.value != "post_agent")
		{
			if( !confirm( "\"Password\" is blank. Are you sure you want this?" ))
			{
				password.focus();
				return false;
			}
		}
		if (scantype.value == "meta_agent" || scantype.value == "post_agent") {
		  if (metapass.value =="") {
		  	if( !confirm( "\"Metasploit Password\" is blank. Are you sure you want this?" ))	{
			  	metapass.focus();
				  return false;
			  }
			}
			if (metauser.value == "") {
			  alert( "\"Metasploit user\" cannot be blank." );
			  metauser.focus();
			  return false;
			}
			if (metahost.value == "") {
			  alert( "\"Metasploit host\" cannot be blank." );
			  metahost.focus();
			  return false;
			}
			if (metaport.value == "") {
			  alert( "\"Metasploit port\" cannot be blank." );
			  metaport.focus();
			  return false;
			}
			if (metapath.value == "") {
			  alert( "\"Path to OpenDLP files (on Metasploit system)\" cannot be blank." );
			  metapath.focus();
			  return false;
			}
		}
	}
}

function changeList( box, old_found )
{
	if( box.value == "win_agent" )
	{
		document.getElementById("os_credentials").style.display = '';
		document.getElementById("domain").style.display = '';
		document.getElementById("db_options").style.display = 'none';
		document.getElementById("smbhash").style.display = '';
		document.getElementById("win_agent_options").style.display = '';
		document.getElementById("memory").style.display = '';
		document.getElementById("win_agent_options_3").style.display = '';
		document.getElementById("regex").style.display = '';
		document.getElementById("win_agent_options_2").style.display = '';
		document.getElementById("win_agent_options_4").style.display = '';
		document.getElementById("submission").style.display = '';
		document.getElementById("meta_agent_options").style.display = 'none';
		changeFS(box, old_found);
	}
	else if( box.value == "meta_agent" || box.value == "post_agent" ) 
	{
		document.getElementById("os_credentials").style.display = 'none';
		document.getElementById("meta_agent_options").style.display = '';
		document.getElementById("domain").style.display = 'none';
		document.getElementById("db_options").style.display = 'none';
		document.getElementById("smbhash").style.display = 'none';
		document.getElementById("win_agent_options").style.display = '';
		document.getElementById("memory").style.display = '';
		document.getElementById("win_agent_options_3").style.display = '';
		document.getElementById("regex").style.display = '';
		document.getElementById("win_agent_options_2").style.display = '';
		document.getElementById("win_agent_options_4").style.display = '';
		document.getElementById("submission").style.display = '';
        changeFS(box, old_found);
	}
	else if( box.value == "win_agentless" )
	{
		document.getElementById("os_credentials").style.display = '';
		document.getElementById("domain").style.display = '';
		document.getElementById("db_options").style.display = 'none';
		document.getElementById("smbhash").style.display = '';
		document.getElementById("win_agent_options").style.display = 'none';
		document.getElementById("memory").style.display = '';
		document.getElementById("win_agent_options_3").style.display = '';
		document.getElementById("regex").style.display = '';
		document.getElementById("win_agent_options_2").style.display = '';
		document.getElementById("win_agent_options_4").style.display = 'none';
		document.getElementById("submission").style.display = '';
		document.getElementById("meta_agent_options").style.display = 'none';
		changeFS(box, old_found);
	}
	else if( box.value == "win_share" )
	{
		document.getElementById("os_credentials").style.display = '';
		document.getElementById("domain").style.display = '';
		document.getElementById("db_options").style.display = 'none';
		document.getElementById("smbhash").style.display = '';
		document.getElementById("win_agent_options").style.display = 'none';
		document.getElementById("memory").style.display = '';
		document.getElementById("win_agent_options_3").style.display = '';
		document.getElementById("regex").style.display = '';
		document.getElementById("win_agent_options_2").style.display = '';
		document.getElementById("win_agent_options_4").style.display = 'none';
		document.getElementById("submission").style.display = '';
		document.getElementById("meta_agent_options").style.display = 'none';
		changeFS(box, old_found);
	}
	else if( box.value == "unix_agentless" )
	{
		document.getElementById("os_credentials").style.display = '';
		document.getElementById("domain").style.display = 'none';
		document.getElementById("db_options").style.display = 'none';
		document.getElementById("smbhash").style.display = 'none';
		document.getElementById("win_agent_options").style.display = 'none';
		document.getElementById("memory").style.display = '';
		document.getElementById("win_agent_options_3").style.display = '';
		document.getElementById("regex").style.display = '';
		document.getElementById("win_agent_options_2").style.display = '';
		document.getElementById("win_agent_options_4").style.display = 'none';
		document.getElementById("submission").style.display = '';
		document.getElementById("meta_agent_options").style.display = 'none';
		changeFS(box, old_found);
	}
	else if( box.value == "mssql_agentless" )
	{
		document.getElementById("os_credentials").style.display = '';
		document.getElementById("domain").style.display = '';
		document.getElementById("db_options").style.display = '';
		document.getElementById("smbhash").style.display = 'none';
		document.getElementById("win_agent_options").style.display = 'none';
		document.getElementById("memory").style.display = 'none';
		document.getElementById("win_agent_options_3").style.display = 'none';
		document.getElementById("regex").style.display = '';
		document.getElementById("win_agent_options_2").style.display = 'none';
		document.getElementById("win_agent_options_4").style.display = 'none';
		document.getElementById("submission").style.display = '';
		document.getElementById("meta_agent_options").style.display = 'none';
		changeDB(box, old_found);
	}
	else if( box.value == "mysql_agentless" )
	{
		document.getElementById("os_credentials").style.display = '';
		document.getElementById("domain").style.display = 'none';
		document.getElementById("db_options").style.display = '';
		document.getElementById("smbhash").style.display = 'none';
		document.getElementById("win_agent_options").style.display = 'none';
		document.getElementById("memory").style.display = 'none';
		document.getElementById("win_agent_options_3").style.display = 'none';
		document.getElementById("regex").style.display = '';
		document.getElementById("win_agent_options_2").style.display = 'none';
		document.getElementById("win_agent_options_4").style.display = 'none';
		document.getElementById("submission").style.display = '';
		document.getElementById("meta_agent_options").style.display = 'none';
		changeDB(box, old_found);
	}
	// NEW: Josh - 2018.05.11
	else if( box.value == "email_checkbox" )
	{
		if(document.getElementById("email_checkbox").checked)
		{
            document.getElementById("email_area").style.display = '';
		}
		else
		{
            document.getElementById("email_area").style.display = 'none';
		}
	}
	//
	else
	{
		document.getElementById("os_credentials").style.display = 'none';
		document.getElementById("domain").style.display = 'none';
		document.getElementById("db_options").style.display = 'none';
		document.getElementById("smbhash").style.display = 'none';
		document.getElementById("win_agent_options").style.display = 'none';
		document.getElementById("memory").style.display = 'none';
		document.getElementById("win_agent_options_3").style.display = 'none';
		document.getElementById("regex").style.display = 'none';
		document.getElementById("win_agent_options_2").style.display = 'none';
		document.getElementById("win_agent_options_4").style.display = 'none';
		document.getElementById("submission").style.display = 'none';
		document.getElementById("meta_agent_options").style.display = 'none';
	}
}

function changeDB(box, old_found)
{
    if( !old_found || old_found == 0 )
    {
        if( box.value == "mssql_agentless" )
        {
            document.profile.databases.value = "master" + "\n" + "tempdb" + "\n" + "model" + "\n" + "msdb" + "\n" + "pubs" + "\n" + "Northwind";
            document.profile.tables.value = "syssegments" + "\n" + "sysconstraints" + "\n" + "dtproperties";
            document.profile.columns.value = "";
            document.profile.table_choice[1].checked = true;
        }
        else if( box.value == "mysql_agentless" )
        {
            document.profile.databases.value = "information_schema" + "\n" + "mysql";
            document.profile.tables.value = "";
            document.profile.columns.value = "";
            document.profile.table_choice[0].checked = true;
        }
    }
}

function changeFS(box, old_found)
{
    if( !old_found || old_found == 0 )
    {
        if( box.value == "win_agentless" )
        {
            document.profile.directories.value = "c:\\windows" + "\n" + "c:\\winnt" + "\n" + "c:\\System Volume Information";
        }
        else if( box.value == "unix_agentless" )
        {
            document.profile.directories.value = "/nfs" + "\n" + "/bin" + "\n" + "/usr/bin" + "\n" + "/usr/local/bin" + "\n" + "/lib" + "\n" + "/usr/lib" + "\n" + "/usr/local/lib" + "\n" + "/sbin" + "\n" + "/usr/sbin" + "\n" + "/usr/local/sbin" + "\n" + "/dev" + "\n" + "/sys" + "\n" + "/proc" + "\n" + "/tmp/OpenDLP";
            document.profile.dir_choice[0].checked = false;
            document.profile.dir_choice[1].checked = true;
            document.profile.dir_choice[2].checked = false;
        }
        else if( box.value == "win_agent" || box.value == "meta_agent" || box.value == "post_agent")
        {
            document.profile.directories.value = "c:\\windows" + "\n" + "c:\\winnt" + "\n" + "c:\\System Volume Information";
            document.profile.dir_choice[0].checked = false;
            document.profile.dir_choice[1].checked = true;
            document.profile.dir_choice[2].checked = false;
        }
        else if( box.value == "win_share" )
        {
            document.profile.directories.value = "";
            document.profile.dir_choice[0].checked = true;
            document.profile.dir_choice[1].checked = false;
            document.profile.dir_choice[2].checked = false;
        }
    }
}

//NEW: Josh 2018.07.22
function togglePasswordInput()
{
	if( document.profile.password.disabled )
	{
		document.profile.password.disabled = false;
	}
	else
	{
		document.profile.password.disabled = true;
	}
}

//NEW: Josh 2018.07.22
function toggleUrlPasswordInput()
{
	if( document.profile.urlpass.disabled )
	{
		document.profile.urlpass.disabled = false;
	}
	else
	{
		document.profile.urlpass.disabled = true;
	}
}
