const yargs = require('yargs');

async function runCommand (fn, ...args) {
  try {
    await fn(...args);
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
}

yargs
  .command({
    command: 'change-input',
    desc: 'Setup the receiver to have audio from given input at given volume',
    builder: yargs => yargs
      .option('input', {
        descrition: 'Which input should the receiver should be set to',
        type: 'string',
        default: 'HDMI1',
        choices: ['TUNER', 'HDMI1', 'HDMI2', 'HDMI3', 'HDMI4', 'HDMI5', 'AV1', 'AV2', 'AV3', 'AV4', 'AV5', 'AV6', 'V-AUX', 'AUDIO1', 'AUDIO2', 'Rhapsody', 'SiriusXM', 'Pandora', 'Spotify', 'AirPlay', 'SERVER', 'NET RADIO', 'USB']
      })
      .option('volume', {
        description: 'Which volume should the receive be set (in negative), so higher = lower volume',
        type: 'number',
        default: 30
      }),
    handler ({input, volume}) {
      runCommand(require('../src/request'), input, volume);
    }
  })
  .strict()
  .demandCommand(1)
  .version()
  .help()
  .parse();
