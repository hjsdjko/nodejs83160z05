<template>
  <div>
    <div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20230831/a6216f5e76c141a1857e4d0616f5a515.jpg)","display":"flex","width":"100%","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
      <el-form :style='{"border":"1px solid #f6f6f6","minHeight":"720px","padding":"220px 20px 20px","boxShadow":"0 6px 20px rgba(0, 0, 0, .2)","margin":"120px auto","borderRadius":"0px","textAlign":"center","background":"url(http://codegen.caihongy.cn/20231119/cb15150c757d480cb8262e5ddea9e81b.png) no-repeat center 40px,#fff","width":"660px","fontSize":"16px","position":"relative","height":"auto"}'>
        <div v-if="true" :style='{"padding":"0px","margin":"0px auto 50px","borderColor":"#ddd","whiteSpace":"nowrap","color":"#fff","display":"inline-block","overflow":"hidden","top":"-80px","left":"-50%","background":"none","borderWidth":"0px","width":"200%","lineHeight":"auto","fontSize":"42px","position":"absolute","textOverflow":"ellipsis","borderStyle":"solid","fontWeight":"600"}' class="title-container">宠物医院管理系统登录</div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"75%","margin":"0 auto 30px","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"color":"#666","left":"-150px","textAlign":"right","width":"150px","lineHeight":"44px","fontSize":"inherit","position":"absolute"}'>用户名：</div>
          <input :style='{"border":"0px solid rgba(167,142,68,.2)","padding":"0 10px","boxShadow":"0 0px 0px rgba(60, 60, 60, .1)","borderColor":"#bfbfbf","color":"#666","outline":"0px solid #efefef","outlineOffset":"0px","borderRadius":"0px","background":"none","borderWidth":"1px","width":"100%","fontSize":"inherit","borderStyle":"solid","height":"44px"}' placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username">
        </div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"75%","margin":"0 auto 30px","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"color":"#666","left":"-150px","textAlign":"right","width":"150px","lineHeight":"44px","fontSize":"inherit","position":"absolute"}'>密码：</div>
          <input :style='{"border":"0px solid rgba(167,142,68,.2)","padding":"0 10px","boxShadow":"0 0px 0px rgba(60, 60, 60, .1)","borderColor":"#bfbfbf","color":"#666","outline":"0px solid #efefef","outlineOffset":"0px","borderRadius":"0px","background":"none","borderWidth":"1px","width":"100%","fontSize":"inherit","borderStyle":"solid","height":"44px"}' placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password">
        </div>

        <div :style='{"boxShadow":"0 0px 0px rgba(60, 60, 60, .1)","padding":"0 0px","margin":"10px auto","borderColor":"#bfbfbf","borderRadius":"0px","textAlign":"left","borderWidth":"0px","width":"75%","fontSize":"inherit","lineHeight":"44px","borderStyle":"solid"}' v-if="roles.length>1" prop="loginInRole" class="list-type">
          <el-radio v-if="loginType==1||(loginType==2&&item.roleName!='管理员')" v-for="item in roles" v-bind:key="item.roleName" v-model="rulesForm.role" :label="item.roleName">{{item.roleName}}</el-radio>
        </div>

		
        <div :style='{"margin":"20px auto 0","alignItems":"center","flexWrap":"wrap","textAlign":"left","display":"block","width":"75%","fontSize":"18px","position":"relative","justifyContent":"flex-start"}'>
          <el-button v-if="loginType==1" :style='{"border":"0px solid #fff","cursor":"pointer","padding":"0 0 0 20px","margin":"0 0 20px","color":"#fff","borderRadius":"12px","textAlign":"center","background":"#1d4264","width":"100%","letterSpacing":"20px","fontSize":"24px","height":"66px"}' type="primary" @click="login()" class="loginInBt">登录</el-button>
          <el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"0 8px","margin":"0 5px 10px","borderColor":"rgba(167,142,68,1)","color":"#999","textDecoration":"underline","borderRadius":"0px","background":"none","borderWidth":"0px","width":"auto","fontSize":"inherit","borderStyle":"solid","fontWeight":"500","height":"40px"}' type="primary" @click="register('yisheng')" class="register">注册医生</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>
<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
		verifyCheck2: false,
		flag: false,
      baseUrl:this.$base.url,
      loginType: 1,
      rulesForm: {
        username: "",
        password: "",
        role: "",
      },
      menus: [],
      roles: [],
      tableName: "",
    };
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;

    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].hasBackLogin=='是') {
        this.roles.push(this.menus[i])
      }
    }

  },
  created() {

  },
  destroyed() {
	    },
  components: {
  },
  methods: {

    //注册
    register(tableName){
		this.$storage.set("loginTable", tableName);
		this.$router.push({path:'/register',query:{pageFlag:'register'}})
    },
    // 登陆
    login() {

		if (!this.rulesForm.username) {
			this.$message.error("请输入用户名");
			return;
		}
		if (!this.rulesForm.password) {
			this.$message.error("请输入密码");
			return;
		}
		if(this.roles.length>1) {
			if (!this.rulesForm.role) {
				this.$message.error("请选择角色");
				return;
			}

			let menus = this.menus;
			for (let i = 0; i < menus.length; i++) {
				if (menus[i].roleName == this.rulesForm.role) {
					this.tableName = menus[i].tableName;
				}
			}
		} else {
			this.tableName = this.roles[0].tableName;
			this.rulesForm.role = this.roles[0].roleName;
		}
		
		this.loginPost()
    },
	loginPost() {
		this.$http({
			url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
			method: "post"
		}).then(({ data }) => {
			if (data && data.code === 0) {
				this.$storage.set("Token", data.token);
				this.$storage.set("role", this.rulesForm.role);
				this.$storage.set("sessionTable", this.tableName);
				this.$storage.set("adminName", this.rulesForm.username);
				this.$router.replace({ path: "/" });
			} else {
				this.$message.error(data.msg);
			}
		});
	},
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
      background: url(http://codegen.caihongy.cn/20230831/a6216f5e76c141a1857e4d0616f5a515.jpg);
        
  .list-item /deep/ .el-input .el-input__inner {
		border: 0px solid rgba(167,142,68,.2);
		padding: 0 10px;
		color: #666;
		font-size: inherit;
		border-color: #bfbfbf;
		outline-offset: 0px;
		border-radius: 0px;
		box-shadow: 0 0px 0px rgba(60, 60, 60, .1);
		outline: 0px solid #efefef;
		background: none;
		width: 100%;
		border-width: 1px;
		border-style: solid;
		height: 44px;
	  }
  
  .list-item.select /deep/ .el-select .el-input__inner {
		border: 1px solid rgba(64, 158, 255, 1);
		padding: 0 10px;
		box-shadow: 0 0 6px rgba(64, 158, 255, .5);
		outline: 1px solid #efefef;
		color: rgba(64, 158, 255, 1);
		width: 288px;
		font-size: 14px;
		outline-offset: 4px;
		height: 44px;
	  }
  
  .list-code /deep/ .el-input .el-input__inner {
  	  	border-radius: 0px;
  	  	padding: 0 10px;
  	  	box-shadow: 0 0px 0px rgba(60, 60, 60, .1);
  	  	outline: none;
  	  	color: #666;
  	  	background: none;
  	  	width: calc(100% - 90px);
  	  	font-size: inherit;
  	  	border-color: #bfbfbf;
  	  	border-width: 1px;
  	  	border-style: solid;
  	  	height: 44px;
  	  }

  .list-type /deep/ .el-radio__input .el-radio__inner {
		background: rgba(53, 53, 53, 0);
		border-color: #666666;
	  }
  .list-type /deep/ .el-radio__input.is-checked .el-radio__inner {
        background: #bfbfbf;
        border-color: #bfbfbf;
      }
  .list-type /deep/ .el-radio__label {
		color: #666666;
		font-size: 16px;
	  }
  .list-type /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: rgba(50,50,50,1);
        font-size: 16px;
      }
}

</style>
