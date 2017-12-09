<template class="teams">
    <div class="col-sm-12">
        <form class="form-inline form-search addguess-head">
            <div class="form-group">
                <label class="size-set pull-left" style="margin-left: 0px">选择游戏类型:</label>
                <el-select v-model="gameType"  value-key="name" class="selected-guess" filterable placeholder="" @change="gameChange">
                    <el-option
                            v-for="item in optionsA"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <el-input placeholder="请输入要搜索的品类" v-model="postsName" class="input-guess" style="width:170px;"></el-input>
            <div class="form-group" style="float: right;margin-right: 0px;margin-top: -5px">
                <el-button type="primary" @click="searchPosts">搜索</el-button>
            </div>
            <div class="line-block"></div>
        </form>
        <!-- 添加按钮 -->
        <div class="text-right" style="padding-bottom:10px;margin-top: 10px;">
            <button class="btn btn-success" type="button">
                <span class="glyphicon glyphicon-plus" aria-hidden="true" @click="addLeaguesBtn"> 添加</span>
            </button>
        </div>
        <!-- 战队列表 -->
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item teamsList" v-for="item in pageList">
                <div class="row">
                    <div class="col-xs-2">
                        <div class="rectangle-container">
                            <img class="imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图" :src="item.teamLogoUrl">
                        </div>
                    </div>

                    <div class="col-xs-7" style="padding-top:8px">
                        <label>{{item.teamName}}</label>
                        <p>{{item.createdAt | formatDate}}</p>
                        <small>{{item.teamLogoUrl}}</small>
                    </div>
                    <div class="text-right col-xs-3" style="padding-top:30px">
                        <div>
                            <button class="btn btn-info" type="button" @click="detailTeams(item)">详情</button>
                            <button class="btn btn-danger" type="button" @click="deleteTeamsBtn(item)">删除</button>
                        </div>
                        <div style="padding-top:5px">
                            <button class="btn btn-primary" type="button" @click="modifyTeams(item)">修改</button>
                            <button class="btn btn-default" type="button">
                                <span class="glyphicon glyphicon-copy">复制战队 ID</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="tpageSize" :total="total">
            </el-pagination>
        </el-col>
        <!--新增界面-->
        <el-dialog v-model="dialogVisible" :close-on-click-modal="false" class="dialog-small">
            <el-form :model="teamsData" label-width="100px" ref="addForm" >
                <el-form-item label="游戏类型:" prop="name">
                    <el-input v-model="gameTypeName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="战队名称:" prop="name">
                    <el-input v-model="teamsData.teamName" auto-complete="off" placeholder="请输入赛事名称" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="战队积分:" prop="name">
                    <el-input v-model="teamsData.teamIntegral" auto-complete="off" placeholder="请输入战队积分" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="战队胜率:" prop="name">
                    <el-input v-model="teamsData.teamWinningPr" auto-complete="off" placeholder="请输入战队胜率" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="战队LOGO:" prop="name">
                    <el-input v-model="imageUrl" auto-complete="off" :disabled='isDisabled'></el-input>
                    <!--添加-->
                    <el-upload
                            v-if="showImg1"
                            class="avatar-uploader"
                            action="http://47.93.223.69:8066/admin/uploadimage"
                            :headers="myHeaders"
                            :data="fileData"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" style="margin-top: 6px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="display: none"></i>
                        <el-button size="small" type="primary" v-if="showBtn">点击上传</el-button>
                    </el-upload>
                    <!--详情-->
                    <img v-if="showImg2" :src="imageUrl" class="avatar" style="margin-top: 6px;">
                </el-form-item>
                <el-form-item label="所属国际:" prop="name">
                    <el-select v-model="teamsData.nationality"  value-key="country"  filterable  placeholder="请选择所属国际" :disabled='isDisabled'>
                        <el-option
                                v-for="item in countryJson"
                                :key="item.id"
                                :label="item.country"
                                :value="item" auto-complete="off">
                        </el-option>
                    </el-select>
                    <!--添加-->
                    <img :src="teamsLogoUrl+teamsData.nationality.flag" style="position: absolute;right: 1%;width: 154px;height: 100px;" v-if="teamsData.nationality.country">
                    <!--详情-->
                    <img :src="picUrl" style="position: absolute;right: 1%;width: 154px;height: 100px;" v-if="showDetail">
                </el-form-item>
                <el-form-item label="所属赛区:" prop="name">
                    <el-select v-model="teamsData.division"  value-key="name"  filterable  placeholder="请选择所属赛区" :disabled='isDisabled'>
                        <el-option
                                v-for="item in divisionList"
                                :key="item.id"
                                :label="item.name"
                                :value="item" auto-complete="off">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="战队介绍:" prop="name" class="textarea-box">
                    <el-input
                            :autosize="{ minRows: 2}"
                            type="textarea"
                            placeholder="请输入战队介绍"
                            v-model="teamsData.teamDesc"
                            :disabled='isDisabled'>
                    </el-input>
                </el-form-item>
                <el-form-item label="别名组（多个用英文逗号隔开）" prop="name" id="textarea-box">
                    <el-input
                            :autosize="{ minRows: 2}"
                            type="textarea"
                            placeholder="请输入别名组"
                            v-model="teamsData.alias"
                            :disabled='isDisabled'>
                    </el-input>
                </el-form-item>
            </el-form>
            <!--添加-->
            <div slot="footer" class="dialog-footer" v-if="showImg1">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addSubmit">提交</el-button>
            </div>
            <!--详情-->
            <div slot="footer" class="dialog-footer" v-if="showImg2">
                <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
            </div>
            <!--修改-->
            <div slot="footer" class="dialog-footer" v-if="showImg3">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="modifyBtn(item)">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { getTeams, searchTeams, addTeam, getTeamsDetail, modifyTeam, deleteTeams } from '../../api/api';
    import { formatDate } from '../../api/date';
    var tableData = require('../../api/country.json');
    var divisionData = require('../../api/table.json');
    export default {
        data() {
            return {
                myHeaders: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJwd2NuIiwiaWF0IjoxNTEyNDQxNTE2fQ.9oaz53lrnYM_ZwPHarSx2d-hPIqIMfQcOI--ybcnvTo'},
                total: 0,
                page: 1,
                tpageSize: 10,
                postsName: '',
                imageUrl: '',
                picUrl: '',
                gameType: 'LOL',
                reveal: false,
                pageList: [],
                searchTitle: '',
                gameTypeName:'',
                isDisabled: false,
                showDetail: false,
                showBtn: false,
                showImg1: false,
                showImg2: false,
                showImg3: false,
                optionsA: [
                    {id: 2, name: 'LOL'},
                    {id: 3, name: 'DOTA2'},
                    {id: 1, name: 'CSGO'},
                    {id: 4, name: '王者荣耀'}
                ],
                optionsB: [
                    {id: 1, name: '后台'},
                    {id: 2, name : "EGB"},
                    {id: 3, name : "平博"}
                ],
                dialogVisible: false,
                countryJson: tableData,
                teamsData:{
                    "division":{},
                    "nationality":{}
                },
                divisionList: divisionData[0].codeJson,
                teamsLogoUrl: 'http://osjpvss28.bkt.clouddn.com/',
                fileData: {
                    mediaCategory: 1002
                }
            }
        },
        mounted() {
            this.teamsList();
            console.log(tableData)
        },
        filters: {
            formatDate (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            },
        },
        methods: {
//         改变游戏类型
            gameChange() {
                this.teamsList();
            },
//         点击搜索按钮
            searchPosts() {
                if (this.searchTitle == '') {
                    this.teamsList();
                };
                let params = {
                    gameType : this.gameType.id?this.gameType.id:2,
                    teamName: this.postsName
                };
                searchTeams(params).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList =  res.data.data.list;
                        this.total = 1;
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
//          分页
            handleCurrentChange(val) {
                this.page = val;
                this.teamsList();
            },
//          请求赛事
            teamsList() {
                let params = {
                    gameType : this.gameType.id?this.gameType.id:2,
                    offset : this.page*this.tpageSize-(this.tpageSize-1),
                    limit : this.tpageSize
                };
                getTeams(params).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList =  res.data.data.list;
                        this.total = res.data.data.total-1;
                    } else {
                        alert(res.data.msg);
                    }

                })
            },
//           图片上传
            handleAvatarSuccess(res) {
                this.imageUrl = res.data.avatar;
            },
            beforeAvatarUpload(file) {
                this.fileData.media = file;
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
//            添加
            addLeaguesBtn() {
                this.showImg1 = true;
                this.showImg2 = false;
                this.showImg3 = false;
                this.isDisabled = false;
                this.showBtn = true;
                this.imageUrl = '';
                this.teamsData = {
                    "division":{},
                    "nationality":{}
                };
                this.dialogVisible = true;
//                this.showDetail = true;
                this.gameTypeName = this.gameType.name?this.gameType.name:'LOL';
            },
//            点击提交按钮
            addSubmit() {
                this.teamsData.teamLogoUrl = this.imageUrl;
                var params = this.teamsData;
                params.teamFlagUrl = this.teamsData.nationality.flag
                params.gameType = this.gameType.id?this.gameType.id:2;
                params.division = this.teamsData.division.id;
                params.nationality = this.teamsData.nationality.country;
                addTeam(params).then((res) => {
                    this.dialogVisible = false;
                    this.teamsList();
                })
            },
//            修改
            modifyTeams(item) {
                this.showImg1 = false;
                this.showImg2 = false;
                this.showImg3 = true;
                this.isDisabled = false;
                this.showBtn = false;
                this.dialogVisible = true;
                var params = {
                    teamsId: item._id
                };
                getTeamsDetail(params).then((res) => {
                    this.showDetail = true;
                    this.teamsData = res.data.data.teams;
                    this.gameTypeName = this.gameType.name?this.gameType.name:'LOL';
                    this.teamsData.division = this.divisionList[this.teamsData.division + 1].name;
                    this.imageUrl = res.data.data.teams.teamLogoUrl?res.data.data.teams.teamLogoUrl:'';
                    this.picUrl = res.data.data.teams.teamFlagUrl?res.data.data.teams.teamFlagUrl:'';
                })
            },
//            点击修改后的提交按钮
            modifyBtn(item) {
                this.teamsData.teamLogoUrl = this.imageUrl;
                var params = this.teamsData;
                params.teamsId = item._id;
                params.teamFlagUrl = this.teamsData.nationality.flag
                params.gameType = this.gameType.id?this.gameType.id:2;
                params.division = this.teamsData.division.id;
                params.nationality = this.teamsData.nationality.country;
                modifyTeam(params).then((res) => {
                    this.dialogVisible = false;
                    this.teamsList();
                })
            },
//            详情
            detailTeams(item) {
                this.showImg1 = false;
                this.showImg2 = true;
                this.showImg3 = false;
                this.showBtn = false;
                this.dialogVisible = true;
                this.isDisabled = true;
                var params = {
                    teamsId: item._id
                };
                getTeamsDetail(params).then((res) => {
                    this.showDetail = true;
                    this.teamsData = res.data.data.teams;
                    this.gameTypeName = this.gameType.name?this.gameType.name:'LOL';
                    this.teamsData.division = this.divisionList[this.teamsData.division + 1].name;
                    this.imageUrl = res.data.data.teams.teamLogoUrl?res.data.data.teams.teamLogoUrl:'';
                    this.picUrl = res.data.data.teams.teamFlagUrl?res.data.data.teams.teamFlagUrl:'';
                    this.teamsData.nationality = res.data.data.teams.nationality;
                })
            },
//          删除
            deleteTeamsBtn(item) {
                var params = {
                    teamsId : item._id
                };
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteTeams(params).then((res) => {
                        if (res.status === 1) {
                            this.teamsList();
                        } else {
                            alert(res.data.msg);
                        }
                    })
                }).catch(() => {

                });
            },
//          复制赛事ID
//            copyId(item) {
//                console.log(item._id)
//                item.select();
//                document.execCommand("Copy");
//            }
        }
    }

</script>
<style lang="scss">
    .input-guess{
        margin-left: 30px;
        .el-input__inner{
            width:170px;height: 22px;line-height: 22px;
        }
    }
    .teamsList{
        padding: 10px 25px;
    }
    .el-form-item__label{
        display: block;
    }
    #textarea-box{
        .el-form-item__label{
            display: block;
            width: 235px !important;
        }
        .el-form-item__content{
            margin-left: 28px !important;
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        max-width: 200px;
        max-height: 200px;
        display: block;
    }
    input[type=file]{
        display: none !important;
    }
    .avatar-uploader .el-upload{
        border:none !important;
    }
    .img-thumbnail{
        max-width: 223px;
        max-height: 184px;
    }
    .el-dialog__footer{
        text-align: center;
    }
</style>