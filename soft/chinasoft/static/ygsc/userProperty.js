/**
 * Created by bailinan on 2018/5/10.
 */

var $modal, $container, userProperty, RoneUserName;

// portals地址不同环境需更改
var portalsAddr = 'http://ics.chinasoftosg.com:8001';

// 员工手册pdf地址不同环境需更改
var pdfAddr = 'http://ics.chinasoftosg.com/pptemplate/default/Employee_handbook.pdf';

var html = "<div class=\"modal fade \" id=\"myModal1\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" style=\"width: 750px\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\" id=\"myModalLabel\"></h4>\n            </div>\n            <div class=\"modal-body\">\n                <div id=\"my-pdf\"></div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" onclick=\"closeModal()\">\u7A0D\u540E\u518D\u770B\n                </button>\n                <button type=\"button\" class=\"btn btn-primary\" onclick=\"readed()\">\n                    \u5DF2\u770B\u8FC7\n                </button>\n            </div>\n        </div>\n    </div>\n</div>";

$(document).ready(function () {
    $(document.body).append(html);
    var $jike_coolie = document.cookie;
    $modal = $("#myModal1");
    $container = $("#my-pdf");
    if ($jike_coolie.indexOf('RoneUserName')>-1){
        RoneUserName = $jike_coolie.substr($jike_coolie.indexOf('RoneUserName')).split(';')[0].split('=')[1];
        jQuery.ajax({
            url: portalsAddr+'/person/direct/userProperty/queryUserProperty',
            headers:{'RoneUserName': RoneUserName}
        }).then(function (resp) {
            userProperty = resp;
            if (resp.handbookReaded){
                return;
            }
            var bookname = resp.handbookName.split('@')[0];
            var booktime = resp.handbookName.split('@')[1];
            $('#myModalLabel').html('<h2 style="color: red;font-size: large">亲爱的小伙伴们，《'+bookname+'》已经在'+booktime+'月份发布执行了，你看了吗？</h2>');
            // $('#myModalLabel').html('亲爱的小伙伴们，《'+bookname+'》已经在'+booktime+'月份发布执行了，你看了吗？');
            $modal.modal({backdrop: 'static', keyboard: false});

            var a = PDFObject.embed(pdfAddr, $container);
            if (!a){
                $("#my-pdf").html("<p>当前浏览器不支持在线阅读pdf文档, 请开启阅读功能或下载文档 : <a href='"+pdfAddr+"'>点击下载</a></p>")
            }

        })
    }

});

function closeModal() {
    $modal.modal('hide');
}

function readed() {
    $modal.modal('hide');
    userProperty.handbookReaded = true;
    jQuery.ajax({
        url: portalsAddr +　'/person/direct/userProperty/updateUserProperty',
        type: "post",
        data: JSON.stringify(userProperty),
        dataType: 'json',
        headers: {'RoneUserName': RoneUserName},
        contentType: 'application/json'
    });
}