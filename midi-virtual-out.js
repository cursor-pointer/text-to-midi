import MT from 'midi-test'

const MIDI_NAME = 'VIRTUAL MIDI-Out';
const port = new MT.MidiDst(MIDI_NAME);
let time = new Date();
console.log(`${time.getMinutes()}:${time.getUTCSeconds()}`, 'Virtuel Midi Started as "', MIDI_NAME, '"');

port.receive = function (msg) {
    let time = new Date();
    console.log(`${time.getMinutes()}:${time.getUTCSeconds()}`, 'received:', msg);
};
port.connect();
//...
// port.disconnect();
