import axios from 'axios'

//res.data.showapi_res_body.pagebean.songlist.slice(0,15)
export function getHot(){
    return axios.get('http://route.showapi.com/213-4',{params:{"showapi_appid":"4","showapi_sign":"7EDE141B104678B2DDBAB9097D226866","topid":"26"}})
    .then(function(res){
        //result=res.data.showapi_res_body.pagebean.songlist.slice(0,15);
        return Promise.resolve(res.data.showapi_res_body.pagebean.songlist.slice(0,15))
    })
}

export function getMusic(){
    return $.getJSON("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=877578&callback=?", function(res){
      return Promise.resolve(res);
    });
  }