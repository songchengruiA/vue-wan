<template class="list">
    <div class="col-sm-12">
        <ul class="list-group" style="overflow:auto">
            <li class="list-group-item" v-for="(item, index) in pageList" style="min-width: 760px;">
                <div class="row" style="padding: 0 10px;min-width: 710px;">
                    <div class="col-xs-10" style="min-width: 610px;">
                        <div class="col-xs-1" style="min-width: 90px;">
                            <div class="rectangle-container">
                                <span>{{(index+1) + tpageSize*(page-1)}}</span>
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
                            <el-popover  trigger="hover" placement="top">
                                <p>{{item.content}}</p>
                                <div slot="reference" class="name-wrapper" style="cursor: pointer">
                                    <span class="crud--overflow ellipsis2">简介：{{item.content}}</span>
                                </div>
                            </el-popover>
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
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {

            }
        },
        mounted() {

        },
        filters: {},
        computed: {},
        methods: {},
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
