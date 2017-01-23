'use strict';

module.exports = {
  killChildProcess: function(node, proc) {
    try {
      return proc.killProcess();
    } catch(err) {
      node.error(`Can\'t kill child process with pid ${proc.pid}! Details: ${err}`);
      return;
    }
  }
}
