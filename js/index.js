$(document).ready(function() {
    var lan = 'cn';
    var phoneCode = JSON.parse(window.localStorage.getItem('phoneCode'));
    console.log(phoneCode)
    lan = phoneCode;
    var phoneLan = phoneCode ? phoneCode.lan : null;
    phoneLan && (lan = phoneLan);
    console.log(lan);
    var yzm = ''
    if (lan == 'en') {

        enFun();
    } else if (lan == 'cn') {

        cnFun();
    }
    $('.codeBC').val(yzm);
    // 跳转地区页面
    $('.phone-address').on('click', function() {
        window.localStorage.setItem('lan', JSON.stringify(lan))
        self.location.href = "./phoneCode.html"
    }); // 地区号


    (phoneCode && phoneCode.area_code) && $('.area_code').html(phoneCode.area_code);
    // 语言切换
    function cnFun() {
        yzm = '获取验证码';
        $('.codeBC').val(yzm);
        $('.pic input').val('获取图片');
        $('.topTxt').html('极致体验的数字货币交易平台');
        $('.phone-input').attr('placeholder', '请输入手机号或邮箱地址');
        $('.sms-input').attr('placeholder', '请输入验证码');
        $('.pass-input').attr('placeholder', '请输入8-20位英文加数字');
        $('.codenum').attr('placeholder', '推荐码');
        $('.codewx').attr('placeholder', '推荐码');
        $('.submit-btn input').val('注册');
        $('#xt').html('选填')
    }

    function enFun() {
        yzm = 'Click send';
        $('.codeBC').val(yzm);
        $('.pic input').val('Get Image');
        $('.topTxt').html('Cryptocurrency Exchange with the Ultimate Experience');
        $('.phone-input').attr('placeholder', 'Enter phone or email');
        $('.sms-input').attr('placeholder', 'Enter SMS code');
        $('.pass-input').attr('placeholder', 'Enter 8-20 letters and numbers');
        $('.codenum').attr('placeholder', 'Invit code');
        $('.codewx').attr('placeholder', 'WeChat code');
        $('.submit-btn input').val('Registered');
        $('#xt').html('optional')
    }
    $('#chinese').on('click', function() {
        lan = 'cn';

        cnFun()
    });
    $('#English').on('click', function() {
        lan = 'en';
        enFun();
    });

    let picKey = ''
    $('.pic input').on('click', function() {
        if (!$('.phone-input').val()) {

            return false
        }

        $.ajax({
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            url: url + '/api/captcha?phone=' + $('.phone-input').val(),

            success: function(res) {
                picKey = res.data.captcha_key
                $('.pic img').attr('src', res.data.captcha_image_content)
            }
        })

    })
    $('.codeBC').on('click', function() {
            if (!$('.pic img').attr('src')) {
                return false
            }
            let data = {
                area_code: $('.area_code').html().replace('+', ''),
                phone: $('.phone-input').val(),
                type: 1,
                from: 'register',
                captcha: $('.pic-input').val(),
                ckey: picKey
            }
            $.ajax({

                type: 'POST',
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                url: url + '/api/user/sendSms?phone=' + $('.phone-input').val(),
                data: data,
                success: function(res) {
                    console.log(res)
                }
            })
            timer()
        })
        //倒计时
    function timer() {
        if ($('.codeBC').val() != yzm) return
        let num = 90;
        $('.codeBC').addClass('codeBnDisble');
        $('.codeBC').val(num + 's');
        let interval = setInterval(() => {
            num--;
            $('.codeBC').val(num + 's');
            if (num == -1) {
                $('.codeBC').val(yzm)
                $('.codeBC').removeClass('codeBnDisble');
                clearInterval(interval);
            }
        }, 1000);
    }
    // 显示密码
    $('.elsy').on('click', function() {
        if ($('.pass-input').attr('type') == 'password') {
            $('.elsy').addClass('elsy-in')
            $('.pass-input').attr('type', 'text')
        } else {
            $('.elsy').removeClass('elsy-in')
            $('.pass-input').attr('type', 'password')
        }

    })




    // 获取url后面拼接
    function request(paras) {
        var url = location.href;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {}
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1,
                j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof(returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    }
    console.log(request('code')) //领取

    $('.submit-btn').on('click', function() {
        window.localStorage.setItem('lan', JSON.stringify(lan))

        let data = {
            area_code: $('.area_code').html().replace('+', ''),
            phone: $('.phone-input').val(),
            code: $('.yzm input').val(),
            password: $('.pass-input').val(),
            password_confirmation: $('.re-pass-input').val(),
            recommend: $('.code-input ').val(),

        }
        $.ajax({
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                url: url + '/api/user/register',
                data: data,
                success: function(res) {

                }
            })
            // self.location.href = "./Download.html"
    })
})