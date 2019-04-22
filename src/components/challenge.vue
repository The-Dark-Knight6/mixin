<template>
    <div class="host">
        <div class="top">
            <p>栏目列表</p>
        </div>
        <ul>
            <li v-for="(item,index) in beg" :key="index">
                <div class="infomation">
                    <div class="theimg">
                        <img :src="item.image_url" alt="">
                    </div>
                    <div class="thecontent">
                        <p>{{item.name}}</p>
                        <p @click="adds($event)">{{item.desc}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <div class="thedecoration" ref="clo">
            <span @click="close">&times;</span>
            <p>{{others}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            beg : [],
            others : ''
        }
    },
    methods : {
        listdata(){
            this.$http.get('http://test.didi365.com/MobileInternet/mk/columnList',{params:{
                userid : 'userid'
            }}).then(res => {
                console.log(res.data);
                this.beg = res.data.data;
            })
        },
        adds(e){
            this.$refs.clo.style.display = 'block';
            this.others = e.currentTarget.innerText;
        },
        close(){
            this.$refs.clo.style.display = 'none';
        }
    },
    mounted(){
        this.listdata();
    }
}
</script>

<style lang="scss" scoped>
ul{
    list-style: none;
    padding:0%;
    margin: 5px 0;
}
@mixin test{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.host{
    background-color: #F8F8F8;
    .thedecoration{
        background-color: rgba(0,0,0,.8);
        display: none;
        position: fixed;top: 40%;left: 10%;
        color: white;
        width: 80%;
        border-radius: 10px;
        span{
            margin: 10px 20px 0 0;
            font-size: 15px;
            float: right;
            display: block;
        }
        p{
           clear: both;
           padding: 0 10px 10px 10px;
           margin: 0%;
        }
    }
    .top{
        color: white;
        background-color: black;
        padding: 10px 0;
        p{
            text-align: center;
            font-size: 15px;
            margin: 0%;
        }
    }
}
.infomation{
        background-color: white;
        padding: 5px 10px;
        > *{
            vertical-align: middle;
        }
        .theimg{
            width:80px;
            height: 80px;
            display: inline-block;
            margin-right: 5px;
            img{
                border-radius: 10px;
                width: 100%;
                height: 100%;
            }
        }
        .thecontent{
            display: inline-block;
            width: 70%;
            p{
                margin: 0%;
                @include test;
            }
            p:nth-child(1){
                font-size: 20px;
                color: black;
            }
            p:nth-child(2){
                font-size: 8px;
                color: #666666;
            }
        }
    }
</style>


