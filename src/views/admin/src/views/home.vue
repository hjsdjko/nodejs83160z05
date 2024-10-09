<template>
<div class="content" :style='{"minHeight":"100vh","padding":"20px 20px 30px","alignItems":"flex-start","flexWrap":"wrap","background":"url(http://codegen.caihongy.cn/20230805/a0d58222f2a44e148bf030fbb779c936.png) no-repeat center top / cover","display":"flex","fontSize":"16px","justifyContent":"center","height":"100%"}'>
	<!-- notice -->
	<!-- title -->
	<div class="text" :style='{"width":"100%","margin":"30px auto 30px","fontSize":"36px","color":"rgb(51, 51, 51)","textAlign":"center","fontWeight":"bold"}'>欢迎使用 {{this.$project.projectName}}</div>
	

	
	<!-- echarts -->
</div>
</template>
<script>
//0
import router from '@/router/router-static'
import * as echarts from 'echarts'
export default {
	data() {
		return {
		};
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
			if(this.$storage.get('Token')){
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code != 0) {
				router.push({ name: 'login' })
				}
			});
			}else{
				router.push({ name: 'login' })
			}
		},
  }
};
</script>
<style lang="scss" scoped>
    .cardView {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .cards {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
            justify-content: center;
            .card {
                width: calc(25% - 20px);
                margin: 0 10px;
                /deep/.el-card__body{
                    padding: 0;
                }
            }
        }
    }
	
	// 日历
	.calendar td .text {
				border: 0px solid rgba(126, 96, 16, .1);
				border-radius: 3px;
				flex-direction: column;
				background: rgba(250,250,250,1);
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
				height: 100%;
			}
	.calendar td .text:hover {
				background: rgba(100,150,180,.2);
			}
	.calendar td .text .new {
				color: inherit;
				font-size: inherit;
				line-height: 1.4;
			}
	.calendar td .text .old {
				color: inherit;
				font-size: inherit;
				line-height: 1.4;
			}
	.calendar td.festival .text {
				border-radius: 3px;
				flex-direction: column;
				background: rgba(100,150,180,.1);
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
				height: 100%;
			}
	.calendar td.festival .text:hover {
				background: rgba(100,150,180,.2);
			}
	.calendar td.festival .text .new {
				color: inherit;
				font-size: inherit;
				line-height: 1.4;
			}
	.calendar td.festival .text .old {
				color: inherit;
				font-size: inherit;
				line-height: 1.4;
			}
	.calendar td.other .text {
				border-radius: 3px;
				flex-direction: column;
				background: none;
				display: flex;
				width: 100%;
				font-size: inherit;
				justify-content: center;
				align-items: center;
				opacity: 0.5;
				height: 100%;
			}
	.calendar td.other .text:hover {
				background: rgba(100,150,180,.2);
			}
	.calendar td.other .text .new {
				color: #000;
				font-size: inherit;
				line-height: 1.4;
			}
	.calendar td.other .text .old {
				color: #666;
				font-size: inherit;
				line-height: 1.4;
			}
	.calendar td.today .text {
				border-radius: 3px;
				flex-direction: column;
				color: #fff;
				background: rgba(100,150,180,.6);
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
				height: 100%;
			}
	.calendar td.today .text:hover {
				color: #333;
				background: rgba(100,150,180,.2);
				opacity: 0.8;
			}
	.calendar td.today .text .new {
				font-size: inherit;
				line-height: 1.4;
			}
	.calendar td.today .text .old {
				font-size: inherit;
				line-height: 1.4;
			}
	
	// echarts1
	.type1 .echarts1 {
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0;
				background: rgba(255,255,255,1);
				width: calc(100% - 360px);
				position: relative;
				transition: 0.3s;
				height: 486px;
			}
	.type1 .echarts1:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, 0px, 0);
				z-index: 1;
			}
	// echarts2
	.type2 .echarts1 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0;
				background: rgba(255,255,255,.9);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 486px;
			}
	.type2 .echarts1:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type2 .echarts2 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 486px;
			}
	.type2 .echarts2:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	// echarts3
	.type3 .echarts1 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0 2% 0 0;
				color: #333;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type3 .echarts1:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type3 .echarts2 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type3 .echarts2:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type3 .echarts3 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 30px 0;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type3 .echarts3:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	// echarts4
	.type4 .echarts1 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 30px;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type4 .echarts1:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type4 .echarts2 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 30px;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type4 .echarts2:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type4 .echarts3 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 10px;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type4 .echarts3:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type4 .echarts4 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 10px;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type4 .echarts4:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	// echarts5
	.type5 .echarts1 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 20px;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type5 .echarts1:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type5 .echarts2 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 30px;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type5 .echarts2:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type5 .echarts3 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 20px;
				background: rgba(255,255,255,1);
				width: 100%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type5 .echarts3:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type5 .echarts4 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 20px;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type5 .echarts4:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	.type5 .echarts5 {
				border: 0px double rgba(244,111,139,.1);
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				margin: 0px 0 20px;
				background: rgba(255,255,255,1);
				width: 49%;
				position: relative;
				transition: 0.3s;
				height: 360px;
			}
	.type5 .echarts5:hover {
				box-shadow: 0 1px 3px 0px rgba(115,108,203,.23);
				transform: translate3d(0, -10px, 0);
				z-index: 1;
			}
	
	.echarts-flag-2 {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  padding: 10px 20px;
	  background: rebeccapurple;
	
	  &>div {
	    width: 32%;
	    height: 300px;
	    margin: 10px 0;
	    background: rgba(255,255,255,.1);
	    border-radius: 8px;
	    padding: 10px 20px;
	  }
	}
</style>
