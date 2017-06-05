import IEcharts from 'vue-echarts-v3';
export default {
    components: {
        IEcharts
    },
    data() {
        return {
             pie1: {
                color:["#197EF2","#4690E5","#79A8E0","#B8CCE4"],
                title : {
                    text: '采集系统分类',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
//                    data: ["门禁系统", "动环监控", "楼宇自控", "电力监控"]
                },
                series : [
                    {
                        name: '销量',
                        type: 'pie',
                        radius : '40%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'门禁系统'},
                            {value:310, name:'动环监控'},
                            {value:234, name:'楼宇自控'},
                            {value:135, name:'电力监控'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
             pie2: {
                color:["#197EF2","#4690E5","#79A8E0","#B8CCE4"],
                title : {
                    text: '采集系统分类',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
//                    data: ["门禁系统", "动环监控", "楼宇自控", "电力监控"]
                },
                series : [
                    {
                        name: '销量',
                        type: 'pie',
                        radius : '40%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'门禁系统'},
                            {value:310, name:'动环监控'},
                            {value:234, name:'楼宇自控'},
                            {value:135, name:'电力监控'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
             pie3: {
                color:["#197EF2","#4690E5","#79A8E0","#B8CCE4"],
                title : {
                    text: '采集系统分类',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
//                    data: ["门禁系统", "动环监控", "楼宇自控", "电力监控"]
                },
                series : [
                    {
                        name: '销量',
                        type: 'pie',
                        radius : '40%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'门禁系统'},
                            {value:310, name:'动环监控'},
                            {value:234, name:'楼宇自控'},
                            {value:135, name:'电力监控'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
        }
    }

}
