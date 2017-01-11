(function () {
    "use strict";

    var myApp = new Framework7({
        animateNavBackIcon: true
    })

    var $$ = Dom7

    var mainView = myApp.addView('.view-main', {
        dynamicNavbar: true,
        domCache: true
    })

    var appUrl = 'https://drink-lover.azurewebsites.net'
    var client = null
    var table = null
    var tableName = 'menu'
    var useOfflineSync = false
    var instance = [
        (new customHTMLElement).getInstance(),
        (new drinkInfo).getInstance(),
        (new orderInfo).getInstance(),
        (new customerInfo).getInstance(),
        (new azureMobileApp).getInstance(),
        (new localSensor).getInstance(),
        (new mathPlugin).getInstance()
    ]

    document.addEventListener('deviceready', onDeviceReady, false)

    function onDeviceReady() {
        let asyncProcess = null
        instance[4].setClient(appUrl)

        instance[0].setElement(document.querySelector('.prompt-title-ok'))
        instance[0].click(() => {
            myApp.prompt('請輸入訂單編號', '查詢訂單', (value) => {
                mainView.router.loadPage('#inquireOrder')
            })
        })

        instance[0].setElement(document.getElementById('orderManagement'))
        instance[0].disable()
        instance[4].randomDrinkAsync('24.113305, 120.662819').then((info) => {
            let random = instance[6].getRandomInt(0, info.results.length - 1)
            let bestResult = info.results[random]
            if (typeof (bestResult.name) !== 'undefined') instance[1].setName(bestResult.name)
            if (typeof (bestResult.formatted_address) !== 'undefined') instance[1].setAddress(bestResult.formatted_address)
            if (typeof (bestResult.opening_hours) !== 'undefined') instance[1].setStatus(bestResult.opening_hours.open_now)
            if (typeof (bestResult.rating) !== 'undefined') instance[1].setRating(bestResult.rating)
            if (typeof (bestResult.name) !== 'undefined') instance[1].setMap(instance[5].getStaticMap(bestResult.geometry.location.lat + ',' + bestResult.geometry.location.lng))
            instance[1].updateUI()
            return instance[4].randomOrderAsync()

        }).then((orderID) => {
            instance[2].setOrderID(orderID)
            return instance[4].searchMenuImgAsync(instance[2].getInfo().name)
            
        }).then((info) => {
            instance[2].setMenu('<img src="' + info.value[0].contentUrl + '" width="100%">')
            instance[2].updateUI()
        })


        // instance[5].getLocationAsync().then((result) => {
        //     console.log(result)
        // })

        // client = new WindowsAzure.MobileServiceClient(appUrl)
        // initComponent()
        // newLocation()

        // var object = new orderInfo
        //         var instance1 = (new orderInfo).getInstance()
        //         instance1.setInfo('sss', '<img src="http://pic.pimg.tw/archive/1384765159-533673620_n.jpg?v=1384765161" width="100%">')
        //         instance1.updateUI()

        //         var object2 = new drinkInfo
        //         var instance2 = object2.getInstance()
        //         instance2.setInfo('ssssss', 'aqaqa', 'aass', 'eeee', '<img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap \
        // &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318 \
        // &markers=color:red%7Clabel:C%7C40.718217,-73.998284 \
        // &key=AIzaSyB1FeVNtCVEF6QKTquVuRYdX5IxInJZuYY" width="100%">')
        //         instance2.updateUI()

        //         var object3 = new customerInfo
        //         var instance3 = object3.getInstance()
        //         instance3.add('高宇哲', 'ssss')
        //         instance3.add('steven', 'aaaaa')
        //         console.log(instance3.get())
        //         setTimeout(() => {
        //             instance3.remove('高宇哲')
        //             console.log(instance3.get())
        //         }, 10000)

        //         var object4 = new customHTMLElement
        //         var instance4 = object4.getInstance()
        //         instance4.setElement(document.querySelector('.prompt-title-ok'))
        //         instance4.click(() => {
        //             myApp.prompt('請輸入訂單編號', '查詢訂單', (value) => {
        //                 mainView.router.loadPage('#inquireOrder')
        //             })
        //         })


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
})();