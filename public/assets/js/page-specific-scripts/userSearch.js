function getUser(username, limit, offset) {
    //var country_new = country;

    $.ajax({
        type: "GET",
        url: "searchUser/" + username + "/" + limit + "/" + offset,
        cache: false,
        beforeSend: function() {
            $("#resultSearch").removeAttr('style');
            $("#loading-search").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
            $("#userFoundTable").css('display', 'none');
            $("#not-found").css('display', 'none');
            $("#user-searched").html(username)
        },
        complete: function() {
            $("#loading-search").html('');
            
        }, //Hide spinner
        dataType: 'json',
        success: function(msg) {
//            $("#loading-search").html('');
            if (msg.length != 0) {
                $('#userFoundTable').removeAttr('style');
                $('table#userFoundTable > tbody:last').empty();
                $.each(msg, function(i, data) {
                    $('table#userFoundTable > tbody:last').append('<tr ><td class="user-table-td" style="cursor: pointer" onclick="getUserDetail(\'' + data.id + '\',\''+data.name+'\', 20, 0)">' + data.name + '</td><td>' + data.institutionName + '</td><td>' + data.email + '</td><td>' + data.roleName + '</td></tr>');
                });
                if (msg.length >= limit)
                    $('table#userFoundTable > tbody:last').append('<tr class="load-more-tr"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalUser(\'' + username + '\', ' + limit + ', ' + (offset + limit) + ')">Load More</button></td></tr>');

            }
            else {
                $("#not-found").removeAttr('style');
                $("#not-found").html("<center><b><h3>No User found</h3></b><center>");
            }
        }
    });
}

function getAdditionalUser(username, limit, offset) {
    
    $.ajax({
        type: "GET",
        url: "searchUser/" + username + "/" + limit + "/" + offset,
        cache: false,
        beforeSend: function() {
            $('.load-more-tr').css('display', 'none');
            $("table#userFoundTable > tbody:last").append('<center class="load-other"><img style="margin-left: 90px;" src="public/assets/img/ajax-loader-1.gif" /></center>');
        },
        complete: function() {
            $(".load-other").css('display', 'none');
        }, //Hide spinner
        dataType: 'json',
        success: function(msg) {
            
            $.each(msg, function(i, data) {
                $('table#userFoundTable > tbody:last').append('<tr ><td class="user-table-td" style="cursor: pointer" onclick="getUserDetail(\'' + data.id + '\',\''+data.name+'\', 20, 0)">' + data.name + '</td><td>' + data.institutionName + '</td><td>' + data.email + '</td><td>' + data.roleName + '</td></tr>');
            });
            if(msg.length >= limit)
                $('table#userFoundTable > tbody:last').append('<tr class="load-more-tr"><td colspan="2"><button style="width:200px;" class="btn btn-default load-more" onclick="getAdditionalUser(\'' + username + '\', ' + limit + ', ' + (offset + limit) + ')">Load More</button></td></tr>');
        }
    });
    
    
}

function getUserDetail(userId, name) {
    $('#userDetailSpan').removeAttr('style');
    $('#user_name').html('');
    $('#user_name').append(name);

    $.ajax({
        type: "GET",
        url: "getUserBio/" + userId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#userBiodataTable").css('display', 'none');
            $("#userBiodataDiv").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#userBiodataDiv").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#userBiodataTable').removeAttr('style');
                    $('table#userBiodataTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#userBiodataTable > tbody:last').append('<tr><td>' + data.user_telp + '</td><td>' + data.user_last_activity + '</td></tr>');
                    });
                }
    });

    $.ajax({
        type: "GET",
        url: "getUserSensor/" + userId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#user-sensor-table").css('display', 'none');
            $("#user-sensor-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#user-sensor-div").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#user-sensor-table').removeAttr('style');
                    $('table#user-sensor-table > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#user-sensor-table > tbody:last').append('<tr><td>' + data.sensor_name + '</td><td>' + data.sensor_ip + '</td></tr>');
                    });
                }
    });
}