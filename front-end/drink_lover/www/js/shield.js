initializeRatings();
initializeQR1();
initializeQR2();
initializeChart1();
initializeGrid1();
initializeProgress1();
initializeSparkline1();
initializeSparkline2();
initializeSparkline3();

function initializeProgress1() {
    $("#progress1").shieldProgressBar({
        min: 0,
        max: 100,
        value: 87,
        layout: "circular",
        layoutOptions: {
            circular: {
                borderColor: "#FF7900",
                width: 17,
                borderWidth: 3,
                color: "#1E98E4",
                backgroundColor: "transparent"
            }
        },
        text: {
            enabled: true,
            template: '<span style="font-size:52px;color:#1E98E4;">{0:n0}%</span> '
        }
    });
}

function initializeGrid1() {
    $("#grid1").shieldGrid({
        dataSource: {
            data: gridData
        },
        sorting: {
            multiple: false
        },
        paging: {
            pageSize: 8,
            pageLinksCount: 10
        },
        selection: {
            type: "row",
            multiple: true,
            toggle: false
        },
        columns: [
            { field: "id", title: "ID" },
            { field: "name", title: "Person Name" },
            { field: "company", title: "Company Name" },
            { field: "email", title: "Email Address" }
        ]
    });
}

function initializeChart1() {
    var data1 = getRandomArray(20, 1, 50);
    var data2 = getRandomArray(20, 20, 70);

    $("#chart1").shieldChart({
        theme: "light",
        exportOptions: {
            image: false,
            print: false
        },
        primaryHeader: {
            text: "Performance Data"
        },
        tooltipSettings: {
            axisMarkers: {
                enabled: true,
                mode: 'x',
                width: 2,
                zIndex: 3,
                drawColor: "white"
            }
        },
        dataSeries: [
            {
                seriesType: 'bar',
                collectionAlias: 'Achieved',
                data: data1
            },
            {
                seriesType: 'line',
                collectionAlias: 'Target',
                data: data2
            }
        ]
    });
}

function initializeSparkline1() {
    var data1 = getRandomArray(70, 1, 100);

    $("#sparkline1").shieldChart({
        theme: "light",
        exportOptions: {
            image: false,
            print: false
        },
        tooltipSettings: {
            chartBound: true,
            axisMarkers: {
                enabled: true,
                mode: 'x'
            },
            customHeaderText: '',
            customPointText: function (point, chart) {
                return shield.format(
                    '<span><b>{value}</b></span>',
                    {
                        value: point.y
                    }
                );
            },
        },
        chartAreaPaddingTop: -7,
        chartLegend: {
            enabled: false
        },
        seriesSettings: {
            line: {
                activeSettings: {
                    pointHoveredState: {
                        enabled: false
                    }
                },
                pointMark: {
                    enabled: false
                }
            }
        },
        axisX: {
            axisTickText: {
                enabled: false
            },
            plotStripWidth: 0,
            drawWidth: 0,
            ticksWidth: 0,
            ticksHeight: 0
        },
        axisY: {
            axisTickText: {
                enabled: false
            },
            plotStripWidth: 0,
            drawWidth: 0,
            ticksWidth: 0
        },
        dataSeries: [{
            seriesType: "line",
            data: data1
        }
        ]
    });
}

function initializeSparkline2() {
    var data1 = getRandomArray(70, 1, 100);

    $("#sparkline2").shieldChart({
        theme: "light",
        exportOptions: {
            image: false,
            print: false
        },
        tooltipSettings: {
            chartBound: true,
            axisMarkers: {
                enabled: true,
                mode: 'x'
            },
            customHeaderText: '',
            customPointText: function (point, chart) {
                return shield.format(
                    '<span><b>{value}</b></span>',
                    {
                        value: point.y
                    }
                );
            },
        },
        chartAreaPaddingTop: -7,
        chartLegend: {
            enabled: false
        },
        seriesSettings: {
            bar: {
                activeSettings: {
                    pointHoveredState: {
                        enabled: false
                    }
                },
                pointMark: {
                    enabled: false
                }
            }
        },
        axisX: {
            axisTickText: {
                enabled: false
            },
            plotStripWidth: 0,
            drawWidth: 0,
            ticksWidth: 0,
            ticksHeight: 0
        },
        axisY: {
            axisTickText: {
                enabled: false
            },
            plotStripWidth: 0,
            drawWidth: 0,
            ticksWidth: 0
        },
        dataSeries: [{
            seriesType: "bar",
            data: data1
        }
        ]
    });
}

function initializeSparkline3() {
    var data1 = getRandomArray(70, 1, 100);

    $("#sparkline3").shieldChart({
        theme: "light",
        exportOptions: {
            image: false,
            print: false
        },
        tooltipSettings: {
            chartBound: true,
            axisMarkers: {
                enabled: true,
                mode: 'x'
            },
            customHeaderText: '',
            customPointText: function (point, chart) {
                return shield.format(
                    '<span><b>{value}</b></span>',
                    {
                        value: point.y
                    }
                );
            },
        },
        chartAreaPaddingTop: -7,
        chartLegend: {
            enabled: false
        },
        seriesSettings: {
            area: {
                activeSettings: {
                    pointHoveredState: {
                        enabled: false
                    }
                },
                pointMark: {
                    enabled: false
                }
            }
        },
        axisX: {
            axisTickText: {
                enabled: false
            },
            plotStripWidth: 0,
            drawWidth: 0,
            ticksWidth: 0,
            ticksHeight: 0
        },
        axisY: {
            axisTickText: {
                enabled: false
            },
            plotStripWidth: 0,
            drawWidth: 0,
            ticksWidth: 0
        },
        dataSeries: [{
            seriesType: "area",
            data: data1
        }
        ]
    });
}

function initializeQR1() {
    $("#qr1").shieldQRcode({
        mode: "byte",
        size: 150,
        value: "Mike Smith",
        style: {
            color: "#1E97E3"
        }
    });
}

function initializeQR1() {
    $("#qr1").shieldQRcode({
        mode: "byte",
        size: 150,
        value: "Mike Smith",
        style: {
            color: "#1E97E3"
        }
    });
}

function initializeQR2() {
    $("#qr2").shieldQRcode({
        mode: "byte",
        size: 150,
        value: "Avarage: 6.3",
        style: {
            color: "#1E97E3"
        }
    });
}

function initializeRatings() {

    $('#rate1').shieldRating({
        max: 7,
        step: 0.1,
        value: 6.3,
        markPreset: false
    });
    $('#rate2').shieldRating({
        max: 7,
        step: 0.1,
        value: 6,
        markPreset: false
    });
    $('#rate3').shieldRating({
        max: 7,
        step: 0.1,
        value: 4.5,
        markPreset: false
    });
    $('#rate4').shieldRating({
        max: 7,
        step: 0.1,
        value: 5,
        markPreset: false
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(length, min, max) {
    var array = [];
    for (var boudary = 0; boudary < length; boudary++) {
        array.push(getRandomInt(min, max));
    }

    return array;
}
