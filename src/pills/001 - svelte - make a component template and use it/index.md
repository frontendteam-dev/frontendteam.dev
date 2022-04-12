---
title: How to create a new component in svelte using a template - svelte component scaffolding and boilerplate
description: Create components in seconds using this template and a cli
layout: layouts/post
image: svelte-pills-scaffold-template.jpg
imageAlt: Create components in seconds using this template and a cli
permalink: /pills/svelte-component-template-scaffold-cli/
tags: ['svelte','component','cli', 'development', 'DX', 'frontend pills']
author: Salvatore Romeo
authorLink: https://linkedin.com/in/salvatoreromeo
---

## Why 
Creating new components is probably one of the things you do most in svelte.

And to maximize the developer experience, you must automate every task that you do often.

**It's not just to save time, but also to avoid repetitive tasks that annoy and distract us developer.**

Here we'll learn hot to create your customized component template once and use it everytime.

## How
So imagine to write this command:

`npx t6e $name.svelte src/components name=my-component`

and get the component as you would have written it, ready into the `src/component` folder.


It's easy:

1) Create the template. Here you can find the one we use into our _svelte_ projects:
```
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  const dispatch = createEventDispatcher();
  
  const store = writable({
    hello: ""
  });
  
  
</script>

<div class="$name">
    {$store.hello}
</div>

<style lang="scss">
    .$name {
        @apply block
    }
</style>
```

2) name it `$name.svelte` and put it in a `templates` folder

3) to create your component, run 

`npx t6e templates/$name.svelte src/components name=counter`

4) you're done. A new fresh component was save in the `src/components/counter.svelte`: 
`$name` was replaced by `counter` in both the **file name** and the **file content** 

You can now re-use that template for all your components, saving hours every month.

## What is t6e?

**T6e** is an open source scaffolder, boilerplater or put simply it lets you 
create any file based on your custom templates.

We created a template for svelte above, but you can create any template and reuse it as you like with this 
small open-source tool provided by us at [butopen](https://butopen.com)

You can find **t6e** here:

[https://github.com/butopen/t6e](https://github.com/butopen/t6e)
