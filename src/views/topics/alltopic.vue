<template class="alltopic">
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
            <button class="btn btn-success" type="button" @click="addAllTopicBtn">
                <span class="glyphicon glyphicon-plus" aria-hidden="true">添加</span>
            </button>
        </div>
        <!-- 全部话题列表 -->
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item" v-for="(item, index) in pageList" style="min-width: 760px;">
                <div class="row" style="padding: 0 10px;min-width: 710px;">
                    <div class="col-xs-10" style="min-width: 610px;">
                        <div class="col-xs-1" style="min-width: 90px;">
                            <div class="rectangle-container">
                                <!--<span>{{($index+1) + allTopicsPagination.topicsLimit*(allTopicsPagination.currPage-1)}}</span>-->
                                <div style="position: relative;width: 60px;height: 60px;display: inline-block">
                                    <img style="cursor: pointer" :src="item.topicIcon" class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                                    <div class="hotWord" v-show="item.isHot == true">热</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-2" style="min-width: 190px;">
                            <p style="margin-bottom: 3px;">名称：{{item.title}}</p>
                            <small>ID:{{item._id}}</small>
                        </div>
                        <div class="col-xs-3" style="min-width: 130px;">
                            <p>关注人数：{{item.realFollowNum}}人</p>
                            <p>{{item.createdAt | formatDate}}</p>
                        </div>
                        <div class="col-xs-3" style="min-width: 180px;">
                            <p style="margin-bottom: 2px;"><span>资讯数：{{item.cardNum}}</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>动态数：{{item.dynamicNum}}</span></p>
                            <div style="cursor: pointer" class="ellipsis2">简介：{{item.content}}</div>
                        </div>
                    </div>
                    <div class="text-right col-xs-2" style="padding-top:6px">
                        <div>
                            <button style="background: #24b60b;" class="btn btn-info btn-my" type="button">预览</button>
                            <button class="btn btn-default copy" type="button" :data-clipboard-text='item._id'>
                                <span class="glyphicon glyphicon-copy">复制话题集合 ID</span>
                            </button>
                        </div>
                        <div style="padding-top:5px">
                            <button class="btn btn-primary btn-my" type="button" @click="modifyAllTopicBtn(item)">编辑</button>
                            <button class="btn btn-danger btn-my" type="button" @click="deleteAllTopicBtn(item)">删除</button>
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
        <!--第一个界面-->
        <el-dialog v-model="dialogVisible" :close-on-click-modal="false" class="dialog-small">
            <el-form :model="allTopicForm" label-width="120px" v-show="ShowModal ==1">
                <el-form-item label="话题名称:">
                    <el-input v-model="allTopicForm.allTopicFormList.title" auto-complete="off" placeholder="请输入话题名称"></el-input>
                </el-form-item>
                <el-form-item label="话题头像:" >
                    <el-input v-model="allTopicForm.topicIcon" auto-complete="off"></el-input>
                    <el-upload
                            class="avatar-uploader"
                            action="http://47.93.223.69:8066/admin/media"
                            :headers="myHeaders"
                            :data="fileData"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="allTopicForm.topicIcon" :src="allTopicForm.topicIcon" class="avatar" style="margin-top: 6px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="display: none"></i>
                        <el-button size="small" type="primary" v-if="showBtn">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="话题类型:">
                    <el-select v-model="allTopicForm.topicType"  value-key="name"  filterable  placeholder="请选择话题类型">
                        <el-option
                                v-for="item in optionsA"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id" auto-complete="off">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="话题简介:"  class="textarea-box">
                    <el-input
                            :autosize="{ minRows: 2}"
                            type="textarea"
                            placeholder="请输入话题简介"
                            v-model="allTopicForm.allTopicFormList.content">
                    </el-input>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="nextStep()">下一步</el-button>
                </div>
            </el-form>
            <!--第二个界面-->
            <el-form :model="allTopicForm" label-width="30px" v-show="ShowModal ==2">
                <el-form-item label="选择抓去平台:" class="textarea-box">
                    <el-select v-model="allTopicForm.pickWebsite"  value-key="name"  filterable  placeholder="请选择抓去平台">
                        <el-option
                                v-for="item in optionsB"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id" auto-complete="off">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span class="tab-span" @click="nameSearchBtn()" :class="{activeSearch:nameSearch}">按名称搜索</span>
                    <span class="tab-span" @click="linkSearchBtn()"  :class="{activeSearch:!nameSearch}">按网址搜索</span>
                    <div class="search-box" style="margin:5px 0 15px 0;display: flex;" v-show="nameSearch">
                        <input class="form-control" placeholder="请输入搜索名称" v-model="allTopicForm.pickKeyword"  style="width: 90%;margin-right: 10px;">
                        <button class="btn btn-success" @click="searchNamePosts()">搜索</button>
                    </div>
                    <div class="search-box" style="margin:5px 0 15px 0;display: flex;" v-show="!nameSearch">
                        <input class="form-control" placeholder="请输入搜索网址" v-model="allTopicForm.pickKeyword"  style="width: 90%;margin-right: 10px;">
                        <button class="btn btn-success" @click="searchLinkPosts()">搜索</button>
                    </div>
                    <ul class="list-group" style="overflow:auto;max-height: 270px;" v-show="noAddAllTopicList[0]">
                        <li class="list-group-item" style="margin-bottom: 5px;" v-for="(item, index) in noAddAllTopicList">
                            <div class="row" style="padding: 0 10px;">
                                <div class="col-xs-2">
                                    <div class="rectangle-container">
                                        <span>{{index+1}}</span>
                                        <img class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图" :src="item.avatar">
                                    </div>
                                </div>
                                <div class="col-xs-3" style="padding-top:5px">
                                    <p>用户名：{{item.userName}}</p>
                                    <small v-show="allTopicForm.pickWebsite == 1">关注人数：{{item.fansNum}}</small>
                                </div>
                                <div class="col-xs-6">
                                    <div :class="{true:'ellipsis2'}[item.desc.length >= 60 && !item.contentLenght]" style="padding-top: 8px">内容：{{item.desc}}</div>
                                    <!--<div class="easy-btn" ng-show="item.desc.length >= 60 && !item.contentLenght" ng-click="easyBtn1(item)">全文</div>-->
                                    <!--<div class="easy-btn" ng-show="item.desc.length >= 60 && item.contentLenght" ng-click="easyBtn2(item)">收起</div>-->
                                </div>
                                <div class="col-xs-1" style="padding-top: 10px">
                                    <button @click="addTopic(item)" style="background:#169bd5;margin-top: 0;line-height: 20px;" class="deleteBtn" v-show="!item.show">添加</button>
                                    <button @click="delTopic(item)" class="deleteBtn" style="width:50px;background: grey;color: #fff;margin-top: 0;line-height: 20px;" v-show="item.show">已添加</button>
                                </div>
                            </div>
                        </li>
                        <!--分页-->
                        <div v-show="noAddTopicLength > 20">
                            <div @click="moreData()"  class="more-list" v-show="moreNum < noAddTopicLength">更多...</div>
                            <div v-show="noAddTopicLength == 0 ">最后一页</div>
                        </div>
                    </ul>
                    <!--<div class="more-list" v-show="noAddTopicLength == 0 ">暂无更多数据</div>-->
                    <ul class="list-group" style="overflow:auto;max-height: 320px;box-shadow: 0px 0px 22px #5d5b5b;">
                        <li class="list-group-item" style="margin-bottom: 5px;" v-for="(item, index) in allTopicForm.grabKeywords">
                            <div class="row" style="padding: 0 10px;">
                                <div class="col-xs-2">
                                    <div class="rectangle-container">
                                        <span>{{index+1}}</span>
                                        <img class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图" :src="item.avatar">
                                    </div>
                                </div>
                                <div class="col-xs-3" style="padding-top:5px">
                                    <p>用户名：{{item.userName}}</p>
                                    <small v-show="allTopicForm.pickWebsite == 1">关注人数：{{item.fansNum}}</small>
                                </div>
                                <div class="col-xs-6">
                                    <div :class="{true:'ellipsis2'}[item.desc.length >= 60 && !item.contentLenght]" style="padding-top: 8px">内容：{{item.desc}}</div>
                                    <!--<div class="easy-btn" ng-show="item.desc.length >= 60 && !item.contentLenght" ng-click="easyBtn1(item)">全文</div>-->
                                    <!--<div class="easy-btn" ng-show="item.desc.length >= 60 && item.contentLenght" ng-click="easyBtn2(item)">收起</div>-->
                                    <div>筛选条件：
                                        <span v-if="item.grabKeyword" class="topic-type filterSpan"><small>{{item.grabKeyword}}</small></span>
                                        <span v-if="item.cardType && item.cardType !=3" class="topic-type"><small>{{data1[item.cardType]}}</small></span>
                                        <span v-if="item.isOriginal" class="topic-type"><small>{{data2[item.isOriginal]}}</small></span>
                                    </div>
                                </div>
                                <div style="margin-top: 20px" class="text-right col-xs-1 deleteBtn"  @click="delTopicBtn(item,index)">
                                    删除
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="lastStep()">上一步</el-button>
                    <el-button type="primary" @click="nextStepTwo()">下一步</el-button>
                </div>
            </el-form>
            <!--第三个界面-->
            <el-form :model="allTopicForm" label-width="120px" v-show="ShowModal ==3">
                <h3 style="width: 100%;text-align: left;padding-left: 27px;">设置筛选条件</h3>
                <div style="width: 100%;text-align: left;font-weight: bolder;padding-left: 27px;margin-bottom:15px;">可以只抓取包括特定词语的微博</div>
                <el-form-item label="请输入博主经常提到的特定词汇（限1个，可不填)" class="textarea-box">
                    <el-input v-model="grabKeyword" auto-complete="off" placeholder="请输入话题名称"></el-input>
                </el-form-item>
                <el-form-item class="textarea-box">
                    <div class="form-group" style="padding: 20px 0 5px 0;">
                        <div style="margin-bottom: 6px;font-weight: bolder;">是否只看原创微博：</div>
                        <label :class="{'checked':isOriginal=='0'}" class="unchecked"><input v-model="isOriginal" type="radio" name="micro-blog" value="0" style="display: none" >否</label>
                        <label :class="{'checked':isOriginal=='1'}" class="unchecked"><input v-model="isOriginal" type="radio" name="micro-blog" value="1" style="display: none" >是</label>
                    </div>
                    <div class="form-group" style="border-bottom:1px solid #ccc;padding-bottom:5px;">
                        <div style="margin-bottom: 10px;font-weight: bolder;">其他内容筛选：</div>
                        <label :class="{'checked':cardType=='3'}" class="unchecked"><input v-model="cardType" type="radio" name="micro-blog" value="3" style="display: none" >所有类型</label>
                        <label :class="{'checked':cardType=='1'}" class="unchecked"><input v-model="cardType" type="radio" name="micro-blog" value="1" style="display: none" >仅图片</label>
                        <label :class="{'checked':cardType=='2'}" class="unchecked"><input v-model="cardType" type="radio" name="micro-blog" value="2" style="display: none" >仅视频</label>
                    </div>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="lastStepTwo()">上一步</el-button>
                    <!--添加-->
                    <el-button type="primary" @click="addSubmit()" v-if='isDisabled1'>提交</el-button>
                    <!--修改-->
                    <el-button type="primary" @click="modifySubmit()" v-if='isDisabled2'>提交</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getAllTopic, getNoAddAllTopic, addAllTopic, getAllTopicDetail, modifyAllTopic, deleteAllTopic} from '../../api/api';
    import { formatDate } from '../../api/date';
    import Clipboard from 'clipboard';
    export default {
        data() {
            return {
                myHeaders: {token:JSON.parse(sessionStorage.getItem("token")) ? JSON.parse(sessionStorage.getItem("token")) : ''},
                total: 0,
                page: 1,
                tpageSize: 10,
                pageList: [],
                noAddAllTopicList:[],
                noAddTopicLength:'',
                moreNum: 0,
                isOriginal: 0,
                cardType: 3,
                grabKeywordLists:[],
                delList:[],
                searchTitle: '',
                ShowModal: '',
                grabKeyword:'',
                showBtn: false,
                nameSearch: false,
                listShow: false,
                dialogVisible: false,
                isDisabled1: false,
                isDisabled2: false,
                allTopicForm:{
                    allTopicFormList:{},
                    topicIcon: '',
                    topicType:1,
                    pickWebsite:1,
                    pickKeyword:'',
                    grabKeywords:[]
                },
                optionsA:[
                    {id: 1, name: '全部话题'}
                ],
                optionsB:[
                    {id: 1, name: '微博'},
                    {id: 2, name: 'B站'}
                ],
                data1:{
                    '1':'仅图片',
                    '2':'仅视频'
                },
                data2:{
                    '1':'原创',
                    '0':'非原创'
                },
//                rules: {
//                    'allTopicFormList.title': [
//                        { required: true, message: '请输入Banner图片名称', trigger: 'blur' }
//                    ],
//                    'allTopicFormList.postId': [
//                        { required: true, message: '请输入Id', trigger: 'blur' }
//                    ],
//                    topicIcon: [
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
        computed: {},
        methods: {
//          话题Banner列表和点击搜索按钮
            requestList() {
                let params = {
                    offset: this.page * this.tpageSize - this.tpageSize,
                    limit: this.tpageSize,
                    title: this.searchTitle
                };
                getAllTopic(params).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList = res.data.data.list;
                        this.total = res.data.data.total-1;
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
//          获取抓去平台中未添加的列表
            noRequestList(offset, searchType){

                let params = {
                    offset: offset,
                    limit: 20,
                    pickKeyword: this.allTopicForm.pickKeyword,
                    pickWebsite: this.allTopicForm.pickWebsite,
                    pickType: searchType
                };
                getNoAddAllTopic(params).then((res) => {
                    if (res.data.status === 1) {
                        res.data.data.userlist.forEach((item) => {
                            this.noAddAllTopicList.push(item);
                        });
                        this.noAddTopicLength = res.data.data.total;
                        if (this.noAddTopicLength > 0) {
                            this.listShow = true;
                        } else {
                            this.listShow = false;
                        }
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
            //添加
            addAllTopicBtn() {
                this.noAddAllTopicList = [];
                this.dialogVisible = true;
                this.ShowModal = 1;
                this.showBtn = true;
                this.isDisabled1 = true;
                this.isDisabled2 = false;
                this.nameSearch = false;
                this.allTopicForm = {
                    allTopicFormList:{},
                    topicIcon: '',
                    topicType:'',
                    pickWebsite:1,
                    pickKeyword:'',
                    grabKeywords:[]
                };
                this.nameSearchBtn()
        //                this.$nextTick(() => { //等待dom同步后打开模态框
        //                    this.$refs['topicBannerForm'].resetFields(); //此方法需要模态框加载完成后才可以执行
        //                });
            },
//          图片上传
            handleAvatarSuccess(res) {
                this.allTopicForm.topicIcon = res.data.avatar;
            },
            beforeAvatarUpload(file) {
                this.fileData.media = file;
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },

//          第一个弹框的下一步
            nextStep(){
                this.ShowModal = 2;
            },
//          第二个弹框的上一步
            lastStep(){
                this.ShowModal = 1;
            },
//          第二个弹框的下一步
            nextStepTwo(){
                this.ShowModal = 3;
            },
//          第三个弹框的上一步
            lastStepTwo(){
                this.ShowModal = 2;
            },
//          点击按名称按钮
            nameSearchBtn() {
                this.noAddAllTopicList = [];
                this.allTopicForm.grabKeywords = this.grabKeywordLists?this.grabKeywordLists:[];
                this.allTopicForm.pickKeyword = '';
                this.nameSearch = !this.nameSearch
            },
//          点击按网址按钮
            linkSearchBtn() {
                this.noAddAllTopicList = [];
                this.allTopicForm.grabKeywords = this.grabKeywordLists?this.grabKeywordLists:[];
                this.allTopicForm.pickKeyword = '';
                this.nameSearch = !this.nameSearch
            },
//          点击按名称搜索按钮
            searchNamePosts() {
                if(this.moreNum != 0){
                    this.moreNum = 0
                }
                this.noAddAllTopicList = [];
                this.noRequestList(0, 1);
                return this.moreNum;
            },
//          点击按网址搜索按钮
            searchLinkPosts() {
                if(this.moreNum != 0){
                    this.moreNum = 0
                }
                this.noAddAllTopicList = [];
                this.noRequestList(0, 2);
                return this.moreNum;
            },
//          在待添加的数据中点击更多
            moreData() {
                this.moreNum += 20;
                let num = 2;
                if(!this.nameSearch){
                    num = 1;
                }
                this.noRequestList(this.moreNum,num);
                return this.moreNum;
            },
//          点击带添加列表中的添加按钮
            addTopic(item) {
                item.show = true;
                this.allTopicForm.grabKeywords.push(item);
                console.log(this.allTopicForm.grabKeywords)
            },
//          点击待添加列表中的未添加按钮
            delTopic(item) {
                item.show = false;
                let itemTitle ='';
                for(let i = 0; i < this.allTopicForm.grabKeywords.length ; i++ ){
                    itemTitle = this.allTopicForm.grabKeywords[i].title;
                    if( item.title === itemTitle){
                        this.allTopicForm.grabKeywords.splice(jQuery.inArray( this.allTopicForm.grabKeywords[i], this.allTopicForm.grabKeywords), 1);
                    }
                }
            },
//          点击已经添加的列表中的删除按钮
            delTopicBtn(item,index) {
                item.show = false;
                this.allTopicForm.grabKeywords.splice(index, 1);
//             往删除的列表中push数据的ID
                this.delList.push(item._id);
            },
//          添加时点击提交按钮
            addSubmit() {
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
                this.allTopicForm.grabKeywords.forEach((item,index) => {
                    this.allTopicForm.grabKeywords[index].grabKeyword=this.grabKeyword?this.grabKeyword:'';
                    this.allTopicForm.grabKeywords[index].cardType=this.cardType;
                    this.allTopicForm.grabKeywords[index].isOriginal=this.isOriginal;
                });
                let params = this.allTopicForm;
                params.title = this.allTopicForm.allTopicFormList.title;
                params.content = this.allTopicForm.allTopicFormList.content;
                addAllTopic(params).then(res => {
                    alert('添加成功');
                    this.dialogVisible = false;
                    this.requestList();
                });

//                    } else {
//                        return false;
//                    }
//                });
            },
//          点击修改按钮
            modifyAllTopicBtn(item) {
                this.noAddAllTopicList = [];
                this.dialogVisible = true;
                this.ShowModal = 1;
                this.showBtn = true;
                this.isDisabled1 = false;
                this.isDisabled2 = true;
                this.nameSearch = true;
                let tagId = item._id;
                getAllTopicDetail(tagId).then((res) => {
                    if (res.data.status === 1) {
                        this.allTopicForm.allTopicFormList = res.data.data;
                        this.allTopicForm.topicIcon = res.data.data.topicIcon;
                        this.grabKeywordLists = this.allTopicForm.grabKeywords;
                        this.allTopicForm.pickWebsite = 1;
                        this.grabKeyword = '';
                        this.cardType = 3;
                        this.isOriginal = 0;
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
//          点击提交按钮
            modifySubmit() {
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
//                if(this.delList.length>0){
//                    let tagId = this.allTopicForm.allTopicFormList._id;
//                    let topicIds = this.delList.join(";");
//                    deleteHotTopicItem(tagId, topicIds).then((res) => {
//                        if (res.data.status === 1) {
//                            this.requestList();
//                        } else {
//                            alert(res.data.msg);
//                        }
//                    });
//                }
//                for(let i = 0; i < this.topicGatherList.length; i++ ){
//                    this.delIdList.push(this.topicGatherList[i]._id)
//                }
                this.allTopicForm.grabKeywords.forEach((item,index) => {
                    this.allTopicForm.grabKeywords[index].grabKeyword=this.grabKeyword?this.grabKeyword:'';
                    this.allTopicForm.grabKeywords[index].cardType=this.cardType;
                    this.allTopicForm.grabKeywords[index].isOriginal=this.isOriginal;
                });
                let params = this.allTopicForm;
                params.title = this.allTopicForm.allTopicFormList.title;
                params.content = this.allTopicForm.allTopicFormList.content;
                let tagId = this.allTopicForm.allTopicFormList._id;
                modifyAllTopic(tagId, params).then((res) => {
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
            deleteAllTopicBtn(item) {
                let topicId = item._id;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteAllTopic(topicId).then((res) => {
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
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .smallImg{
        width: 60px;
        height: 60px;
        object-fit: cover;
    }
    .hotWord{
        font-size: 12px;
        color: red;
        border: 1px solid red;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 16px;
        position: absolute;
        top: -7px;
        right: -8px;
    }
    .activeSearch{
        background: red !important;
    }
    .tab-span {
        font-weight: bolder;
        background: #bdb2b2;
        border-radius: 3px;
        color: #fff;
        padding: 1px 4px;
        cursor: pointer;
    }
    .filterSpan{
        cursor:pointer;
        max-width: 100px;
        margin-bottom: -7px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .more-list{
        text-align: center;
        border: 1px solid #ddd;
        height: 23px;
        line-height: 21px;
        cursor: pointer!important;
        color: grey;
    }
    .checked{
        background: #1491cf;
        color: #fff;
    }
    .unchecked{
        width: 70px;
        height: 30px;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
    }
</style>
