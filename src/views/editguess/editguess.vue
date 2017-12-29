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
				<label class="size-set pull-left">选择竞猜状态:</label>
				<el-select v-model="matchStatus" value-key="id" class="selected-guess" filterable placeholder=""  @change="gameChange">
					<el-option
							v-for="item in optionsB"
							:key="item.id"
							:label="item.name"
							:value="item">
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
		<!-- 赛事列表 -->
		<div class="edit-guess-list guess-table" v-if="pageList">
			<table class="table">
				<tr v-for="item in pageList">
					<td>
						<div class="border first" style="border-left: 1px solid #d7d7d7;">
							<div>
								<div class="original" v-show="item.match.matchSource == 1">
									<img src="../../images/original.png" alt="">
								</div>
							</div>
						</div>
					</td>
					<td class="text-right" width="280">
						<div class="border">
							<div class="middle">
								<div class="team-logo pull-right padding-right-40">
									<img v-bind:src="item.match.teamA.teamLogoUrl" width="80px">
								</div>
							</div>
						</div>
					</td>
					<td class="text-center" style="min-width: 140px;">
						<div class="border text-left">
							<div class="middle title">{{item.match.teamA.teamName}}</div>
						</div>
					</td>
					<td class="text-center" style="min-width: 240px;">
						<div class="border">
							<div class="middle">
								<p>{{item.leagues.leagueName}}</p>
								<p>{{item.match.endTime | formatDate}}
								</p>
								<span class="label label-success" v-if="item.match.matchStatus == 1">竞猜中</span>
								<span class="label label-danger" v-if="item.match.matchStatus == 2">进行中</span>
								<span class="label label-info" v-if="item.match.matchStatus == 3">已结束</span>
								<span class="label label-info" v-if="item.match.matchStatus == 4">已结束</span>
							</div>
						</div>
					</td>
					<td class="text-center" style="min-width: 140px;">
						<div class="border text-right">
							<div class="middle title">{{item.match.teamB.teamName}}</div>
						</div>
					</td>
					<td class="text-left" width="280">
						<div class="border">
							<div class="middle title padding-left-40">
								<div class="team-logo pull-left">
									<img v-bind:src="item.match.teamB.teamLogoUrl" width="80px">
								</div>
							</div>
						</div>
					</td>
					<td class="games-btn">
						<div class="border last">
							<router-link :to="{path:'/editguess/'+item.match._id, query:{leagueName:item.leagues.leagueName,endTime:item.match.endTime,gameType:item.match.gameType}}" class="btn btn-sm btn-info">{{item.match.gambleNum > 0 ? '+'+item.match.gambleNum : '+0'}}</router-link>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="addguess-body">
			<div class="no-data setguess ng-scope" v-if="pageList.length == 0"></div>
		</div>
	</div>
</template>

<script>
    import { getGameGuess } from '../../api/api';
    import { formatDate } from '../../api/date';
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
                    { id: '' , name : "全部"},
                    { id: 1 , name : "竞猜中"},
                    { id: 2 , name : "进行中"},
                    { id: 3 , name : "已结束"}
                ],
                dialogVisible: false,
                gameType: 'LOL',
                matchStatus: '全部',
                time: '',
                pageList: []
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
                    matchStatus:this.matchStatus.id?this.matchStatus.id:'',
                    gameType:this.gameType.id?this.gameType.id:2,
                };
                para.startTime = this.time[0]?Date.parse(this.time[0]):null;
                para.endTime = this.time[1]?Date.parse(this.time[1]):null;
                getGameGuess(para).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList =  res.data.data.list
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
	.edit-guess-list{
		margin-top:5px;
		td,th{
			&.games-btn{
				width: 80px;
				text-align: center;
				.btn{
					margin-top: 28px;
					border: 1px solid #b1b0b8;
					color: #000;
					background: #eae8e9;
					font-size: 16px;
					padding: 8px;
					line-height: 16px;
					&
					,&:hover
					,&.hover
					,&:focus
					,&.focus
					,&:active
					,&.active
					,&:active:hover
					,&.active:hover
					,&:active:focus
					,&.active:focus{
						border: 1px solid #b1b0b8;
						color: #000;
						background: #eae8e9;
					}
				}
			}
			&.games-detail-btn{
				.table-middle{
					height: 90px;
					.btn{
						margin-left: 10px;
						margin-bottom: 10px;
						float: left;
					}
				}
			}
			.middle{
				display: table-cell;
				vertical-align: middle;
				input{
					position: relative;
					top: 4px;
					height: 24px;
					line-height: 24px;
					display: inline-block;
					border: 1px solid #c0c0c0;
					padding: 0;
					font-size: 16px;
					text-align: center;
					margin-bottom: 5px;
					&.error{
						border:1px solid red;
					}
				}
			}
			.title{
				font-size: 18px;
			}

		}
	}
	.guess-table{
		.middle{
			position: relative;
		}
		pre{
			position: absolute;
			top:0;
			left: 0;
			opacity: 0;
			padding: 0;
			line-height: 1;
			border-radius: 0;
			margin: 0;
			display: inline-block;
			font-size: 18px;
			overflow: visible;
			padding-left: 0;
		}
		.table{
			min-width: 700px;
		}
			.border{
				border-top: 1px solid #d7d7d7;
				border-bottom: 1px solid #d7d7d7;
				height: 90px;
				display: inline-table;
				width: 100%;
				margin-bottom: 10px;
			}
			.input{
				background: #FFF;
			}
			.input.readonly{
				background: #FFF;
				border-color: #FFF;
			}
		.table tr:hover{

			.border{
				background: #f4f4f4;
			}
			.input{
				&.readonly{
					border-color: #f4f4f4;
					background: #f4f4f4;
					&.error{
						border-color: #f4f4f4;
					}
				}
			}
			.input.readonly{
				background: #f4f4f4;
				border-color: #f4f4f4;
			}
		}

		.border{
			background: #fff;
			height: 114px;
		}

		tr{
			.border .first{
				position: relative;
				.original{
					position: absolute;
					left:0;
					top:0;
					z-index: 10;
				}
				.hidden-icon{
					position: absolute;
					left: 0;
					bottom:0;
					z-index: 9;
				}
				.win{
					float:right;
					margin-right: 40px;
				}
			}
		}
		td,th{
			.border.first{
			}
			.last{
				border-left:1px solid #d7d7d7;
				border-right:1px solid #d7d7d7;
			}
		}
		.dropdown{
			display: inline-block;
		}
		.img-margin-right{
			margin-right: 20px;
		}
		.img-margin-left{
			margin-left: 20px;
		}
		.font-18{
			font-size: 18px;
		}
		.input{
			display: inline-block;
			border: 1px solid #c0c0c0;
			padding: 0;
			line-height: 18px;
			font-size: 16px;
			text-align: center;
			margin-bottom: 5px;
			&.input-50{
				width: 50px;
				font-size: 18px;
				line-height: 20px;
			}
			&.input-100{
				width: 140px;
				font-size: 18px;
				line-height: 20px;
			}
			&.input-70{
				width: 70px;
			}
			&.input-150{
				width: 150px;
			}
			&.no-margin{
				margin: 0;
			}
			&.readonly{
				border-color: #FFF;
				&.error{
					border: 1px solid #FFF;
				}
			}
			&.error{
				border: 1px solid red;
			}
			&:focus{
				outline: none;
			}
		}
		.team-logo{
			width: 100px;
			text-align: center;
			img {
				max-height: 100px;
				max-width: 80px;
			}
		}
		.padding-right-40{
			padding-right: 40px;
		}
		.padding-left-40{
			padding-left: 40px;
		}
	}

</style>