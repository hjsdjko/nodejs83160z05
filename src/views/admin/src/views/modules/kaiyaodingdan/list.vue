<template>
	<div class="main-content" :style='{"padding":"20px 30px 30px","fontSize":"14px","color":"#666","background":"none","height":"100%"}'>
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"padding":"0","margin":"0px","overflow":"hidden","flexWrap":"wrap","background":"none","display":"flex","fontSize":"inherit"}' :inline="true" :model="searchForm">
				<el-row :style='{"padding":"10px","boxShadow":"0 1px 3px 0px rgba(115,108,203,.23)","margin":"0 20px 20px 0","borderRadius":"3px","alignItems":"center","textAlign":"left","background":"#fff","display":"flex","width":"auto","fontSize":"inherit","order":"2"}' >
					<div :style='{"margin":"0 10px 0 0","fontSize":"inherit","display":"inline-block"}' class="select" label="药品名称" prop="yaopinmingcheng">
						<label :style='{"margin":"0 10px 0 0","color":"inherit","display":"inline-block","lineHeight":"40px","fontSize":"inherit","fontWeight":"500","height":"40px"}' class="item-label">药品名称</label>
						<el-select clearable v-model="searchForm.yaopinmingcheng" placeholder="请选择药品名称" >
							<el-option v-for="(item,index) in yaopinmingchengOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<div :style='{"margin":"0 10px 0 0","fontSize":"inherit","display":"inline-block"}' class="select">
						<label :style='{"margin":"0 10px 0 0","color":"inherit","display":"inline-block","lineHeight":"40px","fontSize":"inherit","fontWeight":"500","height":"40px"}' class="item-label">是否支付</label>
						<el-select clearable v-model="searchForm.ispay" placeholder="是否支付">
							<el-option v-for="(item,index) in isPayOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<el-button class="search" type="success" @click="search()">
						<span class="icon iconfont icon-chakan14" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","height":"40px"}'></span>
						查询信息
					</el-button>
				</el-row>

				<el-row class="actions" :style='{"boxShadow":"0 1px 3px 0px rgba(115,108,203,.23)","padding":"10px","margin":"0px 0 20px","color":"#fff","alignItems":"center","textAlign":"left","display":"flex","borderRadius":"3px","flexWrap":"wrap","background":"#fff","flex":"1","width":"100%","fontSize":"inherit","order":"2"}'>
					<el-button class="add" v-if="isAuth('kaiyaodingdan','新增')" type="success" @click="addOrUpdateHandler()">
						<span class="icon iconfont icon-tianjia13" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"none"}'></span>
						新增
					</el-button>
					<el-button class="del" v-if="isAuth('kaiyaodingdan','删除')" :disabled="dataListSelections.length?false:true" type="danger" @click="deleteHandler()">
						<span class="icon iconfont icon-shanchu7" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"none","height":"40px"}'></span>
						删除
					</el-button>


					<el-button class="btn18" v-if="isAuth('kaiyaodingdan','支付')" :disabled="dataListSelections.length?false:true" type="success" @click="payBatch()">
						<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"none"}'></span>
						批量支付
					</el-button>

				</el-row>
			</el-form>
			<div :style='{"padding":"0 0 2px","boxShadow":"0 1px 3px 0px rgba(115,108,203,.23)","borderColor":"rgba(252,234,238,1)","margin":"0 0 20px","borderRadius":"3px","background":"rgba(255,255,255,1)","borderWidth":"0px","width":"100%","borderStyle":"solid"}'>
				<el-table class="tables"
					:stripe='false'
					:style='{"padding":"0","borderColor":"#e5e9ec","color":"inherit","borderRadius":"0px","borderWidth":"0px","background":"none","width":"100%","fontSize":"inherit","borderStyle":"solid"}' 
					:border='false'
					v-if="isAuth('kaiyaodingdan','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='true' label="序号" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='true'  
						prop="dingdanbianhao"
						label="订单编号">
						<template slot-scope="scope">
							{{scope.row.dingdanbianhao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yaopinmingcheng"
						label="药品名称">
						<template slot-scope="scope">
							{{scope.row.yaopinmingcheng}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yaopinfenlei"
						label="药品分类">
						<template slot-scope="scope">
							{{scope.row.yaopinfenlei}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="jiage"
						label="价格">
						<template slot-scope="scope">
							{{scope.row.jiage}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="shuliang"
						label="数量">
						<template slot-scope="scope">
							{{scope.row.shuliang}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true' prop="tupian" width="200" label="图片">
						<template slot-scope="scope">
							<div v-if="scope.row.tupian">
								<img v-if="scope.row.tupian.substring(0,4)=='http'" :src="scope.row.tupian.split(',')[0]" width="100" height="100" style="object-fit: cover" @click="imgPreView(scope.row.tupian.split(',')[0])">
								<img v-else :src="$base.url+scope.row.tupian.split(',')[0]" width="100" height="100" style="object-fit: cover" @click="imgPreView($base.url+scope.row.tupian.split(',')[0])">
							</div>
							<div v-else>无图片</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="zongjiage"
						label="总价格">
						<template slot-scope="scope">
							{{scope.row.zongjiage}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="kaiyaoshijian"
						label="开药时间">
						<template slot-scope="scope">
							{{scope.row.kaiyaoshijian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yishenggonghao"
						label="医生工号">
						<template slot-scope="scope">
							{{scope.row.yishenggonghao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yishengxingming"
						label="医生姓名">
						<template slot-scope="scope">
							{{scope.row.yishengxingming}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="keshi"
						label="科室">
						<template slot-scope="scope">
							{{scope.row.keshi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yonghuzhanghao"
						label="用户账号">
						<template slot-scope="scope">
							{{scope.row.yonghuzhanghao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yonghuxingming"
						label="用户姓名">
						<template slot-scope="scope">
							{{scope.row.yonghuxingming}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="chongwumingcheng"
						label="宠物名称">
						<template slot-scope="scope">
							{{scope.row.chongwumingcheng}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true' prop="ispay" label="是否支付">
						<template slot-scope="scope">
							<span style="margin-right:10px">{{scope.row.ispay=='已支付'?'已支付':'未支付'}}</span>
							<el-button v-if="scope.row.ispay!='已支付' && isAuth('kaiyaodingdan','支付') " type="text" size="small" @click="payHandler(scope.row)">支付</el-button>
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button class="view" v-if=" isAuth('kaiyaodingdan','查看')" type="success" @click="addOrUpdateHandler(scope.row.id,'info')">
								<span class="icon iconfont icon-chakan12" :style='{"margin":"0 0 0 4px","fontSize":"14px","color":"inherit","height":"auto"}'></span>
								详情
							</el-button>
							<el-button class="edit" v-if=" isAuth('kaiyaodingdan','修改') " type="success" @click="addOrUpdateHandler(scope.row.id)">
								<span class="icon iconfont icon-xiugai13" :style='{"margin":"0 0 0 4px","fontSize":"14px","color":"inherit","height":"auto"}'></span>
								更改
							</el-button>




							<el-button class="del" v-if="isAuth('kaiyaodingdan','删除') " type="primary" @click="deleteHandler(scope.row.id )">
								<span class="icon iconfont icon-shanchu8" :style='{"margin":"0 0 0 4px","fontSize":"inherit","color":"inherit","height":"auto"}'></span>
								移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination
				@size-change="sizeChangeHandle"
				@current-change="currentChangeHandle"
				:current-page="pageIndex"
				background
				:page-sizes="[10, 50, 100, 200]"
				:page-size="pageSize"
				:layout="layouts.join()"
				:total="totalPage"
				prev-text="上一页 "
				next-text="下一页 "
				:hide-on-single-page="false"
				:style='{"padding":"0","margin":"0px 0 0","whiteSpace":"nowrap","color":"inherit","textAlign":"center","width":"100%","fontSize":"inherit","fontWeight":"500"}'
			></el-pagination>
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>





		<el-dialog title="预览图" :visible.sync="previewVisible" width="50%">
			<img :src="previewImg" alt="" style="width: 100%;">
		</el-dialog>
	</div>
</template>

<script>
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
	export default {
		data() {
			return {
				yaopinmingchengOptions: [],
				searchForm: {
					key: ""
				},
				form:{},
				isPayOptions: [],
				dataList: [],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				dataListSelections: [],
				showFlag: true,
				addOrUpdateFlag:false,
				layouts: ["total","prev","pager","next","sizes","jumper"],
				previewImg: '',
				previewVisible: false,
			};
		},
		created() {
			this.init();
			this.getDataList();
			this.contentStyleChange()
		},
		mounted() {
		},
		filters: {
			htmlfilter: function (val) {
				return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
			}
		},
		computed: {
			tablename(){
				return this.$storage.get('sessionTable')
			},
		},
		components: {
			AddOrUpdate,
		},
		methods: {
			imgPreView(url){
				this.previewImg = url
				this.previewVisible = true
			},
			contentStyleChange() {
				this.contentPageStyleChange()
			},
			// 分页
			contentPageStyleChange(){
				let arr = []

				// if(this.contents.pageTotal) arr.push('total')
				// if(this.contents.pageSizes) arr.push('sizes')
				// if(this.contents.pagePrevNext){
				//   arr.push('prev')
				//   if(this.contents.pagePager) arr.push('pager')
				//   arr.push('next')
				// }
				// if(this.contents.pageJumper) arr.push('jumper')
				// this.layouts = arr.join()
				// this.contents.pageEachNum = 10
			},
			payHandler(row){
				this.$storage.set('paytable','kaiyaodingdan');
				this.$storage.set('payObject',row);
				this.$router.push('pay');
			},
			// 批量支付
			payBatch(){
				for(let x in this.dataListSelections){
					if(this.dataListSelections[x].ispay=='已支付'){
						this.$message.error('所选订单存在已支付订单')
						return false
					}
				}
				this.$confirm('是否支付所选订单？').then(_ => {
					let arr = JSON.parse(JSON.stringify(this.dataListSelections))
					for(let i in arr){
						arr[i].ispay = '已支付'
						this.$http({
							url: 'kaiyaodingdan/update',
							method: "post",
							data: arr[i]
						}).then(res=>{
							
						})
					}
					this.$message({
						message: "支付成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.getDataList()
						}
					});
				}).catch(_ => {});
			},






    init () {
		this.isPayOptions = "已支付,未支付".split(',')
          this.$http({
            url: `option/yaopinxinxi/yaopinmingcheng`,
            method: "get"
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.yaopinmingchengOptions = data.data;
            } else {
              this.$message.error(data.msg);
            }
          });
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
      }
          if(this.searchForm.yaopinmingcheng!='' && this.searchForm.yaopinmingcheng!=undefined){
            params['yaopinmingcheng'] = this.searchForm.yaopinmingcheng
          }
			if(this.searchForm.ispay!='' && this.searchForm.ispay!=undefined){
				params['ispay'] = this.searchForm.ispay
			}
			let user = JSON.parse(this.$storage.getObj('userForm'))
			console.log(user)
			this.$http({
				url: "kaiyaodingdan/page",
				method: "get",
				params: params
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.dataList = data.data.list;
					this.totalPage = data.data.total;
				} else {
					this.dataList = [];
					this.totalPage = 0;
				}
				this.dataListLoading = false;
			});
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
	kaiyaodingdanstatusChange(e,row){
		if(row.status==0){
			row.passwordwrongnum = 0
		}
		this.$http({
			url:'kaiyaodingdan/update',
			method:'post',
			data:row
		}).then(res=>{
			if(row.status==1){
				this.$message.error('该用户已锁定')
			}else{
				this.$message.success('该用户已解除锁定')
			}
		})
	},
    // 删除
    async deleteHandler(id ) {
		var ids = id? [Number(id)]: this.dataListSelections.map(item => {
			return Number(item.id);
		});
		await this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(async () => {
			await this.$http({
				url: "kaiyaodingdan/delete",
				method: "post",
				data: ids
			}).then(async ({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.search();
						}
					});
            
				} else {
					this.$message.error(data.msg);
				}
			});
		});
    },


  }

};
</script>
<style lang="scss" scoped>
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 1px solid #eee;
				border-radius: 3px;
				padding: 0 12px;
				outline: none;
				color: inherit;
				background: #fff;
				width: 170px;
				font-size: inherit;
				height: 40px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 1px solid #eee;
				border-radius: 3px;
				padding: 0 10px;
				box-shadow: 0 0 0px rgba(64, 158, 255, .5);
				outline: none;
				color: inherit;
				background: #fff;
				width: 170px;
				font-size: inherit;
				height: 40px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 1px solid #eee;
				border-radius: 3px;
				padding: 0 10px 0 30px;
				box-shadow: 0 0 0px rgba(64, 158, 255, .5);
				outline: none;
				color: inherit;
				background: #fff;
				width: 170px;
				font-size: inherit;
				height: 40px;
			}
	
	.center-form-pv .search {
				border: 0;
				cursor: pointer;
				border-radius: 3px;
				padding: 0 24px;
				outline: none;
				color: #fff;
				background: #2bb3c0;
				width: auto;
				font-size: inherit;
				height: 40px;
			}
	
	.center-form-pv .search:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .add {
				border: 0px solid rgba(244,100,130,.3);
				cursor: pointer;
				border-radius: 3px;
				padding: 0 10px 0 10px;
				margin: 4px 4px 5px;
				outline: none;
				color: inherit;
				background: #2bb3c0;
				width: auto;
				font-size: inherit;
				min-width: 66px;
				height: 36px;
			}
	
	.center-form-pv .actions .add:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .del {
				border: 0px solid rgba(244,100,130,.3);
				cursor: pointer;
				padding: 0 10px 0 10px;
				margin: 4px 4px 5px;
				color: inherit;
				font-size: inherit;
				border-radius: 3px;
				box-shadow: inset 0px 0px 12px 0px rgba(244,100,130,.3);
				outline: none;
				background: #ff518a;
				width: auto;
				min-width: 66px;
				height: 36px;
			}
	
	.center-form-pv .actions .del:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .statis {
				border: 0px solid rgba(244,100,130,.3);
				cursor: pointer;
				padding: 0 10px 0 10px;
				margin: 4px 4px 5px;
				color: inherit;
				font-size: inherit;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #34bfa3;
				width: auto;
				min-width: 66px;
				height: 36px;
			}
	
	.center-form-pv .actions .statis:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .btn18 {
				border: 0px solid rgba(244,100,130,.3);
				cursor: pointer;
				border-radius: 3px;
				padding: 0 10px 0 10px;
				margin: 4px 4px 5px;
				outline: none;
				color: inherit;
				background: #36a2f5;
				width: auto;
				font-size: inherit;
				min-width: 66px;
				height: 36px;
			}
	
	.center-form-pv .actions .btn18:hover {
				opacity: 0.8;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: inherit;
				background: rgba(254,169,34,0);
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: none;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 6px 0;
				background: none;
				border-color: #e5e9ec;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				padding: 0;
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: none;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 5px 0 0;
				color: inherit;
				background: none;
				font-size: inherit;
				border-color: #e5e9ec;
				border-width: 0 1px 1px 0px;
				border-style: solid;
				text-align: left;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 5px 0 0;
				color: #666;
				background: none;
				border-color: #e5e9ec;
				border-width: 0 1px 1px 0px;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 5px 0 0;
				color: inherit;
				background: none;
				font-size: inherit;
				border-color: #e5e9ec;
				border-width: 0 1px 1px 0px;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				color: inherit;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view {
				cursor: pointer;
				padding: 0 6px 0 0px;
				margin: 0 2px 5px 0;
				color: #fff;
				font-size: 13px;
				border-color: rgba(244,111,139,.3);
				line-height: 24px;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #2bb3c0;
				width: auto;
				border-width: 0px;
				border-style: solid;
				min-width: 40px;
				height: 24px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view:hover {
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .add {
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .add:hover {
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit {
				cursor: pointer;
				padding: 0 6px 0 0px;
				margin: 0 2px 5px 0;
				color: #fff;
				font-size: 13px;
				border-color: rgba(244,111,139,.3);
				line-height: 24px;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #34bfa3;
				width: auto;
				border-width: 0px;
				border-style: solid;
				min-width: 40px;
				height: 24px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit:hover {
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .del {
				cursor: pointer;
				padding: 0 6px 0 0px;
				margin: 0 2px 5px 0;
				color: #fff;
				font-size: 13px;
				border-color: rgba(244,111,139,.3);
				line-height: 24px;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #ff518a;
				width: auto;
				border-width: 0px;
				border-style: solid;
				min-width: 40px;
				height: 24px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .del:hover {
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8 {
				cursor: pointer;
				padding: 0 6px 0 0px;
				margin: 0 2px 5px 0;
				color: #fff;
				font-size: 14px;
				border-color: rgba(244,111,139,.3);
				line-height: 24px;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #6c757d;
				width: auto;
				border-width: 0px;
				border-style: solid;
				min-width: 40px;
				height: 24px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8:hover {
				opacity: 0.8;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: inherit;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0 5px;
				margin: 0 5px;
				color: inherit;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0 5px;
				margin: 0 5px;
				color: inherit;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0 5px;
				margin: 0 5px;
				color: #999;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0 5px;
				margin: 0 5px;
				color: #999;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: inherit;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				border-radius: 3px;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				background: #34bfa3;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: auto;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				border-radius: 3px;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				background: #34bfa3;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: auto;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				color: inherit;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				color: inherit;
				width: 100px;
				font-size: inherit;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 0px solid #ddd;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: inherit;
				display: inline-block;
				font-size: inherit;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: none;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: inherit;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				color: inherit;
				display: inline-block;
				width: 50px;
				font-size: inherit;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #eee;
				cursor: pointer;
				padding: 0 0px;
				color: inherit;
				display: inline-block;
				font-size: inherit;
				line-height: 24px;
				border-radius: 3px;
				outline: 0;
				background: #fff;
				width: auto;
				text-align: center;
				height: 24px;
			}
	
	// list one
	.one .list1-view {
				cursor: pointer;
				padding: 0 4px 0 0px;
				margin: 0px 5px 5px 0;
				color: inherit;
				font-size: 13px;
				border-color: rgba(244,111,139,.3);
				line-height: 24px;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #2bb3c0;
				width: auto;
				border-width: 0 0 0px;
				border-style: double;
				min-width: 40px;
				height: 24px;
			}
	
	.one .list1-view:hover {
				opacity: 0.8;
			}
	
	.one .list1-edit {
				cursor: pointer;
				padding: 0 4px 0 0px;
				margin: 0px 5px 5px 0;
				color: inherit;
				font-size: inherit;
				border-color: rgba(244,111,139,.3);
				line-height: 24px;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #34bfa3;
				width: auto;
				border-width: 0 0 0px;
				border-style: double;
				min-width: 40px;
				height: 24px;
			}
	
	.one .list1-edit:hover {
				opacity: 0.8;
			}
	
	.one .list1-del {
				cursor: pointer;
				padding: 0 4px 0 0px;
				margin: 0px 5px 5px 0;
				color: inherit;
				font-size: inherit;
				border-color: rgba(244,111,139,.3);
				line-height: 24px;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #ff518a;
				width: auto;
				border-width: 0 0 0px;
				border-style: double;
				min-width: 40px;
				height: 24px;
			}
	
	.one .list1-del:hover {
				opacity: 0.8;
			}
	
	.one .list1-btn8 {
				cursor: pointer;
				padding: 0 4px 0 0px;
				margin: 0px 5px 5px 0;
				color: inherit;
				font-size: inherit;
				border-color: rgba(244,111,139,.3);
				line-height: 24px;
				border-radius: 3px;
				box-shadow: inset 0px 0px 0px 0px rgba(244,100,130,.3);
				outline: none;
				background: #6c757d;
				width: auto;
				border-width: 0 0 0px;
				border-style: double;
				min-width: 40px;
				height: 24px;
			}
	
	.one .list1-btn8:hover {
				opacity: 0.8;
			}
	
	.main-content .el-table .el-switch {
				display: inline-flex;
				vertical-align: middle;
				line-height: 30px;
				position: relative;
				align-items: center;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__label--left {
				cursor: pointer;
				margin: 0 10px 0 0;
				color: #333;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
				transition: .2s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__label--right {
				cursor: pointer;
				margin: 0 0 0 10px;
				color: #333;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
				transition: .2s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__core {
				border: 1px solid #2bb3c0;
				cursor: pointer;
				border-radius: 15px;
				margin: 0;
				outline: 0;
				background: #2bb3c0;
				display: inline-block;
				width: 50px;
				box-sizing: border-box;
				transition: border-color .3s,background-color .3s;
				height: 24px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__core::after {
				border-radius: 100%;
				top: 1px;
				left: 1px;
				background: #fff;
				width: 20px;
				position: absolute;
				transition: all .3s;
				height: 20px;
			}
	.main-content .el-table .el-switch.is-checked /deep/ .el-switch__core::after {
				margin: 0 0 0 -27px;
				left: 100%;
				background: #fff;
			}
	
	.main-content .el-table .el-rate /deep/ .el-rate__item {
				cursor: pointer;
				display: inline-block;
				vertical-align: middle;
				font-size: 0;
				position: relative;
			}
	.main-content .el-table .el-rate /deep/ .el-rate__item .el-rate__icon {
				margin: 0 3px;
				color: #666;
				display: inline-block;
				font-size: 18px;
				position: relative;
				transition: .3s;
			}

</style>
