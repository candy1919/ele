<template>
	<div class="msite">
		<v-header></v-header>
		<div class="food-type-container">
			<swipe class="my-swipe" :auto="0">
			  <swipe-item class="slide" v-for="(type,index) in foodTypes" :key="index">
			  	<router-link to="www.baidu.com" v-for="item in type" :key="item.id"  class="type-item">
			  		<figure>
			  			<img :src="imgBaseUrl + item.image_url">
			  			<figcaption>{{item.title}}</figcaption>
			  		</figure>
			  	</router-link>
			  </swipe-item>
			</swipe>
		</div>
		<split></split>
		<div class="seller-container">
			<header>
				<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">附近商家</span>
			</header>
			<div class="seller-list">
				<router-link :to="'shop/'+shop.id" tag="div" class="seller-item" v-for="shop in shoplist">
					<div class="avatar-wrap">
						<img src="http://images.cangdu.org/15c62c94f24131.jpeg">
					</div>
					<div class="seller-right">
						<div class="shop-item">
							<div class="shop-name">
								<span>品牌</span>
								<h4>{{shop.name}}</h4>
							</div>
							<ul class="shop-header-ul">
								<li v-for="item in shop.supports">{{item.icon_name}}</li>
							</ul>
						</div>
						<div class="rating">
							<div class="rating-left">
								<div class="star-wrap">
									<rating-star :rating="shop.rating"></rating-star>
								</div>
								<span>月售{{shop.recent_order_num}}单</span>
							</div>
							<ul class="rating-right">
								<li v-if="shop.delivery_mode">{{shop.delivery_mode.text}}</li>
								<li>准时达</li>
							</ul>
						</div>
						<div class="fee-deliver">
							<p>¥{{shop.float_minimum_order_amount}}起送/{{shop.piecewise_agent_fee.tips}} </p>
							<p>{{shop.distance + 'm'}}/<span>{{shop.order_lead_time}}分钟</span></p>
						</div>
					</div>
				</router-link>
			</div>
		</div>
		<foot-guide></foot-guide>
	</div>
</template>
<script>
	import ratingStar from '@/components/common/ratingStar' 
	import footGuide from '@/components/foot/footGuide'
	import {mapMutations} from 'vuex'
	export default{
		components:{
			ratingStar,footGuide
		},
		data(){
			return{
				foodTypes:[],
				imgBaseUrl: 'https://fuss10.elemecdn.com',
				shoplist:[],
				geohash:''
			}
		},
		created(){
			this.$http.get('/api/foodTypes').then(response => {
		  	var data=response.body.data;
		  	this.foodTypes = this.splitArr(data,8);
		  }, response => {
		    // error callback
		  });
			this.getShoplist(this.latitude,this.longitude,this.offset,this.restaurantCategoryId)
		},
		mounted(){
			this.geohash = this.$route.params.geohash
			this.SAVE_GEOHASH(this.geohash)
			this.$http.get('api/address',{
				params:{
					'geohash':this.geohash
				}
			}).then(response=>{
				var data=response.body.data;
				this.RECORD_ADDRESS(data);
			},response=>{})
		},
		methods:{
			 ...mapMutations([
			      'RECORD_ADDRESS','SAVE_GEOHASH'
			    ]),
			getShoplist(latitude,longitude,offset,restaurantCategoryId){
				this.$http.get('/api/shoplist',{
				params:{
					'latitude':latitude,
					'longitude':longitude,
					'offset':offset,
					'restaurantCategoryId':restaurantCategoryId
				}
			}).then(response => {
		  	this.shoplist = response.body.data;
		  	console.log(this.shoplist[0].delivery_mode.text)
			}, response => {
			    // error callback
			});
		},
			splitArr(arr,len){
				var tempArr=[];
				var length=arr.length;
				for(let i=0,j=0;i<length;i+=len,j++){
					tempArr[j]=arr.splice(0,len);
				}
				return tempArr;
			}
		}
	}
</script>
<style lang="less" scoped>
	.msite{
		padding-top: 1.95rem;
		.food-type-container{
			padding-bottom: .6rem;
			height: 8rem;
			.my-swipe{
				.slide{
				}
				.type-item{
					display: inline-block;
					box-sizing: border-box;
					padding: .3rem 0;
					width: 25%;
					text-align: center;
					img{
						margin-bottom: .3rem;
						width: 1.8rem;
						height: 1.8rem;
					}
					figcaption{
						font-size: .55rem;
						color:#666;
					}
				}
			}
		}
		.seller-container{
			header{
				.shop_icon{
					margin-left: .6rem;
					width: .6rem;
					height: .6rem;
					fill:#999;
					vertical-align: middle;
				}
				.shop_header_title{
					color: #999;
    				font: .55rem/1.6rem Microsoft YaHei;
				}
			}
			.seller-item{
				display: flex;
				padding: .7rem .4rem;
				border-bottom: .025rem solid #f1f1f1;
				.avatar-wrap{
					margin-right: .4rem;
					img{
						width: 2.7rem;
						height: 2.7rem;
					}
				}
				.seller-right{
					flex:1;
				}
				.shop-item{
					display: flex;
					justify-content:space-between;
					.shop-name{
						width: 8.5rem;
						span{
							display: inline-block;
						    font-size: .5rem;
						    line-height: .6rem;
						    color: #333;
						    background-color: #ffd930;
						    padding: 0 .1rem;
						    border-radius: .1rem;
						    margin-right: .2rem;
						}
						h4{
							display: inline-block;
							color: #333;
						    padding-top: .01rem;
						    font: .65rem/.65rem PingFangSC-Regular;
						    font-weight: 700;
						}
					}
					.shop-header-ul{
						li{
							font-size: .5rem;
						    color: #999;
						    border: .025rem solid #f1f1f1;
						    padding: 0 .04rem;
						    border-radius: .08rem;
						    margin-left: .05rem;
						}
					}
				}
				
			}
			.rating{
				display: flex;
				justify-content:space-between;
				margin-top: .52rem;
				font-size: 0;
				.rating-left{
					width: 8.5rem;
					.star-wrap{
						display: inline-block;
					}
					span{
					    font-size: .4rem;
						color: #666;
						transform: scale(.8);
					}
				}
				.rating-right{
					li{
						font-size: .4rem;
					    padding: .04rem .08rem 0;
					    border-radius: .08rem;
					    margin-left: .08rem;
					}
					li:nth-of-type(1){
						color: #fff;
					    background-color: #3190e8;
					    border: .025rem solid #3190e8;
					}
					li:nth-of-type(2){
						color: #3190e8;
    					border: .025rem solid #3190e8;
					}
				}
				
			}
			.fee-deliver{
				display: flex;
				justify-content:space-between;
				margin-top: .52rem;
			    p{
			    	font-size: .5rem;
					color: #666;
					transform: scale(.9);
					span{
						color:#3190e8;
					}
			    }
				p:nth-of-type(1){
					width: 8.5rem;
				}
			}
		}
	}
</style>