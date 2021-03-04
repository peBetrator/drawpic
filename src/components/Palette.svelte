<script lang="ts">
  import type { PaletteColType } from './types';

  export let strokeColor: string;

  const width: number = 6;
  const height: number = 6;
  const rows: PaletteColType[][] = [];

  const getColor = (row: number, col: number): string => {
    const hue: number = Math.floor((col / height) * 360);
    const sat: number = 100;
    const lit: number = Math.floor((1 - (row + 1) / (width + 1)) * 100);

    return `hsl(${hue},${sat}%,${lit}%)`;
  };

  const setColor = (color: string): void => {
    strokeColor = color;
  };

  for (let i = 0; i < height; i++) {
    const cols: PaletteColType[] = [];

    for (let j = 0; j < width; j++) {
      cols.push({ color: getColor(j, i) });
    }

    rows.push(cols);
  }
</script>

<div class="palette">
  {#each rows as row}
    <div class="row">
      {#each row as { color }}
        <div class="col" style="background-color: {color}" on:click={() => setColor(color)} />{/each}
    </div>
  {/each}
</div>

<style>
  .palette {
    cursor: pointer;
  }

  .row {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  .col {
    width: 20px;
    height: 20px;
  }
</style>
