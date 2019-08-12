// Generated by CoffeeScript 1.12.7
(function() {
  var PROTO_PATH, grpc, hello_proto, main;

  PROTO_PATH = __dirname + '/../protos/helloworld.proto';

  grpc = require('grpc');

  hello_proto = grpc.load(PROTO_PATH).helloworld;

  main = function() {
    var client, user;
    client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
    user = void 0;
    if (process.argv.length >= 3) {
      user = process.argv[2];
    } else {
      user = 'world';
    }
    client.sayHello({
      name: user
    }, function(err, response) {
      console.log('Greeting:', response.message);
    });
  };

  main();

}).call(this);

//# sourceMappingURL=client.js.map
