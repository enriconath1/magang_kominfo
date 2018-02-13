$(document).ready(function () {
    $('#sensorTable').on('click', '.selected', function () {
        var state = $(this).parent().hasClass('highlighted-tr');
        $('.highlighted-tr').removeClass('highlighted-tr');
        if (!state) {
            $(this).parent().addClass('highlighted-tr');
        }
    });

    $.ajax({
        type: "GET",
        url: "getSensors",
        cache: false,
        dataType: 'json',
        beforeSend: function () {
            $("#sensorTable").css('display', 'none');
            $("#sensorList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function () {
            $("#sensorList").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function (msg) {
                    $('#sensorTable').removeAttr('style');
                    $('table#sensorTable > tbody:last').empty();
                    var now = new Date();
                    $.each(msg, function (i, data) {
                        var lastSubmit = new Date(data.lastSubmited);
                        var lastSubmitDate = checkTime(lastSubmit.getDate()) + "-" + checkTime(lastSubmit.getMonth()+1) + "-" + lastSubmit.getFullYear() + " " + checkTime(lastSubmit.getHours()) + ":" + checkTime(lastSubmit.getMinutes()) + ":" + checkTime(lastSubmit.getSeconds());
                        if ((now - lastSubmit) >= 7200000)
                            $('table#sensorTable > tbody:last').append('<tr ><td class="selected sensor-table-td" style="cursor: pointer" onclick="getSensorDetail(\'' + data.sensorID + '\', \'' + data.sensorIP + '\')"> <a href=# data-toggle="modal" data-target="#sensor-detail-modal">' + data.sensorIP + '</a></td><td>' + data.sensorName + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td><td><span class="btn btn-circle btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Last Submit: ' + lastSubmitDate + '" style="margin-left: 18px"></span></td><td><a class="btn btn-circle btn-inverse" href="editSensor/' + data.sensorID + '"><i class="fa fa-pencil"></i></a></td></tr>');
                        //<td style="cursor: pointer" onclick="sensorDelete(\'' + data.sensor_id + '\')"><a href="#detail-modal" data-toggle="modal"><i class="fa fa-trash-o"></i></a></td></tr>');
                        else
                            $('table#sensorTable > tbody:last').append('<tr ><td class="selected sensor-table-td" style="cursor: pointer" onclick="getSensorDetail(\'' + data.sensorID + '\', \'' + data.sensorIP + '\')"> <a href=# data-toggle="modal" data-target="#sensor-detail-modal">' + data.sensorIP + '</td><td>' + data.sensorName + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td><td><span class="btn btn-circle btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Last Submit: ' + lastSubmitDate + '" style="margin-left: 18px"></span></td><td><a class="btn btn-circle btn-inverse" href="editSensor/' + data.sensorID + '"><i class="fa fa-pencil"></i></a></td></tr>');
                        //<td style="cursor: pointer" onclick="sensorDelete(\'' + data.sensor_id + '\')"><a href="#detail-modal" data-toggle="modal"><i class="fa fa-trash-o"></i></a></td></tr>);
                    });
                }
    });

});

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    ;  // add zero in front of numbers < 10
    return i;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sensorDelete(id) {
    document.getElementById("b").innerHTML = 'Are you sure?</br></br><table width="400" style="text-align: center;"><td><button type="button" onclick="del(\'' + id + '\')"><i class="fa fa-thumbs-o-up fa-3x"></i></button></td><td><button type="button" data-dismiss="modal"><i class="fa fa-thumbs-o-down fa-3x"></i></button></td></table>';
}

function del(id) {
    $.ajax({
        type: "GET",
        url: "deleteSensor/" + id,
        cache: false,
        beforeSend: function () {
            $("#b").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function () {
            $("#b").html('');
        }, //Hide spinner
        success: function () {
            $("#b").append('Success!');
            location.reload();
        }
    });
}

function getSensorDetail(sensorID) {
    $('#sensorDetailSpan').removeAttr('style');

    $.ajax({
        type: "GET",
        url: "getIPSensor/" + sensorID,
        cache: false,
        dataType: 'json',
        beforeSend: function () {
            $("#ip-sensor-table").css('display', 'none');
            $("#ip-sensor-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function () {
            $("#ip-sensor-div").html('');
        }, //Hide spinner
        success: function (msg) {
            $("#ip-sensor-table").removeAttr('style');
            $('table#ip-sensor-table > tbody:last').empty();
            $.each(msg, function (i, data) {
                $('table#ip-sensor-table > tbody:last').append('<tr><td>' + data.countryIP + '</td><td><img src="public/assets/img/country/' + data.countryCode.toLowerCase() + '.png"> ' + data.countryName + '</td></tr>');
            });
        }
    });

    $.ajax({
        type: "GET",
        url: "getPortSensor/" + sensorID,
        cache: false,
        dataType: 'json',
        beforeSend: function () {
            $("#port-sensor-table").css('display', 'none');
            $("#port-sensor-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function () {
            $("#port-sensor-div").html('');
        }, //Hide spinner
        success: function (msg) {
            $("#port-sensor-table").removeAttr('style');
            $('table#port-sensor-table > tbody:last').empty();
            $.each(msg, function (i, data) {
                $('table#port-sensor-table > tbody:last').append('<tr><td>' + data.portNumber + '</td><td>' + data.portName + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td></tr>');
            });
        }
    });

    $.ajax({
        type: "GET",
        url: "getMalwareSensor/" + sensorID,
        cache: false,
        dataType: 'json',
        beforeSend: function () {
            $("#mal-sensor-table").css('display', 'none');
            $("#mal-sensor-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function () {
            $("#mal-sensor-div").html('');
        }, //Hide spinner
        success: function (msg) {
            $("#mal-sensor-table").removeAttr('style');
            $('table#mal-sensor-table > tbody:last').empty();
            $.each(msg, function (i, data) {
                $('table#mal-sensor-table > tbody:last').append('<tr><td style="cursor: pointer" onclick="getMalwareDetail(\'' + data.malwareMd5 + '\',\'' + data.malwareUrl + '\')"> <a href="#virus-detail-modal" data-toggle="modal">' + data.malwareMd5 + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td></tr>');
            });
        }
    });

    $.ajax({
        type: "GET",
        url: "getPICSensor/" + sensorID,
        cache: false,
        dataType: 'json',
        beforeSend: function () {
            $("#pic-sensor-table").css('display', 'none');
            $("#pic-sensor-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function () {
            $("#pic-sensor-div").html('');
        }, //Hide spinner
        success: function (msg) {
            $("#pic-sensor-table").removeAttr('style');
            $('table#pic-sensor-table > tbody:last').empty();
            $.each(msg, function (i, data) {
                $('table#pic-sensor-table > tbody:last').append('<tr><td>' + data.userName + '</td><td>' + data.userEmail + '</td><td>' + data.instituteName + '</td></tr>');
            });
        }
    });
}

function getMalwareDetail(md5, url) {

    $.ajax({
        type: "GET",
        url: "getMalwareData/" + md5,
        cache: false,
        dataType: 'json',
        beforeSend: function () {
            $("#vt-table").css('display', 'none');
            $("#vt-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
            $("#result").html('');
        },
        complete: function () {
            $("#vt-div").html('');
            $("#result").html('<b>MD5 Hash: </b>' + md5);
        }, //Hide spinner
        success: function (msg) {
            $("#vt-table").removeAttr('style');
            $('table#vt-table > tbody:last').empty();
            $.each(msg, function (i, data) {
                $('table#vt-table > tbody:last').append('<tr><td>' + data.virustotalscan_scanner + '</td><td>' + data.virustotalscan_result + '</td></tr>');
            });
            $('table#vt-table > tbody:last').append('<tr><td colspan=2><a href="' + url + '" target="_blank">Complete details on virustotal.com</a></td></tr>');
        }
    });

//        $.ajax({
//            type: "GET",
//            url: "getMalwareData/"+md5,
//            cache: false,
//            dataType: 'json',
//            beforeSend: function() {
//                $("#vt-table").css('display', 'none');
//                $("#vt-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
//            },
//            complete: function() {
//                $("#vt-div").html('');
//            }, //Hide spinner
//            dataType: 'json',
//            success: function(msg) {
////                $('#mlDetailTable').removeAttr('style');
//                $('table#vt-table > tbody:last').empty();
//                $.each(msg, function(i, data) {
//                  $('table#vt-table > tbody:last').append('<tr ><td style="cursor: pointer">' + data.virustotalscan_scanner + '</td><td>' + data.virustotalscan_result + '</td></tr>');
//                  $('table#mlTable > tbody:last').append('<tr ><td style="cursor: pointer" onclick="getMalwareDetail('+url+')"> <a href="#detail-modal" data-toggle="modal">' + data.download_md5_hash + '</td><td>' + data.malware_count + '</a></td></tr>');
//                });
//            }
//        });


//        document.getElementById("virustotal").innerHTML = "<a href='"+url+"'>Complete URL</a>";
}
