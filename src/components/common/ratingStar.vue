<template>
	<div class="rating-star">
		<div class="star">
			<svg class="grey_fill" v-for="num in 5" :key="num">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
            </svg>
		</div>
		<div class="star-flow"  :style="'width:'+rating*2/5+'rem'">
			<div class="star">
				<svg class="orange_fill"v-for="num in 5" :key="num">
	                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
	            </svg>
			</div>
		</div>
		<div class="score-wrap">
			<span>{{rating}}</span>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			rating:{
				type:Number,
				default:3.5
			}
		}
	}
</script>
<style lang="less" scoped>
	.rating-star{
		display: flex;
		position: relative;
		.score-wrap{
			display: inline-block;
			margin: 0 .2rem;
			font-size: .4rem;
    		color: #ff6000;
		}
		.star{
			display: flex;
			width: 2rem;
			height: .4rem;
			.grey_fill{
				fill:#d1d1d1;
			}
			.orange_fill{
				fill:#ff9a0d;
			}
		}
		.star-flow{
			position: absolute;
			overflow: hidden;
		}
	}
</style>
