(function () {
    "use strict";
    var instance = [
        (new customHTMLElement).getInstance(),
        (new drinkInfo).getInstance(),
        (new orderInfo).getInstance(),
        (new customerInfo).getInstance(),
        (new azureMobileApp).getInstance(),
        (new localSensor).getInstance(),
        (new mathPlugin).getInstance(),
        (new imageProcess).getInstance(),
        (new facebookInfo).getInstance()
    ]

    var myApp = new Framework7({ animateNavBackIcon: true })
    var $$ = Dom7
    var appUrl = 'https://drink-lover.azurewebsites.net'
    var mainView = myApp.addView('.view-main', {
        dynamicNavbar: true,
        domCache: true
    })



    document.addEventListener('deviceready', onDeviceReady, false)

    function onDeviceReady() {
        instance[4].setClient(appUrl)
        initPromptTitle('查詢訂單', '請輸入訂單編號')
        initOpenPreloader()
        initDelete()
        newOrderClick()
        delOldOrderClick()
        checkLocalStorage()
        refreshButton()

        // navigator.geolocation.getCurrentPosition((position) => {
        //     newDrinkGen(position.coords.latitude + ',' + position.coords.longitude)
        // }, (error) => {
        //     myApp.alert('請開啟GPS')
        //     navigator.app.exitApp()
        // })

        instance[0].setElement(document.querySelector('#auth'))
        instance[0].hide()
        instance[0].setElement(document.querySelector('#fbLoginButton'))
        instance[0].click(() => {
            let client = instance[4].getClient()
            client.login('facebook').done((results) => {
                let url = client.applicationUrl + '/.auth/me'
                let headers = new Headers()
                headers.append('X-ZUMO-AUTH', client.currentUser.mobileServiceAuthenticationToken)
                fetch(url, { headers: headers })
                    .then(function (data) {
                        return data.json()
                    }).then(function (user) {
                        console.log(user)
                        instance[8].setUserId(user[0].user_claims[0].val)
                        instance[8].setUserName(user[0].user_claims[2].val)
                        instance[0].setElement(document.querySelector('#facebookLogin'))
                        instance[0].hide()
                        instance[0].setElement(document.querySelector('#auth'))
                        instance[0].show()
                        myApp.alert(instance[8].getUserName() + '您好')
                    })
            }, (err) => {
                myApp.alert('error: ' + error)
            })
        })

        instance[0].setElement(document.querySelector('#fbLogoutButton'))
        instance[0].click(() => {
            let client = instance[4].getClient()
            client.logout().then(() => {
                instance[0].setElement(document.querySelector('#facebookLogin'))
                instance[0].show()
                instance[0].setElement(document.querySelector('#auth'))
                instance[0].hide()
            })

        })
        newDrinkGen('25.024684,121.526914')
    }

    function newDrinkGen(location) {
        myApp.showPreloader()
        instance[4].randomDrinkAsync(location).then((info) => {
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
            return instance[4].searchMenuImgAsync(instance[1].getInfo().name)

        }).then((info) => {
            let imgUrl = info.images.value[0].contentUrl
            instance[2].setMenu('<img src="' + imgUrl + '" width="100%">')
            instance[2].updateUI()
            myApp.hidePreloader()
        })
    }

    function refreshButton() {
        instance[0].setElement(document.querySelector('#refresh'))
        instance[0].click(() => {
            // navigator.geolocation.getCurrentPosition((position) => {
            //     newDrinkGen(position.coords.latitude + ',' + position.coords.longitude)
            // }, (error) => {
            //     myApp.alert('請開啟GPS')
            //     navigator.app.exitApp()
            // })

            newDrinkGen('25.024684,121.526914')
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
            instance[0].setElement(document.getElementById('oldMenu'))
            instance[0].html(JSON.parse(localStorage.getItem('tempOrder')).menu)
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

    function initDelete() {
        $$('.swipeout').on('swipeout:deleted', (e) => {
            let id = e.target.id
            instance[4].setTable('menu')
            instance[4].deleteData(id)
        })
    }

    function initPromptTitle(title, content) {
        instance[0].setElement(document.querySelector('.prompt-title-ok'))
        instance[0].click(() => {
            myApp.prompt(content, title, (value) => {
                myApp.showPreloader()
                instance[4].setTable('order')
                instance[4].selectAllByOrderID(value).then((results) => {
                    return new Promise((resolve, reject) => {
                        if (typeof (results[0]) !== 'undefined') {
                            instance[0].setElement(document.getElementById('inquireName'))
                            instance[0].html(results[0].name)
                            instance[0].setElement(document.getElementById('inquireOrderID'))
                            instance[0].html(results[0].orderID)
                            instance[3].setCustomerId(results[0].orderID)
                            instance[0].setElement(document.getElementById('inquireMenu'))
                            instance[0].html(results[0].menu)
                            instance[0].setElement(document.getElementById('addCustomer'))
                            instance[0].click(() => {
                                instance[4].setTable('menu')
                                instance[4].insertTable({
                                    name: document.getElementById('newCustomerName').value,
                                    orderID: instance[3].getCustomerId()
                                }).then((insertedItem) => {
                                    instance[0].setElement(document.getElementById('customer-list'))
                                    instance[0].addList(document.getElementById('newCustomerName').value, insertedItem.id)
                                    document.getElementById('newCustomerName').value = ''
                                    initDelete()
                                })
                            })
                            resolve()

                        } else {
                            myApp.alert('查無此訂單')
                            myApp.hidePreloader()
                            reject()
                        }
                    })

                }).then(() => {
                    instance[4].setTable('menu')
                    return instance[4].selectAllByOrderID(value)
                }).then((results) => {
                    instance[0].setElement(document.getElementById('customer-list'))
                    instance[0].html('')
                    if (typeof (results) !== 'undefined')
                        results.map((value, index) => instance[0].addList(value.name, value.id))

                    initDelete()
                    mainView.router.loadPage('#inquireOrder')
                    myApp.hidePreloader()
                })
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
                    menu: instance[2].getInfo().menu,
                    name: instance[1].getInfo().name
                }).then((insertedItem) => {
                    localStorage.setItem('tempOrder', JSON.stringify({
                        orderID: instance[2].getInfo().orderID,
                        menu: instance[2].getInfo().menu,
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
            instance[4].selectIDByOrderID(JSON.parse(localStorage.getItem('tempOrder')).orderID).then((id) => {
                return instance[4].deleteData(id)

            }).catch((error) => {
                console.log(error)
                localStorage.removeItem('tempOrder')
                checkLocalStorage()
                mainView.router.back()
                myApp.hidePreloader()
            }).then(() => {
                localStorage.removeItem('tempOrder')
                checkLocalStorage()
                mainView.router.back()
                myApp.hidePreloader()
            })
        })
    }
})();