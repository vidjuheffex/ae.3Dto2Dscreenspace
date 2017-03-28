//3D to 2D ScreenSpace 1.0
//Created by Julian Herrera 2017
//http://www.vidjuheffex.github.io
//distribute

(function myScript(thisObj) {
    myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "3D to 2D Screenspace", undefined, { resizeable: true });

    function buildUI() {
        myPanel.txt_fields = myPanel.add("statictext", undefined, "3D to 2D Screen Space");
        myPanel.linkBtn = myPanel.add("button", undefined, "Link");
        myPanel.bakeBtn = myPanel.add("button", undefined, "Bake");

        myPanel.linkBtn.onClick = function () { convert3Dto2D("Link") };
        myPanel.bakeBtn.onClick = function () { convert3Dto2D("Bake") };
        return myPanel;
    }

    function convert3Dto2D(operationAsString) {
        
        var activeItem = app.project.activeItem;
        if ((activeItem == null) || !(activeItem instanceof CompItem)) {
            alert("Please select a composition.");
        } else {
            if (activeItem.selectedLayers.length == 0) {
                alert("Please select a 3d layer in the active comp.");
            }
            else {
                var selectedLayers = activeItem.selectedLayers[0];
                if (selectedLayers.threeDLayer == false) {
                    alert("Please select a 3d layer in the active comp.");
                }
                else {
                    app.beginUndoGroup(operationAsString + " 3D to 2D");
                    var myNull = activeItem.layers.addNull();
                    myName = selectedLayers.name;
                    myNull.name = "2D_" + myName;
                    myString = "L = thisComp.layer('" + myName + "'); L.toComp([0,0,0]);";
                    myNull.property("Position").expression = myString;

                    if (operationAsString == "Bake") {
                        myNull.property("Position").selected = true;
                        app.executeCommand(app.findMenuCommandId("Convert Expression to Keyframes"));
                    }

                    app.endUndoGroup();
                }
            }
        }

    }

    myGUI = buildUI()
    if ((myGUI != null) && (myGUI instanceof Window)) {
        myGUI.center();
        myGUI.show();
    }

}(this))