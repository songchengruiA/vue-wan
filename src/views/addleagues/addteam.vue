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
            <button class="btn btn-success" type="button" @click="addLeaguesBtn">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"> 添加</span>
            </button>
        </div>
        <!-- 战队列表 -->
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item teamsList" v-for="item in pageList">
                <div class="row">
                    <div class="col-xs-2">
                        <div class="rectangle-container">
                            <img class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图" :src="item.teamLogoUrl">
                        </div>
                    </div>

                    <div class="col-xs-7">
                        <label>{{item.teamName}}</label>
                        <p style="margin-bottom: 0px;">{{item.createdAt | formatDate}}</p>
                        <small>{{item.teamLogoUrl}}</small>
                    </div>
                    <div class="text-right col-xs-3">
                        <div>
                            <button class="btn btn-info btn-my" type="button" @click="detailTeamsBtn(item)">详情</button>
                            <button class="btn btn-danger btn-my" type="button" @click="deleteTeamsBtn(item)">删除</button>
                        </div>
                        <div style="padding-top:5px">
                            <button class="btn btn-primary btn-my" type="button" @click="modifyTeamsBtn(item)">修改</button>
                            <button class="btn btn-default copy" type="button" :data-clipboard-text='item._id'>
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
            <el-form :model="teamsForm" label-width="100px" ref="teamsForm" :rules="rules">
                <el-form-item label="游戏类型:">
                    <el-input v-model="teamsForm.gameTypeName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="战队名称:" prop="teamName">
                    <el-input v-model="teamsForm.teamName" auto-complete="off" placeholder="请输入赛事名称" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="战队积分:" prop="teamIntegral">
                    <el-input v-model.number="teamsForm.teamIntegral" auto-complete="off" placeholder="请输入战队积分" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="战队胜率:" prop="teamWinningPr">
                    <el-input v-model.number="teamsForm.teamWinningPr" auto-complete="off" placeholder="请输入战队胜率" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="战队LOGO:" prop="imageUrl">
                    <el-input v-model="teamsForm.imageUrl" auto-complete="off" :disabled='isDisabled'></el-input>
                    <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8066/admin/media"
                            :headers="myHeaders"
                            :data="fileData"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="teamsForm.imageUrl" :src="teamsForm.imageUrl" class="avatar" style="margin-top: 6px;">
                        <el-button size="small" type="primary" v-if="showBtn">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="所属国家:" prop="nationality">
                    <el-select v-model="teamsForm.nationality"  value-key="country"  filterable  placeholder="请选择所属国际" :disabled='isDisabled' @change="countryChange">
                        <el-option
                                v-for="item in countryJson"
                                :key="item.country"
                                :label="item.country"
                                :value="item.country" auto-complete="off">
                        </el-option>
                    </el-select>
                    <input type="hidden" v-model="teamsForm.country">
                    <img :src="logo" style="position: absolute;right: 1%;width: 154px;height: 100px;" v-if="(isDisabled3 && logo) || isDisabled4 ">
                    <img :src="teamsLogoUrl+teamsForm.nationality+'.png'" style="position: absolute;right: 1%;width: 154px;height: 100px;"v-if=" teamsForm.nationality && isDisabled2">
                </el-form-item>
                <el-form-item label="所属赛区:" prop="division">
                    <el-select v-model="teamsForm.division"  value-key="name"  filterable  placeholder="请选择所属赛区" :disabled='isDisabled'>
                        <el-option
                                v-for="item in divisionJson"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id" auto-complete="off">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="战队介绍:" prop="teamDesc" >
                    <el-input
                            :autosize="{ minRows: 2}"
                            type="textarea"
                            placeholder="请输入战队介绍"
                            v-model="teamsForm.teamDesc"
                            :disabled='isDisabled'>
                    </el-input>
                </el-form-item>
                <el-form-item label="别名组（多个用英文逗号隔开）" prop="alias" class="textarea-box">
                    <el-input
                            :autosize="{ minRows: 2}"
                            type="textarea"
                            placeholder="请输入别名组"
                            v-model="teamsForm.alias"
                            :disabled='isDisabled'>
                    </el-input>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button @click="cancel" v-if='isDisabled1'>取消</el-button>
                    <!--添加-->
                    <el-button type="primary" @click="addSubmit('teamsForm')" v-if='isDisabled2'>提交</el-button>
                    <!--修改-->
                    <el-button type="primary" @click="modifySubmit('teamsForm')" v-if='isDisabled3'>提交</el-button>
                    <!--详情-->
                    <el-button type="primary" @click="dialogVisible = false" v-if='isDisabled4'>关闭</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import { getTeams, searchTeams, addTeam, getTeamsDetail, modifyTeams, deleteTeams } from '../../api/api';
    import { formatDate } from '../../api/date';
    import Clipboard from 'clipboard';
    var tableData = require('../../api/country.json');
    var divisionData = require('../../api/table.json');
    export default {
        data() {
            return {
                myHeaders: {token:JSON.parse(sessionStorage.getItem("token")) ? JSON.parse(sessionStorage.getItem("token")) : ''},
                total: 0,
                page: 1,
                tpageSize: 10,
                postsName: '',
                gameType: 'LOL',
                pageList: [],
                searchTitle: '',
                logo: '',
                showImg:false,
                isDisabled: false,
                isDisabled1: false,
                isDisabled2: false,
                isDisabled3: false,
                isDisabled4: false,
                showBtn: false,
                optionsA: [
                    {id: 2, name: 'LOL'},
                    {id: 3, name: 'DOTA2'},
                    {id: 1, name: 'CSGO'},
                    {id: 4, name: '王者荣耀'}
                ],
                dialogVisible: false,
                teamsForm:{
                    imageUrl:'',
                    nationality:'',
                    division:'',
                    teamFlagUrl:''
                },
                rules: {
                    'teamName': [
                        { required: true, message: '请输入赛事名称', trigger: 'blur' }
                    ],
                    'teamIntegral': [
                        { type: 'number', message: '请输入战队积分',trigger: 'blur',required: true, },
                        {
                            pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/,
                            message: '战队积分必须为数字值且最多可输入两位小数'
                        }
                    ],
                    'teamWinningPr': [
                        { type: 'number', message: '请输入战队胜率',trigger: 'blur',required: true, },
                        {
                            pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/,
                            message: '战队胜率必须为数字值且最多可输入两位小数'
                        }
                    ],
                    division: [
                        { type: 'number', required: true, message: '请选择所属赛区', trigger: 'change' }
                    ],
                    imageUrl: [
                        { type: 'string', required: true, message: '请上传图片', trigger: 'blur' }
                    ],
                    'teamDesc': [
                        { required: true, message: '请输入战队积分', trigger: 'blur' }
                    ],
                    'alias': [
                        { required: true, message: '请输入战队胜率', trigger: 'blur' }
                    ],
                    'nationality': [
                        { required: true, message: '请选择所属国家', trigger: 'change' }
                    ]
                },
                countryJson: tableData,
                divisionJson: divisionData[0].codeJson,
                teamsLogoUrl: 'http://osjpvss28.bkt.clouddn.com/',
                fileData: {
                    mediaCategory: 1002
                }
            }
        },
        mounted() {
            const clipboard = new Clipboard('.copy');
            this.teamsList();
        },
        //时间过滤器
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
                    offset: this.page * this.tpageSize - this.tpageSize,
                    limit : this.tpageSize
                };
                getTeams(params).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList =  res.data.data.list;
                        this.total = res.data.data.total-1;
                    }else if(res.data.status ==300011){
                        sessionStorage.clear();
                        this.$router.push('/login');
                    } else {
                        alert(res.data.msg);
                    }

                })
            },
//           图片上传
            handleAvatarSuccess(res) {
                this.teamsForm.imageUrl = res.data.avatar;
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
                this.isDisabled = false;
                this.isDisabled1 = true;
                this.isDisabled2 = true;
                this.isDisabled3 = false;
                this.isDisabled4 = false;
                this.showBtn = true;
                this.dialogVisible = true;
                this.teamsForm = {};
                this.$nextTick(() => { //等待dom同步后打开模态框
                    this.teamsForm = {
                        imageUrl:'',
                        nationality:'',
                        division:'',
                        teamFlagUrl:''
                    };
                    this.logo = '';
                    this.teamsForm.gameTypeName = this.gameType.name?this.gameType.name:'LOL';
                    this.$refs['teamsForm'].resetFields(); //此方法需要模态框加载完成后才可以执行
                });
                return false;
            },

//            点击提交按钮
            addSubmit(teamsForm) {
                this.$refs[teamsForm].validate((valid) => {
                    if (valid) {
                        this.teamsForm.teamFlagUrl = this.teamsForm.nationality + '.png';
                        var params = this.teamsForm;
                        params.teamLogoUrl = this.teamsForm.imageUrl;
                        params.gameType = this.gameType.id ? this.gameType.id:2;
                        addTeam(params).then((res) => {
                            alert('添加成功');
                            this.dialogVisible = false;
                            this.teamsList();
                        })
                    } else {
                        return false;
                    }
                });
                return false;
            },
//            修改
            modifyTeamsBtn(item) {
                this.isDisabled = false;
                this.isDisabled1 = true;
                this.isDisabled2 = false;
                this.isDisabled3 = true;
                this.isDisabled4 = false;
                this.showBtn = true;
                var params = {
                    teamsId: item._id
                };
                getTeamsDetail(params).then((res) => {
                    var teamsData = res.data.data.teams;
                    this.dialogVisible = true;
                    this.teamsForm = teamsData;
                    this.teamsForm.gameTypeName = this.gameType.name?this.gameType.name:'LOL';
                    this.teamsForm.country = teamsData.nationality;
                    console.log(teamsData)
                    this.teamsForm.nationality= teamsData.nationality;
                    this.teamsForm.imageUrl = teamsData.teamLogoUrl?teamsData.teamLogoUrl:'';
                    this.teamsForm.alias = teamsData.alias.join(',');
                    this.logo = teamsData.teamFlagUrl;
                });
                return false
            },
            //选择国家
            countryChange(value){
                this.logo = this.teamsLogoUrl+this.teamsForm.nationality+'.png'
            },
            //取消模态框
            cancel(){
                this.dialogVisible = false;
                this.$refs['teamsForm'].resetFields();
            },
//            点击修改后的提交按钮
            modifySubmit() {
                var params = this.teamsForm;
                params.teamLogoUrl = this.teamsForm.imageUrl;
                params.teamFlagUrl = this.teamsForm.teamFlagUrl; + '.png';
                params.gameType = this.gameType.id?this.gameType.id:2;
                params.teamId = this.teamsForm._id;
                modifyTeams(params).then((res) => {
                    this.dialogVisible = false;
                    alert("修改成功");
                    this.teamsList();
                    this.$refs['teamsForm'].resetFields();
                })
                return false
            },
//            详情
            detailTeamsBtn(item) {
                this.modifyTeamsBtn(item);
                this.isDisabled = true;
                this.isDisabled1 = false;
                this.isDisabled2 = false;
                this.isDisabled3 = false;
                this.isDisabled4 = true;
                this.showBtn = false;
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
    .textarea-box{
        .el-form-item__label{
            display: block;
            width: 100% !important;
            text-align: left;
            padding-left: 29px;
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

</style>