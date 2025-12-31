sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("studentDetailsAllui.studentDetailsAllui.controller.MyTaskUI", {
            onInit: function () {

            },

            onSubmitStudent: function () {
                var sId = this.getView().byId("idInput").getValue();
                var sName = this.getView().byId("nameInput").getValue();
                var sBranch = this.getView().byId("branchInput").getValue();
                var sFee = this.getView().byId("feeInput").getValue();

                if (!sId || !sName || !sBranch || !sFee) {
                    MessageToast.show("Please fill in all fields.");
                    return;
                }

                var oPayload = {
                    definitionId: "us10.baf0d99btrial.studentform2.studentDetails",
                    context: {
                        studentId: sId,
                        studentName: sName,
                        branch: sBranch,
                        fee: sFee
                    }
                };

                fetch("/destinations/BPA_API/workflow/rest/v1/workflow-instances", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(oPayload)
                })
                    .then(function (response) {
                        if (!response.ok) {
                            throw new Error("Failed to start BPA process");
                        }
                        return response.json();
                    })
                    .then(function (data) {
                        MessageToast.show("BPA Process started successfully!");
                        console.log(data);
                    })
                    .catch(function (error) {
                        MessageBox.error(error.message);
                    });
            }
        });
    });
