$(document).ready(function() {
    $('.filter-by-date').hide();
    $('#filter').change(function() {
        if ($(this).val() == 'filter-by-date') {
            $('.filter-by-date').removeAttr('style');
        }
        else {
            $('.filter-by-date').css('display', 'none');
            getPort($("#country").val(), "Date", "Date");
        }
    });

    $('#portTable').on('click', '.ports-table-td', function() {
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
        success: function(msg) {
            $("#country").append('<option value="all">All Countries</option>');
            $.each(msg, function(i, data) {
                if (data.countryCode == "ID") {
                    $('#country').append('<option value="' + data.countryCode + '" selected>' + data.countryName + '</option>');
                } else {
                    $('#country').append('<option value="' + data.countryCode + '">' + data.countryName + '</option>');
                }
            });
        }
    });
    getPort("ID", "Date", "Date");

});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getPort(country, from, to) {
    $.ajax({
        type: "GET",
        url: "getPort/" + country + "/" + from + "/" + to,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#portTable").css('display', 'none');
            $("#portList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#portList").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#portTable').removeAttr('style');
                    $('table#portTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#portTable > tbody:last').append('<tr ><td class="ports-table-td" style="cursor: pointer" onclick="getPortDetail(\'' + data.portDestination + '\',0,20)"> <a href=# data-toggle="modal" data-target="#port-detail-modal">' + data.service + '</td><td class="right-aligned">' + numberWithCommas(data.countPort) + '</td></tr>');
                    });
                    
                }
    });
}

function getPortDetail(portNumber, offset, limit) {
    $('#portDetailSpan').removeAttr('style');

    $.ajax({
        type: "GET",
        url: "getIPAttack/" + portNumber + "/" + offset + "/" + limit,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#AttackerList").css('display', 'none');
            $("#attacker-table-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#attacker-table-div").html('');
        }, //Hide spinner
        success: function(msg) {
            $("#AttackerList").removeAttr('style');
            $('table#AttackerList > tbody:last').empty();
            $.each(msg, function(i, data) {
                $('table#AttackerList > tbody:last').append('<tr><td>' + data.ipsource + '</td><td>' + data.countryName + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</tr>');
            });
            if (msg.length >= limit)
                $('table#AttackerList > tbody:last').append('<tr class="load-more-tr"><td colspan="3"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalIP(\'' + portNumber + '\',\'' + (offset + limit) + '\',' + limit + ')">Load More</button></td></tr>');
        }
    });
}

function getAdditionalIP(portNumber, detailOffset, detailLimit) {
    $.ajax({
        type: "GET",
        url: "getIPAttack/" + portNumber + "/" + detailOffset + "/" + detailLimit,
        cache: false,
        beforeSend: function () {
            $('.load-more-tr').css('display', 'none');
            $("table#AttackerList > tbody:last").append('<center class="load-other"><img style="margin-left: 90px;" src="public/assets/img/ajax-loader-1.gif" /></center>');
        },
        complete: function () {
            $(".load-other").html('');
        }, //Hide spinner
        dataType: 'json',
        success: function (msg) {
            $.each(msg, function(i, data) {
                $('table#AttackerList > tbody:last').append('<tr><td>' + data.ipsource + '</td><td>' + data.countryName + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</tr>');
            });
            if (msg.length >= detailLimit)
                $('table#AttackerList > tbody:last').append('<tr class="load-more-tr"><td colspan="3"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalIP(\'' + portNumber + '\',\'' + (+detailOffset + +detailLimit) + '\',' + detailLimit + ')">Load More</button></td></tr>');
        }
    });
}


