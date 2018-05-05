export function play(key){
    return $.getJSON("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid="+key+"&callback=?", function(res){
      return Promise.resolve(res);
    });
  }