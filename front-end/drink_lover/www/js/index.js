(function () {
    "use strict";
    var myApp = new Framework7({ animateNavBackIcon: true })
    var $$ = Dom7
    var mainView = myApp.addView('.view-main', {
        dynamicNavbar: true,
        domCache: true
    })

    var appUrl = 'https://drink-lover.azurewebsites.net'
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
        myApp.showPreloader()
        let asyncProcess = null
        instance[4].setClient(appUrl)
        initPromptTitle('查詢訂單', '請輸入訂單編號')
        initOpenPreloader()
        newOrderClick()
        delOldOrderClick()
        checkLocalStorage()
        newDrinkGen()
    }

    function newDrinkGen() {
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
            let imgUrl = info.value[0].contentUrl
            instance[2].setMenu('<img src="' + imgUrl + '" width="100%">')
            instance[2].updateUI()
            myApp.hidePreloader()
        })
    }

    function checkLocalStorage() {
        if (localStorage.getItem('tempOrder') !== null) {
            instance[0].setElement(document.getElementById('newOrder'))
            instance[0].disable()
            instance[0].setElement(document.getElementById('orderManagement'))
            instance[0].enable()
            instance[0].setElement(document.getElementById('oldOrderID'))
            instance[0].html(JSON.parse(localStorage.getItem('tempOrder')).orderID)
            instance[0].setElement(document.getElementById('oldName'))
            instance[0].html(JSON.parse(localStorage.getItem('tempOrder')).name)
        } else {
            instance[0].setElement(document.getElementById('orderManagement'))
            instance[0].disable()
            instance[0].setElement(document.getElementById('newOrder'))
            instance[0].enable()
        }
    }

    function initOpenPreloader() {
        let object = document.querySelectorAll('.open-preloader')
        Object.keys(object).map((key, index) => {
            instance[0].setElement(object[key])
            instance[0].click(() => myApp.showPreloader())
        })
    }

    function initPromptTitle(title, content) {
        instance[0].setElement(document.querySelector('.prompt-title-ok'))
        instance[0].click(() => {
            myApp.prompt(content, title, (value) => {
                mainView.router.loadPage('#inquireOrder')
            })
        })
    }

    function newOrderClick() {
        instance[0].setElement(document.getElementById('newOrder'))
        instance[0].click(() => {
            instance[0].setElement(document.querySelector('.orderGen'))
            instance[0].click(() => {
                instance[4].setTable('order')
                instance[4].insertTable({
                    orderID: instance[2].getInfo().orderID,
                    name: instance[1].getInfo().name
                }).then((insertedItem) => {
                    localStorage.setItem('tempOrder', JSON.stringify({
                        orderID: instance[2].getInfo().orderID,
                        name: instance[1].getInfo().name
                    }))

                    instance[0].setElement(document.getElementById('orderManagement'))
                    instance[0].enable()
                    instance[0].setElement(document.getElementById('newOrder'))
                    instance[0].disable()
                    checkLocalStorage()
                    mainView.router.back()
                    myApp.hidePreloader()
                })
            })
        })
    }

    function delOldOrderClick() {
        instance[0].setElement(document.getElementById('delOldOrder'))
        instance[0].click(() => {
            myApp.showPreloader()
            instance[4].setTable('order')
            instance[4].selectByOrderID(JSON.parse(localStorage.getItem('tempOrder')).orderID).then((id) => {
                console.log(id)
                return instance[4].deleteData(id)
            }).then(() => {
                localStorage.removeItem('tempOrder')
                checkLocalStorage()
                mainView.router.back()
                myApp.hidePreloader()
            })
        })
    }
})();