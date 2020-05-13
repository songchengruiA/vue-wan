<template class="alltopicdetail">
    <div class="col-sm-12">
        <div class="outer-item">
            <!-- 话题名称 -->
            <div class="search-box" style="margin-left: 40%;">
                <h3>{{titleData.topicName}}</h3>
            </div>
            <!-- 抓取资讯按钮 -->
            <div class="text-right"  style="padding-bottom:10px">
                <button class="btn btn-primary" type="button" @click="returnBtn()">返回</button>
            </div>
            <ul class="nav nav-tabs" style="width: 100%;float: left;">
                <li style="cursor: pointer;" role="presentation" :class="{true:'active'}[thistab == 1]">
                    <a @click="switchBtn('consult')">资讯</a>
                </li>
                <li style="cursor: pointer;" role="presentation" :class="{true:'active'}[thistab == 2]">
                    <a @click="switchBtn('dynamic')">动态</a>
                </li>
            </ul>
        </div>
        <div style="clear: both"></div>
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item" v-for="(item,index) in pageList" style="min-width: 760px;">
                <div class="row" style="padding: 0 10px;min-width: 710px;">
                    <!--动态-->
                    <div class="col-xs-11" style="min-width: 610px;" v-if="contentType === 2">
                        <div class="col-xs-1" style="min-width: 153px;">
                            <div class="rectangle-container">
                                <span>{{(index+1)}}</span>
                                <img style="width: 70px;height: 70px;object-fit: cover;" :src="item.publisher.avatar" class="imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                            </div>
                        </div>
                        <div class="col-xs-3" style=" min-width: 200px;">
                            <p>用户名：{{item.publisher.nickname}}</p>
                            <div>评论数：{{item.commentNum}}</div>
                            <p>{{item.createdAt | formatDate}}</p>
                        </div>
                        <div class="col-xs-5" style="min-width: 300px;">
                            <div style="cursor:pointer;padding-top: 3px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">内容：{{item.content}}</div>
                            <div>
                                <img v-for="images in item.dynamicImages" style="cursor: pointer; width: 50px;height: 50px;float: left;margin-right: 5px;" :src="images" class="imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                            </div>
                            <div class="website" v-if="item.linkInfo">
                                <span>{{item.linkInfo.title}}</span>
                                <a :href="item.linkInfo.link"  target="_Blank">：{{item.linkInfo.link}}</a>
                            </div>
                        </div>
                    </div>
                    <!--资讯-->
                    <div class="col-xs-11" v-if="contentType === 1">
                        <div style="cursor: pointer" class="ellipsis1">内容：{{item.mblog.content}}</div>
                        <div style="padding-top: 5px">
                            <span>评论数：{{item.commentNum}}个</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>时间：{{item.createdAt | formatDate}}</span>
                        </div>
                        <div class="website">
                            <span>网址：</span>
                            <a :href="item.indexUrl"  target="_Blank">{{item.indexUrl}}</a>
                        </div>
                        <!--<div style="padding-top: 8px" ng-bind="item.createdAt | date:'yyyy-MM-dd HH:mm:ss'"></div>-->
                    </div>
                    <!--资讯按钮-->
                    <div class="text-right col-xs-1" style="padding-top: 15px" v-if="contentType === 1">
                        <div>
                            <button class="btn btn-primary btn-my" style="background: #24b60b;" type="button" @click="openCommentModal(item)">详情</button>
                        </div>
                        <div style="padding-top:10px">
                            <button class="btn btn-danger btn-my" type="button" @click="openDeleteConsultAlertModal(item)">删除</button>
                        </div>
                    </div>
                    <!--动态按钮-->
                    <div class="text-right col-xs-1" style="padding-top: 8px" v-if="contentType === 2">
                        <div>
                            <button class="btn btn-primary btn-my" style="background: #24b60b;" type="button" @click="openCommentModal(item)">详情</button>
                        </div>
                        <div style="padding-top:10px">
                            <button class="btn btn-danger btn-my" type="button" @click="openDeleteDynamicAlertModal(item)">删除</button>
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
            <el-form :model="topicDetailForm" label-width="120px">
                <el-form-item>
                    <div class="search-box" style="margin:5px 0 15px 0;display: flex;">
                        <input class="form-control" placeholder="请输入用户名" v-model="searchTitle"  style="width: 90%;margin-right: 10px;">
                        <button class="btn btn-success" @click="searchNamePosts()">搜索</button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <!--资讯的内容-->
                    <div style="font-size: 14px;border-bottom: 1px solid #ccc;margin-bottom: 15px;">
                        <div class="form-group">
                            <span style="border: 1px solid grey;border-radius: 3px;font-size: 12px;">内容</span>
                            <span v-if="commentContent">{{commentContent}}</span>
                        </div>
                        <!--资讯链接-->
                        <div class="form-group website" v-if="informationLink">
                            <a :href="informationLink" target="_Blank" >网址：{{informationLink}}</a>
                        </div>
                        <!--动态图片-->
                        <div style="margin-top: 5px; height: 70px;" v-if="commentImages">
                            <img v-for="image in commentImages" style="cursor: pointer; width: 60px;height: 60px;float: left;margin-right: 5px;" :src="image" class="imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                        </div>
                        <!--动态链接-->
                        <div class="form-group website" v-if="commentLink">
                            <span v-if="commentTitle">{{commentTitle}}</span>
                            <a :href="commentLink" target="_Blank" >：{{commentLink}}</a>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="form-group" style="width: 32px;border-bottom: 4px solid #1491cf;font-size: 16px">
                        评论
                    </div>
                </el-form-item>
                <el-form-item>
                    <ul class="list-group" style="overflow:auto;max-height: 500px;" v-if="commentList.length != 0">
                        <li class="list-group-item" style="margin-bottom: 5px;" v-for="item in commentList">
                            <div class="row" style="padding: 0 10px;">
                                <div class="col-xs-2">
                                    <div class="rectangle-container">
                                        <span>{{index+1}}</span>
                                        <img style="width: 60px;height: 60px;object-fit: cover;" class="imageslib-thumb-image absolute-position img-thumbnail" :src="item.publisher.avatar" alt="无缩略图">
                                    </div>
                                </div>
                                <div class="col-xs-3" style="padding-top: 3px;">
                                    <p>用户名：{{item.publisher.nickname}}</p>
                                    <p>{{item.createdAt | formatDate}}</p>
                                </div>
                                <div class="col-xs-6">
                                    <div :class="{true:'ellipsis2'}[item.content.length >= 80 && !item.contentLenght]" style="padding-top: 8px">内容：{{item.content}}</div>
                                    <!--<div class="easy-btn" ng-show="item.content.length >= 80 && !item.contentLenght" ng-click="easyBtn1(item)">全文</div>-->
                                    <!--<div class="easy-btn" ng-show="item.content.length >= 80 && item.contentLenght" ng-click="easyBtn2(item)">收起</div>-->
                                </div>
                                <div  style="margin-top: 18px;float: right" class="text-right col-xs-1 deleteBtn" @click="openDeleteCommentAlertModal(item)">
                                    删除
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">关闭</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getInformationList, deleteConsult, deleteDynamic, getCommentList, deleteComment} from '../../api/api';

    import { formatDate } from '../../api/date';

    export default {
        data() {
            return {
                myHeaders: {token:JSON.parse(sessionStorage.getItem("token")) ? JSON.parse(sessionStorage.getItem("token")) : ''},
                total: 0,
                page: 1,
                tpageSize: 10,
                topId: '',
                detailType: '',
                num: '',
                contentType: '',
                searchTitle: '',
                dialogVisible: false,
                pageList: [],
                commentList: [],
                titleData:{},
                thistab: 1,
                topicDetailForm: {

                },
                commentContent: '',
                informationLink: '',
                commentImages: [],
                commentTitle: '',
                commentLink: ''
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
//          获取咨询和动态列表
            requestList() {
                let topId = this.$route.params.id;
                let params = {
                    offset: this.page * this.tpageSize - this.tpageSize,
                    limit: this.tpageSize,
                    type : this.thistab,
                    key : this.searchTitle
                };
                getInformationList(topId, params).then((res) => {
                    if (res.data.status === 1) {
                        this.topId = this.$route.params.id;
                        this.detailType = this.$route.params.detailType;
                        this.num = this.$route.params.num;
                        this.titleData.topicName = this.$route.query.topicName;
                        this.pageList = res.data.data.listInfo.list;
                        this.total = res.data.data.listInfo.total - 1;
                        this.contentType = res.data.data.contentType;
                    }
                })
            },
//          获取评论列表
            requestCommentList(id) {
                let topId = id;
                let params = {
                    offset: this.page * this.tpageSize - this.tpageSize,
                    limit: this.tpageSize,
                    type : this.thistab
                };
                getCommentList(topId, params).then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        this.commentList = res.data.data.commentList;
//                        this.contentType = res.data.data.contentType;
                    }
                })
            },
//          点击评论列表中的搜索
            searchNamePosts() {
               this.requestCommentList(id);
            },
//          切换咨询和动态按钮
            switchBtn(detailTypeC) {
                if (detailTypeC == 'consult') {
                    this.thistab = 1;
                } else {
                    this.thistab = 2;
                }
                this.$router.push({path:"/alltopic/"+ this.topId + '/' + detailTypeC + '/' + this.num,query:{topicName: this.titleData.topicName}});
                this.requestList()
            },
//          点击详情按钮
            openCommentModal(item) {
                this.dialogVisible = true;
                this.requestCommentList(item._id);
                if (this.thistab == 1) {
                    this.commentContent = item.mblog.content;
                    this.informationLink = item.indexUrl;
                } else {
                    this.commentContent = item.content;
                    if (item.dynamicImages) {
                        this.commentImages = item.dynamicImages;
                    } else {
                        this.commentImages = [];
                    }
                    if (item.linkInfo) {
                        this.commentTitle = item.linkInfo.title;
                        this.commentLink = item.linkInfo.link;
                    } else {
                        this.commentTitle = "";
                        this.commentLink = "";
                    }
                }
            },
//          点击咨询列表删除按钮
            openDeleteConsultAlertModal(item) {
                let topicId = item._id;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteConsult(topicId).then((res) => {
                        if (res.data.status === 1) {
                            this.requestList();
                        } else {
                            alert(res.data.msg);
                        }
                    })
                }).catch(() => {

                });
            },
//          点击动态列表删除按钮
            openDeleteDynamicAlertModal(item) {
                let topicId = item._id;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteDynamic(topicId).then((res) => {
                        if (res.data.status === 1) {
                            this.requestList();
                        } else {
                            alert(res.data.msg);
                        }
                    })
                }).catch(() => {

                });
            },
//          点击评论列表的删除按钮
            openDeleteCommentAlertModal(item){
                let topicId = item._id;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteComment(topicId).then((res) => {
                        if (res.data.status === 1) {
                            this.requestList();
                        } else {
                            alert(res.data.msg);
                        }
                    })
                }).catch(() => {

                });
            },
//          返回按钮
            returnBtn(){
                if (this.num == 1) {
                    this.$router.push({path:"/alltopic"})
                } else if (this.num == 2){
                    this.$router.push({path:"/hottopic"})
                }

            },
//          分页
            handleCurrentChange(val) {
                this.page = val;
                this.requestList();
            }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
