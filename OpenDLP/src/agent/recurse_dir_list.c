/*

Copyright Andrew Gavin (andrew.opendlp@gmail.com) 2009-2012

This file is part of OpenDLP.

OpenDLP is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

OpenDLP is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with OpenDLP.  If not, see <http://www.gnu.org/licenses/>.

*/

#include <unistd.h>
#include <windows.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include "globals.h"

void recurse_all_dirs()
{
	int drive_type;
	char *pch;
	char drives[1024];
	FILE *log;
	FILE *status_file;

	// tell server that file enumeration is starting
	if( upload_stuff( status ) == 0 )
	{
		unlink( LOGFILE );
		WriteToLog( "Successful upload, deleted results and log files\n" );
	}
	else
	{
		WriteToLog( "Upload failed\n" );
	}

	if( !access( ALLDIR, F_OK )) //if file exists
	{
		unlink( ALLDIR );
		//WriteToLog("Skipping unlink(ALLDIR)\n");
	}

	// get all dirs/files if policy is not "allow" (ie: 'eveything', or 'ignore')
	if( strncmp( dir_opt, "allow", 5 ))
	{
		GetLogicalDriveStrings( 1024, drives );
		pch = drives;
		while( *pch )
		{
			drive_type = GetDriveType( pch ); //example value for pch: C:\

			// drive_type 2 = floppy, thumb drive, flash card reader
			// drive_type 3 = HDD, flash drive
			// drive_type 4 = network drive
			// drive_type 5 = CD-ROM
			// drive_type 6 = RAM disk
			if( drive_type == 3 || drive_type == 5 || drive_type == 6 )
			{
				// recursively list contents of drive
				log = fopen(LOGFILE, "a+");
				if( log != NULL )
				{
					fprintf(log, "Drive %s is of type %i, so I will scan it\n", pch, drive_type);
					fclose(log);
				}
				//showdir( pch );
				//NEW: 2018.07.31
				if(strncmp(pch, "C:\\", 3) == 0)
				{
					//first, grab all directories EXCEPT C:\Users
					showdir_nousers(pch);
					//next, grab directories only if we have conset (as read from config file)
					gdpr_curr_dir = gdpr_head_dir;
					while(gdpr_curr_dir)
					{
						log = fopen( LOGFILE, "a+" );
						if( log != NULL )
						{
							fprintf( log, "[GDPR] Enumerating contents of directory \"%s\"\n", gdpr_curr_dir->dir );
							fclose(log);
						}
						showdir(gdpr_curr_dir->dir);
						gdpr_curr_dir = gdpr_curr_dir->next;
					}
				}
				else
				{
					//if we aren't looking in C:\ get everything... maybe let the user consent to this in the future?
					showdir( pch );
				}
				//end new
			}
			else
			{
				log = fopen( LOGFILE, "a+" );
				if( log != NULL )
				{
					fprintf( log, "Drive %s is of type %i, so I will ignore it\n", pch, drive_type );
					fclose( log );
				}
			}
			pch = &pch[strlen(pch) + 1];
		}
		WriteToLog( "Done scanning for drives\n" );
	}
	else if( !strncmp( dir_opt, "allow", 5 ))
	{
		curr_dir = head_dir;
		while( curr_dir )
		{
			log = fopen( LOGFILE, "a+" );
			if( log != NULL )
			{
				fprintf( log, "Enumerating contents of directory \"%s\"\n", curr_dir->dir );
				fclose( log );
			}
			//showdir( curr_dir->dir );
			//NEW: 2018.08.02 - if current directory == C:\ , get everything EXCEPT C:\Users
			//hopefully everything has been sanitized by now...
			if(strlen(curr_dir->dir) == 3)
			{
				if(strncasecmp(curr_dir->dir, "C:\\", 3) == 0)
				{
					showdir_nousers(curr_dir->dir);
				}
				else
				{
					showdir( curr_dir->dir );
				}
			}
			else
			{
				showdir(curr_dir->dir);
			}
			curr_dir = curr_dir->next;
		}
		//next, grab directories only if we have conset (as read from config file)
		gdpr_curr_dir = gdpr_head_dir;
		while(gdpr_curr_dir)
		{
			log = fopen( LOGFILE, "a+" );
			if( log != NULL )
			{
				fprintf( log, "[GDPR] Enumerating contents of directory \"%s\"\n", gdpr_curr_dir->dir );
				fclose(log);
			}
			showdir(gdpr_curr_dir->dir);
			gdpr_curr_dir = gdpr_curr_dir->next;
		}
	}

	status_file = fopen( STATUS, "w" );
	if( status_file != NULL )
	{
		fprintf( status_file, "1" );
		fclose( status_file );
	}

	status = 1;
}