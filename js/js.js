var clipboard = new ClipboardJS('#copy', {
    text: function() {
        return server + ':' + port;
    }
});
clipboard.on('success', function(e) {
    alert('已复制');
});