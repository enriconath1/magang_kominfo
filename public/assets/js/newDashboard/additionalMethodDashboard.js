$(document).ready(function () {

//27 Mei 2015

//menu responsive
//

    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


    $('#nongol').click(function (e) {
        //$("#sidebar").slideToggle();
        $("#nav-accordion").slideToggle();
    });
	

//collapse sidebar function
    // $("#sidebar").hover(function () {
        // $("#sidebar").css("margin-left", "0px");
        // $("#main-content").css("margin-left", "210px");
        // document.getElementById("main-content").style.WebkitTransition = "all 0.5s";
        // document.getElementById("sidebar").style.WebkitTransition = "all 0.5s";
        // document.getElementById("main-content").style.MozTransition = "all 0.5s";
        // document.getElementById("sidebar").style.MozTransition = "all 0.5s";
    // }, function () {
        // $("#sidebar").css("margin-left", "-150px");
        // $("#main-content").css("margin-left", "60px");
    // });

    $('#addChart').click(function (e) {
        //show menuChart
        $("#menuChart").slideDown(500);
    });

    $("#new-chart").sortable({
        items: '.sortable',
        placeholder: "dashed-placeholder",
        forcePlaceholderSize: true,
        tolerance: "pointer"
    })

    $("#new-chart").sortable("disable");

    $("#editWidget").click(function (e) {
        $("#editWidget").hide();
        $("#saveWidget").show();
        $("#new-chart-button").show();
        $(".closeWidget").show();
        $("#new-chart").sortable("enable")
    })

    $("#saveWidget").click(function (e) {
        $("#editWidget").show();
        $("#saveWidget").hide();
        $("#new-chart-button").hide();
        $(".closeWidget").hide();
        $("#new-chart").sortable("disable");
        var jsonArray = [];
        $('.chart').each(function (index) {
            var obj = {
                position: index,
                divId: $(this).attr('id'),
                type: $(this).attr('type'),
                selectedData: $(this).attr('dataSelected')
            }
            jsonArray.push(obj);
        })
        var jsonString = JSON.stringify(jsonArray);
        console.log(jsonString);
//        alert(jsonString);
        $.ajax({
            type: "POST",
            contentType: 'application/x-www-form-urlencoded',
            url: "saveConfigJson",
            dataType: "json",
            data: {configuration: jsonString},
            success: function () {
                alert("success")
            },
        });
    })
    var configData = [];
    var widgetCount = 1;
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "getConfigJson",
        data: "",
        cache: false,
        success: function (msg) {
            $.each(msg, function (i, data) {
                configData = JSON.parse(data.configuration);
                $.each(configData, function (j, conf) {
                    if (conf.type == 'pie' && conf.selectedData == 'topCountry') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFiveCountry(conf.type, conf.divId)
                    }

                    else if (conf.type == 'donut' && conf.selectedData == 'topCountry') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFiveCountry(conf.type, conf.divId)
                    }
                    
                    else if (conf.type == 'pie' && conf.selectedData == 'topPort') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFivePort(conf.type, conf.divId)
                    }

                    else if (conf.type == 'donut' && conf.selectedData == 'topPort') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFivePort(conf.type, conf.divId)
                    }

                    else if (conf.type == 'pie' && conf.selectedData == 'topMalware') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFiveMalware(conf.type, conf.divId)
                    }

                    else if (conf.type == 'donut' && conf.selectedData == 'topMalware') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFiveMalware(conf.type, conf.divId)
                    }

                    else if (conf.type == 'table' && conf.selectedData == 'topCountry') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFiveCountry(conf.type, conf.divId)
                    }
                    
                    else if (conf.type == 'table' && conf.selectedData == 'topPort') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFivePort(conf.type, conf.divId)
                    }

                    else if (conf.type == 'table' && conf.selectedData == 'topMalware') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        topFiveMalware(conf.type, conf.divId)
                    }

                    else if (conf.type == 'table' && conf.selectedData == 'liveticker') {
                        autoAppendChart(conf.type, conf.selectedData, conf.divId);
                        livetickerTable(conf.divId)
                    }
					
					else if(conf.type == 'map' && conf.selectedData == 'indoMap'){
						autoAppendChart(conf.type, conf.selectedData, conf.divId);
						indonesiaMap(conf.divId)
					}
					
					else if(conf.type == 'map' && conf.selectedData == 'worldMap'){
						autoAppendChart(conf.type, conf.selectedData, conf.divId);
						worldMap(conf.divId)
					}

                    widgetCount++;
                })
            })
        }
    })

//    var jsonArray2 = [{position: 0, divId: 'widget-1', type: 'pie', selectedData: 'topCountry'},
//        {'position': 1, divId: 'widget-3', 'type': 'donut', 'selectedData': 'topCountry'},
//        {'position': 2, divId: 'widget-2', 'type': 'pie', 'selectedData': 'topCountry'}];

//    $.each(jsonArray2, function (i, data) {
//        if (data.type == 'pie' && data.selectedData == 'topCountry') {
//            autoAppendChart(data.type, data.selectedData, data.divId);
//            topFiveCountry(data.type, data.divId)
//
//        }
//
//        else if (data.type == 'donut' && data.selectedData == 'topCountry') {
//            autoAppendChart(data.type, data.selectedData, data.divId);
//            topFiveCountry(data.type, data.divId)
//        }
//    })

    function autoAppendChart(type, selectedData, divId) {
        if (type == 'pie' || type == 'donut') {
            if(selectedData == 'topCountry'){
                $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Negara Terpopuler</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='" + divId + "' class='chart' style='height: 300px;' type='" + type + "' dataSelected='" + selectedData + "'></div></div>" +
                    "</div></div>");
            }
            else if(selectedData == 'topPort'){
                $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Port Terpopuler</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='" + divId + "' class='chart' style='height: 300px;' type='" + type + "' dataSelected='" + selectedData + "'></div></div>" +
                    "</div></div>");
            }
            else if(selectedData == 'topMalware'){
                $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Malware Terpopuler</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='" + divId + "' class='chart' style='height: 300px;' type='" + type + "' dataSelected='" + selectedData + "'></div></div>" +
                    "</div></div>");
            }
            
        }
        else if (type == 'table') {
            if (selectedData == 'topCountry') {
                $("#new-chart").append("<div class='col-md-6 sortable'>" +
                        "<div class='box'>" +
                        "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Negara Terpopuler</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                        "<div class='box-content' style='height: 320px'><div id='widget-loading-" + divId + "'></div><div id='" + divId + "' class='chart' style='height: 300px' type='" + type + "' dataSelected='" + selectedData + "'>" +
                        "<table class='table'><thead><tr><th>Rank</th><th>Country</th><th>Attack Count</th></tr></thead>" +
                        "<tbody id='topCountryTable-" + divId + "'></tbody>" +
                        "</table></div></div>" +
                        "</div></div>");
            }
            else if (selectedData == 'topMalware') {
                $("#new-chart").append("<div class='col-md-6 sortable'>" +
                        "<div class='box'>" +
                        "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Malware Terpopuler</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                        "<div class='box-content' style='height: 320px'><div id='widget-loading-" + divId + "'></div><div id='" + divId + "' class='chart' style='height: 300px' type='" + type + "' dataSelected='" + selectedData + "'>" +
                        "<table class='table'><thead><tr><th>Rank</th><th>Malware</th><th>Attack Count</th></tr></thead>" +
                        "<tbody id='topCountryTable-" + divId + "'></tbody>" +
                        "</table></div></div>" +
                        "</div></div>");
            }
            else if (selectedData == 'topPort') {
                $("#new-chart").append("<div class='col-md-6 sortable'>" +
                        "<div class='box'>" +
                        "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Port Terpopuler</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                        "<div class='box-content' style='height: 320px'><div id='widget-loading-" + divId + "'></div><div id='" + divId + "' class='chart' style='height: 300px' type='" + type + "' dataSelected='" + selectedData + "'>" +
                        "<table class='table'><thead><tr><th>Rank</th><th>Service</th><th>Attack Count</th></tr></thead>" +
                        "<tbody id='topCountryTable-" + divId + "'></tbody>" +
                        "</table></div></div>" +
                        "</div></div>");
            }
            else if (selectedData == 'liveticker') {
                $("#new-chart").append("<div class='col-md-6 sortable'>" +
                        "<div class='box'>" +
                        "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Live Ticker</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                        "<div class='box-content' style='height: 320px'><div id='widget-loading-" + divId + "'><div id='" + divId + "' class='chart' style='height: 300px' type='" + type + "' dataSelected='" + selectedData + "'>" +
                        "<table id='liveTickerTable-" + divId + "' class='table'><thead><tr><th style='text-align: center'>Time</th><th style='text-align: center'>Country</th><th style='text-align: center'>Port</th></tr></thead>" +
                        "<tbody></tbody>" +
                        "</table></div></div></div></div>");
            }

        }
        else if(type == "map"){
            if(selectedData == 'indoMap'){
                $("#new-chart").append("<div class='col-md-12 sortable' style='float:left'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Peta Serangan Indonesia</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='" + divId + "' class='chart' style='height: 300px' type='"+type+"' dataSelected='"+selectedData+"'></div></div></div></div>");
            }
            else if(selectedData == 'worldMap'){
                $("#new-chart").append("<div class='col-md-12 sortable' style='float:left'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Peta Serangan Dunia</h3><div class='box-tool closeWidget' style='display:none'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='" + divId + "' class='chart' style='height: 300px' type='"+type+"' dataSelected='"+selectedData+"'></div></div></div></div>");
            }
        }

    }

    function topFiveCountry(type, divId) {
        if (type == 'pie') { // Pie Chart Top Country
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveCountry",
                data: "",
                beforeSend: function () {
                    $("#" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                },
                error: function (e) {
                    console.log(e);
                },
                cache: false,
                success: function (msg) {
                    var topAttackerPie = []
                    $("#" + divId).html('');
                    $.each(msg, function (i, dataChart) {
                        topAttackerPie[i] = {label: dataChart.countryName, data: dataChart.count}
                    })
                    piegraph("#" + divId, topAttackerPie)
                }
            });
        }
        else if (type == 'donut') { // Donut Chart Top Country
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveCountry",
                data: "",
                beforeSend: function () {
                    $("#" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")

                },
                error: function (e) {
                    console.log(e);
                },
                cache: false,
                success: function (msg) {
                    var topAttacker = []
                    $("#" + divId).html('');
                    $.each(msg, function (i, data) {
                        topAttacker[i] = {label: data.countryName, value: data.count, labelColor: "#FFFFFF"}
                    })
                    donutgraph(divId, topAttacker)
                }
            });
        }
        else if (type == 'table') { // Table Top Country
            var rank = 1;
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveCountry",
                data: "",
                beforeSend: function () {
                    $("#" + divId).hide();
                    $("#widget-loading-" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                },
                error: function (e) {
                    alert(e);
                },
                cache: false,
                success: function (msg) {
                    $("#" + divId).show();
                    $("#widget-loading-" + divId).html("")
                    $.each(msg, function (i, data) {
                        $("#topCountryTable-" + divId).append('<tr><td>' + rank + '</td><td>' + data.countryName + '</td><td>' + data.count + '</td></tr>')
                        rank++;
                    })
                }
            });
        }
    }
    
    function topFivePort(type, divId) {
        if (type == 'pie') { // Pie Chart Top Port
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFivePort",
                data: "",
                beforeSend: function () {
                    $("#" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                },
                error: function (e) {
                    console.log(e);
                },
                cache: false,
                success: function (msg) {
                    var topPortPie = []
                    $("#" + divId).html('');
                    $.each(msg, function (i, dataChart) {
                        topPortPie[i] = {label: dataChart.service + " ("+dataChart.portDestination+")", data: dataChart.countPort}
                    })
                    piegraph("#" + divId, topPortPie)
                }
            });
        }
        else if (type == 'donut') { // Donut Chart Top Port
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFivePort",
                data: "",
                beforeSend: function () {
                    $("#" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")

                },
                error: function (e) {
                    console.log(e);
                },
                cache: false,
                success: function (msg) {
                    var topPort = []
                    $("#" + divId).html('');
                    $.each(msg, function (i, data) {
                        topPort[i] = {label: data.service + " ("+data.portDestination+")", value: data.countPort, labelColor: "#FFFFFF"}
                    })
                    donutgraph(divId, topPort)
                }
            });
        }
        else if (type == 'table') { // Table Top Port
            var rank = 1;
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFivePort",
                data: "",
                beforeSend: function () {
                    $("#" + divId).hide();
                    $("#widget-loading-" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                },
                error: function (e) {
                    alert(e);
                },
                cache: false,
                success: function (msg) {
                    $("#" + divId).show();
                    $("#widget-loading-" + divId).html("")
                    $.each(msg, function (i, data) {
                        $("#topCountryTable-" + divId).append('<tr><td>' + rank + '</td><td>' + data.service + '</td><td>' + data.countPort + '</td></tr>')
                        rank++;
                    })
                }
            });
        }
    }

    function topFiveMalware(type, divId) {
        if (type == 'pie') { // Pie Chart Top Malware
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveMalware",
                data: "",
                beforeSend: function () {
                    $("#" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                },
                error: function (e) {
                    console.log(e);
                },
                cache: false,
                success: function (msg) {
                    var topMalwarePie = []
                    $("#" + divId).html('');
                    $.each(msg, function (i, dataChart) {
                        topMalwarePie[i] = {label: dataChart.virustotalscan_result, data: dataChart.count}
                    })
                    piegraph("#" + divId, topMalwarePie)
                }
            });
        }
        else if (type == 'donut') { // Donut Chart Top Malware
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveMalware",
                data: "",
                beforeSend: function () {
                    $("#" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")

                },
                error: function (e) {
                    console.log(e);
                },
                cache: false,
                success: function (msg) {
                    var topMalware = []
                    $("#" + divId).html('');
                    $.each(msg, function (i, data) {
                        topMalware[i] = {label: data.virustotalscan_result, value: data.count, labelColor: "#FFFFFF"}
                    })
                    donutgraph(divId, topMalware)
                }
            });
        }
        else if (type == 'table') { // Table Top Malware
            var rank = 1;
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveMalware",
                data: "",
                beforeSend: function () {
                    $("#" + divId).hide();
                    $("#widget-loading-" + divId).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                },
                error: function (e) {
                    alert(e);
                },
                cache: false,
                success: function (msg) {
                    $("#" + divId).show();
                    $("#widget-loading-" + divId).html("")
                    $.each(msg, function (i, data) {
                        $("#topCountryTable-" + divId).append('<tr><td>' + rank + '</td><td>' + data.virustotalscan_result + '</td><td>' + data.count + '</td></tr>')
                        rank++;
                    })
                }
            });
        }
    }

    function livetickerTable(divId) {
        var connection;
        connection = new WebSocket('wss://webservice-beta.honeynet.id/websocket/liveTicker');

        connection.onopen = function () {
            $('table#liveTickerTable-' + divId + ' > tbody:last').empty();
        };

        connection.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };

        connection.onmessage = function (msg) {
            var isi = JSON.parse(msg.data);
            console.log(isi);
            var sourceCountry = isi.sourceCountryName;
            var portDest = isi.destinationPort;
            var myDate = new Date(isi.timestamp);
            var hour;
            var minute;
            var second;

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

            if (sourceCountry == "UNKNOWN") {

            }
            else {
                $('table#liveTickerTable-' + divId).prepend('<tr style="text-align: center"><td>' + hour + ":" + minute + ":" + second + '</td><td>' + sourceCountry + '</td><td>' + portDest + '</td></tr>')
                var rowCount = $('table#liveTickerTable-' + divId + ' tr').length;
                if (rowCount > 4) {
                    $('table#liveTickerTable-' + divId + ' tr:last').remove;
                }
            }
        }
    }


//    var donutI = 0;
//    var pieJ = 0;
//    var lineK = 0;
//    var barL = 0;
//    var areaM = 0;
    var indoMap, worldMap;
//    var iMap = 0;
//    var wMap = 0;

    function piegraph(classname, graphData) {
        $.plot($(classname), graphData, {
            series: {
                pie: {
                    show: true,
                }
            },
        });
    }
    function donutgraph(classname, graphData) {

        Morris.Donut({
            element: classname,
            data: graphData,
            colors: ["#ADEBFF", "#00FF00", "#FF6666"]
        });
    }

    $("#dataChart").hide();
    $("#dataTable").hide();
    $("#dataMap").hide();
    $("#dataLabel").hide()



    var valueType;
    $("#tipeChart").change(function () {
        valueType = $("#tipeChart option:selected").val()
        $("#dataLabel").show()
        if (valueType == 'pie' || valueType == 'donut') {
            $("#dataChart").show();
            $("#dataTable").hide();
            $("#dataMap").hide();
        }
        else if (valueType == 'table') {
            $("#dataTable").show();
            $("#dataChart").hide();
            $("#dataMap").hide();
        }
        else if (valueType == 'map') {
            $("#dataMap").show();
            $("#dataChart").hide();
            $("#dataTable").hide();
        }
    })

    $("#confirm-chart").click(function (e) {
        var graphData = [];
        var lineGraphData = [];
        var donutData = []

        var series = Math.floor(Math.random() * 10) + 1;
        for (var i = 0; i < series; i++) {
            donutData[i] = {
                label: "Series" + (i + 1),
                value: Math.floor((Math.random()) * 100) + 1,
                labelColor: "#FFFFFF"
            }
            graphData[i] = {
                label: "Series" + (i + 1),
                data: Math.floor((Math.random() - 1) * 100) + 1
            }
            lineGraphData[i] = [i, Math.floor(Math.random() * 100) + 1]
        }

        var chartValue = $("#dataChart option:selected").val();
        var tableValue = $("#dataTable option:selected").val();
        var mapValue = $("#dataMap option:selected").val();

        if (chartValue == 'top' && valueType == 'pie') { // Top Country Pie
            widgetCount++;
			if ($("#widget-"+widgetCount).length == 0) {
				var topAttackerPie = [];
				$("#new-chart").append("<div class='col-md-6 sortable'>" +
						"<div class='box'>" +
						"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Top Attacker</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
						"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='pie' dataSelected='topCountry'></div></div>" +
						"</div></div>");
				$.ajax({
					type: "GET",
					dataType: 'json',
					url: "topFiveCountry",
					data: "",
					beforeSend: function () {
						$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
						$("#new-chart-button").hide();
					},
					error: function (e) {
						console.log(e);
					},
					cache: false,
					success: function (msg) {
						$("#widget-" + widgetCount).html('');
						$.each(msg, function (i, data) {
							topAttackerPie[i] = {label: data.countryName, data: data.count}
						})
						piegraph("#widget-" + widgetCount, topAttackerPie)
						$("#new-chart-button").show();
					}
				});
			}
			else{
				widgetCount++;
				if ($("#widget-"+widgetCount).length == 0) {
					var topAttackerPie = [];
					$("#new-chart").append("<div class='col-md-6 sortable'>" +
							"<div class='box'>" +
							"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Top Attacker</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
							"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='pie' dataSelected='topCountry'></div></div>" +
							"</div></div>");
					$.ajax({
						type: "GET",
						dataType: 'json',
						url: "topFiveCountry",
						data: "",
						beforeSend: function () {
							$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
							$("#new-chart-button").hide();
						},
						error: function (e) {
							console.log(e);
						},
						cache: false,
						success: function (msg) {
							$("#widget-" + widgetCount).html('');
							$.each(msg, function (i, data) {
								topAttackerPie[i] = {label: data.countryName, data: data.count}
							})
							piegraph("#widget-" + widgetCount, topAttackerPie)
							$("#new-chart-button").show();
						}
					});
				}
				else {
					widgetCount++;
					var topAttackerPie = [];
					$("#new-chart").append("<div class='col-md-6 sortable'>" +
							"<div class='box'>" +
							"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Top Attacker</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
							"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='pie' dataSelected='topCountry'></div></div>" +
							"</div></div>");
					$.ajax({
						type: "GET",
						dataType: 'json',
						url: "topFiveCountry",
						data: "",
						beforeSend: function () {
							$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
							$("#new-chart-button").hide();
						},
						error: function (e) {
							console.log(e);
						},
						cache: false,
						success: function (msg) {
							$("#widget-" + widgetCount).html('');
							$.each(msg, function (i, data) {
								topAttackerPie[i] = {label: data.countryName, data: data.count}
							})
							piegraph("#widget-" + widgetCount, topAttackerPie)
							$("#new-chart-button").show();
						}
					});
				}
				
			}
            
        }

        else if (chartValue == 'top' && valueType == 'donut') { // Top Country Donut
            widgetCount++;
			if ($("#widget-"+widgetCount).length == 0) {
				var topAttacker = [];
				$("#new-chart").append("<div class='col-md-6 sortable'>" +
						"<div class='box'>" +
						"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Top Attacker</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
						"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='donut' dataSelected='topCountry'></div></div>" +
						"</div></div>");
				$.ajax({
					type: "GET",
					dataType: 'json',
					url: "topFiveCountry",
					data: "",
					beforeSend: function () {
						$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
						$("#new-chart-button").hide();
					},
					error: function (e) {
						alert(e);
					},
					cache: false,
					success: function (msg) {
						$("#widget-" + widgetCount).html('');
						$.each(msg, function (i, data) {
							topAttacker[i] = {label: data.countryName, value: data.count, labelColor: "#FFFFFF"}
						})
						donutgraph("widget-" + +widgetCount, topAttacker)
						$("#new-chart-button").show();
					}
				});
			}
			else {
				widgetCount++;
				var topAttacker = [];
				$("#new-chart").append("<div class='col-md-6 sortable'>" +
						"<div class='box'>" +
						"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Top Attacker</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
						"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='donut' dataSelected='topCountry'></div></div>" +
						"</div></div>");
				$.ajax({
					type: "GET",
					dataType: 'json',
					url: "topFiveCountry",
					data: "",
					beforeSend: function () {
						$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
						$("#new-chart-button").hide();
					},
					error: function (e) {
						alert(e);
					},
					cache: false,
					success: function (msg) {
						$("#widget-" + widgetCount).html('');
						$.each(msg, function (i, data) {
							topAttacker[i] = {label: data.countryName, value: data.count, labelColor: "#FFFFFF"}
						})
						donutgraph("widget-" + +widgetCount, topAttacker)
						$("#new-chart-button").show();
					}
				});
			}
            
        }
        
        else if (chartValue == 'port' && valueType == 'pie') { // Top Port Pie
            widgetCount++;
            if ($("#widget-"+widgetCount).length == 0) {
				var topPortPie = [];
				$("#new-chart").append("<div class='col-md-6 sortable'>" +
						"<div class='box'>" +
						"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Port Terpopuler</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
						"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='pie' dataSelected='topPort'></div></div>" +
						"</div></div>");
				$.ajax({
					type: "GET",
					dataType: 'json',
					url: "topFivePort",
					data: "",
					beforeSend: function () {
						$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
						$("#new-chart-button").hide();
					},
					error: function (e) {
						console.log(e);
					},
					cache: false,
					success: function (msg) {
						$("#widget-" + widgetCount).html('');
						$.each(msg, function (i, data) {
							topPortPie[i] = {label: data.service + " ("+data.portDestination+")", data: data.countPort}
						})
						piegraph("#widget-" + widgetCount, topPortPie)
						$("#new-chart-button").show();
					}
				});
			}
			else {
				widgetCount++;
				var topPortPie = [];
				$("#new-chart").append("<div class='col-md-6 sortable'>" +
						"<div class='box'>" +
						"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Port Terpopuler</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
						"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='pie' dataSelected='topPort'></div></div>" +
						"</div></div>");
				$.ajax({
					type: "GET",
					dataType: 'json',
					url: "topFivePort",
					data: "",
					beforeSend: function () {
						$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
						$("#new-chart-button").hide();
					},
					error: function (e) {
						console.log(e);
					},
					cache: false,
					success: function (msg) {
						$("#widget-" + widgetCount).html('');
						$.each(msg, function (i, data) {
							topPortPie[i] = {label: data.service + " ("+data.portDestination+")", data: data.countPort}
						})
						piegraph("#widget-" + widgetCount, topPortPie)
						$("#new-chart-button").show();
					}
				});
			}
			
        }
        
        else if (chartValue == 'port' && valueType == 'donut') { // Top Port Donut
            widgetCount++;
			if ($("#widget-"+widgetCount).length == 0) {
				var topPort = [];
				$("#new-chart").append("<div class='col-md-6 sortable'>" +
						"<div class='box'>" +
						"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Port Terpopuler</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
						"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='donut' dataSelected='topPort'></div></div>" +
						"</div></div>");
				$.ajax({
					type: "GET",
					dataType: 'json',
					url: "topFivePort",
					data: "",
					beforeSend: function () {
						$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
						$("#new-chart-button").hide();
					},
					error: function (e) {
						alert(e);
					},
					cache: false,
					success: function (msg) {
						$("#widget-" + widgetCount).html('');
						$.each(msg, function (i, data) {
							topPort[i] = {label: data.service + " ("+data.portDestination+")", value: data.countPort, labelColor: "#FFFFFF"}
						})
						donutgraph("widget-" + +widgetCount, topPort)
						$("#new-chart-button").show();
					}
				});
			}
			else {
				widgetCount++;
				var topPort = [];
				$("#new-chart").append("<div class='col-md-6 sortable'>" +
						"<div class='box'>" +
						"<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Port Terpopuler</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
						"<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='donut' dataSelected='topPort'></div></div>" +
						"</div></div>");
				$.ajax({
					type: "GET",
					dataType: 'json',
					url: "topFivePort",
					data: "",
					beforeSend: function () {
						$("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
						$("#new-chart-button").hide();
					},
					error: function (e) {
						alert(e);
					},
					cache: false,
					success: function (msg) {
						$("#widget-" + widgetCount).html('');
						$.each(msg, function (i, data) {
							topPort[i] = {label: data.service + " ("+data.portDestination+")", value: data.countPort, labelColor: "#FFFFFF"}
						})
						donutgraph("widget-" + +widgetCount, topPort)
						$("#new-chart-button").show();
					}
				});
			}
            
        }

        else if (chartValue == 'malware' && valueType == 'pie') { // Top Malware Pie
            widgetCount++;
            var topMalwarePie = [];
            $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Captured Malware</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='pie' dataSelected='topMalware'></div></div>" +
                    "</div></div>");
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveMalware",
                data: "",
                beforeSend: function () {
                    $("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                    $("#new-chart-button").hide();
                },
                error: function (e) {
                    console.log(e);
                },
                cache: false,
                success: function (msg) {
                    $("#widget-" + widgetCount).html('');
                    $.each(msg, function (i, data) {
                        topMalwarePie[i] = {label: data.virustotalscan_result, data: data.count}
                    })
                    piegraph("#widget-" + widgetCount, topMalwarePie)
                    $("#new-chart-button").show();
                }
            });
        }

        else if (chartValue == 'malware' && valueType == 'donut') { // Top Malware Donut
            widgetCount++;
            var topMalware = [];
            $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Captured Malware</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px;' type='donut' dataSelected='topMalware'></div></div>" +
                    "</div></div>");
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveMalware",
                data: "",
                beforeSend: function () {
                    $("#widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                    $("#new-chart-button").hide();
                },
                error: function (e) {
                    alert(e);
                },
                cache: false,
                success: function (msg) {
                    $("#widget-" + widgetCount).html('');
                    $.each(msg, function (i, data) {
                        topMalware[i] = {label: data.virustotalscan_result, value: data.count, labelColor: "#FFFFFF"}
                    })
                    donutgraph("widget-" + +widgetCount, topMalware)
                    $("#new-chart-button").show();
                }
            });
        }

        else if (tableValue == 'top' && valueType == 'table') { // Top Country Table
            widgetCount++;
            var rank = 1;
            $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Top Attacker</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content' style='height: 320px'><div id='widget-loading-widget-" + widgetCount + "'></div><div id='widget-" + widgetCount + "' class='chart' style='height: 300px' type='table' dataSelected='topCountry'>" +
                    "<table class='table'><thead><tr><th>Rank</th><th>Country</th><th>Attack Count</th></tr></thead>" +
                    "<tbody id='topCountryTable-widget-" + widgetCount + "'></tbody>" +
                    "</table></div></div>" +
                    "</div></div>");
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveCountry",
                data: "",
                beforeSend: function () {
                    $("#widget-" + widgetCount).hide();
                    $("#widget-loading-widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                    $("#new-chart-button").hide();
                },
                error: function (e) {
                    alert(e);
                },
                cache: false,
                success: function (msg) {
                    $("#widget-" + widgetCount).show();
                    $("#widget-loading-widget-" + widgetCount).html("")
                    $.each(msg, function (i, data) {
                        $("#topCountryTable-widget-" + widgetCount).append('<tr><td>' + rank + '</td><td>' + data.countryName + '</td><td>' + data.count + '</td></tr>')
                        rank++;
                    })

                    $("#new-chart-button").show();
                }
            });
        }
        
        else if (tableValue == 'port' && valueType == 'table') { // Top Port Table
            widgetCount++;
            var rank = 1;
            $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Port Terpopuler</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content' style='height: 320px'><div id='widget-loading-widget-" + widgetCount + "'></div><div id='widget-" + widgetCount + "' class='chart' style='height: 300px' type='table' dataSelected='topCountry'>" +
                    "<table class='table'><thead><tr><th>Rank</th><th>Service</th><th>Attack Count</th></tr></thead>" +
                    "<tbody id='topCountryTable-widget-" + widgetCount + "'></tbody>" +
                    "</table></div></div>" +
                    "</div></div>");
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFivePort",
                data: "",
                beforeSend: function () {
                    $("#widget-" + widgetCount).hide();
                    $("#widget-loading-widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                    $("#new-chart-button").hide();
                },
                error: function (e) {
                    alert(e);
                },
                cache: false,
                success: function (msg) {
                    $("#widget-" + widgetCount).show();
                    $("#widget-loading-widget-" + widgetCount).html("")
                    $.each(msg, function (i, data) {
                        $("#topCountryTable-widget-" + widgetCount).append('<tr><td>' + rank + '</td><td>' + data.service + '</td><td>' + data.countPort + '</td></tr>')
                        rank++;
                    })

                    $("#new-chart-button").show();
                }
            });
        }

        else if (tableValue == 'malware' && valueType == 'table') { // Top Malware Table
            widgetCount++;
            var rank = 1
            $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Captured Malware</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content' style='height: 320px'><div id='widget-loading-widget-" + widgetCount + "'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px' type='table' dataSelected='topMalware'>" +
                    "<table class='table'><thead><tr><th>Rank</th><th>Malware Name</th><th>Count</th></tr></thead>" +
                    "<tbody id='topMalwareTable-widget-" + widgetCount + "'></tbody>" +
                    "</table></div></div></div></div>");
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "topFiveMalware",
                data: "",
                beforeSend: function () {
                    $("#widget-" + widgetCount).hide()
                    $("#widget-loading-widget-" + widgetCount).html("<center><img src='public/assets/img/ajax-loader.gif'></center>")
                    $("#new-chart-button").hide();
                },
                error: function (e) {
                    alert(e);
                },
                cache: false,
                success: function (msg) {
                    $("#widget-" + widgetCount).show()
                    $("#widget-loading-widget-" + widgetCount).html("")
                    $.each(msg, function (i, data) {
                        $("#topMalwareTable").append("<tr><td>" + rank + "</td><td>" + data.virustotalscan_result + "</td><td>" + data.count + "</td></tr>")
                        rank++;
                    })
                    $("#new-chart-button").show();
                }
            });
        }

        else if (tableValue == 'liveticker' && valueType == 'table') {
            widgetCount++;
            var connection;
            $("#new-chart").append("<div class='col-md-6 sortable'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Live Ticker</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content' style='height: 320px'><div id='widget-loading-widget-" + widgetCount + "'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px' type='table' dataSelected='liveticker'>" +
                    "<table id='liveTickerTable-widget-" + widgetCount + "' class='table'><thead><tr><th style='text-align: center'>Time</th><th style='text-align: center'>Country</th><th style='text-align: center'>Port</th></tr></thead>" +
                    "<tbody></tbody>" +
                    "</table></div></div></div></div>");

            connection = new WebSocket('wss://webservice-beta.honeynet.id/websocket/liveTicker');

            connection.onopen = function () {
                $('table#liveTickerTable-widget-' + widgetCount + ' > tbody:last').empty();
            };

            connection.onerror = function (error) {
                console.log('WebSocket Error ' + error);
            };

            connection.onmessage = function (msg) {
                var isi = JSON.parse(msg.data);
                console.log(isi);
                var sourceCountry = isi.sourceCountryName;
                var portDest = isi.destinationPort;
                var myDate = new Date(isi.timestamp);
                var hour;
                var minute;
                var second;

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

                if (sourceCountry == "UNKNOWN") {

                }
                else {
                    $('table#liveTickerTable-widget-' + widgetCount).prepend('<tr style="text-align: center"><td>' + hour + ":" + minute + ":" + second + '</td><td>' + sourceCountry + '</td><td>' + portDest + '</td></tr>')
                    var rowCount = $('table#liveTickerTable-widget-' + widgetCount + ' tr').length;
                    if (rowCount > 4) {
                        $('table#liveTickerTable-widget-' + widgetCount + ' tr:last').remove;
                    }
                }
            }
        }

        else if (mapValue == 'indoMap' && valueType == 'map') {
            widgetCount++;
            $("#new-chart").append("<div class='col-md-12 sortable' style='float:left'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> Indonesia Map</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='widget-loading-widget-" + widgetCount + "'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px' type='map' dataSelected='indoMap'></div></div></div></div></div>");
            indonesiaMap("widget-" + widgetCount);
        }

        else if (mapValue == 'worldMap' && valueType == 'map') {
            widgetCount++;
            $("#new-chart").append("<div class='col-md-12 sortable' style='float:left'>" +
                    "<div class='box'>" +
                    "<div class='box-title'><h3><i class='fa fa-bar-chart-o'></i> World Map</h3><div class='box-tool'> <a data-action='close' class='close' href='#'><i class='fa fa-times'></i></a> </div></div>" +
                    "<div class='box-content'><div id='widget-loading-widget-" + widgetCount + "'><div id='widget-" + widgetCount + "' class='chart' style='height: 300px' type='map' dataSelected='worldMap'></div></div></div></div></div>");
            worldMap("widget-" + widgetCount);
        }

    })
	
	

    function worldMap(divId) {
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: 'loadWorldMap',
            data: "",
            cache: false,
            beforeSend: function () {
                $("#" + divId).html('<center class="loading-ajax"><img src="public/assets/img/ajax-loader.gif"></center>');
            },
            success: function (msg) {
                console.log(msg);
                $("#" + divId).html('');
                $("#" + divId).vectorMap({
                    backgroundColor: 'transparent',
//                zoomButtons: false,
//                zoomOnScroll: false,
                    map: 'world_mill_en',
                    markerStyle: {
                        initial: {
                            fill: '#FF0000',
                            stroke: '#383f47'
                        }
                    },
                    focusOn: {
                        x: 0.5,
                        y: 0.5,
                        scale: 0.5
                    },
                    series: {
                        regions: [{
//                            scale: ['#99B2FF', '#0047B2'],
                                scale: ['#FFFFFF', '#0047B2'],
                                normalizeFunction: 'linear',
                                values: msg,
                                min: 0,
                                max: 1000000,
                                legend: {
                                    vertical: true
                                }
                            }, {
                                legend: {
                                    horizontal: true,
                                    cssClass: 'jvectormap-legend-icons',
                                }
                            }]
                    },
//                onMarkerTipShow: function (e, el, code) {
//                    el.html(el.html() + ' (Attack Hit - ' + msg[code] + ')');
//                },
                    onRegionTipShow: function (e, el, code) {
                        if (typeof msg[code] === 'undefined') {
                            el.html(el.html() + '<br>Jumlah Serangan: 0)');
                        }
                        else {
                            el.html(el.html() + '<br>Jumlah Serangan: ' + numberWithCommas(msg[code]));
                        }

                    },
//                onRegionLabelShow: function (e, el, code) {
//                    el.html(el.html() + ' (Attack Hit - ' + msg[code] + ')');
//                },
                });

            }});
    }

    function indonesiaMap(divId) {
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "loadIndonesiaMap",
            data: "",
            cache: false,
            beforeSend: function () {
                $("#" + divId).html('<center class="loading-ajax"><img src="public/assets/img/ajax-loader.gif" /></center>');
            },
            success: function (msg) {
                console.log(msg);
                $("#" + divId).html('');
                $('#' + divId).vectorMap({
                    backgroundColor: 'transparent',
//                zoomButtons: false,
//                zoomOnScroll: false,
                    map: 'id_mill_en',
                    focusOn: {
                        x: 0.5,
                        y: 0.5,
                        scale: 0.5
                    },
                    series: {
                        regions: [{
//                            scale: ['#99B2FF', '#0047B2'],
                                scale: ['#FFFFFF', '#0047B2'],
                                normalizeFunction: 'linear',
                                values: msg,
                                min: 0,
                                max: 1000000,
                                legend: {
                                    vertical: true
                                }
                            }, {
                                legend: {
                                    horizontal: true,
                                    cssClass: 'jvectormap-legend-icons',
                                    title: 'Business type'
                                }
                            }]
                    },
                    onRegionLabelShow: function (e, el, code) {
                        el.html(el.html() + ' (Attack Hit - ' + msg[code] + ')');
                    },
                    onRegionTipShow: function (e, el, code) {
                        if (typeof msg[code] === 'undefined') {
                            el.html(el.html() + '<br>Jumlah Serangan: 0)');
                        }
                        else {
                            el.html(el.html() + '<br>Jumlah Serangan: ' + numberWithCommas(msg[code]));
                        }

                    },
                });

            }});
    }

    /*
     $("#draggable").draggable({
     connectToSortable: "#new-chart",
     revert: "invalid",
     cursor: "move",
     drag: function (event, ui) {
     alert("hi");
     },
     start: function (event, ui) {
     alert("hello");
     }
     });
     */

    //coba baru, pake clone
    /*$("#new-chart").sortable({
     start: function( event, ui ) {
     clone = $(ui.item[0].outerHTML).clone();
     },
     placeholder: {
     element: function(clone, ui) {
     return $('<div class="new-chart">'+clone[0].innerHTML+'</div>');
     },
     update: function() {
     return;
     }
     }
     
     });*/
	 
	 $(document).on("click", ".close",function () {
            if ($(this).data('action') == undefined) {
                alert("apabae");
                return;
            }
            var action = $(this).data('action');
            var btn = $(this);
            switch (action) {
                case 'close':
                    $(this).parents('.box').fadeOut(500, function () {
                        $(this).parent().remove();
                    })
                    break;
            }
            e.preventDefault();
        });
})