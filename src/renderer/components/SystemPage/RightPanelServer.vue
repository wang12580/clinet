<template>
  <div>
    <div v-if="this.$store.state.System.toolbar === 'getServers'">
      <table>
        <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="connect(data, index)" v-bind:class="{'table-danger':flag == index}">
          <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
        </tr>
      </table>
    </div>
    <!-- 连接服务器状态 -->
    <div v-if="this.$store.state.System.connectInfo == true" >
      <!-- 登录状态 -->
        <!-- 未登录 -->
        <div v-if="this.$store.state.System.user.login == false">
          <div v-if="this.$store.state.System.toolbar === 'getUsers'">
            <form>
                <div class="form-group">
                  <label for="exampleInputEmail1andname">输入用户名或emails</label>
                  <input type="text" class="form-control" placeholder="exampleInputEmail1andname" v-on:blur="logininput()" v-model="emailorname">
                </div>
                <div class="form-group" v-if="this.loginpass == true">
                  <label for="exampleInputPassword1">密码</label>
                  <input type="password" class="form-control" placeholder="Password" v-model="loginpassword">
                </div>
              </form>
                <button type="submit" class="btn btn-primary" v-on:click="login()">提交</button>
          </div>
          <div v-if="this.$store.state.System.toolbar === 'createUsers'">
            <div v-if="this.$store.state.System.registerInfo[2] == true">
              {{this.$store.state.System.registerInfo[1]}}
              <button class="btn btn-primary" v-on:click="new_register">重新创建用户</button>
            </div>
            <div v-else>
              <h3  v-if="this.$store.state.System.registerInfo[2] == false">{{this.$store.state.System.registerInfo[1]}}, &nbsp; &nbsp; &nbsp;请重新注册</h3>
              <form>
                <div class="form-group">
                  <label for="InputEmail">用户注册的Email地址</label>
                  <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                </div>
                <div class="form-group">
                  <label for="InputPassword">用户密码</label>
                  <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password">
                </div>
                <div class="form-group">
                  <label for="InputOrg">机构</label>
                  <input type="text" class="form-control" id="InputOrg" placeholder="InputOrg" v-model="org">
                </div>
                <div class="form-group">
                  <label for="InputAge">年龄</label>
                  <input type="number" class="form-control" id="InputAge" placeholder="Age" v-model="age">
                </div>
                <div class="form-group">
                  <label for="InputTel">电话</label>
                  <input type="text" class="form-control" id="InputTel" placeholder="Tel" v-model="tel">
                </div>
                <div class="form-group">
                  <label for="InputPersonname">姓名</label>
                  <input type="password" class="form-control" id="InputPersonname" placeholder="Personname" v-model="personname">
                </div>
              </form>
              <button type="submit" class="btn btn-primary" v-on:click="register">注册用户</button>
            </div>
          </div>
        </div>
        <!-- 未登录 -->
        <!-- 已登录 -->
        <div v-else>
          <div v-if="this.$store.state.System.toolbar === 'getUsers'">
            <table class="table table-striped">
              <thead class="thead-light">
                <tr>
                  <th scope="col">名称</th>
                  <th scope="col">信息</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(values, key) in this.$store.state.System.user" v-if="['username', 'type', 'org', 'id', 'blockchain', 'password'].includes(key)">
                  <td v-if="key === 'username'">用户名</td>
                  <td v-else-if="key === 'type'">权限</td>
                  <td v-else-if="key === 'org'">机构</td>
                  <td v-else-if="key === 'id'">ID</td>
                  <td v-else-if="key === 'blockchain'">区块信息</td>
                  <td v-else-if="key === 'password'">密码</td>
                  <td v-if="key === 'username'"  v-on:click="createUserinfo('name')">
                    <div v-if="userinfo.name">
                      <input type="text" v-model="userinfoName" />
                    </div>
                    <div v-else>{{values}}</div>
                  </td>
                  <td v-else-if="key === 'password'" v-on:click="createUserinfo('pass')">
                    <div v-if="userinfo.pass">
                      <input type="text" v-model="userinfoPass" />
                    </div>
                    <div v-else>{{values}}</div>
                  </td>
                  <td v-else>{{values}}</td>
                </tr>
              </tbody>
            </table>
            <button type="submit" class="btn btn-primary" v-on:click="orgRegister('userinfo')">确认修改</button>
          </div>
          <div v-if="this.$store.state.System.toolbar === 'getOrgs'" class ="orgs">
            <!-- Example single danger button -->
            <div class="btn-group">
              <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{OrgPage}}
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#" v-on:click="orgsInfo('orgs')">机构信息</a>
                <a class="dropdown-item" href="#" v-on:click="orgsInfo('departments')">科室信息</a>
              </div>
            </div>
            <div v-if="this.OrgPage === '机构信息'">
              <div class="row">
                <div class="col-10" />
                <button class="btn btn-primary system_new_org" v-on:click="createOrgs('orgs')">新建机构</button>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>机构编码</th>
                    <th>机构名称</th>
                    <th>机构等级</th>
                    <th>机构类别</th>
                    <th>省份</th>
                    <th>市</th>
                    <th>县</th>
                    <th>联系人</th>
                    <th>联系电话</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for = "(value, index) in this.$store.state.System.orgs.data" v-on:click="createOrgs('updataOres', index)">
                    <td>{{value.id}}</td>
                    <td>{{value.code}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.level}}</td>
                    <td>{{value.type}}</td>
                    <td>{{value.province}}</td>
                    <td>{{value.city}}</td>
                    <td>{{value.county}}</td>
                    <td>{{value.person_name}}</td>
                    <td>{{value.tel}}</td>
                    <td>{{value.email}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="this.OrgPage === '科室信息'">
              <div class="row">
                <div class="col-10"/>
                <button class="btn btn-primary system_new_org" v-on:click="createOrgs('departments')">新建科室</button>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th>所在机构</th>
                    <th>所属科室类</th>
                    <th>所属科室</th>
                    <th>科室主任</th>
                    <th>科室副主任</th>
                    <th>内部科室编码</th>
                    <th>内部科室名称</th>
                    <th>是否停用</th>
                    <th>是否重点</th>
                    <th>是否特色</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for= "(value, index) in this.$store.state.System.departments.data" v-on:click="createOrgs('updataDepartments', index)">
                    <td>{{value.org}}</td>
                    <td>{{value.class}}</td>
                    <td>{{value.department}}</td>
                    <td>{{value.cherf_department}}</td>
                    <td>{{value.professor}}</td>
                    <td>{{value.wt_code}}</td>
                    <td>{{value.wt_name}}</td>
                    <td>{{value.is_ban}}</td>
                    <td>{{value.is_imp}}</td>
                    <td>{{value.is_spe}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="this.$store.state.System.toolbar === 'createOrgs'">
            <form>
              <div class="form-group">
                <label for="InputOrgCode">机构编码</label>
                <input type="text" class="form-control" placeholder="OrgCode" v-model="Orgcode">
              </div>
              <div class="form-group">
                <label for="InputOrgName">机构名称</label>
                <input type="text" class="form-control" placeholder="OrgName" v-model="Orgname">
              </div>
              <div class="form-group">
                <label for="InputOrgLevel">机构等级</label>
                <input type="text" class="form-control" placeholder="OrgLevel" v-model="Orglevel">
              </div>
              <div class="form-group">
                <label for="InputOrgType">机构类别</label>
                <input type="text" class="form-control" placeholder="OrgType" v-model="Orgtype">
              </div>
              <div class="form-group">
                <label for="InputOrgProvince">省份</label>
                <input type="text" class="form-control" placeholder="Province" v-model="Orgprovince">
              </div>
              <div class="form-group">
                <label for="InputOrgCity">市</label>
                <input type="text" class="form-control" placeholder="City" v-model="Orgcity">
              </div>
              <div class="form-group">
                <label for="InputOrgCounty">机构县</label>
                <input type="text" class="form-control" placeholder="County" v-model="Orgcounty">
              </div>
              <div class="form-group">
                <label for="InputOrgPerson_name">联系人</label>
                <input type="text" class="form-control" placeholder="Person_name" v-model="Orgperson_name">
              </div>
              <div class="form-group">
                <label for="InputOrgTel">联系电话</label>
                <input type="text" class="form-control" placeholder="Tel" v-model="Orgtel">
              </div>
              <div class="form-group">
                <label for="InputOrgEmail">Email</label>
                <input type="email" class="form-control" placeholder="Email" v-model="Orgemail">
              </div>
            </form>
            <div class="row">
              <div class="col-9" />
              <button type="submit" class="btn btn-primary" v-on:click="orgRegister('orgs')">添加机构</button>
              <button type="submit" class="btn btn-primary" v-on:click="createOrgs('returnorgs')">返回</button>
            </div>
          </div>
          <div v-if="this.$store.state.System.toolbar === 'createDepartments'">
            <form>
              <div class="form-group">
                <label>所在机构</label>
                <input type="text" class="form-control" placeholder="OrgName" v-model="the_Orgname" />
              </div>
              <div class="form-group">
                <label>科室主任</label>
                <input type="text" class="form-control" placeholder="Director of the Department" v-model="cherf_department" />
              </div>
              <div class="form-group">
                <label>所属科室类</label>
                <input type="text" class="form-control" placeholder="The Department Class" v-model="The_class" />
              </div>
              <div class="form-group">
                <label>所属科室</label>
                <input type="text" class="form-control" placeholder="The Department" v-model="The_department" />
              </div>
              <div class="form-group">
                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                  <input type="checkbox" class="custom-control-input" id="Is_Improt" v-model="is_imp">
                  <label class="custom-control-label" for="Is_Improt">是否重点</label>
                </div>
              </div>
              <div class="form-group">
                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                  <input type="checkbox" class="custom-control-input" id="Is_Characteristic" v-model="is_spe">
                  <label class="custom-control-label" for="Is_Characteristic">是否特色</label>
                </div>
              </div>
              <div class="form-group">
                <label>副主任</label>
                <input type="text" class="form-control" placeholder="Professor" v-model="progress" />
              </div>
              <div class="form-group">
                <label>内部科室编码</label>
                <input type="text" class="form-control" placeholder="Wt_Code" v-model="wt_code" />
              </div>
              <div class="form-group">
                <label>内部科室名称</label>
                <input type="text" class="form-control" placeholder="Wt_name" v-model="wt_name" />
              </div>
            </form>
            <div class="row">
              <div class="col-9" />
              <button type="submit" class="btn btn-primary" v-on:click="orgRegister('departments')">添加科室</button>
              <!-- <button type="submit" class="btn btn-primary" v-on:click="createOrgs('returndepartments')">返回</button> -->
            </div>
          </div>
          <div v-if="this.$store.state.System.toolbar === 'getPersons'">
            <form>
              <div class="form-group">
                <label for="InputEmail">机构人员设置</label>
                <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
              </div>
              <div class="form-group">
                <label for="InputPassword">用户密码</label>
                <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password">
              </div>
            </form>
            <button type="submit" class="btn btn-primary" v-on:click="register">添加机构</button>
          </div>
        </div>
        <!-- 已登录 -->
      <!-- 登录状态 -->
    </div>
    <div v-else>
      请连接服务器
    </div>
    <!-- 连接服务器状态 -->
  </div>
</template>

<script>
  // import { sGetOrg, sCreateOrg, sUpdateOrg, sGetDepart, sCreateDepart, sUpdateDepart, sGetSystemDepart, sUploadDoc, sCheckDoc, sInsertDoc, sStatDoc, sCompDrg, sUpdateUser, sGetStat, sGetStatInfo, sGetStatInfoChart, sdownLoadStatInfo, sSaveDefined, sGetRule, sSearchRule, sGetUser, sLogin, sRegister } from '../../utils/server'
  // import { sGetUser, sLogin, sRegister, sConnect } from '../../utils/Server'
  import { sLogin, sRegister, sConnect, sCreateOrg, sGetDepart, sCreateDepart, sUpdateUser } from '../../utils/Server'
  export default {
    data() {
      return {
        flag: null,
        email: '',
        password: '',
        org: '',
        age: '',
        tel: '',
        personname: '',
        emailorname: '',
        loginpassword: '',
        loginpass: true,
        Orgcode: '',
        Orgname: '',
        Orglevel: '',
        Orgtype: '',
        Orgprovince: '',
        Orgcity: '',
        Orgcounty: '',
        Orgperson_name: '',
        Orgtel: '',
        Orgemail: '',
        OrgPage: '机构信息',
        the_Orgname: '',
        cherf_department: '',
        The_class: '',
        The_department: '',
        is_imp: false,
        is_spe: false,
        progress: '',
        wt_code: '',
        wt_name: '',
        is_ban: false,
        userinfo: { name: false, pass: false },
        userinfoName: '',
        userinfoPass: ''
      }
    },
    computed: {
      file: {
        get() {
          const f = []
          let fileLen = this.$store.state.System.file.length;
          switch (this.$store.state.System.toolbar) {
            case 'getServers':
              if (fileLen > 99) { fileLen = 99 }
              for (let i = 0; i < fileLen; i += 1) {
                f.push(this.$store.state.System.file[i].split(','))
              }
              break;
            case 'getUsers':
              break;
            case 'getOrgs':
              break;
            case 'getPersons':
              break;
            case 'getServerFunctions':
              break;
            default:
              break;
          }
          return f
        }
      },
    },
    methods: {
      logininput: function () {
        const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        if (this.emailorname.length === 16) {
          if (reg.test(this.emailorname)) {
            this.loginpass = true
          } else {
            this.loginpass = false
          }
        } else {
          this.loginpass = true
        }
      },
      login: function () {
        const user = { username: this.emailorname, password: this.loginpassword }
        sLogin(this, [this.$store.state.System.server, this.$store.state.System.port, user])
        // if (this.loginpass === false) {
        //   // alert('区块链登录')
        //   // sLogin(this, [this.emailorname, this.loginpassword])
        // } else {
        //   if (this.loginpassword === '') {
        //     // alert('请输入密码')
        //   } else {
        //     const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        //     if (!reg.test(this.emailorname)) {
        //       // alert('用户名必须是邮箱')
        //     } else {
        //       sLogin(this, [this.emailorname, this.loginpassword])
        //     }
        //   }
        //   this.$store.state.System.registerInfo[2] = true
        // }
      },
      connect: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_SET_SERVER', data)
        if (this.$store.state.System.toolbar === 'getServers') {
          sConnect(this, [data[1], data[2], index])
        }
      },
      register: function () {
        const user = { username: this.email, password: this.password, org: this.org, age: this.age, tel: this.tel, email: this.email, name: this.personname, type: 2 }
        sRegister(this, [this.$store.state.System.server, this.$store.state.System.port, user])
        // sGetOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.email, this.password])
      },
      new_register: function () {
        this.$store.commit('SYSTEM_REGISTER_USER', [{}, '重新创建用户'])
      },
      createUserinfo: function (value) {
        if (value === 'name') {
          this.userinfo.name = true
        } else if (value === 'pass') {
          this.userinfo.pass = true
        }
      },
      createOrgs: function (value, index) {
        if (value === 'orgs') {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'createOrgs');
        } else if (value === 'departments') {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'createDepartments');
        } else if (value === 'users') {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'createUsers');
        } else if (value === 'updataOres') {
          this.Orgcode = this.$store.state.System.orgs.data[index].code
          this.Orgname = this.$store.state.System.orgs.data[index].name
          this.Orglevel = this.$store.state.System.orgs.data[index].level
          this.Orgtype = this.$store.state.System.orgs.data[index].type
          this.Orgprovince = this.$store.state.System.orgs.data[index].province
          this.Orgcity = this.$store.state.System.orgs.data[index].city
          this.Orgcounty = this.$store.state.System.orgs.data[index].county
          this.Orgperson_name = this.$store.state.System.orgs.data[index].person_name
          this.Orgtel = this.$store.state.System.orgs.data[index].tel
          this.Orgemail = this.$store.state.System.orgs.data[index].email
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'createOrgs');
        } else if (value === 'updataDepartments') {
          this.the_Orgname = this.$store.state.System.departments.data[index].org
          this.cherf_department = this.$store.state.System.departments.data[index].cherf_department
          this.The_class = this.$store.state.System.departments.data[index].class
          this.The_department = this.$store.state.System.departments.data[index].department
          this.is_imp = this.$store.state.System.departments.data[index].is_imp
          this.is_spe = this.$store.state.System.departments.data[index].is_spe
          this.progress = this.$store.state.System.departments.data[index].progress
          this.wt_code = this.$store.state.System.departments.data[index].wt_code
          this.wt_name = this.$store.state.System.departments.data[index].wt_name
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'createDepartments');
        } else if (value === 'returndepartments') {
          this.OrgPage = '科室信息'
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'getDepartments');
        } else if (value === 'returnorgs') {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
        }
      },
      orgRegister: function (value) {
        if (value === 'orgs') {
          const org = { code: this.Orgcode, name: this.Orgname, level: this.Orglevel, type: this.Orgtype, province: this.Orgprovince, city: this.Orgcity, county: this.Orgcounty, person_name: this.Orgperson_name, tel: this.Orgtel, email: this.Orgemail }
          console.log(org)
          sCreateOrg(this, [this.$store.state.System.server, this.$store.state.System.port, org])
        } else if (value === 'departments') {
          const department = { org: this.the_Orgname, cherf_department: this.cherf_department, class: this.The_class, department: this.The_department, is_imp: this.is_imp, is_spe: this.is_spe, professor: this.progress, wt_code: this.wt_code, wt_name: this.wt_name, is_ban: this.is_ban }
          sCreateDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, department])
        } else if (value === 'userinfo') {
          // const userinfo = { username: this.userinfoName, password: this.userinfoPass }
          const userinfo = {}
          const arr = [this.userinfoName, this.userinfoPass]
          const arr1 = ['username', 'password']
          arr.forEach((n, index) => {
            if (n !== '') {
              userinfo[arr1[index]] = n
            }
          })
          sUpdateUser(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user.id, userinfo]
          )
          // console.log(userinfo)
          this.userinfo.name = false
          this.userinfo.pass = false
        }
      },
      orgsInfo: function (value) {
        if (value === 'orgs') {
          this.OrgPage = '机构信息'
        } else if (value === 'departments') {
          this.OrgPage = '科室信息'
          sGetDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user])
        }
      }
    },
  };
</script>

<style scoped>
.orgs{
  margin-top: 0.8em;
}
.system_new_org {
  margin-top: 0.8em;
  margin-bottom: 0.8em;
}
</style>
