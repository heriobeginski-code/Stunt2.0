// Storage Manager for Genie Training Engine

const STORAGE_KEYS = {
    CONFIG: 'genie_engine_config',
    HISTORY: 'genie_session_vault'
};

const DEFAULT_CONFIG = {
    duration: "60",
    schedule: {
        "Monday": "Flexibility & Mobility",
        "Tuesday": "Martial Arts Drills",
        "Wednesday": "Stunts & Falls",
        "Thursday": "Acrobatics & Balance",
        "Friday": "Weight & Strength",
        "Saturday": "Active Recovery Stretch",
        "Sunday": "Rest & Strategy"
    }
};

export function getEngineConfig() {
    const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!stored) {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
        return DEFAULT_CONFIG;
    }
    return JSON.parse(stored);
}

export function saveEngineConfig(duration, schedule) {
    const updatedConfig = { duration, schedule };
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updatedConfig));
    return updatedConfig;
}

export function cacheSessionToVault(sessionPayload) {
    const vault = getSessionVault();
    const cachedItem = {
        id: 'session_' + Date.now(),
        timestamp: new Date().toLocaleString(),
        discipline: sessionPayload.discipline,
        duration: sessionPayload.duration,
        phases: sessionPayload.phases
    };
    
    vault.unshift(cachedItem); 
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(vault));
    return cachedItem;
}

export function getSessionVault() {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
}