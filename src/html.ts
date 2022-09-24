import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';

export function html<T, Z>(
    getProps: (t: Request) => T,
    getComponent: (t: T) => JSX.Element
) {
    return (req: Request, res: Response) => {
        const props = getProps(req);
        const component = getComponent(props)
        const rendered = ReactDOMServer.renderToString(component)
        res.render('index', { content: rendered })
    }
};

export function json<T, Z>(
    getProps: (t: Request) => T,
    getComponent: (t: T) => JSX.Element
) {
    return (req: Request, res: Response) => {
        const props = getProps(req);
        const component = getComponent(props)
        const rendered = ReactDOMServer.renderToString(component)
        res.json({ content: rendered })
    }
};
