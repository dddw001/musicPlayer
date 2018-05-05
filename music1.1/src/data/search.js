export function search(key){
    return $.getJSON("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query="+key+"&callback=?", function(res){
      return Promise.resolve(res);
    });
  }