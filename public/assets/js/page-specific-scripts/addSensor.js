$(document).ready(function () {
    $("input[name='categorySelect']").click(function () {
        var value = $(this).val();
        if (value == "existing") {
            $("#category_selection").removeAttr("style");
            $("#new-category").css('display', 'none');
            $("input[name='instituteSelect'][value='existing']").prop("disabled", false);
            $("input[name='userSelect'][value='existing']").prop("disabled", false);
            $("#institution_category").show();
            $("#categoryText").hide();
        }
        else if (value == "new") {
            $("#new-category").removeAttr("style");
            $("#category_selection").css('display', 'none');
            $("input[name='instituteSelect'][value='existing']").prop("disabled", true);
            $("input[name='userSelect'][value='existing']").prop("disabled", true);
            $("#institution_category").hide();
            $("#categoryText").show();
        }
    })

    $("input[name='instituteSelect']").click(function () {
        var value = $(this).val();
        if (value == "existing") {
            $("#institute_selection").removeAttr("style");
            $("#new-institute").css('display', 'none');
            $("input[name='userSelect'][value='existing']").prop("disabled", false);
            $("#user_institute_1").show();
            $("#user_institute_2").show();
            $("#userInstituteText1").hide();
            $("#userInstituteText2").hide();
        }
        else if (value == "new") {
            $("#new-institute").removeAttr("style");
            $("#institute_selection").css('display', 'none')
            $("input[name='userSelect'][value='existing']").prop("disabled", true);
            if($('#categoryText').length <= 0){
                $("<span id='categoryText' style='display:block;'>"+$("#new_category_add").val()+"</span>").insertAfter("#institute_category_label")
            }
            $("#user_institute_1").hide();
            $("#user_institute_2").hide();
            $("#userInstituteText1").show();
            $("#userInstituteText2").show();
        }
    })

    $("input[name='userSelect']").click(function () {
        var value = $(this).val();
        if (value == "existing") {
            $("#user_selection").removeAttr("style");
            $("#new-user").css('display', 'none');
        }
        else if (value == "new") {
            $("#new-user").removeAttr("style");
            $("#user_selection").css('display', 'none')
            if($('#userInstituteText1').length <= 0){
                $("<span id='userInstituteText1' style='display:block;'>"+$("#new_institute_add").val()+"</span>").insertAfter("#institute_category_label_1") 
            }
            if($('#userInstituteText2').length <= 0){
                $("<span id='userInstituteText2' style='display:block;'>"+$("#new_institute_add").val()+"</span>").insertAfter("#institute_category_label_2")
            }
            
        }
    })

    $.validator.addMethod("userNotSame", function (value, element) {
        return value != $("#user_1_id").val();
    }, "User 1 and User 2 must not be the same")

    //Validation of wizard form
    if (jQuery().validate) {
        var removeSuccessClass = function (e) {
            $(e).closest('.form-group').removeClass('has-success');
        }
        var jq_validator = $('#wizard-validation').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            focusInvalid: false, // do not focus the last invalid input

            invalidHandler: function (event, validator) { //display error alert on form submit              

            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change dony by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
                setTimeout(function () {
                    removeSuccessClass(element);
                }, 3000);
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
            }
        });
    }
    //Look at onNext function to see how add validation to wizard
    $('#form-wizard-add-sensor').bootstrapWizard({
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        onTabClick: function (tab, navigation, index) {
            alert('on tab click disabled');
            return false;
        },
        onNext: function (tab, navigation, index) {
            var valid = $("#wizard-validation").valid();
            if (!valid) {
                jq_validator.focusInvalid();
                return false;
            }

            if (index == 1) {
                var categorySelected = $("#category_id option:selected").val();
                var url = "getInstituteByCategory/" + categorySelected;
                $.getJSON(url, function (data) {
                    $("#institution_id").html("");
                    $.each(data, function (index, element) {
                        $("#institution_id").append("<option value='" + element.instituteId + "'>" + element.instituteName + "</option>")
                    })
                })
                $("#institution_category").val(categorySelected);
                $("#institution_category").prop("disabled", true);
            }

            if (index == 2) {
                var instituteSelected = $("#institution_id option:selected").val();
                var url = "getUserByInstitute/" + instituteSelected;
                $.getJSON(url, function (data) {
                    $("#user_1_id").html("");
                    $("#user_2_id").html("");
                    $.each(data, function (index, element) {
                        $("#user_1_id").append("<option value='" + element.id + "'>" + element.name + "</option>")
                        $("#user_2_id").append("<option value='" + element.id + "'>" + element.name + "</option>")
                    })
                })
                $("#user_institute_1").val(instituteSelected);
                $("#user_institute_1").prop("disabled", true);
                $("#user_institute_2").val(instituteSelected);
                $("#user_institute_2").prop("disabled", true);
            }


            var total = navigation.find('li').length;
            var current = index + 1;
            var category, institute, user1, user2, sensorName, sensorIP;

            if (current == total) {
                if( $("#categorySelect1").is(":checked")){
                    category = ($("#category_id option:selected").text());
                }
                else {
                    category = ($("#categoryText").text());
                }
                
                if( $("#instituteSelect1").is(":checked")){
                    institute = ($("#institution_id option:selected").text());
                }
                else {
                    institute = ($("#new_institute_add").val());
                }
                if( $("#userSelectExisting").is(":checked")){
                    user1 = ($("#user_1_id option:selected").text());
                    user2 = ($("#user_2_id option:selected").text());
                }
                else {
                    user1 = ($("#user_name_1").val());
                    user2 = ($("#user_name_2").val());
                }
                
                sensorName = $("#sensor_name").val();
                sensorIP = $("#sensor_ip").val();
                
                $("#category-confirmation").html(category)
                $("#institute-confirmation").html(institute)
                $("#user1-confirmation").html(user1)
                $("#user2-confirmation").html(user2)
                $("#sensor-name-confirmation").html(sensorName);
                $("#sensor-ip-confirmation").html(sensorIP);
            }


            // set wizard title
            $('.step-title', $('#form-wizard-add-sensor')).text('Step ' + (index + 1) + ' of ' + total);
            // set done steps
            jQuery('li', $('#form-wizard-add-sensor')).removeClass("done");
            var li_list = navigation.find('li');
            for (var i = 0; i < index; i++) {
                jQuery(li_list[i]).addClass("done");
            }

            if (current == 1) {
                $('#form-wizard-add-sensor').find('.button-previous').hide();
            } else {
                $('#form-wizard-add-sensor').find('.button-previous').show();
            }

            if (current >= total) {
                $('#form-wizard-add-sensor').find('.button-next').hide();
                $('#form-wizard-add-sensor').find('.button-submit').show();
            } else {
                $('#form-wizard-add-sensor').find('.button-next').show();
                $('#form-wizard-add-sensor').find('.button-submit').hide();
            }
            var $percent = (current / total) * 100;
            $('#form-wizard-add-sensor').find('.progress-bar').css('width', $percent + '%');

            $('html, body').animate({scrollTop: $("#form-wizard-add-sensor").offset().top}, 900);
        },
        onPrevious: function (tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;

            $("input[name='instituteSelect']").prop('checked', false);
            $("#institute_selection").css('display', 'none');
            $("#new-institute").css('display', 'none');


            // set wizard title
            $('.step-title', $('#form-wizard-add-sensor')).text('Step ' + (index + 1) + ' of ' + total);
            // set done steps
            jQuery('li', $('#form-wizard-add-sensor')).removeClass("done");
            var li_list = navigation.find('li');
            for (var i = 0; i < index; i++) {
                jQuery(li_list[i]).addClass("done");
            }

            if (current == 1) {
                $('#form-wizard-add-sensor').find('.button-previous').hide();
            } else {
                $('#form-wizard-add-sensor').find('.button-previous').show();
            }

            if (current >= total) {
                $('#form-wizard-add-sensor').find('.button-next').hide();
                $('#form-wizard-add-sensor').find('.button-submit').show();
            } else {
                $('#form-wizard-add-sensor').find('.button-next').show();
                $('#form-wizard-add-sensor').find('.button-submit').hide();
            }
            var $percent = (current / total) * 100;
            $('#form-wizard-add-sensor').find('.progress-bar').css('width', $percent + '%');

            $('html, body').animate({scrollTop: $("#form-wizard-add-sensor").offset().top}, 900);
        },
        onTabShow: function (tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;
            var $percent = (current / total) * 100;
            $('#form-wizard-add-sensor').find('.progress-bar').css({
                width: $percent + '%'
            });
        }
    });

    $('#form-wizard-add-sensor').find('.button-previous').hide();
    $('#form-wizard-add-sensor .button-submit').click(function () {
        alert('Finished!');
    }).hide();
}
)


