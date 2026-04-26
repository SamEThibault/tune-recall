// detectPitch(buffer, sampleRate) -> frequency

function find_closest_note(frequency: number): string {
    const NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    
    const n=12*Math.log2(frequency/440)+69
    const noteNumber=Math.round(n)
    const noteIndex=noteNumber%12
    const octave=Math.floor(noteNumber/12)-1

    return `${NOTES[noteIndex]}${octave}`
}

console.log(find_closest_note(440)); //should be A4
console.log(find_closest_note(110));// should be A2
console.log(find_closest_note(82));//E2