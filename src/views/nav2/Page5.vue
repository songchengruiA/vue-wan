<template class="teams">
    <div class="col-sm-12">
        <form class="form-inline form-search addguess-head">
            <div class="form-group">
                <label class="size-set pull-left" style="margin-left: 0px">选择游戏类型:</label>
                <el-select v-model="gameType"  value-key="name" class="selected-guess" filterable placeholder="">
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
        <!-- 战队列表 -->
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item" v-for="item in pageList">
                <div class="row">
                    <div class="col-xs-2">
                        <div class="rectangle-container">
                            <img class="imageslib-thumb-image absolute-position img-thumbnail" alt="无缩略图" :src="item.teamLogoUrl">
                        </div>
                    </div>

                    <div class="col-xs-7" style="padding-top:8px">
                        <label>{{item.teamName}}</label>
                        <p>{{item.createdAt | formatDate}}</p>
                        <small>{{item.teamLogoUrl}}</small>
                    </div>
                    <div class="text-right col-xs-3" style="padding-top:30px">
                        <div>
                            <button class="btn btn-info" type="button">详情</button>
                            <button class="btn btn-danger" type="button">删除</button>
                        </div>
                        <div style="padding-top:5px">
                            <button class="btn btn-primary" type="button">修改</button>
                            <button class="btn btn-default" type="button">
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
    </div>
</template>
<script>
    import { getTeams, searchTeams } from '../../api/api';
    import { formatDate } from '../../api/date';
    export default {
        data() {
            return {
                total: 0,
                page: 1,
                tpageSize: 10,
                postsName: '',
                gameType: 'LOL',
                pageList: [],
                searchTitle: '',
                optionsA: [
                    {id: 2, name: 'LOL'},
                    {id: 3, name: 'DOTA2'},
                    {id: 1, name: 'CSGO'},
                    {id: 4, name: '王者荣耀'}
                ]
            }
        },
        mounted() {
            this.teamsList();
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
                this.teamsList();
            },
//         点击搜索按钮
            searchPosts() {
                if (this.searchTitle == '') {
                    this.leaguesList();
                };
                let params = {
                    gameType : this.gameType.id?this.gameType.id:2,
                    teamName: this.postsName
                };
                searchTeams(params).then((res) => {
                    console.log(res)
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
                    offset : this.page*this.tpageSize-(this.tpageSize-1),
                    limit : this.tpageSize
                };
                getTeams(params).then((res) => {
                    console.log(res)
                    if (res.data.status === 1) {
                        this.pageList =  res.data.data.list;
                        this.total = res.data.data.total-1;
                    } else {
                        alert(res.data.msg);
                    }

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