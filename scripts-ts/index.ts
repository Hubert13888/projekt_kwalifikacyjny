/**
 * Constructs a query string from provided object
 * Makes a request to RandommUser API and retrieves the random users' data
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
            if(doesntExist(data) || doesntExist(data?.results?.[0])) {
                return rej({msg: "noData", info: data?.info})
            }
            res(data.results)
        };
        conn.onerror = e => {
            rej({msg: "ajaxError", info: e})
        }
    })
    
};

/**
 * Handles refresh number stored in the session storage
 * @returns A number of the times the site has been refreshed already
 */

const countRefresh = () : number => {
    let numberOfRefreshes: number = Number(sessionStorage.getItem("refreshCounter"))
    if(doesntExist(numberOfRefreshes)) sessionStorage.setItem("refreshCounter", "1")
    else sessionStorage.setItem("refreshCounter", `${numberOfRefreshes + 1}`)
    return numberOfRefreshes
}

/**
 * Called on the page load, checks if this refresh is one the fifth refreshes. If so, it changes the backgrounds of paragraphs
 */

const onRefresh = () => {
    let numberOfRefreshes = countRefresh()
    if(numberOfRefreshes % 5 === 0 && numberOfRefreshes !== 0) {
        let toSetBackground = document.querySelectorAll('.container_h .bcg')
        console.log(toSetBackground)
        for(let elem of toSetBackground) {
            elem.classList.add('bcg_set')
        } 
    }
}



window.onload = () => {
    try {
        onRefresh()
        let canvas: HTMLCanvasElement = document.querySelector('.data_chart')
        initChart(canvas.getContext('2d'))
        insertDummyData()
    }
    catch(err) {
        errorHandler({msg: "badWindowOnload", info: err})
    }
}


/**
 * Handles the API communication after button click.
 */
const onclickDownloadContent = (params: ParamValues) => {
    const timeOutCounter = setTimeout(() => {
        errorHandler({msg: "timeOut", info: null})
    }, 3000)
    insertSpinners()

    downloadRandomUser(params).then(
        (data: User[]) => {
            clearTimeout(timeOutCounter)

            try {
                let newChartData = parseChartData(data)
                loadNewChartData(newChartData)
                showChart()
                
                insertDataToTable(data)
                showTable()
            }
            catch(err) {
                errorHandler({msg: "badDataProcess", info: err})
            }
        },
        (err) => {
            clearTimeout(timeOutCounter)
            errorHandler(err)
        })
}

const insertSpinners = () => {
    hideTable()
    hideChart()
}
const resetAllContent = () => {
    insertDummyData()
    loadNewChartData([])
    showChart()
    showTable()
}

const isBetweet = (v: number, a: number, b: number) => v > a && v <= b 
const doesntExist = (a: any) => !a