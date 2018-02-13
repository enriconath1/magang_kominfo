$(document).ready(function() {
    var d = new Date();
    
    getLatestAttack(d.getMonth()+1, d.getFullYear());
    
    
    $.ajax({
        type: "GET",
        url: "topCountry",
        cache: false,
        beforeSend: function() {
            $("#topCountry").css('display', 'none');
            $("#countryLoad").html('<center><img src="public/assets/img/ajax-loader.gif" /><br/>Loading...</center>');
        },
        complete: function() {
            $("#countryLoad").html('');
        },
        dataType: 'json',
        success: function(msg) {
            $('#topCountry').removeAttr('style');
            $.each(msg, function(i, data) {
                $('table#topCountry > tbody:last').append('<tr><td>' + data.totalCountry + '</td><td><img src="public/assets/img/country/' + data.countryid.toLowerCase() + '.png"> ' + data.country_name + '</td></tr>');
            });
        }
    });


    function getLatestAttack(month, year) {
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "getLatestAttack/"+month+"/"+year,
            data: "",
            error: function(e) {
            },
            cache: false,
            success: function(msg) {
                var options = {
                    lines: {show: true, fill: true},
                    points: {show: true},
                    xaxis: {mode: "time", timeformat: "%d/%m", tickSize: [1, "day"]}
                };
                var d1 = [];
                $.each(msg, function(i, data) {
                    d1.push([new Date(year, month-1, data.timeUnit), data.value]);
                });

                $.plot($("#latest-attack"), [d1], options);
            }});
    }


});


