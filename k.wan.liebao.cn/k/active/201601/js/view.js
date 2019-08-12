console.log(ks_user);
(function(){
    if(ks_user.length==0){
        Login.show();
    }else{
        var uid=parseInt(ks_user.uid);
        ws.heartbeat();

        connection.onopen=function(){
            ws.doSend(connection,{
                command:201,
                content:JSON.stringify({
                    Uid:uid
                })
            });
            helper._score4play=false;
            ws.doSend(connection,{
                command:210,
                content:JSON.stringify({})
            });
            ws.doSend(connection,{
                command:211,
                content:JSON.stringify({})
            });

            ws.doSend(connection,{
                command:212,
                content:JSON.stringify({})
            });
        };

        $('.js-btn-play').click(function(){
            helper._score4play=true;
            ws.doSend(connection,{
                command:210,
                content:JSON.stringify({})
            });
        });

        $('#recordBtn').click(function(){
            ws.doSend(connection,{
                command:222,
                content:JSON.stringify({})
            });
        });
    }
})();

