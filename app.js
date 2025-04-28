const http = require('http');
const os = require('os');
const process = require('process');
const url = require('url');

//!Format bytes to human readable
function formatBytes(bytes,decimal = 2) {
    if (bytes ==0) return '0 bytes'
    //set base uni
    const k = 1024;
    const sizes = ["Bytes","KB","MB","GB","TB","PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimal)) + ' ' + sizes[i];
  }







  //?Format seconds to human readable
//Get CPU info
//Get memory info
//Get os info
//Get network info
//Get process
//! Http Server
//!Start a server