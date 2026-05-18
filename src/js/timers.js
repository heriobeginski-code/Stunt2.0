// Time Conversion & Slider Engine for Genie Training App

export function getFormattedTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}

export function calculatePhaseWindows(totalMinutes, phaseCount) {
    const now = new Date();
    const windows = [];
    let currentMarker = new Date(now.getTime());
    const minutesPerPhase = Math.floor(totalMinutes / phaseCount);

    for (let i = 0; i < phaseCount; i++) {
        const startStr = currentMarker.toTimeString().split(' ')[0].substring(0, 5);
        currentMarker.setMinutes(currentMarker.getMinutes() + minutesPerPhase);
        const endStr = currentMarker.toTimeString().split(' ')[0].substring(0, 5);
        
        windows.push({ start: startStr, end: endStr });
    }
    return windows;
}

export function startMacroCountdown(onTick, onComplete) {
    let secondsLeft = 60;
    const interval = setInterval(() => {
        secondsLeft--;
        onTick(secondsLeft);
        
        if (secondsLeft <= 0) {
            clearInterval(interval);
            onComplete();
        }
    }, 1000);
    
    return interval;
}