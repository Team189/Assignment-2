// Code for the main app page (Past Runs list).

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

function viewRun(runIndex)
{
    // Save the desired run to local storage so it can be accessed from View Run page.
    localStorage.setItem(APP_PREFIX + "-selectedRun", runIndex);
    // ... and load the View Run page.
    location.href = 'viewRun.html';
}

var nameasd = ["hue", "gg", "dafuq", "fuck"]


for(var i = 0; i < nameasd.length; i++)
    {
        var listLI = document.createElement("li");
        listLI.setAttribute("class","mdl-list__item mdl-list__item--two-line");
        listLI.setAttribute("onclick","viewRun(i)");
        console.log(nameasd[i])
        
        var spann1 = document.createElement("span");
        spann1.setAttribute("class","mdl-list__item-primary-content");
        spann1.textContent = nameasd[i];
        //link spann1 to li
        listLI.appendChild(spann1)
        
        var spann2 = document.createElement("span");
        spann2.setAttribute("class","mdl-list__item-sub-title");
        spann2.textContent = "hue hu h";
        //link spann1 to li
        listLI.appendChild(spann2)
        
        
        //link listLI to runList
        document.getElementById("runsList").appendChild(listLI)
    }


