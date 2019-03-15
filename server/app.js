var express=require('express');//引入模块
var cheerio=require('cheerio');
var superagent=require('superagent');
var app=express();

app.get('/',function(req,res,next){
    superagent.get('http://www.kugou.com/yy/rank/home/1-8888.html?from=homepage')//请求页面地址
        .end(function(err,sres){//页面获取到的数据
            if(err) return next(err);
            var $=cheerio.load(sres.text);//用cheerio解析页面数据
            var arr=[];

            $(".pc_temp_songlist ul li").each(function(index,element){
                var $eleItem=$(element);
                console.log($eleItem);
                arr.push(
                    {
                        name: $eleItem.attr("title"),
                    }
                );
            });
            res.send(arr);
        })
    });
app.listen(8901, function () {
    console.log('抓取成功~~~');
});
