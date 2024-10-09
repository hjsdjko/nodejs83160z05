<template>
<div :style='{"width":"100%","padding":"30px 7% 40px","margin":"0px auto","position":"relative","background":"#fff"}'>
    <el-form
	  :style='{"border":"1px solid #f0f0f0","width":"100%","padding":"30px 20%","position":"relative","background":"#fcfcfc"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="订单编号" prop="dingdanbianhao">
              <el-input v-model="ruleForm.dingdanbianhao" placeholder="订单编号" disabled></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="药品名称" prop="yaopinmingcheng">
            <el-select  @change="yaopinmingchengChange" v-model="ruleForm.yaopinmingcheng" placeholder="请选择药品名称">
              <el-option
                  v-for="(item,index) in yaopinmingchengOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="药品分类" prop="yaopinfenlei">
            <el-input v-model="ruleForm.yaopinfenlei" 
                placeholder="药品分类" clearable :disabled=" false  ||ro.yaopinfenlei"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="价格" prop="jiage">
            <el-input v-model.number="ruleForm.jiage" 
                placeholder="价格" clearable :disabled=" false  ||ro.jiage"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="数量" prop="shuliang">
            <el-input v-model.number="ruleForm.shuliang" 
                placeholder="数量" clearable :disabled=" false  ||ro.shuliang"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="图片" v-if="type!='cross' || (type=='cross' && !ro.tupian)" prop="tupian">
            <file-upload
            tip="点击上传图片"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.tupian?ruleForm.tupian:''"
            @change="tupianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' class="upload" v-else label="图片" prop="tupian">
                <img v-if="ruleForm.tupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.tupian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.tupian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="总价格" prop="zongjiage">
              <el-input v-model="zongjiage" placeholder="总价格" disabled></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="开药时间" prop="kaiyaoshijian">
              <el-date-picker
				  :disabled=" false  ||ro.kaiyaoshijian"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.kaiyaoshijian" 
                  type="date"
                  placeholder="开药时间">
              </el-date-picker> 
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="医生工号" prop="yishenggonghao">
            <el-input v-model="ruleForm.yishenggonghao" 
                placeholder="医生工号" clearable :disabled=" false  ||ro.yishenggonghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="医生姓名" prop="yishengxingming">
            <el-input v-model="ruleForm.yishengxingming" 
                placeholder="医生姓名" clearable :disabled=" false  ||ro.yishengxingming"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="科室" prop="keshi">
            <el-input v-model="ruleForm.keshi" 
                placeholder="科室" clearable :disabled=" false  ||ro.keshi"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="用户账号" prop="yonghuzhanghao">
            <el-input v-model="ruleForm.yonghuzhanghao" 
                placeholder="用户账号" clearable :disabled=" false  ||ro.yonghuzhanghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="用户姓名" prop="yonghuxingming">
            <el-input v-model="ruleForm.yonghuxingming" 
                placeholder="用户姓名" clearable :disabled=" false  ||ro.yonghuxingming"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="宠物名称" prop="chongwumingcheng">
            <el-input v-model="ruleForm.chongwumingcheng" 
                placeholder="宠物名称" clearable :disabled=" false  ||ro.chongwumingcheng"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="用药说明" prop="yongyaoshuoming">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="用药说明"
              v-model="ruleForm.yongyaoshuoming">
            </el-input>
          </el-form-item>

      <el-form-item :style='{"padding":"0","textAlign":"center","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"0px","background":"#1abc9e","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"1px solid #eee","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#333","borderRadius":"0px","background":"#fcfcfc","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
	  let self = this
      return {
        id: '',
        baseUrl: '',
        ro:{
				dingdanbianhao : false,
				yaopinmingcheng : false,
				yaopinfenlei : false,
				jiage : false,
				shuliang : false,
				tupian : false,
				zongjiage : false,
				yongyaoshuoming : false,
				kaiyaoshijian : false,
				yishenggonghao : false,
				yishengxingming : false,
				keshi : false,
				yonghuzhanghao : false,
				yonghuxingming : false,
				chongwumingcheng : false,
				ispay : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          dingdanbianhao: this.getUUID(),
          yaopinmingcheng: '',
          yaopinfenlei: '',
          jiage: '',
          shuliang: '',
          tupian: '',
          zongjiage: '',
          yongyaoshuoming: '',
          kaiyaoshijian: '',
          yishenggonghao: '',
          yishengxingming: '',
          keshi: '',
          yonghuzhanghao: '',
          yonghuxingming: '',
          chongwumingcheng: '',
          ispay: '',
        },
        yaopinmingchengOptions: [],


        rules: {
          dingdanbianhao: [
          ],
          yaopinmingcheng: [
          ],
          yaopinfenlei: [
          ],
          jiage: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          shuliang: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          tupian: [
          ],
          zongjiage: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          yongyaoshuoming: [
          ],
          kaiyaoshijian: [
          ],
          yishenggonghao: [
          ],
          yishengxingming: [
          ],
          keshi: [
          ],
          yonghuzhanghao: [
          ],
          yonghuxingming: [
          ],
          chongwumingcheng: [
          ],
          ispay: [
          ],
        },
		centerType: false,
      };
    },
    computed: {


        zongjiage:{
            get: function () {
                return 1*this.ruleForm.jiage*this.ruleForm.shuliang
            }
        },

    },
    components: {
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.kaiyaoshijian = this.getCurDate()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='dingdanbianhao'){
              this.ruleForm.dingdanbianhao = obj[o];
              this.ro.dingdanbianhao = true;
              continue;
            }
            if(o=='yaopinmingcheng'){
              this.ruleForm.yaopinmingcheng = obj[o];
              this.ro.yaopinmingcheng = true;
              continue;
            }
            if(o=='yaopinfenlei'){
              this.ruleForm.yaopinfenlei = obj[o];
              this.ro.yaopinfenlei = true;
              continue;
            }
            if(o=='jiage'){
              this.ruleForm.jiage = obj[o];
              this.ro.jiage = true;
              continue;
            }
            if(o=='shuliang'){
              this.ruleForm.shuliang = obj[o];
              this.ro.shuliang = true;
              continue;
            }
            if(o=='tupian'){
              this.ruleForm.tupian = obj[o].split(",")[0];
              this.ro.tupian = true;
              continue;
            }
            if(o=='zongjiage'){
              this.ruleForm.zongjiage = obj[o];
              this.ro.zongjiage = true;
              continue;
            }
            if(o=='yongyaoshuoming'){
              this.ruleForm.yongyaoshuoming = obj[o];
              this.ro.yongyaoshuoming = true;
              continue;
            }
            if(o=='kaiyaoshijian'){
              this.ruleForm.kaiyaoshijian = obj[o];
              this.ro.kaiyaoshijian = true;
              continue;
            }
            if(o=='yishenggonghao'){
              this.ruleForm.yishenggonghao = obj[o];
              this.ro.yishenggonghao = true;
              continue;
            }
            if(o=='yishengxingming'){
              this.ruleForm.yishengxingming = obj[o];
              this.ro.yishengxingming = true;
              continue;
            }
            if(o=='keshi'){
              this.ruleForm.keshi = obj[o];
              this.ro.keshi = true;
              continue;
            }
            if(o=='yonghuzhanghao'){
              this.ruleForm.yonghuzhanghao = obj[o];
              this.ro.yonghuzhanghao = true;
              continue;
            }
            if(o=='yonghuxingming'){
              this.ruleForm.yonghuxingming = obj[o];
              this.ro.yonghuxingming = true;
              continue;
            }
            if(o=='chongwumingcheng'){
              this.ruleForm.chongwumingcheng = obj[o];
              this.ro.chongwumingcheng = true;
              continue;
            }
          }
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
            if((json.yishenggonghao!=''&&json.yishenggonghao) || json.yishenggonghao==0){
                this.ruleForm.yishenggonghao = json.yishenggonghao;
				this.ro.yishenggonghao = true;
            }
            if((json.yishengxingming!=''&&json.yishengxingming) || json.yishengxingming==0){
                this.ruleForm.yishengxingming = json.yishengxingming;
				this.ro.yishengxingming = true;
            }
            if((json.keshi!=''&&json.keshi) || json.keshi==0){
                this.ruleForm.keshi = json.keshi;
				this.ro.keshi = true;
            }
          }
        });
        this.$http.get('option/yaopinxinxi/yaopinmingcheng', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.yaopinmingchengOptions = res.data.data;
          }
        });

		if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
			localStorage.removeItem('raffleType')
			setTimeout(() => {
				this.onSubmit()
			}, 300)
		}
      },
      // 下二随
      yaopinmingchengChange () {
        this.$http.get('follow/yaopinxinxi/yaopinmingcheng?columnValue=' + this.ruleForm.yaopinmingcheng, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            if(res.data.data.yaopinfenlei){
              this.ruleForm.yaopinfenlei = res.data.data.yaopinfenlei
            }
            if(res.data.data.jiage){
              this.ruleForm.jiage = res.data.data.jiage
            }
          }
        });
      },

    // 多级联动参数
      // 多级联动参数
      info() {
        this.$http.get(`kaiyaodingdan/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {
		this.ruleForm.ispay = '未支付'
			if(this.ruleForm.dingdanbianhao){
				this.ruleForm.dingdanbianhao = String(this.ruleForm.dingdanbianhao)
			}
			this.ruleForm.zongjiage = this.zongjiage
			//更新跨表属性
			var crossuserid;
			var crossrefid;
			var crossoptnum;
			this.$refs["ruleForm"].validate(valid => {
				if(valid) {
					if(this.type=='cross'){
						var statusColumnName = localStorage.getItem('statusColumnName');
						var statusColumnValue = localStorage.getItem('statusColumnValue');
						if(statusColumnName && statusColumnName!='') {
							var obj = JSON.parse(localStorage.getItem('crossObj'));
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = localStorage.getItem('crossTable');
								this.$http.post(table+'/update', obj).then(res => {});
							} else {
								crossuserid=Number(localStorage.getItem('frontUserid'));
								crossrefid=obj['id'];
								crossoptnum=localStorage.getItem('statusColumnName');
								crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
					}
					if(crossrefid && crossuserid) {
						this.ruleForm.crossuserid=crossuserid;
						this.ruleForm.crossrefid=crossrefid;
						var params = {
							page: 1,
							limit: 10,
							crossuserid:crossuserid,
							crossrefid:crossrefid,
						}
						this.$http.get('kaiyaodingdan/list', {
							params: params
						}).then(res => {
							if(res.data.data.total>=crossoptnum) {
								this.$message({
									message: localStorage.getItem('tips'),
									type: 'error',
									duration: 1500,
								});
								return false;
							} else {
								// 跨表计算


								this.$http.post(`kaiyaodingdan/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										this.$message({
											message: '操作成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
												this.$router.go(-1);
											}
										});
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error',
											duration: 1500
										});
									}
								});
							}
						});
					} else {


						this.$http.post(`kaiyaodingdan/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
							}
						});
					}
				}
			});
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		// 返回
		back() {
			this.$router.go(-1);
		},
      tupianUploadChange(fileUrls) {
          this.ruleForm.tupian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 80px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #ddd;
	  padding: 0 12px;
	  color: #666;
	  font-size: 14px;
	  border-color: #1abc9e30;
	  border-radius: 0px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  background: none;
	  width: 400px;
	  border-width: 0 0 1px;
	  border-style: solid;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  border: 1px solid #ddd;
	  padding: 0 12px;
	  color: #666;
	  font-size: 14px;
	  border-color: #1abc9e30;
	  border-radius: 0px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  background: none;
	  width: 400px;
	  border-width: 0 0 1px;
	  border-style: solid;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border-radius: 0px;
	  padding: 0 10px;
	  color: #666;
	  background: none;
	  width: 200px;
	  font-size: 14px;
	  border-color: #1abc9e30;
	  border-width: 0 0 1px;
	  border-style: solid;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border-radius: 0px;
	  padding: 0 10px 0 30px;
	  color: #666;
	  background: none;
	  width: 200px;
	  font-size: 14px;
	  border-color: #1abc9e30;
	  border-width: 0 0 1px;
	  border-style: solid;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  cursor: pointer;
	  border-radius: 0px;
	  color: #1abc9e60;
	  background: none;
	  width: 200px;
	  font-size: 32px;
	  border-color: #1abc9e30;
	  border-width: 0 0 1px;
	  line-height: 100px;
	  border-style: solid;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  cursor: pointer;
	  border-radius: 0px;
	  color: #1abc9e60;
	  background: none;
	  width: 200px;
	  font-size: 32px;
	  border-color: #1abc9e30;
	  border-width: 0 0 1px;
	  line-height: 100px;
	  border-style: solid;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  cursor: pointer;
	  border-radius: 0px;
	  color: #1abc9e60;
	  background: none;
	  width: 200px;
	  font-size: 32px;
	  border-color: #1abc9e30;
	  border-width: 0 0 1px;
	  line-height: 100px;
	  border-style: solid;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #1abc9e30;
	  border-radius: 0px;
	  padding: 12px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  color: #666;
	  background: none;
	  width: 400px;
	  font-size: 14px;
	  height: 120px;
	}
</style>
