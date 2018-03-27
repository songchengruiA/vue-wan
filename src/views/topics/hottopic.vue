<template class="hottopic">
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
            <button class="btn btn-success" type="button" @click="addHotTopicBtn">
                <span class="glyphicon glyphicon-plus" aria-hidden="true">编辑</span>
            </button>
        </div>
        <!-- 全部热门列表 -->
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item" v-for="(item, index) in pageList" style="min-width: 760px;">
                <div class="row" style="padding: 0 10px;min-width: 710px;">
                    <div class="col-xs-10" style="min-width: 610px;">
                        <div class="col-xs-1" style="min-width: 90px;">
                            <div class="rectangle-container">
                                <span>{{index+1}}</span>
                                <img style="cursor: pointer" :src="item.topicIcon" class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
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
                            <router-link :to="{path:'/alltopic/' + item._id +'/'+ detailType + '/' + 2, query:{topicName:item.title}}" class="btn btn-sm btn-info">预览</router-link>
                            <button class="btn btn-default copy" type="button" :data-clipboard-text='item._id'>
                                <span class="glyphicon glyphicon-copy">复制话题集合 ID</span>
                            </button>
                        </div>
                        <div style="padding-top:5px">
                            <button class="btn btn-danger btn-my" type="button" @click="deleteHotTopic(item)">删除</button>
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
            <el-form  label-width="120px">
                <el-form-item label="相关的话题名称(ID):">
                    <el-input placeholder="添加相关的话题名称(ID)" auto-complete="off" v-model="relevantTitle" @change="searchChange()" v-on:click.native="searchAll"></el-input>
                    <ul class="list-group" style="overflow:auto;margin-bottom: 0;height: 300px;"  v-show="searchShow">
                        <li class="list-group-item"v-for="(item, index) in noHotTopicList">
                            <div class="row" style="padding: 0 10px;">
                                <div class="col-xs-2">
                                    <div class="rectangle-container">
                                        <span>{{(index+1)}}</span>
                                        <img :src="item.topicIcon" class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                                    </div>
                                </div>
                                <div class="col-xs-3" style="">
                                    <p>名称：{{item.title}}</p>
                                    <p>{{item.createdAt | formatDate}}</p>
                                </div>
                                <div class="col-xs-6" style="padding-top: 3px;">
                                    <div :class="{true:'ellipsis2'}[item.content.length >= 60 && !item.contentLenght]">内容：{{item.content}}</div>
                                    <!--<div class="easy-btn" ng-show="item.content.length >= 60 && !item.contentLenght" ng-click="easyBtn1(item)">全文</div>-->
                                    <!--<div class="easy-btn" ng-show="item.content.length >= 60 && item.contentLenght" ng-click="easyBtn2(item)">收起</div>-->
                                </div>
                                <div class="col-xs-1">
                                    <button @click="addTopic(item)" v-show="!item.show" style="background: #169bd5;line-height: 19px;margin-top: 20px;" class="deleteBtn">添加</button>
                                    <button @click="delTopic(item)" v-show="item.show" style="background: grey;color: #fff;border-radius: 3px;width: 52px;margin-top: 20px;">已添加</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="list-group" >
                        <li class="list-group-item" style="margin-bottom: 5px;padding: 0px" v-for="(item, index) in hotTopicList" v-show="hotTopicList">
                            <div class="row" style="padding: 0 18px;">
                                <div class="col-xs-2">
                                    <div class="rectangle-container" style="padding-top: 6px">
                                        <span>{{(index+1)}}</span>
                                        <img :src="item.topicIcon" class="smallImg imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图">
                                    </div>
                                </div>
                                <div class="col-xs-3" style="padding-left: 10px;padding-top: 6px">
                                    <p>名称：{{item.title}}</p>
                                    <p>{{item.createdAt | formatDate}}</p>
                                </div>
                                <div class="col-xs-5" style="padding-top: 9px;">
                                    <div :class="{true:'ellipsis2'}[item.content.length >= 60 && !item.contentLenght]">内容：{{item.content}}</div>
                                    <!--<div class="easy-btn" ng-show="item.content.length >= 60 && !item.contentLenght" ng-click="easyBtn1(item)">全文</div>-->
                                    <!--<div class="easy-btn" ng-show="item.content.length >= 60 && item.contentLenght" ng-click="easyBtn2(item)">收起</div>-->
                                </div>
                                <div class="col-xs-2">
                                    <!--<button ng-click="delTopic(item,$index)" style="margin-top: 19px;line-height: 19px;" class="deleteBtn">删除</button>-->
                                    <button @click="dropClick(item,index); $event.stopPropagation();" style="margin-left:42px;margin-top: 10px;background: #169bd5;line-height: 19px;" class="deleteBtn">调序</button>
                                    <button @click="hotTopicUp(item,index)" style="margin-top: 19px;position: relative;top: -10px;background: #24b60b;line-height: 19px;"  class="deleteBtn">向上</button>
                                    <button @click="hotTopicDown(item,index)" style="margin-top: 19px;position: relative;top: -10px;background: #24b60b;line-height: 19px;" class="deleteBtn">向下</button>
                                    <div class="out-box" v-show="showIndex == item._id">
                                        <div class="tip-box"></div>
                                        <div class="in-box">调序至 <input type="text" v-model="item.dropNumber" @keyup="clearNum(item,'dropNumber')"  style="width:26px;height: 16px;border:1px solid #ccc; ">
                                            <button @click="drop(item,index)" style="margin-top: 4px;height:17px;line-height: 15px;background: #169bd5;" class="deleteBtn" >确定</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addSubmit()">提交</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getHotTopic, getNoHotTopic, getHotTopicDetail, addHotTopic, deleteHotTopic} from '../../api/api';
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
                noHotTopicList:[],
                hotTopicList:[],
                formData :{
                    data : []
                },
                searchTitle: '',
                relevantTitle:'',
                showIndex:'',
                searchShow: false,
                isDisabled: false,
                showBtn: false,
                dialogVisible: false,

//                rules: {
//                    'gatherFormList.title': [
//                        { required: true, message: '请输入Banner图片名称', trigger: 'blur' }
//                    ],
//                    'gatherFormList.postId': [
//                        { required: true, message: '请输入Id', trigger: 'blur' }
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
                    title: this.searchTitle,
                    isHot: true
                };
                getHotTopic(params).then((res) => {
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
                getNoHotTopic(params).then((res) => {
                    if (res.data.status === 1) {
                        this.noHotTopicList = res.data.data.list;
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
                this.hotTopicList.push(item)
            },
//          点击未添加按钮
            delTopic(item) {
                item.show = false;
                let itemTitle ='';
                for(let i = 0; i < this.hotTopicList.length ; i++ ){
                    itemTitle = this.hotTopicList[i].title;
                    if( item.title === itemTitle){
                        this.hotTopicList.splice(jQuery.inArray( this.hotTopicList[i], this.hotTopicList), 1);
                    }
                }
            },
            //          添加
            addHotTopicBtn() {
                this.dialogVisible = true;
                this.showBtn = true;

//                this.$nextTick(() => { //等待dom同步后打开模态框
//                    this.$refs['topicBannerForm'].resetFields(); //此方法需要模态框加载完成后才可以执行
//                });
                let params = {
                    isHot : true
                };
                getHotTopicDetail(params).then((res) => {
                    if (res.data.status === 1) {
                        this.hotTopicList = res.data.data.list;
                    } else {
                        alert(res.data.msg);
                    }
                })
            },
            addSubmit() {
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
                this.formData.data = [];
                for(let i = 0; i < this.hotTopicList.length ; i++ ){
                    let formData = {
                        topicId:'',
                        sortIndex:''
                    };
                    formData.topicId = this.hotTopicList[i]._id;
                    formData.sortIndex = i+1;
                    this.formData.data.push(formData)
                }
                addHotTopic(this.formData).then(res => {
                    if (res.data.status === 1) {
                        alert('添加成功');
                        this.dialogVisible = false;
                        this.requestList();
                    } else {
                        alert(res.data.msg);
                    }
                });

//                    } else {
//                        return false;
//                    }
//                });
            },
            //排序
            dropClick(item,index) {
                this.showIndex=item._id;
                item.dropNumber='';
            },
            drop(item,index) {
                if(item.dropNumber > this.hotTopicList.length || item.dropNumber == '' || item.dropNumber == 0){
                    alert('请输入正确的序号')
                }else {
                    this.hotTopicList.splice(index, 1);
                    this.hotTopicList.splice(item.dropNumber-1, 0, item);
                    alert('调序成功');
                    this.showIndex=!this.showIndex
                }

            },
            clearNum(obj, attr) {
                obj[attr] = obj[attr].replace(/\D/g,"");
            },
            //向上
            hotTopicUp(item,index) {
                if(index>0){
                    this.hotTopicList.splice(index, 1);
                    this.hotTopicList.splice(index-1, 0, item);
                }else {
                    alert('已经是第一个了！！')
                }
            },
            //向下
            hotTopicDown(item,index) {
                if(index!=this.hotTopicList.length-1){
                    this.hotTopicList.splice(index, 1);
                    this.hotTopicList.splice(index+1, 0, item);
                }else {
                    alert('已经是最后一个了！！')
                }
            },
//          删除
            deleteHotTopic(item) {
                let topicId = item._id;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteHotTopic(topicId).then((res) => {
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
