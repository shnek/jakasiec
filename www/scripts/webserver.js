
function buttonHandler() {
    var number = document.getElementById('textbox').value
    var alertDismisser
    if (checkIfIsNumber(number)) {
        httpGet("http://download.t-mobile.pl/updir/updir.cgi?msisdn=" + number)
    } else {
        navigator.notification.alert("Wprowadz poprawny numer!", alertDismisser, "Zly numer!", "Jasne")
    }
}

function checkIfIsNumber(number) {
    if(isNaN(number)){
        return false
    }
    if (number.length == 11 && number.startsWith("48")) {
        return checkIfIsNumber(number.slice(2, 10))
    } else if(number.length != 9){
        return false
    } else {
        return true
    }
    
}


function httpGet(theUrl) {
    var alertDismisser
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.onload = function (e) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                navigator.notification.alert(processResult(xmlHttp.responseText), alertDismisser, "Znaleziono!", "Dzieki!");
            } else {
                navigator.notification.alert("Serwer jest nieosiagalny!", alertDismisser, "Blad!", "Sprobuje pozniej");
                
            }
     
        }
    }
    xmlHttp.send(null);
}

function processResult(htmlData) {
    if (htmlData.match('<td><b>Operator:</b></td><td>P4</td>'))
        return 'Play';
    if (htmlData.match('<td><b>Operator:</b></td><td>Orange</td>'))
        return 'Orange';
    if (htmlData.match('<td><b>Operator:</b></td><td>Heyah</td>'))
        return 'Heyah';
    if (htmlData.match('<td><b>Operator:</b></td><td>PTC / T-Mobile</td>'))
        return 'Tmobile';
    if (htmlData.match('<td><b>Operator:</b></td><td>Plus</td>'))
        return 'Plus';
    return;
}

document.getElementById('button').addEventListener("click", buttonHandler);