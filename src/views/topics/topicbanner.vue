<template class="topicbanner">
    <div class="col-sm-12">
        <form class="form-inline form-search addguess-head">
            <div class="form-group">
                <label class="size-set pull-left" style="margin-left: 0px">选择Banner类型:</label>
                <el-select v-model="bannerType" value-key="name" class="selected-guess" filterable placeholder=""
                           @change="bannerChange">
                    <el-option
                            v-for="item in optionsA"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="line-block"></div>
        </form>
        <!-- 添加按钮 -->
        <div class="text-right" style="padding-bottom:10px;margin-top: 10px;">
            <button class="btn btn-success" type="button" @click="addTopicBannerBtn">
                <span class="glyphicon glyphicon-plus" aria-hidden="true">添加</span>
            </button>
        </div>
        <!-- 话题Banner列表 -->
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item" v-for="(item, index) in pageList">
                <div class="row" style="padding: 0 10px;">
                    <div class="col-xs-3">
                        <div class="rectangle-container" style="margin-right: 10px;">
                            <span>{{(index+1) + tpageSize*(page-1)}}</span>
                            <img style="width: 120px;height: 60px;margin-left: 10px;cursor: pointer" :src="item.coverImageUrl" @click="showPicture(item)" class="imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                        </div>
                    </div>
                    <div class="col-xs-7">
                        <div>名称：{{item.title}}</div>
                        <p>{{item.createdAt | formatDate}}</p>
                        <small>ID:{{item._id}}</small><br>
                    </div>
                    <div class="text-right col-xs-2" style="padding-top: 4px">
                        <div>
                            <button style="background: #24b60b;" @click="topicBannerUp(item,index)"  class="btn btn-primary btn-my">向上</button>
                            <button style="background: #24b60b;" @click="topicBannerDown(item,index)" class="btn btn-primary btn-my">向下</button>
                        </div>
                        <div style="padding-top:10px">
                            <button class="btn btn-primary btn-my" type="button" @click="modifyTopicBannerBtn(item)">编辑</button>
                            <button class="btn btn-danger btn-my" type="button" @click="deleteTopicBannerBtn(item)">删除</button>
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
            <el-form :model="topicBannerForm" label-width="120px" ref="topicBannerForm" :rules="rules">
                <el-form-item label="Banner类型:" prop="name">
                    <el-input v-model="topicBannerForm.bannerTypeName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="Banner名称:" prop="bannerFormList.title">
                    <el-input v-model="topicBannerForm.bannerFormList.title" auto-complete="off" placeholder="请输入Banner图片名称" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="Banner图片:" prop="imageUrl">
                    <el-input v-model="topicBannerForm.imageUrl" auto-complete="off" :disabled='isDisabled'></el-input>
                    <el-upload
                            class="avatar-uploader"
                            action="http://47.93.223.69:8066/admin/media"
                            :headers="myHeaders"
                            :data="fileData"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="topicBannerForm.imageUrl" :src="topicBannerForm.imageUrl" class="avatar" style="margin-top: 6px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="display: none"></i>
                        <el-button size="small" type="primary" v-if="showBtn">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="话题集合Id:" prop="bannerFormList.postId">
                    <el-input v-model="topicBannerForm.bannerFormList.postId" auto-complete="off" :disabled='isDisabled'></el-input>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false" v-if='isDisabled1'>取消</el-button>
                    <!--添加-->
                    <el-button type="primary" @click="addSubmit('topicBannerForm')" v-if='isDisabled2'>提交</el-button>
                    <!--修改-->
                    <el-button type="primary" @click="modifySubmit('topicBannerForm')" v-if='isDisabled3'>提交</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getTopicBanner, addTopicBanner, getTopicBannerDetail, modifyTopicBanner, setTopicBanner, deleteTopicBanner} from '../../api/api';
    import { formatDate } from '../../api/date';
    export default {
        data() {
            return {
                myHeaders: {token:JSON.parse(sessionStorage.getItem("token")) ? JSON.parse(sessionStorage.getItem("token")) : ''},
                total: 0,
                page: 1,
                tpageSize: 10,
                pageList: [],
                bannerType: '话题集合Banner',
                isDisabled: false,
                isDisabled1: false,
                isDisabled2: false,
                isDisabled3: false,
                showBtn: false,
                optionsA: [
                    {id: 6, name: '话题集合banner'},
                    {id: 7, name: '话题banner'}
                ],
                dialogVisible: false,
                topicBannerForm:{
                    bannerFormList:{},
                    bannerTypeName:'',
                    imageUrl: ''
                },
                rules: {
                    'bannerFormList.title': [
                        { required: true, message: '请输入Banner图片名称', trigger: 'blur' }
                    ],
                    'bannerFormList.postId': [
                        { required: true, message: '请输入Id', trigger: 'blur' }
                    ],
                    imageUrl: [
                        { type: 'string', required: true, message: '请上传图片', trigger: 'blur' }
                    ]
                },
                fileData: {
                    mediaCategory: 1002
                }
            }
        },
        mounted() {
            this.requestList();
        },
        filters: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
//          改变游戏类型
            bannerChange() {
                this.requestList();
            },
//          话题Banner列表
            requestList() {
                let params = {
                    offset: this.page * this.tpageSize - this.tpageSize,
                    limit: this.tpageSize,
                    bannerType:this.bannerType.id?this.bannerType.id:6,
                    gameType:4
                };
                getTopicBanner(params).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList = res.data.data.docs;
                        this.total = res.data.data.total-1;
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
//          图片上传
            handleAvatarSuccess(res) {
                this.topicBannerForm.imageUrl = res.data.avatar;
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
            addTopicBannerBtn() {
                this.dialogVisible = true;
                this.showBtn = true;
                this.topicBannerForm = {
                    bannerFormList : {},
                    bannerTypeName:'',
                    imageUrl : ''
                };
                this.$nextTick(() => { //等待dom同步后打开模态框
                    this.$refs['topicBannerForm'].resetFields(); //此方法需要模态框加载完成后才可以执行
                });
                this.isDisabled1 = true;
                this.isDisabled2 = true;
                this.isDisabled3 = false;
                this.topicBannerForm.bannerTypeName = this.bannerType.name ? this.bannerType.name : '话题集合Banner';
            },
            addSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = this.topicBannerForm.bannerFormList;
                        params.bannerType = this.optionsA.id?this.optionsA.id:6;
                        params.coverImageUrl = this.topicBannerForm.imageUrl;
                        params.gameType = 4;
                        addTopicBanner(params).then(res => {
                            alert('添加成功');
                            this.dialogVisible = false;
                            this.requestList();
                        });

                    } else {
                        return false;
                    }
                });
            },
//          修改
            modifyTopicBannerBtn(item) {
                this.dialogVisible = true;
                this.isDisabled = false;
                this.isDisabled1 = true;
                this.isDisabled2 = false;
                this.isDisabled3 = true;
                this.showBtn = true;
                this.topicBannerForm.bannerTypeName = this.bannerType.name ? this.bannerType.name : '话题集合Banner';
                let bannerId = item._id;
                getTopicBannerDetail(bannerId).then((res) => {
                    this.topicBannerForm.bannerFormList = res.data.data;
                    this.topicBannerForm.imageUrl = res.data.data.coverImageUrl;
                })
            },
//            点击提交按钮
            modifySubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = this.topicBannerForm.bannerFormList;
                        params.coverImageUrl = this.topicBannerForm.imageUrl;
                        params.bannerType = this.bannerType.id ? this.bannerType.id : 6;
                        params.gameType = 4;
                        let bannerId = this.topicBannerForm.bannerFormList._id;
                        modifyTopicBanner(bannerId, params).then((res) => {
                            this.dialogVisible = false;
                            alert("修改成功");
                            this.requestList();
                        });
                    } else {
                        return false;
                    }
                });
            },
//          向上
            topicBannerUp(item,index) {
                if (index > 0) {
                    this.pageList.splice(index, 1);
                    this.pageList.splice(index-1, 0, item);
                    this.pageList.forEach((item, index) => {
                        item.sortIndex = index + 1;
                    });
                    let params = {
                        data: this.pageList
                    };
                    setTopicBanner(params).then((res) => {
                        if (res.data.status === 1) {
                        } else {
                            alert(res.data.msg);
                        }
                    })
                } else{
                    alert('已经是第一个了！！')
                }
            },
//          向下
            topicBannerDown(item,index) {
                if (index != this.pageList.length - 1) {
                    this.pageList.splice(index, 1);
                    this.pageList.splice(index+1, 0, item);
                    this.pageList.forEach((item, index) => {
                        item.sortIndex = index + 1;
                    });
                    let params = {
                        data: this.pageList
                    };
                    setTopicBanner(params).then((res) => {
                        if (res.data.status === 1) {
                        } else {
                            alert(res.data.msg);
                        }
                    })
                } else{
                    alert('已经是最后一个了！！')
                }
            },
//          删除
            deleteTopicBannerBtn(item) {
                let bannerId = item._id;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteTopicBanner(bannerId).then((res) => {
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

</style>
