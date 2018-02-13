//== Class definition

var BootstrapDaterangepicker = function () {
    
    //== Private functions
    var demos = function () {

        // left alignment setup
        $('#m_daterangepicker_3').daterangepicker({
            buttonClasses: 'm-btn btn',
            applyClass: 'btn-primary',
            cancelClass: 'btn-secondary'
        }, function(start, end, label) {
            $('#m_daterangepicker_3 .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
        });

    }

    var validationDemos = function() {

        // input group and left alignment setup
        $('#m_daterangepicker_3_validate').daterangepicker({
            buttonClasses: 'm-btn btn',
            applyClass: 'btn-primary',
            cancelClass: 'btn-secondary'
        }, function(start, end, label) {
            $('#m_daterangepicker_3_validate .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
        });        
    }

    return {
        // public functions
        init: function() {
            demos(); 
            validationDemos();
        }
    };
}();

jQuery(document).ready(function() {    
    BootstrapDaterangepicker.init();
});