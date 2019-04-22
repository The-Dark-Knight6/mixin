<template>
    <div class="lo">
        <el-input v-model="tel" placeholder="手机号码" type="number" maxlength="11"></el-input>
        <el-input v-model="psd" placeholder="密码" type="password"></el-input>
         <div>
            <a href="javascript:;" class="loin">登录</a>
        </div>
        <router-link to="/psw">
            <a href="javascript:;">忘记密码</a>
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tel : '',
            psd : ''
        }
    }
}
</script>
<style>
.el-input__inner{
    height: .8rem;
    font-size: .35rem;
}
</style>

<style lang="scss" scoped>
.el-input{
        width: 60%;
        margin-top: .4rem;
    }

.lo{
    text-align: center;
    .loin{
        background-color: #50D7ED;
        display: inline-block;
        width: 60%;
        margin-top: .3rem;
        padding: .2rem 0;
        color: white;
        -webkit-tap-highlight-color: transparent;
    }
    a{
        text-decoration: none;
        color: black;
        font-size: .3rem;
        margin-top: .3rem;
        display: inline-block;
        -webkit-tap-highlight-color: transparent;
    }
}
</style>

