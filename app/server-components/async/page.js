import Delays from './Delays';
import FileSource from "@/components/FileSource";
export const revalidate=0;

export default ()=>{
  return <>
    <h2>async Server Components</h2>
    <p>Server Components can be async, so they return a Promise. When rendering, RSC will wait for all Promises to resolve before returning the html content or Virtual DOM back to the browser. This is what caused the delay in the delivery of the content of this page. Reload to see how long it takes to return.</p>

    <p>Below you can see a simple &lt;Delay&gt; Server Component:</p>
    <FileSource title={"Delay.js"} filepath={"/app/server-components/Delay.js"}/>
    <p>This component creates a Promise that waits a certain number of seconds before resolving to a simple DIV with a timestamp showing when it rendered. If the component has children, they are then rendered.</p>

    <p>And below is the output of multiple instances of this Component, some nested and some not:</p>
    <Delays/>
    <FileSource title={"Delays.js"} filepath={"/app/server-components/async/Delays.js"}/>
    <p>Notice how the first 3 timestamps are either exactly or nearly identical. This demonstrates that async RSCs are rendered in parallel.</p>
    <p>The nested components, however, have increasing timestamps. This is because the outer Delay resolved after 1 second. At that point, it rendered its children. Its child was another Delay component with a delay of 0.5 seconds. Once that time elapses, it renders and again calls its children to render. This is a third Delay component, with a delay of 0.5 seconds.</p>
    <p>The nested components demonstrate that waterfalls can be created in Server Components, where the inner components do not begin their async operations until their parent is actually rendered.</p>

    <p>If you <b>reload this page</b> you will see that it takes ~2 seconds to return its content.</p>
    <p>The outer Delay is 1s, its child is 0.5s, and its child is again 0.5s. The waterfall causes the whole page to wait a total of 2 seconds to return content.</p>

    <h3>Forcing SSR instead of SSG</h3>
    <p>I want this page to run each time it is requested, so the delay is experienced by you. But recall that SSG is the default for RSC.</p>
    <p>This means that by default, at build time RSC would realize that there is nothing on the page that <b>must</b> be run at request-time, like a database call or a fetch.</p>
    <p>So, during the build it runs the component and waits for the delay to resolve, then takes the final html and virtual DOM and exports that. When the page is loaded by the user, they experience no delay. The delay happened at build time rather than request time.</p>
    <p>We need a way to tell RSC to run this page each time it's requested, rather than just once at build time.</p>
    <pre className={'code'}>export const revalidate=0;</pre>
    <p>Putting this in the .js file is one way to tell NextJS that it needs to re-run (re-validate) the output of this page with every request. It is put on this page, but not most of the others in this tutorial.</p>

    <h3>Wait, is this PHP?!</h3>
    <p>No. Don't.</p>
    <p>Years ago, this was the normal pattern for server-side content generation. The entire operation would need to complete before any content was returned back to the browser. Imagine a slow database call, or a remote API call, or a complex operation that requires loading many libraries to make calculations. The user would wait for the page to reload, just as you see here.</p>

    <h3>What if...</h3>
    <p>you could return the available content as soon as possible to immediately show to the user, and then as each Promise resolves fill in its content where it's supposed to go?</p>
    <p>You can. This is called streaming, and it's one of the biggest benefits of React Server Components.</p>

    <p><a className={"button"} href={"/server-components/streaming/"}>Streaming with Server-Side Suspense</a></p>

  </>
}
