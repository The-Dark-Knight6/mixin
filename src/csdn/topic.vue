<template>
    <div class="host">
        <heads></heads>
        <!-- 文章的作者基本信息 -->
        <div class="thecont">
            <h5>{{colums.title}}</h5>
            <ul>
                <li>`分类：{{tabs}}</li>
                <li>`{{colums.visit_count}}次访问</li>
                <li>`发布于：{{colums.create_at.split("T")[0]}}</li>
                <li>
                    <router-link style="color:gray" :to="{name : 'names',params : {name : colums.author.loginname}}">
                        `作者：{{colums.author.loginname}}
                    </router-link>
                </li>
            </ul>
            <div v-html="colums.content" class="content"></div>
        </div> 
        <p class="the_comments">评论</p>
        <div class="reply">
            <ul>
                <li v-for="(com,index) in colums.replies" :key="index">
                    <div class="heng">
                        <router-link style="display:inline-block" :to="{name : 'names',params : {name : com.author.loginname}}">
                            <img :src="com.author.avatar_url" alt="">
                        </router-link>                       
                        <h6>{{com.author.loginname}}</h6>
                        <span class="lou">{{index + 1}}楼</span>
                    </div>
                    <span class="like">❤  {{com.ups.length}}</span>
                    <p v-html="com.content"></p>
                </li>
            </ul>
        </div>       
    </div>
</template>

<script>
export default {
    data(){
        return {
            colums : [],
        }
    },
    computed : {
        tabs(){
            let type = this.colums.tab;
            if(type == 'ask'){
                return '问答';
            }
            if(type == 'share'){
                return '分享';
            }
            if(type == 'job'){
                return '招聘';
            }
            if(type == 'good'){
                return '精华';
            }
        }
    },
    methods : {
        thenei(){
            this.$http({
                url : `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,
                method : 'get',
            }).then(res => {
                console.log(res.data);
                this.colums = res.data.data;
            }).catch(err => {
                console.log(err);
            })
        }
    },
    created(){
        this.thenei();
    }
}
</script>

<style>
/* scoped中的样式只在当前的模块中生效 当渲染数据中存在html代码时会出现样式不符等情况
此时需要纯css来书写 */
img{
    width: 100%
}
a{
    text-decoration: none;
    color: rgb(52, 155, 202);
}
p,h1,h2,h4,h3,h5,h6{
    font-size: .3rem;
    margin: .1rem 0;
}
/* li{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
} */
</style>

<style lang="scss" scoped>
.the_comments{
    color: rgb(211, 115, 115);
    margin-left: .2rem;
}
@mixin clears{
    clear: both;
    &::before,&::after{
        content: '';
        display: block;
        clear: both;
    }
}
.thecont{
    margin:.2rem .25rem;
h5{
    margin: 0%;
    font-size: .4rem;
    text-align: center;
}
ul li {
    font-size: .2rem;
    margin:.2rem 0 0 .3rem;
    color: #858585;;
}
.content{
    @include clears;
    font-size: .35rem;
    overflow: hidden;
    text-overflow: ellipsis;              
}
}
ul{
    margin: 0%;
    list-style: none;
    padding: .1rem 0;
}
.reply{
    margin: .2rem ;
    p{
        margin: .1rem 0;
        
    }
    li{
        border-bottom: 1px solid #858585;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: .3rem 0;
        .heng{
            display: inline-block;
            > * {
                vertical-align: middle;
            }
img{
            width: .7rem;
        }
    h6{
        display: inline-block;
        margin: 0% .2rem;
        font-size: .3rem;
    }
    .lou{
        color: gray;
        font-size: .3rem;
    }
        }
        
    .like{
        float: right;
        margin: .2rem .2rem 0 0;
    }
    }
}
</style>


