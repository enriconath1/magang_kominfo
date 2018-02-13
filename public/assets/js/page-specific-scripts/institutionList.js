$(document).ready(function() {
    $('#instTable').on('click', '.inst-table-td', function() {
        var state = $(this).parent().hasClass('highlighted-tr');
        $('.highlighted-tr').removeClass('highlighted-tr');
        if (!state) {
            $(this).parent().addClass('highlighted-tr');
        }
    });

    $.ajax({
        type: "GET",
        url: "getInstitutions",
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#instTable").css('display', 'none');
            $("#instList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
            $("#sensorInstituteTable").css('display', 'none');
            $("#sensorInstituteList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#instList").html('');
            $("#sensorInstituteList").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#instTable').removeAttr('style');
                    $('table#instTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#instTable > tbody:last').append('<tr><td class="inst-table-td" style="cursor: pointer" onclick="getInstitutionDetail(\'' + data.instituteId + '\')">' + data.instituteName + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td><td><a class="btn btn-circle btn-inverse" href="editInstitute/' + data.instituteId + '"><i class="fa fa-pencil"></i></a></td></tr>');
                        //<td style="cursor: pointer" onclick="institutionDelete(\'' + data.institute_id + '\')"><a href="#detail-modal" data-toggle="modal"><i class="fa fa-trash-o"></i></a></td> 
                    });
                    
                    


                }
    });

});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function institutionDelete(id) {
    document.getElementById("b").innerHTML = 'Are you sure?</br></br><table width="400" style="text-align: center;"><td><button type="button" onclick="del(\'' + id + '\')"><i class="fa fa-thumbs-o-up fa-3x"></i></button></td><td><button type="button" data-dismiss="modal"><i class="fa fa-thumbs-o-down fa-3x"></i></button></td></table>';
}

function del(id) {
    $.ajax({
        type: "GET",
        url: "deleteInstitute/" + id,
        cache: false,
        beforeSend: function() {
//                    $("#b").css('display', 'none');
            $("#b").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#b").html('');
        }, //Hide spinner
        success: function() {
            $("#b").append('Success!');
            location.reload();
        }
    });
}
function getInstitutionDetail(institutionId) {
    $('#instituteDetailSpan').removeAttr('style');

    $.ajax({
        type: "GET",
        url: "getInstitutionSensor/" + institutionId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#sensorInstituteTable").css('display', 'none');
            $("#sensorInstituteList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#sensorInstituteList").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#sensorInstituteTable').removeAttr('style');
                    $('table#sensorInstituteTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        if (data.hourdiff >= 2)
                            $('table#sensorInstituteTable > tbody:last').append('<tr><td>' + data.sensor_ip + '</td><td>' + data.sensor_name + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td><td><span class="btn btn-circle btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Last Submit: ' + data.to_char + '" style="margin-left: 18px"></span></td></tr>');
                        else
                            $('table#sensorInstituteTable > tbody:last').append('<tr><td>' + data.sensor_ip + '</td><td>' + data.sensor_name + '</td><td class="right-aligned">' + numberWithCommas(data.count) + '</td><td><span class="btn btn-circle btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Last Submit: ' + data.to_char + '" style="margin-left: 18px"></span></td></tr>');
                    });
                }
    });

    $.ajax({
        type: "GET",
        url: "getInstitutionPort/" + institutionId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#port-institution-table").css('display', 'none');
            $("#port-institution-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#port-institution-div").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#port-institution-table').removeAttr('style');
                    $('table#port-institution-table > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#port-institution-table > tbody:last').append('<tr><td>' + data.local_port + '</td><td class="right-aligned">' + numberWithCommas(data.total) + '</td></tr>');
                    });
                }
    });

    $.ajax({
        type: "GET",
        url: "getInstitutionMalware/" + institutionId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#mal-institution-table").css('display', 'none');
            $("#mal-institution-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#mal-institution-div").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#mal-institution-table').removeAttr('style');
                    $('table#mal-institution-table > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#mal-institution-table > tbody:last').append('<tr><td style="cursor: pointer" onclick="getMalwareDetail(\'' + data.download_md5_hash + '\',\'' + data.virustotal_permalink + '\')"> <a href="#virus-detail-modal" data-toggle="modal">' + data.download_md5_hash + '</td><td class="right-aligned">' + numberWithCommas(data.total) + '</td></tr>');
                    });
                }
    });

    $.ajax({
        type: "GET",
        url: "getInstitutionPIC/" + institutionId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#pic-institution-table").css('display', 'none');
            $("#pic-institution-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#pic-institution-div").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#pic-institution-table').removeAttr('style');
                    $('table#pic-institution-table > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#pic-institution-table > tbody:last').append('<tr><td>' + data.user_name + '</td><td>' + data.user_telp + '</td><td>' + data.user_email + '</td><td>' + data.to_char + '</td></tr>');
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


