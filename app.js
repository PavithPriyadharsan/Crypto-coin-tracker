const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd; 
form.addEventListener('submit',(e)=>{

    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }

    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);

});

const fetchPrice= async(ctype) =>{
    const r = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ctype}&per_page=100&page=1&sparkline=false&locale=en`);
    console.log(r.data[0]);
     const price = r.data[0].current_price;
     const volume  = r.data[0].total_volume;
     const change = r.data[0].price_change_24h;
     const base = r.data[0].name;
     const target = 'USD';


     res.innerHTML =`<tr style="background-color:blue; color:white; font-weight:700">
     <td>
         Property
     </td>
     <td>Value</td>
 </tr>
 <tr>
     <td>
         ${base} - current price
     </td>
     <td>${price} ${target}</td>
 </tr>
 <tr>
     <td>
         Total volume
     </td>
     <td>${volume}</td>
 </tr>
 <tr>
     <td>
         Price change in 24hours
     </td>
     <td>${change}</td>
 </tr>`

    upd = setTimeout(()=>fetchPrice(ctype),1000000);

}