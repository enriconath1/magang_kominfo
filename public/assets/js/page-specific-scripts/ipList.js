$(document).ready(function () {
    $('.filter-by-date').hide();
    $('#filter').change(function () {
        if ($(this).val() == 'filter-by-date') {
            $('.filter-by-date').removeAttr('style');
        }
        else {
            $('.filter-by-date').css('display', 'none');
            getIP($("#country").val(), "Date", "Date", 20, 0);
        }
    });


    $('#ipTable').on('click', '.ip-table-td', function () {
        var state = $(this).parent().hasClass('highlighted-tr');
        $('.highlighted-tr').removeClass('highlighted-tr');
        if (!state) {
            $(this).parent().addClass('highlighted-tr');
        }
    });

    $.ajax({
        type: "GET",
        url: "getCountry",
        cache: false,
        dataType: 'json',
        success: function (msg) {
            $("#country").append('<option value="all">All Countries</option>');
            $.each(msg, function (i, data) {
                if (data.countryCode == "ID") {
                    $('#country').append('<option value="' + data.countryCode + '" selected>' + data.countryName + '</option>');
                } else {
                    $('#country').append('<option value="' + data.countryCode + '">' + data.countryName + '</option>');
                }
            });
        }
    });
    getIP("ID", "Date", "Date", 20, 0);

});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function getIP(country, from, to, limit, offset) {
    //var country_new = country;
    var limitIP = limit;
    var offsetIP = offset;
    $.ajax({
        type: "GET",
        url: "getIP/" + country + "/" + from + "/" + to + "/" + limit + "/" + offset,
        cache: false,
        beforeSend: function () {
            $("#ipTable").css('display', 'none');
            $("#ipTableOuter").css('display', 'none');
            $("#ipList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        //Hide spinner
        dataType: 'json',
        success: function (msg) {

			if(msg === undefined || msg.length == 0){
				$("#ipList").html('<h2><center>Tidak Ada IP Yang Ditemukan!</center></h2>');
			}
			else {
				$("#ipList").html('');
				$('#ipTable').removeAttr('style');
				$('#ipTableOuter').removeAttr('style');
				$('table#ipTable > tbody:last').empty();
				$.each(msg, function (i, data) {
					$('table#ipTable > tbody:last').append('<tr ><td class="ip-table-td" style="cursor: pointer" onclick="getIPDetail(\'' + data.attackerIP + '\', 20, 0)"> <a href=# data-toggle="modal" data-target="#ip-detail-modal">' + data.attackerIP + '</a></td><td class="right-aligned">' + numberWithCommas(data.count) + '</td></tr>');
				});
				if (msg.length >= limit)
					$('table#ipTable > tbody:last').append('<tr class="load-more-tr"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalIP(\'' + country + '\',\'' + from + '\', \'' + to + '\', ' + limitIP + ', ' + (offsetIP + limitIP) + ')">Load More</button></td></tr>');

				$('#generate').empty();
				$('#generate').append('<a href="sendIPPdf/' + country + '/' + from + '/' + to + '"class="btn btn-primary button-next" style="margin-right:10px">Save as PDF</a>');
				$('#generate').append('<a href="sendIPCsv/' + country + '/' + from + '/' + to + '"class="btn btn-primary button-next">Save as CSV</a>');
			}
		}
    });
}

function getAdditionalIP(country, from, to, limit, offset) {

    $.ajax({
        type: "GET",
        url: "getIP/" + country + "/" + from + "/" + to + "/" + limit + "/" + offset,
        cache: false,
        beforeSend: function () {
            $('.load-more-tr').css('display', 'none');
            $("table#ipTable > tbody:last").append('<center class="load-other"><img style="margin-left: 90px;" src="public/assets/img/ajax-loader-1.gif" /></center>');
        },
        complete: function () {
            $(".load-other").css('display', 'none');
        }, //Hide spinner
        dataType: 'json',
        success: function (msg) {

            $.each(msg, function (i, data) {
                $('table#ipTable > tbody:last').append('<tr ><td class="ip-table-td" style="cursor: pointer" onclick="getIPDetail(\'' + data.attackerIP + '\',20,0)"> <a href=#ip-detail-modal data-toggle="modal">' + data.attackerIP + '</a></td><td class="right-aligned">' + numberWithCommas(data.count) + '</td></tr>');
            });
            if (msg.length >= limit)
                $('table#ipTable > tbody:last').append('<tr class="load-more-tr"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalIP(\'' + country + '\',\'' + from + '\', \'' + to + '\', ' + limit + ', ' + (offset + limit) + ')">Load More</button></td></tr>');
        }
    });


}

function getIPDetail(ipaddress, detailLimit, detailOffset) {
//    $('#ipDetailSpan').removeAttr('style');
//
    $("#ipDetailTitle").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
    $("#ipDetail").html('');
    $.get('ipDetail/' + ipaddress, function (data) {
        $("#ipDetailTitle").html('');
        var json = JSON.parse(data);
        $.each(json.rawdata, function(i, parsed){
            $('#ipDetail').append(parsed + "<br>");
        })

    });

    $.ajax({
        type: "GET",
        url: "getPortAttack/" + ipaddress + "/" + detailLimit + "/" + detailOffset,
        cache: false,
        beforeSend: function () {
            $("#PortList").css('display', 'none');
            $("#port-load-bar").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function () {
            $("#port-load-bar").html('');
        }, //Hide spinner
        dataType: 'json',
        success: function (msg) {
            $("#PortList").removeAttr('style');
            $('table#PortList > tbody:last').empty();
            $.each(msg, function (i, data) {
                $('table#PortList > tbody:last').append('<tr><td>' + data.attackedPort + '</td><td>' + numberWithCommas(data.count) + '</td></tr>');
            });
            if (msg.length >= detailLimit)
                $('table#PortList > tbody:last').append('<tr class="load-more-tr-port"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalPort(\'' + ipaddress + '\',\'' + detailLimit + '\',' + (detailOffset + detailLimit) + ')">Load More</button></td></tr>');


        }
    });
    $.ajax({
        type: "GET",
        url: "getMalwareAttack/" + ipaddress + "/" + detailOffset + "/" + detailLimit,
        cache: false,
        beforeSend: function () {
            $("#MalwareList").css('display', 'none');
            $("#malware-load-bar").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function () {
            $("#malware-load-bar").html('');
        }, //Hide spinner
        dataType: 'json',
        success: function (msg) {
            $("#MalwareList").removeAttr('style');
            $('table#MalwareList > tbody:last').empty();
            $.each(msg, function (i, data) {
				console.log(data.malwareMd5);
                $('table#MalwareList > tbody:last').append('<tr><td style="cursor: pointer" onclick="getMalwareDetail(\'' + data.malwareMd5 + '\',\'' + data.virustotal_permalink + '\')"> <a href="#detail-modal" data-toggle="modal">' + data.malwareMd5 + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td></tr>');
            });

            if (msg.length >= detailLimit)
                $('table#MalwareList > tbody:last').append('<tr class="load-more-tr-malware"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalMalware(\'' + ipaddress + '\',\'' + detailLimit + '\', ' + (detailOffset + detailLimit) + ')">Load More</button></td></tr>');

        }
    });
}

function getAdditionalPort(ipaddress, detailLimit, detailOffset) {
    $.ajax({
        type: "GET",
        url: "getPortAttack/" + ipaddress + "/" + detailLimit + "/" + detailOffset,
        cache: false,
        beforeSend: function () {
            $('.load-more-tr-port').css('display', 'none');
            $("table#PortList > tbody:last").append('<center class="load-other-port"><img style="margin-left: 90px;" src="public/assets/img/ajax-loader-1.gif" /></center>');
        },
        complete: function () {
            $(".load-other-port").html('');
        }, //Hide spinner
        dataType: 'json',
        success: function (msg) {

            $.each(msg, function (i, data) {
                $('table#PortList > tbody:last').append('<tr><td>' + data.attackedPort + '</td><td>' + numberWithCommas(data.count) + '</td></tr>');
            });

            if (msg.length >= detailLimit)
                $('table#PortList > tbody:last').append('<tr class="load-more-tr-port"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalPort(\'' + ipaddress + '\',\'' + detailLimit + '\', ' + (detailOffset + detailLimit) + ')">Load More</button></td></tr>');

        }
    });
}

function getAdditionalMalware(ipaddress, detailLimit, detailOffset) {
    $.ajax({
        type: "GET",
        url: "getMalwareAttack/" + ipaddress + "/" + detailLimit + "/" + detailOffset,
        cache: false,
        beforeSend: function () {
            $('.load-more-tr-malware').css('display', 'none');
            $("table#MalwareList > tbody:last").append('<center class="load-other-malware"><img style="margin-left: 90px;" src="public/assets/img/ajax-loader-1.gif" /></center>');
        },
        complete: function () {
            $(".load-other-malware").html('');
        }, //Hide spinner
        dataType: 'json',
        success: function (msg) {

            $.each(msg, function (i, data) {
                $('table#MalwareList > tbody:last').append('<tr><td style="cursor: pointer" onclick="getMalwareDetail(\'' + data.download_md5_hash + '\',\'' + data.virustotal_permalink + '\')"> <a href="#detail-modal" data-toggle="modal">' + data.download_md5_hash + '</td><td class="right-aligned">' + numberWithCommas(data.malCount) + '</td></tr>');
            });

            if (msg.length >= detailLimit)
                $('table#MalwareList > tbody:last').append('<tr class="load-more-tr-malware"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalMalware(\'' + ipaddress + '\',\'' + detailLimit + '\', ' + (detailOffset + detailLimit) + ')">Load More</button></td></tr>');

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
