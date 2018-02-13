$(document).ready(function() {
    $('#categoryTable').on('click', '.category-table-td', function() {
        var state = $(this).parent().hasClass('highlighted-tr');
        $('.highlighted-tr').removeClass('highlighted-tr');
        if (!state) {
            $(this).parent().addClass('highlighted-tr');
        }
    });
    
    $.ajax({
        type: "GET",
        url: "getCategory",
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#categoryTable").css('display', 'none');
            $("#categoryList").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#categoryList").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#categoryTable').removeAttr('style');
                    $('table#categoryTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#categoryTable > tbody:last').append('<tr><td class="category-table-td" style="cursor: pointer" onclick="getCategoryDetail(\'' + data.category_id + '\')">' + data.category_name + '</td><td>' + data.count + '</td><td><a class="btn btn-circle btn-inverse" href="editCategory/' + data.category_id + '"><i class="fa fa-pencil"></i></a></td></tr>');
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
function getCategoryDetail(catId) {
    $('#categoryDetailSpan').removeAttr('style');

    $.ajax({
        type: "GET",
        url: "getCategoryInstitute/" + catId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#categoryInstituteTable").css('display', 'none');
            $("#categoryInstituteDiv").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#categoryInstituteDiv").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#categoryInstituteTable').removeAttr('style');
                    $('table#categoryInstituteTable > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#categoryInstituteTable > tbody:last').append('<tr><td>' + data.institute_name + '</td></tr>');
                    });
                }
    });

    $.ajax({
        type: "GET",
        url: "getCategorySensor/" + catId,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            $("#category-sensor-table").css('display', 'none');
            $("#category-sensor-div").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#category-sensor-div").html('');
        }, //Hide spinner
        dataType: 'json',
                success: function(msg) {
                    $('#category-sensor-table').removeAttr('style');
                    $('table#category-sensor-table > tbody:last').empty();
                    $.each(msg, function(i, data) {
                        $('table#category-sensor-table > tbody:last').append('<tr><td>' + data.sensor_name + '</td><td>' + data.sensor_ip + '</td></tr>');
                    });
                }
    });
}


