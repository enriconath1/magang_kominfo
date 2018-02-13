$(document).ready(function() {
    $('#roleTable').on('click', '.role-table-td', function() {
        var state = $(this).parent().hasClass('highlighted-tr');
        $('.highlighted-tr').removeClass('highlighted-tr');
        if (!state) {
            $(this).parent().addClass('highlighted-tr');
        }
    });
    
    $.ajax({
        type: "GET",
        url: "getRoles",
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#roleTable").css('display', 'none');
            $("#roleList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#roleList").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#roleTable').removeAttr('style');
                    $('table#roleTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#roleTable > tbody:last').append('<tr><td class="role-table-td" style="cursor: pointer" onclick="getRoleDetail(\'' + data.role_id + '\')">' + data.role_name + '</td></tr>');
                        //<td style="cursor: pointer" onclick="categoryDelete(\'' + data.category_id + '\')"><a href="#detail-modal" data-toggle="modal"><i class="fa fa-trash-o"></i></a></td>
                    });
                }
    });

});
function categoryDelete(id) {
    document.getElementById("b").innerHTML = 'Are you sure?</br></br><table width="400" style="text-align: center;"><td><button type="button" onclick="del(\'' + id + '\')"><i class="fa fa-thumbs-o-up fa-3x"></i></button></td><td><button type="button" data-dismiss="modal"><i class="fa fa-thumbs-o-down fa-3x"></i></button></td></table>';
}
function del(id) {
    $.ajax({
        type: "GET",
        url: "deleteCategory/" + id,
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
function getRoleDetail(roleId) {
    $('#roleDetailSpan').removeAttr('style');

    $.ajax({
        type: "GET",
        url: "getRoleUsers/" + roleId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#roleUserTable").css('display', 'none');
            $("#roleUserDiv").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#roleUserDiv").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#roleUserTable').removeAttr('style');
                    $('table#roleUserTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#roleUserTable > tbody:last').append('<tr><td>' + data.user_name + '</td></tr>');
                    });
                }
    });
}


