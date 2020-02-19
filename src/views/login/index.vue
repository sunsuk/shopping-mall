<template>
	<div class="loginpage">
        <h3>注册购物街</h3>
		<div class="login-form">
			<!--用户名密码框-->
			<div class="form-box">
				<form >
					<div class="user-box">
						<label :class="{one_label:true,look:showUser}">用户名或者电子邮箱</label>
						<input type="text" @focus="empty()" @blur="show()" @input="wrong" v-model="textUser" />
						<span class="msg" v-show="isMsg">此栏不可为空</span>
					</div>
					<div class="pwd-box">
						<label :class="{one_label:true,look:showPwd}">密码</label>
						<input @focus="empty1()" @blur="show1()" :type="pwdType" @input="wrong1" v-model="textPwd" />
						<span class="msg1" v-show="isMsg1">此栏不可为空</span>
						<img src="~assets/img/login/display.png" class="eye" v-if="eye" @click='showPassword()' />
						<img src="~assets/img/login/show.png" class="eye" v-else @click='showPassword()' />
					
                    </div>
				</form>
			</div>
			<!--忘记密码和下次登录-->
			<ul class="login">
				<li>
					<span :class="{'green':isActive}" @click="change()">√</span>下次自动登录
				</li>
				<li>
					<a href="#">忘记密码？</a>
				</li>
			</ul>
			<!--验证码区域-->
			<div class="code-box">
				<div class="code">
					<p>请您输入下图中的验证码:</p>
					<!--验证码-->
					<form action="#">
						<div class="left">
							<input type="button" class="sport" v-model="checkCode" />
						</div>
						<div class="right">
							<input type="text" placeholder="请输入验证码" v-model="idCode" />
						</div>
						<span class="message" v-show="isText">{{text}}</span>
					</form>
					<ul>
						<li><i class="fa fa-refresh" @click="createCode"></i></li>
						<li><i class="fa fa-info-circle"></i></li>
						<li class="btn"><input type="button" value="验证" @click="check" /></li>
					</ul>
				</div>
			</div>

			<!--登录按钮-->
			<div class="bottom">
				<button @click="login">登录</button>
			</div>
		</div>
	</div>
</template>

<script>
    var code; //在全局定义验证码
    // import axios from 'axios'
    
	export default {
		data() {
			return {
				textUser: '', //动态用户绑定
				textPwd: '', //动态密码绑定
				showUser: false, //用户上移动
				showPwd: false, //密码向上移动
				isMsg1: false,
				isMsg: false, //是否为空提示
				isMove: false,
				isText: false, //是否显示验证框
				isActive: false, //是否显示记住登录密码
				isShow: true,
				pwdtext: '密码', //密码框提示
				eye: true, //是否显示密码
				text: '', //验证码提示框内容
				pwdType: 'password', //密码显示类型默认看不见
				checkCode: '', //动态绑定验证码
				idCode: ''
			}
		},
		mounted() {
			this.createCode()
		},
		methods: {
            login(){
                console.log(this.$axios)
               this.$axios({
                   method:'post',
                   url:'http://123.207.67.30:8080/regist',
                   data:{
                       mobile:'xxn',
                       password:'xxn6666'
                   }
               })
               
            },
			wrong() { //用户输入框监听
				if(this.textUser.length == 0) { //用户框输入长度判断
					this.isMsg = true //用户框提示消息
				} else {
					this.isMsg = false
					this.showUser = true //用户框向上移动
				}
			},
			wrong1() { //密码输入框监听
				if(this.textUser.length == 0) { //密码框输入长度判断
					this.isMsg1 = true //密码提示消息
				} else {
					this.isMsg1 = false
					this.showPwd = true //密码框向上移动
				}
			},
			empty() { //用户输入框聚焦
				this.showUser = true
			},
			show() { //用户输入框失焦
				this.showUser = !this.showUser
				if(this.textUser.length == '') {
					this.showUser = false
					this.isMsg = true
				} else {
					this.showUser = true
					this.isMsg = false
				}
			},
			empty1() { //密码输入框聚焦
				this.showPwd = true
			},
			show1() { //密码输入框失焦
				this.showPwd = !this.showPwd
				if(this.textPwd.length == '') {
					this.showPwd = false
					this.isMsg1 = true
				} else {
					this.showPwd = true
					this.isMsg1 = false
				}
			},
			showPassword() { //眼睛点击切换显示
				if(this.eye) {
					this.eye = false
					this.pwdType = 'text'
				} else {
					this.eye = true
					this.pwdType = 'password'
				}
			},
			change() { //是否记住密码背景颜色
				this.isActive == false ? this.isActive = true : this.isActive = false;
			},
			createCode() { //验证码
				code = "";
				var codeLength = 4; //验证码的长度   
				var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
					'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数   
				for(var i = 0; i < codeLength; i++) { //循环操作   
					var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）   
					code += random[index]; //根据索引取得随机数加到code上   
				}
				this.checkCode = code; //把code值赋给验证码   
			},
			//点击  验证码
			check() {
				this.idCode.toUpperCase(); //取得输入的验证码并转化为大写     
				if(this.idCode == '') {
					this.isText = true
					this.text = '请输入验证码'
					setTimeout(() => {
						this.isText = false
					}, 1000);
				} else if(this.idCode.toUpperCase() != this.checkCode) {
					this.isText = true
					this.text = '输入有误，请重新输入'
					this.createCode()
					this.idCode = ''
					setTimeout(() => {
						this.isText = false
					}, 1000);
				} else {
					this.isText = false
					return true;
				}
			}
		}
	}
</script>

<style lang="less">
	/*用户名动画效果*/
	 :-webkit-autofill {
 -webkit-text-fill-color: #000 !important;
 transition: background-color 5000s ease-in-out 0s;
}

	.look {
		opacity: 1!important;
		top: 0 !important;
		font-size: 14px !important;
		color: #6C6C6C !important;
	}
	
	.one_label {
		position: absolute;
		top: 16px;
		left: 10px;
		font-size: 20px;
		color: #999;
		transition: all .5s;
	}
	/* 输入内容为空   */
	
	.msg {
		position: absolute;
		top: 60px;
		left: 0;
		width: 150px;
		color: #6C6C6C;
		letter-spacing: .1em;
		height: 25px;
        display: inline-block;
        margin-top: 4px;
        font-size: 14px;
		img {
			width: 35px;
			vertical-align: middle;
		}
	}
	
	.msg1 {
		position: absolute;
		top: 60px;
		left: 0;
		width: 150px;
		color: #6C6C6C;
		letter-spacing: .1em;
		height: 50px;
        display: block;
        margin-top: 4px;
        font-size: 14px;
		img {
			width: 35px;
			vertical-align: middle;
		}
	}
	
	.sport {
		vertical-align: middle;
		transform: translate(-15px, 0);
		font-size: 30px;
		letter-spacing: .1em;
		color: #053d84;
		padding-left: 18px;
		text-align: center;
	}
	
	.change {
		/*label标签样式*/
		color: #6c6c6c;
		font-size: 12px;
		margin-top: -40px;
	}
	
	.eye {
        /*密码眼睛样式*/
        width: 30px;
        height: 30px;
		position: absolute;
		right: 10px;
		top: 20px;
		z-index: 10;
	}
	
	.green {
		/*是否记住密码样式*/
		background-color: #00A862;
	}
	/*form样式*/
	
	.loginpage {
		background-color: #F7F7F7;
		width: 100%;
		height: 100vh;
		.login-form {
			// width: 400px;
			padding: 20px 20px;
			height: 500px;
			box-sizing: border-box;
			.form-box {
				form {
					input {
						height: 60px;
						line-height: 60px;
						width: 100%;
						background-color: transparent;
						padding-left: 10px;
						font-size: 20px;
						outline: none;
						border: none;
						color: #9D9D9D;
						position: absolute;
						z-index: 1;
					}
					div {
						border-bottom: solid 1px #DADADA;
						height: 60px;
						width: 100%;
						margin-top: 20px;
						position: relative;
						label {
							position: absolute;
							top: 16px;
							left: 10px;
							font-size: 20px;
						}
					}
				}
			}
		}
	}
	/*记住密码样式*/
	
	.login {
		width: 100%;
		height: 50px;
		overflow: hidden;
		margin-top: 20px;
		li {
			list-style: none;
			height: 50px;
			line-height: 50px;
			float: left;
			color: #6C6C6C;
			span {
				color: #fff;
				height: 30px;
				width: 30px;
				display: inline-block;
				line-height: 30px;
				text-align: center;
				border-radius: 7px;
				margin-right: 8px;
				border: solid 1px #00A862;
			}
		}
		li:nth-of-type(2) {
			float: right;
			a {
				text-decoration: none;
				color: #00A862;
			}
		}
	}
	/*验证码样式*/
	
	.code-box {
		width: 100%;
		max-width: 640px;
		padding: 20px 20px;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 15px;
		height: 185px;
		box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, .1);
		.code {
			padding: 0 10px;
			box-sizing: border-box;
			color: #000;
			p {
				font-size: 16px;
			}
			form {
				width: 100%;
				height: 60px;
				overflow: hidden;
				border: solid 1px #EAEAEA;
				margin-top: 15px;
				position: relative;
				div {
					float: left;
					width: 50%;
					height: 60px;
				}
				.left {
					background-color: #FEF5EC;
					input {
						width: 100%;
						height: 60px;
						line-height: 60px;
						text-align: center;
						border: none;
						outline: none;
						background-color: #FEF5EC;
					}
				}
				.right {
					height: 60px;
					input {
						background-color: transparent;
						outline: none;
						border: none;
						height: 60px;
						line-height: 60px;
						padding-left: 10px;
					}
				}
				.message {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					height: 35px;
					width: 170px;
					color: #fff;
					line-height: 35px;
					background-color: rgba(0, 0, 0, .3);
					border-radius: 3px;
					text-align: center;
					font-size: 14px;
				}
			}
			ul {
				width: 100%;
				margin-top: 18px;
				height: 60px;
				position: relative;
				li {
					float: left;
					list-style: none;
					padding-right: 20px;
					i {
						color: #999;
						font-size: 25px;
					}
				}
				.btn {
					position: absolute;
					right: -20px;
					top: -10px;
					input {
						padding: 10px 40px;
						background-color: #00A862;
						color: #fff;
						border: none;
						border-radius: 5px;
						outline: none;
					}
				}
			}
		}
	}
	/*登录按钮样式*/
	
	.bottom {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding: 30px 25px;
		button {
			position: absolute;
			right: 0;
			height: 60px;
			width: 100px;
			border-radius: 28px;
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.38);
			background: #f7f7f7;
			border-color: #f7f7f7;
			color: rgba(0, 0, 0, .38);
			border: none;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
		}
	}
</style>