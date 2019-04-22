<template>
    <div class="main">
        <el-input v-model="iphone" maxlength="11" type="number" placeholder="手机号码"></el-input>
        <div class="oth">
            <input type="text" placeholder="短信验证码">
            <a href="javascript:;">验证</a>
        </div>
        <el-input v-model="npsw" type="password" placeholder="请输入新密码"></el-input>
        <a href="javascript:;" class="zhao">立即找回</a>
    </div>
</template>

<script>
export default {
    data(){
        return {
            iphone : '',
            npsw :''
        }
    }
}
</script>

<style lang="scss" scoped>
.clear{
    &::before,&::after{
        content: '';
        display:block;
        clear: both;
    }
}
.aa{
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    color: white;
    background: #50D7ED;
}
.el-input{
    width: 60%;
    margin-top: .4rem;
}
.main{
    text-align: center;
    .oth{
        @extend .clear;
        margin-top: .4rem;
        width: 60%;
        display: inline-block;
        border: 1px solid #ccc;
        text-align: left;
        input{
            height: .8rem;
            padding-left: .2rem;
            border: none;
            outline: none;
            font-size: .35rem;
        }
        input::placeholder{
            color: #ccc;
        }
        a{
            @extend .aa;
            padding: .2rem .3rem;
            float: right;
        }
    }
    a.zhao{
        @extend .aa;
        display: inline-block;
        width: 60%;
        padding: .2rem 0;
        margin-top: .4rem;
    }
}
</style>


