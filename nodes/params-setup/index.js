'use strict';

module.exports = function(RED) {
  function ParamsSetup(config) {
    RED.nodes.createNode(this, config);

    this.inputFormat = config.inputFormat || '';
    this.inputFramerate = config.inputFramerate || '30';
    this.inputParamsString = config.inputParamsString || '';
    this.inputSource = config.inputSource;

    this.outputPixFormat = config.outputPixFormat || 'rgb8';
    this.outputFormat = config.outputFormat || 'gif';
    this.outputParamsString = config.outputParamsString || '';
  }

  RED.nodes.registerType("princip-ffmpeg-params-setup", ParamsSetup);
}
