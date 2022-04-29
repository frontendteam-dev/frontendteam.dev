---
title: How to handle input keyup events after the user stops typing - Svelte actions and debouncing
description: Learn how to implement a Svelte action. Learn what debouncing is and how to take advantage of it. Then apply these concepts to implement a custom "on stop typing" Svelte action for our inputs
layout: layouts/post
image: onkeyup-javascript-svelte-action.jpg
imageAlt: Create a stepper pure css atomic component using tailwind
permalink: /pills/svelte-input-keyup-stop-writing-custom-event/
tags: ['svelte','keyup','event', 'input', 'developer experience']
author: Salvatore Romeo, PhD
authorLink: https://linkedin.com/in/salvatoreromeo
---

## Why we should implement a custom event in Svelte?

### The problem
I already know that when you need to handle some validation on text inputs, then you do it on keyup events.

And that is ok. Or not? 

Actually, if the user types fast, you would like to call a function only when he/she stops typing.

So you start to think about _setTimeout_ or _setInterval_ strategies to implement.

Well, you should know that there is a more abstract technique, called **debounce**.

But if you're using svelte, you should not implement debounce everytime you need this behaviour: **svelte _actions_ let you extend any HTML element with common logic**. 

And in this post we will see how to add a custom event to the input, to handle the use case above.

But let's proceed step by step.

### Input Validation

When working with inputs, **validation** is mandatory: it is necessary to perform some checks when the user stops typing, and not every time a key is pressed.

We want to have a tool to attach this behaviour easily to our inputs everytime.

### Autocomplete components

The same behavior is also useful in **autocomplete components**, where an action must be performed to decide which elements to show: if I execute it at each keypress I could soon block the system, especially if the action involves an **asynchronous call** to an endpoint. 

The solution is to perform the action only when the user stops typing.

In this frontend pill we will see just how to elegantly implement this functionality using **Svelte actions**.


## How the developer will consume a custom Svelte event

As always, before implementing the "on stop typing" custom event, let's imagine the easiest way for the developer to consume it.

In Svelte, the syntax to add event listener to an input tag is as follows:

```html
<input
      on:stopTyping={onStopTyping}
      type="text"
      bind:value={name} />
```

The _stopTyping_ event does not exist, so we need to implement it. Using an action:

The result will be as follows:
```html
<input
      use:stopTyping
      on:stopTyping={onStopTyping}
      type="text"
      bind:value={name} />
```

Let's then see how to implement the _stopTyping_ action. 

## How to implement a custom event in Svelte to reuse on any HTML element

In Svelte there is the concept of _actions_, a syntax keyword to **extend native HTML elements with new functionality**.

To use an action, we add an attribute, _use_, and the function that will take care of the custom behavior (_on stop typing_ in our case).

<div class="note">
<b>NOTE</b>
<br>
Before explaining how this works, just one important note: actions only work on native HTML tags and not on Svelte components. At least for now.
</div>

### How to apply the _use_ directive in Svelte

The Svelte _use_ directive is a kind of attribute on a HTML element that specifies a function.

The function, also called action in this context, takes the referring node as input.

```typescript
export function aCustomAction(node) {
    // some logic
    return {
        destroy() { }// (optional) some logic on destroy 
    };
}
```

The function returns an object with one method: _destroy_. It is optional, and it is called when the component is destroyed.

In Svelte an action can also add some behaviour based on some **extra parameters** that we can pass to the function.

```typescript
export function aCustomAction(node, param1) {
    // some logic
    return {
        update() { },// (optional) some logic executed when param1 gets updated 
        destroy() { }
    };
}
```

The _update_ method will be executed when the param1 changes. It is optional.

## The _onStopTyping_ action

In this pill we will see how to implement the stop typing action. 

Two key points:
1) it has to be **used on HTML inputs**
2) it will **fire an event only when the user stops typing** on that input

The function is simple:

```typescript
export function stopTyping(node) {
    const handleKeyup = debounce((event: KeyboardEvent) => { // (1) the debounce logic
        if (node.contains(event.target)) { // (2) restrict the event to the only referring node 
            node.dispatchEvent(new CustomEvent('stopTyping')); // (3) fire the event
        }
    }, 500);

    // (4) add a generic keyup event
    document.addEventListener('keyup', handleKeyup, true);

    return {
        destroy() {
            // (5) cleanup on destroy
            document.removeEventListener('keyup', handleKeyup, true);
        }
    };
}

```

Let's go step by step.

First of all, we register the `keyup` event _(4)_ (and cleanup it on destroy to avoid memory leaks at _(5)_ ).

The interesting parts are:
- fire the custom event at _(3)_
- make sure the stopTyping event is fired only once when the user does not write for half a second (at _(1)_) 

To make sure that a function is only runned once after the user stops typing, we make use of the _debounce function_.

### How does the debounce function work?

```typescript
function debounce(inputFunction, timeToWaitBeforeFiringInMs = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            inputFunction.apply(this, args);
        }, timeToWaitBeforeFiringInMs);
    };
}
```

Above, you can find the implementation of the _dobounce function_ in javascript.

It is used to **execute a function only once** if called multiple times within a constrained time interval.  

The _debounce function_ takes a function as argument and returns a new function (that will replace the original one we passed as input).

Other use cases of the debounce function:
- on mouse move, if we want to know when the user stops moving the mouse
- on multiple mouse click, to react only after the last click
- when using websockets, to execute an action only after a burst of packets arrive
- when collecting multiple information packs, to pass to them to the backend only once every X seconds

## How to consume the onStopTyping event action in Svelte

To use the function above on our inputs, we just need to import it in our Svelte component:

```html

<script>
    import { stopTyping } from '../shared/on-stop-typing.event';

    let name = "thefrontendteam"
    
    async function onStopTyping() {
        // do something with name
    }
</script>

<input
      use:stopTyping
      on:stopTyping={onStopTyping}
      type="text"
      bind:value={name} />
```

## Well done!

That's all. For more pills remember to subscribe to our newsletter :-)


