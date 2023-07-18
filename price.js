function Price() {

    return {

        // smallPrice: 0,
        // mediumPrice: 0,
        // largePrice: 0,
        // totalcost: 0,
        // Change: 0,
        // successful: false,
        // unsuccessful: false,
        // error: false,
        // numberOfSmall: 0,
        // numberOfMedium: 0,
        // numberOfLarge: 0,
        // SMALL: false,
        // MEDIUM: false,
        // LARGE: false,
        // input: "",
        // paymentInputBox: true,
        // BtnCheck: false,
        // BtnPay: true,
        pizzas: [],
        username: 'TendaniMamadi',
        cartId: '',
        cartPizzas: [],
        cartTotal: 0.00,
        paymentAmount: 0,
        message: '',
        createCart() {
            const createCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.username}`
            return axios.get(createCartURL).then(result =>{
                this.cartId = result.data.cart_code;
                localStorage['cardId'] = this.cartId;
            })
        },

        getCart() {
            const getCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/get`
            return axios.get(getCartURL)
        },

        addPizza(pizzaId) {

            return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/add', {
                "cart_code": this.cartId,
                "pizza_id": pizzaId
            })
        },

        removePizza(pizzaId) {
            return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/remove', {
                "cart_code": this.cartId,
                "pizza_id": pizzaId
            })
        },

        pay(amount) {
            return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/pay',
                {
                    "cart_code": this.cartId,
                    amount
                });
        },


        showCartData() {

            this.getCart().then(result => {
                const cartData = result.data;
                this.cartPizzas = cartData.pizzas;
                this.cartTotal = cartData.total.toFixed(2);
                // alert(this.cartTotal)
            });
        },

        init() {
            axios.get('https://pizza-api.projectcodex.net/api/pizzas').then(result => {
                this.pizzas = result.data.pizzas

            });
            if (!this.cartId) {
                this
                    .createCart()
                    .then(() => {
                        this.showCartData()
                    })
            }

        },

        addPizzaToCart(pizzaId) {
            this
                .addPizza(pizzaId)
                .then(() => {
                    this.showCartData();
                })
        },

        removePizzaFromCart(pizzaId) {
            this
                .removePizza(pizzaId)
                .then(() => {
                    this.showCartData();
                })

        },
        payForCart() {
            this
                .pay(this.paymentAmount)
                .then(result => {
                    if (result.data.status == 'failure') {
                        this.message = result.data.message;
                        setTimeout(() => this.message = '', 3000);
                    } else {
                        this.message = 'Payment successful!';
                        setTimeout(() => {
                            this.message = '';
                            this.cartPizzas = [];
                            this.cartTotal = 0.00;
                            this.cartId = '';
                            this.paymentAmount = 0;
                            this.createCart()
                        }, 3000);
                    }
                })
        }







        // small_increment() {
        //     this.numberOfSmall++;
        //     this.smallPrice += 49;
        //     this.totalcost += 49;
        // },

        // small_decrement() {
        //     if (this.smallPrice > 0) {
        //         this.numberOfSmall--;
        //         this.smallPrice -= 49;
        //         this.totalcost -= 49;
        //     }
        // },

        // buySmall() {
        //     this.numberOfSmall++
        //     this.smallPrice += 49
        //     this.totalcost += 49
        //     this.SMALL = true


        // },

        // medium pizza function

        // medium_increment() {
        //     this.numberOfMedium++;
        //     this.mediumPrice += 89;
        //     this.totalcost += 89;
        // },

        // medium_decrement() {
        //     if (this.mediumPrice > 0) {
        //         this.numberOfMedium--;
        //         this.mediumPrice -= 89;
        //         this.totalcost -= 89;
        //     }
        // },

        // buyMedium() {
        //     this.numberOfMedium++
        //     this.mediumPrice += 89
        //     this.totalcost += 89
        //     this.MEDIUM = true
        // },

        // large pizza function

        // large_increment() {
        //     this.numberOfLarge++;
        //     this.largePrice += 129;
        //     this.totalcost += 129;
        // },

        // large_decrement() {
        //     if (this.largePrice > 0) {
        //         this.numberOfLarge--;
        //         this.largePrice -= 129;
        //         this.totalcost -= 129;
        //     }
        // },

        // buyLarge() {
        //     this.numberOfLarge++
        //     this.largePrice += 129
        //     this.totalcost += 129
        //     this.LARGE = true

        // },


        // pay button function

        // pay() {
        //     if (this.input >= this.totalcost && this.totalcost !== 0) {
        //         this.successful = true
        //         setTimeout(() => {
        //             this.successful = false
        //         }, 3000);
        //         this.paymentInputBox = false
        //         this.BtnCheck = true
        //         this.BtnPay = false
        //         this.SMALL = false
        //         this.MEDIUM = false
        //         this.LARGE = false
        //         this.Change = this.input -= this.totalcost
        //     }

        //     else if (this.input < this.totalcost) {
        //         this.unsuccessful = true
        //         setTimeout(() => {
        //             this.unsuccessful = false
        //         }, 3000);
        //     }

        //     if (this.totalcost == 0) {
        //         this.error = true
        //         setTimeout(() => {
        //             this.error = false
        //         }, 3000);
        //     }

        // }




    }
}
