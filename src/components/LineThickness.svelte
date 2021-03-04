<script lang="ts">
  export let strokeWidth: number;

  const lines: number[] = [1];

  for (let i = 1; i < 6; i++) {
    lines.push(i * 2);
  }

  const setWidth = (width: number): void => {
    strokeWidth = width;
  };
</script>

<div class="line__container">
  {#each lines as width}
    <div class="line" style="width: {width}px" on:click={() => setWidth(width)} />
  {/each}
</div>

<style>
  .line__container {
    display: flex;
    justify-content: space-between;
  }

  .line {
    cursor: pointer;
    height: 120px;
    background-color: black;
  }
</style>
