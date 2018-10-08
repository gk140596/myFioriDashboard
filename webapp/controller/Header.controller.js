sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function(Controller, JSONModel, History) {
	"use strict";

	return Controller.extend("dashdashboard.controller.Header", {

		onInit: function() {
                  //http://192.168.1.159:8000/sap/opu/odata/sap/ZSD_DASHBOARD1_SRV/ZAPPROVALSet(APPLEVEL='LEVEL1',CUSTOMER='',SPERSON='00000009')/SO_HeaderSet
		},
		onNavBack: function() {
			//window.history.go(-1);
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("selection", true);
			}
		},

		onClickButton: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("approval", {});
		}

	});
});