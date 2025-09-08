// == Data ==
const database = {
    "31-08-2025": { ClashRoyale: 67, Instagram: 43, TikTok: 34 },
    "01-09-2025": { ClashRoyale: 212, Instagram: 58, Reddit: 45, TikTok: 34, X: 23 },
    "02-09-2025": { ClashRoyale: 127, Instagram: 53, Reddit: 23 },
    "03-09-2025": { ClashRoyale: 97, Instagram: 45, TikTok: 32 },
    "04-09-2025": { ClashRoyale: 64, Instagram: 32, Reddit: 28 },
    "05-09-2025": { ClashRoyale: 45, Instagram: 36, TikTok: 12 },
    "06-09-2025": { ClashRoyale: 28, Instagram: 21, Reddit: 15 },
};

const appSpecifications = {
    ClashRoyale: { name: "Clash Royale", color: "#0057B7", icon: 'clashroyale' },
    Instagram: { name: "Instagram", color: "#C13584", icon: 'instagram' },
    TikTok: { name: "TikTok", color: "#00F5FF", icon: 'tiktok' },
    Reddit: { name: "Reddit", color: "#FF4500", icon: 'reddit' },
    X: { name: "X", color: "#2E2E2E", icon: 'x' },
}

// == Variables ==
const days = Object.keys(database);
let currentDayIndex = days.indexOf("01-09-2025")

const barLabels = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sab."];
const barData = Object.values(database).map(day => {
    return Object.values(day).reduce((total, time) => total + time, 0);
});
const totalTime = formatTime(Object.values(database).flatMap(day => Object.values(day)).reduce((sum, mins) => sum + mins, 0));
document.getElementById('weeklyTotal').textContent = `${totalTime}`;

const dailyChart = document.getElementById('dailyUsageChartCanvas');
let doughnutChart = null;
const weeklyChart = document.getElementById('weeklyUsageChartCanvas');

// == Utils ==
function getAppSpec(app) {
    return appSpecifications[app] || { name: app, color: "#F00FFF", icon: "default" };
}

function formatTime(time) {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h${mins}min`;
}

function formatDate(dateStr) {
    const days = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sab."];
    const months = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
    const [day, month, year] = dateStr.split('-');
    const dateObj = new Date(year, month - 1, day);
    const dayWeek = days[dateObj.getDay()];
    return `${dayWeek}, ${parseInt(day)} de ${months[month - 1]}`;
}

function renderAppList(dayData) {
    const html = Object.keys(dayData).map(app => {
        const { name, icon } = getAppSpec(app);
        return `
        <li class="appCard">
            <img class="appIcon" src="img/${icon}icon.png">
            <div class="appInfo">
                <p class="appName">${name}</p>
                <p class="appTime">${formatTime(dayData[app])}</p>
            </div>
        </li>
    `;
    }).join('');
    document.querySelector('.appList').innerHTML = html;
}

function createDoughnutChart(dailyChart, labels, data, colors) {
    return new Chart(dailyChart, {
        type: 'doughnut',
        options: {
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.raw;
                            return `Tempo de uso: ${formatTime(value)}`
                        }
                    }
                }
            },
        },
        data: {
            labels,
            datasets: [{
                label: 'Tempo de uso',
                data,
                backgroundColor: colors,
                borderWidth: 0
            }]
        }
    });
}

// == Navigation ==
document.getElementById('prevDay').onclick = function () {
    if (currentDayIndex > 0) {
        currentDayIndex--;
        updateDailyChart(currentDayIndex);
    }
}
document.getElementById('nextDay').onclick = function () {
    if (currentDayIndex < days.length - 1) {
        currentDayIndex++;
        updateDailyChart(currentDayIndex);
    }
}

updateDailyChart(currentDayIndex);

// == Charts ==

function updateDailyChart(dayIndex) {
    const dayKey = days[dayIndex];
    const dayData = database[dayKey];

    const apps = Object.keys(dayData);
    const labels = apps.map(app => getAppSpec(app).name);
    const colors = apps.map(app => getAppSpec(app).color);
    const data = apps.map(app => dayData[app]);
    let dayTotal = data.reduce((sum, t) => sum + t, 0)

    if (!doughnutChart) {
        doughnutChart = createDoughnutChart(dailyChart, labels, data, colors);
    } else {
        doughnutChart.data.labels = labels;
        doughnutChart.data.datasets[0].data = data;
        doughnutChart.update();
    }

    document.getElementById('dayInfo').textContent = formatDate(dayKey);
    document.getElementById('dayTime').textContent = `${formatTime(dayTotal)}`;

    renderAppList(dayData);
}

new Chart(weeklyChart, {
    type: 'bar',
    options: {
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw;
                        return `Tempo de uso: ${formatTime(value)}`
                    }
                }
            }
        },
        scales: { y: { display: false } },
    },
    data: {
        labels: barLabels,
        datasets: [{
            label: 'Minutos de uso',
            data: barData,
            backgroundColor: '#7322DA',
            borderRadius: 8
        }]
    }
});