<template>
	<div>
		<v-header></v-header>
		<div class="food-type-container">
			
		</div>
	</div>
</template>
<script>
	import '@/assets/css/swiper-3.4.2.min.css'
	import '@/plugins/swiper-3.4.2.min.js'
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