<template>
	<div class="home">
		<v-header></v-header>
		<nav class="city-nav">
			<div class="city-tip">
				<span>当前城市:</span>
				<span>定位不准时，请在城市列表中选择</span>
			</div>
			<router-link to="/header" class="guess-city">
				<span>{{currentcity}}</span>
				<svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
			</router-link>
		</nav>
		<split></split>
		<section class="hot-city-container">
			<h4 class="title">热门城市</h4>
			<ul class="city-list">
				<router-link tag="li" :to="'/city/'+city.id" class="city-items" v-for="city in hotcity">{{city.name}}</router-link>>
			</ul>
		</section>
		<split></split>
		<section class="city-list-container">
			<div class="city-part" v-for="(citys,key,index) in sortGroupCity">
				<div class="city-group">
					<h4 class="sequence">{{key}}<span>（安装字母排序）</span></h4>
					<ul class="citys">
						<li class="ellipsis" v-for="city in citys">{{city.name}}</li>
					</ul>
				</div>
				<split></split>
			</div>
		</section>
	</div>
</template>
<script>
	import vHeader from '@/components/header/header'
	export default {
		data(){
			return {
				currentcity:'',
				hotcity:'',
				groupcity:''
			}
		},
		created(){
		  this.$http.get('/api/home').then(response => {
		  	var data=response.body.data;
		  	this.currentcity=data.guesscity.name;
		  	this.hotcity=data.hotcity;
		  	this.groupcity=data.groupcity;
		  }, response => {
		    // error callback
		  });
		},
		computed:{
			sortGroupCity(){
				var sortcity={};
				for(let i=65;i<=90;i++){
					if(this.groupcity[String.fromCharCode(i)]){
						sortcity[String.fromCharCode(i)]=this.groupcity[String.fromCharCode(i)];
					}
				}
				console.log(sortcity)
				return sortcity;
			}
		},
		components:{
			vHeader
		}
	}
</script>
<style lang="less" scoped>
	.home{
		.city-nav{
			padding-top: 2.35rem;
			border-top: 1px solid #e4e4e4;
			border-bottom: 2px solid #e4e4e4;
			.city-tip{
				display: flex;
				justify-content:space-between;
				padding:0  .45rem;
				line-height: 1.45rem;
				span:nth-of-type(1){
					font-size: .55rem;
					color: #666;
				}
				span:nth-of-type(2){
					font-weight: 900;
					font-size: .475rem;
					color:#9f9f9f;
				}
			}
			.guess-city{
				display: flex;
				justify-content:space-between;
				align-items:center;
				padding:0 .45rem;
				height: 1.8rem;
				font-size: .75rem;
				line-height: 1.8rem;
				font-family: Microsoft YaHei;
				border-top:1px solid #e4e4e4;
				border-bottom: 2px solid #e4e4e4;
				span{
					color: #3190e8;
				}
				.arrow_right{
					width: .6rem;
					height: .6rem;
					fill:#edf;
				}
			}
		}
		.hot-city-container{
			border-top: 2px solid #e4e4e4;
			.title{
				padding-left: .45rem;
				color: #666;
				font-size: .55rem;
				font-weight: 400;
				line-height: 1.45rem;
				font-family: Helvetica Neue;
				border-bottom: 1px solid #e4e4e4;
			}
			.city-list{
				.city-items{
					display: inline-block;
					box-sizing: border-box;
					width: 25%;
					height: 1.75rem;
					color: #3190e8;
					text-align: center;
					font-size: .6rem;
					line-height: 1.75rem;
					font-family: Microsoft YaHei;
					border-right: .025rem solid  #e4e4e4;
					border-bottom: .025rem solid #e4e4e4;
					&:nth-of-type(4n){
						border-right: none;
					}
				}
			}
		}
		.city-list-container{
			border-top: 2px solid #e4e4e4;
			.city-group{
				.sequence{
					padding-left: .45rem;
					color: #666;
					font-weight: 400;
					font:.55rem/1.45rem Helvetica Neue;
					border-bottom: 1px solid #e4e4e4;
					span{
						font-size: .475rem;
						color: #999;
					}
				}
				.citys{
					font-size: 0;
					li{
						display: inline-block;
						box-sizing: border-box;
						width: 25%;
						height: 1.75rem;
    					font: .6rem/1.75rem Microsoft YaHei;
						text-align: center;
						border-right: .025rem solid #e4e4e4;
						border-bottom: .025rem solid #e4e4e4;
					}
				}
			}
		}
	}
	
</style>