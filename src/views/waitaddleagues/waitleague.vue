<template class="waitLeagues">
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
          <button type="button" class="btn btn-xs btn-danger" style="margin-left: 10px;color: #fff;" @click="refreshBtn">刷新</button>
        </form>
        <!--待添加赛事列表-->
        <table class="table table-bordered">
            <thead>
                <tr class="trList headList">
                    <td>序号</td>
                    <td>赛事</td>
                    <td>赛事等级</td>
                    <td>风险金</td>
                    <td>单注赔付上限</td>
                    <td>操作</td>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in pageList" class="trList">
                    <td>
                        {{index+1}}
                    </td>
                    <td>
                        {{item.leagueName}}
                    </td>
                    <td>
                        <select v-model="item.level" @change="changeLevel(item)">
                            <option v-for="option in itemLevel" :value="option.id">
                                {{option.name}}
                            </option>
                        </select>
                    </td>
                    <td>
                        {{item.riskFund}}
                    </td>
                    <td>
                        {{item.payCeiling}}
                    </td>
                    <td class="operation" @click = "saveLeaguesBtn(item)">
                        保存
                    </td>
                </tr>
            </tbody>
        </table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="tpageSize" :total="total">
            </el-pagination>
        </el-col>
    </div>
</template>

<script>
  import { getWaitLeagues, chanLevel, saveLeagues } from '../../api/api';

  export default {
      data() {
          return {
              total: 0,
              page: 1,
              tpageSize: 20,
              gameType: 'LOL',
              pageList: [],
              optionsA: [
                  {id: 2, name: 'LOL'},
                  {id: 3, name: 'DOTA2'},
                  {id: 1, name: 'CSGO'},
                  {id: 4, name: '王者荣耀'}
              ],
              itemLevel: [
                  {id: 1, name: 1},
                  {id: 2, name: 2},
                  {id: 3, name: 3}
              ]
          }
      },
    mounted() {
        this.waitLeaguesList();
    },
    methods: {
//        点击刷新按钮
        refreshBtn() {
            this.waitLeaguesList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.waitLeaguesList();
        },
//        请求列表
        waitLeaguesList() {
            let params = {
                gameType : this.gameType.id?this.gameType.id:2,
                offset : this.page*this.tpageSize-(this.tpageSize-1),
                limit : this.tpageSize
            };
            getWaitLeagues(params).then((res) => {
                if (res.data.status === 1) {
                    this.pageList =  res.data.data.list;
                    this.total = res.data.data.total-1;
                } else if(res.data.status ==300011){
                    sessionStorage.clear();
                    this.$router.push('/login');
                } else  {
                    alert(res.data.msg);
                }
            });
        },
//        改变游戏类型
        gameChange() {
            this.waitLeaguesList();
        },
//        改变赛事等级
        changeLevel(item) {
            let leagueId = item._id
            let para = {
                level : item.level
            };
            chanLevel(leagueId,para).then(res => {
                if (res.data.status === 1) {
                    this.waitLeaguesList();
                    alert('修改成功');
                } else {
                    alert(res.data.msg);
                }
            });
        },
//        点击保存按钮
        saveLeaguesBtn(item) {
            let para = {
                leagueId : item._id
            };
            this.$confirm('确认保存吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                saveLeagues(para).then(res => {
                    if (res.data.status === 1) {
                        this.waitLeaguesList();
                    } else {
                        alert(res.data.msg);
                    }
                })
            }).catch(() => {

            });
        }
    }
  }
</script>
<style lang="scss">
    .table-bordered {
        text-align: center;
        margin-top: 20px;
        .trList{
            td{
                vertical-align: middle;
                height:50px;
                select{
                    background: #d9d9d9;
                    width: 40px;
                    height: 30px;
                    border: none;
                }
            }
            .operation{
                color: #018bee;
                cursor:pointer;
            }
            &.headList{
                height: 60px;
                background: #e9e8e9;
            }
        }
    }
    .toolbar{
        text-align: center;
    }
</style>