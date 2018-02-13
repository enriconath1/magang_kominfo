$(document).ready(function() {
    $('#userTable').on('click', '.user-table-td', function() {
        var state = $(this).parent().hasClass('highlighted-tr');
        $('.highlighted-tr').removeClass('highlighted-tr');
        if (!state) {
            $(this).parent().addClass('highlighted-tr');
        }
    });
    
    $.ajax({
        type: "GET",
        url: "getUsers/0/100",
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#userTable").css('display', 'none');
            $("#userList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#userList").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#userTable').removeAttr('style');
                    $('table#userTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#userTable > tbody:last').append('<tr><td class="user-table-td" style="cursor: pointer" onclick="getUserDetail(\'' + data.id + '\',\'' + data.name + '\')"> <a href=# data-toggle="modal" data-target="#user-detail-modal">' + data.name + '</td><td>' + data.institutionName + '</td><td>' + data.email + '</td><td>' + data.roleName + '</td><td><a class="btn btn-circle btn-inverse" href="editUser/' + data.id + '"><i class="fa fa-pencil"></i></a></td></tr>');
                        //<td style="cursor: pointer" onclick="userDelete(\'' + data.user_id + '\',\'' + data.user_name + '\')"><a href="#detail-modal" data-toggle="modal"><i class="fa fa-trash-o"></i></a></td>
                    });
                }
    });

});

function userDelete(id, username) {
    document.getElementById("b").innerHTML = 'Are you sure you want to delete ' + username + '?</br></br><table width="400" style="text-align: center;"><td><button type="button" onclick="del(\'' + id + '\')"><i class="fa fa-thumbs-o-up fa-3x"></i></button></td><td><button type="button" data-dismiss="modal"><i class="fa fa-thumbs-o-down fa-3x"></i></button></td></table>';
}

function del(userId) {
    $.ajax({
        type: "GET",
        url: "deleteUser/" + userId,
        cache: false,
        beforeSend: function() {
//                    $("#b").css('display', 'none');
            $("#b").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#b").html('');
        }, //Hide spinner
        success: function(msg) {
            $("#b").append('Success!');
            location.reload();
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
                        $('table#userBiodataTable > tbody:last').append('<tr><td>' + data.name + '</td><td>' + data.telp + '</td><td>' + data.email + '</td><td>' + data.institutionName + '</td><td>' + data.lastActivity + '</td></tr>');
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
                        $('table#user-sensor-table > tbody:last').append('<tr><td>' + data.sensorName + '</td><td>' + data.sensorIp + '</td></tr>');
                    });
                }
    });
}


