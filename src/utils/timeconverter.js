export const TimeConverter = (function() {
    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const convertStringToDate = function(str) {
        let todayDate = new Date();

        if (str == "today") {
            return todayDate;
        }

        if (str == "tomorrow") {
            todayDate.setDate(todayDate.getDate() + 1);
            return todayDate;
        }

        if (str.length > 9) {
            todayDate = new Date(str);
            return todayDate;
        }
    }

    const convertDateToString = function(date) {

        let todayDate = new Date(date);

        if (date == "Tomorrow" || date == "Today") {
            return date;
        }
        
        let day = todayDate.getDate();
        let month = monthsList[todayDate.getMonth()];

        let year = todayDate.getYear();

        if (day == new Date().getDate() && month == monthsList[new Date().getMonth()]) {
            return "Today";
        }

        if (day == new Date().getDate() + 1 && month == monthsList[new Date().getMonth()]) {
            return "Tomorrow";
        }

        if (day > new Date().getDate() + 1 || day >= new Date().getDate() && todayDate.getMonth() >= new Date().getMonth()) {
            return `${day} ${month.slice(0, 3)}, 20${String(year).slice(1)}`
        }

        if (day < new Date().getDate()|| day < new Date().getDate() && month <= new Date().getMonth()) {
            return `${day} ${month.slice(0, 3)}, 20${String(year).slice(1)}`
        }

        return "error";
    }

    const checkExpiryDate = function(date) {
        let todayDate = new Date(date);
        let day = todayDate.getDate();
        let month = todayDate.getMonth();

        if (day < new Date().getDate() || month < new Date().getMonth()) {
            return "expiry";
        }
    }

    const getMonthStr = function(id) {
        return monthsList[id];
    }

    return {
        convertStringToDate,
        convertDateToString,
        checkExpiryDate,
        getMonthStr
    }
})();
