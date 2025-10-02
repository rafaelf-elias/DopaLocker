// == Data ==
export const database = {
    "31-08-2025": { ClashRoyale: 67, Instagram: 43, TikTok: 34 },
    "01-09-2025": { ClashRoyale: 212, Instagram: 58, Reddit: 45, TikTok: 34, X: 23 },
    "02-09-2025": { ClashRoyale: 127, Instagram: 53, Reddit: 23 },
    "03-09-2025": { ClashRoyale: 97, Instagram: 45, TikTok: 32 },
    "04-09-2025": { ClashRoyale: 64, Instagram: 32, Reddit: 28 },
    "05-09-2025": { ClashRoyale: 45, Instagram: 36, TikTok: 12 },
    "06-09-2025": { ClashRoyale: 28, Instagram: 21, Reddit: 15 },
};

export const appSpecifications = {
    ClashRoyale: { name: "Clash Royale", color: "#0057B7", icon: 'clashroyale' },
    Instagram: { name: "Instagram", color: "#C13584", icon: 'instagram' },
    TikTok: { name: "TikTok", color: "#00F5FF", icon: 'tiktok' },
    Reddit: { name: "Reddit", color: "#FF4500", icon: 'reddit' },
    X: { name: "X", color: "#2E2E2E", icon: 'x' },
}

// == Utils ==
export function getAppSpec(app) {
    return appSpecifications[app] || { name: app, color: "#F00FFF", icon: "default" };
}

export function formatTime(time) {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h${mins}min`;
}

export function formatDate(dateStr) {
    const days = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sab."];
    const months = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
    const [day, month, year] = dateStr.split('-');
    const dateObj = new Date(year, month - 1, day);
    const dayWeek = days[dateObj.getDay()];
    return `${dayWeek}, ${parseInt(day)} de ${months[month - 1]}`;
}

export function getTotalPerApp() {
    const totals = {};
    Object.keys(database).forEach(dayKey => {
        const dayData = database[dayKey];
        Object.keys(dayData).forEach(app => {
            const time = dayData[app]
            if(totals[app]) {
                totals[app] += time;
            } else {
                totals[app] = time;
            }
        });
    });
    return totals;
}

export const days = Object.keys(database);
export const barLabels = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sab."];
export const barData = Object.values(database).map(day => {
    return Object.values(day).reduce((total, time) => total + time, 0);
});