var LepvMemoryChart = function(divName) {

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    LepvChart.call(this, divName);

    this.chartTitle = "RAM Chart";
    this.chartHeaderColor = 'green';

    this.maxDataCount = 150;
    this.refreshInterval = 2;

    this.char = new Object();

    this.dataUrlPrefix = "/status/memory/";

    this.updateChartHeader();
    this.initEvents();
};

LepvMemoryChart.prototype = Object.create(LepvChart.prototype);
LepvMemoryChart.prototype.constructor = LepvMemoryChart;

var option = {
    title: {
        text: 'ECharts'
    },
    tooltip: {},
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

var option1 = {
    title: {
        text: 'ECharts -衬衫'
    },
    tooltip: {},
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ["衬衫1", "衬衫2", "衬衫3", "衬衫4", "衬衫5", "衬衫6"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [15, 20, 6, 50, 60, 80]
    }]
};
var option3 = {
    title: {
        x: "center",
        text: 'ECharts -雪纺衫'
    },
    tooltip: {
        axisPointer: {
            type: 'shadow'
        },
        trigger: 'item',
        formatter: function(params) {
            // console.log(params.data.label);
            var res = params.name + '<br/>';
            res += "value: " + params.data.value + '<br/>';
            res += "addr: " + params.data.label.key;
            return res;
        }
    },
    legend: {
        bottom: "0%",
        data: ['s', 'm', 'l']
    },
    xAxis: [{
        data: ["雪纺衫1", "雪纺衫2", "雪纺衫3", "雪纺衫4", "雪纺衫5", "雪纺衫6"]
    }],
    yAxis: {},
    series: [{
        name: 's',
        type: 'bar',
        z: 1,
        data: data1
    }, {
        name: 'm',
        type: 'bar',
        z: 1,
        data: data2
    }, {
        name: 'l',
        type: 'bar',
        z: 1,
        data: data3
    }]
};
var dummy = [
    ['2015冬', '1月', Math.random() * 10, Math.random() * 10],
    ['2015冬', '2月', Math.random() * 20, Math.random() * 40],
    ['2016春', '3月', Math.random() * 60, Math.random() * 60],
    ['2016春', '4月', Math.random() * 100, Math.random() * 100],
    ['2016春', '5月', Math.random() * 150, Math.random() * 150],
    ['2016夏', '6月', Math.random() * 200, Math.random() * 200],
    ['2016夏', '7月', Math.random() * 250, Math.random() * 250],
    ['2016夏', '8月', Math.random() * 200, Math.random() * 200],
    ['2016秋', '9月', Math.random() * 150, Math.random() * 150],
    ['2016秋', '10月', Math.random() * 100, Math.random() * 100],
    ['2016秋', '11月', Math.random() * 20, Math.random() * 20],
    ['2016冬', '12月', Math.random() * 10, Math.random() * 10]
];
// 元数据处理，e.g. metadata.init().xxx
var metadata = {
    flag: true,
    quarter: [],
    month: [],
    data1: [],
    data2: [],
    data3: [],
    x_major_offset: dummy[0][1].length,
    init: function() {
        // 首次初始化
        if (metadata.flag) {
            // 数据遍历
            for (var i = 0; i < dummy.length; i++) {
                //debugger;
                if (i === 0) {
                    metadata.quarter.push(dummy[i][0]);
                } else {
                    // 与子分类列匹配
                    metadata.quarter.push(dummy[i - 1][0] === dummy[i][0] ? '' : dummy[i][0]);
                }
                metadata.month.push(dummy[i][1]);
                metadata.data1.push(dummy[i][2]);
                metadata.data2.push(dummy[i][3]);
                metadata.data3.push('');
                metadata.x_major_offset = metadata.x_major_offset > dummy[i][1].length ? metadata.x_major_offset : dummy[i][1].length;
            }
            metadata.flag = false;
        }
        // console.log(metadata.data1)
        return metadata;
    }
};

option2 = {
    tooltip: {
        axisPointer: {
            type: 'shadow'
        },
        trigger: 'axis'
    },
    grid: {
        bottom: metadata.init().x_major_offset * 12 + 30
    },
    legend: {
        data: ['薄羊毛衫', '厚羊毛衫']
    },
    xAxis: [{
        type: 'category',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            rotate: 90
        },
        splitArea: {
            show: false
        },
        data: metadata.init().month
    }, {
        type: 'category',
        position: 'bottom',
        offset: metadata.init().x_major_offset * 12,
        axisLine: {
            show: false
        },
        axisTick: {
            length: metadata.init().x_major_offset * 12 + 20,
            lineStyle: {
                color: '#CCC'
            },
            interval: function(index, value) {
                return value !== '';
            }
        },
        splitArea: {
            show: true,
            interval: function(index, value) {
                return value !== '';
            }
        },
        data: metadata.init().quarter
    }],
    yAxis: [{
        type: 'value',
        name: '销量',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
            formatter: '{value} 万件'
        }
    }],
    series: [{
        name: '薄羊毛衫',
        type: 'bar',
        z: 1,
        data: metadata.init().data1
    }, {
        name: '厚羊毛衫',
        type: 'bar',
        z: 1,
        data: metadata.init().data2
    }, {
        type: 'line',
        xAxisIndex: 1,
        z: 0,
        data: metadata.init().data3
    }]
};

LepvMemoryChart.prototype.initialize = function() {
    this.char = echarts.init(document.getElementById(this.chartDivName));
    this.char.setOption(option);
    console.log("init end");

    this.char.on('click', function(params) {
        console.log(params);
        if (params.componentType === 'series') {
            if (params.seriesType === 'bar') {
                console.log("choose data" + params.dataIndex + " : " + params.name)
                if (params.name === '衬衫') {
                    this.clear();
                    this.setOption(option1);
                } else if (params.name === '羊毛衫') {
                    this.clear();
                    this.setOption(option2);
                } else if (params.name === '雪纺衫') {
                    this.clear();
                    this.setOption(option3);
                }
            }
        }

    });
    this.char.on('dblclick', function() {
        console.log("hello dblclick"); //双击返回
        this.clear();
        this.setOption(option);
    });

    // this.char.on('mouseover', function () {
    //     console.log("hello mouseover");
    // });
};

LepvMemoryChart.prototype.initEvents = function() {

};