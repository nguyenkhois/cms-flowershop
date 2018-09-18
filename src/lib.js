export function validateEmailAddress(sEmail) {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(sEmail);
}

export function forceKeyPressNumber(e) {
    // let userKeyPress = window.event ? e.which : e.keyCode;
    const userKeyPress = e.which;
    if (userKeyPress !== 8){
        if (userKeyPress < 48 || userKeyPress > 57){
            e.preventDefault(); //stop the key press
            return false;
        }
    }else
        return true;
}

// Make limited words within a paragraph
String.prototype.limitWords = function (limitNumber) {
    try {
        limitNumber = parseInt(limitNumber) || 0;
        if (limitNumber > 0 && this.length > 0)
            return this.split(" ").slice(0, limitNumber).join(" ");
    } catch (e) { }
};

// Convert an object array to JSON string
Array.prototype.toJSONString = function () {
    try {
        return JSON.stringify(this)
    } catch (e) { return e }
}

// Find an object index by its attribute value
Array.prototype.findIndexByProperty = function (sPropertyName, sPropertyValue) {
    try {
        return this.findIndex(objItem => objItem[sPropertyName] === sPropertyValue)
    } catch (e) { return e }
}

// Sort an array by object attribute (using for string)
Array.prototype.sortByAlphabet = function (sPropertyName, orderKeyword) {
    try {
        this.sort(function (a, b) {
            const x = a[sPropertyName].toUpperCase();
            const y = b[sPropertyName].toUpperCase();
            if (orderKeyword === 1) { //1 is mean descending
                if (x < y) { return 1; }
                if (x > y) { return -1; }
            } else { //0 or other is mean ascending
                if (x < y) { return -1; }
                if (x > y) { return 1; }
            }
            return 0;
        });
        return this;
    } catch (e) { return e }
}

// Sort an array by object attribute (using for numeric)
Array.prototype.sortByNumeric = function (sPropertyName, orderKeyword) {
    try {
        this.sort(function (a, b) {
            if (orderKeyword === 1) //1 is mean descending
                return b[sPropertyName] - a[sPropertyName];
            else //0 and other is mean ascending
                return a[sPropertyName] - b[sPropertyName];
        });
        return this;
    } catch (e) { return e }
}

// Filter an object array by object property
Array.prototype.filterByProperty = function (sPropertyName, sSeekingValue) {
    try {
        if (this.length > 0)
            return this.filter(objItem => objItem[sPropertyName] === sSeekingValue);
        else
            return []
    } catch (e) { return e }
}

// Remove an object (or many objects) in an object array by object property
Array.prototype.removeByProperty = function (sPropertyName, sSeekingValue) {
    try {
        if (this.length > 0)
            return this.filter(objItem => objItem[sPropertyName] !== sSeekingValue);
        else
            return []
    } catch (e) { return e }
}

// Return the max value in an object array by using object property
Array.prototype.getMax = function (sPropertyName) {
    try {
        const arrLength = this.length;
        if (this.length > 0) {
            let arrValues = [];
            for (let i = 0; i < arrLength; i++) {
                arrValues.push(this[i][sPropertyName]);
            }
            return Math.max(...arrValues)
        }
        return null
    } catch (e) { return e }
}