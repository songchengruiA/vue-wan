<template class="addguess">
	<div class="col-sm-12">
		<form class="form-inline form-search addguess-head">
			<div class="form-group">
				<label class="size-set pull-left" style="margin-left: 0px">选择游戏类型:</label>
				<el-select v-model="gameType"  value-key="id" class="selected-guess" filterable placeholder="">
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

		<div class="addguess-body">
			<div class="no-data setguess ng-scope"></div>
			<a class="btn btn-default btn-lg addBtn" href="javascript:;">创建预备竞猜</a>
		</div>

	</div>
</template>

<script>
    import { getRequest } from '../../api/api';
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
                gameType: 'LOL',
                gameSource: '后台',
                time: '',
            }
        },
        methods: {
            requestList() {

                let para = {
                    gambleSource:1,
					gameType:this.gameType.id?this.gameType.id:2,
                };
                 para.startTime = this.time[0]?Date.parse(this.time[0]):null;
                 para.endTime = this.time[1]?Date.parse(this.time[1]):null;
                getRequest(para).then((res) => {
                    console.log(res)
				})
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
			margin: 65px 0 0 -100px;
			text-decoration: none;
			position: relative;
			top: 55px;
		}
	}


</style>