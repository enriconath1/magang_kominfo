var connection;
var username;
var markerIndex = 0;
var arrayMarkers = [];

function connect() {
    connection = new WebSocket('wss://webservice-beta.honeynet.id/websocket/liveTicker');

    connection.onopen = function () {
        $('table#live > tbody:last').empty();
    };

    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };

    connection.onmessage = function (msg) {
        var isi = JSON.parse(msg.data);
        var sourceCountry = isi.sourceCountryCode;
        var portDest = isi.destinationPort;
        var myDate = new Date(isi.timestamp);
        var hour;
        var minute;
        var second;
        var mapWD = $('#world-map-container').vectorMap('get', 'mapObject');

        if (myDate.getHours() < 10) {
            hour = "0" + myDate.getHours();
        }
        else {
            hour = myDate.getHours();
        }

        if (myDate.getMinutes() < 10) {
            minute = "0" + myDate.getMinutes();
        }
        else {
            minute = myDate.getMinutes();
        }

        if (myDate.getSeconds() < 10) {
            second = "0" + myDate.getSeconds();
        }
        else {
            second = myDate.getSeconds();
        }
        
        if(sourceCountry == "None"){
            
        }
        else {
            $('table#live').prepend('<tr style="text-align: center"><td>' + hour + ":" + minute + ":" + second + '</td><td>' + sourceCountry + '</td><td>' + portDest + '</td></tr>')
            var rowCount = $('table#live tr').length;
            if (rowCount > 4) {
                $('table#live tr:last').remove;
            }
        }
//        if (sourceCountry != "NONE" || sourceCountry !=  "None") {
//            console.log(sourceCountry);
//            $('table#live').prepend('<tr style="text-align: center"><td>' + hour + ":" + minute + ":" + second + '</td><td>' + sourceCountry + '</td><td>' + portDest + '</td></tr>')
//            var rowCount = $('table#live tr').length;
//            if (rowCount > 4) {
//                $('table#live tr:last').remove;
//            }
//        }


        //document.getElementById('msgBox').innerHTML += myDate.getHours()+":"+ myDate.getMinutes()+ ":" + myDate.getSeconds() +" Attack to port "+ portDest + " from " + sourceCountry +'<br>';
    };
}

function disconnect() {
    connection.close()
}

connect();

