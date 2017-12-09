import * as api from './api';

export default api;


// <el-dialog v-model="dialogVisibleModify" :close-on-click-modal="false" class="dialog-small">
//     <el-form :model="divisionData" label-width="100px" ref="addForm" >
//     <el-form-item label="游戏类型:" prop="name">
//     <el-input v-model="gameTypeName" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="所属赛事:" prop="name">
//     <el-input v-model="divisionData.leagueName" auto-complete="off" placeholder="请输入赛事名称"></el-input>
//     </el-form-item>
//     <el-form-item label="赛事等级:" prop="name">
//     <el-select v-model="level"  value-key="name"  filterable  placeholder="请选择赛事等级">
//     <el-option
// v-for="item in levels"
//     :key="item.id"
// :label="item.name"
// :value="item" auto-complete="off">
//     </el-option>
//     </el-select>
//     </el-form-item>
//     <el-form-item label="风险金:" prop="name">
//     <el-input v-model="levels[level.id - 1].riskFund" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="单注赔付上线:" prop="name">
//     <el-input v-model="levels[level.id - 1].payCeiling" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="赛事图片:" prop="name">
//     <el-input v-model="imageUrl" auto-complete="off"></el-input>
//     <el-upload
// class="avatar-uploader"
// action="http://47.93.223.69:8066/admin/media"
// :headers="myHeaders"
// :show-file-list="false"
// :on-success="handleAvatarSuccess"
// :before-upload="beforeAvatarUpload">
//     <img v-if="imageUrl" :src="imageUrl" class="avatar" style="margin-top: 6px;">
//     <i v-else class="el-icon-plus avatar-uploader-icon" style="display: none"></i>
//     <el-button size="small" type="primary">点击上传</el-button>
//     </el-upload>
//     </el-form-item>
//     <el-form-item label="赛事来源:" prop="name">
//     <el-select v-model="divisionData.leagueSource"  value-key="name"  filterable  placeholder="请选择赛事来源">
//     <el-option
// v-for="item in optionsB"
//     :key="item.id"
// :label="item.name"
// :value="item" auto-complete="off">
//     </el-option>
//     </el-select>
//     </el-form-item>
//     <el-form-item label="所属赛区:" prop="name">
//     <el-select v-model="divisionData.division"  value-key="name"  filterable  placeholder="请选择所属赛区">
//     <el-option
// v-for="item in divisionJson"
//     :key="item.id"
// :label="item.name"
// :value="item" auto-complete="off">
//     </el-option>
//     </el-select>
//     </el-form-item>
//     <el-form-item label="别名组（多个用英文逗号隔开）" prop="name" class="textarea-box">
//     <el-input
// :autosize="{ minRows: 2}"
// type="textarea"
// placeholder="请输入别名组"
// v-model="divisionData.alias">
//     </el-input>
//     </el-form-item>
//     </el-form>
//     <div slot="footer" class="dialog-footer">
//     <el-button @click="dialogVisible = false">取消</el-button>
//     <el-button type="primary" @click="addSubmit">提交</el-button>
//     </div>
//     </el-dialog>


// <el-dialog v-model="dialogVisibleDetail" :close-on-click-modal="false" class="dialog-small">
//     <el-form :model="detailList" label-width="100px" ref="addForm" >
//     <el-form-item label="游戏类型:" prop="name">
//     <el-input v-model="gameTypeName" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="所属赛事:" prop="name">
//     <el-input v-model="detailList.leagueName" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="赛事等级:" prop="name">
//     <el-input v-model="detailList.level" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="风险金:" prop="name">
//     <el-input v-model="detailList.riskFund" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="单注赔付上线:" prop="name">
//     <el-input v-model="detailList.payCeiling" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="赛事图片:" prop="name">
//     <el-input v-model="detailList.leagueImageUrl" auto-complete="off" disabled></el-input>
// <img v-if="detailList.leagueImageUrl" :src="detailList.leagueImageUrl" class="avatar" style="margin-top: 6px;">
//     </el-form-item>
//     <el-form-item label="赛事来源:" prop="name">
//     <el-input v-model="detailList.leagueSource" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="所属赛区:" prop="name">
//     <el-input v-model="detailList.division" auto-complete="off" disabled></el-input>
// </el-form-item>
// <el-form-item label="别名组（多个用英文逗号隔开）" class="textarea-box">
//     <el-input
// :autosize="{ minRows: 2}"
// type="textarea"
// v-model="detailList.alias"
// disabled>
// </el-input>
// </el-form-item>
// </el-form>
// <div slot="footer" class="dialog-footer">
//     <el-button @click="dialogVisibleDetail = false">关闭</el-button>
//     </div>
//     </el-dialog>


//          详情
// detailLeagues(item) {
//     this.dialogVisibleDetail = true;
//     this.gameTypeName = this.gameType.name?this.gameType.name:'LOL';
//     var params = {
//         leaguesId: item._id
//     };
//     getLeaguesDetail(params).then((res) => {
//         this.detailList = res.data.data.leagues;
//         this.detailList.leagueSource = this.optionsB[this.detailList.leagueSource - 1].name;
//         this.detailList.level = this.levels[this.detailList.level - 1].name;
//         console.log(this.detailList)
//     })
// },

//          删除
// deleteLeaguesBtn(item) {
//     var params = {
//         leaguesId : item._id
//     };
//     this.$confirm('确认删除吗?', '提示', {
//         type: 'warning'
//     }).then(() => {
//         deleteLeagues(params).then((res) => {
//             if (res.status === 1) {
//                 this.leaguesList();
//             } else {
//                 alert(res.data.msg);
//             }
//         })
//     }).catch(() => {
//
//     });
// },