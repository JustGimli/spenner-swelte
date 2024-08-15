<script lang="ts">
    import { onMount } from 'svelte';
    import { formatNumber } from '@repo/utils/number';
    import { tg, user } from 'stores';
    import { beforeNavigate, goto } from '$app/navigation';
    import WheelItem from './WheelItem.svelte';
    import Congratulation from './Congratulation.svelte';
    import Button from './Button.svelte';
  
    export let rouletteData: {
      items: App.SpinType[];
      winId: number;
    };
  
    export let callback: () => Promise<void>;
  
    let wheel: HTMLDivElement;
    let wheelList: HTMLUListElement;
  
    let left = 0;
    let wheelElemWidth = (wheelList?.clientWidth || 1) / 3 - 15 * 2;
    let step = 0;
  
    let speed = 50;
  
    let lastTimestamp = 0;
  
    let animId = 0;
  
    let startTime: Date;
    let isRunning = false;
    let isStopped = false;
  
    beforeNavigate((nav: any) => {
      if (isRunning) nav.cancel();
    });
  
    const movement = (timeStamp: number) => {
      // Логика движения рулетки
      const deltaTime = (timeStamp - lastTimestamp) / 1000;
      lastTimestamp = timeStamp;
  
      if (wheelList) {
        if (wheelElemWidth - left < 0) {
          const items = Array.from(wheelList.children) as HTMLLIElement[];
          const firstChild = wheelList.removeChild(items[0]);
          wheelList.insertAdjacentElement('beforeend', firstChild);
          left = -16;
        }
  
        step++;
        left += speed * deltaTime;
  
        if (isRunning && new Date().getSeconds() - (startTime?.getSeconds() || 0) > 1) {
          const elem = document.querySelector(
            `[data-id="${rouletteData.winId}"]`
          ) as HTMLLIElement;
  
          const elemLeft = elem.getBoundingClientRect().left;
  
          if (
            elemLeft + wheelElemWidth / 1.5 - (wheel?.offsetWidth || 1) / 2 <= 5 &&
            elemLeft + wheelElemWidth / 1.5 - (wheel?.offsetWidth || 1) / 2 >= -5
          )
            return stop();
  
          if (
            elemLeft + wheelElemWidth / 1.5 - (wheel?.offsetWidth || 1) / 2 >
              wheelElemWidth * 4 &&
            speed > 450
          )
            speed = Math.max(speed - 750 * deltaTime, 850);
  
          if (
            elemLeft + wheelElemWidth / 1.5 - (wheel?.offsetWidth || 1) / 2 >
              wheelElemWidth &&
            speed > 200
          )
            speed = Math.max(speed - 2050 * deltaTime, 220);
        }
  
        const items = Array.from(wheelList.children) as HTMLLIElement[];
        for (const item of items) {
          item.style.translate = `${-left}px 0`;
        }
        start();
      }
    };
  
    const start = () => {
      animId = requestAnimationFrame(movement);
    };
  
    const stop = () => {
      if (animId) cancelAnimationFrame(animId);
      speed = 50;
      isRunning = false;
      isStopped = true;
      startTime = undefined;
      setTimeout(start, 1000);
    };
  
    const run = async () => {
      await getWinId(async () => {
        stop();
        left = 0;
        speed = 1200;
        startTime = new Date();
        isRunning = true;
        isStopped = false;
        start();
      });
    };
  
    const getWinId = async (callback: () => Promise<void>) => {
      const response = await fetch('/lootbox');
      if (response.status === 200) {
        const data = await response.json();
        rouletteData.winId = data.winId;
        callback();
      }
      if (response.status == 401) {
        tg.webapp.showAlert('Not enough tickets!');
      }
    };
  
    const close = async () => {
      if (user.value?.wallet.spins?.length !== 0) {
        isStopped = false;
        await callback();
      } else {
        goto('/daily');
      }
      const updatedData = await fetch('/api/user', { method: 'get' });
      if (updatedData.status === 200) {
        user.value = await updatedData.json();
      }
    };
  
    let showCongrat = isStopped && !isRunning;
  
    onMount(start);
  </script>
  
  <div class="wheel">
    <div class="wheel_indicator"></div>
    {#if user.value?.wallet.spins?.length !== 0}
      <p class="wheel_message">Open for 1 ticket</p>
      <p class="wheel_balance"><b>{user.value?.wallet.tickets}</b> tickets</p>
    {/if}
    <div class="wheel-wrapper" bind:this={wheel}>
      <ul class="wheel-elems" bind:this={wheelList} style:--width={`${wheelElemWidth}px`}>
        {#each rouletteData.items as item (item.id)}
          <WheelItem {item} />
        {/each}
      </ul>
    </div>
    <Button class="wheel_button" onclick={run} disabled={isRunning}>Spin</Button>
  </div>
  {#if showCongrat}
    <Congratulation {rouletteData} {close} />
  {/if}
  
  <style lang="scss">
    // стили перенесем сюда из основного файла
  </style>
  