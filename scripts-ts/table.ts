/**
 * Inserts the same content into a table cells (with incrementing Lp. column)
 * @param content 
 */

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

/**
 * Gets the oldest X users from the user array
 * @param data - user array
 * @param limit - a number of oldest persons to return
 * @returns - X of oldest persons
 */

const getOldest = (data: User[], limit: number): User[] => {
    data.sort((a, b) => {
        if (a.dob.age < b.dob.age) return 1
        return -1
    })
    if(limit < data.length) data = data.slice(0, limit)
    return data
}

/**
 * Used for inserting new data from API to the table
 * @param data - users from API
 */

const insertDataToTable = (data: User[]) => {
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
}

/**
 * Show the table and hide its spinner
 */

const showTable = () => {
    let tableElement = document.querySelector('table'),
        spinnerElement = document.querySelector('.table_spinner'),
        tableWrapper = document.querySelector('.table_wrapper')
    tableElement.classList.remove('remove')
    spinnerElement.classList.remove('show')
    tableWrapper.classList.remove('loading')
}

/**
 * Hide the table and show its spinner
 */

const hideTable = () => {
    let tableElement = document.querySelector('table'),
        spinnerElement = document.querySelector('.table_spinner'),
        tableWrapper = document.querySelector('.table_wrapper')
    tableElement.classList.add('remove')
    spinnerElement.classList.add('show')
    tableWrapper.classList.add('loading')
}


const insertDummyData = () => insertSameContent('-')