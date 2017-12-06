<template class="leagues">
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
        <!-- 赛事列表 -->
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item leaguesList" v-for="item in pageList">
                <div class="row">
                    <div class="col-xs-2">
                        <div class="rectangle-container">
                            <img class="imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图" :src="item.leagueImageUrl">
                        </div>
                    </div>

                    <div class="col-xs-7" style="padding-top:8px">
                        <label>{{item.leagueName}}</label>
                        <p>{{item.createdAt | formatDate}}</p>
                        <small>{{item.leagueImageUrl}}</small>
                    </div>
                    <div class="text-right col-xs-3" style="padding-top:30px">
                        <div>
                            <button class="btn btn-info" type="button">详情</button>
                            <button class="btn btn-danger" type="button">删除</button>
                        </div>
                        <div style="padding-top:5px">
                            <button class="btn btn-primary" type="button">修改</button>
                            <button class="btn btn-default" type="button">
                                <span class="glyphicon glyphicon-copy" @click="copyId(item)">复制赛事 ID</span>
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
            <el-form :model="divisionData" label-width="100px" ref="addForm" >
                <el-form-item label="游戏类型:" prop="name">
                    <el-input v-model="gameTypeName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属赛事:" prop="name">
                    <el-input v-model="divisionData.leagueName" auto-complete="off" placeholder="请输入赛事名称"></el-input>
                </el-form-item>
                <el-form-item label="赛事等级:" prop="name">
                    <el-select v-model="level"  value-key="name"  filterable  placeholder="请选择赛事等级">
                        <el-option
                                v-for="item in levels"
                                :key="item.id"
                                :label="item.name"
                                :value="item" auto-complete="off">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="风险金:" prop="name">
                    <el-input v-model="levels[level.id - 1].riskFund" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="单注赔付上线:" prop="name">
                    <el-input v-model="levels[level.id - 1].payCeiling" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="赛事图片:" prop="name">
                    <el-input v-model="imageUrl" auto-complete="off"></el-input>
                    <el-upload
                            class="avatar-uploader"
                            action="http://47.93.223.69:8066/admin/media"
                            :headers="myHeaders"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" style="margin-top: 6px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="display: none"></i>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="赛事来源:" prop="name">
                    <el-select v-model="divisionData.leagueSource"  value-key="name"  filterable  placeholder="请选择赛事来源">
                        <el-option
                                v-for="item in optionsB"
                                :key="item.id"
                                :label="item.name"
                                :value="item" auto-complete="off">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属赛区:" prop="name">
                    <el-select v-model="divisionData.division"  value-key="name"  filterable  placeholder="请选择所属赛区">
                        <el-option
                                v-for="item in divisionJson"
                                :key="item.id"
                                :label="item.name"
                                :value="item" auto-complete="off">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="别名组（多个用英文逗号隔开）" prop="name" id="textarea-box">
                    <el-input
                            :autosize="{ minRows: 2}"
                            type="textarea"
                            placeholder="请输入别名组"
                            v-model="divisionData.alias">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import { getLeagues, searchLeagues, addLeagues } from '../../api/api';
  import { formatDate } from '../../api/date';
  var tableData = require('../../api/table.json');
  export default {
      data() {
          return {
              myHeaders: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJwd2NuIiwiaWF0IjoxNTEyNDQxNTE2fQ.9oaz53lrnYM_ZwPHarSx2d-hPIqIMfQcOI--ybcnvTo'},
              total: 0,
              page: 1,
              tpageSize: 10,
              postsName: '',
              gameType: 'LOL',
              imageUrl: '',
              pageList: [],
              leagueList:[],
              searchTitle: '',
              gameTypeName:'',
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
              divisionJson: tableData[0].codeJson,
              divisionData:{
                  "division":{},
                  "leagueSource":{}
              },
              level:{
                  "id":'1',
                  "name": '1: 1'
              },
              levels : [
                  {id: 1, name: '1: 1',payCeiling:1000,riskFund:10000},
                  {id: 2, name: '2: 2',payCeiling:2000,riskFund:20000},
                  {id: 3, name: '3: 3',payCeiling:3000,riskFund:30000}
              ]
          }
      },
      mounted() {
          this.leaguesList();
          console.log(this.divisionJson)
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
              this.leaguesList();
          },
//         点击搜索按钮
          searchPosts() {
              if (this.searchTitle == '') {
                  this.leaguesList();
              };
              let params = {
                  gameType : this.gameType.id?this.gameType.id:2,
                  leagueName: this.postsName
              };
              searchLeagues(params).then((res) => {
                  if (res.data.status === 1) {
                      this.pageList =  res.data.data;
                      this.total = 1;
                  } else {
                      alert(res.data.msg);
                  }
              })
          },
//          分页
          handleCurrentChange(val) {
              this.page = val;
              this.leaguesList();
          },
//          请求赛事
          leaguesList() {
              let params = {
                  gameType : this.gameType.id?this.gameType.id:2,
                  offset : this.page*this.tpageSize-(this.tpageSize-1),
                  limit : this.tpageSize
              };
              getLeagues(params).then((res) => {
                  if (res.data.status === 1) {
                      this.pageList =  res.data.data.list;
                      this.total = res.data.data.total-1;
                  } else {
                      alert(res.data.msg);
                  }

              })
          },
//          图片上传
          handleAvatarSuccess(res, file) {
              this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isLt2M;
          },
//          添加
          addLeaguesBtn() {
              this.imageUrl = '';
              this.divisionData = {
                  "division":{},
                  "leagueSource":{}
              },
              this.dialogVisible = true;
              this.gameTypeName = this.gameType.name?this.gameType.name:'LOL';
          },
//          点击提交按钮
          addSubmit() {
              this.divisionData.leagueImageUrl = this.imageUrl;
              var params = this.divisionData;
              params.level = this.level.id;
              params.riskFund = this.levels[this.level.id - 1].riskFund;
              params.payCeiling = this.levels[this.level.id - 1].payCeiling;
              params.gameType = this.gameType.id?this.gameType.id:2;
              params.leagueSource = this.divisionData.leagueSource.id;
              params.division = this.divisionData.division.name;
              addLeagues(params).then((res) => {
                  this.dialogVisible = false;
                  this.leaguesList();
              })
          },
//          修改
//          详情
//          删除
//          复制赛事ID
          copyId(item) {
              console.log(item._id)
              item.select();
              document.execCommand("Copy");
          }
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
    .leaguesList{
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

    /*.glyphicon{*/
        /*font-weight: bolder;*/
    /*}*/
   /*.btn {*/
       /*border: 0;*/
       /*font-weight: bolder;*/
   /*}*/
</style>