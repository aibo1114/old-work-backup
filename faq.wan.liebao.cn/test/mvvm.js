function Pubsub (scope){
    var pubsub={
        callbacks: {},

        on: function(msg, cb){
            this.callbacks[msg]= this.callbacks[msg] || [];
            this.callbacks[msg].push(cb);
        },

        publish: function(msg){
            for (var i=0,len=this.callbacks[msg].length; i<len; i++) this.callbacks[msg][i].apply(this, arguments);
        }
    },
    message=scope+':change';

    evtHandler=function(e){
        var ele=e.target || e.srcElemnt,
            model=ele.getAttribute('data-bind-'+scope);

        if ( model && model!='' ) {
            // pubsub.publish(message, model, v);
            pubsub.publish(message, model, ele.value);
        }
    };

    document.addEventListener('keyup', evtHandler, false);

    // 执行流:new Pubsub() -> 将 menu:change 方法 存入调度中心(callbacks对象)  [对]
    pubsub.on(message, function(message, model, v){
        var nodes= document.querySelectorAll('[data-bind-'+scope+'='+model+']');

        for (var i=0,len=nodes.length; i<len; i++){
            var nodeName=nodes[i].tagName.toLowerCase();

            nodeName == 'input' || nodeName == 'textarea' || nodeName == 'select' ? nodes[i].value=v : nodes[i].innerText=v;
        }
    });


    return pubsub;
}

function Component (scope){
    var binder= new Pubsub(scope),

        component= {
            models: {},

            get: function(model){
                return this.models[model];
            },

            set: function(model, v){
                this.models[model]= v;
                binder.publish(scope+':change', model, v);
            },
            _binder: binder
        };

    return component;
}

var menu= new Component('menu');
menu.set("type","005eac");








