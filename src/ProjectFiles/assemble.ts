export const headerHbs = () =>
    `
<p>Insert header here</p>
`;

export const layoutHbs = () =>
    `
<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="assets/css/bundle.min.css">

</head>
<body>
    {{>header}}    

    <div id="content">
        {% body %}
    </div>

    <script src="assets/js/bundle.min.js"></script>
</body>
</html>
`;

export const pageHbs = () =>
    `
    {{! just empty where page content will be put }}
`;