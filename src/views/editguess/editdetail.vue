<template>
    <div>
        <div class="form-group width shut" style="margin-right: 50px;float: right;">
            <div class="button-submit">
                <router-link :to="{path:'/editguess'}" class="btn btn-sm btn-danger btn-submit">关闭</router-link>
            </div>
        </div>
        <div class="edit-guess-list guess-table">
            <table class="table">
                <thead>
                <tr>
                    <th class="text-right" width="280">
                        <div class="border first" >
                            <div class="middle padding-right-40"  style="border-left: 1px solid #d7d7d7;">
                                <div class="team-logo pull-right">
                                    <img v-bind:src="pageTitle.teamA.teamLogoUrl" width="80px">
                                </div>
                            </div>
                        </div>
                    </th>
                    <th class="text-center" style="min-width: 140px;">
                        <div class="border text-left">
                            <div class="middle title">{{pageTitle.teamA.teamName}}</div>
                        </div>
                    </th>
                    <th class="text-center" style="min-width: 240px;">
                        <div class="border">
                            <div class="middle">
                                <div>{{titleData.leagueName}}</div>
                                <div>{{titleData.endTime  | formatDate}}
                                </div>
                                <span class="label label-success" v-if="pageTitle.matchStatus == 1">竞猜中</span>
                                <span class="label label-danger" v-if="pageTitle.matchStatus == 2">进行中</span>
                                <span class="label label-info" v-if="pageTitle.matchStatus == 3">已结束</span>
                                <span class="label label-info" v-if="pageTitle.matchStatus == 4">已结束</span>
                                <div>
                                    <input style="width: 71px" v-model="pageTitle.raceSystem"
                                            type="text" @blur="raceSystem"
                                            placeholder="赛制"
                                    >
                                </div>
                            </div>
                        </div>
                    </th>
                    <th class="text-center" style="min-width: 140px;">
                        <div class="border text-right title">
                            <div class="middle">{{pageTitle.teamB.teamName}}</div>
                        </div>
                    </th>
                    <th class="text-left" width="280">
                        <div class="border">
                            <div class="middle title padding-left-40"  style="border-right: 1px solid #d7d7d7;">
                                <div class="team-logo pull-left">
                                    <img v-bind:src="pageTitle.teamB.teamLogoUrl" width="80px">
                                </div>
                            </div>
                        </div>
                    </th>
                    <th class="games-detail-btn" width="140">

                    </th>
                </tr>

                </thead>
                <tbody>
                <tr v-for="item in pageList" >
                    <td class="text-right" width="280">
                        <div class="border first " style="border-left: 1px solid #d7d7d7;">
                            <div class="middle">
                                <div class="original position-left" v-show="item.gambleSource == 1">
                                    <img src="../../images/original.png" alt="">
                                </div>
                                <div class="hidden-icon position-left-a" v-show="item.isDelete == true">
                                    <img src="../../images/editguess-hidden.png" alt="">
                                </div>
                                <div class="win " v-show="item.gambleStatus == 3  && item.optionAWin">
                                    <img src="../../images/win.png" alt="">
                                </div>
                                <div class="win " v-show="item.gambleStatus == 4">
                                    <img src="../../images/fail.png" alt="">
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="text-center" style="min-width: 140px;">
                        <div class="border">
                            <div class="middle title text-left">
                                <p>
                                    <input :disabled="!item.edite" :class="{ 'edite-input': !item.edite}"
                                            type="text"
                                            v-model="item.gambleOptionA">
                                </p>
                                <p>
                                    <input :disabled="!item.edite" :class="{ 'edite-input': !item.edite}"
                                            type="text"
                                            v-model="item.optionBOdds">
                                </p>
                            </div>
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="border">
                            <div class="middle">
                                <p>{{item.gambleName}}</p>
                                <div class="dropdown input-150">
                                    <div>
                                        {{item.endTime | formatDate}}
                                    </div>
                                </div>
                                <div>
                                    <span class="label label-success" v-if="item.gambleStatus == 1">竞猜中</span>
                                    <span class="label label-danger" v-if="item.gambleStatus == 2">进行中</span>
                                    <span class="label label-info" v-if="item.gambleStatus == 3">已结束</span>
                                    <span class="label label-info" v-if="item.gambleStatus == 4">已结束</span>
                                    <span class="label label-info" v-if="item.gambleStatus == 6">已结束</span>
                                </div>

                                <p>
                                </p>
                            </div>
                        </div>
                    </td>
                    <td class="text-center" style="min-width: 140px;">
                        <div class="border">
                            <div class="middle title text-right">
                                <p>
                                    <input :disabled="!item.edite" :class="{ 'edite-input': !item.edite}"
                                            type="text"
                                            v-model="item.gambleOptionB">
                                </p>
                                <p>
                                    <input :disabled="!item.edite" :class="{ 'edite-input': !item.edite}"
                                            type="text"
                                            v-model="item.optionAOdds">
                                </p>
                            </div>
                        </div>
                    </td>
                    <td class="text-left" width="280">
                        <div class="border">
                            <div class="middle title padding-left-40" style="border-right: 1px solid #d7d7d7;">
                                <div class="team-logo pull-left" v-if="item.gambleStatus == 3  && item.optionBWin">
                                    <img src="../../images/win.png" alt="">
                                </div>
                                <div class="team-logo pull-left" v-if="item.gambleStatus == 4">
                                    <img src="../../images/fail.png" alt="">
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="games-detail-btn">
                        <div class="table-middle middle last-div">
                                <span v-if="item.gambleStatus == 1&&!item.edite">
                                    <button class="btn btn-sm btn-primary" @click="editGuess(item)">编辑</button>
                                    <button class="btn btn-sm btn-delete" @click="editGuessStop(item)">停止</button>
                                </span>
                            <span v-if="item.gambleStatus == 1&&item.edite">
                                    <button class="btn btn-sm btn-danger"  @click="editGuessSave(item)">保存</button>
                                    <button class="btn btn-sm btn-success" @click="editGuessCancel(item)">取消</button>
                                </span>
                            <span v-if="item.gambleStatus == 2">
                                    <a class="btn btn-sm btn-warningA" @click="editGuessEnd(item)">结算</a>
                                </span>
                            <span v-if="item.gambleStatus == 3 || item.gambleStatus == 4">
                                    <button class="btn btn-sm btn-black" @click="editGuessHidden(item)" v-show="item.isDelete == false" v-bind:disabled="pageTitle.gambleNum <= 0">隐藏</button>
                                </span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--结算界面-->
        <el-dialog title="结算" v-model="dialogVisible" :close-on-click-modal="false" class="dialog-small settlement">
            <div class="content">
                <div class="edit-guess-end-content">
                    <div class="col-md-3 text-center">
                        <div class="settlement-div">{{itemData.gambleOptionA}}</div>
                        <div>{{itemData.optionAOdds}}</div>
                    </div>
                    <div class="col-md-6 text-center">
                        <p style="margin-top: 6px">{{itemData.gambleName}}</p>
                        <p>{{itemData.endTime | formatDate}}</p>
                        <span class="label label-xs label-danger">进行中</span>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="settlement-div">{{itemData.gambleOptionB}}</div>
                        <div>{{itemData.optionBOdds}}</div>
                    </div>
                </div>
            </div>
            <template>
                <el-radio-group v-model="selectedData" class="settlement-radio">
                    <el-radio :label="1" class="el-col-6 text-center">{{itemData.gambleOptionA}} 胜</el-radio>
                    <el-radio :label="2" class="el-col-11 text-center">流盘</el-radio>
                    <el-radio :label="3" class="el-col-5 text-center settlement-right">{{itemData.gambleOptionB}} 胜</el-radio>
                </el-radio-group>
            </template>
            <div style="clear: both"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit(itemData)">提交</el-button>
            </div>
        </el-dialog>
        <!--添加界面-->
        <el-dialog title="添加竞猜" v-model="dialogAdd" :close-on-click-modal="false" class="dialog-small add-dialog"  center>
            <el-form :model="formData" label-width="100px" ref="addForm" >
                <el-form-item label="竞猜名称" prop="name"  class="max-w">
                    <el-select v-model="map"   filterable clearable  placeholder="选填">
                        <el-option
                                v-for="item in maps" :key="item.value"
                                :value="item" auto-complete="off">
                        </el-option>
                    </el-select>
                    <el-select v-model="selectName"   filterable clearable  placeholder="选填">
                        <el-option
                                :value="pageTitle.teamA.teamName" auto-complete="off">
                        </el-option>
                        <el-option
                                :value="pageTitle.teamB.teamName" auto-complete="off">
                        </el-option>
                    </el-select>
                    <el-select v-model="selectType"   filterable >
                        <el-option
                                v-for="item in types" :key="item.value"
                                :value="item" auto-complete="off">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下注项1名称">
                    <el-input
                            v-model="formData.gambleOptionA"
                            type="datetime"
                            placeholder="下注项1名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="下注项1赔率">
                    <el-input
                            v-model="formData.optionAOdds"
                            type="datetime"
                            placeholder="下注项1赔率">
                    </el-input>
                </el-form-item>
                <el-form-item label="下注项2名称">
                    <el-input
                            v-model="formData.gambleOptionB"
                            type="datetime"
                            placeholder="下注项2名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="下注项2赔率">
                    <el-input
                            v-model="formData.optionBOdds"
                            type="datetime"
                            placeholder="下注项2赔率">
                    </el-input>
                </el-form-item>
                <el-form-item label="截止时间" class="addGame-input">
                    <el-date-picker
                            v-model="formData.date"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="addguess-body">
            <a class="btn btn-default btn-lg addBtn" href="javascript:;" @click="addGuess">添加竞猜</a>
        </div>
    </div>

</template>
<script>
    import { getDetailGameGuess ,editeDetailGameGuess,addGame,postGameGuess} from '../../api/api';
    import { formatDate } from '../../api/date';
    var tableData = require('../../api/table.json')
    export default {
        data() {
            return {
                pageTitle:{
                    teamA:[],
                    teamB:[]
                },
                titleData:{},
                pageList:[],
                addData:[],
                dialogVisible:false,
                dialogAdd:false,
                itemData:{},
                selectedData: 1,
                formData:{},
                maps:[],
                map:'',
                selectType:'独赢',
                types:[],
                selectName:''


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
                    matchId :this.$route.params.id
                };
                this.pageList = []
                getDetailGameGuess(para).then((res) => {
                    this.pageTitle=res.data.data.match
                    this.titleData.leagueName = this.$route.query.leagueName;
                    this.titleData.gameType = this.$route.query.gameType;
                    this.titleData.endTime = parseFloat(this.$route.query.endTime);
                    let _this = this
                    res.data.data.list.forEach(function (item) {
                        item.edite = false
                        _this.pageList.push(item)

                    })
                });
            },
            //赛制
            raceSystem(){
                console.log(this.pageTitle)
                let _id = this.pageTitle._id;
                let para = {
                    raceSystem:this.pageTitle.raceSystem
                };
                postGameGuess(_id,para).then(res =>{
                    if (res.data.status === 1) {
                        alert(res.data.data)
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
            //编辑
            editGuess(item) {
                item.edite = true
            },
            //停止
            editGuessStop(item) {
                let para = {
                    gambleId : item._id,
                    gambleStatus: 2
                };
                this.$confirm('停止竞猜，本竞猜的状态将变为进行中！?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    editeDetailGameGuess(para.gambleId,para).then(res =>{
                        if (res.data.status === 1) {
                            item.gambleStatus = 2
                        } else {
                            alert(res.msg);
                        }
                    })
                }).catch(() => {

                });
            },
            //保存
            editGuessSave(item){
                let para = {
                    gambleId  : item._id,
                    gambleName : item.gambleName,
                    gambleOptionA : item.gambleOptionA,
                    gambleOptionB : item.gambleOptionB,
                    optionAOdds  : item.optionAOdds,
                    optionBOdds  : item.optionBOdds
                };
                this.$confirm('确定修改?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    editeDetailGameGuess(para.gambleId,para).then(res =>{
                        if (res.data.status === 1) {
                            alert('保存成功')
                            this.requestList()
                        } else {
                            alert(res.msg);
                        }
                    })
                }).catch(() => {

                });
            },
            //取消
            editGuessCancel(item){
                item.edite = false
            },
            //结算
            editGuessEnd(item){
                this.dialogVisible = true;
                this.itemData = item
            },
            //结算提交
            addSubmit(itemData){
                var endData = {};
                endData = {
                    gambleId : itemData._id,
                    gambleStatus:((this.selectedData === 1)||(this.selectedData === 3))?3:this.selectedData === 2?4:'',
                    optionAWin: this.selectedData === 1?true : ((this.selectedData === 2)||(this.selectedData === 3))?false:'',
                    optionBWin: this.selectedData === 3?true : ((this.selectedData === 1)||(this.selectedData === 2))?false:'',
                }
                editeDetailGameGuess(itemData._id,endData).then(res =>{
                    if (res.data.status === 1) {
                        this.dialogVisible = false
                        this.requestList()
                    } else {
                        alert(res.msg);
                    }
                })

            },
            //隐藏
            editGuessHidden(item){
                let para = {
                    gambleId   : item._id,
                    isDelete  : 'true'
                };
                editeDetailGameGuess(item._id,para).then(res =>{
                    if (res.data.status === 1) {
                        item.isDelete = true;

                    } else {
                        alert(res.msg);
                    }
                })
            },
            //添加竞猜
            addGuess() {
                this.dialogAdd = true;
                let gameType = this.titleData.gameType;
                this.maps = (gameType!==4)?tableData[0].MapOne:tableData[0].MapTwo;
                this.types = (gameType == 2)?tableData[0].LOL:((gameType== 3)?tableData[0].Dota2:((gameType == 1)?tableData[0].CSGO:((gameType == 4)?tableData[0].Wangzhe:'独赢')));
            },
            submit() {
                var name = this.map + this.selectName + this.selectType;
                var nam = name.replace(/['0']/g,'');
                this.formData.gambleName = nam;
                this.formData.match = this.$route.params.id;
                this.formData.endTime =  Date.parse(this.formData.date)
                addGame(this.formData).then(res =>{
                    if (res.data.status === 1) {
                        this.dialogAdd = false
                        this.requestList();
                    } else {
                        alert(res.data.msg);
                    }
                })
            }
        },

    }
</script>
<style lang="scss">
    .btn-delete ,.btn-delete:hover{
        background: #df0059;
        border: 1px solid #df0059;
        color: #FFF;
        font-weight: 600;
    }
    .btn-primary,.btn-primary:hover {
        background: #169bd5;
        border: 1px solid #169bd5;
        color: #FFF;
        font-weight: 600;
    }
    .btn-warningA,.btn-warningA:hover {
        background: #666699;
        border: 1px solid #666699;
        color: #FFF;
        font-weight: 600;
    }
    .btn-danger,.btn-danger:hover {
        background: #e80100;
        border: 1px solid #e80100;
        color: #FFF;
        font-weight: 600;
    }
    .btn-success,.btn-success:hover {
        background: #24b60b;
        border: 1px solid #24b60b;
        color: #FFF;
        font-weight: 600;
    }
    .btn-black,.btn-black:hover {
        background: #636668;
        color: #fff;
    }
    .edit-guess-list{
        margin-top:5px;
        table{
            thead{
                tr>div{
                    border: 1px solid;
                }
                th{
                    padding: 0;
                    margin: 0;
                    border: 0;
                    div{
                        background: #f6f6f6;
                        p{
                            margin: 0;
                        }
                    }
                }
            }
            tbody{
                tr>div{
                    border: 1px solid;
                }
                td{
                    padding: 0;
                    margin: 0;
                    border: 0;
                    div{
                        background: #ffff;
                        p{
                            margin: 0;
                        }
                    }

                }
                tr:hover{
                   td div{
                       background: #f6f6f6;
                   }
                    td input{
                        background: #f6f6f6;
                    }
                    td .last-div{
                        background: #fff!important;
                    }
                }
                .edite-input{
                    border: 0;
                }
                .position-left{
                    position: absolute;
                    left: 0;
                    top:0;
                }
                .position-left-a{
                    position: absolute;
                    left: 0;
                    bottom:0;
                }
                .middle{
                    position: relative;
                }
            }
        }

    }
    .settlement{
        .content{
            border: 1px solid #d7d7d7;
            height: 88px;
        }
        p{
            padding: 0 0 6px;
            margin: 0;
        }
        .settlement-div{
            height: 49px;
            line-height: 52px;
        }
        .settlement-radio{
            width: 100%;
            margin-top: 15px;
            label{
                font-weight: 100;
            }
            .el-radio__inner{
                width: 16px;
                height: 16px;
            }
            .settlement-right{
                margin-left: 29px;
            }
        }
    }
    .add-dialog{
        .el-dialog--small{
            max-width: 650px !important;
        }
        .el-select{
            max-width: 150px!important;
        }
        .addGame-input{
            .el-date-editor.el-input{
                width: 100%!important;
            }
        }
        .el-dialog__footer{
            text-align: center;
        }
    }
</style>