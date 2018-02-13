function getIP(ipaddress, offset, limit) {
    //var country_new = country;

    $.ajax({
        type: "GET",
        url: "searchIP/" + ipaddress + "/" + offset + "/" + limit,
        cache: false,
        beforeSend: function() {
            $("#resultSearch").removeAttr('style');
            $("#loading-search").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
            $("#ipFoundTable").css('display', 'none');
            $("#ipFoundTableOuter").css('display', 'none');
            $("#not-found").css('display', 'none');
            $("#ip-searched").html(ipaddress)
        },
        complete: function() {
            $("#loading-search").html('');
            
        }, //Hide spinner
        dataType: 'json',
        success: function(msg) {
//            $("#loading-search").html('');
            if (msg.length != 0) {
                $('#ipFoundTableOuter').removeAttr('style');
                $('#ipFoundTable').removeAttr('style');
                $('table#ipFoundTable > tbody:last').empty();
                $.each(msg, function(i, data) {
                    $('table#ipFoundTable > tbody:last').append('<tr ><td class="ip-table-td" style="cursor: pointer" onclick="getIPDetail(\'' + data.remote_host + '\', 20, 0)"> <a href=# data-toggle="modal" data-target="#ip-detail-modal">' + data.remote_host + '</a></td><td class="right-aligned">' + numberWithCommas(data.count) + '</td></tr>');
                });
                if (msg.length >= limit)
                    $('table#ipFoundTable > tbody:last').append('<tr class="load-more-tr"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalIP(\'' + ipaddress + '\', ' + limit + ', ' + (offset + limit) + ')">Load More</button></td></tr>');

            }
            else {
                $("#not-found").removeAttr('style');
                $("#not-found").html("<center><b><h3>No IP found</h3></b><center>");
            }
        }
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getAdditionalIP(ipaddress, limit, offset) {
    $.ajax({
        type: "GET",
        url: "searchIP/" + ipaddress + "/" + offset + "/" + limit,
        cache: false,
        beforeSend: function() {
            $('.load-more-tr').css('display', 'none');
            $("table#ipFoundTable > tbody:last").append('<center class="load-other"><img style="margin-left: 90px;" src="public/assets/img/ajax-loader-1.gif" /></center>');
        },
        complete: function() {
            $(".load-other").css('display', 'none');
        }, //Hide spinner
        dataType: 'json',
        success: function(msg) {          
            $.each(msg, function(i, data) {
                $('table#ipFoundTable > tbody:last').append('<tr ><td class="ip-table-td" style="cursor: pointer" onclick="getIPDetail(\'' + data.remote_host + '\',20,0)"> <a href=# data-toggle="modal" data-target="#ip-detail-modal">' + data.remote_host + '</a></td><td class="right-aligned">' + numberWithCommas(data.count) + '</td></tr>');
            });
            if(msg.length >= limit)
                $('table#ipFoundTable > tbody:last').append('<tr class="load-more-tr"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalIP(\'' + ipaddress + '\', ' + limit + ', ' + (offset + limit) + ')">Load More</button></td></tr>');
        }
    });
    
    
}

function getIPDetail(ipaddress, detailLimit, detailOffset) {
    $('#ipDetailSpan').removeAttr('style');

    $("#ipDetailTitle").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
    $("#ipDetail").html('');
    $.get('ipDetail/' + ipaddress, function(data) {
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
        beforeSend: function() {
            $("#PortList").css('display', 'none');
            $("#port-load-bar").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#port-load-bar").html('');
        }, //Hide spinner
        dataType: 'json',
        success: function(msg) {
            $("#PortList").removeAttr('style');
            $('table#PortList > tbody:last').empty();
            $.each(msg, function(i, data) {
                $('table#PortList > tbody:last').append('<tr><td>' + data.attackedPort + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td></tr>');
            });
            if (msg.length >= detailLimit)
                $('table#PortList > tbody:last').append('<tr class="load-more-tr-port"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalPort(\'' + ipaddress + '\',\'' + detailLimit + '\',' + (detailOffset + detailLimit) + ')">Load More</button></td></tr>');


        }
    });
    $.ajax({
        type: "GET",
        url: "getMalwareAttack/" + ipaddress + "/" + detailLimit + "/" + detailOffset,
        cache: false,
        beforeSend: function() {
            $("#MalwareList").css('display', 'none');
            $("#malware-load-bar").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#malware-load-bar").html('');
        }, //Hide spinner
        dataType: 'json',
        success: function(msg) {
            $("#MalwareList").removeAttr('style');
            $('table#MalwareList > tbody:last').empty();
            $.each(msg, function(i, data) {
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
        beforeSend: function() {
            $("#vt-table").css('display', 'none');
            $("#vt-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
            $("#result").html('');
        },
        complete: function() {
            $("#vt-div").html('');
            $("#result").html('<b>MD5 Hash: </b>' + md5);
        }, //Hide spinner
        success: function(msg) {
            $("#vt-table").removeAttr('style');
            $('table#vt-table > tbody:last').empty();
            $.each(msg, function(i, data) {
                $('table#vt-table > tbody:last').append('<tr><td>' + data.virustotalscan_scanner + '</td><td>' + data.virustotalscan_result + '</td></tr>');
            });
            $('table#vt-table > tbody:last').append('<tr><td colspan=2><a href="' + url + '" target="_blank">Complete details on virustotal.com</a></td></tr>');
        }
    });
}