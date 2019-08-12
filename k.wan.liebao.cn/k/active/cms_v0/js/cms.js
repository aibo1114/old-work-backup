var helper={};
helper.host='http://pg.kisops.com';

//$('[data-dismiss=modal]').trigger('click');

(function(){
    ue.ready(function(){
        ue.setContent('请填写资源内容');
        
    });
    //add
    $('#gameAdd').click(function(){
        $('#gameTri').trigger('click');
        $('#gameForm .form-control').val('');
        $('#formGbtn').text('新增').attr('the-id','addGbtn');
        $('#addGameLabel').text('新增游戏');

    });
    $('#contentAdd').click(function(){
        $('#contentTri').trigger('click');
        $('#contentForm .form-control').val('');
        $('#formCbtn').text('新增').attr('the-id','addCbtn');
        $('#addContentLabel').text('新增目录');
    });
    $('#resourceAdd').click(function(){
        $('#resourceTri').trigger('click');
        $('#resourceForm .form-control').val('');
        $('#sIconHidden').val('');

        $('#formRbtn').text('新增').attr('the-id','addRbtn');
        $('#addResourceLabel').text('新增资源');
	ue.setContent('请填写资源内容');
    });

    //edit res
    $(document).on('click','[the-id=resourceEdit]',function(e){
        e.stopPropagation();
        // var $that=$(this);
        // var role=$(this).attr('data-role');
        //
        // $('#resourceTri').trigger('click');
        // $('#addResource').attr('data-role',role);
        // $('#sIconHidden').val( $(this).parent('td').siblings('[the-id=s-icon]').text() );
        //
        // $('#resourceForm .form-control').each(function(){
        //     var hock=$(this).attr('id');
        //     var initVal=$that.parent('td').siblings('[the-id='+hock+']').text();
        //     $(this).val(initVal);
        // });

	    //$('#edui_input_xit8oqi0j').val( $that.parent('td').siblings('[the-id=s-icon]').text() );
	    // $(document.getElementById('edui_iframe_xit8oqi0j').contentWindow.document.body).html('');
        var role=$(this).attr('data-role');
        $.ajax({
            url:helper.host+'/api/file/info?id='+role,
            type:'get',
            dataType:'jsonp',
            success:function(res){
                console.log(res);
                var ret=res.ret;
                var data=res.data;
                var msg=res.msg;
                if(ret!=1){
                    alert(msg);
                    return false;
                }

                for (var k in data){
                    if(k!='content'){
                        $('#s-'+k).val(data[k]);
                    }
                }
                var content=data['content'];
                content=content.replace('&emsp;','');
                // console.log('1110');
                console.log(content);
                ue.ready(function(){
                    ue.setContent(content);
                });
                $('#addResource').attr('data-role',role);
                $('#resourceTri').trigger('click');
            }

        });
        // var content=$(this).siblings('[the-id=s-content]').html();
        // ue.ready(function(){
        //     ue.setContent(content);
        // });

        $('#formRbtn').text('保存').attr('the-id','editRbtn');
        $('#addResourceLabel').text('编辑资源');
    });

    $('.list-group-item').click(function(){
        var ndx=$(this).index();
        $(this).addClass('active').siblings('.list-group-item').removeClass('active');
        $('.js-content:eq('+ndx+')').addClass('active').siblings('.js-content').removeClass('active');
        $('#dirList').html('');
    });

    //init
    $.ajax({
        url:helper.host+'/api/game/list',
        dataType:'jsonp',
        type:'get',
        success:function(res){
            // console.log(res);
            var ret=res.ret;
            var data=res.data;
            if(ret==1){
                var len=data.length;
                var tr='<tr class="active"><th class="text-center">游戏id</th><th class="text-center">游戏名称</th><th class="text-center">发布路径</th><th class="text-center">操作</th></tr>';
                for(var i=0;i<len;i++){
                    tr+='<tr the-id="gameItem" gid="'+data[i].gid+'">';
                    tr+='<td the-id="g-gid">'+data[i].gid+'</td><td the-id="g-gname">'+data[i].gname+'</td>';
                    tr+='<td the-id="g-gpath">'+data[i].gpath+'</td>';
                    tr+='<td>';
                    tr+='<button class="btn btn-default" data-role="'+data[i].id+'" the-id="gameEdit"><span class="glyphicon glyphicon-edit"></span></button>';
                    tr+='<button class="btn btn-default" data-role="'+data[i].id+'" the-id="gameDel"><span class="glyphicon glyphicon-ban-circle text-danger"></span></button>';
                    tr+='<button class="btn btn-default" gid="'+data[i].gid+'" the-id="gameRel"><span class="glyphicon glyphicon-check"></span></button>';
                    tr+='</td>';
                    tr+='</tr>';
                }
                $('#gameList').html(tr);
                handler4game();
            }
        }
    });

    function getDirList (gid,did){
        $.ajax({
            url:helper.host+'/api/dir/list?gid='+gid+'&did='+did,
            dataType:'jsonp',
            type:'get',
            success:function(res){
                // console.log(res);
                var ret=res.ret;
                var data=res.data;
                var dirs=data.dir;
                if( ret==1){
                    if(!dirs){
                        alert('没有数据');
                        return false;
                    }
                    var tr='<tr class="active"><th class="text-center">所属游戏id</th><th class="text-center">父目录id</th><th class="text-center">目录id</th><th class="text-center">目录名</th><th class="text-center">目录模版名称</th><th class="text-center">子目录模版名称</th><th class="text-center">操作</th></tr>';
                    for(var i=0;i<dirs.length;i++){
                        tr+='<tr the-id="contentItem" gid="'+dirs[i].gid+'" cid="'+dirs[i].id+'">';
                        tr+='<td the-id="c-gid">'+dirs[i].gid+'</td>';
                        tr+='<td the-id="c-fcid">'+dirs[i].fdid+'</td>';
                        tr+='<td the-id="c-cid">'+dirs[i].id+'</td>';
                        tr+='<td the-id="c-cname">'+dirs[i].dname+'</td>';
                        tr+='<td the-id="c-tname">'+dirs[i].dpath+'</td>';
                        tr+='<td the-id="c-stname">'+dirs[i].dpath_sub+'</td>';
                        tr+='<td> <button class="btn btn-default" data-role="'+dirs[i].id+'" the-id="contentEdit"><span class="glyphicon glyphicon-edit"></span></button><button data-role="'+dirs[i].id+'" the-id="contentDel" class="btn btn-default"><span class="glyphicon glyphicon-ban-circle text-danger"></span></button></td>';
                        tr+='<tr>';
                    }
                    $('#dirList').html(tr);
                    handler4content();
                }
            }
        });
    }

    function getResList (gid,did){
        $.ajax({
            url:helper.host+'/api/dir/list?gid='+gid+'&did='+did,
            dataType:'jsonp',
            type:'post',
            success:function(res){
                // console.log(res);
                var ret=res.ret;
                var data=res.data;
                var files=data.file;
                if( ret==1){
                    if(!files){
                        alert('没有数据');
                        return false;
                    }
                    var tr='<tr class="active"><th class="text-center">资源唯一id</th><th class="text-center">所属游戏id</th><th class="text-center">父目录id</th><th class="text-center">资源路径</th><th class="text-center">作者</th><th class="text-center">图标</th><th class="text-center">标题</th><th class="text-center">描述</th><th class="text-center">时间</th><th class="text-center">其他</th><th class="text-center">操作</th></tr>';
                    for(var i=0;i<files.length;i++){
                        tr+='<tr>';
                        tr+='<td the-id="sid">'+files[i].id+'</td>';
                        tr+='<td the-id="s-gid">'+files[i].gid+'</td>';
                        tr+='<td the-id="s-fcid">'+files[i].fdid+'</td>';
                        tr+='<td the-id="spath">'+files[i].fpath+'</td>';
                        tr+='<td the-id="s-author">'+files[i].author+'</td>';
                        tr+='<td the-id="s-icon">'+files[i].icon+'</td>';
                        //tr+='<td the-id="s-icon">';
                        //tr+='<div class="edui-default" id="edui1_iframeupload">';
                        //tr+='<form id="edui_form_xit8oqi0j" target="edui_iframe_xit8oqi0j" method="POST" enctype="multipart/form-data" action="http://pg.kisops.com/php/controller.php?action=uploadimage" style="">';
                        //tr+='<input value="'+files[i].icon+'" id="edui_input_xit8oqi0j" type="file" accept="image/*" name="upfile" style="">';
                        //tr+='</form>';
                        //tr+='<iframe id="edui_iframe_xit8oqi0j" name="edui_iframe_xit8oqi0j" style="display:none;"></iframe>';
                        //tr+='</td>';
                        tr+='<td the-id="s-title">'+files[i].title+'</td>';
                        tr+='<td the-id="s-desc">'+files[i].desc+'</td>';
                        //tr+='<td the-id="s-content">'+files[i].content+'</td>';
                        tr+='<td the-id="s-time">'+files[i].time+'</td>';
                        tr+='<td the-id="s-other">'+files[i].other+'</td>';
                        tr+='<td>';
                        tr+='<button class="btn btn-default" the-id="resourceEdit" data-role="'+files[i].id+'"><span class="glyphicon glyphicon-edit"></span></button>';
                        tr+='<button class="btn btn-default" the-id="resourceDel" data-role="'+files[i].id+'"><span class="glyphicon glyphicon-ban-circle text-danger"></span></button>';
                        if(files[i].is_release!=1){
                            tr+='<button class="btn btn-default" the-id="resourceRel" data-role="'+files[i].id+'"><span class="glyphicon glyphicon-check"></span></button>';
                        }else{
                            tr+='<span class="glyphicon glyphicon-check text-primary check"></span>';
                        }
                        // tr+='<div the-id="s-content" style="display:none;">'+files[i].content+'</div></td>';
                        tr+='</td>';
                        tr+='</tr>';
                    }
                    $('#resList').html(tr);
                }
            }
        });
    }

    $('#s-content-btn').click(function(e){
        e.preventDefault();
        var gid=$('#s-content-gid').val();
        var cid=$('#s-content-cid').val();
        $('#s-content-gid').val('');
        $('#s-content-cid').val('');
        if(!(gid&&cid)){
            alert('请输入游戏id和目录id');
            return false;
        }
        getDirList(gid,cid);
    });

    function handler4game (){
        $('[the-id=gameItem]').click(function(){
            var gid=$(this).attr('gid');
            $('.list-group-item:eq(1)').trigger('click');
            getDirList(gid,0);
        });

        $('[the-id=gameEdit]').click(function(e){
            e.stopPropagation();
            var $that=$(this);
            var role=$(this).attr('data-role');

            $('#gameTri').trigger('click');
            $('#addGame').attr('data-role',role);

            $('#gameForm .form-control').each(function(){
                var hock=$(this).attr('id');
                var initVal=$that.parent('td').siblings('[the-id='+hock+']').text();
                $(this).val(initVal);
            });
            $('#formGbtn').text('保存').attr('the-id','editGbtn');
            $('#addGameLabel').text('编辑游戏');

        });

        $('[the-id=gameRel]').click(function (e) {
            e.stopPropagation();
            var gid=$(this).attr('gid');
            $.ajax({
                url:'http://cms.kisops.com/api/game/make?gid='+gid,
                dataType:'jsonp',
                type:'get',
                success:function(res){
                    var ret=res.ret;
                    var data=res.data;
                    var msg=res.msg;
                    if(ret==1 ){
                        alert('发布成功');
                    }
                    // console.log(res);
                }
            });
        });

        $('[the-id=gameDel]').click(function(e){
            e.stopPropagation();
            var roleId=$(this).attr('data-role');
            var judge=confirm('确认删除？');
            if(judge){
                $.ajax({
                    url:helper.host+'/api/game/del?id='+roleId,
                    type:'get',
                    dataType:'jsonp',
                    success:function(res){
                        // console.log(res);
                        var ret=res.ret;
                        var msg=res.msg;
                        if(ret!=1){
                            alert(msg);
                            return false;
                        }
                        alert('删除成功');
                        $('[data-dismiss=modal]').trigger('click');
                    }
                })
            }
        });
    }

    function handler4content (){
        $('[the-id=contentItem]').click(function(){
            var gid=$(this).attr('gid');
            var cid=$(this).attr('cid');
            $('.list-group-item:eq(2)').trigger('click');
            getResList(gid,cid);
        });

        $('[the-id=contentEdit]').click(function(e){
            e.stopPropagation();
            var $that=$(this);
            var role=$(this).attr('data-role');


            $('#contentTri').trigger('click');
            $('#addContent').attr('data-role',role);

            $('#contentForm .form-control').each(function(){
                var hock=$(this).attr('id');
                var initVal=$that.parent('td').siblings('[the-id='+hock+']').text();
                $(this).val(initVal);
            });
            $('#formCbtn').text('保存').attr('the-id','editCbtn');
            $('#addContentLabel').text('编辑目录');
        });

        $('[the-id=contentDel]').click(function(e){
            e.stopPropagation();
            var roleId=$(this).attr('data-role');

            var judge=confirm('确认删除？');
            if(judge){
                $.ajax({
                    url:helper.host+'/api/dir/del?id='+roleId,
                    type:'get',
                    dataType:'jsonp',
                    success:function(res){
                        // console.log(res);
                        var ret=res.ret;
                        var msg=res.msg;
                        if(ret!=1){
                            alert(msg);
                            return false;
                        }
                        alert('删除成功');
                        $('[data-dismiss=modal]').trigger('click');
                    }
                })
            }
        })
    }

})();


$(document).on('click','[the-id=addGbtn]',function(){
    var gid=$('#g-gid').val();
    var gname=$('#g-gname').val();
    var gpath=$('#g-gpath').val();

    if( !(gid&&gname&&gpath) ){
        alert('请填写新增游戏的数据');
        return false;
    }

    $.ajax({
        url:helper.host+'/api/game/add?gid='+gid+'&gname='+gname+'&gpath='+gpath,
        dataType:'jsonp',
        type:'get',
        success:function(res){
            // console.log(res);
            var ret=res.ret;
            var msg=res.msg;
            if(ret!=1){
                alert(msg);
                return false;
            }
            alert('游戏添加成功');
            $('[data-dismiss=modal]').trigger('click');
        }
    });
});

$(document).on('click','[the-id=addCbtn]',function(){
    var gid=$('#c-gid').val();
    var did=$('#c-fcid').val();
    var dname=$('#c-cname').val();
    var dpath=$('#c-tname').val();
    var dpath_sub=$('#c-stname').val();

    if( !(gid&&did&&dname&&dpath&&dpath_sub) ){
        alert('请填写新增目录的数据');
        return false;
    }

    $.ajax({
        url:helper.host+'/api/dir/add?gid='+gid+'&did='+did+'&dname='+dname+'&dpath='+dpath+'&dpath_sub='+dpath_sub,
        dataType:'jsonp',
        type:'get',
        success:function(res){
            var ret=res.ret;
            var msg=res.msg;
            if(ret!=1){
                alert(msg);
                return false;
            }
            alert('目录添加成功');
            $('[data-dismiss=modal]').trigger();
        }
    });
});

$(document).on('click','[the-id=addRbtn]',function(){

    // var roleId=$('#sid').val();
    var gid=$('#s-gid').val();
    var did=$('#s-fdid').val();
    var spath=$('#s-fpath').val();
    var author=$('#s-author').val();
    var icon=$('#s-icon').val();
    var title=$('#s-title').val();
    var desc=$('#s-desc').val();
    // var content=encodeURI( ue.getContent() );
    var content=ue.getContent();
    var time=$('#s-time').val();
    var other=$('#s-other').val();

    // if($(document.getElementById('edui_iframe_xit8oqi0j').contentWindow.document.body).html()){
    //     icon=JSON.parse ($(document.getElementById('edui_iframe_xit8oqi0j').contentWindow.document.body).html()).url;
    // }else{
    //     icon='';
    // }

    $.ajax({
        // url:helper.host+'/api/file/add?gid='+gid+'&did='+did+'&fpath='+spath+'&author='+author+'&icon='+icon+'&title='+title+'&desc='+desc+'&content='+content+'&time='+time+'&other='+other,
        url:helper.host+'/api/file/add',
        // dataType:'jsonp',
        type:'post',
        data:{
            gid:gid,
            did:did,
            fpath:spath,
            author:author,
            icon:icon,
            title:title,
            desc:desc,
            content:content,
            time:time,
            other:other
        },
        success:function(str){
            var res=JSON.parse(str);
            var ret=res.ret;
            var msg=res.msg;
            if(ret!=1){
                alert(msg);
                return false;
            }
            alert('文件添加成功');
            $('[data-dismiss=modal]').trigger('click');
        }
    });

});


//edit
$(document).on('click','[the-id=editGbtn]',function(){
    var roleId=$('#addGame').attr('data-role');
    var gid=$('#g-gid').val();
    var gname=$('#g-gname').val();
    var gpath=$('#g-gpath').val();

    if( !(gid&&gname&&gpath) ){
        alert('请填写编辑游戏的数据');
        return false;
    }

    $.ajax({
        url:helper.host+'/api/game/update?id='+roleId+'&gid='+gid+'&gname='+gname+'&gpath='+gpath,
        dataType:'jsonp',
        type:'get',
        success:function(res){
            var ret=res.ret;
            var msg=res.msg;
            if(ret!=1){
                alert(msg);
                return false;
            }
            alert('游戏编辑成功');
            $('[data-dismiss=modal]').trigger('click');
        }
    });
});

$(document).on('click','[the-id=editCbtn]',function(){
    var roleId=$('#addContent').attr('data-role');
    var gid=$('#c-gid').val();
    var did=$('#c-fcid').val();
    var dname=$('#c-cname').val();
    var dpath=$('#c-tname').val();
    var dpath_sub=$('#c-stname').val();

    if( !(gid&&did&&dname&&dpath&&dpath_sub) ){
        alert('请填写编辑目录的数据');
        return false;
    }

    $.ajax({
        url:helper.host+'/api/dir/update?id='+roleId+'&gid='+gid+'&did='+did+'&dname='+dname+'&dpath='+dpath+'&dpath_sub='+dpath_sub,
        dataType:'jsonp',
        type:'get',
        success:function(res){
            var ret=res.ret;
            var msg=res.msg;
            if(ret!=1){
                alert(msg);
                return false;
            }
            alert('目录编辑成功');
            $('[data-dismiss=modal]').trigger('click');
        }
    });


});

$(document).on('click','[the-id=editRbtn]',function(){
    var roleId=$('#s-id').val();
    var gid=$('#s-gid').val();
    var did=$('#s-fdid').val();
    var spath=$('#s-fpath').val();
    var author=$('#s-author').val();
    var icon;

    var title=$('#s-title').val();
    var desc=$('#s-desc').val();
    // var content=encodeURI( ue.getContent() );
    var content=ue.getContent();
    var time=$('#s-time').val();
    var other=$('#s-other').val();

    console.log(content);

    icon=$('#s-icon').val();
    // if( $(document.getElementById('edui_iframe_xit8oqi0j').contentWindow.document.body).html() ){
    //     icon=JSON.parse ($(document.getElementById('edui_iframe_xit8oqi0j').contentWindow.document.body).html()).url;
    // }else{
    //     icon=$('#sIconHidden').val();
    // }


    $.ajax({
        // url:helper.host+'/api/file/update?id='+roleId+'&gid='+gid+'&did='+did+'&fpath='+spath+'&author='+author+'&icon='+icon+'&title='+title+'&desc='+desc+'&content='+content+'&time='+time+'&other='+other,
        url:helper.host+'/api/file/update',
        // dataType:'jsonp',
        data:{
            id:roleId,
            gid:gid,
            did:did,
            fpath:spath,
            author:author,
            icon:icon,
            title:title,
            desc:desc,
            content:content,
            time:time,
            other:other
        },
        type:'post',
        success:function(str){
            var res=JSON.parse(str);
            var ret=res.ret;
            var msg=res.msg;
            if(ret!=1){
                alert(msg);
                return false;
            }
            alert('文件编辑成功');
            $('[data-dismiss=modal]').trigger('click');
        }
    });
});

//del file
$(document).on('click','[the-id=resourceDel]',function(){
    var roleId=$(this).attr('data-role');
    var judge=confirm('确认删除？');
    if(judge){
        $.ajax({
            url:helper.host+'/api/file/del?id='+roleId,
            type:'get',
            dataType:'jsonp',
            success:function(res){
                // console.log(res);
                var ret=res.ret;
                var msg=res.msg;
                if(ret!=1){
                    alert(msg);
                    return false;
                }
                alert('删除成功');
                $('[data-dismiss=modal]').trigger('click');
            }
        })
    }
});


$(document).on('click','[the-id=resourceRel]',function(){
    var roleId=$(this).attr('data-role');
    // var judge=confirm('确认删除？');
    // if(judge){
    $.ajax({
        url:helper.host+'/api/file/release?id='+roleId,
        type:'get',
        dataType:'jsonp',
        success:function(res){
            // console.log(res);
            var ret=res.ret;
            var msg=res.msg;
            if(ret!=1){
                alert(msg);
                return false;
            }
            alert('发布成功');
            $('[data-dismiss=modal]').trigger('click');
        }
    });
    // }
});

$('#edui_input_xit8oqi0j').change(function(){
    var thisVal=$(this).val();
    var _iframe=document.getElementById('edui_iframe_xit8oqi0j');

    if(!thisVal){
        $(_iframe.contentWindow.document.body).html('');
        return false;
    }
    _iframe.onload=function(){
        console.log( $(_iframe.contentWindow.document.body).html() );
        $('#s-icon').val( encodeURI( JSON.parse( $(_iframe.contentWindow.document.body).html() ).url ) );
        console.log(2);
    };

    $('#edui_form_xit8oqi0j').submit();
});
