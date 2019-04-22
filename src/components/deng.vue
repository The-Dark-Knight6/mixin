<template>
    <div class="all">
        <div class="logo">
            <img @click="homes" src="https://www.miudrive.com/images/mobile/community/logo.png" alt="">
        </div>
        <div class="tabs">
            <router-link to="/deng">
                <a href="javascript:;" @click="tabclick(true)" :class="{act : tab}">登录</a>
            </router-link>
            <router-link to="/zhuce" >
                <a href="javascript:;" @click="tabclick(false)" :class="{act : !tab}">注册</a>
            </router-link>
        </div>
        <div class="for">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tab : true,
        }
    },
    methods : {
        // 返回主页面
        homes(){
            this.$router.push({
                path : '/miao'
            })
        },
        // 点击切换不同的页面
        tabclick(e){
            this.tab = e;
        }
    }
}
</script>

<style lang="scss" scoped>
.logo{
    margin: 1.5rem;
    text-align: center;
    img{
        width: 4rem;
    }
}
.tabs{
    text-align: center;
    a{
        text-decoration: none;
        color: black;
        font-size: .4rem;
        margin: 0 .2rem;
        -webkit-tap-highlight-color: transparent;
    }
    a.act{
        color: #50D7ED;
    }
}
</style>