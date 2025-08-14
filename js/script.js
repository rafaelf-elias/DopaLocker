console.log("script loaded");

const ctx = document.getElementById('dailyUsageChartCanvas');

new Chart(ctx, {
    type: 'doughnut',
    options: {
        cutout: '75%',
        plugins: { legend: { display: false } },
    },
    data: {
        labels: ['Tiktok', 'Instagram', 'X', 'Reddit', 'Clash Royale'],
        datasets: [{
        label: 'Minutos de uso',
        data: [65, 63, 47, 44, 42],
        backgroundColor: [
            '#25F4EE', '#C13584', '#484848', '#FF4500', '#1E4D92'
        ],
        borderWidth: 0
        }],
    },
});

const ctx2 = document.getElementById('weeklyUsageChartCanvas');

new Chart(ctx2, {
    type: 'bar',
    options: {
        plugins: { legend: { display: false } },
        scales: { y: { display: false } },
    },
    data: {
        labels: ['Dom.', 'Seg.', 'Ter', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
        datasets: [{
            label: 'Minutos de uso',
            data: [65, 63, 47, 44, 42, 10, 0],
            backgroundColor: '#7322DA',
            borderRadius: 8 
        }]
    }
});