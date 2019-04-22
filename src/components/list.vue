<template>
  <div class="main">
    <div class="top">
      <h4>挑战列表</h4>
    </div>
    <div class="search">
      <input type="text" placeholder="搜索">
    </div>
    <div class="tab">
      <a href="javascript:;" :class="{acts : types.type == 0}" @click="sure(0)">推荐</a>
      <a href="javascript:;" :class="{acts : types.type == 1}" @click="sure(1)" >最近参与</a>
    </div>
    <ul>
      <li v-for="(data,index) in info" :key="index">
        <div class="imgs">
          <img :src="data.image_url" alt>
        </div>
        <div class="text">
          <p>#{{data.name}}#</p>
          <p>{{data.desc}}</p>
          <p>{{data.num}}万人参与</p>
        </div>
      </li>
    </ul>
     <p v-if="info.length == 0 && types.type == 1" 
     style="text-align:center;background:white;margin:0;padding:10px 0;">没有最近参与，请选择挑战项目参与...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      types : {
        type : 0,
        page : 1
      }
    };
  },
  methods: {
    sure(e) {
      var $this = this;
      $this.types.type = e;
      $this.types.page = 1;
      $this.getdatas()
    },
    getdatas() {
      this.$http
        // .get('http://test.didi365.com/MobileInternet/mk/challengeList?userid&type=0')
        .get('http://test.didi365.com/MobileInternet/mk/challengeList',{params : {
          userid : 'userid',
          type : this.types.type,
          page : this.types.page
        }})
        .then(re => {
            console.log(re.data)
            this.info = re.data.data;
            console.log(this.info.length)
            // 将接口data数据赋值给this.info在template中渲染有利于type类型转换后数据的更替
          // for (let i = 0; i < datas.length; i++) {
          //   this.info.push({
          //     names : datas[i].name,
          //     descs : datas[i].desc,
          //     nums : datas[i].num,
          //     images : datas[i].image_url
          //   });
          // }
        });
    }
  },
  mounted() {
    //关联axios，建议使用上面的方法
    // const axios = require('axios');
    // axios.get('http://test.didi365.com/MobileInternet/mk/challengeList?userid')
    // .then(response => console.log(response.data))
    // .then(response => this.info = (response.data.data[0].desc))
    // .catch(error => console.log(error))
    this.getdatas();
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #f2f2f2;
  height: 50%;
  .top {
    background-color: black;
    height: 30px;
    h4 {
      color: white;
      text-align: center;
      margin: 0%;
      line-height: 30px;
    }
  }
  .search {
    padding: 10px 12px;
    input {
      border-radius: 30px;
      width: 100%;
      border: none;
      outline: none;
      height: 30px;
      text-indent: 13px;
      caret-color: aquamarine;
      &::placeholder {
        color: #cccccc;
        text-align: center;
        background-image: url("../assets/搜索.png");
        background: {
          repeat: no-repeat;
          size: contain;
          position: 45%;
        }
      }
    }
  }
  .tab {
    text-align: left;
    margin-left: 10px;
    a {
      color: #666666;
      font-size: 12px;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      padding: 4px 0px;
      text-decoration: none;
      margin-left: 5px;
    }
    a.acts {
      color: #333333;
      font-size: 20px;
      border-bottom: 1px solid aqua;
    }
  }
  ul {
    padding: 0%;
    margin: 8px 0 0 0;
    list-style: none;
    li {
      background: white;
      padding: 5px 12px;
      > * {
        vertical-align: middle;
      }
      .imgs {
        display: inline-block;
        width: 60px;
        img {
          width: 100%;
          border-radius: 10px;
        }
      }
      .text {
        display: inline-block;
        width: 80%;
        p {
          padding: 2px;
          margin: 0%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p:nth-child(1) {
          color: black;
          font-size: 17px;
          font-weight: bold;
        }
        p:nth-child(2) {
          color: #666666;
          font-size: 13px;
        }
        p:nth-child(3) {
          color: #999999;
          font-size: 8px;
        }
      }
    }
  }
}
</style>


