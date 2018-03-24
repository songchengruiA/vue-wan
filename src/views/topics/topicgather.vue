<template class="topicgather">
    <div class="col-sm-12">
        <form class="form-inline form-search addguess-head">
            <el-input placeholder="请输入话题名称" v-model="searchTitle" class="input-guess" style="width:170px;"></el-input>
            <div class="form-group" style="float: right;margin-right: 0px;margin-top: -5px">
                <el-button type="primary" @click="requestList">搜索</el-button>
            </div>
            <div class="line-block"></div>
        </form>
        <!-- 添加按钮 -->
        <div class="text-right" style="padding-bottom:10px;margin-top: 10px;">
            <button class="btn btn-success" type="button" @click="addTopicGatherBtn">
                <span class="glyphicon glyphicon-plus" aria-hidden="true">添加</span>
            </button>
        </div>
        <!-- 话题集合列表 -->
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item" v-for="(item, index) in pageList">
                <div class="row" style="padding: 0 10px;">
                    <div class="col-xs-3">
                        <div class="rectangle-container" style="margin-right: 10px;">
                            <!--<span style="position: absolute;top:20px;">{{($index+1) + topicGatherPagination.topicGatherLimit*(topicGatherPagination.currPage-1)}}</span>-->
                            <img style="width: 120px;height: 60px;margin-left: 10px;cursor: pointer;" :src="item.tagIcon" class="imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                        </div>
                    </div>
                    <div class="col-xs-7">
                        <div>名称：{{item.title}}</div>
                        <div style="margin-top: 5px;" title="123123">数目：{{item.topicNum}}条</div>
                        <small style="margin-top: 5px;">ID：{{item._id}}</small>
                    </div>
                    <div class="text-right col-xs-2" style="padding-top:7px">
                        <button class="btn btn-default copy" type="button" :data-clipboard-text='item._id'>
                            <span class="glyphicon glyphicon-copy">复制话题集合 ID</span>
                        </button>
                        <div style="padding-top:5px;">
                            <button class="btn btn-primary btn-my" type="button" @click="modifyTopicGatherBtn(item)">编辑</button>
                            <button class="btn btn-danger btn-my" type="button" @click="deleteTopicGatherBtn(item)">删除</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="tpageSize"
                           :total="total">
            </el-pagination>
        </el-col>
        <!--添加界面-->
        <el-dialog v-model="dialogVisible" :close-on-click-modal="false" class="dialog-small">
            <el-form :model="topicGatherForm" label-width="120px">
                <el-form-item label="话题集合Banner图片:" class="textarea-box">
                    <el-input v-model="topicGatherForm.imageUrl" auto-complete="off" :disabled='isDisabled'></el-input>
                    <el-upload
                            class="avatar-uploader"
                            action="http://47.93.223.69:8066/admin/media"
                            :headers="myHeaders"
                            :data="fileData"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="topicGatherForm.imageUrl" :src="topicGatherForm.imageUrl" class="avatar" style="margin-top: 6px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="display: none"></i>
                        <el-button size="small" type="primary" v-if="showBtn">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="话题名称:" class="textarea-box">
                    <el-input v-model="topicGatherForm.gatherFormList.title" auto-complete="off" placeholder="请输入话题名称" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="相关的话题名称(ID):" class="textarea-box">
                    <el-input placeholder="添加相关的话题名称(ID)" auto-complete="off" v-model="relevantTitle" @change="searchChange()" v-on:click.native="searchAll"></el-input>
                    <ul class="list-group" style="overflow:auto;margin:10px 0 0 0;height: 300px;font-size: 13px;" v-show="searchShow">
                        <li class="list-group-item"v-for="(item, index) in noTopicGatherList" >
                            <div class="row" style="padding: 0 10px;">
                                <div class="col-xs-2">
                                    <div class="rectangle-container">
                                        <span>{{index}}</span>
                                        <img :src="item.topicIcon" class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <p style="line-height: 2">名称：{{item.title}}</p>
                                    <p style="line-height: 1">{{item.createdAt | formatDate}}</p>
                                </div>
                                <div class="col-xs-6">
                                    <div :class="{true:'ellipsis2'}[item.content.length >= 60 && !item.contentLenght]" style="line-height: 2">内容：{{item.content}}</div>
                                    <!--<div class="easy-btn" v-show="item.content.length >= 60 && !item.contentLenght" @click="easyBtn1(item)">全文</div>-->
                                    <!--<div class="easy-btn" v-show="item.content.length >= 60 && item.contentLenght" @click="easyBtn2(item)">收起</div>-->
                                </div>
                                <div class="col-xs-1" style="padding-top: 10px">
                                    <button @click="addTopic(item)" style="background:#169bd5;margin-top: 0;line-height: 20px;" class="deleteBtn" v-show="!item.show">添加</button>
                                    <button @click="delTopic(item)" class="deleteBtn" style="width:50px;background: grey;color: #fff;margin-top: 0;line-height: 20px;" v-show="item.show">已添加</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="list-group" style="overflow:auto;margin:10px 0 0 0;box-shadow: 0px 0px 22px #5d5b5b;"">
                        <li class="list-group-item" style="margin-bottom: 5px;" v-for="(item, index) in topicGatherList">
                            <div class="row" style="padding: 0 10px;">
                                <div class="col-xs-2">
                                    <div class="rectangle-container">
                                        <span>{{index+1}}</span>
                                        <img :src="item.topicIcon" class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <p>用户名：{{item.title}}</p>
                                    <p>{{item.createdAt | formatDate}}</p>
                                </div>
                                <div class="col-xs-6">
                                    <div :class="{true:'ellipsis2'}[item.content.length >= 60 && !item.contentLenght]" style="padding-top: 5px">内容：{{item.content}}</div>
                                    <!--<div class="easy-btn" ng-show="item.content.length >= 60 && !item.contentLenght" ng-click="easyBtn1(item)">全文</div>-->
                                    <!--<div class="easy-btn" ng-show="item.content.length >= 60 && item.contentLenght" ng-click="easyBtn2(item)">收起</div>-->
                                </div>
                                <div class="col-xs-1" style="padding-top: 8px">
                                    <button @click="delTopicBtn(item,index)" class="deleteBtn" style="margin-top: 10px;line-height: 20px;">删除</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item label="话题集合简介:"  class="textarea-box">
                    <el-input
                            :disabled='isDisabled'
                            :autosize="{ minRows: 2}"
                            type="textarea"
                            placeholder="请输入话题集合简介"
                            v-model="topicGatherForm.gatherFormList.content">
                    </el-input>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <!--添加-->
                    <el-button type="primary" @click="addSubmit()" v-if='isDisabled2'>提交</el-button>
                    <!--修改-->
                    <el-button type="primary" @click="modifySubmit()" v-if='isDisabled3'>提交</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getTopicGather, getNoTopicGather, addTopicGather, getTopicGatherDetail,modifyTopicGather, deleteTopicGatherItem, deleteTopicGather} from '../../api/api';
    import Clipboard from 'clipboard';
    import { formatDate } from '../../api/date';
    export default {
        data() {
            return {
                myHeaders: {token:JSON.parse(sessionStorage.getItem("token")) ? JSON.parse(sessionStorage.getItem("token")) : ''},
                total: 0,
                page: 1,
                tpageSize: 10,
                pageList: [],
                noTopicGatherList:[],
                topicGatherList:[],
                delList:[],
                delIdList:[],
                searchTitle: '',
                relevantTitle:'',
                searchShow: false,
                isDisabled: false,
                isDisabled2: false,
                isDisabled3: false,
                showBtn: false,
                dialogVisible: false,
                topicGatherForm:{
                    gatherFormList:{},
                    imageUrl: ''
                },
//                rules: {
//                    'gatherFormList.title': [
//                        { required: true, message: '请输入Banner图片名称', trigger: 'blur' }
//                    ],
//                    'gatherFormList.content': [
//                        { required: true, message: '请输入话题集合简介', trigger: 'blur' }
//                    ],
//                    imageUrl: [
//                        { type: 'string', required: true, message: '请上传图片', trigger: 'blur' }
//                    ]
//                },
                fileData: {
                    mediaCategory: 1002
                }
            }
        },
        mounted() {
            const clipboard = new Clipboard('.copy');
            this.requestList();
        },
        filters: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
        },
        methods: {

//          话题Banner列表和点击搜索按钮
            requestList() {
                let params = {
                    offset: this.page * this.tpageSize - this.tpageSize,
                    limit: this.tpageSize,
                    title: this.searchTitle
                };
                getTopicGather(params).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList = res.data.data.list;
                        this.total = res.data.data.total-1;
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
//          获取未添加的话题列表
            requestNoList() {
                let params = {
                    title: this.relevantTitle,
                    limit : 1000
                };
                getNoTopicGather(params).then((res) => {
                    if (res.data.status === 1) {
                        this.noTopicGatherList = res.data.data.list;
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
//          点击相关话题ID的输入框
            searchAll() {
                this.searchShow = true;
                this.requestNoList();
            },
//          更改话题ID搜索
            searchChange() {
                this.requestNoList();
            },
//          点击添加按钮
            addTopic(item) {
                item.show = true;
                this.topicGatherList.push(item)
            },
//          点击未添加按钮
            delTopic(item) {
                item.show = false;
                let itemTitle ='';
                for(let i = 0; i < this.topicGatherList.length ; i++ ){
                    itemTitle = this.topicGatherList[i].title;
                    if( item.title === itemTitle){
                        this.topicGatherList.splice(jQuery.inArray( this.topicGatherList[i], this.topicGatherList), 1);
                    }
                }
            },
//          点击已经添加的列表中的删除按钮
            delTopicBtn(item,index) {
               item.show = false;
               this.topicGatherList.splice(index, 1);
//             往删除的列表中push数据的ID
               this.delList.push(item._id);
            },
//          图片上传
            handleAvatarSuccess(res) {
                this.topicGatherForm.imageUrl = res.data.avatar;
            },
            beforeAvatarUpload(file) {
                this.fileData.media = file;
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
//          添加
            addTopicGatherBtn() {
                this.dialogVisible = true;
                this.showBtn = true;
                this.topicGatherForm = {
                    gatherFormList:{},
                    imageUrl: ''
                };
//                this.$nextTick(() => { //等待dom同步后打开模态框
//                    this.$refs['topicBannerForm'].resetFields(); //此方法需要模态框加载完成后才可以执行
//                });
                this.isDisabled2 = true;
                this.isDisabled3 = false;
            },
            addSubmit() {
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
                        for(var i = 0; i < this.topicGatherList.length; i++ ){
                            this.delIdList.push(this.topicGatherList[i]._id)
                        }
                        let params = this.topicGatherForm.gatherFormList;
                        params.tagIcon = this.topicGatherForm.imageUrl;
                        params.topicIds = this.delIdList.join(";");
                        addTopicGather(params).then(res => {
                            alert('添加成功');
                            this.dialogVisible = false;
                            this.requestList();
                        });

//                    } else {
//                        return false;
//                    }
//                });
            },
//          修改
            modifyTopicGatherBtn(item) {
                this.dialogVisible = true;
                this.isDisabled = false;
                this.isDisabled2 = false;
                this.isDisabled3 = true;
                this.showBtn = true;
                let tagId = item._id;
                getTopicGatherDetail(tagId).then((res) => {
                    if (res.data.status === 1) {
                        this.topicGatherForm.gatherFormList = res.data.data;
                        this.topicGatherForm.imageUrl = res.data.data.tagIcon;
                        this.topicGatherList = res.data.data.topicList;
                    } else {
                        alert(res.data.msg);
                    }

                })
            },
//          点击提交按钮
            modifySubmit() {
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
                        if(this.delList.length>0){
                            let tagId = this.topicGatherForm.gatherFormList._id;
                            let topicIds = this.delList.join(";");
                            deleteTopicGatherItem(tagId, topicIds).then((res) => {
                                if (res.data.status === 1) {
                                    this.requestList();
                                } else {
                                    alert(res.data.msg);
                                }
                            });
                        }
                        for(let i = 0; i < this.topicGatherList.length; i++ ){
                            this.delIdList.push(this.topicGatherList[i]._id)
                        }
                        let params = this.topicGatherForm.gatherFormList;
                        params.tagId = this.topicGatherForm.gatherFormList._id;
                        params.tagIcon = this.topicGatherForm.imageUrl;
                        params.topicIds = this.delIdList.join(";");
                        let tagId = this.topicGatherForm.gatherFormList._id;
                        modifyTopicGather(tagId, params).then((res) => {
                            this.dialogVisible = false;
                            alert("修改成功");
                            this.requestList();
                        });
//                    } else {
//                        return false;
//                    }
//                });
            },
//          删除
            deleteTopicGatherBtn(item) {
                let tagId = item._id;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteTopicGather(tagId).then((res) => {
                        if (res.data.status === 1) {
                            this.requestList();
                        } else {
                            alert(res.data.msg);
                        }
                    })
                }).catch(() => {

                });
            },
//          分页
            handleCurrentChange(val) {
                this.page = val;
                this.requestList();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .smallImg{
        width: 60px;
        height: 60px;
        object-fit: cover;
    }
</style>
