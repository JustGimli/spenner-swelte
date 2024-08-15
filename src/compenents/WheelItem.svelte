<script lang="ts">
  import { formatNumber } from "./number";


    const  {item}: {item: : App.SpinType }= $props();
  </script>
  
  <li data-id={item.id}>
    <img src={item.type === 'coin' ? '/coin.png' : '/ticket.png'} alt="" />
    <p class="total">{formatNumber(item.total)}</p>
  </li>
  
  <style lang="scss">
  </style>
  