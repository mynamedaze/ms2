'use strict';
$(document).ready(function () {
    let auditForm = $('#audit-form');

    auditForm.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/audit/audit-order.php',
            data: auditForm.serialize(),
            success: function (data) {
                $('#audit-input-name').val('');
                $('#audit-input-tel').val('');
                $(overlay).fadeIn(300);
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('audit_order');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });
});