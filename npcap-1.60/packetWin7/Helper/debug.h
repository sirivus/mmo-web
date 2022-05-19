/***********************IMPORTANT NPCAP LICENSE TERMS***********************
 *                                                                         *
 * Npcap is a Windows packet sniffing driver and library and is copyright  *
 * (c) 2013-2021 by Insecure.Com LLC ("The Nmap Project").  All rights     *
 * reserved.                                                               *
 *                                                                         *
 * Even though Npcap source code is publicly available for review, it is   *
 * not open source software and the free version may not be redistributed  *
 * or incorporated into other software without special permission from     *
 * the Nmap Project. It also has certain usage limitations described in    *
 * the LICENSE file included with Npcap and also available at              *
 * https://github.com/nmap/npcap/blob/master/LICENSE. This header          *
 * summarizes a few important aspects of the Npcap license, but is not a   *
 * substitute for that full Npcap license agreement.                       *
 *                                                                         *
 * We fund the Npcap project by selling two commercial licenses:           *
 *                                                                         *
 * The Npcap OEM Redistribution License allows companies distribute Npcap  *
 * OEM within their products. Licensees generally use the Npcap OEM        *
 * silent installer, ensuring a seamless experience for end                *
 * users. Licensees may choose between a perpetual unlimited license or    *
 * an annual term license, along with options for commercial support and   *
 * updates. Prices and details: https://nmap.org/npcap/oem/redist.html     *
 *                                                                         *
 * The Npcap OEM Internal-Use License is for organizations that wish to    *
 * use Npcap OEM internally, without redistribution outside their          *
 * organization. This allows them to bypass the 5-system usage cap of the  *
 * Npcap free edition. It includes commercial support and update options,  *
 * and provides the extra Npcap OEM features such as the silent installer  *
 * for automated deployment. Prices and details:                           *
 * https://nmap.org/npcap/oem/internal.html                                *
 *                                                                         *
 * Free and open source software producers are also welcome to contact us  *
 * for redistribution requests, but we normally recommend that such        *
 * authors instead ask their users to download and install Npcap           *
 * themselves.                                                             *
 *                                                                         *
 * Since the Npcap source code is available for download and review,       *
 * users sometimes contribute code patches to fix bugs or add new          *
 * features.  You are encouraged to submit such patches as Github pull     *
 * requests or by email to fyodor@nmap.org.  If you wish to specify        *
 * special license conditions or restrictions on your contributions, just  *
 * say so when you send them. Otherwise, it is understood that you are     *
 * offering the Nmap Project the unlimited, non-exclusive right to reuse,  *
 * modify, and relicence your code contributions so that we may (but are   *
 * not obligated to) incorporate them into Npcap.                          *
 *                                                                         *
 * This software is distributed in the hope that it will be useful, but    *
 * WITHOUT ANY WARRANTY; without even the implied warranty of              *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. Warranty rights    *
 * and commercial support are available for the OEM Edition described      *
 * above.                                                                  *
 *                                                                         *
 * Other copyright notices and attribution may appear below this license   *
 * header. We have kept those for attribution purposes, but any license    *
 * terms granted by those notices apply only to their original work, and   *
 * not to any changes made by the Nmap Project or to this entire file.     *
 *                                                                         *
 ***************************************************************************/
/*
 * Copyright (c) 2005 - 2006
 * CACE Technologies LLC, Davis (CA)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the company (CACE Technologies LLC) nor the 
 * names of its contributors may be used to endorse or promote products 
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

#ifndef __PACKET_DEBUG_393073863432093179878957
#define __PACKET_DEBUG_393073863432093179878957

#ifdef _DEBUG_TO_FILE

#include <stdio.h>
#include <windows.h>

extern CHAR g_LogFileName[1024];

#pragma warning(push)
#pragma warning(disable : 4127)

static VOID OutputDebugStringVA(LPCSTR Format, ...)
{
	FILE *f;											
	SYSTEMTIME LocalTime;								
	va_list Marker;
	DWORD dwThreadId;
	int loops = 0;
	DWORD dwLastError = GetLastError();

	dwThreadId = GetCurrentThreadId();

	va_start( Marker, Format );     /* Initialize variable arguments. */
														
	GetLocalTime(&LocalTime);							
														
	do
	{
		if (fopen_s(&f, "C:\\Program Files\\Npcap\\NpcapHelper.log", "a") == 0)
			break;

		Sleep(0);
		loops++;
	}
	while(loops <= 10);

	if (loops > 10 || !f)
	{
		SetLastError(dwLastError);
		return;
	}

	fprintf(f, "[%.08X] %.04u-%.02u-%.02u %.02u:%02u:%02u ",
			dwThreadId,
			LocalTime.wYear,							
			LocalTime.wMonth,							
			LocalTime.wDay,								
			LocalTime.wHour,							
			LocalTime.wMinute,							
			LocalTime.wSecond);										
	vfprintf(f, Format, Marker);
	
	fclose(f);											


	SetLastError(dwLastError);
}

#pragma warning(pop)

#elif defined (_DBG)

#include <strsafe.h>

static VOID OutputDebugStringVA(LPCSTR Format, ...)
{
	va_list Marker;
	CHAR string[1024];
	DWORD dwLastError = GetLastError();

	va_start( Marker, Format );     /* Initialize variable arguments. */

	StringCchVPrintfA(string, sizeof(string), Format, Marker);

	OutputDebugStringA(string);

	va_end(Marker);

	SetLastError(dwLastError);
}
#endif


#if defined(_DBG) || defined(_DEBUG_TO_FILE)

#ifdef _DBG
#define TRACE_PRINT_DLLMAIN(_x)			OutputDebugStringVA ("    " _x "\n")
#else
#define TRACE_PRINT_DLLMAIN(_x)			//we cannot use the _DEBUG_TO_FILE stuff from DllMain!!
#endif

#define TRACE_ENTER(_x)					OutputDebugStringVA ("--> " _x "\n")
#define TRACE_EXIT(_x)					OutputDebugStringVA ("<-- " _x "\n")
#define TRACE_PRINT(_x)					OutputDebugStringVA ("    " _x "\n")
#define TRACE_PRINT1(_x, _y)			OutputDebugStringVA("    " _x "\n", _y)   		
#define TRACE_PRINT2(_x, _p1, _p2)		OutputDebugStringVA("    " _x "\n", _p1, _p2)   		
#define TRACE_PRINT4(_x, _p1, _p2, _p3, _p4) OutputDebugStringVA("    " _x "\n", _p1, _p2, _p3, _p4) 
#define TRACE_PRINT6(_x, _p1, _p2, _p3, _p4, _p5, _p6) OutputDebugStringVA("    " _x "\n", _p1, _p2, _p3, _p4, _p5, _p6 )

static __forceinline void TRACE_PRINT_OS_INFO()
{
	HKEY	hKey;
	CHAR buffer[1024];
	DWORD size = sizeof(buffer);
	DWORD type;
	DWORD dwLastError;

	dwLastError = GetLastError();

	TRACE_PRINT("********************* OS info.*********************");
	buffer[size-1] = 0;
	if(	RegOpenKeyExA(HKEY_LOCAL_MACHINE, "SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment", 0, KEY_READ, &hKey) == ERROR_SUCCESS)
	{
		if (RegQueryValueExA(hKey, "PROCESSOR_ARCHITECTURE", 0, &type, (LPBYTE)buffer, &size) == ERROR_SUCCESS && type == REG_SZ)
		{
			OutputDebugStringVA("Architecture = %s\n", buffer);
		}
		else
		{
			OutputDebugStringVA("Architecture = <UNKNOWN>\n");
		}
		
		RegCloseKey(hKey);
	}
	else
	{
		OutputDebugStringVA("Architecture = <UNKNOWN>\n");
	}

	size = sizeof(buffer);
	buffer[size-1] = 0;

	if(	RegOpenKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion", 0, KEY_READ, &hKey) == ERROR_SUCCESS)
	{
		if (RegQueryValueExA(hKey, "CurrentVersion", 0, &type,  (LPBYTE)buffer, &size) == ERROR_SUCCESS && type == REG_SZ)
		{
			OutputDebugStringVA("Windows version = %s\n", buffer);
		}
		else
		{
			OutputDebugStringVA("Windows version = <UNKNOWN>\n");
		}
		
		RegCloseKey(hKey);
	}
	else
	{
		OutputDebugStringVA("Windows version = <UNKNOWN>\n");
	}

	size = sizeof(buffer);
	buffer[size-1] = 0;
	if(	RegOpenKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion", 0, KEY_READ, &hKey) == ERROR_SUCCESS)
	{
		if (RegQueryValueExA(hKey, "CurrentType", 0, &type,  (LPBYTE)buffer, &size) == ERROR_SUCCESS && type == REG_SZ)
		{
			OutputDebugStringVA("Windows CurrentType = %s\n", buffer);
		}
		else
		{
			OutputDebugStringVA("Windows CurrentType = <UNKNOWN>\n");
		}
		
		RegCloseKey(hKey);
	}
	else
	{
		OutputDebugStringVA("Windows CurrentType = <UNKNOWN>\n");
	}

	OutputDebugStringVA("*************************************************** \n");

	SetLastError(dwLastError);
}
#else

#define TRACE_ENTER(_x)
#define TRACE_PRINT_DLLMAIN(_x)
#define TRACE_EXIT(_x) 
#define TRACE_PRINT(_x)
#define TRACE_PRINT1(_x, _y)
#define TRACE_PRINT2(_x, _p1, _p2)
#define TRACE_PRINT4(_x, _p1, _p2, _p3, _p4) 
#define TRACE_PRINT6(_x, _p1, _p2, _p3, _p4, _p5, _p6) 
#define TRACE_PRINT_OS_INFO()

#endif



#endif //__PACKET_DEBUG_393073863432093179878957
