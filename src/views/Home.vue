<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo logo-width">
			</el-col>
			<el-col :span="7" class="title">
				玩电竞竞猜后台
			</el-col>
			<el-col :span="6" class="userinfo">
				<span class="el-dropdown-link userinfo-inner">管理员</span>
				<a class="el-dropdown-link userinfo-inner loginOut" divided @click="logout">退出</a>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.clear();
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		}
	}

</script>

<style scoped lang="scss">
	.container {
		font-family: "PingFangSC-Regular", "Microsoft YaHei", "sans-serif", "Arial Narrow";
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 91px;
			line-height: 90px;
			background: #fff;
			color:#555;
			border-bottom: 1px solid #dddddd;
			border-radius: 0;
			box-shadow: 0 2px 2px 0 #e6e6e6;
			margin-bottom: 0;
			position: absolute;
			z-index: 222;
			.title{
				font-size: 28px;
				margin-left: 40px;
				color: #000;
			}
			.userinfo {
				text-align: right;
				float: right;
				.userinfo-inner {
					font-size: 20px;
				}
				.loginOut{
					background:#e9e8e9;
					width: 90px;
					text-align: center;
					display: inline-block;
				}
			}
			.logo {
				width: 250px;
				height: 90px;
				background: #fc3938;
				background-image: url(../images/logo.jpg);
				background-repeat: no-repeat;
				background-position-x: 38px;
				background-position-y: 21px;
				img {
					width: 40px;
					vertical-align: middle;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:250px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 90px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 250px;
				width: 250px;
				color: #cfcfcf;
				font-size: 16px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
					background: #3d4250;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.el-menu-item:hover{
				color: #fff;
			}
			.el-menu-item {
				height: 90px;
				color: #cfcfcf;
				font-size: 16px;
				padding: 35px 0 38px 32px;
				line-height: 24px;
				border-bottom: 3px solid #323845;
				cursor: pointer;
				padding-left: 32px!important;
				font-weight: 600;
				background: #454b5a;
			}
			.el-submenu__icon-arrow{
				margin-top: -4px;
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 250px;
				width: 250px;
				overflow-x: hidden;
				overflow-y: auto;
				padding: 0;
				background: #3d4250;
				z-index: 1110;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>