import MT from 'midi-test'

const MIDI_NAME = 'VIRTUAL MIDI-In';
const port = new MT.MidiDst(MIDI_NAME);

export async function connect() {
    await port.connect();
}

export function sendMidi(message) {
}

//...
// port.disconnect();
