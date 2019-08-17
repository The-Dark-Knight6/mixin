<template>
  <div class="test">
    <div>
      <span>限制的总数：</span>
      <el-input-number v-model="total" :min="10" :max="100"></el-input-number>
    </div>
    <h1 style="display:inline-block">右侧总数：{{add_num}}</h1>
    <el-button @click="push_more" type="success" size="small" plain>添加更多</el-button>
    <div class="divs" v-for="(v,i) in test" :key="i">
      <el-input-number v-model="v.index" :min="1" :disabled="true"></el-input-number>
      <span>{{v.name}}</span>
      <div class="el-input-number is-controls-right">
        <span role="button" class="el-input-number__decrease" @click="decrease_nums(v.number,i)">
          <i class="el-icon-arrow-down"></i>
        </span>
        <span role="button" class="el-input-number__increase" @click="increase_num(v.number,i)">
          <i class="el-icon-arrow-up"></i>
        </span>
        <div class="el-input">
          <!---->
          <input
            v-model="v.number"
            type="text"
            autocomplete="off"
            class="el-input__inner"
            role="spinbutton"
            aria-valuemax="10"
            aria-valuemin="0"
            aria-valuenow="1"
            aria-disabled="undefined"
            disabled="disabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 10,
      test: [
        {
          index: 1,
          name: "周杰伦",
          number: 2
        },
        {
          index: 2,
          name: "林俊杰",
          number: 2
        },
        {
          index: 3,
          name: "薛之谦",
          number: 1
        },
        {
          index: 4,
          name: "邓紫棋",
          number: 1
        },
        {
          index: 5,
          name: "陈奕迅",
          number: 1
        }
      ],
      add_num: 0
    };
  },
  created() {
    this.adds();
  },
  methods: {
    //增加更多条数框
    push_more() {
      let arr = this.test,
        tol = 0;
      for (let i of arr) {
        tol += i.number;
      }
      if (tol >= this.total) {
        this.$message("已达到上限！");
      } else {
        this.test.push({
          index: "--",
          name: "匿名",
          number: 1
        });
      }
      this.adds();
    },
    //增加条数
    increase_num(e, i) {
      let arr = this.test,
        tol = 0;
      for (let i of arr) {
        tol += i.number;
      }
      if (tol >= this.total) {
        this.test[i].number = e;
        this.$message("已达到上限！");
      } else {
        this.test[i].number = e + 1;
      }
      this.adds();
    },
    //减少条数
    decrease_nums(e, i) {
      if (e != 0) {
        this.test[i].number = e - 1;
        this.adds();
      }
    },
    //显示条数总数
    adds() {
      let arr = this.test,
        tol = 0;
      for (let i of arr) {
        tol += i.number;
      }
      this.add_num = tol;
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  margin: 50px;
  font-size: 14px;
  .divs {
    margin-bottom: 15px;
  }
}
</style>