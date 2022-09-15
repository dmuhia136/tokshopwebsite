import{j as t,r as d,e as C,h as g,a}from"./moreBigLibs.00d880fd.js";import{d as v,u as I,e as B,g as _,F,h as R,i as j,j as T,k as U,R as W,l as w}from"./index.cb0bc5b0.js";import{S as y,q as E,Q as z,G as Q}from"./bigLibs.c150cb44.js";import"./agora.0fcbc9c9.js";import"./stripe.ab219216.js";const G=()=>t("form",{children:t("button",{children:"Submit"})}),O=()=>{const[x,o]=d.exports.useState([]),[e,f]=d.exports.useState({}),[u,r]=d.exports.useState(!1),b=C(v),h=g(v),{_id:s}=g(I),{Axios:i}=B();let N=_();const[m,J]=d.exports.useState(0),[k,K]=d.exports.useState(0),[H,$]=d.exports.useState(""),[P,S]=d.exports.useState(!1),q=C(I);return{shipping:e,getShippingByUserId:async()=>{r(!0);try{let{data:p}=await i.get(`/address/all/${s}`);o(p),r(!1)}catch{r(!1)}},userShippings:x,load:u,handleSubmit:async p=>{r(!0);let A=h.filter(n=>n.sellerId._id!==s).map(n=>{var l;return Object.assign({},{},{subTotal:n.price,shippingFee:m,tax:k,productId:n.productId,shopId:n.shopId,quantity:n.quantity,productOwnerId:n.sellerId,shippingId:e==null?void 0:e._id,shippingAddress:`{"name": "${e==null?void 0:e.name}","addrress1": "${e==null?void 0:e.addrress1}","addrress2": "${e==null?void 0:e.addrress2}","city": "${e==null?void 0:e.city}","state":"${e==null?void 0:e.state}","phone": "${e==null?void 0:e.phone}","userId": "${(l=e==null?void 0:e.userId)==null?void 0:l._id}"}`})});try{let{data:{user_balance:n}}=await i.post(`/orders/${s}`,{order:A});r(!1),q(l=>({token:l.token,_id:l._id,userName:l.userName,profilePhoto:l.profilePhoto,phoneNumber:l.phoneNumber,email:l.email,firstName:l.firstName,lastName:l.lastName,wallet:n,roomuid:l.roomuid})),y.fire({icon:"success",title:"Your order has been placed",timer:1500}),b([]),S(!1),N("/")}catch(n){r(!1),y.fire({icon:"error",title:n.response.data.message})}},handleChange:async p=>{r(!0);try{let{data:c}=await i.get(`/address/${p.target.value}`);$(c.name),f(c),r(!1),S(!0)}catch{r(!1),y.fire({icon:"error",text:"This shipping address is not available"})}},shippingName:H,getShippingById:async p=>{r(!0);try{let{data:c}=await i.get(`/address/${p}`);$(c.name),f(c),r(!1)}catch{r(!1),y.fire({icon:"error",text:"This shipping address is not available"})}},openPreview:P,setOpenPreview:S}},L=()=>{const{renderSpinner:x}=j(),{shipping:o,handleChange:e,getShippingByUserId:f,userShippings:u,load:r,shippingName:b}=O();let h=_();return d.exports.useEffect(()=>{f()},[]),a("div",{className:"flex w-full flex-col relative",children:[a("div",{onClick:()=>h("/orders"),className:"flex  flex-row w-[15rem] md:w-[20rem] px-[1.2rem] md:px-[2rem] py-[0.5rem] \r shadow-xl self-center md:self-start rounded-xl text-blue-30 space-x-3 mt-[3rem] \r items-center cursor-pointer my-[3rem] group hover:bg-gray-20 hover:text-white",children:[t(F,{icon:R,className:"self-center text-[1.1rem] group-hover:text-white"}),t("p",{className:"text-blue-40 text-[0.9rem] md:text-[1.1rem] font-[500]\r group-hover:text-white",children:"Go back and input new info."})]}),t("p",{className:"labels",children:"Final Step. Place your order"}),a("div",{className:"flex flex-col gap-y-[0.1rem] w-full md:w-[40%]  ",children:[a("select",{onChange:e,required:!0,id:"shipping",className:"inputs",children:[a("option",{disabled:!0,selected:!0,value:"",className:"inputs",children:[" ","-- select a shipping address --"," "]}),u==null?void 0:u.map((s,i)=>t("option",{id:s.name,value:s==null?void 0:s._id,className:"inputs",children:s==null?void 0:s.name},i))]}),t("div",{className:"mt-[1rem]",children:x(r)}),t("div",{className:"flex w-full justify-between",children:t("button",{type:"button",disabled:(o==null?void 0:o._id)===void 0,onClick:()=>h(`/orders/preview/${o._id}`),className:"blue-btn",children:"Preview order"})})]})]})};E("light",{text:{fontSize:"2rem",fontWeight:"2px",primary:"#000000"},background:{default:"inherit"}});const Y={cells:{style:{minHeight:"72px",fontSize:"1rem",fontWeight:"500"}},headCells:{style:{fontSize:"1.5rem",fontWeight:"600"}}},D=()=>{const x=g(v),o=g(T),{handleSubmit:e,load:f,shippingName:u,getShippingById:r}=O(),{renderSpinner:b}=j(),{wallet:h}=g(I);let{addressId:s}=U();d.exports.useEffect(()=>{r(s)},[]);const i=[{name:"Name",selector:m=>m.name},{name:"Quantity",selector:m=>m.quantity},{name:"Cost($.)",selector:m=>m.price}],N=()=>a("div",{className:"flex flex-col space-y-4 mb-2 text-[0.9rem] font-[600] mt-6",children:[a("p",{className:"text-gray-20  justify-self-start",children:["Subtotal:",a("span",{className:"text-blue-30",children:[" $",o]})]}),a("p",{className:"text-gray-20 justify-self-start",children:["Wallet balance:",a("span",{className:"text-blue-30",children:[" $.",h-o]})]}),a("p",{className:"text-gray-20 justify-self-start",children:["Shipping Address:",a("span",{className:"text-blue-30",children:[" ",u]})]}),t("button",{onClick:()=>e(s),className:"text-blue-30 border-blue-30 border-2 px-4 py-1 rounded-md w-64\r hover:bg-blue-30 hover:text-white font-[700]",children:"Place order"})]});return a("div",{className:"flex flex-col flex-nowrap w-screen ml-[-2rem]  px-4 py-1  ",children:[b(f),t("div",{className:"flex flex-col self-start justify-self-start w-[86%] border-2",children:t(z,{columns:i,data:x,responsive:!0,pagination:!0,customStyles:Y,subHeaderWrap:!0,striped:!0,title:"Orders",theme:"light",fixedHeader:!0,fixedHeaderScrollHeight:"500px",pointerOnHover:!0,className:"bg text-color",subHeader:!0,subHeaderAlign:Q.LEFT})}),N()]})},le=()=>t("div",{className:"flex flex-col w-full relative px-[3rem] py-[2rem] lg:py-[1rem]",children:a(W,{children:[t(w,{path:"/",element:t(G,{})}),t(w,{path:"/existing",element:t(L,{})}),t(w,{path:"/preview/:addressId",element:t(D,{})})]})});export{le as default};
