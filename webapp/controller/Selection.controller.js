sap.ui.define([
	"dashdashboard/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
	"use strict";
	var sales;
	var cust;
	return BaseController.extend("dashdashboard.controller.Selection", {

		onInit: function() {

            // this.oModel = new sap.ui.model.json.JSONModel();
			//alert("hi")
		},

		onPress1: function(oEvent) {

			if (typeof(sales) != 'undefined' || sales != null) {
				var array = [];

				var obj = {

					"sales": sales,
					"cust": cust,
					"appl": "LEVEL1"
				};
				array.push(obj);
			//	alert(array[0].appl)
				if (obj !== null) {
				//	alert("not null")

                 
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("header", {
						val: array
					});

				}
			} else {
				//alert("Please select Sales Person..")
				  MessageToast.show("Please select Sales Person.",{width: "auto"}); 
					// alert(evt.getSource().getId()+
					// " Pressed");
			}
		},
		onPress2: function(oEvent) {
	if (typeof(sales) != 'undefined' || sales != null) {
				var array = [];

				var obj = {

					"sales": sales,
					"cust": cust,
					"appl": "LEVEL2"
				};
				array.push(obj);
				// console.log(array)
				if (obj !== null) {
				//	alert("not null")

                 
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("header", {
						val: array
					});

				}
			} else {
				//alert("Please select Sales Person..")
				  MessageToast.show("Please select Sales Person.",{width: "auto"}); 
					// alert(evt.getSource().getId()+
					// " Pressed");
			}
		},
		onPress3: function(oEvent) {

			if (typeof(sales) != 'undefined' || sales != null) {
				var array = [];

				var obj = {

					"sales": sales,
					"cust": cust,
					"appl": "LEVEL3"
				};
				array.push(obj);
				 //console.log(array)
				if (obj !== null) {
					//alert("not null")

                // console.log(array)
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("header", {
						val: array
					});

				}
			} else {
				//alert("Please select Sales Person..")
				  MessageToast.show("Please select Sales Person.",{width: "auto"}); 
					// alert(evt.getSource().getId()+
					// " Pressed");
			}
		},

		sChange: function(oEvent) {
			sales = this.byId("salesPerson").getValue().split(",").pop();
				//alert(sales)
		},
		cChange: function(oEvent) {
			cust = this.byId("customer").getValue().split(",").pop();
				//alert(cust)
		}

	});
});