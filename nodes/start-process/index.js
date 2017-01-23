'use strict';

var pfstb = require('princip-ffmpeg-stream-to-buffer');
var utils = require('../../utils');

module.exports = function(RED) {
  function StartProcess(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    this.on('input', function(msg) {
      if (node.useParamsFromPayload) {
        node.params = msg.payload;
      } else {
        node.params = RED.nodes.getNode(config.params);
      }

      var inputSource = node.params.inputSource || '';
      if (!inputSource) {
        node.error(`Input source is needed.`);
        return;
      }

      var processes = node.context().global.get('princip-ffmpeg-processes') || [];
      for (var index in processes) {
        var rec = processes[index];
        if (rec.params.inputSource == node.params.inputSource) {
          utils.killChildProcess(node, rec.proc);
        }
      }

      try {
        var proc = pfstb.stream(node.params);
        processes.push({params: node.params, proc: proc});
        node.context().global.set('princip-ffmpeg-processes', processes);
      } catch(err) {
        node.error(`Can\'t create process for input source ${node.params.inputSource}. Details: ${err}`);
      }
    });
  }

  RED.nodes.registerType("princip-ffmpeg-start-process", StartProcess);
}
