import { Request } from 'express';

export function getProps(request: Request) {
    return "a"
}

export function getComponent(props: ReturnType<typeof getProps>) {
    return <div>{props}</div>
}