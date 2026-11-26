for (var i=1;i<=app.project.numItems;i++){var it=app.project.item(i);if(it instanceof CompItem && it.name.indexOf("FOLLOWING_")==0){it.openInViewer();it.time=5.5;}}
