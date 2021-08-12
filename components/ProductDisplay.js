app.component('product-display',{
    props:{
     premium: {
         type: Boolean,
         required: true
     }
    },
    template:
 /*html*/   
 `<div class="product-display">
 <div class="product-container">
    <div class="product-image">
     <img :class="{ 'out-of-stock-img': !inStock }" :src="image" >
    </div> 
    <div class="product-info">
     <h1>{{ title }}</h1>
     <a v-bind:href="url">Made by Vue Mastery</a>
     <p v-if="inStock > 10"> In Stock</p>
     <p v-else-if="inStock >= 6 "> Almost Gone!!</p>            
     <p v-else> Out of Stock</p>           
     <p v-show="saleIncluded">{{saleText}}</p>

     <p> Shipping: {{ shipping }}</p>
    
     <product-details :details = "details"></product-details>

     <div v-for="(variant,index) in variants" :key="variant.id" 
     @mouseover ="updateVariant(index)"
     class="color-circle"
     :style ="{backgroundColor: variant.color}"
     >
       <table >               
         <tr>
           <td>  Sizes</td>
           <td v-for="size in sizes">{{size}}</td>
         </tr>
       </table>
     </div>

     <button class="button" 
     :class ="{ disabledButton: !inStock }"
     :disabled="!inStock" 
     @click="addToCart" >
     Add to Cart</button>
     
     
     <button class="button"      
     :class ="{ disabledButton: !inStock }"
     :disabled="!inStock" 
      @click="removeFromCart">
      Remove Item
     </button>    

   </div>
   </div> 
</div>
   <review-list :reviews="reviews"></review-list>
   <review-form @review-submitted="addReview"></review-form>
 `,
data() {
    return {       
        product : 'Socks',
        brand : 'Sheep',
        description :'warmer and wollen socks',
        selectedVariant: 0,
        url : 'https://www.vuemastery.com/',                        
        onSale : true,
        details : ['50% cotton','30% wool','10% polyster'],
        variants : [
            {id: 1111, color: 'Green', 
            image: './assets/images/socks_green.jpg', quantity:0,
             includedInSale: true},
            {id: 1112, color:'Blue', 
            image: './assets/images/socks_blue.jpg',quantity:10,
            includedInSale: false}
            ],
        sizes : ['S','M','L','XL'],
        reviews: []
        }
},
methods: {
    addToCart() {
     this.$emit('add-to-cart',this.variants[this.selectedVariant].id)     
    },
    updateVariant(index){        
        this.selectedVariant = index
    },
    removeFromCart(){       
            this.$emit('remove-from-cart',this.variants[this.selectedVariant].id)         
    },    
    addReview(review){
        this.reviews.push(review)
    }

},
computed:{
    title(){
        if(this.onSale){
        return this.brand + ' ' + this.product + ' is on Sale'  
     }else{
        return this.brand + ' ' + this.product 
     }         
    },
    inStock(){
        return this.variants[this.selectedVariant].quantity
    },
    image(){
        return this.variants[this.selectedVariant].image
    },
    saleText(){
        if(this.onSale && this.variants[this.selectedVariant].includedInSale){
            return this.product + ' is on Sale' 
        }
   },
   saleIncluded(){
    if(this.onSale ){
        return  this.variants[this.selectedVariant].includedInSale
    }else{
        return  this.onSale
    }

   },
   shipping(){
       if(this.premium){
        return 'Free'
       }
       return 2.99
   }
 

}


})