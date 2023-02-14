import MorseConverter from "morse-key-converter";
import easymidi from "easymidi"
import {sleep} from "./js/utils.js";

const morseConverter = new MorseConverter()
const virtualInput = new easymidi.Output('Virtual Morse Input', true);


import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    const message = req.query.message;
    console.log('message: ' + message)
    let morseCode = morseConverter.encodeText(message);
    console.log('morse: ' + morseCode)
    console.log(morseCode)
    playMorseAsMidi(morseCode);

    res.send(`playing <br><strong>"${message}"</strong><br> translated to morse: ${morseCode} <br> as midi`)
})

app.listen(port, () => {
    console.log(`Midi Morse app listening on port ${port}`)
})


const sendNoteon =
    (input, {note = 64, velocity = 127}) => {
        input.send('noteon', {
            note: note,
            velocity: velocity,
            channel: 1
        });
    }
const sendNoteoff =
    (input, {note = 64, velocity = 127}) => {
        input.send('noteoff', {
            note: note,
            velocity: velocity,
            channel: 1
        });
    }

async function playMorseAsMidi(morseMessage) {
    for (let character of morseMessage) {
        console.log(character)
        let message;
        switch (character) {
            case "." : // short
                message = {velocity: 100};
                sendNoteon(virtualInput, message)
                await sleep(300);
                break;
            case"-": // long
                message = {velocity: 127};
                sendNoteon(virtualInput, message)
                await sleep(600);
                break;
            case"/": // new word
                message = {note: 50, velocity: 50};
                sendNoteon(virtualInput, message)
                await sleep(900);
                break;
            default: //space
                //do nothing
                message = {};
                await sleep(150);
                break
        }
        sendNoteoff(virtualInput, message)
    }
}


/*
* midi note values : https://computermusicresource.com/midikeys.html
*
* mogelijke runs: http://localhost:3000/?message=morse%20naar%20midi%20is%20cool
* */
