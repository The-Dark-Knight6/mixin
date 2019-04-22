<template>
    <div class="">
        <heads></heads>
        <ul>
            <li v-for="(night,i) in list" :key="i">
                <!-- 文章作者信息 -->
                <div class="tou">
                    <router-link :to="{name : 'names',params : {name : night.author.loginname}}">
                        <img :src="night.author.avatar_url" :title="night.author.loginname" alt="">
                    </router-link>
                </div>
                <div class="hezi">
                    <!-- 文章详细内容 -->
                    <div class="zi">
                        <router-link :to="{name : 'cont',params : {id : night.id,name : night.author.loginname} }">
                            <p :title="night.title" >{{night.title}}</p>
                        </router-link>             
                    </div>
                    <!-- 文章的评论 -->
                    <div class="comment">
                        <span>{{night.reply_count}}/{{night.visit_count}}</span>
                        <span>{{night.last_reply_at.split('T')[0]}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 制作分页器 -->
            <!-- <div class="paginations">
                <el-pagination 
                background
                layout="prev,pager,next"
                :total="100"
                :current-page.sync="goon.page"
                @current-change="choosepage()"
                @prev-click="prevpage()"
                @next-click="nextpage()"
                >
                </el-pagination>
            </div> -->
    </div>
</template>

<script>

export default {
    data(){
        return {
            list : [],
            goon : {
                page : 1,
                limit : 10
            }
        }
    },
    methods : {
        mydata(){
            this.$http({
                url : 'https://cnodejs.org/api/v1/topics',
                method : 'get',
                params : {
                    page : this.goon.page,
                    limit : this.goon.limit
                }
            }).then(res => {
                console.log(res);
                this.list = res.data.data;
                // 当滑动到低端时新增10条数据
                this.goon.limit += 10;
            }).catch(err => {
                console.log(err);
            })
        },
        // 引用element的加载函数
         openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: '正在拼命加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
    //   当页面滑动到底端时进行 这个函数多用于web界面中的加载 
    // 移动端触屏有时会出现bug 比如在屏幕较大的窗口下 初始数据无法到达整个屏幕的底端 这样即便用户进行继续上拉的操作 也不会触发这个函数
        scrollmethod(){
            let sumh = 
            document.body.scrollHeight || document.documentElement.scrollHeight;
            let viewh = document.documentElement.clientHeight;
            let scrollh = 
            document.body.scrollTop || document.documentElement.scrollTop;
            if(viewh + scrollh >= sumh){
               this.mydata();
                this.openFullScreen2();
            }
        }
    //    choosepage(){
    //        this.mydata();
    //    },
    //    prevpage(){
    //        this.mydata();
    //    },
    //    nextpage(){
    //        this.mydata();
    //    }
    },
    created(){
        this.mydata();
        window.addEventListener('scroll',this.scrollmethod);
    },
    // 销毁钩子函数
    destroyed(){
        window.removeEventListener('scroll',this.scrollmethod);
    }
}
</script>

<style lang="scss" scoped>
.paginations{
    text-align: center;
    font-size: .3rem;
}
@mixin hezi{
    display: inline-block;
    width: 80%;
}
ul{
    list-style: none;
    margin: 0%;
    padding: .25rem .2rem;
}
ul li {
    padding: .1rem 0;
    border-bottom: .02rem solid #806767;
    > *{
        vertical-align: middle;
    }
}
.tou{
    margin:.1rem;
    width: 1.5rem; 
    display: inline-block;
    img{
        width: 100%;
    }
}
.hezi{
    @include hezi;
    .zi{
        margin: .15rem 0;
        p{
            margin: 0%;
            font-size: .4rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .comment{
        display: flex;
        justify-content: space-between;
        span{
            font-size: .3rem;
            color: #858585;
        }
    }
}
a{
    text-decoration: none;
    color: black;
    -webkit-tap-highlight-color: transparent;
}
</style>


