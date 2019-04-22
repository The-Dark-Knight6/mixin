<template>
    <div class="home">
        <heads></heads>
        <!-- 该作者的基本信息 -->
        <div class="userin">
            <img :src="cur.avatar_url" :title="cur.loginname" alt="">
            <div class="userin2">
                <p>{{cur.loginname}}</p>
                <p>{{cur.score}} 积分</p>
                <p>注册时间：{{cur.create_at.split('T')[0]}}</p>
            </div>
        </div>
        <!-- 该作者所回复的主题帖子 -->
        <div class="reply">
            <p>回复的主题</p>
            <ul>
                <li v-for="(item,index) in cur.recent_replies" :key="index">
                    <router-link :to="{name : 'cont',params : {id : item.id,name : item.author.loginname}}">
                        <span>{{item.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 该作者所创建的主题帖子 -->
        <div class="topic">
            <p>创建的主题</p>
            <ul>
                <li v-for="(i,j) in cur.recent_topics" :key="j">
                    <router-link :to="{name : 'cont',params : {id : i.id,name : i.author.loginname}}">
                        <span>{{i.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            cur : [],
        }
    },
    created(){
        this.gets();
    },
    methods : {
        gets(){
            this.$http({
                url : `https://cnodejs.org/api/v1/user/${this.$route.params.name}`,
                method : 'get'
            }).then(res => {
                console.log(res);
                this.cur = res.data.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
ul{
    list-style: none;
    margin: 0%;
    padding: 0%;
    li{
        border-bottom: 1.5px solid gainsboro;
        padding: .2rem .15rem;
        font-size: .3rem;
    }
}
.borders{
    border-top: .3rem solid #ddd;
}
.home{
    .reply,.topic{
        @extend .borders;
        p{
            margin: 0%;
            padding : .15rem 0 .15rem .1rem;
            color: gray;
            background: #f8f7f7;
            font-size: .15rem;
        }
        a{
            text-decoration: none;
        }
        span{
            font-size: .3rem;
            color: rgb(83, 127, 192);
        }
    }
    .userin{
        padding: .1rem 0;
        @extend .borders;
        *{
            vertical-align: middle;
        }
        img{
            width: 1.6rem;
            padding: .1rem;
        }
        .userin2{
            display: inline-block;
            width: 80%;
            p{
                margin: .1rem 0;
                font-size: .3rem;
                color: gray;
            }
        }
    }
}
</style>


