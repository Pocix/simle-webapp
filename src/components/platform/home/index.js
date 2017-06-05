import vEcharts from './Echarts.vue';
export default {
    components: {
        vEcharts
    },
    data() {
        return {
            //动环监控
            ringMonitor: {
                todayCollection: 0,
                yesterdayCollection: 0,
                equipSum: 0,
                surveySum: 0
            },
            //楼宇自控
            buildControl: {
                todayCollection: 0,
                yesterdayCollection: 0,
                equipSum: 0,
                surveySum: 0
            },
            //门禁系统
            doorSystem: {
                visitorSum: 0,
                urgentEvent: 0
            },
            //电力监控
            powerMonitor: {
                todayCollection: 0,
                yesterdayCollection: 0,
                equipSum: 0,
                surveySum: 0
            },
            //视频监控
            videoMonitor: {
                videoSum: 0
            }

        }
    },
    created() {
       this.ringMonitor = ringMonitorData;
       this.buildControl = buildControlData;
       this.doorSystem = doorSystemData;
       this.powerMonitor = powerMonitorData;
       this.videoMonitor = videoMonitorData;
    },
    methods: {
        showData(type) {
            console.log(type);
            //动环监控--历史数据查看
            if(type == "ring_history"){
                this.ringMonitor = ringMonitorData;
            }
            //动环监控--设备实时数据
            else if(type == "ring_real"){
                this.ringMonitor = {
                    todayCollection: 66,
                    yesterdayCollection: 99,
                    equipSum: 480,
                    surveySum: 95
                }
            }
            //楼宇自控--历史数据查看
            else if(type == "build_history"){
                this.buildControl = buildControlData;
            }
            //楼宇自控--设备实时数据
            else if(type == "build_real"){
                this.buildControl = {
                    todayCollection: 66,
                    yesterdayCollection: 99,
                    equipSum: 48,
                    surveySum: 95
                }
            }
            //电力监控--历史数据查看
            else if(type == "power_history"){
                this.powerMonitor = powerMonitorData;
            }
            //电力监控--设备实时数据
            else if(type == "power_real"){
                this.powerMonitor = {
                    todayCollection: 66,
                    yesterdayCollection: 99,
                    equipSum: 48,
                    surveySum: 95
                }
            }
        },

    }
}

var ringMonitorData = {
        todayCollection: 11,
        yesterdayCollection: 22,
        equipSum: 33,
        surveySum: 44
}
var buildControlData = {
        todayCollection: 101,
        yesterdayCollection: 202,
        equipSum: 303,
        surveySum: 404
}
var doorSystemData = {
        visitorSum: 8080,
        urgentEvent: 4002
}
var powerMonitorData = {
        todayCollection: 215,
        yesterdayCollection: 210,
        equipSum: 300,
        surveySum: 156
}
var videoMonitorData = {
        videoSum: 500
}
