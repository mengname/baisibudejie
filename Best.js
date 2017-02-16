/**
 * Created by Administrator on 2017/2/7.
 */

$(function () {
    var formatterDateTime=   function () {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear()
            + ""// "年"
            + (month >= 10 ? month : "0" + month)
            + ""// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    };
    $(".quanbu").click(function () {
        uls.innerHTML += "";
        help("");
    })
    $(".shipin").click(function () {
        uls.innerHTML += "";
        help(41);
    });
    $(".tupian").click(function () {
        uls.innerHTML += "";
        help(10);
    })
    $(".duanzi").click(function () {
        uls.innerHTML += "";
        help(29);
    })
    $(".shengyin").click(function () {
        uls.innerHTML += "";
        help(31);
    })
    function help(ttp) {
        $.ajax({
            type:'get',
            url:"https://route.showapi.com/255-1?page=1&showapi_appid=31917&showapi_timestamp="+formatterDateTime()+"&title=&type="+ttp+"&showapi_sign=7c793fb734154aaa8245ed8a69e68f13",
            success:function (data) {

                var di = data.showapi_res_body.pagebean.contentlist;

                code(di);
            }
        });
    }

    function code(di) {
        function News(option) {
            this.create_time = option.create_time;
            this.profile_image = option.profile_image;
            this.name = option.name;
            this.text = option.text;
            this.type = option.type;
            this.video_uri = option.video_uri;
            this.image2 = option.image2;
            this.voice_uri = option.voice_uri;
            this.weixin_url = option.weixin_url

        }

        News.prototype.add = function () {
            var str = "";
            str += "<li><div class='divs'><a href='" + this.weixin_url + "'><img width='40'height='40' src='" + this.profile_image + "' alt=''></a><a href='" + this.weixin_url + "'>" + this.name + "</a><p>" + this.create_time + "</p></div>";
            if (this.type == 10) {
                str += '<img src="' + this.image2 + '">'
            } else if (this.type == 29) {
                str += '<p></p>'
            } else if (this.type == 31) {
                str += "<audio src='" + this.voice_uri + "'controls='controls'></audio>"
            }
            else if (this.type == 41) {
                str += "<video src='" + this.video_uri + "' controls = 'controls' width='508'></video>"
            }

            str += "<div class='text'><a href='" + this.weixin_url + "'>" + this.text + "</a></div> </li>";

            var uls = document.querySelector("#uls");

            uls.innerHTML += str;
        };
        for (var i = 0; i < di.length; i++) {
            var news = new News(di[i]);
            news.add();
        }
    }
    
});
