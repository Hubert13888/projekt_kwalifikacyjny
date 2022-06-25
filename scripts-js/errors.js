const errorHandler = (err) => {
    switch (err.msg) {
        case "timeOut":
            resetAllContent();
            alert(ERROR_MSG.timeOut);
            console.error("Connection timeout", err.info);
            break;
        case "ajaxError":
            resetAllContent();
            alert(ERROR_MSG.connection);
            console.error("Error with connecting random user API", err.info);
            break;
        case "noData":
            resetAllContent();
            alert(ERROR_MSG.noData);
            console.error("Error with retrieving data", err.info);
            break;
        case "badDataProcess":
            resetAllContent();
            alert(ERROR_MSG.connection);
            console.error("Bad user data process", err.info);
            break;
        case "badWindowOnload":
            alert(ERROR_MSG.loading);
            console.error("Bad data process on window load", err.info);
            break;
        default:
            alert(ERROR_MSG.loading);
            console.error("An unexpected error occured!");
    }
};
const ERROR_MSG = {
    timeOut: "Koniec czasu oczekiwania na odpowiedź!",
    connection: "Coś nie działa... Odśwież stronę i spróbuj ponownie!",
    loading: "Błąd ładowania zawartości strony.",
    noData: "Nie otrzymano żadnych danych od serwera! Proszę nie spamować w przycisk i zaczekać chwilę :)"
};
//# sourceMappingURL=errors.js.map