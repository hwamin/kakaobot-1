var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
console.log("Server Start");

//번역 api 테스트
/*
var client_id = '네이버api발급';
var client_secret = '네이버api발급';

var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
*/

/*
app.get('/keyboard', (req, res) => {
  const menu = {
      type: 'buttons',
      buttons: ["menu1", "menu2", "menu3"]
  };

  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});*/

app.get('/keyboard', (req, res) => {
  const menu = {
	"type" : "buttons",
	"buttons" : ["도움말","시작하기","만든이"]
  }
  res.set({
    'content-type': 'application/json'
  }).send(menu);
});


app.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };

    let meassage;
    if(_obj.content=="도움말"){
        massage = {
            "message" : {
                "text" : "안녕하세요. 후니봇입니다. 키워드를 알려드립니다."
            }
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));
    }
    else if(_obj.content=="시작하기"){
        massage = {
            "message" : {
                "text" : "후니봇 시작합니다."
            }
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));
    }
    else if(_obj.content=="만든이"){
        massage = {
            "message" : {
                    "text" : "자유로운 개발자 전승훈입니다.",
			    "message_button" : {
				    "label": "홈페이지 주소",
				    "url" : "http://sodeok.xyz"
			    }
            }
        };
	    res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));
    }
    else{
        massage = {
            "message": {
                "text": objBody.message.result.translatedText
            }
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));
    //번역 api 테스트
    /*
	var options = {
      		url: api_url,
      		form: {'source':'ko', 'target':'en', 'text':_obj.content},
		headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
	};
	request.post(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
        		var objBody = JSON.parse(response.body);
			massage = {
            			"message": {
                			"text": objBody.message.result.translatedText
            			}
        		};
			res.set({
                		'content-type': 'application/json'
        		}).send(JSON.stringify(massage));
      		} else {
        		res.status(response.statusCode).end();
        		massage = {
            			"message": {
                			"text": response.statusCode
				}
        		};
			res.set({
                                'content-type': 'application/json'
                        }).send(JSON.stringify(massage));
		}
    	});*/
    }
});

app.listen(8888);
