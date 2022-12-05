declare module "*.svg" {
    const content : any ;
    export default content ;
}

declare namespace React {
    function lazy<T extends ComponentType<any>>(
        factory: () => Promise<{ default: T }>,
    ): T;
}

declare module "*.png" {
    const content : any ;
    export default content ;
}

declare module "*.scss" {
    const styles: { [className: string]: string };
    export default styles;
}