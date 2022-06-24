var chartfield

const initChart = () => {
const ctx = document.getElementById('dataChart').getContext('2d');
chartfield = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79'],
        datasets: [{
            label: 'Liczba osób w poszczególnych przedziałach wiekowych',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
 * 
 * @param params:
 * Object with parameters for the query
 * @returns 
 * Promise: resolve the user data, reject errors
 */

const downloadRandomUser = (params) : Promise<User[]> => {
    const conn = new XMLHttpRequest();

    let paramsKeys = Object.keys(params),
        constructedQuery: string = ""
    for (let i = 0; i < paramsKeys.length; i++) {
        if(i == 0) constructedQuery += `?${paramsKeys[i]}=${params[paramsKeys[i]]}`
        else constructedQuery += `&${paramsKeys[i]}=${params[paramsKeys[i]]}`
    }

    return new Promise((res, rej) => {
        conn.open("GET", `https://randomuser.me/api/${constructedQuery}`);
        conn.responseType = "json"
        conn.send();

        conn.onload = (e) => {
            let data = conn.response as unknown as RandomUserResponse
            res(data.results)
        };
        conn.onerror = e => {
            rej(e)
        }
    })
    
};
const isBetweet = (v: number, a: number, b: number) => v > a && v <= b 

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

const onclickDownloadContent = (params: ParamValues) => {
    const timeOutCounter = setTimeout(() => {
        alert(ERROR_MSG.timeOut)
        insertDummyData()
    }, 3000)
    insertSpinners()

    downloadRandomUser(params).then(
        (data: User[]) => {
            clearTimeout(timeOutCounter)

            let newChartData = parseChartData(data)
            loadNewChartData(newChartData)

            let dataFiltered = getOldest(data, 10)
            let tableInner = document.querySelector('table tbody');

            tableInner.innerHTML = "";
            let counter = 0, newContent = "";

            for(let userFiltered of dataFiltered) { 
                newContent += `<tr>
                    <th scope="row">${counter + 1}</th>
                    <td><img src="${userFiltered.picture.thumbnail}"/></td>
                    <td>${userFiltered.name.first}</td>
                    <td>${userFiltered.name.last}</td>
                    <td>${userFiltered.dob.age}</td>
                    <td>${userFiltered.email}</td>
                    <td>${userFiltered.phone}</td>
                    <td>${userFiltered.location.city}</td>
                    <td>${userFiltered.location.state}</td>
                </tr>`
                counter++;
            }
            tableInner.innerHTML = newContent
        },
        (err) => {
            clearTimeout(timeOutCounter)
            errorHandler({msg: "ajaxError", info: err})
        })
}


const getOldest = (data: User[], limit: number): User[] => {
    data.sort((a, b) => {
        if (a.dob.age < b.dob.age) return 1
        return -1
    })
    if(limit < data.length) data = data.slice(0, limit)
    return data
}

const errorHandler = (err : ErrorMsg) => {
    switch(err.msg) {
        case "ajaxError":
            insertDummyData()
            return console.log("Error with connecting random user API", err.info)
        default:
            return console.log("An unexpected error occured!")
    }
}

const insertSameContent = (content: string) => {
    let numberOfCols = document.querySelectorAll('table thead th').length
    let table = document.querySelector('table tbody'), amount = 10

    let generatedString = "", finalDummyContent = ""
    for(let i=0; i<numberOfCols-1; i++) generatedString += `<td>${content}</td>`
    generatedString += "</tr>"

    for(let i=0; i<amount; i++)  {
        finalDummyContent += `<tr><th scope="row">${i+1}</th>` + generatedString
    }
    table.innerHTML = finalDummyContent
}

const insertSpinners = () => insertSameContent(`
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
`)
const insertDummyData = () => insertSameContent(`-`)

window.onload = () => {
    initChart()
    insertDummyData()
}

const ERROR_MSG = {
    timeOut: "Koniec czasu oczekiwania na odpowiedź!"
}


interface ErrorMsg {
    msg: string;
    info: any;
}

/**
 * results - number of results
 * nat - nationality: One of the following:
 * AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US
 * gender - male/female
 */
interface ParamValues {
    nat: string,
    results: number,
    gender: string
}
interface User {
    gender: "male"|"female",
          name: {
            title: "mr"|"ms"|"mrs",
            first: string,
            last: string
          },
          location: {
            street: string,
            city: string,
            state: string,
            postcode: number,
            coordinates: {
              latitude: number,
              longitude: number
            },
            timezone: {
              offset: string,
              description: string
            }
          },
          email: string,
          login: {
            uuid: string,
            username: string,
            password: string,
            salt: string,
            md5: string,
            sha1: string,
            sha256: string
          },
          dob: {
            date: Date,
            age: number
          },
          registered: {
            date: Date,
            age: number
          },
          phone: string,
          cell: string,
          id: {
            name: string,
            value: string
          },
          picture: {
            large: string,
            medium: string,
            thumbnail: string
          },
          nat: string
}

interface RandomUserResponse {
    results: User[],
    info: {
    seed: string,
    results: number,
    page: number,
    version: number
    }
}