const receiverUrl = 'http://192.168.1.13/YamahaRemoteControl/ctrl';
const config = {
  headers: {'Content-Type': 'text/xml'},
  responseType: 'text'
};

async function doRequest (request) {
  return axios.post(receiverUrl, request, config);
}

function powerOnRequest () {
  return '<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>On</Power></Power_Control></Main_Zone></YAMAHA_AV>';
}

function buildInputRequest (input) {
  return `<YAMAHA_AV cmd="PUT"><Main_Zone><Input><Input_Sel>${input}</Input_Sel></Input></Main_Zone></YAMAHA_AV>`;
}

function buildVolumeRequest (volume) {
  return `<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>-${volume}0</Val><Exp>1</Exp><Unit>dB</Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>`;
}

async function run (input, volume) {
  await doRequest(powerOnRequest());
  await doRequest(buildInputRequest(input));
  await doRequest(buildVolumeRequest(volume));
}

run('HDMI3', 31);
