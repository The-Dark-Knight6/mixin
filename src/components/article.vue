<template>
    <div class="article">
        <!-- 顶部的登录注册提示 -->
        <div class="user_info">
            <span @click="ce">登录  |  注册</span>
        </div>
        <!-- 该贴子下的主要内容 -->
        <div class="title">
            <img v-if="detail.is_top == 1" src="https://www.miudrive.com/images/community/top.png" alt="">
            <img v-if="detail.essence == 1" src="https://www.miudrive.com/images/community/jinghua@2x.png" alt="">
            <img v-if="detail.recommend == 1" src="https://www.miudrive.com/images/community/tuijian@2x.png" alt="">
            <span>{{detail.title}}</span>
        </div>
        <div class="cons">
            <div class="cons_left">
                <span v-if="detail.is_official == 1" class="off">官方</span>
                <span>{{detail.nickname}}</span>
                <span>{{detail.update_time}}</span>
            </div>
            <div class="cons_right">
                <img src="https://www.miudrive.com/images/community/yulan.png" alt="">
                <span>{{detail.views}}</span>
            </div>
        </div>
        <!-- 该贴子下的标题 -->
        <div v-html="detail.content" class="content"></div>
        <!-- 引入vue-html5-editor 富文本插件 -->
        <vue-html5-editor @click="updata" :content="cont" :height="300"></vue-html5-editor>
        <div class="returndata">
            <a href="javascript:;">回喵</a>
        </div>
        <!-- 该贴子下的所有评论 -->
        <div class="comments">
            <p class="new_com">最新评论</p>
            <ul>
                <li v-for="(vv,index) in coms.list" :key="index">
                    <div class="vv_tops">
                        <img v-if="vv.is_top > 0" src="https://www.miudrive.com/images/community/top.png" alt="">
                        <span>{{vv.nickname}} 发表于 {{vv.add_time}}</span>
                        <span class="floors">{{vv.floor}}#</span>
                    </div>
                    <div class="vv_con" v-html="stringrep(vv.content)"></div>
                    <a href="javascript:;" class="vv_retu">回复</a>
                </li>
            </ul>
        </div>
          <!-- 页面的脚注 版权声明 -->
        <Footer></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            detail : [],
            cont : '',
            coms : []
        }
    },
    methods : {
        ce(){
            this.$router.push({
                path : '/deng'
            })
        },
        updata(e){
            this.cont = e;
        },
        getdetail(){
            this.$http(this.SERVER_URL + '/MobileInternet/Message/commnentBody',{params:{
                // $route 当前正在使用的路由对象，$router 全局路由对象
                id : this.$route.query.id
            }})
            .then(res => {
                console.log(res);
                if(res.data.status == 1){
                    this.detail = res.data.data;
                }else{
                    res.showtips({
                        show : true,
                        text : res.data.info
                    })
                }
            })
            .catch(err => {

            })
        },
        getcomments(){
            this.$http(this.SERVER_URL + '/MobileInternet/Message/commnentList',{params:{
                id : this.$route.query.id,
                page : 1
            }})
            .then(res => {
                console.log(res.data.data);
                this.coms = res.data.data;
            })
            .catch(err => {

            })
        },
        // 这个函数用来将接口中的一些字符转换掉，其中/.../为正则表达式界定符 g为全局标志
        stringrep (value) {
            var str = value;
            // 比如 这句话用来将数据中所有 &lt; 转换为 < 符号 
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            str = str.replace(/&quot;/g,'"');
            str = str.replace(/&amp;/g,'&');
            return str;
        }
    },
    mounted(){
        this.getdetail();
        this.getcomments();
    }
}
</script>

<style>
 /* vue-html-editor调整字体图标的样式 
 在scoped私有的style中使用无效果*/
.vue-html5-editor>.toolbar>ul>li .icon{
    line-height: 1rem;
    height: 1rem;
    width: 1rem;
    display: inline-block;
    vertical-align: middle;
    font-size: .4rem;
}
/* 在所有相应内容下的所有img都显示为100%宽度 */
ul li .vv_con img,.article .content img{
    width: 100% !important;
}
.vv_con p{
    margin: .2rem 0;
}
</style>

<style lang="scss" scoped>
ul{
    margin: .2rem 0;
    padding: 0%;
    list-style: none;
}
ul li{
    margin: .1rem 0;
    border-top: .03rem solid #eee;
    @extend .clear;
    a.vv_retu{
        color: #78a9b1;
        font-size: .3rem;
        float: right;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
    }
    .vv_con{
        font-size: .35rem !important;
    }
    .vv_tops{
        margin: .1rem 0;
        color: #8c8c8c;
        @extend .clear;
        > *{
            vertical-align: middle;
        }
        img{
            width: .4rem;
        }
        span.floors{
            float: right;
            font-size: .4rem !important;
        }
        span{
            font-size: .3rem;
            display: inline-block;
            line-height: .8rem;
        }
    }
}
// 清除两边浮动效果
.clear{
    &::before{
        clear: both;
        content: '';
        display: block;
    }
    &::after{
        clear: both;
        content: '';
        display: block;
    }
}
.comments{
    margin: .2rem 0;
    .new_com{
        color: #50d7ed;
        font-size: .35rem;
    }
}
.article{
    margin: .2rem .2rem 0 .2rem;
    font-size: .3rem;
    .returndata{
        @extend .clear;
        margin: .2rem ;
        a{
            text-decoration: none;
            outline: none;
            -webkit-tap-highlight-color: transparent;
            padding: 0 .35rem;
            color: white;
            background-color: #50d7ed;
            float: right;
            line-height: .8rem;
            font-size: .45rem;
        }
    }
    .content{
        font-size: .45rem;
    }
    .user_info{       
        @extend .clear;
        margin: .2rem 0;
        span{
            float: right;
        }
    }
    .title{
        clear: both;
        font-size: .4rem;
        padding: .2rem 0;
        > *{
            vertical-align: middle;
            display: inline-block;
        }
        img{
            width: .4rem;
        }
        span{
            display: inline-block;
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .cons{
        margin: .2rem 0;
        @extend .clear;
        .cons_left{
            float: left;
            .off{
                color: #fff;
                background-color: #50d7ed;
                display : inline-block;
                padding: 0 .1rem;
            }
            span{
                color: #333;
            }
            span:nth-of-type(2){
                margin: 0 .1rem;
            }
        }
        .cons_right{
            float: right;
            img{
                width: .4rem;
            }
            span{
                color: #333;
            }
        }
    }
}
</style>


