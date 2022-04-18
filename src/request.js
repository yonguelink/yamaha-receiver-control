const axios = require('axios');
const { promisify } = require('util');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

const doWait = promisify(setTimeout);

const receiverUrl = 'http://10.0.0.13/YamahaRemoteControl/ctrl';
const config = {
  headers: { 'Content-Type': 'text/xml' },
  responseType: 'text'
};
const lastRunFile = path.join(__dirname, '..', 'last-run.log');

async function doRequest (request) {
  return axios.post(receiverUrl, request, config);
}

function powerOnRequest () {
  return '<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>On</Power></Power_Control></Main_Zone></YAMAHA_AV>';
}

function powerOffRequest () {
  return '<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>Standby</Power></Power_Control></Main_Zone></YAMAHA_AV>';
}

function buildInputRequest (input) {
  return `<YAMAHA_AV cmd="PUT"><Main_Zone><Input><Input_Sel>${input}</Input_Sel></Input></Main_Zone></YAMAHA_AV>`;
}

function buildVolumeRequest (volume) {
  return `<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>-${volume}0</Val><Exp>1</Exp><Unit>dB</Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>`;
}

async function updateLastTimeRan () {
  await fs.ensureDir(path.dirname(lastRunFile));
  await fs.writeFile(lastRunFile, moment().format('YYYY-MM-DDTHH:mm:ss'));
}

async function shouldPowerOff () {
  if (await fs.pathExists(lastRunFile)) {
    const data = await fs.readFile(lastRunFile, 'utf8');
    const lastRunMoment = moment(data.replace('\n', ''), 'YYYY-MM-DDTHH:mm:ss', true);
    return !lastRunMoment.isBefore(moment().subtract(5, 'minutes'));
  }
  return true;
}

module.exports.changeInput = async function (input, volume) {
  if (await shouldPowerOff()) {
    await doRequest(powerOffRequest());
    await doWait(500);
  }

  await doRequest(powerOnRequest());
  await doRequest(buildInputRequest(input));
  await doRequest(buildVolumeRequest(volume));

  await updateLastTimeRan();
};

module.exports.turnOff = async function () {
  await doRequest(powerOffRequest());
};

module.exports.changeVolume = function (volume) {
  return doRequest(buildVolumeRequest(volume));
};
