declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}

