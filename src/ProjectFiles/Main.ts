export const Main = (loadTemplates, assignEngine, container) => {
    return `import * as fuspa from 'fuspa';

// Load engine specific templates
${loadTemplates}

fuspa.Route.options = {
    container: '${container}',
    templateEngine: ${assignEngine}
};

const routeMapper = fuspa.RouteMapper.instance;
const route = fuspa.Route.instance;

routeMapper.addRoute('/', () => {
    route.title='Home';
    route.render('home');
});

routeMapper.addRoute('/hello/:name', name => {
    route.title = 'Welcome, ' + name + '!';
    route.render('greeting', {name: name});
});

window.onload = function() {
    route.start();
    routeMapper.listen();
}
`;
};
