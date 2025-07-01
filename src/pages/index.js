import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const { basePath } = useRouter();

  return (
    <>
      <Head>
        <title>NEXT.JS CLOUDFLARE WORKERS</title>
      </Head>
      <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="shadow-md bg-[#131313] mt-4 p-4 w-full rounded-lg">
          <header className="p-6 flex flex-col justify-center items-center">
            <Image
              unoptimized
              src={basePath + "/GitHub.avif"}
              alt="Next.js on Github Pages Logo"
              width={0}
              sizes="100vw"
              height={0}
              className="w-56"
            />
            <h1 className="text-3xl font-bold text-center text-secondary mt-4">
              Next.js on Github Pages
            </h1>
          </header>
        </div>
        <section className="shadow-md bg-[#131313] mt-4 p-4 w-full rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">
            CLONE REPOSITORY
          </h2>
          <ol className="list-decimal pl-6 text-white mb-4">
            <li>
              <code className="bg-[#222] px-1 rounded">
                git clone
                https://github.com/RevanSP/NEXTJS-GHPAGES-EXAMPLE.git
              </code>
            </li>
            <li>
              <code className="bg-[#222] px-1 rounded">
                cd NEXTJS-GHPAGES-EXAMPLE
              </code>
            </li>
            <li>
              <code className="bg-[#222] px-1 rounded">npm install</code>
            </li>
          </ol>
        </section>
        <section className="shadow-md bg-[#131313] mt-4 p-4 w-full rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">
            USING <code className="bg-[#222] px-1 rounded">basePath</code> FOR STATIC ASSETS
          </h2>
          <p className="text-white mb-2">
            <strong>Important:</strong> Every time you want to import or reference a file from the <code className="bg-[#222] px-1 rounded">public/</code> folder, you <strong>must</strong> add <code className="bg-[#222] px-1 rounded">basePath</code> in front of the file path. This ensures your assets are always accessible, both locally and on GitHub Pages.<br /><br />
            To ensure your static assets work correctly on GitHub Pages, use the <code className="bg-[#222] px-1 rounded">basePath</code> from <code className="bg-[#222] px-1 rounded">useRouter()</code> in your components:
          </p>
          <pre className="bg-[#222] text-white text-xs rounded p-4 overflow-x-auto"><code>{`import { useRouter } from "next/router";

export default function MyComponent() {
  const { basePath } = useRouter();
  return (
    <img src={
      basePath + "/my-image.svg"
    } alt="My Image" />
  );
}`}</code></pre>
          <p className="text-white mt-2">
            This will automatically prefix your asset paths with the correct base path when deployed to GitHub Pages.
          </p>
        </section>
        <section className="shadow-md bg-[#131313] mt-4 p-4 w-full rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 uppercase text-secondary">
            Fetching Data from API with SSG (getStaticProps)
          </h2>
          <p className="text-white mb-2">
            To fetch data from any public API (for example, <a href="https://jsonplaceholder.typicode.com/" className="underline text-blue-400" target="_blank" rel="noopener noreferrer">JSONPlaceholder</a>), you can use <code className="bg-[#222] px-1 rounded">getStaticProps</code> for Static Site Generation (SSG). This will fetch the data at build time and generate static HTML.
          </p>
          <pre className="bg-[#222] text-white text-xs rounded p-4 overflow-x-auto mb-4"><code>{`// pages/example.js
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();
  return {
    props: {
      post: data,
    },
  };
}

export default function Example({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
}`}</code></pre>
          <p className="text-white mt-2">
            <strong>Note:</strong> The data will be fetched at build time, so it will not update until you rebuild your site.
          </p>
        </section>
        <section className="shadow-md bg-[#131313] mt-4 p-4 w-full rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 uppercase text-secondary">
            Fetching Data from API with ISR (Incremental Static Regeneration)
          </h2>
          <p className="text-white mb-2">
            <strong>Tip:</strong> Although true ISR (<code>revalidate</code> in <code>getStaticProps</code>) is not supported on GitHub Pages, you can mimic ISR by triggering a rebuild of your site using GitHub Actions workflows (for example, on a schedule or via webhook). This way, your static data can be refreshed periodically, even though your code still uses SSG (<code>getStaticProps</code>).
          </p>
          <p className="text-white mb-2">
            <strong>Workflow Note:</strong> The provided GitHub Actions workflow already includes a commented-out <code>schedule</code> block. To enable automatic periodic rebuilds (like ISR), simply uncomment the <code>schedule</code> section in <code>.github/workflows/gh-pages.yml</code>.
          </p>
          <pre className="bg-[#222] text-white text-xs rounded p-4 overflow-x-auto mb-4"><code>{`# To enable automatic rebuilds (like ISR), uncomment the schedule block below:
# schedule:
#   - cron: '*/30 * * * *'  # Every 30 minutes`}</code></pre>
          <p className="text-white text-xs mb-4">
            <strong>Cron format:</strong> <code>'*/30 * * * *'</code> means every 30 minutes.<br />
            The five fields are: <br />
            <code>minute hour day-of-month month day-of-week</code><br />
            <ul className="list-disc pl-6">
              <li><strong>minute</strong>: 0-59</li>
              <li><strong>hour</strong>: 0-23</li>
              <li><strong>day-of-month</strong>: 1-31</li>
              <li><strong>month</strong>: 1-12</li>
              <li><strong>day-of-week</strong>: 0-6 (0 = Sunday)</li>
            </ul>
            Example: <code>'0 * * * *'</code> = every hour on the hour.<br />
            Example: <code>'0 0 * * *'</code> = every day at midnight.
          </p>
        </section>
        <section className="shadow-md bg-[#131313] mt-4 p-4 w-full rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">
            HOSTING ON GITHUB PAGES
          </h2>
          <ol className="list-decimal pl-6 text-white mb-4">
            <li>
              Push your project to a new or existing GitHub repository.
            </li>
            <li>
              Go to your repository's <strong>Settings</strong> &gt; <strong>Pages</strong> &gt; <strong>Source</strong>, then select <strong>Deploy from a branch</strong> and choose <strong>GitHub Actions</strong> as the source.
            </li>
            <li>
              Make sure the <code className="bg-[#222] px-1 rounded">.github/workflows/gh-pages.yml</code> workflow file exists in your repository (see this repo for an example).
            </li>
            <li>
              The workflow will automatically build and deploy your site to GitHub Pages every time you push to the <code className="bg-[#222] px-1 rounded">main</code> branch.
            </li>
            <li>
              After the workflow finishes, your site will be available at:
              <br />
              <code className="bg-[#222] px-1 rounded">https://&lt;your-github-username&gt;.github.io/&lt;your-repo-name&gt;/</code>
            </li>
          </ol>
        </section>
        <section className="shadow-md bg-[#131313] mt-4 p-4 w-full rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 uppercase text-secondary">
            Next.js Features Not Supported on GitHub Pages
          </h2>
          <ul className="list-disc pl-6 text-white mb-4">
            <li>
              <strong>API Routes</strong>: You cannot use <code className="bg-[#222] px-1 rounded">pages/api</code> or <code className="bg-[#222] px-1 rounded">app/api</code> endpoints. All API logic must be handled externally.
            </li>
            <li>
              <strong>Server-Side Rendering (SSR)</strong>: <code className="bg-[#222] px-1 rounded">getServerSideProps</code> is not supported. Only static generation is allowed.
            </li>
            <li>
              <strong>Incremental Static Regeneration (ISR)</strong>: <code className="bg-[#222] px-1 rounded">revalidate</code> and on-demand static regeneration are not available.
            </li>
            <li>
              <strong>Middleware</strong>: Edge Middleware and advanced routing logic that require a server are not supported.
            </li>
            <li>
              <strong>Dynamic Routing with Fallback</strong>: <code className="bg-[#222] px-1 rounded">fallback: true</code> or <code className="bg-[#222] px-1 rounded">blocking</code> in <code className="bg-[#222] px-1 rounded">getStaticPaths</code> are not supported. Only <code className="bg-[#222] px-1 rounded">fallback: false</code> works.
            </li>
            <li>
              <strong>Image Optimization</strong>: Next.js image optimization (default loader) is not available. Use <code className="bg-[#222] px-1 rounded">unoptimized</code> for images.
            </li>
            <li>
              <strong>Custom Server</strong>: You cannot use a custom Express/Node.js server.
            </li>
          </ul>
          <p className="text-white mt-2">
            GitHub Pages only supports static HTML, CSS, and JS. Make sure your Next.js project uses <strong>Static Export</strong> (<code className="bg-[#222] px-1 rounded">output: 'export'</code>) and does not rely on server-side features.
          </p>
        </section>
        <footer className="mt-12 text-center text-gray-600">
          <p>ReiiV. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}