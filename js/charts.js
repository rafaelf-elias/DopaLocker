import { database, days, barLabels, barData, formatDate, formatTime, getAppSpec, getTotalPerApp } from './script.js';
import { renderAppList, renderAppTotalsList } from './global.js';

let currentDayIndex = days.indexOf("06-09-2025");
if(currentDayIndex === -1) {
    currentDayIndex = days.length - 1;
}
const dailyChart = document.getElementById('dailyUsageChartCanvas');
let doughnutChart = null;
const weeklyChart = document.getElementById('weeklyUsageChartCanvas');

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
    document.getElementById('dayTime').textContent = formatTime(dayTotal);

    renderAppList(dayData);
}

if (weeklyChart) {
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
    renderAppTotalsList(getTotalPerApp());
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

updateDailyChart(currentDayIndex);

const prevDayBtn = document.getElementById('prevDay');
const nextDayBtn = document.getElementById('nextDay')

if (prevDayBtn) {
    prevDayBtn.onclick = function () {
        if (currentDayIndex > 0) {
            currentDayIndex--;
            updateDailyChart(currentDayIndex);
        }
    }
}

if (nextDayBtn) {
    nextDayBtn.onclick = function () {
        if (currentDayIndex < days.length - 1) {
            currentDayIndex++;
            updateDailyChart(currentDayIndex);
        }
    }
}