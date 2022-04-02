(function(window){
	var prizeoutSDK = function() {
		this.visible		= false;
		this.endpoint		= "http://localhost:8100/";
		this.listener		= null;
		this.dialog			= false; // Dialog not created
		this.iframe			= false; // Iframe not created
		this.dialogStyle	= "position:fixed;top:0;left:0;width:100%;height:100vh;background-color:#FFFFFF;z-index:50000;";
		this.boundMessageHandler	= this.handleIncomingMessage.bind(this);	// To be able to kill the listener
	};
	prizeoutSDK.prototype.init = function(settings, miniWidgetElement) {
		var scope = this;
		
		this.settings = settings;
		
		if (miniWidgetElement) {
			this.miniWidgetElement = miniWidgetElement;
			this.settings.miniWidget = true; // Get erased if the user clicks "see more"
		}
		
		if (document.location.hostname=='localhost') {
			console.log("SDK settings", settings);
		}
		
		
		if (!this.settings.env) {
			this.settings.env = 'sandbox';
		}
		
		this.encodedSettings	= '{}';

		var env_endpoint_prefix = ''
		var zone_endpoint_prefix = ''

		if (this.settings.env == 'sandbox') {
			env_endpoint_prefix = 'sandbox.'
		}

		this.endpoint = "https://"+env_endpoint_prefix+zone_endpoint_prefix+"widget.prizeout.com"

		// Localhost compatibility, remove from final template
		if (this.settings.localhost) {
			this.endpoint = "http://localhost:8100/";
		}

		this.cleanup();

		if (miniWidgetElement) {
			this.settings.miniWidget = true;
			scope.createMiniWidget();
		} else {
			this.settings.miniWidget = false;
			scope.createDialog();
		}
		
		if (settings.callbacks && settings.callbacks.onInit) {
			settings.callbacks.onInit({
				type: this.settings.miniWidget?'mini':'full'
			});
		}
	};
	
	prizeoutSDK.prototype.create_widget = function(element, settings) {
		this.init(settings, element);
	};
	
	// Create the mini widget
	prizeoutSDK.prototype.createMiniWidget = function() {
		if (this.iframe) {
			this.iframe.remove();
			this.iframe	= null;
		}
		this.miniWidgetElement.innerHTML = ""; // Make sure the container is empty
		this.createIframe(this.miniWidgetElement);
	};
	
	// Resize the mini widget
	prizeoutSDK.prototype.resizeMiniWidget = function(content_height) {
		var scope = this;
		clearInterval(this.resizeDebounce);
		this.resizeDebounce = setTimeout(function() {
			if (scope.miniWidgetElement) {
				scope.miniWidgetElement.style.height = Math.round(content_height)+'px';
			}
		}, 250);
	};

	// Close the mini widget & open the full size one
	prizeoutSDK.prototype.miniWidgetSeeMore = function(data) {
		/*if (this.miniWidgetElement) {
			this.miniWidgetElement.style.display = 'none';
		}*/
		see_more_settings = {
			mini_session: data,
			partner_id: data['partner_id'],
			env: this.settings.env,
			callbacks: this.settings.callbacks,
			callbackStrings: this.settings.callbackStrings
		}

		if (!see_more_settings.env) {
			console.error('no env specified')
			return
		}

 		if (this.settings.callbacks && this.settings.callbacks.onSeeMoreManual) {
 			// only pass  what is needed to render the see more
			this.settings.callbacks.onSeeMoreManual(see_more_settings);
		} else {
			if (this.settings.callbacks && this.settings.callbacks.onSeeMore) {
				// only pass  what is needed to render the see more
				this.settings.callbacks.onSeeMore(see_more_settings)
			}
			this.cleanup();
			// passing all settings so user can nav back to the mini widget easily. else settings will be overriden
			this.settings['mini_session'] = data
			this.init(this.settings);
		}
	};

	// Cleanup params betwen calls
	prizeoutSDK.prototype.cleanup = function() {
		if (this.iframe) {
			this.iframe.remove();
			this.iframe	= null;
		}
		this.visible		= false;
		this.iframeLoaded 	= false;
		this.settingsSent	= false;
	};

	// Create a dialog
	prizeoutSDK.prototype.createDialog = function() {
		if (this.dialog && this.visible) {
			return this.dialog;
		}
		if (this.dialog && !this.visible) {
			this.dialog.setAttribute("style", this.dialogStyle+'display:table;');
			if (this.iframe) {
				// Reload the iframe
				this.iframe.setAttribute("src", this.endpoint+'?env='+this.settings.env+'&s='+this.encodedSettings+'&rnd='+Math.random());
			}
			this.visible	= true;
			return this.dialog;
		}
		this.dialog = document.createElement("div");
		this.dialog.setAttribute("style", this.dialogStyle+'display:table;');
		
		var row = document.createElement("div");
		row.setAttribute("style", "display:table-row;");
		this.dialog.appendChild(row);
		
		var cell = document.createElement("div");
		cell.setAttribute("style", "display:table-cell;text-align:center;vertical-align:middle;");
		row.appendChild(cell);
		
		this.createIframe(cell);
		
		
		document.body.appendChild(this.dialog);
		
		this.visible	= true;
	};
	
	// Create an iframe and connect to it via the SDKs
	prizeoutSDK.prototype.createIframe = function(parent) {
		var scope = this;
		if (this.iframe) {
			return this.iframe;
		}
		
		this.iframe = document.createElement("iframe");
		this.iframe.setAttribute("src", this.endpoint+'?env='+this.settings.env+'&s='+scope.encodedSettings);
		if (this.settings.classname) {
			this.iframe.setAttribute("class", this.settings.classname);
		}

		var userAgent = navigator.userAgent;

//		if (userAgent.indexOf("Firefox") > -1) {
//			this.iframe.setAttribute("style", "width:100%;height:100vh;border:0;");
//		} else {
//			this.iframe.setAttribute("style", "width:100%;height:100%;border:0;");
//		}

		this.iframe.setAttribute("style", (this.settings.miniWidget?"":"position:fixed;")+"top:0;left:0;width:100%;height:100%;border:0;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-left);box-sizing:border-box;")

		if (this.listening) {
			window.removeEventListener('message', this.boundMessageHandler, false);
		}
		window.addEventListener('message', this.boundMessageHandler, false);
		this.listening = true;

		this.iframe.onload = function() {
			scope.iframeLoaded = true;
			//console.log("iFrame loaded");

			// handshake with the iframe
			scope.handshake();
		};
		this.iframeParent	= parent;
		this.iframeParent.appendChild(this.iframe);
	};
	
	// Identify to the iframe
	prizeoutSDK.prototype.handshake = function() {
		this.send("settings", this.settings);
		this.settingsSent	= true;
	};
	
	
	
	// Hide the iframe
	prizeoutSDK.prototype.close = function(response) {
		//this.dialog.setAttribute("style", this.dialogStyle+'display:none;');
		this.dialog.remove();
		this.dialog			= null;
		this.iframe			= null;

		this.visible		= false;
		this.iframeLoaded 	= false;
		this.settingsSent	= false;
		if (this.settings.callbacks && this.settings.callbacks.onClose) {
			// Inject the widget type
			response.type = this.settings.miniWidget?'mini':'full';
			this.settings.callbacks.onClose(response);
		}
		if (this.miniWidgetElement) {
			// Reset the mini widget
			this.init(this.settings, this.miniWidgetElement);
		}
	};
	
	// Hide the iframe
	prizeoutSDK.prototype.closeMessageOnly = function(response) {
		if (this.settings.callbacks && this.settings.callbacks.onClose) {
			// Inject the widget type
			response.type = this.settings.miniWidget?'mini':'full';
			this.settings.callbacks.onClose(response);
		}
	};
	
	// Cashout Failed
	prizeoutSDK.prototype.onCashoutFail = function(response) {
		if (this.settings.callbacks && this.settings.callbacks.onCashoutFail) {
			this.settings.callbacks.onCashoutFail(response);
		}
	};
	
	// Cashout Completed
	prizeoutSDK.prototype.onCashoutSuccess = function(response) {
		if (this.settings.callbacks && this.settings.callbacks.onCashoutSuccess) {
			this.settings.callbacks.onCashoutSuccess(response);
		}
	};
	
	// Handle incoming messages from the iframe
	prizeoutSDK.prototype.handleIncomingMessage = function(event) {
		var scope = this;
		try {
			var payload = JSON.parse(event.data);
		} catch (e) {
			var payload = event.data;
		}
		
		var rawType		= payload.type;
		var dataPayload	= payload.payload;
		
		switch (rawType) {
			case "hello":
				// Send back the settings
				if (this.iframeLoaded) {
					this.send("settings", this.settings);
					this.settingsSent	= true;
				} // Otherwise wait until it's loaded
			break;
			case "close":
				this.close(dataPayload);
			break;
			case "cashoutFail":
				this.onCashoutFail(dataPayload);
			break;
			case "cashoutSuccess":
				this.onCashoutSuccess(dataPayload);
			break;
			case "closeMessageOnly":
				this.closeMessageOnly(dataPayload);
			break;
			case "widget-height":
				this.resizeMiniWidget(dataPayload);
			break;
			case "widget-see-more":
				this.miniWidgetSeeMore(dataPayload);
			break;
		}
	};
	// Send messages to the iframe
	prizeoutSDK.prototype.send = function(type, payload) {
		if (payload && payload.callbacks && typeof payload.callbacks === 'object') {
			payload.callbackStrings = {}
			callbackKeys = Object.keys(payload.callbacks);
			callbackKeys.forEach(function(callbackKey) {
				if (typeof payload.callbacks[callbackKey] === 'function') {
					payload.callbackStrings[callbackKey] = payload.callbacks[callbackKey].toString();
				};
			})
		};

		this.iframe.contentWindow.postMessage({
			type:		type,
			payload:	payload && typeof payload === 'object' && payload.constructor === Object?JSON.stringify(payload):payload
		}, "*"/*this.endpoint*/);
	};
	window.prizeoutSDK	= new prizeoutSDK();

})(window);
