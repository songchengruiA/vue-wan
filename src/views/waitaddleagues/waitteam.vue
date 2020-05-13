<template class="waitTeams">
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
        <!--待添加战队列表-->
        <table class="table table-bordered">
            <thead>
            <tr class="trList headList">
                <td style="vertical-align:middle;">序号</td>
                <td>队伍</td>
                <td>游戏类型</td>
                <td>操作</td>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(item, index) in pageList" class="trList">
                <td>
                    {{(index+1) + tpageSize * (page-1)}}
                </td>
                <td>
                    {{item.teamName}}
                </td>
                <td>
                    {{item.gameType}}
                </td>
                <td class="operation" @click="addTeamsBtn(item)">
                    <button class="btn btn-primary btn-my" type="button">队伍已添加</button>
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
    import { getWaitTeams, addTeams } from '../../api/api';

    export default {
        data() {
            return {
                total: 0,
                page: 1,
                tpageSize: 20,
                optionsA: [
                    {id: 2, name: 'LOL'},
                    {id: 3, name: 'DOTA2'},
                    {id: 1, name: 'CSGO'},
                    {id: 4, name: '王者荣耀'}
                ],
                gameType: 'LOL',
                pageList: []
            }
        },
        mounted() {
            this.waitTeamsList();
        },
        methods: {
//            点击刷新按钮
            refreshBtn() {
                this.waitTeamsList();
            },
//            分页
            handleCurrentChange(val) {
                this.page = val;
                this.waitTeamsList();
            },
//            请求列表
            waitTeamsList() {
                let params = {
                    gameType : this.gameType.id?this.gameType.id:2,
                    offset : this.page*this.tpageSize-(this.tpageSize-1),
                    limit : this.tpageSize
                };
                getWaitTeams(params).then((res) => {
                    if (res.data.status === 1) {
                        this.pageList =  res.data.data.list;
                        this.total = res.data.data.total-1;
                    }  else if(res.data.status ==300011){
                        sessionStorage.clear();
                        this.$router.push('/login');
                    }else {
                        alert(res.data.msg);
                    }
                });
            },
//            改变游戏类型
            gameChange() {
                this.waitTeamsList();
            },
//            点击队伍已添加按钮
            addTeamsBtn(item) {
                let para = {
                    teamId : item._id
                };
                this.$confirm('确认添加吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    addTeams(para).then(res => {
                        if (res.status === 1) {
                            this.waitTeamsList();
                        } else {
                            alert(res.msg)
                        }
                    })
                }).catch(() => {

                });
            }
        }
    }
</script>
