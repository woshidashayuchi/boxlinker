$(function(){
    $('.load-ajax-more').click(function () {
        var $this = $(this);
        $this.addClass('disabled');
        $.ajax({
            url: $this.data('url'),
            headers: {
                'X-AJAX': "true"
            },
            success:function (data, status, request) {
                $(data).insertBefore($this.parent());

                // Update new URL or remove self if no more feeds
                var url = request.getResponseHeader('X-AJAX-URL');
                if (url) {
                    $this.data('url', url);
                    $this.removeClass('disabled');
                } else {
                    $this.remove();
                }
            }
        })
    });
});
