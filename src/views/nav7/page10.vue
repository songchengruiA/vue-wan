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
                <el-select v-model="betStatus" value-key="id" class="selected-guess" filterable placeholder=""  @change="gameChange">
                    <el-option
                            v-for="item in optionsB"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="line-block"></div>
        </form>
        <div style="clear: both"></div>
        <!-- 赛事列表 -->
        <div class="edit-guess-list guess-table" v-if="pageList">
            <table class="table">
                <tr v-for="item in pageList">
                    <td class="text-right" width="280">
                        <div class="border"  style="border-left: 1px solid #d7d7d7;">
                            <div class="middle">
                                <img v-bind:src="item.publicityImage" width="180px" height="72" @click="bigPic(item)">
                            </div>
                        </div>
                    </td>
                    <td style="min-width: 400px;">
                        <div class="border ">
                            <div class="middle" style="font-size: 16px;line-height: 28px">
                                <div class="col-sm-4 col-xs-4 text-right">竞猜名称：</div>
                                <div class="col-sm-8 col-xs-8 text-info">{{item.betName}}</div>
                                <div class="col-sm-4 col-xs-4 text-right">截止时间：</div>
                                <div class="col-sm-8 col-xs-8 text-info">{{item.endTime | formatDate}}</div>
                            </div>
                        </div>
                    </td>
                    <td style="min-width: 220px">
                        <div class="border" style="border-right: 1px solid #d7d7d7;">
                            <div class="middle" style="font-size: 16px;line-height: 28px">
                                <div class="col-sm-6 col-xs-6 text-right">竞猜项：</div>
                                <div class="col-sm-6 col-xs-6 text-danger">{{item.betOptions.length}}</div>
                                <div class="col-sm-6 col-xs-6 text-right">竞猜状态：</div>
                                <div class="col-sm-6 col-xs-6">
                                    <span class="label label-success" v-if="item.betStatus == 1">竞猜中</span>
                                    <span class="label label-danger" v-if="item.betStatus == 2">进行中</span>
                                    <span class="label label-info" v-if="item.betStatus == 3">已结束</span>
                                    <span class="label label-info" v-if="item.betStatus == 4">已结束</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="guess-btn" style="width: 120px; padding-left: 15px">
                        <router-link :to="{path:'/page10/add/'+item._id}" class="btn btn-sm btn-info">详情</router-link>
                        <router-link :to="{path:'/page10/add/'+item._id, query:{edite:true}}" class="btn btn-sm btn-info" v-if="item.betStatus == 1">修改</router-link>
                        <button class="btn btn-sm btn-danger" v-if="item.betStatus == 1" @click="setGuessStop(item)" style="margin-top: 15px;">停止</button>
                        <button class="btn btn-sm btn-warning" v-if="item.betStatus == 2" @click="settlement(item)">结算</button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="addguess-body">
            <div class="no-data setguess ng-scope" v-if="pageList.length == 0"></div>
            <router-link :to="{path:'/page10/add'}" class="btn btn-default btn-lg addBtn">创建趣味竞猜</router-link>
        </div>
        <!-- 图片放大 -->
        <el-dialog  v-model="bigImg" center>
            <img v-bind:src="bigPicUrl" width="100%">
        </el-dialog>
        <!--结算界面-->
        <el-dialog title="结算" v-model="dialogVisible" :close-on-click-modal="false" class="dialog-small settlement">
            <div class="content">
                <div class="edit-guess-end-content">
                    <div class="col-md-3 text-center">
                        <div class="settlement-div">竞猜名称</div>
                        <div>{{itemData.betName}}</div>
                    </div>
                    <div class="col-md-6 text-center">
                        <div class="settlement-div">竞猜状态</div>
                        <div class="label label-xs label-danger">进行中</div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="settlement-div">结束时间</div>
                        <div>{{itemData.endTime | formatDate}}</div>
                    </div>
                </div>
            </div>
            <template>
                <el-radio-group v-model="selectedData" class="settlement-radio">
                    <el-radio :label="1" class="el-col-5 text-center" style="margin-left: 15px;text-align: left">流盘</el-radio>
                    <el-radio :label="item" @click="radio(item)" class="el-col-5 text-center" style="text-align: left" v-for="item in itemData.betOptions"> {{item.optionName}}胜</el-radio>
                </el-radio-group>
            </template>
            <div style="clear: both"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit(itemData)">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getSetGuess,postSetGuess } from '../../api/api';
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
                betStatus: '全部',
                time: '',
                pageList: [],
                bigImg: false,
                bigPicUrl:'',
                itemData:{},
                selectedData:1,
                optionOdds:'',
            }
        },
        mounted() {
            this.requestList();
        },
        filters: {
            formatDate (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
        },
        methods: {
            requestList() {
                let para = {
                    betStatus:this.betStatus.id?this.betStatus.id:'',
                    gameType:this.gameType.id?this.gameType.id:2,
                };
                getSetGuess(para).then((res) => {
                    this.pageList =  res.data.data.list
                    console.log(this.pageList)
                });

            },
            gameChange() {
                this.requestList()
            },
            //放大图片
            bigPic(item){
                this.bigImg = true
                this.bigPicUrl = item.publicityImage
            },
            //结算
            settlement(item){
                this.dialogVisible = true
                this.itemData = item
            },
            radio(item){
                console.log(item)
            },
            //停止
            setGuessStop(item){
                console.log(item)
                let data = {
                    funbetId  : item._id,
                    betStatus : 2,
                    betName : item.betName,
                    betSource : item.betSource,
                    endTime : typeof item.endTime === 'number' && !isNaN(item.endTime) ? Date.parse(new Date(item.endTime)) : Date.parse(item.endTime),
                    gameType : item.gameType,
                }
                postSetGuess(data).then(res =>{
                    if (res.data.status === 1) {
                        alert('停止成功')
                        item.betStatus =2
                    } else {
                        alert(res.msg);
                    }
                })
            },
            //结算提交
            addSubmit(itemData){
                var endData = {
                    optionWin:{}
                };
                var optionWin={
                    optionName:this.selectedData.optionName,
                    optionOdds: '1.5'
                }
                if(this.selectedData == 1){
                    endData = {
                        funbetId : itemData._id,
                        betName : itemData.betName,
                        betSource : itemData.betSource,
                        betStatus : 4,
                        endTime : itemData.endTime,
                        gameType : itemData.gameType,
                    }
                }else {
                    endData = {
                        funbetId : itemData._id,
                        betName : itemData.betName,
                        betSource : itemData.betSource,
                        betStatus : 3,
                        endTime : itemData.endTime,
                        gameType : itemData.gameType,
                        optionWin:optionWin
                    }
                }

                postSetGuess(endData).then(res =>{
                    if (res.data.status === 1) {
                        this.dialogVisible = false;
                        this.requestList();
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
        },

    }
</script>
