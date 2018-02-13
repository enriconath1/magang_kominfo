<script>
    $(function () {
        $("#from").datepicker({
            dateFormat: 'yy-mm-dd',
            defaultDate: "+0w",
            changeMonth: true,
            numberOfMonths: 1,
            onClose: function (selectedDate) {
                $("#to").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#to").datepicker({
            dateFormat: 'yy-mm-dd',
            defaultDate: "+0w",
            changeMonth: true,
            numberOfMonths: 1,
            onClose: function (selectedDate) {
                $("#from").datepicker("option", "maxDate", selectedDate);
            }
        });
    });</script>


<script type="text/javascript" src="{{URL::asset('/assets/js/bootstrap-inputmask/bootstrap-inputmask.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery-tags-input/jquery.tagsinput.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery-pwstrength/jquery.pwstrength.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery-validation/dist/jquery.validate.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery-validation/dist/additional-methods.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery.slimscroll.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery.cookie.js')}}"></script>

<script type="text/javascript" src="{{URL::asset('/assets/js/jquery-jvectormap-2.0.1.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery-jvectormap-world-mill-en.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery-jvectormap-indonesia.js')}}"></script>


<script src="{{URL::asset('/assets/js/flot/jquery.flot.js')}}"></script>
<script src="{{URL::asset('/assets/js/flot/jquery.flot.resize.js')}}"></script>
<script src="{{URL::asset('/assets/js/flot/jquery.flot.pie.js')}}"></script>
<script src="{{URL::asset('/assets/js/flot/jquery.flot.stack.js')}}"></script>
<script src="{{URL::asset('/assets/js/flot/jquery.flot.crosshair.js')}}"></script>
<script src="{{URL::asset('/assets/js/flot/jquery.flot.tooltip.min.js')}}"></script>
<script src="{{URL::asset('/assets/js/flot/jquery.flot.time.js')}}"></script>
<script src="{{URL::asset('/assets/js/sparkline/jquery.sparkline.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery.bootstrap.wizard.min.js')}}"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

<script type="text/javascript" src="{{URL::asset('/assets/js/common-scripts.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/jquery.scrollTo.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/raphael-min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/morris.min.js')}}"></script>

<script type="text/javascript" src="{{URL::asset('/assets/js/jquery.dcjqaccordion.2.7.js')}}"></script>

<script type="text/javascript" src="{{URL::asset('/assets/js/flaty.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('/assets/js/underscore.min.js')}}"></script>

<script>
$("#sidebar").hover(function () {
        $("#sidebar").css("margin-left", "0px");
        $("#main-content").css("margin-left", "210px");
        document.getElementById("main-content").style.WebkitTransition = "all 0.5s";
        document.getElementById("sidebar").style.WebkitTransition = "all 0.5s";
        document.getElementById("main-content").style.MozTransition = "all 0.5s";
        document.getElementById("sidebar").style.MozTransition = "all 0.5s";
    }, function () {
        $("#sidebar").css("margin-left", "-150px");
        $("#main-content").css("margin-left", "60px");
    });
</script>