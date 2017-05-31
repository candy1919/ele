<template>
	<div class="city">
		<v-header></v-header>
		<form class="city-form" v-on:submit.prevent>
			<div>
				<input type="text" class="input-style city-input" placeholder="输入学校、商务楼、地址" v-model="address" required="required">
			</div>
			<div>
				<button type="submit" class="input-style city-submit" @click="searchAddress">提交</button>
			</div>
		</form>
		<div class="address-list">
			<div class="history" v-if="historyTitle">历史记录</div>
			<ul>
				<li class="address-item" v-for="(city,index) in searchCity" @click="nextpage(index,city.geohash)">
					<p>{{city.name}}</p>
					<p>{{city.address}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {setStore,getStore} from '@/assets/js/func'
	export default{
		data(){
			return {
				id:'',
				currentcity:'',
				address:'',
				historyTitle:true,
				historySearch:[],
				searchCity:[],
			}
		},
		created(){
			var cityid=this.$route.params.cityid;
			this.$http.get('/api/currentcity',{
				params:{
					'cityid':cityid
				}
			}).then(response => {
		  	this.currentcity=response.body.data;
		  	this.id=response.body.cityid;
		  }, response => {
		    // error callback
		  });
			//读取历史记录
			var history=getStore('placeHistory');
			if(history){
				this.searchCity=JSON.parse(history);
			}
		},
		methods:{
			searchAddress(){
				if(this.address.trim().length){
					this.$http.get('/api/searchCity',{
						params:{
							'cityid':this.id,
							'address':this.address
						}
					}).then(response => {
					  	this.searchCity=response.body.data;
					  }, response => {
					    // error callback
					  });
				}
			},
			nextpage(index,geohash){
				let chooseItem = this.searchCity[index];
				let history = getStore('placeHistory');
				if(history){
					this.historySearch=JSON.parse(history);
					let repeat = false;
					this.historySearch.forEach(key =>{
						if(key.geohash==geohash){
							repeat=true;
						}
					})
					if(!repeat){
						this.historySearch.push(chooseItem);
					}
				}else{
					this.historySearch.push(chooseItem);
				}
				setStore('placeHistory',this.historySearch);
				this.$router.push({path:'/msite/'+geohash})
			}
		}
	}
</script>
<style lang="less" scoped>
	.city{
		padding-top: 2.35rem;
		.city-form{
			padding: .4rem;
			div{
				margin: 0 auto;
				margin-bottom: .4rem;
				width: 90%;
				.input-style{
					box-sizing: border-box;
					width: 100%;
					height: 1.4rem;
					font-size: .65rem;
					border-radius: .1rem;
					&.city-input{
						padding: 0 .3rem;
						color:#333;
						border:1px solid #e4e4e4;
					}
					&.city-submit{
						font-size: .65rem;
						color:#fff;
						background-color: #3190e8;
						border: none;
					}
				}
			}
		}
		.address-list{
			.history{
				padding-left: .5rem;
				font:.475rem/.8rem Microsoft YaHei;
				border-top: 1px solid #e4e4e4;
				border-bottom: 1px solid #e4e4e4;
				background-color: #f5f5f5;
			}
			.address-item{
				padding-top: .65rem;
				border-bottom: 1px solid #e4e4e4;
				p{
					margin: 0 auto .35rem;
					width: 90%;
				}
				p:nth-of-type(1){
					font-size: .65rem;
					color:#333;
				}
				p:nth-of-type(2){
					font-size: .45rem;
					color:#999;
				}
			}
		}
	}
</style>