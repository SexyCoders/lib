console.log("worker running");

var clients = new Array();
clients.length = 0;

var broadcast = function(clients, message) {
  var length = clients.length,
    element = null;
  for (var i = 0; i < length; i++) {
    port = clients[i];
    port.postMessage(message);
  }
}

self.addEventListener("connect", function (e) {
    var port = e.ports[0];

    clients.push(port);
    port.addEventListener("message", function (e) {
    console.log(JSON.stringify(e.data));
      var data = e.data;
      broadcast(clients, {"id": e.data.id, "said": e.data.message});
    })
    port.start();
    broadcast(clients, {"id":clients.length, "cmd": "connected"});

}, false);
