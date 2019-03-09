<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <div id="Doc" v-html="art"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      art:`<span>React 和 Vue 应该是国内当下最火热的前端框架，当然 Angular 也是一个不错的框架，但是这个产品国内使用的人很少再加上我对 Angular 也不怎么熟悉，所以框架的章节中</span><strong style="letter-spacing: 0.05em;">不会涉及到 Angular 的内容</strong><span style="letter-spacing: 0.05em;">。</span><p>这一章节，我们将会来学习以下几个内容</p><ul><li>三大框架的通用架构设计</li><li>Virtual DOM 是什么</li><li>前端路由是如何跳转的</li><li>React 和 Vue 之间的区别</li></ul><h2>MVVM</h2><blockquote><p>涉及面试题：什么是 MVVM？比之 MVC 有什么区别？</p></blockquote><p>首先先来说下 View 和 Model</p><ul><li>View 很简单，就是用户看到的视图</li><li>Model 同样很简单，一般就是本地数据和数据库中的数据</li></ul><p>基本上，我们写的产品就是通过接口从数据库中读取数据，然后将数据经过处理展现到用户看到的视图上。当然我们还可以从视图上读取用户的输入，然后又将用户的输入通过接口写入到数据库中。但是，如何将数据展示到视图上，然后又如何将用户的输入写入到数据中，不同的人就产生了不同的看法，从此出现了很多种架构设计。</p><p>传统的 MVC 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新。</p><p></p><figure><img src="https://user-gold-cdn.xitu.io/2018/12/20/167cad938817eb7e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>MVC</figcaption></figure><p></p><p>但是 MVC 有一个巨大的缺陷就是<strong>控制器承担的责任太大</strong>了，随着项目愈加复杂，控制器中的代码会越来越<strong>臃肿</strong>，导致出现不利于<strong>维护</strong>的情况。</p><p>在 MVVM 架构中，引入了&nbsp;<strong>ViewModel</strong>&nbsp;的概念。ViewModel 只关心数据和业务的处理，不关心 View 如何处理数据，在这种情况下，View 和 Model 都可以独立出来，任何一方改变了也不一定需要改变另一方，并且可以将一些可复用的逻辑放在一个 ViewModel 中，让多个 View 复用这个 ViewModel。</p><p></p><figure><img src="https://user-gold-cdn.xitu.io/2018/12/21/167ced454926a458?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption></figcaption></figure><p></p><p>以 Vue 框架来举例，ViewModel 就是组件的实例。View 就是模板，Model 的话在引入 Vuex 的情况下是完全可以和组件分离的。</p><p>除了以上三个部分，其实在 MVVM 中还引入了一个隐式的 Binder 层，实现了 View 和 ViewModel 的绑定。</p><p></p><figure><img src="https://user-gold-cdn.xitu.io/2018/12/21/167cf01bd8430243?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption></figcaption></figure><p></p><p>同样以 Vue 框架来举例，这个<strong>隐式</strong>的 Binder 层就是 Vue 通过解析模板中的插值和指令从而实现 View 与 ViewModel 的绑定。</p><p>对于 MVVM 来说，其实最重要的并不是通过双向绑定或者其他的方式将 View 与 ViewModel 绑定起来，<strong>而是通过 ViewModel 将视图中的状态和用户的行为分离出一个抽象，这才是 MVVM 的精髓</strong>。</p><h2>Virtual DOM</h2><blockquote><p>涉及面试题：什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？</p></blockquote><p>大家都知道操作 DOM 是很慢的，为什么慢的原因以及在「<strong>浏览器渲染原理</strong>」章节中说过，这里就不再赘述了。</p><p>那么相较于 DOM 来说，操作 JS 对象会快很多，并且我们也可以通过 JS 来模拟 DOM</p><pre><code lang="js">const ul = {↵  tag: 'ul',↵  props: {↵    class: 'list'↵  },↵  children: {↵    tag: 'li',↵    children: '1'↵  }↵}↵</code></pre><p>上述代码对应的 DOM 就是</p><pre><code lang="html">&lt;ul class='list'&gt;↵  &lt;li&gt;1&lt;/li&gt;↵&lt;/ul&gt;↵</code></pre><p>那么既然 DOM 可以通过 JS 对象来模拟，反之也可以通过 JS 对象来渲染出对应的 DOM。当然了，通过 JS 来模拟 DOM 并且渲染对应的 DOM 只是第一步，难点在于如何判断新旧两个 JS 对象的<strong>最小差异</strong>并且实现<strong>局部更新</strong>&nbsp;DOM。</p><p>首先 DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异，那么需要的时间复杂度会是 O(n ^ 3)，这个复杂度肯定是不能接受的。于是 React 团队优化了算法，实现了 O(n) 的复杂度来对比差异。 实现 O(n) 复杂度的关键就是只对比同层的节点，而不是跨层对比，这也是考虑到在实际业务中很少会去跨层的移动 DOM 元素。 所以判断差异的算法就分为了两步</p><ul><li>首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异</li><li>一旦节点有子元素，就去判断子元素是否有不同</li></ul><p>在第一步算法中我们需要判断新旧节点的&nbsp;<code>tagName</code>&nbsp;是否相同，如果不相同的话就代表节点被替换了。如果没有更改&nbsp;<code>tagName</code>&nbsp;的话，就需要判断是否有子元素，有的话就进行第二步算法。</p><p>在第二步算法中，我们需要判断原本的列表中是否有节点被移除，在新的列表中需要判断是否有新的节点加入，还需要判断节点是否有移动。</p><p>举个例子来说，假设页面中只有一个列表，我们对列表中的元素进行了变更</p><pre><code lang="js">// 假设这里模拟一个 ul，其中包含了 5 个 li↵[1, 2, 3, 4, 5]↵// 这里替换上面的 li↵[1, 2, 5, 4]↵</code></pre><p>从上述例子中，我们一眼就可以看出先前的&nbsp;<code>ul</code>&nbsp;中的第三个&nbsp;<code>li</code>&nbsp;被移除了，四五替换了位置。</p><p>那么在实际的算法中，我们如何去识别改动的是哪个节点呢？这就引入了&nbsp;<code>key</code>&nbsp;这个属性，想必大家在 Vue 或者 React 的列表中都用过这个属性。这个属性是用来给每一个节点打标志的，用于判断是否是同一个节点。</p><p>当然在判断以上差异的过程中，我们还需要判断节点的属性是否有变化等等。</p><p>当我们判断出以上的差异后，就可以把这些差异记录下来。当对比完两棵树以后，就可以通过差异去局部更新 DOM，实现性能的最优化。</p><p>当然了 Virtual DOM 提高性能是其中一个优势，其实<strong>最大的优势</strong>还是在于：</p><ol><li>将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。</li><li>同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。</li><li>实现组件的高度抽象化</li></ol><h2>路由原理</h2><blockquote><p>涉及面试题：前端路由原理？两种实现方式有什么区别？</p></blockquote><p>前端路由实现起来其实很简单，本质就是<strong>监听 URL 的变化</strong>，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式</p><ul><li>Hash 模式</li><li>History 模式</li></ul><h3>Hash 模式</h3><p><code>www.test.com/#/</code>&nbsp;就是 Hash URL，当&nbsp;<code>#</code>&nbsp;后面的哈希值发生变化时，可以通过&nbsp;<code>hashchange</code>&nbsp;事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是&nbsp;<code>www.test.com</code>。</p><pre><code lang="js">window.addEventListener('hashchange', () =&gt; {↵  // ... 具体逻辑↵})↵</code></pre><p>Hash 模式相对来说更简单，并且兼容性也更好。</p><h3>History 模式</h3><p>History 模式是 HTML5 新推出的功能，主要使用&nbsp;<code>history.pushState</code>&nbsp;和&nbsp;<code>history.replaceState</code>&nbsp;改变 URL。</p><p>通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。</p><pre><code lang="js">// 新增历史记录↵history.pushState(stateObject, title, URL)↵// 替换当前历史记录↵history.replaceState(stateObject, title, URL)↵</code></pre><p>当用户做出浏览器动作时，比如点击后退按钮时会触发&nbsp;<code>popState</code>&nbsp;事件</p><pre><code lang="js">window.addEventListener('popstate', e =&gt; {↵  // e.state 就是 pushState(stateObject) 中的 stateObject↵  console.log(e.state)↵})↵</code></pre><h3>两种模式对比</h3><ul><li>Hash 模式只可以更改&nbsp;<code>#</code>&nbsp;后面的内容，History 模式可以通过 API 设置任意的同源 URL</li><li>History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串</li><li>Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置&nbsp;<code>index.html</code>&nbsp;页面用于匹配不到静态资源的时候</li></ul><h2>Vue 和 React 之间的区别</h2><p>Vue 的表单可以使用&nbsp;<code>v-model</code>&nbsp;支持双向绑定，相比于 React 来说开发上更加方便，当然了&nbsp;<code>v-model</code>其实就是个语法糖，本质上和 React 写表单的方式没什么区别。</p><p>改变数据方式不同，Vue 修改状态相比来说要简单许多，React 需要使用&nbsp;<code>setState</code>&nbsp;来改变状态，并且使用这个 API 也有一些坑点。并且 Vue 的底层使用了依赖追踪，页面更新渲染已经是最优的了，但是 React 还是需要用户手动去优化这方面的问题。</p><p>React 16以后，有些钩子函数会执行多次，这是因为引入 Fiber 的原因，这在后续的章节中会讲到。</p><p>React 需要使用 JSX，有一定的上手成本，并且需要一整套的工具链支持，但是完全可以通过 JS 来控制页面，更加的灵活。Vue 使用了模板语法，相比于 JSX 来说没有那么灵活，但是完全可以脱离工具链，通过直接编写&nbsp;<code>render</code>&nbsp;函数就能在浏览器中运行。</p><p>在生态上来说，两者其实没多大的差距，当然 React 的用户是远远高于 Vue 的。</p><p>在上手成本上来说，Vue 一开始的定位就是尽可能的降低前端开发的门槛，然而 React 更多的是去改变用户去接受它的概念和思想，相较于 Vue 来说上手成本略高。</p><h2>小结</h2><p>这一章节中我们学习了几大框架中的相似点，也对比了 React 和 Vue 之间的区别。其实我们可以发现，React 和 Vue 虽然是两个不同的框架，但是他们的底层原理都是很相似的，无非在上层堆砌了自己的概念上去。所以我们无需去对比到底哪个框架牛逼，引用尤大的一句话</p><blockquote><p>说到底，就算你证明了 A 比 B 牛逼，也不意味着你或者你的项目就牛逼了... 比起争这个，不如多想想怎么让自己变得更牛逼吧。</p></blockquote>`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
