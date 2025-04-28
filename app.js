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
function formatTime(seconds) {
  const days = Math.floor(seconds / (3600*24));
  const hours = Math.floor(seconds % ((3600*24)) / 3600);
  const minutes = Math.floor((seconds % 3600)/60);
  const seconds = Math.floor(seconds % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

//Get CPU info
function getCpuInfo(){
  const model = os.cpus()[0] .model
  const cores = os.cpus().length
  const architecture = os.arch()
  const loadAvg = os.loadavg()
  console.log(model,cores,architecture,loadAvg)
}

//Get memory info
function getMemoryInfo(){
  const total = os.totalmem()
  console.log(formatBytes(os.totalmem()))
  console.log(formatBytes(os.freemem()))
  console.log(formatBytes(os.freemem()/os.totalmem()*100))
}

//Get os info
function getOsInfo(){
  const osType = os.type()
  const osRelease = os.release()
  const osVersion = os.version()
  const osPlatform = os.platform()
  console.log(osType,osRelease,osVersion,osPlatform)
}


//Get network info
//Get process
//! Http Server
//!Start a server