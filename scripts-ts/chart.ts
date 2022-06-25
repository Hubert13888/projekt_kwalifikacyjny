var chartfield //stores the chart's object

/**
 * Functions for handling the chart
 * Initializes a chart object over specified canvas
 *  @param ctx - canvas context
 */

const initChart = (ctx) => {
chartfield = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79'],
        datasets: [{
            label: 'Liczba osób w poszczególnych przedziałach wiekowych',
            data: [],
            backgroundColor: [
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        aspectRatio: 1,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

/**
 * Removes all the data in the chart and adds new from a data array
 * @param data - an array to draw a chart from, amount of people for each age group
 */

const loadNewChartData = (data: number[]) => {
    chartfield.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chartfield.update();
    chartfield.data.datasets.forEach((dataset) => {
        dataset.data.push(...data);
    });
    chartfield.update();
}

/**
 * Parses user data to fit the chart
 * @param users An array of users to parse
 * @returns An array of age groups
 */

const parseChartData = (users: User[]) : number[] => {
    let chartData = [0, 0, 0, 0, 0, 0]
    for(let user of users) {
        let age = user.dob.age
        if(isBetweet(age, 20, 29)) chartData[0]++
        if(isBetweet(age, 30, 39)) chartData[1]++
        if(isBetweet(age, 40, 49)) chartData[2]++
        if(isBetweet(age, 50, 59)) chartData[3]++
        if(isBetweet(age, 60, 69)) chartData[4]++
        if(isBetweet(age, 70, 79)) chartData[5]++
    }
    return chartData
}

/**
 * Shows the chart and hides its loading spinner
 */

const showChart = () => {
    let chartElement = document.querySelector('.data_chart'),
        spinnerElement = document.querySelector('.chart_spinner'),
        canvasWrapper = document.querySelector('.canvas_wrapper')
    chartElement.classList.remove('remove')
    spinnerElement.classList.remove('show')
    canvasWrapper.classList.remove('loading')
}

/**
 * Hides the chart and shows its loading spinner
 */

const hideChart = () => {
    
    let chartElement = document.querySelector('.data_chart'),
        spinnerElement = document.querySelector('.chart_spinner'),
        canvasWrapper = document.querySelector('.canvas_wrapper')
    chartElement.classList.add('remove')
    spinnerElement.classList.add('show')
    canvasWrapper.classList.add('loading')
}