
export function Guide() {
  return (
    <div className="max-w-4xl mx-auto prose prose-blue">
  <h1 className="text-3xl font-bold text-blue-600 mb-6">Guide to oEmbed Discovery Tags</h1>

<p className="mb-4">
    oEmbed is a standard for embedding content from one website into another, often used for rich media like videos, images, or interactive content. 
    oEmbed discovery allows consumers to identify the location of an oEmbed endpoint directly from a webpage using specific <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">link</code> tags in the 
    <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">head</code> section.
</p>

<h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">What are oEmbed Discovery Tags?</h2>
<p className="mb-4">
    oEmbed discovery tags are <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">link</code> elements included in the 
    <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">head</code> section of an HTML document. They point to the URL of the oEmbed endpoint that provides the necessary metadata for embedding the content.
</p>

<h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">Steps to Implement oEmbed Discovery Tags</h2>
<ol className="list-decimal ml-6 mb-4 space-y-3">
    <li>
        <strong>Understand the Basics:</strong>
        <p className="mt-2">An oEmbed consumer looks for <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">link</code> tags with 
        <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">rel="alternate"</code> and a <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">type</code> attribute of 
        <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">application/json+oembed</code> or 
        <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">text/xml+oembed</code>.</p>
    </li>
    <li>
        <strong>Include the Tags in Your HTML:</strong>
        <p className="mt-2">Add the following <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">link</code> tags to the 
        <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">head</code> section of your HTML page:</p>
        <div className="bg-gray-100 p-4 rounded mt-2">
            <pre className="text-sm"><code>&lt;link rel="alternate" type="application/json+oembed" href="https://example.com/oembed?format=json" /&gt;
&lt;link rel="alternate" type="text/xml+oembed" href="https://example.com/oembed?format=xml" /&gt;</code></pre>
        </div>
    </li>
    <li>
        <strong>Define Your oEmbed Endpoint:</strong>
        <p className="mt-2">Your oEmbed endpoint should accept parameters such as:</p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
            <li><code className="bg-gray-200 px-1 py-0.5 rounded text-sm">url</code>: The URL of the content being embedded.</li>
            <li><code className="bg-gray-200 px-1 py-0.5 rounded text-sm">maxwidth</code> (optional): Maximum width of the embed.</li>
            <li><code className="bg-gray-200 px-1 py-0.5 rounded text-sm">maxheight</code> (optional): Maximum height of the embed.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded mt-2">
            <pre className="text-sm"><code>GET https://example.com/oembed?url=https://example.com/content/123&format=json</code></pre>
        </div>
        <p className="mt-2">Example JSON Response:</p>
        <div className="bg-gray-100 p-4 rounded">
            <pre className="text-sm"><code>{`
"version": "1.0",
"type": "video",
"title": "Example Video",
"author_name": "Author Name",
"author_url": "https://example.com/author",
"provider_name": "Example Provider",
"provider_url": "https://example.com",
"html": "&lt;iframe src='https://example.com/embed/123' width='640' height='360' frameborder='0' allowfullscreen&gt;&lt;/iframe&gt;",
"width": 640,
"height": 360,
"thumbnail_url": "https://example.com/thumbnail.jpg",
"thumbnail_width": 640,
"thumbnail_height": 360
`}</code></pre>
        </div>
    </li>
</ol>

<h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">Best Practices</h2>
<ul className="list-disc ml-6 mb-4 space-y-3">
    <li>Ensure Correct Metadata: Include all required fields in your oEmbed response.</li>
    <li>Use Absolute URLs: Always use absolute URLs in <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">href</code> attributes and oEmbed responses.</li>
    <li>Support CORS: Ensure Cross-Origin Resource Sharing (CORS) for JSON responses if needed.</li>
    <li>Test Compatibility: Test with major platforms like WordPress, Slack, and Twitter.</li>
    <li>Handle Errors Gracefully: Return meaningful error messages (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">404 Not Found</code> for invalid <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">url</code> parameters).</li>
</ul>
    </div>
  );
}