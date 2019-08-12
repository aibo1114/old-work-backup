ip = require('ip')

#PROTO_PATH = __dirname + '/bin/grpc/center.proto'
PROTO_PATH = '/Users/alex/Pictures/grpc/front/front.proto'
grpc = require('grpc')
front = grpc.load(PROTO_PATH).front

getCid = (call, callback) ->
    log 'getCid'
    log call.request
    callback null, ret: 1, cid: ip.address()

push = (call, callback) ->
    log 'push'
    log call.request.uid
    log call.request.msg
    callback null, ret: 1, message: 'zzzzz'

notify = (call, callback) ->
    log 'notify'
    log call.request
#    callback null, ret: 1, message: 'Hello message'

server = new grpc.Server()
server.addProtoService front.Front.service,
    push: push
    notify: notify
    getCid: getCid

server.bind '0.0.0.0:12390', grpc.ServerCredentials.createInsecure()
server.start()

log server
log 'grpc server started'
