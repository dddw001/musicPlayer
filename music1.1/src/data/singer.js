export function getSinger(){
  return $.getJSON("http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.artist.get72HotArtist&format=jsonℴ=1&offset=0&limit=100?q=javascript&count=1&callback=?", function(res){
    return Promise.resolve(res);
  });
}