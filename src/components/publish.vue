<template>
    <div class="publish">
        <!-- 顶部注册登录按钮 -->
        <div class="user_info">
            <span @click="ce">登录  |  注册</span>
        </div>
        <div class="cont">
            <p class="product">选择产品：</p>
           <div class="pros">
               <span v-for="(item,index) in list" :key="index" 
               v-text="item.name"
               :class="{act : ind == index}"
               @click="choose(index)">喵驾互联</span>
           </div>
           <p class="newid">发表新主题：</p>
           <div class="newinput">
               <!-- 使用element-ui中的input插件 避免未知vue错误 -->
               <el-input v-model="nums" 
               maxlength="30"
               placeholder="请输入内容"
               style="width:80%;outline:none;border:none;"></el-input>
               <!-- <input type="text" v-model="nums" maxlength="30" placeholder="请输入标题"> -->
               <span>{{nums.length}} / 30</span>
           </div>
           <!-- 引入vue-html5-editor富文本插件 -->
           <vue-html5-editor :content="content" :height="300"></vue-html5-editor>
           <span class="sub">喵一声</span>
        </div>
    </div>
</template>

<script>
export default {
    name : 'publish',
    data(){
        return {
            msg : 'publish',
            list : [],
            ind : 0,
            nums : '',
            content : ''
        }
    },
    methods : {
        ce(){
            this.$router.push({
                path : '/deng'
            })
        },
        // 获取所需要选择产品的数据
        getdata(){
            this.$http(this.SERVER_URL + '/MobileInternet/Message/product_category')
            .then(res => {
                console.log(res);
                this.list = res.data.data;
            })
            .catch(err => {

            })
        },
        // 当点击每个按钮时传入当前的引索index 当与data中 ind 值相等时 赋给当下的样式
        choose(e){
            this.ind = e;
        }
    },
    mounted(){
        this.getdata();
    }
}
</script>

<style>
/* 调整vue-html5-editor组件样式 */
.vue-html5-editor{
  margin: 0 .2rem;
}
.vue-html5-editor>.toolbar>ul>li .icon{
    line-height: 1rem;
    height: 1rem;
    width: 1rem;
    display: inline-block;
    vertical-align: middle;
    font-size: .4rem;
}
.el-input__inner{
    font-size: .35rem;
    height: .8rem;
}
</style>

<style lang="scss" scoped>

.clear{
    &::before,&::after{
        content: '';
        display : inline-block;
        clear: both;
    }
}
.publish{
    .user_info{
        @extend .clear;
        margin: .4rem;
        span{
            font-size: .3rem;
            float: right;
        }
    }
    .sub{
        float: right;
        margin: .5rem .2rem;
        color: white;
        background-color : #50d7ed;
        padding: 0 .3rem;
        line-height: .8rem;
        font-size: .3rem;
    }
    .cont{
        margin: .35rem;
        .newinput{
            // border: 1px solid gray;
            padding:.15rem;
            margin: .2rem;
            > *{
                vertical-align: middle;
            }
        }
        p.product,p.newid{
            padding: .2rem 0;
            margin: 0%;
        }
        .pros{
            padding: .2rem 0;
            span{
                display: inline-block;
                padding: .2rem .3rem;
                border: 1px solid #ddd;
                border-radius: .14rem;
                margin-left: .3rem;
            }
            .act{
                background-color: #50d7ed;
                border: none;
                color: #fff;
            }
        }
    }
}
</style>


