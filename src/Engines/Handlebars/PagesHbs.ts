export const homeIndexPage =
    `
<h1>Hello World</h1>
<p>My home page</p>
<p>This is my helper functions:</p>

<ul>
    <li>(concat "con" "cat") - {{concat "con" "cat"}}</li>
    <li>(array "first" "second" "third") - {{array "first" "second" "third"}}</li>
    <li>(date "22.04.2013" parse="DD.MM.YYYY") - {{date "22.04.2013" parse="DD.MM.YYYY"}}</li>
    <li>(date "2013-04-22" format="DD.MM.YYYY") - {{date "2013-04-22" format="DD.MM.YYYY"}}</li>
    <li>(date "20130422" parse="YYYYMMDD" format="DD.MM.YYYY") - {{date "20130422" parse="YYYYMMDD" format="DD.MM.YYYY"}}</li>
    <li>(ago "13.04.2016" parse="DD.MM.YYYY") - {{ago "13.04.2016" parse="DD.MM.YYYY"}}</li>
    <li>(ago "2016-04-13") - {{ago "2016-04-13"}}</li>
</ul>

{{>header text="My partial header" url="#/hello/world"}}
`;

export const headerPartial =
    `
    <h1>{{text}} <a href={{url}}>Navigation</a></h1>
`;

export const greetingPage = 
`
<h1>Hello {name}</h1>
<p>This is my greeting page, using parameters from the url</p>
{{>header text="My partial header" url="#/"}}
`