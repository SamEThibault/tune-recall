//Buffer is a snapshot of raw audio samples at a momemnt in time
//Each value in dataArray (buffer variable) represents a number (0-255) whcih is the amplittue of the audio at that moment
//If my sample rate is 48000hz and I have 2048 samples, timespan=2048/48000=~0.043 seconds

//Autocorrrlation algorithm
export function detectPitch(buffer: Uint8Array, sampleRate: number): number {
    

    const normalized = new Float32Array(buffer.length)
    for (let i = 0; i < buffer.length; i++) {
        normalized[i] = (buffer[i] - 128) / 128 //Shifts 0-255 to -1 to 1
    }

    const minLag = Math.floor(sampleRate / 400)  // Max freq ~400 Hz
    const maxLag = Math.floor(sampleRate / 50)   // Min freq ~50 Hz
    
    let maxCorr = 0
    let bestLag = 0
    
    for (let lag = minLag; lag < maxLag; lag++) {
        let sum = 0
        for (let i = 0; i < buffer.length - lag; i++) {
            sum += normalized[i] * normalized[i + lag]
        }
        
        if (sum > maxCorr) {
            maxCorr = sum
            bestLag = lag
        }
    }
    // Avoid division by zero
    if (bestLag === 0) return 0
    
    const frequency = sampleRate / bestLag
    return frequency
}