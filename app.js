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
  const secs = Math.floor(seconds % 60);
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

//Get CPU info
function getCpuInfo(){
  const model = os.cpus()[0].model
  const cores = os.cpus().length
  const architecture = os.arch()
  const loadAvg = os.loadavg()
  return { model, cores, architecture, loadAvg }
}

//Get memory info
function getMemoryInfo(){
  const total = os.totalmem()
  const free = os.freemem()
  const used = total - free
  const percentUsed = (used / total * 100).toFixed(2)
  return {
    total: formatBytes(total),
    free: formatBytes(free),
    used: formatBytes(used),
    percentUsed: `${percentUsed}%`
  }
}

//Get os info
function getOsInfo(){
  const osType = os.type()
  const osRelease = os.release()
  const osVersion = os.version()
  const osPlatform = os.platform()
  const hostname = os.hostname()
  return { osType, osRelease, osVersion, osPlatform, hostname }
}

//Get user info
function getUserInfo(){
  return os.userInfo()
}

//Get network info
function getNetworkInfo(){
  return os.networkInterfaces()
}

//Get disk info
function getDiskInfo(){
  // This requires a third-party module like 'diskusage'
  // For now, return a placeholder message
  return { error: "Requires additional module like 'diskusage'" }
}

//Get process info
function getProcessInfo(){
  return {
    pid: process.pid,
    ppid: process.ppid,
    title: process.title,
    arch: process.arch,
    platform: process.platform,
    memoryUsage: process.memoryUsage(),
    uptime: formatTime(process.uptime()),
    versions: process.versions
  }
}

//Get system uptime
function getSystemUptime(){
  const uptime = os.uptime()
  return {
    uptime: formatTime(uptime),
    raw: uptime
  }
}

//Create a function to get all system info
function getAllSystemInfo() {
  return {
    cpu: getCpuInfo(),
    memory: getMemoryInfo(),
    os: getOsInfo(),
    user: getUserInfo(),
    network: getNetworkInfo(),
    process: getProcessInfo(),
    uptime: getSystemUptime()
  }
}

//! Http Server with proper API endpoints
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // Only handle GET requests
  if (req.method !== 'GET') {
    res.writeHead(405, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: 'Method not allowed'}));
    return;
  }
  
  // Route API requests
  if (path.startsWith('/api')) {
    res.setHeader('Content-Type', 'application/json');
    
    switch(path) {
      case '/api/all':
        res.writeHead(200);
        res.end(JSON.stringify(getAllSystemInfo()));
        break;
      case '/api/cpu':
        res.writeHead(200);
        res.end(JSON.stringify(getCpuInfo()));
        break;
      case '/api/memory':
        res.writeHead(200);
        res.end(JSON.stringify(getMemoryInfo()));
        break;
      case '/api/os':
        res.writeHead(200);
        res.end(JSON.stringify(getOsInfo()));
        break;
      case '/api/user':
        res.writeHead(200);
        res.end(JSON.stringify(getUserInfo()));
        break;
      case '/api/network':
        res.writeHead(200);
        res.end(JSON.stringify(getNetworkInfo()));
        break;
      case '/api/process':
        res.writeHead(200);
        res.end(JSON.stringify(getProcessInfo()));
        break;
      case '/api/uptime':
        res.writeHead(200);
        res.end(JSON.stringify(getSystemUptime()));
        break;
      default:
        res.writeHead(404);
        res.end(JSON.stringify({error: 'Endpoint not found'}));
    }
  } else {
    // Serve a simple HTML page for the root
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>System Monitor API</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            ul { list-style-type: none; padding: 0; }
            li { margin-bottom: 10px; }
            code { background-color: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <h1>System Monitor API</h1>
          <p>Available endpoints:</p>
          <ul>
            <li><code>/api/all</code> - All system information</li>
            <li><code>/api/cpu</code> - CPU information</li>
            <li><code>/api/memory</code> - Memory information</li>
            <li><code>/api/os</code> - Operating system information</li>
            <li><code>/api/user</code> - User information</li>
            <li><code>/api/network</code> - Network interfaces</li>
            <li><code>/api/process</code> - Process information</li>
            <li><code>/api/uptime</code> - System uptime</li>
          </ul>
        </body>
      </html>
    `);
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
