<template>
    <el-form ref="form" :model="form" label-width="110px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="选择游戏类型:">
            <el-col :span="18">
                <el-select v-model="form.gameType" placeholder="选择游戏类型" @change="typeChange" :disabled="edite">
                    <el-option label="LOL" value="2"></el-option>
                    <el-option label="DOTA2" value="3"></el-option>
                    <el-option label="CSGO" value="1"></el-option>
                    <el-option label="王者荣耀" value="4"></el-option>
                </el-select>
                <router-link :to="{path:'/page10'}" class="btn btn-sm btn-danger btn-submit"  style="float: right">关闭</router-link>
                <button class="btn btn-sm btn-danger btn-submit" @click="saveSetGuess('form')" style="float: right;margin-right: 14px" v-if="!edite&&!$route.params.id">提交</button>
                <button class="btn btn-sm btn-danger btn-submit" @click="saveSetGuessA('form')" style="float: right;margin-right: 14px" v-if="!edite&&$route.params.id">提交</button>
            </el-col>

        </el-form-item>
        <el-form-item label="赛事名称:">
            <el-col :span="7">
                <el-select v-model="league"  value-key="leagueName" class="selected-gameTypeName" filterable  placeholder="请选择游戏赛事"  :disabled="edite">
                    <el-option
                            v-for="item in leagueList"
                            :key="item.id"
                            :label="item.leagueName"
                            :value="item"auto-complete="off">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="赛事图片:" v-if="edite">
            <el-col :span="15">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" style="margin-top: 6px;">
            </el-col>
        </el-form-item>
        <el-form-item label="赛事图片:" v-if="!edite">
            <el-col :span="15">
                <el-upload
                        class="avatar-uploader"
                        action="http://47.93.223.69:8066/admin/media"
                        :headers="myHeaders"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :data="fileData"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" style="margin-top: 6px;">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span style="color: rgba(95, 91, 91, 0.87);margin-left: 5px;">仅能上传375*150的图片</span>
                </el-upload>
            </el-col>
        </el-form-item>
        <el-form-item label="风险金:" >
            <el-col :span="7">
                <el-input v-model="form.optionRiskFund" :disabled="edite"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="竞猜名称:" >
            <el-col :span="7">
                <el-input v-model="form.betName"  :disabled="edite" ></el-input>
            </el-col>
            <el-form-item label="竞猜时间:"  class="inputStyle">
                <el-col :span="9">
                    <el-date-picker  :disabled="edite"
                            v-model="form.endTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-col>
            </el-form-item>
        </el-form-item>
        <el-form-item :label=name1+(index+1)+name2  v-for="(item,index) in form.betOptions">
            <el-col :span="7">
                <el-input v-model="item.optionName" :disabled="edite"></el-input>
            </el-col>
            <el-form-item :label=name1+(index+1)+name2  >
                <el-col :span="9">
                    <el-input v-model="item.optionOdds" :disabled="edite"></el-input>
                </el-col>
                <span style="position: relative;left: 8px;cursor: pointer" v-if="index>0 && !edite" @click="delGame(index)">删除</span>
            </el-form-item>

        </el-form-item>
        <div class="addguess-body" v-if="!edite">
            <a class="btn btn-default btn-lg addBtn" @click="addOption">添加下注项</a>
        </div>
    </el-form>
</template>

<script>
    import {getGameName,postSetGuess,editeGameGuess} from '../../api/api';

    export default {
        data() {
            return {
                myHeaders: {token:JSON.parse(sessionStorage.getItem("token")) ? JSON.parse(sessionStorage.getItem("token")) : ''},
                leagueList:[],
                imageUrl:'',
                name1:'',
                name2:'',
                league:'',
                edite:false,
                form: {
                    gameType:'2',
                    endTime:'',
                    betOptions:[{}]
                },
                fileData:{
                    mediaCategory:1002,
                }
            }
        },
        mounted() {
            this.gameList();
            this.editeGame();
            this.detail();
        },
        methods: {

            gameList(){
                this.name1='下注项';
                this.name2='赔率';
                let data = {
                    limit: 10000,
                    gameType: this.form.gameType,
                };
                getGameName(data).then((res) => {
                    this.leagueList = res.data.data.list
                });
            },
            typeChange() {
                this.gameList();
            },
            //图片上传
                handleAvatarSuccess(res, file) {
                var _this = this
                if (file) {
                    var image = new Image();
                    image.onload = function () {
                        if(this.width == 375 && this.height ==150){
                            _this.imageUrl = res.data.avatar;
                        }else {
                            alert("图片仅能上传375*150的图片")
                        }

                    };
                    image.src = URL.createObjectURL(file.raw);
                }

            },
            beforeAvatarUpload(file) {
                this.fileData.media = file;
                this.fileData.gameType = this.form.gameType;
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            //添加竞猜项
            addOption() {
                this.form.betOptions.push({})
            },
            //删除竞猜项
            delGame(index){
                this.form.betOptions.splice(index,1);
            },
            //提交竞猜
            saveSetGuess() {
                var data = this.form
                data.publicityImage = this.imageUrl;
                data.leagueName = this.league.leagueName;
                data.endTime = Date.parse(this.form.endTime)
                postSetGuess(data).then((res)=> {
                    if (res.data.status === 1) {
                        window.history.go(-1);
                    } else {
                        alert(res.msg);
                    }
                })
            },
            //详情
            detail(){
                if(this.$route.params.id){
                    this.edite = !this.edite
                    let id = this.$route.params.id
                    editeGameGuess(id).then((res) => {
                        this.form=res.data.data
                        this.form.gameType = String(res.data.data.gameType)
                        this.league = res.data.data.leagueName
                        this.imageUrl = res.data.data.publicityImage
                    });
                }

            },
            //编辑
            editeGame(){
                this.edite = this.$route.query.edite
            },
            //编辑提交
            saveSetGuessA(){
                let formData = {
                    funbetId : this.$route.params.id,
                    betName : this.form.betName,
                    betSource : this.form.betSource,
                    endTime : this.form.endTime,
                    betOptions : this.form.betOptions,
                    gameType : this.form.gameType,
                    leagueName : this.league,
                    publicityImage : this.imageUrl,
                    optionRiskFund : this.form.optionRiskFund
                }
                postSetGuess(formData).then((res)=> {
                    if (res.data.status === 1) {
                        alert(res.data.data)
                        this.$router.push({ path: '/page10' });
                    } else {
                        alert(res.data.msg);
                    }
                })

            }
        }
    }

</script>
<style lang="scss">
    .inputStyle{
        .el-date-editor.el-input{
            width: 100%!important;
        }
    }

</style>