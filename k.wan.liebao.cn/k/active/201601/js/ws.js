var ws={};
ws.msgCount=0;
ws.bufferArr=[];
ws.uri='ws://api.h5game.ksmobile.com/activity/20160111';

ws.heartbeat=function(){
    opt={};
    console.log(opt);
    ws.timer=setInterval('ws.doSend(connection,{command:200,content:JSON.stringify({})});',4000);
};

ws.onOpen=function(){
    console.log('webSocket is opened');
};
ws.onMessage=function(evt){
    var dv=new DataView(evt.data,0);
    var v1;
    ws.msgCount++;

    if(ws.msgCount==4){
        var code,str='';
        for( var i= 0,len=dv.byteLength;i<len;i++ ){
            code=dv.getUint8(i,true);
            str+=String.fromCharCode(code);
        }
        //console.log(str);
        ws.bufferArr.push(Base64.decode(str));
        //存储数据到本地
        helper.saveData(ws.bufferArr);

        ws.msgCount=0;
        ws.bufferArr=[];
        //分发函数
        helper.router();
    }else{
        v1=dv.getUint16(0,true);
        if(ws.msgCount==2){
            ws.bufferArr.push(v1);
        }
    }
};
ws.onClose=function(){
    console.log('closed');
};
ws.doSend=function(wsInstance,msg){
    console.log('doSend');
    var _msg= $.extend({
        commandLen:2,
        command:10,
        content:JSON.stringify({})
    },msg),len,comd,content,contentLen=_msg.content.length,cLen;

    _msg.content=Base64.encode(_msg.content);

    len=bufFac(_msg.commandLen);
    comd=bufFac(_msg.command);
    cLen=bufFac(contentLen,true);
    content=bufFac(_msg.content);

    wsInstance.send(len);
    wsInstance.send(comd);
    wsInstance.send(cLen);
    wsInstance.send(content);

    function bufFac (data,cLen){
        var bufView;
        if(typeof data!='number'){
            bufView=new DataView(new ArrayBuffer(data.length));
            for (var i= 0,len=data.length;i<len;i++){
                bufView.setUint8(i,data.charCodeAt(i),true);
            }
        }else{
            if(cLen){
                bufView=new Uint32Array([data]);
                return bufView;
            }
            bufView=new Uint16Array([data]);
        }
        return bufView;
    }

};

var connection=new WebSocket(ws.uri);
connection.binaryType='arraybuffer';

connection.onopen=ws.onOpen;
connection.onmessage=ws.onMessage;
connection.onclose=ws.onClose;
