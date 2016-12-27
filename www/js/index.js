(function () {
    "use strict";

    var appUrl = 'https://drink-lover.azurewebsites.net'
    var client = null
    var table = null
    var tableName = 'menu'
    var useOfflineSync = false

    document.addEventListener('deviceready', onDeviceReady, false)

    function onDeviceReady() {
        initComponent()
        client = new WindowsAzure.MobileServiceClient(appUrl)
        console.log(client)


        table = client.getTable(tableName)
        table.read().then((results) => {
            console.log(results)
        }, (error) => {
            console.log(error)
        })

        randomDrink('24.113287,120.661670')
        randomOrder((string) => document.getElementById('orderID').innerHTML = string)
        // searchMenuImg(''(response) => {
        //     let json = JSON.parse(response)

        // })
    }

    function initComponent() {
        hideComponent('orderServer')
        hideComponent('orderClient')

        document.getElementById('orderServerBtn').addEventListener('click', () => {
            displayComponent('orderServer')
            hideComponent('orderClient')
        })

        document.getElementById('orderClientBtn').addEventListener('click', () => {
            displayComponent('orderClient')
            hideComponent('orderServer')
        })
    }

    function displayComponent(id) {
        document.getElementById(id).style.display = 'block'
    }

    function hideComponent(id) {
        document.getElementById(id).style.display = 'none'
    }

    function randomInt(lower, upper) {
        return parseInt(upper * Math.random() + lower)
    }

    function randomDrink(location) {
        client.invokeApi('placesinfo', {
            body: { location: location },
            method: 'POST'
        }).done((results) => {
            let response = results.responseText
            let json = JSON.parse(response)
            let length = json.results.length
            let random = randomInt(0, length)
            let display = json.results[random]

            document.getElementById('drinkName').innerHTML = display.name
            document.getElementById('address').innerHTML = display.formatted_address

            try {
                if (display.opening_hours.open_now) document.getElementById('opening').innerHTML = '正在營業'
                else document.getElementById('opening').innerHTML = '已打烊'
            } catch (e) { }

            document.getElementById('rating').innerHTML = display.rating
        }, (error) => {
            console.log('error:' + error.message)
        })
    }

    function randomOrder(handler) {
        client.invokeApi('random', {
            body: null,
            method: 'POST'
        }).done((results) => {
            let response = results.responseText
            handler(response)
        }, (error) => {
            console.log('error: ' + error.message)
        })
    }

    function searchMenuImg(str, handler) {
        client.invokeApi('imagesearch', {
            body: null,
            method: 'POST'
        }).done((results) => {
            let response = results.responseText
            handler(response)
        }, (error) => {
            console.log('error: ' + error.message)
        })
    }
})();