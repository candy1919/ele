<template>
	<div v-if="show" class="food">
		<div class="image-header">
			<img :src="selectedFood.image">
			<i class="icon-arrow_lift" @click="quit"></i>
		</div>
		<div class="food-detail">
			<h3 class="name">{{selectedFood.name}}</h3>
			<div class="sell">
				<span>月售{{selectedFood.sellCount}}份</span><span>好评率{{selectedFood.rating}}</span>
			</div>
			<div class="price">
				<span class="newprice">{{selectedFood.price}}</span>
				<span class="oldprice">{{selectedFood.oldPrice}}</span>
			</div>
			<div class="cart-wrap">
				<span class="add" v-if="!selectedFood.count" @click="addfood">加入购物车</span>
				<cartControl v-else :food="selectedFood" @add="addcart"></cartControl>
			</div>
		</div>
		<split></split>
		<div class="content">
			<h3 class="title">商品介绍</h3>
			<p class="text">{{selectedFood.info}}</p>
		</div>
		<split></split>
		<div class="content">
			<h3 class="title">商品评价</h3>
			<div class="select-wrap">
				<rating :ratings="selectedFood.ratings" :ratingtype="ratingtype" :onlycontent="onlycontent" :desc="desc" @changetype="changetype" @changecontent="changecontent"></rating>
			</div>
			<div class="list">
				<div v-if="!listratings.length">暂无评论</div>
				<div v-else class="list-item" v-for="item in listratings">
					<div class="user">
						<div class="time">
							<span>{{item.rateTime | formate}}</span>
						</div>
						<div class="name">
							<span>{{item.username}}</span><img :src="item.avatar">
						</div>
					</div>
					<div class="rating">
						<i :class="[item.rateType?'icon-thumb_down':'icon-thumb_up']"></i>
						<p class="rating-text">{{item.text}}</p>
					</div>
				</div>	
			</div>
		</div>
	</div>
	
</template>
<script>
	import 
</script>
<style lang="less" scoped>
	.food{
		position:fixed;
		overflow: auto;
		top:0;
		left: 0;
		right: 0;
		bottom: 50px;
		z-index: 20;
		background-color: #fff;
		.image-header{
			position: relative;
			width: 100%;
			padding-top: 100%;
			img{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
			.icon-arrow_lift{
				position: absolute;
				left:20px;
				top:20px;
				color: #fff;
				font-size: 10px;
			}

		}
		.food-detail{
			position: relative;
			padding: 18px;
			.name{
				line-height: 14px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7, 17, 27);
			}
			.sell{
				margin: 8px 0 18px 0;
				span{
					line-height: 10px;
					font-size: 10px;
					color: rgb(147, 153, 159);
					&:first-child{
						margin-right: 12px;
					}
				}
			}
			.price{
				font-size: 0;
				.newprice{
					margin-right: 7px;
					line-height: 14px;
					font-size: 14px;
					font-weight: 700;
					color: rgb(240, 20, 20);
				}
				.oldprice{
					line-height: 14px;
					font-size: 10px;
					color: rgb(147, 153, 159);
					text-decoration: line-through;
				}
			}
			.cart-wrap{
				position: absolute;
				right: 18px;
				bottom: 18px;
				.add{
					padding: 6px 12px;
					line-height: 12px;
					font-size: 10px;
					color: #fff;
					background-color: rgb(0, 160, 220);
					border-radius: 12px;
				}
			}
		}
		.content{
			padding: 18px;
			.title{
				margin-bottom: 6px;
				font-size: 14px;
				font-weight: 300;
			}
			.text{
				padding: 0 8px;
				line-height: 24px;
				font-size: 12px;
				font-weight: 200;
				color:rgb(77, 85, 93);
			}
			.select-wrap{
				margin-top: 12px;
			}
			.list{
				padding: 0 18px;
				border-top: 1px solid rgba(7, 17, 27, 0.1);
				.list-item{
					padding: 16px 0;
					.user{
						overflow: hidden;
						line-height: 12px;
						font-size: 10px;
						color:rgb(147,153,159);
						.time{
							float: left;
						}
						.name{
							float: right;
							img{
								margin-left: 6px;
								width: 12px;
								height: 12px;
								border-radius: 50%;
							}
						}
					}
					.rating{
						font-size: 0;
						.icon-thumb_down,.icon-thumb_up{
							margin-right: 4px;
							line-height: 24px;
							font-size: 12px;
						}
						.icon-thumb_down{
							color:rgb(147, 153, 159);
						}
						.icon-thumb_up{
							color:rgb(0, 160, 220);
						}
						.rating-text{
							display: inline-block;
							line-height: 16px;
							font-size: 12px;
							color: rgb(7, 17, 27);
						}
					}
				}
			}
		}
	}
</style>