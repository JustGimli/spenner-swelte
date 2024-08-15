<script lang="ts">

    import Button from './Button.svelte';
  import { formatNumber } from './number';
  
    export let rouletteData: { items: App.SpinType[], winId: number };
    export let close: () => Promise<void>;
  
    let tg = $context('tg');
  
    const share = () => {
      let url = `https://t.me/BeamTapBot/?start=${user.value?.account.inviteCode}`;
      let shareText = `
        I just won an INCREDIBLE ${formatNumber(rouletteData.items[rouletteData.winId].total || 0)} ${rouletteData.items[rouletteData.winId].type === 'coin' ? 'coins' : 'tickets'} from BeamBot’s official Lootbox! 🤗\n\nCheck the epic rewards out now! 🔥\n\nJoin me on BeamBot and grab your own special surprise Lootbox ☘️\n\nLet’s see what you win 🏆 you won’t want to miss this! 👀
      `.trim();
  
      tg.webapp.openTelegramLink(
        'https://t.me/share/url?url=' +
          encodeURIComponent(url) +
          '&text=' +
          encodeURIComponent(shareText)
      );
    };
  </script>
  
  <div infade outfade class="wheel-congrat" onclick={close}>
    <h2>Congratulations!<br />You won</h2>
    <div class="wheel-congrat-prize">
      <div class="icon">
        <img src={rouletteData.items[rouletteData.winId]?.type === 'coin' ? '/coin.png' : '/ticket.png'} alt="" />
        <p>{formatNumber(rouletteData.items[rouletteData.winId]?.total || 0)}</p>
      </div>
      <div class="sun">
        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
    <p>You’re amongst the luckiest {rouletteData.items[rouletteData.winId]?.chance}% of players! Share with your friends to see if they can compete!</p>
    <div class="buttons">
      <Button onclick={share}>Share</Button>
      <Button onclick={close}>Close</Button>
    </div>
  </div>
  
  <style lang="scss">
    // стили для поздравительного сообщения
  </style>
  