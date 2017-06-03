<template>
	<div>
		<v-header></v-header>
		<div class="food-type-container">
			<swipe class="my-swipe">
			  <swipe-item class="slide1">1</swipe-item>
			  <swipe-item class="slide2">2</swipe-item>
			  <swipe-item class="slide3">3</swipe-item>
			</swipe>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				str:''
			}
		},
		created(){
			this.str=this.$route.params.geohash
		}
	}
</script>
<style lang="less" scoped>
	.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.slide1 {
  background-color: #0089dc;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}
</style>