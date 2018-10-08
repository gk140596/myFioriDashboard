sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], function(Controller, MessageToast, History, MessageBox) {
	"use strict";

	return Controller.extend("otsi.erp.view.Details2", {

		_oItemTemplate: null,
		_oNavigationTable: null,
		_sItemPath: "",
		_sNavigationPath: "",
		slOrd: "",
		appLevel: "",

		onInit: function() {
			this._oView = this.getView();
			this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
			this._oRouter = this._oComponent.getRouter();
			this._oNavigationTable = this.byId("navigationTable1");
			this._oItemTemplate = this.byId("navigationListItem1").clone();

			// Get Context Path for Page 2 Screen
			this._oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
		},

		// Bind Review Table using oData Reviews Entity
		_bindNavigationTable: function(sURL) {
			this._oNavigationTable.bindItems({
				path: sURL,
				template: this._oItemTemplate
			});
		},

		_onRoutePatternMatched: function(oEvent) {
			if (oEvent.getParameter("name") !== "details2") {
				return;
			}
			//  this._sItemPath = "/" + oEvent.getParameters().arguments.vb;
			this.slOrd = oEvent.getParameters().arguments.vb;
			this.appLevel = oEvent.getParameters().arguments.level;
			//console.log(this.slOrd + " " + this.appLevel)
			this._sNavigationPath = "/SO_HeaderSet('" + this.slOrd + "')/SO_Item";

			// Bind Object Header and Form using oData
			/*	this.byId("Details2Page").bindElement({
					path: this._sItemPath
				});*/

			// Bind Review Table using oData Reviews Entity
			this._bindNavigationTable(this._sNavigationPath);
		},

		onNavBack: function() {
			window.history.go(-1);
			/*	var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.oRouter.navTo("details", true);
				}*/
		},

		/*onRowSelect: function(oEvent) {

			var sPath = oEvent.getParameter("listItem").getBindingContext().getPath();
			var selectedRow = this.byId("navigationTable1").getModel().getProperty(sPath);

			if (typeof(selectedRow.posnr) !== 'undefined' || selectedRow.posnr !== null) {
				MessageToast.show("You Selected item " + selectedRow.posnr + " for Approval.", {
					width: "auto"
				});
			}
		},*/

		onApprove: function(oEvent) {

			var sPath = "/SO_HeaderSet";
			var apl = this.appLevel;
			var so = this.slOrd;
			var post = {
				APPLEVEL: apl,
				vbeln: so
			};
			//var approveBtn = this._oView.byId("approve");
			//var rejectBtn = this._oView.byId("reject");
			var oDataModel = this._oView.getModel();
			var router = this._oRouter;

			sap.m.MessageBox.confirm("Do you want to approve Sales Order: " + this.slOrd, {
				title: "Approval Confirmation",
				onClose: function(oAction) {
					if (oAction === "OK") {
						oDataModel.create(sPath, post, {
							success: function(oData, oResponse) {
								//debugger;
								var typ = oResponse.statusText;
								var msg = oData.APPLEVEL;
								if (msg === "FAIL") {
									sap.m.MessageToast.show("Sales Order " + so + " " + apl + " Approval Failed");
								} else if (msg === "APPROVE") {

									/*	if (approveBtn.getVisible()) {
											approveBtn.setVisible(false);
											rejectBtn.setEnabled(false);
										}*/
									sap.m.MessageToast.show("Sales Order " + so + " " + apl + " Approved Successfully", {
										duration: 3000,
										onClose: function(evt) {
											router.navTo("main", {
												from: "details2",
												tab: null
											});
										},
										autoClose: true,
										closeOnBrowserNavigation: true
									});

								}
							},
							error: function(oError) {
								//	debugger;
								sap.m.MessageBox.error("Sales Order Approval has encountered an error");
							}
						});

					} else {
						sap.m.MessageToast.show("Sales Order Approval Canceled");
					}

				},
				styleClass: "",
				initialFocus: null,
				textDirection: sap.ui.core.TextDirection.Inherit
			});

		},
		onReject: function(oEvent) {
			//sap.m.MessageToast.show("Sales Order Approval Rejected");
			var sPath = "/SO_HeaderSet";
			//var apl = this.appLevel;
			var so = this.slOrd;
			var post = {
				APPLEVEL: "REJECT",
				vbeln: so
			};
			//	var approveBtn = this._oView.byId("approve");
			//	var rejectBtn = this._oView.byId("reject");
			var oDataModel2 = this._oView.getModel();
			var router = this._oRouter;

			sap.m.MessageBox.confirm("Do you want to Reject Sales Order: " + this.slOrd, {
				title: "Rejection Confirmation",
				onClose: function(oAction) {
					if (oAction === "OK") {
						oDataModel2.create(sPath, post, {
							success: function(oData, oResponse) {
								//debugger;
								var typ = oResponse.statusText;
								var msg = oData.APPLEVEL;
								if (msg === "FAIL") {
									sap.m.MessageToast.show("Sales Order " + so + " Rejection Failed");
								} else if (msg === "APPROVE") {

									/*if (approveBtn.getVisible()) {
										rejectBtn.setVisible(false);
										approveBtn.setEnabled(false);
									}*/
									sap.m.MessageToast.show("Sales Order " + so + " Rejected", {

										duration: 3000,
										onClose: function(evt) {
											router.navTo("main", {
												from: "details2",
												tab: null
											});
										},
										autoClose: true,
										closeOnBrowserNavigation: true
									});
								}
							},
							error: function(oError) {
								//	debugger;
								sap.m.MessageBox.error("Sales Order Rejection has encountered an error");
							}
						});

					} else {
						sap.m.MessageToast.show("Sales Order Rejection Canceled");
					}

				},
				styleClass: "",
				initialFocus: null,
				textDirection: sap.ui.core.TextDirection.Inherit
			});

		}

	});

});