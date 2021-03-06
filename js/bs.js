function calcuCRC(msg, crc) {
    var encoded = new Array();
    var m = msg.length, n = crc.length;
    for (var i = 0; i < msg.length; i++)
        encoded.push(msg[i]);
    for (var i = 1; i <= n - 1; i++)
        encoded.push("0");
    for (var i = 0; i <= encoded.length - n;) {
        for (var j = 0; j < n; j++) {
            if (encoded[i + j] == crc[j]) {
                encoded[i + j] = "0"
            }
            else {
                encoded[i + j] = "1";
            }
        }
        for (; i < encoded.length && encoded[i] != '1'; i++) {
            ;
        }
    }
    return encoded.slice(encoded.length - n + 1).toString();
}

function binToHex(bin) {
    var binlen = bin.length;
    for (var i = 1; binlen % 4 != 0 && i <= 4 - binlen % 4; i++) {
        bin = "0" + bin;
    }
    var dec = new Array(), decTmp = 0;
    for (var i = 0; i < bin.length; i++) {
        var mi = 3 - i % 4;
        decTmp += Number(bin[i]) * Math.pow(2, mi);
        if ((i + 1) % 4 == 0) {
            dec.push(decTmp);
            decTmp = 0;
        }
    }
    for (var i = 0; i < dec.length; i++) {
        if (dec[i] >= 10) {
            dec[i] = String.fromCharCode("A".charCodeAt() + dec[i] % 10);
        }
    }
    return "0x" + dec.toString().split(",").join("")
}

$(document).ready(function () {
    $("#shuju").on("input", function () {
        var msg = $("#dizhi").val() + $("#kongzhi").val() + $("#xieyi").val() + $("#shuju").val();
        var crcDuo = $("#crc").val(), encoded = new Array();
        var crc = calcuCRC(msg, crcDuo).split(",").join("");
        $("#crccode").text(crc);
        $("#xieyi").text(binToHex($("#select").val()));
        var jianyan = $("#shuju").val();
        for (var i = 0; i < jianyan.length; i++) {
            if (jianyan[i] == "0" || jianyan[i] == "1") { ; }
            else {
                alert("只能输入0或1哦😯😯😯");
                $("#shuju").val($("#shuju").val().slice(0, -1));
            }
        }
        $("#shuju2").text(binToHex($("#shuju").val()));
        $("#fcs").text(binToHex(crc));
        var data = "<data><biaozhi>0x7E</biaozhi><dizhi>0xFF</dizhi><kongzhi>0x03</kongzhi>" + "<xieyi>" + binToHex($("#select").val()) + "</xieyi><Data>" + binToHex($("#shuju").val()) + "</Data><fcs>" + binToHex($("#fcs").val()) + "</fcs><biaozhi>" + "0x7E</biaozhi></data>";
        $("#save").attr("href", "data:text/html;charset=utf-8," + data);
    });
    $("#calcCRC").click(function () {
        var msg = $("#dizhi").val() + $("#kongzhi").val() + $("#xieyi").val() + $("#shuju").val();
        var crcDuo = $("#crc").val(), encoded = new Array();
        var crc = calcuCRC(msg, crcDuo).split(",").join("");
        $("#crccode").text(crc);
        $("#xieyi").text(binToHex($("#select").val()));
        $("#shuju2").text(binToHex($("#shuju").val()));
        $("#fcs").text(binToHex(crc));
        var data = "0x7E,0xFF,0x03" + "," + binToHex($("#select").val()) + "," + binToHex($("#shuju").val()) + "," + binToHex($("#fcs").val()) + "," + "0x7E";
        $("#save").attr("href", "data:text/html," + data);
    });
});