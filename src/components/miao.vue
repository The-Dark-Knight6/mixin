<template>
    <div class="home">
        <!-- 顶部标注 -->
        <header>
            <div class="user_info">
                <span @click="deng">登录 | 注册</span>
                <img src="https:www.miudrive.com/images/community/clea.png" alt="">
            </div>
        </header>
        <!-- 获取轮播图片数据 -->
        <div class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in branners" :key="index">
                        <img :src="item.img" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- 定义切换按钮及发布帖子按钮 -->
        <div class="tab">
            <div class="btn">
                <a href="javascript:;" :class="{acts : thetypes.type == 0}" @click="change(0)">推荐</a>
                <a href="javascript:;" :class="{acts : thetypes.type == 1}" @click="change(1)">最新</a>
            </div>
            <!-- 制作发布帖子按钮 -->
            <a href="javascript:;" class="miao" @click="publish">
                <img src="https:www.miudrive.com/images/mobile/community/fb.png" alt="">
                喵一声
            </a>
        </div>
        <!-- 渲染主要列表数据 -->
        <div class="lists">
            <ul>
                <li v-for="(vs,index) in lists.list" @click="desc(vs.id)" :key="index">
                    <div class="cons">
                        <img v-if="vs.is_top > 0" src="https://www.miudrive.com/images/community/top.png"  alt="">
                        <img v-if="vs.essence == 1" src="https://www.miudrive.com/images/community/jinghua@2x.png" alt="">
                        <img v-if="vs.recommend == 1" src="https://www.miudrive.com/images/community/tuijian@2x.png" alt="">
                        <span v-if="vs.hot == 0">{{vs.title}}</span>
                        <span v-else style="color:red">{{vs.title}}</span>
                    </div>
                    <div class="other">
                        <div class="other_left">
                            <span v-if="vs.is_official == 1" class="off">官方</span>
                            <span>{{vs.nickname}}</span>
                            <span>{{vs.add_time}}</span>
                        </div>
                        <div class="other_right">
                            <img src="https://www.miudrive.com/images/community/yulan.png" alt="">
                            <span>{{vs.views}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 制作分页器 -->
        <div class="paginations">
            <el-pagination 
            background
            layout="prev,pager,next"
            :total="(lists.count)/2"
            :current-page.sync="thetypes.page"
            @current-change="choosepage()"
            @prev-click="prevpage()"
            @next-click="nextpage()"
            >
            </el-pagination>
        </div>
        <!-- 页脚的注释 即版权声明 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    data(){
        return {
            branners : [],
            lists : [],
            thetypes : {
                page : 1,
                type : 0
            }
        }
    },
    methods :{
        // 登录注册方法
        deng(){
            this.$router.push({
                path : '/deng',
            })
        },
        // 轮播图片数据
        getBanner(){
            this.$http(this.SERVER_URL + '/MobileInternet/Message/product_category')
            .then(res => {
                // console.log(res);
                this.branners = res.data.data;
            })
            .catch(err => {

            })
        },
        // 列表数据信息
        getList(){
            this.$http(this.SERVER_URL + '/MobileInternet/Message/index',{params:{
                page : this.thetypes.page,
                type : this.thetypes.type
            }})
            .then(res => {
                console.log(res);
                this.lists = res.data.data;
            })
        },
        // 切换不同列表获取相应数据
        change(e){
            this.thetypes.type = e;
            this.thetypes.page = 1;
            this.getList();
        },
        choosepage(){
            this.getList();
        },
        prevpage(){
            this.getList();
        },
        nextpage(){
            this.getList();
        },
        // 点击跳转至该标题的详情页面 使用this.$router传递参数
        desc(e){
            this.$router.push({
                path : '/article',
                query : {
                    id : e
                }
            })
        },
        //发布新帖子的方法函数
        publish(){
            this.$router.push({
                path : './publish.vue',
                name : 'publish'
            })
        }
    },
    mounted(){
        this.getList();
        this.getBanner();
        new Swiper ('.swiper-container',{
            // 开启无限循环模式
            // loop : true,
            // 自动初始化swiper
            observer : true,
            //slider容器可以同时显示的数量
            slidesPerView : 'auto',
            // 点击分页器控制swiper切换
            // paginationClickable : true,
            // free模式根据惯性滑动 值为false则一次滑动一个swiper
            freeMode : true
        })
    }
}
</script>

<style lang="scss" scoped>
.paginations{
    text-align: center;
    margin: .6rem .2rem;
}
// 定义清除浮动样式
.clears{
    &::before{
        content: '';
        clear: both;
        display: block;
    }
    &::after{
        clear: both;
        content: '';
        display: block;
    }
}
// 定义 混入super 使文字溢出用...处理
@mixin super{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
ul{
    list-style: none;
    padding: 0%;
    margin: 0%;
    margin-top: .2rem;
}
li{
    margin-top: .3rem;
    border-top: .03rem solid #eee;
    img{
        width: .4rem;
        padding: 0 .05rem;
    }
    .cons{
        > *{
            vertical-align: middle;
        }
        span{
            font-size: .38rem;
            width: 7rem;
            display: inline-block;
             @include super;
        }
    }
}
.home{
    .other{
        margin: .1rem 0;
        @extend .clears;
        * {
            vertical-align: middle;
            color: #8c8c8c;
        }
        .other_left{
            float: left;
            font-size: .3rem;
            span.off{
                color: white;
                display: inline-block;
                background-color: #50d7ed;
                padding: 0 .1rem;
                font-size: .2rem;
            }
        }
        .other_right{
            float: right;
            font-size: .3rem;
        }
    }
    .lists{
        margin: .2rem;
    }
    .tab{
        border-top: .2rem solid #eeeeee;
        padding: .4rem 0 0 .2rem;
        // 清楚div两边的浮动情况 使之包含子元素
        @extend .clears;
        *{
            vertical-align: middle;
        }
        .btn{
            float: left;
            a{
                display: inline-block;
                text-decoration: none;
                color: #333;
                font-size: .32rem;
                outline: none;
                padding: 0 .2rem;
                line-height: .9rem;
                font-weight: 400;
                // 取消点击的默认颜色
                -webkit-tap-highlight-color: transparent;
            }
            a.acts{
                background: #f5f5f5;
            }
        }
        .miao {
            background: #50d7ed;
            color: white;
            font-size: .32rem;
            float: right;
            padding: 0 .8rem;
            line-height: .8rem;
            margin-right: .2rem;
            text-decoration: none;
            -webkit-tap-highlight-color: transparent;
            img{
                width: .4rem;
            }
        }
    }
    .user_info{
        float: right;
        margin: .3rem .5rem .3rem 0;
        span{
            font-size: .4rem;
        }
        > *{
            display: inline-block;
            vertical-align: middle;
            margin-left: .1rem;
        }
        img{
            width: .4rem;
        }
    }
    .banner{
        clear: both;
        padding: .1rem .2rem;
    }
    .swiper-slide{
        width: 4rem;
        margin-right: .1rem;
        border-radius: .2rem;
        img{
            width: 100%;
        }
    }
}
</style>


