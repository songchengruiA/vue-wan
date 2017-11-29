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
				<el-select v-model="gameSource"  class="selected-guess" filterable placeholder="">
					<el-option
							v-for="item in optionsB"
							:key="item.id"
							:label="item.label"
							:value="item.name">
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
						<a @click="addGuess(item)">上传竞猜</a><br><br>
						<a @click="delGuess(item)">删除竞猜</a>
					</td>
					<td rowspan="4" class="add-td col-sm-1 col-xs-1 td-disabled" v-if=" (new Date().getTime()) > item.endTime">
						<a href="javascript:;">上传竞猜</a>
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
		<div class="addguess-body">
			<div class="no-data setguess ng-scope" v-if="pageList.length == 0"></div>
			<a class="btn btn-default btn-lg addBtn" href="javascript:;" @click="addGame">创建预备竞猜</a>

		</div>
		<!--新增界面-->
		<el-dialog title="新增" v-model="dialogVisible" :close-on-click-modal="false" class="dialog-small">
			<el-form :model="addData" label-width="100px" ref="addForm" >
				<el-form-item label="游戏类型" prop="name">
					<el-input v-model="addData.gameTypeName" auto-complete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="所属赛事" prop="name">
					<el-select v-model="league"  value-key="leagueName" class="selected-gameTypeName" filterable  placeholder="请选择游戏赛事">
						<el-option
								v-for="item in leagueList"
								:key="item.id"
								:label="item.leagueName"
								:value="item"auto-complete="off">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属比赛" prop="name">
					<el-select v-model="teamA"  value-key="teamName"  filterable  placeholder="请选择战队A">
						<el-option
								v-for="item in teamList"
								:key="item.id"
								:label="item.teamName"
								:value="item" auto-complete="off">
						</el-option>
					</el-select>
					VS
					<el-select v-model="teamB"  value-key="teamName"  filterable  placeholder="请选择战队B">
						<el-option
								v-for="item in teamList"
								:key="item.id"
								:label="item.teamName"
								:value="item" auto-complete="off">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" prop="picUrl">
					<div class="pull-left text-left">
						<div class="flag-img one">
							<img v-bind:src="teamA.teamLogoUrl" v-show="teamA.teamLogoUrl">
						</div>
					</div>
					<div class="pull-left text-left">
						<div class="flag-img two">
							<img v-bind:src="teamB.teamLogoUrl" v-show="teamB.teamLogoUrl">
						</div>
					</div>
				</el-form-item>
				<el-form-item label="竞猜名称" prop="name"  class="max-w">
					<el-select v-model="map"   filterable  placeholder="选填">
						<el-option
								v-for="item in maps"
								:value="item" auto-complete="off">
						</el-option>
					</el-select>
					<el-select v-model="selectName"   filterable  placeholder="选填">
						<el-option
								:value="teamA.teamName" auto-complete="off">
						</el-option>
						<el-option
								:value="teamB.teamName" auto-complete="off">
						</el-option>
					</el-select>
					<el-select v-model="selectType"   filterable >
						<el-option
								v-for="item in types"
								:value="item" auto-complete="off">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="截止时间">
					<el-date-picker
							v-model="addData.date"
							type="datetime"
							placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="下注项1名称">
					<el-input
							v-model="addData.optionA"
							type="datetime"
							placeholder="下注项1名称">
					</el-input>
				</el-form-item>
				<el-form-item label="下注项1赔率">
					<el-input
							v-model="addData.oddsA"
							type="datetime"
							placeholder="下注项1赔率">
					</el-input>
				</el-form-item>
				<el-form-item label="下注项2名称">
					<el-input
							v-model="addData.optionB"
							type="datetime"
							placeholder="下注项2名称">
					</el-input>
				</el-form-item>
				<el-form-item label="下注项2赔率">
					<el-input
							v-model="addData.oddsB"
							type="datetime"
							placeholder="下注项2赔率">
					</el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
    import { getRequest ,renew,upload, delGaming,getGameName,getTeamName,creatGame} from '../../api/api';
    import { formatDate } from '../../api/date';
    var tableData = require('../../api/table.json')
	console.log(tableData[0].CSGO)
    export default {
        data() {
            return {
                optionsA: [
                    {id: 2, label: 'LOL'},
                    {id: 3, label: 'DOTA2'},
                    {id: 1, label: 'CSGO'},
                    {id: 4, label: '王者荣耀'}
                    ],
                optionsB: [
                    {id: 1, name: '后台'}
				],
                dialogVisible: false,
                gameType: 'LOL',
                gameSource: '后台',
                time: '',
                pageList: [],
                leagueList:[],
                teamList: [],
                //新增界面数据
                addData: {
                    gameTypeName: '',
                    optionA:'',
                    oddsA:'',
                    optionB:'',
                    oddsB:'',
                    date:''
                },
				teamA:{
                    teamName:''
                },
				teamB: {
                    teamName:''
                },
                league:{
                    _id:'',
                    leagueName:''
				},
				limit:'',
				table: tableData,
				map:'',
				maps:[],
                selectName:'',
                selectType:'独赢',
                types:[]
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
                    gambleSource:1,
					gameType:this.gameType.id?this.gameType.id:2,
                };
                 para.startTime = this.time[0]?Date.parse(this.time[0]):null;
                 para.endTime = this.time[1]?Date.parse(this.time[1]):null;
                getRequest(para).then((res) => {
					this.pageList =  res.data.data.list
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
    		addGuess(item) {
                var saveData = {
                    leagueId : item._id,
                    leagueName: item.leagueName,
                    gambleName : item.gambleName,
                    gameType : item.gameType,
                    gambleType : item.gambleType,
                    gambleSource : item.gambleSource,
                    gambleSourceId : item.gambleSourceId,
                    endTime : item.endTime,
                    gambleStatus : item.gambleStatus,
                    teamA : item.optionA.teamA,
                    teamB : item.optionB.teamB,
                    optionA : item.optionA.name,
                    optionB : item.optionB.name,
                    oddsA : item.optionA.odds,
                    oddsB : item.optionB.odds,
                    optionARiskFund : item.optionA.riskFund,
                    optionBRiskFund : item.optionB.riskFund,
                    optionAPayCeiling : item.optionA.payCeiling,
                    optionBPayCeiling : item.optionB.payCeiling
                }
                this.$confirm('确认上传吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    upload(saveData).then(res =>{
                        if (res.status === 1) {
                            this.requestList()
                        } else {
                            alert(res.msg);
                        }
					})
                }).catch(() => {

                });
			},
            delGuess(item) {
				let _id = item._id
                this.$confirm('确认删除吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    delGaming(_id).then(res =>{
                        if (res.status === 1) {
                            this.requestList()
                        } else {
                            alert(res.msg);
                        }
                    })
                }).catch(() => {

                });
			},
            addGame() {
                this.addData = {
                    gameTypeName: '',
                    optionA:'',
                    oddsA:'',
                    optionB:'',
                    oddsB:'',
                    date:''
                },
				this.league={
                    _id:'',
                    leagueName:''
				},
                this.teamA = {
                    teamName:''
                },
                this.teamB = {
                    teamName:''
                },
                this.limit ='',
				this.table = tableData,
				this.map = '',
				this.maps = [],
				this.selectName ='',
				this.selectType = '独赢',
				this.types = [],
                this.addData.gameTypeName = this.gameType.label?this.gameType.label:'LoL',
                this.dialogVisible = true
				let data = {
                    limit: 10000,
                    gameType: this.gameType.id?this.gameType.id:'2',
				};
                getGameName(data).then((res) => {
                    this.leagueList = res.data.data.list
					console.log(this.leagueList)
                });
                getTeamName(data).then((res) => {
                    this.teamList = res.data.data.list
				})
				this.maps = (data.gameType!==4)?this.table[0].MapOne:this.table[0].MapTwo;
				this.types = (data.gameType == 2)?this.table[0].LOL:((data.gameType== 3)?this.table[0].Dota2:((data.gameType == 1)?this.table[0].CSGO:((data.gameType == 4)?this.table[0].Wangzhe:'独赢')))
            },
            addSubmit(){
                var name = this.map + this.selectName + this.selectType
                var nam = name.replace(/['0']/g,'')
                let saveData = {
                    leagueId : this.league._id,
                    gambleSourceId: Date.parse(new Date()),
                    endTime : Date.parse(this.addData.date),
                    gambleName : nam,
                    gambleSource : 1,
                    gambleType : 1,
                    gambleStatus : 1,
                    gameType: this.gameType.id?this.gameType.id:'2',
                    leagueName: this.league.leagueName,
                    teamA : this.teamA.teamName,
                    teamB : this.teamB.teamName,
                    optionA : this.addData.optionA,
                    optionB : this.addData.optionB,
                    oddsA : this.addData.oddsA,
                    oddsB : this.addData.oddsB
				}
                creatGame(saveData).then(res =>{
                    if (res.status === 1) {
                        this.dialogVisible = false;
                        this.requestList()
                    } else {
                        alert(res.msg);
                    }
                })
            }

        },

    }
</script>
<style lang="scss">
	.dialog-small{
		.el-dialog{
			width: 40%!important;
		}
		.el-dialog__body {
			padding: 30px 56px 30px 31px;
		}
		.selected-gameTypeName{
			width: 100%;
		}
		.flag-img{
			width: 120px;
			height: 86px;
			border: 1px solid #b2b2b2;
			img{
				padding: 2px;
				width: 100%;
				height: 100%;
			}
		}
		.two{
			margin-left: 106px;
		}
		.max-w{
			.el-select {
				max-width: 184px;
			}
		}
	}
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
	.match_a{
		.ui-select-container{

			.ui-select-match{
				>span{
					height: 28px;
					border: 1px solid #b1b0b8;
					border-radius: 2px;
					line-height: 16px;
				}

			}
		}

	}


</style>