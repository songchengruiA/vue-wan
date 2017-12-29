<template class="addguess">
	<div class="col-sm-12">
		<form class="form-inline form-search addguess-head">
			<div class="form-group">
				<label class="size-set pull-left" style="margin-left: 0px">选择游戏类型:</label>
				<el-select v-model="gameType"  value-key="id" class="selected-guess" filterable placeholder="" @change="gameChange">
					<el-option
							v-for="item in optionsA"
							:key="item.id"
							:label="item.label"
							:value="item">
					</el-option>
				</el-select>
			</div>
			<div class="form-group">
				<label class="size-set pull-left">选择赛事来源:</label>
				<el-select v-model="gameSource" value-key="id" class="selected-guess" filterable placeholder=""  @change="gameChange">
					<el-option
							v-for="item in optionsB"
							:key="item.id"
							:label="item.name"
							:value="item">
					</el-option>
				</el-select>
			</div>
			<div class="form-group">
				<label class="size-set pull-left">选择赛程:</label>
				<el-select v-model="gameSchedule" class="selected-guess" filterable placeholder="" >
					<el-option value="全部赛程">全部赛程
					</el-option>
				</el-select>
			</div>
			<div class="block">
				<el-date-picker
						v-model="time"
						type="daterange"
						placeholder="选择时间"
						format="yyyy-MM-dd">
				</el-date-picker>
			</div>
			<div class="form-group" style="float: right;margin-right: 0px;margin-top: -25px">
				<el-button type="primary" @click="search">搜索</el-button>
			</div>
			<div class="line-block"></div>
		</form>
		<div style="clear: both"></div>
		<div class="col-sm-12 add-guess-list">
			<table v-for="item in pageList" class="table add-guess-table col-sm-12" >
				<tr>
					<td rowspan="2" class="td-bg-t col-sm-1 col-xs-1">竞猜名称</td>
					<td rowspan="2" class="td-bg-t col-sm-1 col-xs-1">数据来源</td>
					<td rowspan="2" class="td-bg-t col-sm-1 col-xs-1">所属赛事</td>
					<td rowspan="2" class="td-bg-t">所属比赛</td>
					<td rowspan="2" class="td-bg-t col-sm-2 col-xs-2">截止时间</td>
					<td class="td-font-size td-bg-t col-sm-1 col-xs-1">下注项1名称</td>
					<td class="td-font-size td-bg-t col-sm-1 col-xs-1">下注项1赔率</td>
					<td class="td-font-size td-bg-t col-sm-1 col-xs-1">单注赔付上限</td>
					<td class="td-font-size td-bg-t col-sm-1 col-xs-1">风险金</td>
					<td rowspan="4" class="add-td col-sm-1 col-xs-1" v-if=" (new Date().getTime()) <= item.endTime">
						<a @click="addGuess(item)">上传竞猜</a>
					</td>
				</tr>
				<tr>
					<td class="td-font-size">{{item.optionA.name}}</td>
					<td class="td-font-size">{{item.optionA.odds}}</td>
					<td class="td-font-size td-bg-c"><input type="text" v-model="item.optionA.payCeiling" @change="upData(item)"></td>
					<td class="td-font-size td-bg-c"><input type="text" v-model="item.optionA.riskFund" @change="upData(item)"></td>
				</tr>
				<tr>
					<td rowspan="2">{{item.gambleName}}</td>
					<td rowspan="2">后台</td>
					<td rowspan="2">{{item.league.leagueName}}</td>
					<td rowspan="2">{{item.match}}</td>
					<td rowspan="2">{{item.endTime | formatDate}}</td>
					<td class="td-font-size td-bg-t col-sm-1 col-xs-1">下注项2名称</td>
					<td class="td-font-size td-bg-t col-sm-1 col-xs-1">下注项2赔率</td>
					<td class="td-font-size td-bg-t col-sm-1 col-xs-1">单注赔付上限</td>
					<td class="td-font-size td-bg-t col-sm-1 col-xs-1">风险金</td>
				</tr>
				<tr>
					<td class="td-font-size">{{item.optionB.name}}</td>
					<td class="td-font-size">{{item.optionB.odds}}</td>
					<td class="td-font-size td-bg-c"><input type="text" v-model="item.optionB.payCeiling" @change="upData(item)"></td>
					<td class="td-font-size td-bg-c"><input type="text" v-model="item.optionB.riskFund" @change="upData(item)"></td>
				</tr>
			</table>
		</div>
		<!--工具条-->
		<el-col :span="24" class="toolbar" v-if="pageList.length != 0">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="tpageSize"
						   :total="total">
			</el-pagination>
		</el-col>
		<div class="addguess-body">
			<div class="no-data setguess ng-scope" v-if="pageList.length == 0"></div>
		</div>
		<!--详情上传界面-->
		<el-dialog v-model="dialogVisible" :close-on-click-modal="false" class="dialog-small" :show-close="false">
			<form name="add_form" novalidate ng-submit="submit()">
				<div class="content" style="padding-left: 70px;">
					<div class="add-guess-creat">
						<table class="table add-guess-table" style="color:#666;">
							<tr>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">所属赛事：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.league.leagueName}}</label>
										</div>
									</div>
								</td>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">所属比赛：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.match}}</label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">截止时间：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.endTime}}</label>
										</div>
									</div>
								</td>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">竞猜名称：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right" style="color:#169bd5;">{{itemData.gambleName}}</label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">下注项1名称：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.optionA.name}}</label>
										</div>
									</div>
								</td>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">下注项2名称：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.optionB.name}}</label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">下注项1赔率：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.optionA.odds}}</label>
										</div>
									</div>
								</td>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">下注项2赔率：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.optionB.odds}}</label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">下注项1的赔付上限：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.optionA.payCeiling}}</label>
										</div>
									</div>
								</td>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">下注项2的赔付上限：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.optionB.payCeiling}}</label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">下注项1的风险金：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.optionA.riskFund}}</label>
										</div>
									</div>
								</td>
								<td width="50%">
									<div class="col-md-12">
										<div class="pull-left input-title text-right">
											<label class="text-right">下注项2的风险金：</label>
										</div>
										<div class="pull-left text-left">
											<label class="text-right">{{itemData.optionB.riskFund}}</label>
										</div>
									</div>
								</td>
							</tr>
						</table>

					</div>
				</div>
				<div class="dialog-footer">
					<el-button @click.native="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit(itemData)">提交</el-button>
				</div>
			</form>

		</el-dialog>

	</div>
</template>

<script>
    import { getRequest ,renew,upload, delGaming,creatGameA} from '../../api/api';
    import { formatDate } from '../../api/date';
    export default {
        data() {
            return {
                total: 0,
                page: 1,
                tpageSize: 5,
                optionsA: [
                    {id: 2, label: 'LOL'},
                    {id: 3, label: 'DOTA2'},
                    {id: 1, label: 'CSGO'},
                    {id: 4, label: '王者荣耀'}
                ],
                optionsB: [
                    { id: 1 , name : "后台"},
                    { id: 2 , name : "EGB"},
                    { id: 4 , name : "cmd368"}
                ],
                dialogVisible: false,
                gameType: 'LOL',
                gameSource: 'EGB',
                gameSchedule:'全部赛程',
                time: '',
                pageList: [],
                leagueList:[],
                teamList: [],
                itemData:{
                    league:{},
                    optionA:{},
                    optionB:{}
				}
            }
        },
        mounted() {
            this.requestList();
        },
        filters: {
            formatDate (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            },
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            requestList() {
                let para = {
                    gambleSource:this.gameSource.id?this.gameSource.id:2,
                    gameType:this.gameType.id?this.gameType.id:2,
                    offset: this.page * this.tpageSize - this.tpageSize,
                    limit: this.tpageSize
                };
                para.startTime = this.time[0]?Date.parse(this.time[0]):null;
                para.endTime = this.time[1]?Date.parse(this.time[1]):null;
                getRequest(para).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList =  res.data.data.list
                        this.total = res.data.data.total - 1;
                        console.log(res.data.data.total)
                    } else if(res.data.status ==300011){
                        sessionStorage.clear();
                        this.$router.push('/login');
                    }else {
                        alert(res.data.msg)
                    }

                });

            },
            gameChange() {
                this.requestList()
            },
            search() {
                this.requestList()
            },
            upData(item) {
                let data ={
                    gambleId : item._id,
                    optionA: {
                        riskFund: item.optionA.riskFund,
                        payCeiling: item.optionA.payCeiling
                    },
                    optionB: {
                        riskFund: item.optionB.riskFund,
                        payCeiling: item.optionB.payCeiling
                    }
                };
                renew(data).then(res => {
                    if (res.status === 1) {
                        alert('修改成功');
                    } else {
                        alert('请求失败');
                    }
                });
            },
            //分页
			handleCurrentChange(val) {
				this.page = val;
				this.leaguesList();
			},
			//上传
            addGuess(item) {
                this.dialogVisible = true;
                this.itemData = item
			},
            addSubmit(itemDate) {
                var saveData = {
                    leagueId : itemDate._id,
                    leagueName: itemDate.leagueName,
                    gambleName : itemDate.gambleName,
                    gameType : itemDate.gameType,
                    gambleType : itemDate.gambleType,
                    gambleSource : itemDate.gambleSource,
                    gambleSourceId : itemDate.gambleSourceId,
                    endTime : itemDate.endTime,
                    gambleStatus : itemDate.gambleStatus,
                    teamA : itemDate.optionA.teamA,
                    teamB : itemDate.optionB.teamB,
                    optionA : itemDate.optionA.name,
                    optionB : itemDate.optionB.name,
                    oddsA : itemDate.optionA.odds,
                    oddsB : itemDate.optionB.odds,
                    optionARiskFund : itemDate.optionA.riskFund,
                    optionBRiskFund : itemDate.optionB.riskFund,
                    optionAPayCeiling : itemDate.optionA.payCeiling,
                    optionBPayCeiling : itemDate.optionB.payCeiling
                }
                this.$confirm('确认上传吗?', '提示', {
                }).then(() => {
                    creatGameA(saveData).then(res =>{
                        if (res.status === 1) {
                            this.dialogVisible = false;
                            this.requestList()
                        } else {
                            alert(res.msg);
                        }
                    })
                }).catch(() => {

                });

			}

        },

    }
</script>
<style lang="scss">
	.el-select-dropdown__item {
		padding: 4px 10px!important;
		height: 27px!important;
	}
	.addguess-head{
		.form-group{
			float: left;
			button{
				font-weight: 600;
				font-size: 16px;
				padding: 8px;
			}
		}
		.size-set{
			margin-right: 8px;
			margin-left: 25px;
			font-size: 16px;
		}
		.line-block{
			clear: both;
			width: 100%;
			height: 1px;
			border-bottom: 1px solid #d7d7d7;
			padding-top: 10px;
		}
		.selected-guess{
			.el-input{
				.el-input__icon{
					width: 27px;
				}
				.el-input__inner{
					height: 22px;
					line-height: 22px;
					width: 120px;
				}
			}
		}
		.block {
			.el-date-editor{
				margin-left: 30px;
				.el-input__icon+.el-input__inner{
					height: 22px!important;
					line-height: 22px!important;
				}
			}
		}
	}
	.addguess-body{
		text-align: center;
		.no-data {
			background: url(../../images/icon-no-data.png) no-repeat;
			width: 240px;
			height: 200px;
			margin: auto;
			margin-top: 5%;
		}
		.btn-lg.btn-default {
			background: #454a5a;
			color: #fff;
			font-size: 18px;
			font-weight: 200;
			padding: 7px 17px;
			min-width: 140px;
			border-radius: 6px;
			margin: 50px 0 0 -100px;
			text-decoration: none;
			position: relative;
		}
	}
	.add-guess-list{
		margin-top: 10px;
		.add-guess-table{
			width:100%;
			border-spacing: 0;
			border:1px solid #CCCCCC;
			border-radius: 5px;
			border-collapse: separate;
			margin-bottom: 10px;
			td{
				text-align: center;
				vertical-align: middle;
				padding: 8px;
				border-left: 1px solid #CCCCCC;
				border-top: 1px solid #CCCCCC;
			}

			tr:first-child td{
				border-top:none;
			}
			tr:first-child td:first-child{
				border-left:none;
			}
			tr:nth-child(3) td:first-child{
				border-left:none;
			}

			.td-font-size{
				font-size: 14px;
			}

			.td-bg-t{
				background: #e9e8e9;
			}
			.td-bg-c{
				background: #c7c7c7;
				input{
					width:98%;
					border:none;
					background:#c7c7c7;
					text-align: center;
				}
			}
			.add-td{
				cursor: pointer;
				background: #f4f4f4;
				a{
					color: #169bd5;
					&:hover{
						text-decoration: none;
					}
				}
			}
			.td-disabled{
				background: #bababa !important;
				a{
					color:#f2f1f1;
				}
			}
		}

	}


</style>