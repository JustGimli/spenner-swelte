<script lang="ts">
  import Wheel from "./compenents/Wheel.svelte";
  import type { RouletteData } from "./types";
  import "./app.scss"


	const rouletteData: RouletteData = {
	items: [
		{ total: 100, chance: 10, type: 'coin', id: 1 },
		{ total: 50, chance: 20, type: 'ticket', id: 2 },
		{ total: 200, chance: 5, type: 'coin', id: 3 },
		{ total: 75, chance: 15, type: 'ticket', id: 4 },
		{ total: 150, chance: 12, type: 'coin', id: 5 }, // Новый id
		{ total: 60, chance: 18, type: 'ticket', id: 6 }, // Новый id
		{ total: 250, chance: 8, type: 'coin', id: 7 },  // Новый id
		{ total: 80, chance: 14, type: 'ticket', id: 8 }, // Новый id
		{ total: 110, chance: 11, type: 'coin', id: 9 },  // Новый id
		{ total: 55, chance: 19, type: 'ticket', id: 10 }, // Новый id
		{ total: 220, chance: 6, type: 'coin', id: 11 },  // Новый id
		{ total: 70, chance: 16, type: 'ticket', id: 12 }, // Новый id
		{ total: 130, chance: 13, type: 'coin', id: 13 },  // Новый id
		{ total: 40, chance: 22, type: 'ticket', id: 14 }, // Новый id
		{ total: 240, chance: 7, type: 'coin', id: 15 },  // Новый id
		{ total: 85, chance: 17, type: 'ticket', id: 16 }  // Новый id
	],
	winId: 2
};


	const callback = async () => {
		// Логика после окончания спина
	};
</script>

<Wheel {rouletteData} {callback} />

