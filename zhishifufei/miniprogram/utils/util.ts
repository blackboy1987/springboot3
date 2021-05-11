export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

const appCode="V91DCWGV0F0U";
const appToken="e09f8f7f3346685928a1a24559979a9624a768fd8f56da63bac52cda5b88b80b";
const baseUrl="http://localhost:9000/api/zhishifufei/";

export const get=(url: string,callback:(response: any)=>void)=>{
  wx.request({
    url:baseUrl+url,
    method:"GET",
    header:{
      token:wx.getStorageSync("token"),
      appCode,
      appToken,
    },
    success:function (response){
      callback(response.data);
    },
    fail:function (response){
      wx.showToast({
        title: response.errMsg,
        icon: 'none',
      }).then();
    }
  })
}

export const post=(url: string,data:{[key: string]: any},callback:(response: any)=>void)=>{
  wx.request({
    url:baseUrl+url,
    method:"POST",
    header:{
      'content-type': 'application/x-www-form-urlencoded',
      token:wx.getStorageSync("token"),
      appCode,
      appToken,
    },
    data,
    success:function (response){
      callback(response.data);
    },
    fail:function (response){
      wx.showToast({
        title: response.errMsg,
        icon: 'none',
      }).then();
    }
  })
}


export const config = () =>{
  get("config",(response:{code: number,data: any, msg: string}) => {
    console.log("get config",response.data);
    wx.setStorageSync("appConfig",response.data);
  });
}



export const formatHtml = (html: string) => {
  let newContent = html.replace(/<img[^>]*>/gi, function (match) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi, function (match) {
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}
