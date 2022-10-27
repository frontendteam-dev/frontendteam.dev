---
title: How to develop a web component using tailwind&#58; a modern starter kit (vite, tailwind, lit element, SCSS)
description: Web components are still a raw technology, but if you mix them with other good technologies like SCSS and tailwind, the dev experience is better. Let's see how to integrate Tailwind with web components the easy way.
layout: layouts/post
image: index.jpg
imageAlt: Create a web component with tailwind inside
permalink: /blog/create-web-component-using-tailwind-starter-kit/
tags: ['web component','tailwind','vite', 'developer experience']
author: Salvatore Romeo, PhD
authorLink: https://linkedin.com/in/salvatoreromeo
---

## No crap, show me the tailwind web components starter kit

First of all, if you don't mind about the details, here is the repo of the starter kit:

[https://github.com/butopen/web-components-tailwind-starter-kit](https://github.com/butopen/web-components-tailwind-starter-kit)

If you mind, then keep reading :-)

## Some intro

For the first release of Browserbot, our open source project to delegate tests for web apps, 
we want to give devs a frontend API to easily create new systems **without having to reinvent 
the frontend parts each time**.

When developing a frontend API, you should consider:
- the framework devs love: **Angular**, **React**, **Vue**, **Svelte**, ...
- how to make it simple to **integrate** a component
- how to **keep the effort to understand the component dynamics at minimum**


If you plan to release your own custom frontend components and make the devs use them **like a html tag**, 
web components are the way to go.

Unfortunately web components are a raw tech: a technology with a lot of potential, but for some reason never upgraded in the last 6 years.

And here we are: we mixed some ingredients to improve the developer experience:
- using **lit element** for a higher level api over web components
- using **typescript** to prevent stupid errors
- using **scss** for the styles to better scale our CSS
- integrate **vite** for a quick development process
- integrate **tailwind**

In this post you'll find a cool **starter kit to develop web components** with all these frontend technologies inside.


## How to write a web component with tailwind and the starter kit

You can find the kit at this open source repo:

[https://github.com/butopen/web-components-tailwind-starter-kit](https://github.com/butopen/web-components-tailwind-starter-kit)

To create a new web component, here is a sample code:

```typescript
import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {TailwindElement} from '../shared/tailwind.element';

import style from './test.component.scss'; // #1

@customElement('test-component')
export class TestComponent extends TailwindElement(style) { // #2

  @property()
  name?: string = 'World';

  render() {
    return html`
      <p>
        Hello,
        <b>${this.name}</b>
        !
      </p>
      <button class="bg-blue-200 text-yellow-200 p-2 rounded-full text-2xl">Hello world!</button>
    `;
  }
}
```
It is based on the [lit element](https://lit.dev/docs/) technology: if you wrote a lit component before, you'll find it familiar.

The only difference to a standard _LitElement_ is that:
1) You must import your styles from a separate file. And this is good for two reasons:
    - it separates the CSS from the logic
    - you can decide to use CSS or SCSS
2) the component class extends a _TailwindElement_ rather than a LitElement

The _TailwindElement_ extends the _LitElmement_ (see below) and adds the logic to integrate tailwind and your styles.

## Get started with the starter kit

To run the project:
1) `pnpm install` (only the first time)
2) `pnpm start` to run the server
3) to develop the library, run `pnpm build` and copy the static assets where you need them.

You may clone the repo ([https://github.com/butopen/web-components-tailwind-starter-kit](https://github.com/butopen/web-components-tailwind-starter-kit)) and start developing your components by looking at the _test.component_ as reference.

## Use the Tailwind class in your own code without the starter kit
As an alternative, and if you like to have control over every piece, do the following:

1) copy the files in the shared folder:
    - _tailwind.element.ts_ extends LitElement by adding the tailwind support
    - _tailwind.global.css_ includes tha Tailwind base classes into each component
    - _globals.d.ts_ is used to avoid TypeScript errors whe nimporting CSS/Scss files in typescript files
2) copy the _package.json_ or just its devDependencies into your own _package.json_  (**this starter kit has no dependencies**)
3) copy _postcss.config.js_, _tailwind.config.js_ and _tsconfig.js_

That's all.

## Show me the pieces
If you want to understand how it works:

- the **package.json** integrates these technologies:
```json
"autoprefixer": "^10.4.12",
"postcss": "^8.4.18",
"lit": "^2.4.0",
"tailwindcss": "^3.2.0",
"typescript": "^4.8.4",
"vite": "^3.1.8",
"sass": "^1.55.0"
```

- **vite** does almost all the work
- to integrate tailwind, the most important file is in _src/shared/tailwind.element.ts_

```typescript
import {LitElement, unsafeCSS} from "lit";

import style from "./tailwind.global.css";

const tailwindElement = unsafeCSS(style);

export const TailwindElement = (style) =>
    class extends LitElement {

        static styles = [tailwindElement, unsafeCSS(style)];
    
    };

```

It extends a _LitElement_ class at runtime and adds the tailwind support.

The _style_ variable comes from your component, where it is imported from an external CSS (or SCSS) file.

Then it is combined with the default tailwind classes.

If you add more components, the common parts are reused.

## Who uses it?

We developed this starter kit to implement a web session player for our open source SaaS [browserbot](https://browserbot.io/).

If you want to contribute or share soem thoughts, just get in touch with us.

Enjoy.





## Some more details about web components

### What are web components
Web components are an html technology to share common fronted logic/ui without worrying about the framework 
you're using. The goal is to create your own custom HTML tags.

So you end up having a `<maps>` component, or a `<pdf-viewer>` component. Just embed a JS script in the page, 
and start using that tag as if it was a native one. 

Is it easy to develop a web component? Not much. Our frontend team made it easier. 

### Why integrating tailwind in a webcomponent is difficult
Tailwind is a wonderful technology to speed up the css part of the frontend development. And wehen I say speed up... trust me: we're talking about an order of magnitude less time to reach the desired aspect of our ui.
Because of how tailwind works, web components do not play well with tailwind since they do not see css classes from outside.

Web components have this concept of total isolation: they will not tell you how things work inside. Just have fate and trust it.

So in order to support tailwind, we need to find a way to inject the classes inside.

Spoiler: we found it and we kept it so simple that you'll not even notice the difference to pure lit elements.

### How to keep the developer experience high when integrating web components and tailwind
Devs writing web components rarely write them using the custom elements raw technology.

Some use Stencil, some use Lit, some use Svelte.

For this project we decided to go for Lit.

Writing a web component in Lit is like writing a typescript class plus some decorators.

That experience should not change: integrating tailwind should not break this behavior.

## Well done!

That's all. For more posts remember to subscribe to our newsletter :-)


