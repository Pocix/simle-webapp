<template>
    <div>
        <div style="width:100%">
            <font class="table-title-style title1">集成概况</font>
            <div class="bigbox">
                <div class="integrate-style" style="background-color: #71B2CE; height:　200px;">
                    <img src="../../../../static/img/dhjk.png" class="image image1">
                    <font class="font11">动环监控</font>
                    <div class="left">
                        <span class="history"><a @click="showData('ring_history')">历史数据查看</a></span><br/>
                        <span class="equipment"><a @click="showData('ring_real')">设备实时数据</a></span>
                    </div>
                    <div class="right">
                        <font class="message">今日采集量：{{ ringMonitor.todayCollection }}</font><br/>
                        <font class="message">昨日采集量：{{ ringMonitor.yesterdayCollection }}</font><br/>
                        <font class="message">设备数量：{{ ringMonitor.equipSum }}</font><br/>
                        <font class="message">测点量：{{ ringMonitor.surveySum }}</font>
                    </div>
                </div>
                <div class="integrate-style" style="background-color: #1EBFAF;  height:　200px;">
                    <img src="../../../../static/img/lyzk.png" class="image image1">
                    <font class="font11">楼宇自控</font>
                    <div class="left">
                        <span class="history"><a @click="showData('build_history')">历史数据查看</a></span><br/>
                        <span class="equipment"><a @click="showData('build_real')">设备实时数据</a></span>
                    </div>
                    <div class="right">
                        <font class="message">今日采集量：{{ buildControl.todayCollection }}</font><br/>
                        <font class="message">昨日采集量：{{ buildControl.yesterdayCollection }}</font><br/>
                        <font class="message">设备数量：{{ buildControl.equipSum }}</font><br/>
                        <font class="message">测点量：{{ buildControl.surveySum }}</font>
                    </div>
                </div>
                <div class="integrate-style" style="background-color: #F33951;  height:　200px;">
                    <img src="../../../../static/img/lock.png" class="image image1">
                    <font class="font11">门禁系统</font>
                    <div class="left">

                        <span class="equipment equipment2">刷卡记录查询</span>
                    </div>
                    <div class="right right2">
                        <font class="message message2">访客人数：{{ doorSystem.visitorSum }}</font><br/>
                        <font class="message message2">紧急事件：{{ doorSystem.urgentEvent }}</font>
                    </div>
                </div>
                <div class="integrate-style" style="background-color: #59DFAD;  height:　200px;">
                    <img src="../../../../static/img/elec.png" class="image">
                    <font class="font11">电力监控</font>
                    <div class="left left3">
                        <span class="history"><a @click="showData('power_history')">历史数据查看</a></span><br/>
                        <span class="equipment"><a @click="showData('power_real')">设备实时数据</a></span>
                    </div>
                    <div class="right right3">
                        <font class="message">今日采集量：{{ powerMonitor.todayCollection }}</font><br/>
                        <font class="message">昨日采集量：{{ powerMonitor.yesterdayCollection }}</font><br/>
                        <font class="message">设备数量：{{ powerMonitor.equipSum }}</font><br/>
                        <font class="message">测点量：{{ powerMonitor.surveySum }}</font>
                    </div>
                </div>
                <div class="integrate-style" style="background-color: #68DB5C; height:　200px; ">
                    <img src="../../../../static/img/vidio.png" class="image">
                    <font class="font11">视频监控</font>
                    <div class="left left4">
                        <span class="equipment equipment2">实时监控</span>
                    </div>
                    <div class="right right4">
                        <font class="message">当前接入视频量：{{ videoMonitor.videoSum }}</font>
                    </div>
                </div>
            </div>

        </div>

        <div style="width: 100%;float: left">
            <font class="table-title-style title2" >运行监控</font>
            <div class="bigbox2">
                <div class="integrate-style" style="background-color: #267E94; height:　220px; border-radius: 10px;">
                    <img src="../../../../static/img/survice.png" class="image2">
                    <font class="font1">主服务器</font>
                    <div class="line1">
                        <span>基本信息：</span><br />
                        <span>IP：10.22.22.22</span>
                    </div>
                    <div class="line2">
                        <span>执行任务情况：</span><br/>
                        <div class="rate">
                            <el-progress :text-inside="true" style="width: 130px;" :stroke-width="18" :percentage="70"></el-progress>
                        </div>
                    </div>
                    <div class="line3">
                        <span>查看任务</span> <p>重启任务</p><br>
                        <span class="look">任务日志查看</span>
                    </div>
                    <div class="rec">
                        <div class="rec_left">
                            <div class="per">10%</div>
                            <div class="more">
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                            </div>
                            <div class="cpu">CPU</div>
                        </div>
                        <div class="rec_right">
                            <div class="per">10%</div>
                            <div class="more">
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                            </div>
                            <div class="cpu">内存</div>
                        </div>
                    </div>
                </div>
                <div class="integrate-style" style="background-color: #7AA9BD;  height:　220px; border-radius: 10px;">
                    <img src="../../../../static/img/survice.png" class="image2">
                    <font class="font1">代理服务器</font>
                    <div class="line1">
                        <span>基本信息：</span><br />
                        <span>IP：10.22.22.22</span>
                    </div>
                    <div class="line2">
                        <span>执行任务情况：</span><br/>
                        <div class="rate">
                            <el-progress :text-inside="true" style="width: 130px;" :stroke-width="18" :percentage="70"></el-progress>
                        </div>
                    </div>
                    <div class="line3">
                        <span>查看任务</span> <p>重启任务</p><br>
                        <span class="look">任务日志查看</span>
                    </div>
                    <div class="rec">
                        <div class="rec_left">
                            <div class="per">10%</div>
                            <div class="more">
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                            </div>
                            <div class="cpu">CPU</div>
                        </div>
                        <div class="rec_right">
                            <div class="per">10%</div>
                            <div class="more">
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                            </div>
                            <div class="cpu">内存</div>
                        </div>
                    </div>
                </div>
                <div class="integrate-style" style="background-color: #78ABBE;  height:　220px; border-radius: 10px;">
                    <img src="../../../../static/img/survice.png" class="image2">
                    <font class="font1">代理服务器</font>
                    <div class="line1">
                        <span>基本信息：</span><br />
                        <span>IP：10.22.22.22</span>
                    </div>
                    <div class="line2">
                        <span>执行任务情况：</span><br/>
                        <div class="rate">
                            <el-progress :text-inside="true" style="width: 130px;" :stroke-width="18" :percentage="70"></el-progress>
                        </div>
                    </div>
                    <div class="line3">
                        <span>查看任务</span> <p>重启任务</p><br>
                        <span class="look">任务日志查看</span>
                    </div>
                    <div class="rec">
                        <div class="rec_left">
                            <div class="per">10%</div>
                            <div class="more">
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                            </div>
                            <div class="cpu">CPU</div>
                        </div>
                        <div class="rec_right">
                            <div class="per">10%</div>
                            <div class="more">
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                                <div class="m1 m2"></div>
                            </div>
                            <div class="cpu">内存</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <v-echarts></v-echarts>
    </div>
</template>
<!--data: function() { return {   }}-->
<!--data() { return {  }}-->
<!--data: () => ({  })-->
<script src="./index.js"></script>
<style scoped>

    .integrate-style {
        margin-right: 20px;
        width: 494px;
        float:left;
        margin-bottom: 21px;
    }
    .bigbox{
        margin-top: -9px;
    }
    .table-title-style{
        padding-bottom: 12px;
    }
    .image{
        margin: 10px 0 0 10px;
    }
    .image1{
        width: 48px; height: 48px;
    }
    .font11{
        font-size: 25px;
        color: #fff;
        margin-left: 10px;
        margin-top: 17px;
        position: absolute;
    }
    .image2{
        margin-left: 37%;
        margin-top: 10px;
    }
    .title1{

        margin-top: -10px;
    }
    .title2{
        margin-top: -10px;

    }
    .bigbox2{
        margin-top: -7px;
    }
     .font1{
        font-size: 20px;
        margin-top: 10px;
        color: #fff;
        margin-left: 12px;
        position: absolute;
    }
    .left{
        width: 150px;
        height: 73px;
        float: left;
        position: absolute;
        margin-top: 65px;
    }
    .right{
        width: 230px;
        height: 108px;
        float: right;
        margin-top: 92px;
        margin-right: -20px;
    }
    .message{
        color: #fff;
        font-size: 18px;
    }
    .history{
        margin-top: 10px;
        position: absolute;
        color: #fff;
        font-size: 18px;
        margin-left: 8px;
        letter-spacing:  0.1em;
    }
    .equipment{
        margin-top: 20px;
        position: absolute;
        color: #fff;
        font-size: 18px;
        margin-left: 8px;
        letter-spacing:  0.1em;
    }
    .message{
        margin-left: 8px;
        letter-spacing:  0.1em;
    }
    .equipment2{
        position: absolute;
        margin-top: 38px;
    }
    .right2{
        width: 230px;
        height: 60px;
        margin-top: 140px;
    }
    .message2{
        margin-top: 10px;
    }
    .left3{
        margin-top: 70px;
    }
    .right3{
        margin-top: 92px;
    }
    .left4{
        margin-top: 58px;
    }
    .right4{
        width: 300px;
        height: 36px;

        margin-top: 95px;
        margin-left: 220px;
    }
    .line1{

        height: 0.8px;
        background-color: #5A8D9B;
        margin-top: 8px;
    }
    .line2{

        height: 1.5px;
        background-color: #5A8D9B;
        margin-top: 55px;
    }
    .line3{

        height: 1.2px;
        background-color: #5A8D9B;
        margin-top: 55px;
    }
    span{
        color: #fff;
        font-size: 15px;
        margin-top: 9px;
        margin-left: 40px;
        letter-spacing:  0.1em;
        position: absolute;
    }
    p{
        color: #fff;
        font-size: 15px;
        margin-top: 9px;
        position: absolute;
        margin-left: 130px;
    }
    .look{
        margin-top: 14px;
        position: absolute;
        color: #ccc;
    }
    .rate{
        margin-top: 14px;
        margin-left: 36px;
        position: absolute;
    }

    .rec{
        width: 140px;
        height: 150px;
        float: right;
        margin-top: -110px;
        margin-right: 41px;
    }
    .rec_left{
        width: 45px;
        height: 150px;
        float: left;
    }
    .rec_right{
        width: 45px;
        height: 150px;
        float: right;
    }
    .per{
        width: 45px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #fff;
        font-size: 20x;
    }
    .cpu{
        width: 45px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #fff;
        font-size: 20px;
    }
    .more{
        width: 45px;
        height: 100px;
    }
    .m1{
        width: 45px;
        height: 2px;
        background-color: #B38D78;
        margin-bottom: 2px;
    }
    .m2{
        background-color: #FEC8AC;
    }



</style>


