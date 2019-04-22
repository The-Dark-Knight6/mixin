<template>
    <div class="host">
        <el-input v-model="name" placeholder="昵称" type="text" maxlength="8"></el-input>
        <el-input v-model="iphone" placeholder="手机号码" type="number" maxlength="11"></el-input>
        <div class="yan">
           <!-- 如果使用element-ui中的input插件 出现未知的v-model绑定错误
           但是如若不使用就无法从接口中获取相应的数据从而来正确注册用户... -->
                <el-input placeholder="短信验证码" v-model="msg"></el-input>
                <a href="javascript:;" class="getyan" 
                @click="getmsg"
                v-text="timer.text"
                :class="{point : !timer.clck}">验证</a>    
        </div>
        <el-input v-model="psw" placeholder="密码" type="password"></el-input>
        <div class="ce">
            <a href="javascript:;" @click="register">立即注册</a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name : '',
            iphone : '',
            psw : '',
            msg : '',
            timer : {
                text : '验证',
                clck : true
            }
        }
    },
    methods : {
        // 获取手机的验证码
        getmsg(){
                        console.log('asdfas');
            this.$http(this.SERVER_URL + '/api4/public/sms',{params:{
                mobile : this.iphone,
                type : 1,
                code : '',
                app : 1,
                appname : 'MJBBS'
            }}).then(res => {
                var datas = res.data;
                this.timer.clck = false;
                console.log(datas)
                if(datas == 1){
                    let num = 120;
                    var settimer = setInterval(() => {
                        if(num <= 1){
                            this.timer.text = '验证';
                            this.timer.clck = true;
                            clearInterval(settimer);
                            return ;
                        }
                        num --;
                        this.timer.text = num + 's';
                    },1000)
                }else{
                    this.showtips({
                        show : true,
                        text : datas.info
                    })
                }
            }).catch(err => {

            })
        },
        // 注册用户函数
        register(){
            this.$http(this.SERVER_URL + '/api4/user/reg',{params:{
                mobile : this.iphone,
                nickname : this.name,
                password : this.psw,
                verify : this.msg
            }}).then(res => {
                var datas = res.data;
                console.log(datas);
                let obj = {};
                if(datas.status == 1){
                    obj.userid = datas.data.userid;
                    obj.logintoken = datas.data.logintoken;
                    obj.username = datas.data.nickname;
                    obj.photo = datas.data.photo;
                    this.sedtUserid(obj);
                    this.$router.push({
                        path : '/',
                    })
                }
            }).catch(err => {

            })
        },

    },
    
}
</script>

<style lang="scss" scoped>
.clear{
  &::before,&::after{
      content: '';
      display: block;
      clear: both;
  }
}
.point{
    // 穿透元素
  pointer-events: none!important;
}
.host{
    text-align: center;
    .ce{
        a{
            display: inline-block;
            width: 60%;
            background: #50D7ED;
            padding: .2rem 0;
            margin-top: .4rem;
            -webkit-tap-highlight-color: transparent;
            text-decoration: none;
            color: white;
        }
    }
}
.el-input{
        width: 60%;
        margin-top: .4rem;
        border: 1px solid #ccc;
    }
    div.yan{
        display: inline-block;
        width: 60%;
        text-align: left;
        @extend .clear;
        // border: 1px solid #ccc;
        // margin-top: .4rem;
        input{
            width: 4rem;
            outline: none;
            height: .8rem;
            border: none;
            padding-left: .2rem;
            font-size: .35rem;
        }
        input::placeholder{
            color: #ccc;
        }
        a{
            // float: right;
            color: white;
            background: #50D7ED;
            padding: .2rem .3rem;
            -webkit-tap-highlight-color: transparent;
            border: none;
        }
    }
</style>


