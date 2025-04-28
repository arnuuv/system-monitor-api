# System Monitor API

A lightweight Node.js server that provides real-time system information via simple API endpoints.

## Features

- CPU Info (model, cores, architecture, load average)
- Memory Info (total, free, used, usage %)
- OS Info (type, release, version, platform, hostname)
- User Info (username, home directory, etc.)
- Network Info (network interfaces)
- Process Info (pid, memory usage, uptime, etc.)
- System Uptime
- Human-readable formats for bytes and time
- CORS enabled for API access

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/system-monitor-api.git
cd system-monitor-api
```

2. Install dependencies:

```bash
npm install
```

*(No extra packages required unless you want advanced disk information.)*

## Usage

Start the server:

```bash
node server.js
```

Server will run at:  
**http://localhost:3000**

## Available API Endpoints

| Endpoint | Description |
| :------- | :---------- |
| `/api/all` | Get all system information |
| `/api/cpu` | CPU information |
| `/api/memory` | Memory information |
| `/api/os` | Operating system information |
| `/api/user` | User information |
| `/api/network` | Network interfaces information |
| `/api/process` | Node.js process information |
| `/api/uptime` | System uptime |

## Example

To get CPU information, send a GET request to:  
`http://localhost:3000/api/cpu`

Example output:

```json
{
  "model": "Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz",
  "cores": 12,
  "architecture": "x64",
  "loadAvg": [0.72, 0.65, 0.55]
}
```

## Notes

- Disk information requires an additional module like `diskusage`. It's currently a placeholder.
- Only **GET** methods are supported.
- Handles **CORS** and **OPTIONS** preflight requests.

## License

This project is open-source and free to use under the MIT License.
