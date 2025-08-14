console.log("script loaded");

const ctx = document.getElementById('usageChartCanvas');

new Chart(ctx, {
    type: 'doughnut',
    options: {
        cutout: '75%',
        responsive: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        // ! maintainAspectRatio: true,
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