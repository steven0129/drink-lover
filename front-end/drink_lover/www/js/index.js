const _element = Symbol('element')
const _instance1 = Symbol('instance1')
class customHTMLElement { // html UI重寫
    constructor() {
        this[_element] = null
        this[_instance1] = null
    }

    setElement(element) {
        this[_element] = element
    }

    show() {
        this[_element].style.display = 'block'
    }

    hide() {
        this[_element].style.display = 'none'
    }

    html(value) {
        this[_element].innerHTML = value
    }

    getInstance() {
        if (!this[_instance1]) this[_instance1] = new customHTMLElement()
        return this[_instance1]
    }
}

const _elementDrink = Symbol('elmentDrink')
const _instanceDrink = Symbol('instanceDrink')
const _infoDrink = Symbol('nameDrink')

class drinkInfo extends customHTMLElement { // 隨選飲料店資訊
    constructor() {
        super()
        this[_elementDrink] = null
        this[_instanceDrink] = null
        this[_infoDrink] = new Object()
        this[_infoDrink].name = null // 店家名稱
        this[_infoDrink].address = null // 地址
        this[_infoDrink].status = null // 營業狀態
        this[_infoDrink].rating = null // Google社群評等
        this[_infoDrink].map = null // 地圖
    }

    setInfo() {
        Object.keys(this[_infoDrink]).map((key, index) => {
            this[_infoDrink][key] = arguments[index]
        })
    }

    getInfo() {
        return this[_infoDrink]
    }

    getInstance() {
        if (!this[_instanceDrink]) this[_instanceDrink] = new drinkInfo()
        return this[_instanceDrink]
    }
}

// TODO：訂單資訊模組
// TODO：

(function () {
    "use strict";

    var myApp = new Framework7({
        animateNavBackIcon: true
    });

    var $$ = Dom7;

    var mainView = myApp.addView('.view-main', {
        dynamicNavbar: true,
        domCache: true
    });

    var appUrl = 'https://drink-lover.azurewebsites.net'
    var client = null
    var table = null
    var tableName = 'menu'
    var useOfflineSync = false


    document.addEventListener('deviceready', onDeviceReady, false)

    function onDeviceReady() {
        client = new WindowsAzure.MobileServiceClient(appUrl)
        // initComponent()
        // newLocation()

        console.log('device is ready!!')
    }

    function newLocation() {
        getLocationAsync().then((position) => {
            return randomDrinkAsync(position.coords.latitude + ',' + position.coords.longitude)
        }).then((results) => {
            return new Promise((resolve, reject) => {
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
                // randomOrder((string) => document.getElementById('orderID').innerHTML = string)
                resolve(display.name)
            })
        }).then((name) => {
            return searchMenuImgAsync(name)
        }).then((response) => {
            return new Promise((resolve, error) => {
                let json = JSON.parse(response)
                let imgUrl = json.value[0].contentUrl
                document.getElementById('menu1').src = imgUrl
                document.getElementById('menu2').src = imgUrl
            })
        }).then(() => {
            return randomOrderAsync()
        }).then((orderID) => {
            document.getElementById('orderID').innerHTML = orderID
            document.getElementById('insertMenuBtn').removeEventListener('click')
            document.getElementById('insertMenuBtn').addEventListener('click', () => {
                table.insert({
                    menuID: orderID,
                    content: 'begin'
                }).done((insertedItem) => { }, (error) => {
                    throw new Error('Error loading data: ', error)
                })
            })
        })
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

        table = client.getTable(tableName)
        table.read().then((results) => {
            results.map((value, index) => {
                console.log(value)
            })
        }, (error) => {
            throw new Error('Error loading data: ', error)
        })

        // table.insert({
        //     menuID: 'test ID2',
        //     content: 'testing2'
        // }).done((insertedItem) => { }, (error) => {
        //     throw new Error('Error loading data: ', error)
        // })

        // document.getElementById('insertMenuBtn').addEventListener('click', () => {
        //     table.insert({

        //     })
        // })
    }

    function getLocationAsync() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position)
            }, (error) => {
                reject(error.message)
            })
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

    function randomDrinkAsync(location) { // 隨機找出附近飲料店
        return new Promise((resolve, reject) => {
            client.invokeApi('placesinfo', {
                body: { location: location },
                method: 'POST'
            }).done((results) => {
                resolve((results))
            }, (error) => {
                reject(error.message)
            })
        })
    }

    function randomOrderAsync() {
        return new Promise((resolve, reject) => {
            client.invokeApi('random', {
                body: null,
                method: 'POST'
            }).done((results) => {
                let response = results.responseText
                resolve(response)
            }, (error) => {
                reject('error: ' + error.message)
            })
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
            reject('error: ' + error.message)
        })
    }

    function searchMenuImgAsync(str) {
        return new Promise((resolve, reject) => {
            client.invokeApi('imagesearch', {
                body: { q: str },
                method: 'POST'
            }).done((results) => {
                let response = results.responseText
                resolve(response)
            }, (error) => {
                alert(error.message)
            })
        })
    }


})();