var Client = require('mongodb').MongoClient;

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
const menu = {
	"type" : "buttons",
	"buttons" : ["랜덤짤받기","도움말"]
};

app.get('/keyboard', (req, res) => {
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
                "text" : "러블리즈 랜덤짤봇 입니다.\n러블리즈 이미지 갤러리에 있는 이미지 중 랜덤으로 1장을 보여드립니다.",
                "photo": {
                    "url": "http://sodeok.xyz/lovelyz.jpg",
                    "width": 400,
                    "height": 300
                },
                "message_button" : {
				    "label": "러블리즈 이미지 갤러리",
				    "url" : "http://lovelyzfan.xyz"
			    }
            },
            "keyboard":menu
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));
    }
    else if(_obj.content=="랜덤짤받기"){
        Client.connect('mongodb://localhost:27017/lovelyz', function(error, db) {
            if(error) console.log(error);
            else {
                db.collection('img').count(function(err,doc){
                    if(err) console.log(err);
                    let num=Math.floor(Math.random()*Number(doc));
                    db.collection('img').find().skip(num).limit(1).toArray(function(err,doc){
                        if(err) console.log(err);
                        massage = {
                            "message" : {
                                "photo": {
                                    "url": "http://lovelyzfan.xyz/resources/lovelyz_thumb/"+String(doc[0]._id),
                                    "width": 300,
                                    "height": 300
                                },
                                "message_button" : {
                                    "label": "원본 보기는 링크 클릭",
                                    "url" : "http://sodeok.xyz/img.html?"+String(doc[0]._id)
                                }
                            },
                            "keyboard":menu
                        };
                        db.close();
                        res.set({
                            'content-type': 'application/json'
                        }).send(JSON.stringify(massage));
                    });
                });
            }
        }); 
    }
    else if(_obj.content=="만든이"){
        massage = {
            "message" : {
                    "text" : "학생 개발자 전승훈입니다.",
			    "message_button" : {
				    "label": "개인 블로그",
				    "url" : "http://sodeok.xyz"
			    }
            },
            "keyboard":menu
        };
	    res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));
    }
    else{
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