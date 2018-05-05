export function rank(id){
    if(id==0){
        return $.getJSON("http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.billboard.billList&format=json&type=1&offset=0&size=50?q=javascript&count=1&callback=?", function(res){
            return Promise.resolve(res);
        });
    }
    if(id==1){
        return $.getJSON("http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.billboard.billList&format=json&type=2&offset=0&size=50?q=javascript&count=1&callback=?", function(res){
            return Promise.resolve(res);
        });
    }
    if(id==2){
        return $.getJSON("http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.billboard.billList&format=json&type=8&offset=0&size=507?q=javascript&count=1&callback=?", function(res){
            return Promise.resolve(res);
        });
    }
    if(id==3){
        return $.getJSON("http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.billboard.billList&format=json&type=6&offset=0&size=50?q=javascript&count=1&callback=?", function(res){
            return Promise.resolve(res);
        });
    }
}




