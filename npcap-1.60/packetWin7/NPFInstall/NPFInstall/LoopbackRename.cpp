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
/*++

Module Name:

    LoopbackRename.cpp

Abstract:

    This is used for enumerating our "Npcap Loopback Adapter" using NetCfg API, if found, we changed its name from "Ethernet X" to "Npcap Loopback Adapter".
    Also, we need to make a flag in registry to let the Npcap driver know that "this adapter is ours", so send the loopback traffic to it.

This code is modified based on example: https://msdn.microsoft.com/en-us/library/windows/desktop/aa364686.aspx
--*/

#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <objbase.h>
#include <netcon.h>
#include <stdio.h>

#include "LoopbackRename.h"

#include "debug.h"

#pragma comment(lib, "ole32.lib")
#pragma comment(lib, "oleaut32.lib")

#define			NPCAP_LOOPBACK_INTERFACE_NAME			NPF_DRIVER_NAME_NORMAL_WIDECHAR L" Loopback Adapter"
#define			BUF_SIZE								255

BOOL DoTheWork(INetSharingManager *pNSM, TCHAR strDeviceName[])
{
	TRACE_ENTER();

	// add a port mapping to every firewalled or shared connection 
	BOOL bFound = FALSE;
	BOOL bError = FALSE;
	INetSharingEveryConnectionCollection * pNSECC = NULL;
	HRESULT hr = pNSM->get_EnumEveryConnection (&pNSECC);
	if (!SUCCEEDED(hr) || !pNSECC)
	{
		TRACE_PRINT1("INetSharingManager::get_EnumEveryConnection: error, errCode = 0x%08x.", hr);
	}
	else {

		// enumerate connections
		IEnumVARIANT * pEV = NULL;
		IUnknown * pUnk = NULL;
		hr = pNSECC->get__NewEnum (&pUnk);
		if (SUCCEEDED(hr) && pUnk) {
			hr = pUnk->QueryInterface (__uuidof(IEnumVARIANT),
				(void**)&pEV);
			pUnk->Release();
		}
		else
		{
			TRACE_PRINT1("INetSharingEveryConnectionCollection::get__NewEnum: error, errCode = 0x%08x.", hr);
		}

		if (pEV) {
			VARIANT v;
			VariantInit (&v);

			while ((S_OK == pEV->Next (1, &v, NULL)) && (bFound == FALSE)) {
				if (V_VT (&v) == VT_UNKNOWN) {
					INetConnection * pNC = NULL;
					V_UNKNOWN (&v)->QueryInterface (__uuidof(INetConnection),
						(void**)&pNC);
					if (pNC) {
						NETCON_PROPERTIES *pNETCON_PROPERTIES;
						hr = pNC->GetProperties(&pNETCON_PROPERTIES);
						if (SUCCEEDED(hr))
						{

							TCHAR currentGUID[BUF_SIZE];
							GUID guid = pNETCON_PROPERTIES->guidId;
							_stprintf_s(currentGUID, BUF_SIZE, _T("{%08X-%04X-%04X-%02X%02X-%02X%02X%02X%02X%02X%02X}"),
								guid.Data1, guid.Data2, guid.Data3,
								guid.Data4[0], guid.Data4[1], guid.Data4[2], guid.Data4[3],
								guid.Data4[4], guid.Data4[5], guid.Data4[6], guid.Data4[7]);

							TRACE_PRINT2("IEnumVARIANT::Next: executing, currentGUID = %s, strDeviceName = %s.", currentGUID, strDeviceName);
							if (_tcscmp(currentGUID, strDeviceName) == 0)
							{
								TRACE_PRINT2("INetConnection::Rename: executing, currentGUID = strDeviceName = %s, pszwNewName = %s.", currentGUID, NPCAP_LOOPBACK_INTERFACE_NAME);

								hr = pNC->Rename(NPCAP_LOOPBACK_INTERFACE_NAME);
								bFound = TRUE;
								if (hr == HRESULT_FROM_WIN32(ERROR_TRANSACTIONAL_CONFLICT))
								{
									TRACE_PRINT1("INetConnection::Rename: error, errCode = 0x%08x.", hr);
									bError = TRUE;
								}
								else if (hr != S_OK)
								{
									TRACE_PRINT1("INetConnection::Rename: error, errCode = 0x%08x.", hr);
									bError = TRUE;
								}
								else
								{
									bError = FALSE;
								}
							}
						}
						pNC->Release();
					}
				}
				VariantClear(&v);
			}
			pEV->Release();
		}
		pNSECC->Release();
	}
	
	if (!bFound)
	{
		TRACE_PRINT("DoTheWork: error, bFound = 0.");
		TRACE_EXIT();
		return FALSE;
	}
	else
	{
		TRACE_EXIT();
		return !bError;
	}
}

BOOL RenameLoopbackNetwork(TCHAR strDeviceName[])
{
	TRACE_ENTER();

	BOOL bResult = FALSE;
	HRESULT hr = S_OK;
/*	CoInitialize (NULL);*/

	// init security to enum RAS connections
	hr = CoInitializeSecurity (NULL, -1, NULL, NULL, 
		RPC_C_AUTHN_LEVEL_PKT, 
		RPC_C_IMP_LEVEL_IMPERSONATE,
		NULL, EOAC_NONE, NULL);
	if (!SUCCEEDED(hr))
	{
		TRACE_PRINT1("CoInitializeSecurity: error, errCode = 0x%08x.", hr);
		TRACE_EXIT();
		return FALSE;
	}

	INetSharingManager * pNSM = NULL;    
	hr = ::CoCreateInstance (__uuidof(NetSharingManager),
		NULL,
		CLSCTX_ALL,
		__uuidof(INetSharingManager),
		(void**)&pNSM);
	if (!pNSM)
	{
		TRACE_PRINT1("CoCreateInstance: error, errCode = 0x%08x.", hr);
		TRACE_EXIT();
		return bResult;
	}
	else {

		// add a port mapping to every shared or firewalled connection.
		bResult = DoTheWork(pNSM, strDeviceName);

		pNSM->Release();
	}

/*	CoUninitialize ();*/

	TRACE_EXIT();
	return bResult;
}
