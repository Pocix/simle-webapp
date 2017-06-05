<template>
    <div>
        <div class="crumbs">
            <b-breadcrumb :items="items" />
        </div>
        <div class="plugins-tips">
            vue-echarts-v3：基于vue2和eCharts.js3的图表组件。
            访问地址：<a href="https://github.com/xlsdg/vue-echarts-v3" target="_blank">vue-echarts-v3</a>
        </div>


        <div class="echarts">
            <IEcharts :option="pie" ></IEcharts>
        </div>
    </div>
</template>
<!--data: function() { return {   }}-->
<!--data() { return {  }}-->
<!--data: () => ({  })-->
<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    export default {
        components: {
            IEcharts
        },
        data() {
            return {

                 pie: {
                    color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
                    title : {
                        text: '饼状图',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
                    },
                    series : [
                        {
                            name: '销量',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:[
                                {value:335, name:'衬衫'},
                                {value:310, name:'羊毛衫'},
                                {value:234, name:'雪纺衫'},
                                {value:135, name:'裤子'},
                                {value:548, name:'高跟鞋'}
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
</script>

<style scoped>
    .echarts {
        float: left;
        width: 500px;
        height: 400px;
    }
</style>
