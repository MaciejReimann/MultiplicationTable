<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
  export let onSubmit;
  export let onNavigate;
  export let onFocus;
  export let isFocused;
  export let maxLength;

  const value = Math.ceil(Math.random() * 1000);

  onMount(() => {
    console.log("mounted", value);
  });

  onDestroy(() => {
    console.log("onDestroy", value);
  });

  beforeUpdate(() => {
    console.log("beforeUpdate", value);
  });
  afterUpdate(() => {
    console.log("afterUpdate", value);
  });

  let inputNode;
  let inputValue = "";
  let isInvalid = false;

  $: isFocused && inputNode && inputNode.focus();
  $: isInvalid = inputValue && isNaN(parseInt(inputValue));

  function handleSubmit(e) {
    !isInvalid && onSubmit(e.target.value);
  }

  function handleKeydown(e) {
    !isInvalid && onNavigate(e.key);
  }

  function handleInput() {
    isInvalid && console.log("It's invalid!!!");
  }

  function handleFocus() {
    onFocus();
  }
</script>

<style>
  input {
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0;
    color: blue;
  }
  .invalid {
    background-color: pink;
  }

  input:focus {
    outline: none;
  }
</style>

<input
  type="text"
  maxlength={maxLength}
  class:invalid={isInvalid}
  bind:this={inputNode}
  bind:value={inputValue}
  on:input={handleInput}
  on:change={handleSubmit}
  on:focus={handleFocus}
  on:keydown={handleKeydown} />
