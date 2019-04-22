<template>
    <div class="index">
        <div class="top">
            <a href="javascript:;" :class="{acts : pages.type == 0}" @click="page(0)">推荐</a>
            <a href="javascript:;" :class="{acts : pages.type == 1}" @click="page(1)">最新</a>
            <a href="javascript:;" :class="{acts : pages.type == 2}" @click="page(2)">关注</a>
        </div>
        <ul>
            <li v-for="(item,index) in list" :key="index">
                 <div class="contents">
            <div class="thead">
                <div class="timg">
                    <img :src="item.content_desc.photo" alt="" @click="bigger($event)">
                </div>
                <div class="tcenter">
                    <p>{{item.content_desc.nickname}}</p>
                    <div class="tcenter_bo">
                        <img :src="item.content_desc.logo" alt="">
                        <span>{{item.content_desc.brand}}</span>
                        <img src="../assets/加V.png" alt="">
                    </div>    
                </div>
                <div class="tright">
                    <span> + 关注</span>
                </div>
            </div>
            <div class="comments">
            <p>{{item.content_desc.content}}</p>
            </div>
        <div class="pictures">
            <!-- image对象中找到img数组中存放的url -->
           <ul>
               <li v-for="(i,key,ind) in item.content_desc.image" :key="ind">
                  <span v-if="key == 'img'">
                      <img v-for="(p,dd) in i" :key="dd" :src="p.url" @click="bigger($event)" ref="big">
                  </span>
               </li>
           </ul>
        </div>
        <div class="adress">
            <img src="../assets/定位icon.png" alt="">
            <span>{{item.content_desc.address}}</span>
        </div>
        <div class="bottoms">
            <div class="bota">
                <img src="../assets/预览icon.png" alt="">
                <span>{{item.content_desc.part_num}}</span>
            </div>
            <div class="bota">
                <img src="../assets/评论icon.png" alt="">
                <span>{{item.content_desc.points_num}}</span>
            </div>
            <div class="bota">
                <img src="../assets/喜欢icon.png" alt="">
                <span>{{item.content_desc.cmnt_num}}</span>
            </div>
        </div>
        </div>
            </li>
        </ul>
        <div class="fly" ref="dis">
            <span @click="dis">&times;</span>
            <img :src="urls" alt="">
        </div>
        <div class="nothing" v-if="list.length == 0 && pages.type == 2">
            <p>there is nothing...</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list : [],
            urls : '',
            pages : {
                type : 0,
                page : 1
            }
        }
    },
    methods : {
        page(e){
            this.pages.type = e;
            this.pages.page = 1;
            this.thedata();
        },
        thedata(){
            this.$http.get('http://test.didi365.com/MobileInternet/Mk/note',{params : {
                userid : 'userid',
                type : this.pages.type,
                page : this.pages.page
            }})
            .then(res => {
                console.log(res.data.data);
                this.list = res.data.data;
            })
        },
        bigger(e){
            // 获取元素属性需要使用$refs，且在标签中使用ref注明，同时获取属性传入参数$event
            this.$refs.dis.style.display = 'block';
            // console.log(e.currentTarget.src)
            this.urls = e.currentTarget.src
        },
        dis(){
            this.$refs.dis.style.display = 'none'
        }
    },
    mounted(){
        this.thedata();
    }
}
</script>

<style lang="scss" scoped>
// 在list长度为0时所显示的背景颜色为黑色，现在处理为设置height：1024px
// 在加载数据的时候有动态的加载动画
body,html{
    height: 100%;
}
ul{
        margin: 0%;
        padding:0%;
        list-style: none;
    }
.index{     
    height: 100%;
    background-color: black;
    .nothing{
        height: 1024px;
        p{
            text-align: center;
            color: white;
        }
    }
    .fly{
        display: none;
        position: fixed;
        background-color: rgba(0,0,0,.7);
        width: 100%;
        height: 100%;
        top: 0%;
        span{
            color: white;
            float: right;
            margin:10px 10px 10px 0;
        }
        img{
            width: 100%;
        }
    }
    .top{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 5px 0;
        a{
            padding: 6px;
            outline-style: none;
            color: #A0A0A0;
            text-decoration: none;
            // 去除a标签的默认样式
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            font-size: 14px;
        }
        a.acts{
            color: white;
            font-size: 20px;
            border-bottom: 1px solid #50D7ED;
        }
    }
    .contents{
        background-color: #101010;
        margin: 10px 0;
        .thead{
            padding: 5px 10px;
            > *{
                vertical-align: middle;
            }
            .timg{
                display: inline-block;
                width: 60px;
                height: 60px;
                margin: 0 5px 0 0;
                img{
                    width: 100%;
                    border-radius: 50%;
                }
            }
            .tcenter{
                display: inline-block;
                width: 55%;
                p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: white;
                    margin: 5px 0;
                }
                .tcenter_bo{
                    display: inline-block;
                    > *{
                        vertical-align: middle;
                    }
                    img{
                        width: 15px;
                    }
                    span{
                        margin: 0 5px;
                        color: #A0A0A0;
                        font-size: 12px;
                    }
                }
            }
            .tright{
                background: #202020;
                border-radius: 30px;
                width: 20%;
                display: inline-block;
                text-align: center;
                line-height: 15px;
                padding: 6px 0;
                span{
                    font-size: 15px;
                    color: #50D7ED
                }
            }
        }
        .comments{
        margin: 6px 10px;
        box-sizing: content-box;
        p{
            text-align: left;
            color: white;
            margin: 0%;
            font-size: 9px;
        }
    }
    .pictures{
        margin: 5px 10px;
        img{
            width: 100px;
            margin: 0 5px;
        }
    }
    .adress{
        margin: 5px 10px;
        > *{
            vertical-align: middle;
        }
        img{
            width: 20px;
        }
        span{
            color: #A0A0A0;
            font-size: 8px;
        }
    }
    .bottoms{
        padding: 8px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .bota{
            > *{
                vertical-align: middle;
            }
            display: inline-block;
            img{
                width: 20px;
            }
            span{
                color: #A0A0A0;
                font-size: 7px;
            }
        }
    }
    }
    
}
</style>


