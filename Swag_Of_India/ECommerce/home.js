var flag = document.getElementsByClassName("flag");
var flag_india = document.getElementsByClassName("flag_india");

function addflag() {
    var cuntary = document.getElementById("cuntary");
    var id = cuntary.options[cuntary.selectedIndex].value
    var index = cuntary.selectedIndex;
    var id2 = id + index;

    flag_india[0].style.display = "none";
    flag_india[1].style.display = "none";

    for (let i = 0; i < flag.length; i++) {
        flag[i].style.display = "none";
    }

    document.getElementById(id).style.display = "block";
    document.getElementById(id2).style.display = "block";
}



var pageup = document.getElementsByClassName("pageup");
var header = document.getElementsByClassName("header");
    window.addEventListener("scroll", () => {
    header[0].classList.toggle("sticky", window.scrollY > 0);
    if (window.pageYOffset > 300) {
        pageup[0].classList.add("activeScroll")
    } else {
        pageup[0].classList.remove("activeScroll")
    }
})


// image-view function 

// var preview = document.getElementById("preview")

function imageView(imageNmae) {
    preview.src = imageNmae.src;
}






// ratting function

function star(clickstar) {
    var clickstarclass = document.querySelector("." + clickstar);
    var arr = clickstar.split("-");
    if (clickstarclass.classList.contains("fa-star-o")) {
        clickstarclass.classList.remove("fa-star-o")
        clickstarclass.classList.add("fa-star")
        var k = arr[1]

        for (let i = 0; i < k; i++) {
            var m = 'star-' + i
            var p = document.getElementsByClassName(m);
            if (p[0].classList.contains("fa-star")) {} else {
                p[0].classList.remove("fa-star-o")
                p[0].classList.add("fa-star")
            }
        }
    } else {
        clickstarclass.classList.remove("fa-star")
        clickstarclass.classList.add("fa-star-o")


        var k = arr[1]

        for (let i = 4; i > k; i--) {
            var m = 'star-' + i
            var p = document.getElementsByClassName(m);
            if (p[0].classList.contains("fa-star-o")) {} else {
                p[0].classList.remove("fa-star")
                p[0].classList.add("fa-star-o")
            }
        }

    }
}



// select size function 

var sizeNumber = document.querySelectorAll(".sizeNumber");

function active(y) {
    var z = document.querySelector("." + y);
    if (z.classList.contains("active")) {
        z.classList.remove("active");

    } else {
        for (let x = 0; x < sizeNumber.length; x++) {
            sizeNumber[x].classList.remove("active");
        }
        z.classList.add('active');
    }

}


// qty increseing and decrease function

var plus = document.querySelector(".fa-plus");
var minus = document.querySelector(".fa-minus");
var qty = document.querySelector(".qty");

if(plus)
{
    plus.addEventListener('click', function () {
        var increment = parseInt(qty.value);
        if (increment < increment + 1) {
            increment = increment + 1;
            qty.value = increment;
        }
    });
}

if(minus)
{
    minus.addEventListener('click', function () {
        var decrement = parseInt(qty.value);
        if (decrement > 1) {
            decrement = decrement - 1;
            qty.value = decrement;
        }
    });
     
}



// wishlist add function 

// let heart = document.querySelector(".fa-heart-o");

// if(heart)
// {
//     heart.addEventListener('click', function () {
//         if (heart.classList.contains('fa-heart-o')) {
//             heart.classList.remove('fa-heart-o');
//             heart.classList.add('fa-heart');

//         } else {
//             heart.classList.add('fa-heart-o');
//             heart.classList.remove('fa-heart');
//         }
    
//     });
    
// }







// load jason data in view listing page 

var filePath = 'database/products.json';
var productList;
var htmlReturn = "hello",
    isNew = "",
    lowStar = 0,
    reviews = "",
    discount = 0;

async function loadJson(getFile) {
    fetch(getFile)
        .then(res => res.json())
        .then(json => {
            productList = json;
            productList.products.forEach((product) => {
                htmlReturn = '<div class="showpmenu" tabindex="0" id="product' + product.id + '">' +
                    '<div class="card ">' +
                    '   <div class="pcardimage"><img src="./image/product' + product.id + '.png" class="card-img-top" tabindex="0" alt="long sleep green top for girls  with too cool brand name  and size 25">';

                isNew = '<div class="pcardoffer"><span>New</span></div>'
                if (product.isNew == true)
                    htmlReturn += isNew;
                isNew = "";
                htmlReturn += ' </div>' +
                    '<div class="card-body text-center">' +
                    '   <h5 class="card-title">' + product.name + '</h5>' +
                    '  <p class="card-text">Rs ' + product.priceAfterDiscount + ' <del>Rs ' + product.price + ' </del>';
                if (product.priceAfterDiscount == 0) {} else {
                    discount = product.price - product.priceAfterDiscount;
                    discount = 100 / product.price * discount;
                    htmlReturn += '<span class="text-danger"> (' + parseInt(discount) + '% off)</span>';
                    discount = 0;
                }
                htmlReturn += '</p>' +
                    ' <div class="pcardstar">';
                lowStar = 5 - product.ratings;
                if (product.ratings == 5)
                    lowStar = 0;
                reviews = "";
                for (let i = 0; i < product.ratings; i++)
                    reviews += ' <i class="fa fa-star"></i>';
                for (let j = 0; j < lowStar; j++)
                    reviews += ' <i class="fa fa-star-o"></i>';
                htmlReturn += reviews + ' <span>' + product.ratings + '/5 </span>';
                reviews = "";

                htmlReturn += '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="pmenuoter">' +
                    '   <div class="up">' +
                    '      <i class="fa fa-angle-up"></i>' +
                    '</div>' +
                    '<div class="phovermenu">' +
                    '   <div class="rounddiv">' +
                   `<i class="fa fa-shopping-cart" onclick="stiredCartId('${encodeURI(JSON.stringify(product))}')"></i>` +
                    ' </div>' +
                    '<div class="rounddiv">' +
                    `<i class="fa fa-heart" onclick="WishCartId('${encodeURI(JSON.stringify(product))}')"></i>` +
                    '</div>' +
                    '<div class="rounddiv">' +
                    `<i class="fa fa-eye" onclick="eyeViewCartId('${encodeURI(JSON.stringify(product))}')" ></i>` +
                    '</div>' +
                    '<div class="rounddiv">' +
                    '   <i class="fa fa-shopping-cart"></i>' +
                    '</div>' +
                    '<div class="rounddiv">' +
                    '   <i class="fa fa-heart"></i>' +
                    '</div>' +
                    '<div class="rounddiv">' +
                    
                    '   <i class="fa fa-eye"></i>' +
                    '</div>' +

                    '</div>' +
                    '<div class="pdown">' +
                    '   <i class="fa fa-angle-down"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                    document.querySelector('#productListArea').innerHTML += htmlReturn;

            })
        })

}

 if(document.querySelector('#productListArea') !== null){
     loadJson(filePath);

 }



// set product ids in localStorage

// item count function in list page




// function storgeId(ProId,product) {
//     // console.log("this is tje product of jason ===",product );
//    let cartItem =  getProductDetails (filePath, ProId,product);
// //    console.log( "helo thi sis cart ==",cartItem);
//     let itamCartCount = localStorage.getItem("cartCount"); ;
//    let chekItemStorage = localStorage.getItem("Deepak"+ProId);

//     if(ProId==chekItemStorage){
//         console.log("if")
//     }
//     else {
//     localStorage.setItem("Deepak"+ProId,ProId);
//     localStorage.setItem("productQTY"+ProId,1);
//     console.log("else")
//     itamCartCount ++;
//     localStorage.setItem("cartCount",itamCartCount);
//     document.getElementById("itemCount").innerHTML = itamCartCount;
// }
// }










// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222


//  get cart count from storage

let getCartCountfrom = JSON.parse(window.localStorage.getItem("cartProduct"));
if(getCartCountfrom){
    
    document.getElementById("itemCount").innerHTML = getCartCountfrom.length;

}

// get wishlist count 

let getWishListTotalCount = JSON.parse(window.localStorage.getItem("wishCartProduct")) ;
if(getWishListTotalCount){
    document.getElementById("wishListitemCount").innerHTML = getWishListTotalCount.length;
}

// get onclick peoduct objact 

// async function getProductDetails (SelectedId,clickFunction) {
//     fetch(filePath)
//     .then(res => res.json())
//     .then(json => {
//         let  IdProductDetails = json;
        
//         IdProductDetails.products.forEach(product => {
            
//             if(SelectedId == product.id){
//                 if(clickFunction == 1) stiredCartId(product);
//                 else if(clickFunction == 2) eyeViewCartId(product);
//                 else WishCartId(product);
                
//         }

//        })
//     })
// }

// value matcing function 

let Fill_Cart = JSON.parse(window.localStorage.getItem("cartProduct")) || [];
let Fill_Wish_Cart = JSON.parse(window.localStorage.getItem("wishCartProduct")) || [];
let Fill_View_Cart = [];

function checkMatch (lodedCart,arr){

  for(let i=0;i<arr.length;i++){
   if(arr[i].id == lodedCart.id){
    return 1
   }    
  }
}

// storded cart in local storage 
let iNum = 1;
function stiredCartId (lodedCart){
    lodedCart = JSON.parse(decodeURI(lodedCart));
    let match = checkMatch (lodedCart,Fill_Cart);
    if(!match) {
        Fill_Cart.push({...lodedCart,Qty:1})
        window.localStorage.setItem("cartProduct",JSON.stringify(Fill_Cart));
        document.getElementById("itemCount").innerHTML = JSON.parse(window.localStorage.getItem("cartProduct")).length;
    }
     else {
        let storagecart = JSON.parse(window.localStorage.getItem("cartProduct"));
        let product = grtProductDetail(storagecart,lodedCart.id);
        let getQry = product[0].Qty;
        getQry++;
        for(let index in storagecart){
            if(product[0].id == storagecart[index].id){
                storagecart[index].Qty = getQry;
            }
        }
        window.localStorage.setItem("cartProduct",JSON.stringify(storagecart));
    }
   
}

// stored item  from wish cart to local storage 

function WishCartId (lodedCart){
    lodedCart = JSON.parse(decodeURI(lodedCart));
    let match = checkMatch (lodedCart,Fill_Wish_Cart);
    if(!match) {
        Fill_Wish_Cart.push({...lodedCart,Qty:1})
        window.localStorage.setItem("wishCartProduct",JSON.stringify(Fill_Wish_Cart));
        document.getElementById("wishListitemCount").innerHTML = JSON.parse(window.localStorage.getItem("wishCartProduct")).length;
    }
}

// stored eye view product in local storage 

function eyeViewCartId(lodedCart){
    lodedCart = JSON.parse(decodeURI(lodedCart));
    window.localStorage.setItem("eyeViewCartProduct",JSON.stringify({...lodedCart,Qty:1}));
    document.location = "./product_view_listing.html";
}

// stored wish list in eye view page

function eyeViewWishCart (lodedCart){
    let Fill_Wish_Cart2 = [];
    for ( let index in Fill_Wish_Cart){
        if(Fill_Wish_Cart[index].id == lodedCart.id){
        }else {
            Fill_Wish_Cart2.push(Fill_Wish_Cart[index])
        }
    }
    Fill_Wish_Cart = Fill_Wish_Cart2;
    WishCartId(lodedCart);
}

// get single  product detal function from storge 

function grtProductDetail(arr,matchId) {
    let x = arr.filter(product => {
        if(product.id == matchId)
         return product
    })
    return x;
}

// remove item from local storge arr with function 
function removeDetails(arr,matchId) {
    let x = arr.filter(product => {
        if(product.id == matchId);
        else return product
    })
    return x
}

// remove cart item 

function removeCartItem(removeFile) {
    let storagecart = JSON.parse(window.localStorage.getItem("cartProduct"));

    let x = removeDetails(storagecart,removeFile)
    window.localStorage.setItem("cartProduct",JSON.stringify(x));

    document.getElementById("product"+removeFile).classList.remove("down-to-up");
    document.getElementById("product"+removeFile).classList.add("fade-out");
    document.getElementById("itemCount").innerHTML = JSON.parse(window.localStorage.getItem("cartProduct")).length;
setTimeout(function(){
    document.querySelector("#productCartView").innerHTML = "";
    displayCartView()
},1000)

}

// remove wish cart item 

 function removeWishCartItem(removeWL) {
    let storageWishcart = JSON.parse(window.localStorage.getItem("wishCartProduct"));

    let y = removeDetails(storageWishcart,removeWL);
    window.localStorage.setItem("wishCartProduct",JSON.stringify(y));

    if(document.getElementById("product"+removeWL) !== null)
    document.getElementById("product"+removeWL).classList.remove("down-to-up");
    if(document.getElementById("product"+removeWL))
    document.getElementById("product"+removeWL).classList.add("fade-out-left");
    document.getElementById("wishListitemCount").innerHTML = JSON.parse(window.localStorage.getItem("wishCartProduct")).length;
    if(document.getElementById("wishList")){
    setTimeout(function(){
        document.getElementById("wishList").innerHTML = "";
        displayWishCartView();
    },1000);
    }
 }

// cart to wish 

 function cartToWishCart(moveId) {
   
    let storagecart = JSON.parse(window.localStorage.getItem("cartProduct"));

    let load = grtProductDetail(storagecart,moveId);
    removeCartItem(moveId);
    WishCartId(load[0]);
 }

//  wish to cart 

 function wishCartToCart(moveCartID) {

    let storageWishcart = JSON.parse(window.localStorage.getItem("wishCartProduct"));

    let y = grtProductDetail(storageWishcart,moveCartID);
    removeWishCartItem(moveCartID);
    stiredCartId(y[0]);

 }

// increese and decrease qty Function at cart page

function SelectFunction (QtySelect,selectProId) {

    let selectQtyValue = QtySelect.options[QtySelect.selectedIndex].value
    let DemoNumber =JSON.parse(window.localStorage.getItem("cartProduct"));
    let QtY_Value = grtProductDetail(DemoNumber,selectProId)
     if(selectQtyValue == QtY_Value[0].Qty){
     }else {
        for(let index in DemoNumber){
            if(selectProId == DemoNumber[index].id){
                DemoNumber[index].Qty = selectQtyValue;
            }
        }
        window.localStorage.setItem("cartProduct",JSON.stringify(DemoNumber));
            displayCartView(0);
        }
}

// cart view display function 
 
let proDiscount=0,
 proCount = 0;

 function displayCartView (addClass){
    let priceArray=0,
        totalArray=0,
        discountArray=0,
        proInnerHtml="",
        shippingCharge = 0;



    let storagecart = JSON.parse(window.localStorage.getItem("cartProduct")) || 0;


    if(storagecart.length> 0){
   
    storagecart.forEach(product => {
        // console.log("this is cart prodact view page", product);



            // console.log("hello222222222")

            if(addClass !== 0){
       proInnerHtml = '<div class="row border mb-5 " id="product' + product.id + '">'+
           ' <div class="col">'+
              '  <div class="row p-3 pt-3">'+
                   '<div class="col-9">'+
                        '<div class="row ">'+
                            '<div class="col-4">'+
                                '<img class=" img-fluid" src="./image/product'+product.id+'.png" alt="product image">'+
                            '</div>'+
                            '<div class="col-8">'+
                                '<p class="fw-bold text-capitalize mb-2 ">yours Favourite premium quality natural...</p>'+
                                '<p class="text-muted text-capitalize mb-2">Color : White</p>'+
                                '<p class="text-muted text-capitalize mb-5">sold by : macmerise celfie design peivite limited</p>'+
                                '<div class="d-flex ">'+
                                    '<select class=" bg-light me-5 form-select" aria-label="Default select example">'+
                                        '<option class="fw-bold text-capitalize" selected> Size : Onsize</option>'+
                                        '<option value="small">Small</option>'+
                                        '<option value="medium">Medium</option>'+
                                        '<option value="xl">XL</option>'+
                                        '<option value="xxl">XXL</option>'+
                                      '</select>'+
                                      '<select class=" bg-light form-select proQty" id="proQty'+product.id+'" aria-label="Default select example" onclick="SelectFunction('+"proQty"+product.id+',' +product.id+')">'+
                                        '<option class="fw-bold text-uppercase" selected>'+product.Qty+'</option>'+
                                        '<option value="1">1</option>'+
                                        '<option value="2">2</option>'+
                                        '<option value="3">3</option>'+
                                        '<option value="4">4</option>'+
                                        '<option value="5">5</option>'+
                                      '</select>';


                                proInnerHtml +=  '</div>'+
                                
                            '</div>'+
                       '</div>'+
                        
                    '</div>'+ 
                    '<div class="col-3 text-end">';
                        proCount = product.Qty;
                        proInnerHtml +='<p class="fw-bold mb-1" >Rs <span id ="itemPriceView'+product.id+'" > '+product.priceAfterDiscount*proCount+'</span></p>';
                        '<p class="mb-2"><del class=" ">Rs '+product.price*proCount+'</del>';
                        if (product.priceAfterDiscount == 0) {} else {
                            proDiscount = product.price*proCount - product.priceAfterDiscount*proCount;
                            proDiscount = 100 /( product.price*proCount )* proDiscount;
                            proInnerHtml += '<span class="maincolor fw-bold">(' + parseInt(proDiscount) + '% off)</span></p>';
                            proDiscount = 0;
                        }
                        
                        
                      proInnerHtml +=  '<p class="mutied"> Delivery in 4-6 days</p>'+
                    '</div>'+
                '</div>'+
                '<div class="row border">'+
                    '<div class=" col py-3 px-md-4 ">'+
                        '<button class="btn btn-outline-light text-dark fs-5 me-4 fw-bold" onclick="removeCartItem('+product.id+')" action="#"> Remove</button>'+
                        '<span>|</span>'+
                        '<button class="btn btn-outline-light text-dark fs-5 ms-4 fw-bold" onclick="cartToWishCart('+product.id+')"> Move To Wishlist</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
        
        if(document.querySelector("#productCartView")!==null)
        document.querySelector("#productCartView").innerHTML += proInnerHtml;
        // if(addClass !== 0)
        if(document.querySelector("#product"+product.id))
        document.querySelector("#product"+product.id).classList.add("down-to-up");
                    }                                                                                                                                                                                                                                                                       
        proCount = product.Qty;

             if(addClass == 0){
                document.getElementById("itemPriceView"+product.id).innerHTML = product.priceAfterDiscount*proCount
             }

        priceArray += product.price*proCount;
        document.getElementById("priceDetails").innerHTML = parseInt(priceArray);

        discountArray +=  product.price*proCount - product.priceAfterDiscount*proCount;
        document.getElementById("bagDiscount").innerHTML = parseInt(discountArray);

        totalArray =parseInt( priceArray-discountArray);
        document.getElementById("orderTotal").innerHTML = totalArray;

        shippingCharge = document.getElementById("delivaryCharge").innerHTML;
        if(shippingCharge >0){
            document.getElementById("totalALL").innerHTML = +shippingCharge+totalArray;
            if(document.getElementById("showTotal")!==null)
            document.getElementById("showTotal").innerHTML = +shippingCharge+totalArray;
            if(document.getElementById("checkoutPrice")!==null)
            document.getElementById("checkoutPrice").innerHTML = +shippingCharge+totalArray;
        }else{
            document.getElementById("totalALL").innerHTML = totalArray;
            if(document.getElementById("showTotal")!==null)
            document.getElementById("showTotal").innerHTML = totalArray;
            if(document.getElementById("checkoutPrice")!==null)
            document.getElementById("checkoutPrice").innerHTML = totalArray;

        }
       

        document.getElementById("ShowItemCount").innerHTML = JSON.parse(window.localStorage.getItem("cartProduct")).length;
    

    })

}else{
    document.getElementById("tableView").innerHTML = "";
    document.getElementById("showTotal").innerHTML = 0;
    document.getElementById("ShowItemCount").innerHTML = 0;

}
 }

 if(document.querySelector("#productCartView") !== null)
 displayCartView ();

// display eish cart functin 

let listInnerHtml = "";
 
function displayWishCartView(){

    let storageWishcart = JSON.parse(window.localStorage.getItem("wishCartProduct")) || 0;

    if(storageWishcart.length > 0){
    storageWishcart.forEach(product => {

        // if(product.id == wishlistGet){
            listInnerHtml = '<div class="row border mb-5 down-to-up " id="product' + product.id + '">'+
            '<div class="col">'+
                '<div class="row p-3 pt-3">'+
                    '<div class="col-4">'+
                       '<img class=" img-fluid border" src="./image/product'+product.id+'.png" alt="product image">'+
                    '</div>'+
                    '<div class="col ">'+
                        '<p class="fw-bold text-capitalize mb-2 ">yours Favourite premium quality natural...</p>'+
                        '<div class="pcardstar d-flex align-items-baseline">';
                       let lowStar = 5 - product.ratings;
                        if (product.ratings == 5)
                           lowStar = 0;
                       let reviews = "";
                        for (let i = 0; i < product.ratings; i++)
                            reviews += ' <i class="fa fa-star"></i>';
                        for (let j = 0; j < lowStar; j++)
                            reviews += ' <i class="fa fa-star-o"></i>';
                            listInnerHtml  += reviews + ' <span>' + product.ratings + '/5 </span>';
                        reviews = "";
                        listInnerHtml += '<p class="text-black ms-2">( <span>2850</span> )</p>'+
                        '</div>'+
                        '<p class="fw-bold mb-1">Rs '+product.priceAfterDiscount+' <del class="text-muted ">Rs '+product.price+'</del>';
                        if (product.priceAfterDiscount == 0) {} else {
                        let proDiscount = product.price - product.priceAfterDiscount;
                            proDiscount = 100 / product.price * proDiscount;
                           listInnerHtml += '<span class="maincolor fw-bold">(' + parseInt(proDiscount) + '% off)</span></p>';
                           proDiscount = 0;
                       }

           
                       listInnerHtml +='<select class=" bg-light form-select w-25 my-4" aria-label="Default select example">'+
                            '<option class="fw-bold text-uppercase" selected>Select Pack of'+
                            '</option>'+
                            '<option value="1">1</option>'+
                            '<option value="2">2</option>'+
                            '<option value="3">3</option>'+
                            '<option value="4">4</option>'+
                            '<option value="5">5</option>'+
                        '</select>'+
                        '<div class="">'+
                            '<button class="btn btn-maincolor fs-6 me-4 fw-bold" onclick="wishCartToCart('+product.id+')"> Add to cart</button>'+
                            '<span>|</span>'+
                            '<button class="btn btn-outline-light text-muted fs-5 ms-0 fw-bold" onclick="removeWishCartItem('+product.id+')">Remove from Wishlist</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';

               if(listInnerHtml !==""){
                   document.getElementById("wishList").innerHTML += listInnerHtml; 
               }
               document.getElementById("wishListUppershow").innerHTML =  JSON.parse(window.localStorage.getItem("wishCartProduct")).length;
    //    }

    })
    }
    else {
        document.getElementById("wishListUppershow").innerHTML = 0;
    }
}

if(document.getElementById("wishList") !== null)
    displayWishCartView();

// checkout function ?

if(document.getElementById("checkoutItem") !== null && JSON.parse(window.localStorage.getItem("cartProduct"))){

    document.getElementById("checkoutItem").innerHTML = JSON.parse(window.localStorage.getItem("cartProduct")).length || 0;
    displayCartView ();
 }

// eye view display function 

 function displayEyeViewCart () {
    let product = JSON.parse(window.localStorage.getItem("eyeViewCartProduct")) || "";
    if(product){
       
         
                      document.getElementById("multipulImageViewBox").innerHTML =
                         '<div class="Product d-flex flex-column align-items-center justify-conten-evenly">'+
                         '<img src="./image/product'+product.id+'.png" onclick="imageView(this)" alt="">'+
                         '<img src="./image/product2.png" onclick="imageView(this)" alt="">'+
                         '<img src="./image/product3.png" onclick="imageView(this)" alt="">'+
                         '<img src="./image/product4.png" onclick="imageView(this)" alt="">'+
                     '</div>';
                     
                           document.getElementById("previewImag").innerHTML = '<img src="./image/product'+product.id+'.png" id="preview" alt="">';

                                if (product.priceAfterDiscount == 0) {} else {
                                    proDiscount = product.price - product.priceAfterDiscount;
                                    proDiscount = 100 / product.price* proDiscount;
                                    document.getElementById("priceDetailsView").innerHTML = 'Rs <span>'+product.priceAfterDiscount+'</span> <del>Rs '+product.price+'</del> <span'+
                                    'class="maincolor fw-bold" id="maincolor">(' + parseInt(proDiscount) + '% off)</span>';                  
                                    proDiscount = 0;
                                }


                      document.getElementById("qtyBoxHTML").innerHTML = '<p class=" fw-bold">QTY</p>'+
                          '<div class="qtybox">'+
                               '<span><I class="fa fa-minus"></I></span>'+
                               '<input type="text" value="'+product.Qty+'"class="qty qtycount">'+
                               '<span id="plus"><I aria-expanded="true" aria-controls="plus" class="fa fa-plus"></I></span> </div>'+
                      '</div>';

                      let plus = document.querySelector(".fa-plus");
                      let minus = document.querySelector(".fa-minus");
                      let qty = document.querySelector(".qty");
                      
                      if(plus)
                      {
                          plus.addEventListener('click', function () {
                              var increment = parseInt(qty.value);
                              if (increment < increment + 1) {
                                  increment = increment + 1;
                                  qty.value = increment;
                                  product.Qty = increment;
                                  window.localStorage.setItem("eyeViewCartProduct",JSON.stringify(product));
                              }
                          });
                      }
                      
                      if(minus)
                      {
                          minus.addEventListener('click', function () {
                              var decrement = parseInt(qty.value);
                              if (decrement > 1) {
                                  decrement = decrement - 1;
                                  qty.value = decrement;
                                  product.Qty = decrement;
                                  window.localStorage.setItem("eyeViewCartProduct",JSON.stringify(product));
                              }
                          });
                           
                      }
                      



       
                      document.getElementById("previewButton").innerHTML = '<button class="btn bg-maincolor " onclick="viewAddToCart()">ADD TO CART</button>'+
                      '<button class="btn bg-maincolor" onclick="buyNowView()">BUY NOW</button>'+
                     '<span class="heart ms-auto  "><i class="fa fa-heart-o"></i></span>';
                     
                     let heart = document.querySelector(".fa-heart-o");

                            if(heart)
                            {
                                heart.addEventListener('click', function () {
                                    if (heart.classList.contains('fa-heart-o')) {
                                        heart.classList.remove('fa-heart-o');
                                        heart.classList.add('fa-heart');
                                        eyeViewWishCart (product);

                                    } else {
                                        heart.classList.add('fa-heart-o');
                                        heart.classList.remove('fa-heart');
                                        removeWishCartItem(product.id);
                                    }
                                
                                });
                                
                            }

        
            
                           
    }

    
}

if(document.getElementById("eyeViewProductArea") !== null)
displayEyeViewCart();

// already iten in wishlist ck function from view cart page

 let heart = document.querySelector(".fa-heart-o");

function checkWishItem () {
    let storageWishcart = JSON.parse(window.localStorage.getItem("wishCartProduct")) || [];
    let product = JSON.parse(window.localStorage.getItem("eyeViewCartProduct"));
                        
    if(storageWishcart.length >0){
        let match = checkMatch(product,storageWishcart);
        if(match) {
            heart.classList.remove('fa-heart-o');
            heart.classList.add('fa-heart');
        }
    } 
}

if(heart)
checkWishItem ();

// add to cart from product view cart page 

function viewAddToCart () {
    let product = JSON.parse(window.localStorage.getItem("eyeViewCartProduct"));
    stiredCartId(product);  
    document.location = "./cart_page.html"  
}

// direct buy from view cart function

function buyNowView () {
    let product = JSON.parse(window.localStorage.getItem("eyeViewCartProduct"));
    stiredCartId(product);  
    document.location = "./checkout_page.html"
}


//222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222











// function storgeWishId (wisId){
//     getProductDetails(filePath,wisId);
//     let wishListTotalCount = localStorage.getItem("wishListTotalCount");
//     let chekWishListStorage = localStorage.getItem("wishLiCount"+wisId);
//     if(chekWishListStorage == wisId){

//     }
//     else{
//         localStorage.setItem("wishLiCount"+wisId,wisId);
//         wishListTotalCount ++;
//         localStorage.setItem("wishListTotalCount",wishListTotalCount);
//         document.getElementById("wishListitemCount").innerHTML = localStorage.getItem("wishListTotalCount");
//     }
// }







// get product to locat storage

// let productView ="",
// storageValue="",
// proDiscount=0,
//     proCount = 0,
//     proQtyId="";
    


















    // async function getStorageProductrrrrrrr(getPro , addClass){
    //     let priceArray=0,
    //     totalArray=0,
    //     discountArray=0,
    //     proInnerHtml="",
    //     shippingCharge = 0;
       
    // if(localStorage.getItem("cartCount")> 0){
    // fetch(getPro)
    // .then(res => res.json())
    // .then(json =>{
    //     productView = json;
    //     console.log("hello222222222fffffffff")
           
    //     productView.products.forEach((product)=>{
    //         storageValue =localStorage.getItem("Deepak"+product.id);
    //         if(product.id == storageValue){
    //             console.log("hello222222222")
    //             if(addClass !== 0){
    //        proInnerHtml = '<div class="row border mb-5 " id="product' + product.id + '">'+
    //            ' <div class="col">'+
    //               '  <div class="row p-3 pt-3">'+
    //                    '<div class="col-9">'+
    //                         '<div class="row ">'+
    //                             '<div class="col-4">'+
    //                                 '<img class=" img-fluid" src="./image/product'+product.id+'.png" alt="product image">'+
    //                             '</div>'+
    //                             '<div class="col-8">'+
    //                                 '<p class="fw-bold text-capitalize mb-2 ">yours Favourite premium quality natural...</p>'+
    //                                 '<p class="text-muted text-capitalize mb-2">Color : White</p>'+
    //                                 '<p class="text-muted text-capitalize mb-5">sold by : macmerise celfie design peivite limited</p>'+
    //                                 '<div class="d-flex ">'+
    //                                     '<select class=" bg-light me-5 form-select" aria-label="Default select example">'+
    //                                         '<option class="fw-bold text-capitalize" selected> Size : Onsize</option>'+
    //                                         '<option value="small">Small</option>'+
    //                                         '<option value="medium">Medium</option>'+
    //                                         '<option value="xl">XL</option>'+
    //                                         '<option value="xxl">XXL</option>'+
    //                                       '</select>'+
    //                                       '<select class=" bg-light form-select proQty" id="proQty'+product.id+'" aria-label="Default select example" onclick="SelectFunction('+"proQty"+product.id+',' +product.id+')">'+
    //                                         '<option class="fw-bold text-uppercase" selected>'+localStorage.getItem("productQTY"+product.id)+'</option>'+
    //                                         '<option value="1">1</option>'+
    //                                         '<option value="2">2</option>'+
    //                                         '<option value="3">3</option>'+
    //                                         '<option value="4">4</option>'+
    //                                         '<option value="5">5</option>'+
    //                                       '</select>';

                                    // let QtySelect = document.getElementById("proQty"+product.id);
                                    // console.log(QtySelect)
                                    // let selectQtyValue = QtySelect.options[QtySelect.selectedIndex].value

                                    // console.log(selectQtyValue);
                                    



                                    // proInnerHtml +=  '</div>'+
                                    
                        //         '</div>'+
                        //    '</div>'+
                            
                        // '</div>'+ 
                        // '<div class="col-3 text-end">';
                            //  proQtyId = document.querySelector("#proQty");
                            // //  proQtyId.style.display = "none";
                            // // proCount = proQtyId.options[proQtyId.selectedIndex].value;
                            // proCount = window.localStorage.getItem("productQTY"+product.id);
                            // proInnerHtml +='<p class="fw-bold mb-1" >Rs <span id ="itemPriceView'+product.id+'" > '+product.priceAfterDiscount*proCount+'</span></p>';
                            // '<p class="mb-2"><del class=" ">Rs '+product.price*proCount+'</del>';
                            // if (product.priceAfterDiscount == 0) {} else {
                            //     proDiscount = product.price*proCount - product.priceAfterDiscount*proCount;
                            //     proDiscount = 100 /( product.price*proCount )* proDiscount;
                            //     proInnerHtml += '<span class="maincolor fw-bold">(' + parseInt(proDiscount) + '% off)</span></p>';
                            //     proDiscount = 0;
                            // }
                            
                            
            //               proInnerHtml +=  '<p class="mutied"> Delivery in 4-6 days</p>'+
            //             '</div>'+
            //         '</div>'+
            //         '<div class="row border">'+
            //             '<div class=" col py-3 px-md-4 ">'+
            //                 '<button class="btn btn-outline-light text-dark fs-5 me-4 fw-bold" onclick="removeItem('+product.id+')" action="#"> Remove</button>'+
            //                 '<span>|</span>'+
            //                 '<button class="btn btn-outline-light text-dark fs-5 ms-4 fw-bold" onclick="moveToWishList('+product.id+')"> Move To Wishlist</button>'+
            //             '</div>'+
            //         '</div>'+
            //     '</div>'+
            // '</div>';
            
            // if(document.querySelector("#productCartView")!==null)
            // document.querySelector("#productCartView").innerHTML += proInnerHtml;
            // // if(addClass !== 0)
            // document.querySelector("#product"+product.id).classList.add("down-to-up");
            //             }                                                                                                                                                                                                                                                                       
            // proCount = window.localStorage.getItem("productQTY"+product.id);

            //      if(addClass == 0){
            //         document.getElementById("itemPriceView"+product.id).innerHTML = product.priceAfterDiscount*proCount
            //      }

            // priceArray += product.price*proCount;
            // document.getElementById("priceDetails").innerHTML = parseInt(priceArray);

            // discountArray +=  product.price*proCount - product.priceAfterDiscount*proCount;
            // document.getElementById("bagDiscount").innerHTML = parseInt(discountArray);

            // totalArray =parseInt( priceArray-discountArray);
            // document.getElementById("orderTotal").innerHTML = totalArray;

            // shippingCharge = document.getElementById("delivaryCharge").innerHTML;
            // if(shippingCharge >0){
            //     document.getElementById("totalALL").innerHTML = +shippingCharge+totalArray;
            //     if(document.getElementById("showTotal")!==null)
            //     document.getElementById("showTotal").innerHTML = +shippingCharge+totalArray;
            //     if(document.getElementById("checkoutPrice")!==null)
            //     document.getElementById("checkoutPrice").innerHTML = +shippingCharge+totalArray;
            // }else{
            //     document.getElementById("totalALL").innerHTML = totalArray;
            //     if(document.getElementById("showTotal")!==null)
            //     document.getElementById("showTotal").innerHTML = totalArray;
            //     if(document.getElementById("checkoutPrice")!==null)
            //     document.getElementById("checkoutPrice").innerHTML = totalArray;

            // }
           

//             document.getElementById("ShowItemCount").innerHTML = localStorage.getItem("cartCount");
//         }
//         })
//     })
// }else{
//     document.getElementById("tableView").innerHTML = "";
//     document.getElementById("showTotal").innerHTML = 0;

// }
// }
// if(document.querySelector("#productCartView") !== null)
// getStorageProduct(filePath);


// remove item function from cart 

// function removeItem(removeFile){
//     removeCartItem(removeFile);
//   localStorage.removeItem("Deepak"+removeFile);
//   localStorage.removeItem("productQTY"+removeFile);
//   storageCartCount = localStorage.getItem("cartCount");
//   if(storageCartCount>0){
//     storageCartCount --;
//     localStorage.setItem("cartCount",storageCartCount);
//     document.getElementById("itemCount").innerHTML = storageCartCount;
//     document.getElementById("ShowItemCount").innerHTML = localStorage.getItem("cartCount");
//   }
//     document.getElementById("product"+removeFile).classList.remove("down-to-up");
//     document.getElementById("product"+removeFile).classList.add("fade-out");
// setTimeout(function(){
// // alert("milan")
//     document.querySelector("#productCartView").innerHTML = "";

//     // getStorageProduct(filePath);
//     displayCartView()
// },1000)

// };


// remove from wishlist 

// function removeItemWL(removeWL){
//     removeWishCartItem(removeWL);
//     localStorage.removeItem("wishLiCount"+removeWL);
//     gettotalStrogeWishList= localStorage.getItem("wishListTotalCount");
//     if(gettotalStrogeWishList > 0){
//         gettotalStrogeWishList --;
//         localStorage.setItem("wishListTotalCount",gettotalStrogeWishList);
//         document.getElementById("wishListitemCount").innerHTML = gettotalStrogeWishList;
//         if(document.getElementById("wishListUppershow") !== null)
//         document.getElementById("wishListUppershow").innerHTML = localStorage.getItem("wishListTotalCount");
        
//     }
//     if(document.getElementById("product"+removeWL) !== null)
//     document.getElementById("product"+removeWL).classList.remove("down-to-up");
//     document.getElementById("product"+removeWL).classList.add("fade-out-left");
//     setTimeout(function(){
//         document.getElementById("product"+removeWL).innerHTML = "";

//     },1000);
// }


// move item from cart to wishlist 
1

// function moveToWishList (moveId){
//     cartToWishCart(moveId);
//     storgeWishId (moveId);
//     removeItem(moveId);
    
   
// }

// function addToCart (moveCartID){
//     wishCartToCart(moveCartID);
//     removeItemWL(moveCartID);
//     storgeId(moveCartID);  
// }


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// function SelectFunction (QtySelect,selectProId) {

//     let selectQtyValue = QtySelect.options[QtySelect.selectedIndex].value
//     let DemoNumber =JSON.parse(window.localStorage.getItem("cartProduct"));
//     console.log("this is selected number", DemoNumber) 
    
//      localStorage.setItem("productQTY"+selectProId,selectQtyValue);
//      if(selectQtyValue == DemoNumber){}else {
//             // document.querySelector("#productCartView").innerHTML = "";
//             // getStorageProduct(filePath, 0);
//         }
// }





// wishlist expose function 

// var listJsonData = "";
// let wishlistGet = "",
//     listInnerHtml = "";


// async function wishListExposerrrrrr(listFilePath){
//     fetch(listFilePath)
//     .then(res => res.json())
//     .then(json =>{
//         listJsonData = json;
//         console.log("helllllllllllpppppp")
//         listJsonData.products.forEach(product=>{
//             wishlistGet = localStorage.getItem("wishLiCount"+product.id);
//             if(product.id == wishlistGet){
//                  listInnerHtml = '<div class="row border mb-5 down-to-up " id="product' + product.id + '">'+
//                  '<div class="col">'+
//                      '<div class="row p-3 pt-3">'+
//                          '<div class="col-4">'+
//                             '<img class=" img-fluid border" src="./image/product'+product.id+'.png" alt="product image">'+
//                          '</div>'+
//                          '<div class="col ">'+
//                              '<p class="fw-bold text-capitalize mb-2 ">yours Favourite premium quality natural...</p>'+
//                              '<div class="pcardstar d-flex align-items-baseline">';
//                             let lowStar = 5 - product.ratings;
//                              if (product.ratings == 5)
//                                 lowStar = 0;
//                             let reviews = "";
//                              for (let i = 0; i < product.ratings; i++)
//                                  reviews += ' <i class="fa fa-star"></i>';
//                              for (let j = 0; j < lowStar; j++)
//                                  reviews += ' <i class="fa fa-star-o"></i>';
//                                  listInnerHtml  += reviews + ' <span>' + product.ratings + '/5 </span>';
//                              reviews = "";
//                              listInnerHtml += '<p class="text-black ms-2">( <span>2850</span> )</p>'+
//                              '</div>'+
//                              '<p class="fw-bold mb-1">Rs '+product.priceAfterDiscount+' <del class="text-muted ">Rs '+product.price+'</del>';
//                              if (product.priceAfterDiscount == 0) {} else {
//                              let proDiscount = product.price - product.priceAfterDiscount;
//                                  proDiscount = 100 / product.price * proDiscount;
//                                 listInnerHtml += '<span class="maincolor fw-bold">(' + parseInt(proDiscount) + '% off)</span></p>';
//                                 proDiscount = 0;
//                             }

                
//                             listInnerHtml +='<select class=" bg-light form-select w-25 my-4" aria-label="Default select example">'+
//                                  '<option class="fw-bold text-uppercase" selected>Select Pack of'+
//                                  '</option>'+
//                                  '<option value="1">1</option>'+
//                                  '<option value="2">2</option>'+
//                                  '<option value="3">3</option>'+
//                                  '<option value="4">4</option>'+
//                                  '<option value="5">5</option>'+
//                              '</select>'+
//                              '<div class="">'+
//                                  '<button class="btn btn-maincolor fs-6 me-4 fw-bold" onclick="addToCart('+product.id+')"> Add to cart</button>'+
//                                  '<span>|</span>'+
//                                  '<button class="btn btn-outline-light text-muted fs-5 ms-0 fw-bold" onclick="removeItemWL('+product.id+')">Remove from Wishlist</button>'+
//                              '</div>'+
//                          '</div>'+
//                      '</div>'+
//                  '</div>'+
//              '</div>';

//                     if(listInnerHtml !==""){
//                         console.log("deepak")
//                         document.getElementById("wishList").innerHTML += listInnerHtml; 
//                     }
//                     document.getElementById("wishListUppershow").innerHTML = localStorage.getItem("wishListTotalCount");
//             }
//         })
//     })

// }

// if(document.getElementById("wishList") !== null){ 
//     wishListExpose(filePath);

// }



// eye view product view 


// function eyeProductView (eyeId) {
    
//     console.log("helo");
//     document.location = "./product_view_listing.html";
//     window.localStorage.setItem("eyeViewProduct",eyeId)
// }

// var sizeStr = "sizeNumber1";
// var loadEyeVIewJson = "";
//  let eyeViewHtml = "";
// function eyrJsonFunctionrrrrr (eyePath) {
//     console.log("helloooo i ma deepl")
//     fetch(eyePath)
//     .then(resp=>resp.json())
//     .then((json)=>{
//         loadEyeVIewJson = json;
//         console.log("helloooo i ma deepl")

//         loadEyeVIewJson.products.forEach(product=>{
//             eyeViewGet = window.localStorage.getItem("eyeViewProduct");
//             if(eyeViewGet == product.id){
//          eyeViewHtml =
         
        //  '<div class="row py-5 mx-2">'+
        //      '<div class="col">'+
        // //          '<div class="slider">'+
        //               document.getElementById("multipulImageViewBox").innerHTML =
        //                  '<div class="Product d-flex flex-column align-items-center justify-conten-evenly">'+
        //                  '<img src="./image/product'+product.id+'.png" onclick="imageView(this)" alt="">'+
        //                  '<img src="./image/product2.png" onclick="imageView(this)" alt="">'+
        //                  '<img src="./image/product3.png" onclick="imageView(this)" alt="">'+
        //                  '<img src="./image/product4.png" onclick="imageView(this)" alt="">'+
        //              '</div>';
                     
                     
        //              '<div class="preview">'+
                         //  document.getElementById("previewImag").innerHTML = '<img src="./image/product'+product.id+'.png" id="preview" alt="">';
        //              '</div>'+
        //          '</div>'+
        //      '</div>'+
        //      '<div class="col">'+
        //          '<h4 class="fw-bold">Classic Chinos Pants</h4>'+
        //          '<i class=" star-0 fa fa-star" onclick="star("star-0")"></i>'+
        //          '<i class=" star-1 fa fa-star" onclick="star("star-1")"></i>'+
        //          '<i class=" star-2 fa fa-star" onclick="star("star-2")"></i>'+
        //          '<i class=" star-3 fa fa-star" onclick="star("star-3")"></i>'+
        //          '<i class=" star-4 fa fa-star-o" onclick="star("star-4")"></i>'+
        //          '<p class=" greentext"><span>39,122</span> rating | 1000+ answered questions</p>'+

        //          '<p class="fw-bold fs-4 ">

                                // if (product.priceAfterDiscount == 0) {} else {
                                //     proDiscount = product.price - product.priceAfterDiscount;
                                //     proDiscount = 100 / product.price* proDiscount;
                                //     document.getElementById("priceDetailsView").innerHTML = 'Rs <span>'+product.priceAfterDiscount+'</span> <del>Rs '+product.price+'</del> <span'+
                                //     'class="maincolor fw-bold" id="maincolor">(' + parseInt(proDiscount) + '% off)</span>';                  
                                //     proDiscount = 0;
                                // }


         //             </p>'+

        //          '<h6 class="fw-bold pt-2 mb-1">Short Description</h6>'+
        //          '<p class="mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, assumenda,'+
        //              'officia sed ipsum nisi quam laborum vel aliquid sunt quisquam exercitationem. Provident, nisi'+
        //              'reiciendis aspernatur expedita iure odit. Voluptates, cupiditate!</p>'+
        //          '<div class="choice mb-4 d-flex justify-content-between align-items-center">'+
        //              '<div class="size">'+
        //                  '<p class="fw-bold">SELECT SIZE</p>'+
        //                  '<ul class="d-flex p-0">'+
        //                      '<li class="sizeNumber sizeNumber1" onclick="active('+product.id+')">39</li>'+
        //                      '<li class="sizeNumber sizeNumber2" onclick="active('+sizeStr+')">40</li>'+
        //                      '<li class="sizeNumber sizeNumber3" onclick="active(3)">42</li>'+
        //                      '<li class="sizeNumber sizeNumber4" onclick="active(sizeNumber)">44</li>'+
        //                  '</ul>'+
        //              '</div>'+
        //              '<div class="">'+
                    //   document.getElementById("qtyBoxHTML").innerHTML = '<p class=" fw-bold">QTY</p>'+
                    //       '<div class="qtybox">'+
                    //            '<span><I class="fa fa-minus"></I></span>'+
                    //            '<input type="text" value="'+localStorage.getItem("productQTY"+product.id)+'"class="qty qtycount">'+
                    //            '<span id="plus"><I aria-expanded="true" aria-controls="plus" class="fa fa-plus"></I></span> </div>'+
                    //   '</div>';

                    //   let plus = document.querySelector(".fa-plus");
                    //   let minus = document.querySelector(".fa-minus");
                    //   let qty = document.querySelector(".qty");
                      
                    //   if(plus)
                    //   {
                    //       plus.addEventListener('click', function () {
                    //           var increment = parseInt(qty.value);
                    //           if (increment < increment + 1) {
                    //               increment = increment + 1;
                    //               qty.value = increment;
                    //               window.localStorage.setItem("productQTY"+product.id,increment);
                    //           }
                    //       });
                    //   }
                      
                    //   if(minus)
                    //   {
                    //       minus.addEventListener('click', function () {
                    //           var decrement = parseInt(qty.value);
                    //           if (decrement > 1) {
                    //               decrement = decrement - 1;
                    //               qty.value = decrement;
                    //               window.localStorage.setItem("productQTY"+product.id,decrement);
                    //           }
                    //       });
                           
                    //   }
                      



        //          '</div>'+
        //          '<div class="d-flex align-items-center mb-4">'+
                    //   document.getElementById("previewButton").innerHTML = '<button class="btn bg-maincolor " onclick="viewAddToCart('+product.id+')">ADD TO CART</button>'+
                    //   '<button class="btn bg-maincolor" onclick="buyNowView('+product.id+')">BUY NOW</button>'+
                    //  '<span class="heart ms-auto  "><i class="fa fa-heart-o"></i></span>';
                    //  let heart = document.querySelector(".fa-heart-o");

                    //         if(heart)
                    //         {
                    //             heart.addEventListener('click', function () {
                    //                 if (heart.classList.contains('fa-heart-o')) {
                    //                     heart.classList.remove('fa-heart-o');
                    //                     heart.classList.add('fa-heart');
                    //                     storgeWishId (product.id);

                    //                 } else {
                    //                     heart.classList.add('fa-heart-o');
                    //                     heart.classList.remove('fa-heart');
                    //                     removeItemWL(product.id);
                    //                 }
                                
                    //             });
                                
                    //         }

        //          '</div>'+
        //          '<div class=" d-flex align-items-center mb-4">'+
        //              '<p class="fw-bold mb-0">SHARE THIS</p>'+
        //              '<ul aria-label="socialmedia" tabindex="0" class="d-flex align-items-center ps-4 mb-0">'+
        //                  '<li><img tabindex="0" title="facbook" src="./image/facebook round.png" class="img-fluid "alt="facebook"></li>'+
        //                  '<li><img tabindex="0" title="youtube" src="./image/Group 2556.png" class="img-fluid" alt="youtube"></li>'+
        //                  '<li><img tabindex="0" title="twitter" src="./image/Group 2557.png" class="img-fluid" alt="twitter"></li>'+
        //              '</ul>'+
        //          '</div>'+
        //          '<div class=" d-flex align-items-center ">'+
        //              '<div class="delivery d-flex align-items-center justify-content-between me-5">'+
        //                  '<img src="./image/Image 170.png" style="width: 4rem;" alt="">'+
        //                  '<p class="mb-0 fw-bold ps-3">DELIVERY & RETURN</p>'+
        //              '</div>'+
        //              '<div class="support d-flex align-items-center justify-content-between ">'+
        //                  '<img src="./image/Image 171.png" style="width: 3rem;" alt="">'+
        //                  '<p class="mb-0 fw-bold ps-3">ONLINE SUPPORT 24/7</p>'+
        //              '</div>'+
        //          '</div>'+

        //      '</div>'+
        //  '</div>';
         
        //  document.getElementById("eyeViewProductArea").innerHTML = eyeViewHtml;
            // }
        // })
        // window.localStorage.removeItem("eyeViewProduct");
    // })
    
// }

// if(document.getElementById("eyeViewProductArea") !== null)
// eyrJsonFunction (filePath);

// function viewAddToCart (viewAddId) {
//     console.log("this is add to cart function ", viewAddId)
//     stiredCartId(viewAddId);  
//     window.location = "./cart_page.html"  
// }

// function buyNowView (buyNowId) {
//     stiredCartId(buyNowId);
//     document.location = "./checkout_page.html"
// }







// // checkout function ?




//  if(document.getElementById("checkoutItem") !== null){

//     document.getElementById("checkoutItem").innerHTML = window.localStorage.getItem("cartCount");
//     getStorageProduct(filePath);
//  }






