<template>
    <div class="head">
        <router-link to="/">
            <img src="../assets/logo.png" alt="">
        </router-link>
        <span>
            <a href="/csdn_first">ABCK</a>
        </span>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.head{
    position: sticky;
    top: 0;
    background: #5a5555 ;
    height:1rem;
    img{
        width: .5rem;
        margin: .2rem .3rem;
    }
    a{
        text-decoration: none;
        color: #cbc9c9;
        -webkit-tap-highlight-color:transparent;
        font-size: .4rem;
    }
    span{
        float: right;
        margin: .2rem .4rem;
    }
}
</style>


