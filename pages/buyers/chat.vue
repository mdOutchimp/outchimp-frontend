<template>
	<div style="margin-top: 60px">
		<div class="container">
			<div class="row section-padding">
				<div class="col-lg-4">
					<div class="card rounded-0 border-0">
						<div class="card-body p-0 chat-list">
							<div class="card-title p-3 border-bottom chat-list__header">
								<select name="" id="" class="bg-transparent border-0">
									<option value="">All Conversion</option>
									<option value="">All Conversion</option>
								</select>
							</div>
							<simplebar style="height: 500px">
								<ul class="list-unstyled" v-if="activeUser">
									<chat-item v-for="(seller, i) in sellers" :key="i" :user="seller" :activeId="activeUser.id" @user-selected="onUserSelect">
									</chat-item>
								</ul>
								<ul class="list-unstyled" v-else>
									<li class="text-grey text-center">No active user found</li>
								</ul>
							</simplebar>
						</div>
					</div>
				</div>
				<div class="col-lg-8 mt-4 mt-lg-0">
					<div class="card border-0 rounded-0">
						<div class="card-body p-0">
							<div class="chat-box d-flex flex-column" v-if="activeUser">
								<div class="chat-box__header d-flex align-items-center border-bottom p-3">
									<img :src="
                      activeUser.profilePicture.length
                        ? activeUser.profilePicture
                        : require('@/assets/images/profile.png')
                    " alt="" class="me-2" />
									<div class="">
										<p class="fw-bold">{{ activeUser.name }}</p>
										<!-- <small class="text-grey mt-auto">Last Seen 2 min ago</small> -->
									</div>
								</div>
								<div class="chat-box__body p-3 d-flex flex-column flex-grow-1" v-chat-scroll ref="messageWrapper">
									<Message v-for="message in messages" :key="message.id" :message="message" :self="message.messagableId == $auth.user.id"></Message>
								</div>
								<div class="chat-box__input p-3 border-top">
									<form class="d-flex" @submit.prevent="sendMessage">
										<input type="text" class="form-control me-2" placeholder="Write Message..." v-model="message" ref="messageInput" />
										<button class="btn btn-primary px-4 rounded-0" type="submit">
											Send
										</button>
									</form>
								</div>
							</div>

							<div v-else class="d-flex align-items-center justify-content-center" style="height: 565px">
								<span class="text-grey">Sorry, No conversion found.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
	layout: "chat",
	middleware: "buyer",
	name: "buyer-chat",
	components: {
		simplebar,
	},
	data() {
		return {
			message: "",
			sellers: [],
			activeUser: null,
			messages: [],
		};
	},
	computed: {
		messageWrapperHeight() {
			return this.$refs.messageWrapper.scrollHeight;
		},
	},
	methods: {
		// Send message
		async sendMessage() {
			try {
				// Send the message
				const res = await this.$axios.$post("/buyers/messages", {
					message: this.message,
					sellerId: this.activeUser.id,
				});
				// Reset the input
				this.message = "";

				// Add into messages
				this.messages.push(res);
			} catch (error) {}
		},

		// Handle user select
		onUserSelect(user) {
			this.activeUser = user;
			this.getMessages();
			this.readAll();
		},

		// Read all messages
		async readAll() {
			try {
				await this.$axios.$post(
					`/buyers/${this.$auth.user.id}/messages/readall?sellerId=${this.activeUser.id}`
				);
				this.activeUser.pivot.sellerUnreadMessages = 0;
			} catch (error) {}
		},

		// Get messages
		async getMessages() {
			try {
				const res = await this.$axios.$get(
					"/buyers/messages?sellerId=" + this.activeUser.id
				);
				this.messages = res;
			} catch (error) {}
		},

		// Scroll to the last message
		scrollToEnd() {
			const content = this.$refs.messageWrapper;
			console.log(this.messageWrapperHeight);
			content.scrollTop = this.messageWrapperHeight;
		},
	},

	mounted() {
		this.$echo
			.private("App.Models.Buyer." + this.$auth.user.id)
			.listen("SellerMessageSent", (e) => {
				// Push the message if user is active
				if (this.activeUser.id == e.message.messagableId) {
					this.messages.push(e.message);
				} else {
					// Find the seller
					const seller = this.sellers.find(
						(seller) => seller.id == e.message.messagableId
					);
					// Increase unread message
					seller.pivot.sellerUnreadMessages++;
				}
			});
	},

	async fetch() {
		const res = await this.$axios.$get(
			"/messages/sellers?buyerId=" + this.$auth.user.id
		);
		this.sellers = res.data;

		// Set active users
		if (this.$route.query.sellerId) {
			const resSeller = await this.$axios.$get(
				"sellers/" + this.$route.query.sellerId
			);
			this.sellers.unshift(resSeller.data);
			this.activeUser = this.sellers[0];
		} else {
			this.activeUser = this.sellers[0];
		}

		// // Get active user messages
		await this.getMessages();
		this.readAll();
	},
	watch: {
		activeUser() {
			if (this.activeUser && this.messages.length) {
				this.scrollToEnd();
			}
		},
	},
};
</script>

<style lang="scss">
.chat-box {
	&__header {
		img {
			height: 60px;
			border-radius: 50%;
		}
	}

	&__body {
		height: 400px;
		overflow-y: auto;
	}

	.message {
		max-width: 300px;
		font-size: 0.825rem;

		&__text {
			background: #f1f1f1;
			padding: 10px;
			border-radius: 5px;
		}
		img {
			height: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}
}
.chat-list {
	&__item {
		&.active {
			background: #f1fdf7;
		}

		&:hover {
			background: #f1fdf7;
		}
	}
	&__image {
		height: 60px;
		width: 60px;

		img {
			object-fit: contain;
			height: 100%;
			border-radius: 50%;
		}
	}
}
</style>
