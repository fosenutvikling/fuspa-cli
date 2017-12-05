export const homeIndexPage =
    `
<h1>Hello World</h1>
<p>My home page</p>
<p>This is my helper functions:</p>

<ul>
    <li>(concat "con" "cat") - {{concat "con" "cat"}}</li>
    <li>(array "first" "second" "third") - {{array "first" "second" "third"}}</li>
    <li>(date "22.04.2013") - {{date "22.04.2013"}}</li>
    <li>(ago "13.04.2016") - {{ago "13.04.2016"}}</li>
</ul>

{{>header text="My partial header"}}
`;

export const headerPartial =
    `
    <h1>{{text}}</h1>
`;