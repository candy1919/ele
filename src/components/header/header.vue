<template>
	<div class="header">
		<span class="name">ele.me</span>
		<div class="user">
			<svg class="user_avatar">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
	        </svg>
        </div>
	</div>
</template>
<script>
	export default{
		
	}
</script>
<style lang="less" scoped>
	.header{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		height: 1.95rem;
		z-index: 100;
		color:#fff;
		background-color:#3190e8;
		.name{
			position: absolute;
		    left: .4rem;
		    top: 50%;
		    margin-top: -.32rem;
			font-size: .65rem;
		}
		.user{
			position: absolute;
			top: 50%;
			right: .55rem;
			margin-top: -.4rem;
			font-size: .65rem;
		}
		.user_avatar{
			width: .8rem;
			height: .8rem;
			fill:#fff;
		}
	}
</style>