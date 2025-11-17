const { exec } = require('child_process');
const os = require('os');

exports.scanNetworks = async (req, res) => {
  try {
    const platform = os.platform();
    let command;

    if (platform === 'win32') {
      command = 'netsh wlan show networks mode=bssid';
    } else if (platform === 'linux') {
      command = 'nmcli -f SSID,SECURITY,SIGNAL dev wifi';
    } else if (platform === 'darwin') {
      command = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s';
    } else {
      return res.status(400).json({ error: 'Unsupported platform' });
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('WiFi scan error:', error);
        return res.status(500).json({ error: 'Failed to scan networks' });
      }

      const networks = parseNetworks(stdout, platform);
      res.json({ networks });
    });
  } catch (error) {
    console.error('WiFi scan error:', error);
    res.status(500).json({ error: 'Failed to scan networks' });
  }
};

function parseNetworks(output, platform) {
  const networks = [];

  if (platform === 'win32') {
    const lines = output.split('\n');
    let currentNetwork = null;

    lines.forEach(line => {
      if (line.includes('SSID')) {
        const ssid = line.split(':')[1]?.trim();
        if (ssid && ssid !== '') {
          currentNetwork = { name: ssid, security: 'Unknown', signal: 50 };
        }
      } else if (line.includes('Authentication') && currentNetwork) {
        const auth = line.split(':')[1]?.trim();
        currentNetwork.security = mapSecurity(auth);
      } else if (line.includes('Signal') && currentNetwork) {
        const signal = line.split(':')[1]?.trim().replace('%', '');
        currentNetwork.signal = parseInt(signal) || 50;
        networks.push({ ...currentNetwork });
        currentNetwork = null;
      }
    });
  } else if (platform === 'linux') {
    const lines = output.split('\n').slice(1);
    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 3) {
        networks.push({
          name: parts[0],
          security: mapSecurity(parts[1]),
          signal: parseInt(parts[2]) || 50
        });
      }
    });
  } else if (platform === 'darwin') {
    const lines = output.split('\n').slice(1);
    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 3) {
        networks.push({
          name: parts[0],
          security: mapSecurity(parts[6] || 'Open'),
          signal: Math.abs(parseInt(parts[2])) || 50
        });
      }
    });
  }

  return networks.filter(n => n.name && n.name !== '--');
}

function mapSecurity(auth) {
  if (!auth) return 'Open';
  const lower = auth.toLowerCase();
  if (lower.includes('wpa3') || lower.includes('wpa2')) return 'WPA2';
  if (lower.includes('wpa')) return 'WPA';
  if (lower.includes('wep')) return 'WEP';
  if (lower.includes('open') || lower === '--') return 'Open';
  return 'WPA2';
}
