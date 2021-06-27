const { spawn } = require('child_process')

function runDockerContainers(cb) {
  spawn('docker', ['compose', 'up', '-d'], { stdio: 'inherit' })
    .on('close', cb)
}

function stopDockerContainers(cb) {
  spawn('docker', ['compose', 'down'], { stdio: 'inherit' })
    .on('close', function() {
      cb()
      process.exit()
    })
}

module.exports = {
  runDockerContainers,
  stopDockerContainers,
}
