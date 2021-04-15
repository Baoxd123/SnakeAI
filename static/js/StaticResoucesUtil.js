(function() {
    //静态资源管理类
    window.StaticResouces = Class.extend({
        init: function() {

        },
        //读取图片
        loadImages: function(jsonURL, callback) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {

                    }
                }
            }
            xhr.open("get", jsonURL, true);
            xhr.send(null);
            // callback();
        }
    });
})();