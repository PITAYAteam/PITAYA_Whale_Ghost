
// Load Hnode library
var hnode = require('./Hnode');

// Create new server
var server = new hnode.Server();

// Event: when a new node is detected
server.on('newnode', function(node) {

  // Event: when the node start
  node.on('start', function(node){
    // console.log('start '+this.ip+' '+this.name+' (v'+this.version+')')

    var nList = []
    server.getAllNodes().forEach((node) => { if (node.isRunning) nList.push(node.name.split('-')[1]) });
    console.log('TOTAL nodes: '+nList.length)

    // console.log('ALL nodes: '+nList.sort())
  });

  // Event: when the node goes online
  node.on('online', function(node){ console.log('online '+this.ip+' '+this.name) });

  // Event: when the node goes offline
  node.on('offline', function(node){ console.log('offline '+this.ip+' '+this.name) });

  // Event: when the node stop
  node.on('stop', function(node){ console.log('stop '+this.ip+' '+this.name) });

  // Event: when the node stop
  // node.on('fps', function(fps){ console.log('FPS '+this.name+' '+fps) });
  //node.on('sent', function(packet){ console.log('sending '+this.name+' '+packet) });

  // Manual locked rate
  // node.lockRate(1000/60);

});

// Set up a custom animation
var count = 0;
function animate() {
  this.blackout();          // switch off every leds
  this.getAllNodes().forEach(function(node) {
    color = [5,5,5]
   	color = [100,100,100]
   	//if ((count % 90) == 10) color = [255,0,0]

    // if (count%100 > 10)
    // for (var k=0; k<90; k++) {
    // node.setLed(0, k, color);
    // node.setLed(1, k, color);
    // node.setLed(2, k, color);
    //   node.setLed(3, k, color);
    // }

    node.setLed(0, count%90, color);
    node.setLed(1, count%90, color);
    node.setLed(2, count%90, color);
    node.setLed(3, count%90, color);
    node.setLed(4, count%90, color);
    node.setLed(5, count%90, color);

  });
  count += 1;
}

// Bind animation to Server sequencer
server.on('tick', animate);

// Set Server sequencer timing @ 50 FPS
server.setRate(1000/70);

// Start server
server.start();
