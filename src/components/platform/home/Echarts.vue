<template>
    <div style="width: 100%; margin-top: 10px; float: left">
        <font class="table-title-style title3">服务使用统计</font>
        <div class="bigbox3">
            <div class="echarts">
                <IEcharts :option="pie1" ></IEcharts>
            </div>
            <div class="echarts">
                <IEcharts :option="pie2" ></IEcharts>
            </div>
            <div class="echarts">
                <IEcharts :option="pie3" ></IEcharts>
            </div>
        </div>

    </div>
</template>
<!--data: function() { return {   }}-->
<!--data() { return {  }}-->
<!--data: () => ({  })-->
<script src="./echartsIndex.js"></script>
<style>
    .echarts {
        float: left;
        width: 33%;
        height: 400px;
    }
    .title3{

        margin-top: -18px;
    }
    .bigbox3{
        margin-top: 25px;
    }
</style>
